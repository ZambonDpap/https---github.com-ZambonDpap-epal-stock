<?php

require_once 'mysql_connect.php';
require_once '../../libs/dompdf/autoload.inc.php';

// import dompdf class into global namespace
use Dompdf\Dompdf;
use Dompdf\Options;

header('Content-Type: application/json');

$conn = connect_to_db();

$result = array();

if( !isset($_GET['functionname'])){
    if( $_POST['functionname'] == "validate_user"){
        $result = validate_user($conn, $result);
    } else if ($_POST['functionname'] == "get_academic_year_max_protocol_id"){
        $result = get_academic_year_max_protocol_id($conn, $result);
    } else if ($_POST['functionname'] == "add_new_supplier"){
        $result = add_new_supplier($conn, $result);
    } else if ($_POST['functionname'] == "add_new_material"){
        $result = add_new_material($conn, $result);
    } else if ($_POST['functionname'] == "save_pdf"){
        $result = save_pdf($conn, $result);
    } else if ($_POST['functionname'] == "delete_invoice"){
        $result = delete_invoice($conn, $result);
    } else if ($_POST['functionname'] == "delete_supplier"){
        $result = delete_supplier($conn, $result);
    } else if ($_POST['functionname'] == "logout"){
        $result = logout($conn, $result);
    }
} else if( !isset($_POST['functionname'])){
    if ($_GET['functionname'] == "get_lab_manager"){
        $result = get_lab_manager($conn, $result);
    } else if ($_GET['functionname'] == "get_suppliers"){
        $result = get_suppliers($conn, $result);
    } else if ($_GET['functionname'] == "get_lab_buyers"){
        $result = get_lab_buyers($conn, $result);
    } else if ($_GET['functionname'] == "get_lab_receivers"){
        $result = get_lab_receivers($conn, $result);
    } else if ($_GET['functionname'] == "get_invoices"){
        $result = get_invoices($conn, $result);
    } else if ($_GET['functionname'] == "get_purchace"){
        $result = get_purchace($conn, $result);
    } else if ($_GET['functionname'] == "get_users"){
        $result = get_users($conn, $result);
    } else if ($_GET['functionname'] == "get_user_roles"){
        $result = get_user_roles($conn, $result);
    } else if ($_GET['functionname'] == "get_fields"){
        $result = get_fields($conn, $result);
    } else if ($_GET['functionname'] == "get_labs"){
        $result = get_labs($conn, $result);
    } else if ($_GET['functionname'] == "get_materials"){
        $result = get_materials($conn, $result);
    } else {
        $result['error'] = 'No function name!'; 
    }
}

mysqli_close($conn);

echo json_encode($result);

function validate_user($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_POST['arguments'];
        $username = $arguments[0];
        $password = $arguments[1];

        $sql = "SELECT id, firstname, lastname, admin_level FROM users WHERE lastname = '$username' and password = '$password'";
        $res = mysqli_query($conn,$sql);
        $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
        $count = mysqli_num_rows($res);

        if($count == 1) {
            session_start();
            $_SESSION['firstname'] = $row["firstname"];
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
            $_SESSION['admin_level'] = $row["admin_level"];
            $_SESSION['fullname'] = $row["lastname"] . " " . $row["firstname"];
            $result["success"] = "success";
        }else {
            $result["error"] = "Your Login Name or Password is invalid";
        }
    }

    return $result;
}
function logout($conn, $resut){
    session_start();
    session_unset();
    session_destroy();
    $result["success"] = "success";
}
function delete_invoice($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments = $_POST['arguments'];
        $invoice_number = $arguments[0];
        $protocol_pdf = $arguments[1];

        
        $sql = "DELETE FROM invoice WHERE invoice_number = '$invoice_number'";
        $result = mysqli_query($conn,$sql);

        $sql = "DELETE FROM purchace WHERE invoice_id = '$invoice_number'";
        $result = mysqli_query($conn,$sql);

        $file_to_delete = "pdf_protocols/" . $protocol_pdf;
        unlink($file_to_delete);

        return $result;
    }
}
function delete_supplier($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments = $_POST['arguments'];
        $supplier_id = $arguments[0];

        
        $sql = "DELETE FROM suppliers WHERE id = $supplier_id";
        $result = mysqli_query($conn,$sql);

        return $result;
    }
}
function get_fields($conn, $result){
    $sql = "SELECT name, id FROM fields";
    
    $res = mysqli_query($conn,$sql);
    $fields = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $fields;
}
function get_labs($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $field_id = $arguments[0];
    }

    $sql = "SELECT name, id FROM labs WHERE field_id = $field_id";
    
    $res = mysqli_query($conn,$sql);
    $result = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $result;
}
function get_suppliers($conn, $result){
    $sql = "SELECT name, id FROM suppliers";
    
    $res = mysqli_query($conn,$sql);
    $suppliers = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $suppliers;
}
function get_materials($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $lab_id = $arguments[0];
        $type = $arguments[1];
    }

    $arr = array();
    $sql = "";
    if($type == ""){
        $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id";
        $res = mysqli_query($conn,$sql);
        $arr = mysqli_fetch_all($res,MYSQLI_ASSOC);
    } else if($type == "SPLIT"){
        $sql = "SELECT * FROM material_stock";
        $res = mysqli_query($conn,$sql);
        $result1 = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id AND type='ΑΝΑΛΩΣΗΜΑ'";
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $new_result1 = array();
        foreach ($result as $material) {
            foreach ($result1 as $material_stock) {
                if ($material["id"] == $material_stock["material_id"]) {
                    $material[$material_stock["academic_year"]] = $material_stock["stock"];
                }
            }
            $new_result1[] = $material;
        }
        $arr["ΑΝΑΛΩΣΗΜΑ"] = $new_result1;

        $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id AND type='ΒΡΑΧΕΙΑΣ'";
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $new_result2 = array();
        foreach ($result as $material) {
            foreach ($result1 as $material_stock) {
                if ($material["id"] == $material_stock["material_id"]) {
                    $material[$material_stock["academic_year"]] = $material_stock["stock"];
                }
            }
            $new_result2[] = $material;
        }
        $arr["ΒΡΑΧΕΙΑΣ"] = $new_result2;

        $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id AND type='ΜΑΚΡΑΣ'";
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $new_result3 = array();
        foreach ($result as $material) {
            foreach ($result1 as $material_stock) {
                if ($material["id"] == $material_stock["material_id"]) {
                    $material[$material_stock["academic_year"]] = $material_stock["stock"];
                }
            }
            $new_result3[] = $material;
        }
        $arr["ΜΑΚΡΑΣ"] = $new_result3;

    }
    
    return $arr;
}
function get_academic_year_max_protocol_id($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_POST['arguments'];
        $academic_year = $arguments[0];

        $sql = "SELECT MAX(protocol_id) FROM invoice WHERE academic_year = '$academic_year'";
    
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res,MYSQLI_ASSOC);
    }

    
    return $result;
}
function add_new_supplier($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_POST['arguments'];
        $new_supplier_name = $arguments[0];

        $sql = "INSERT INTO suppliers (name) SELECT '$new_supplier_name' WHERE '$new_supplier_name' NOT IN (SELECT name FROM suppliers)";

        $result = mysqli_query($conn,$sql);
        $rows_affected = mysqli_affected_rows($conn);
        if($result === true){
            if ($rows_affected === 0){
                $result = "exists";
            } else {
                $result = true;
            }
        }
    }

    return $result;
}
function add_new_material($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_POST['arguments'];
        $name = $arguments[0];
        $type = $arguments[1];

        $sql = "INSERT INTO materials (name, type) VALUES ('$name','$type')";
        $result = mysqli_query($conn,$sql);
        
        $last_id = mysqli_insert_id($conn);

        $rows_affected = mysqli_affected_rows($conn);
        if($result === true){
            if ($rows_affected === 0){
                $result = "exists";
            } else {
                $result = true;
            }
        }
    }

    return $result . "|-|" . $last_id;
}
function get_lab_manager($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $lab_id = $arguments[0];
        $academic_year = $arguments[1];

        $sql = "SELECT user_id FROM roles WHERE role IN ('ΥΠΕΥΘΥΝΟΣ ΕΡΓΑΣΤΗΡΙΟΥ') AND lab_id = $lab_id AND academic_year = '$academic_year'";
    
        $res = mysqli_query($conn,$sql);
        $ids = mysqli_fetch_all($res,MYSQLI_ASSOC);
        $ids = array_column($ids, 'user_id'); // get only the user_id column
        $ids = implode(',', $ids); // join the IDs with commas
        $sql = "SELECT id, lastname, firstname FROM users WHERE id IN ($ids)";

        $res1 = mysqli_query($conn,$sql);
        $names = mysqli_fetch_all($res1,MYSQLI_ASSOC);

        return $names;
    }
}
function get_lab_buyers($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $lab_id = $arguments[0];
        $academic_year = $arguments[1];

        $sql = "SELECT user_id FROM roles WHERE role IN ('ΕΠΙΤΡΟΠΗ ΑΓΟΡΑΣ 1','ΕΠΙΤΡΟΠΗ ΑΓΟΡΑΣ 2','ΕΠΙΤΡΟΠΗ ΑΓΟΡΑΣ 3') AND lab_id = $lab_id AND academic_year = '$academic_year'";
    
        $res = mysqli_query($conn,$sql);
        $ids = mysqli_fetch_all($res,MYSQLI_ASSOC);
        $ids = array_column($ids, 'user_id'); // get only the user_id column
        $ids = implode(',', $ids); // join the IDs with commas
        $sql = "SELECT id, lastname, firstname FROM users WHERE id IN ($ids)";

        $res1 = mysqli_query($conn,$sql);
        $names = mysqli_fetch_all($res1,MYSQLI_ASSOC);

        return $names;
    }
}
function get_lab_receivers($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $lab_id = $arguments[0];
        $academic_year = $arguments[1];

        $sql = "SELECT user_id FROM roles WHERE role IN ('ΕΠΙΤΡΟΠΗ ΠΑΡΑΛΑΒΗΣ 1','ΕΠΙΤΡΟΠΗ ΠΑΡΑΛΑΒΗΣ 2') AND lab_id = $lab_id AND academic_year = '$academic_year'";
    
        $res = mysqli_query($conn,$sql);
        $ids = mysqli_fetch_all($res,MYSQLI_ASSOC);
        $ids = array_column($ids, 'user_id'); // get only the user_id column
        $ids = implode(',', $ids); // join the IDs with commas
        $sql = "SELECT id, lastname, firstname FROM users WHERE id IN ($ids)";

        $res1 = mysqli_query($conn,$sql);
        $names = mysqli_fetch_all($res1,MYSQLI_ASSOC);

        return $names;
    }
}
function save_pdf($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else 
    {
        $arguments        = $_POST['arguments'];
        $html             = $arguments[0];
        $academic_year    = $arguments[1];
        $protocol_date    = $arguments[2];
        $field_id         = $arguments[3];
        $lab_id           = $arguments[4];
        $invoice_no       = $arguments[5];
        $invoice_date     = $arguments[6];
        $field_cost       = $arguments[7];
        $cost             = $arguments[8];
        $supplier_id      = $arguments[9];
        $materials_bought = $arguments[10];
        $protocol_no      = $arguments[11];
        $payment_method   = $arguments[12];


        // instantiate dompdf class

        $options = new Options();
        $options->set('defaultFont', 'DejaVu Sans');
        $options->set('isRemoteEnabled', true);
        $dompdf = new Dompdf($options);

            
        $dompdf->loadHtml($html);

        // set paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // render html as pdf
        $dompdf->render();

        // write pdf to a file
        $pdf = $dompdf->output();
        $date = str_replace("/", "_", $protocol_date); 
        $pdf_name = $date . "_" . $protocol_no . ".pdf";
        $output_name = "pdf_protocols/" . $pdf_name;
        if (file_put_contents($output_name, $pdf) !== false) {

            $invoice_sql_date = DateTime::createFromFormat("d/m/Y", $invoice_date);
            $new_invoice_date =  $invoice_sql_date->format("Y-m-d");

            $protocol_sql_date = DateTime::createFromFormat("d/m/Y", $protocol_date);
            $new_protocol_date = $protocol_sql_date->format("Y-m-d");

            $sql = "INSERT INTO invoice (protocol_id, invoice_number, invoice_date, protocol_date, supplier_id, field_id, lab_id, cost, field_cost, protocol_pdf, payment_method, academic_year) SELECT $protocol_no, $invoice_no, '$new_invoice_date', '$new_protocol_date', $supplier_id, $field_id, $lab_id, $cost, $field_cost, '$pdf_name', '$payment_method', '$academic_year' FROM DUAL WHERE NOT EXISTS ( SELECT * FROM invoice WHERE protocol_id=$protocol_no AND academic_year = '$academic_year')";
            $result = mysqli_query($conn,$sql);

            if($result) {
                foreach ($materials_bought as $material) {
                    $sql = "INSERT INTO purchace (material_id, invoice_id, amount, cost, academic_year) VALUES ($material[id], $invoice_no, $material[amount], 0, '$academic_year')";
                    $result = mysqli_query($conn,$sql);
                }
            }
        }
    }
    return $result;
}
function get_invoices($conn, $result){
    $sql = "SELECT * FROM invoice";
    $res = mysqli_query($conn,$sql);
    $invs = mysqli_fetch_all($res,MYSQLI_ASSOC);

    $arr = array();
    $count = 0;
    foreach($invs as $inv){
        $sql = "SELECT name FROM fields WHERE id=$inv[field_id]";
        $res = mysqli_query($conn,$sql);
        $field_name = mysqli_fetch_assoc($res);
        $inv["field"] = $field_name["name"];

        $sql = "SELECT name FROM labs WHERE id=$inv[lab_id]";
        $res = mysqli_query($conn,$sql);
        $lab_name = mysqli_fetch_assoc($res);
        $inv["lab"] = $lab_name["name"];

        $sql = "SELECT name FROM suppliers WHERE id=$inv[supplier_id]";
        $res = mysqli_query($conn,$sql);
        $supplier_name = mysqli_fetch_assoc($res);
        $inv["supplier"] = $supplier_name["name"];

        $inv["count"] = $count+1;

        $arr[$count] = $inv;

        $count = $count + 1;
    }

    return $arr;
}
function get_purchace($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else 
    {
        $arguments     = $_GET['arguments'];
        $incoive_id    = $arguments[0];
        $academic_year = $arguments[1];

        $sql = "SELECT * FROM purchace WHERE invoice_id = $incoive_id AND academic_year = '$academic_year'";
        $res = mysqli_query($conn,$sql);
        $pers = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $arr = array();
        $count = 0;
        foreach($pers as $per){
            $sql = "SELECT name FROM materials WHERE id=$per[material_id]";
            $res = mysqli_query($conn,$sql);
            $field_name = mysqli_fetch_assoc($res);
            $per["supply"] = $field_name["name"];

            $per["count"] = $count+1;

            $arr[$count] = $per;

            $count = $count + 1;
        }
    }

    return $arr;
}
function get_users($conn, $result){
    $sql = "SELECT * FROM users";
    $res = mysqli_query($conn,$sql);
    $users = mysqli_fetch_all($res,MYSQLI_ASSOC);

    return $users;
}
function get_user_roles($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else 
    {
        $arguments  = $_GET['arguments'];
        $user_id    = $arguments[0];
    
        $sql = "SELECT * FROM roles WHERE user_id = $user_id";
        $res = mysqli_query($conn,$sql);
        $users_roles = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $count = 0;
        $arr = array();
        foreach($users_roles as $user_role){
            if($user_role["field_id"] != 0 ){
                $sql = "SELECT name FROM fields WHERE id=$user_role[field_id]";
                $res = mysqli_query($conn,$sql);
                $field_name = mysqli_fetch_assoc($res);
                $user_role["field"] = $field_name["name"];
            }
    
            if($user_role["lab_id"] !=0 ) {
                $sql = "SELECT name FROM labs WHERE id=$user_role[lab_id]";
                $res = mysqli_query($conn,$sql);
                $lab_name = mysqli_fetch_assoc($res);
                $user_role["lab"] = $lab_name["name"];
            }

            if($user_role["active"] == 1 ) {
                $user_role["active"] = "ΝΑΙ";
            } else {
                $user_role["active"] = "OXI";
            }

            $arr[$count] = $user_role;
            
            $count = $count + 1;
        }
    }

    return $arr;
}
?>