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
    } else if ($_POST['functionname'] == "upload_pdf"){
        $result = upload_pdf($conn, $result);
    } else if ($_POST['functionname'] == "delete_user_role"){
        $result = delete_user_role($conn, $result);
    } else if ($_POST['functionname'] == "update_user_role"){
        $result = update_user_role($conn, $result);
    } else if ($_POST['functionname'] == "add_user_role"){
        $result = add_user_role($conn, $result);
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
    } else if ($_GET['functionname'] == "get_user_fields"){
        $result = get_user_fields($conn, $result);
    } else if ($_GET['functionname'] == "get_user_labs"){
        $result = get_user_labs($conn, $result);
    } else if ($_GET['functionname'] == "get_field_labs"){
        $result = get_field_labs($conn, $result);
    } else if ($_GET['functionname'] == "get_materials"){
        $result = get_materials($conn, $result);
    } else if ($_GET['functionname'] == "get_academic_years"){
        $result = get_academic_years($conn, $result);
    } else {
        $result['error'] = 'No function name!'; 
    }
}

mysqli_close($conn);

echo json_encode($result);

function array_unique_by_key($array, $key) {
    $temp = array(); // temporary array to store the keys
    $result = array(); // result array to store the unique values
    foreach ($array as $value) { // loop through the input array
      if (!in_array($value[$key], $temp)) { // if the key is not in the temporary array
        $temp[] = $value[$key]; // add it to the temporary array
        $result[] = $value; // add the value to the result array
      }
    }
    return $result; // return the result array
}
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
            $_SESSION['id'] = $row["id"];
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
        $protocol_id = $arguments[0];
        $invoice_number = $arguments[1];
        $protocol_pdf = $arguments[2];
        $invoice_pdf = $arguments[3];

        
        $sql = "DELETE FROM invoice WHERE protocol_id = $protocol_id";
        $result = mysqli_query($conn,$sql);

        $sql = "DELETE FROM purchace WHERE invoice_id = $invoice_number";
        $result = mysqli_query($conn,$sql);

        $file_to_delete = "pdf_protocols/" . $protocol_pdf;
        unlink($file_to_delete);

        $file_to_delete = "pdf_invoices/" . $invoice_pdf;
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
function delete_user_role($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments = $_POST['arguments'];
        $role_id = $arguments[0];

        
        $sql = "DELETE FROM roles WHERE id = $role_id";
        $result = mysqli_query($conn,$sql);

        return $result;
    }
}
function update_user_role($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments = $_POST['arguments'];
        $role_id = $arguments[0];
        $academic_year = $arguments[1];
        $active = $arguments[2];
        $field = $arguments[3];
        $lab = $arguments[4];
        $role = $arguments[5];

        $field_id = $lab_id = 0;
        if($field !== ""){
            $sql = "SELECT id FROM fields WHERE name = '$field'";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_row($result);
            $field_id = $row[0];
        }

        if($lab !== ""){
            $sql = "SELECT id FROM labs WHERE name = '$lab'";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_row($result);
            $lab_id = $row[0];
        }

        $sql = "UPDATE roles SET academic_year = '$academic_year', active = '$active', field_id = $field_id, lab_id = $lab_id, role = '$role' WHERE  id = $role_id";
        $result = mysqli_query($conn,$sql);

        return $result;
    }
}
function add_user_role($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments = $_POST['arguments'];
        $user_id = $arguments[0];
        $academic_year = $arguments[1];
        $active = $arguments[2];
        $field = $arguments[3];
        $lab = $arguments[4];
        $role = $arguments[5];

        $field_id = $lab_id = 0;
        if($field !== ""){
            $sql = "SELECT id FROM fields WHERE name = '$field'";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_row($result);
            $field_id = $row[0];
        }

        if($lab !== ""){
            $sql = "SELECT id FROM labs WHERE name = '$lab'";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_row($result);
            $lab_id = $row[0];
        }

        $sql = "INSERT INTO roles (user_id, field_id, lab_id, academic_year, role, active) VALUES ($user_id, $field_id, $lab_id, '$academic_year', '$role', '$active')";
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
function get_user_fields($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $user_id = $arguments[0];
    }

    $sql = "SELECT field_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΤΟΜΕΑ'";
    $res = mysqli_query($conn,$sql);
    $field_ids = mysqli_fetch_all($res);

    $sql = "SELECT lab_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΕΡΓΑΣΤΗΡΙΟΥ'";
    $res = mysqli_query($conn,$sql);
    $lab_ids = mysqli_fetch_all($res);
    
    $field_labs = array();
    $fields = array();
    $both = array();
    foreach ($field_ids as $field_id ) {
        $sql = "SELECT name, id FROM labs WHERE field_id = $field_id[0]";
        $res = mysqli_query($conn,$sql);
        $labs_data = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $sql1 = "SELECT name, id FROM fields WHERE id = $field_id[0]";
        $res1 = mysqli_query($conn,$sql1);
        $field_data = mysqli_fetch_row($res1);

        $fields[] = ["name"=>$field_data[0], "id"=>$field_data[1] ];
        $options[$field_data[0]] = $labs_data;
    }    

    foreach ($lab_ids as $lab_id ) {
        $sql = "SELECT name, id, field_id FROM labs WHERE id = $lab_id[0]";
        $res = mysqli_query($conn,$sql);
        $labs_data = mysqli_fetch_row($res);

        $sql1 = "SELECT name,id FROM fields WHERE id = $labs_data[2]";
        $res1 = mysqli_query($conn,$sql1);
        $field_data = mysqli_fetch_row($res1);

        $found = false;
        foreach ($fields as $obj) {
            // echo ( $obj["name"] . "  =====  " . $field_data[0] . "\n");
            if ($obj["name"] == $field_data[0]){
                $found = true;
            }
        }

        if($found === false){
            $fields[] = ["name"=>$field_data[0], "id"=>$field_data[1] ];
            $options[$field_data[0]] = ["name"=>$labs_data[0], "id"=>$labs_data[1] ];
        }
    }

    $both[] = $fields;
    $both[] = $options;

    return $both;
}
function get_labs($conn, $result){
    $sql = "SELECT name, id FROM labs";
    
    $res = mysqli_query($conn,$sql);
    $fields = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $fields;
}
function get_user_labs($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $user_id = $arguments[0];
    }
    
    $sql = "SELECT labs.name, labs.short_name, labs.id FROM labs JOIN roles ON labs.id = roles.lab_id WHERE roles.user_id = $user_id";
    $res = mysqli_query($conn,$sql);
    $result = mysqli_fetch_all($res,MYSQLI_ASSOC);

    return $result;
}
function get_field_labs($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $field_id = $arguments[0];
    }

    $sql = "SELECT name, short_name, id FROM labs WHERE field_id = $field_id";
    
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

        $sql = "SELECT * FROM academic_years ORDER BY id ASC";
        $res = mysqli_query($conn,$sql);
        $academic_years_asc = mysqli_fetch_all($res,MYSQLI_ASSOC);


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

        $sql = "SELECT protocol_id FROM invoice WHERE academic_year = '$academic_year'";
    
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res);

        $ids = array();

        for($i=0; $i<sizeof($result); $i++){
            $ids[] = $result[$i][0];
        }

        if(sizeof($ids) == 0){
            return 1;
        } else if (sizeof($ids) > 0 ) {
            for($i=min($ids); $i<=max($ids); $i++)
            {
                if (!in_array($i, $ids)){
                    return $i;
                }

                if($i == max($ids)){
                    return $i+1;
                }
            }
        }
    }

    return 1;
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
        $lab_id = $arguments[2];
        $field_id = $arguments[3];

        $sql = "INSERT INTO materials (name, type, lab_id, field_id) VALUES ('$name','$type', $lab_id, $field_id)";
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
        $invoice_pdf_name = $arguments[13];

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
        $protocol_pdf_name = $date . "_" . $protocol_no . ".pdf";
        $output_name = "pdf_protocols/" . $protocol_pdf_name;
        if (file_put_contents($output_name, $pdf) !== false) {

            $invoice_sql_date = DateTime::createFromFormat("d/m/Y", $invoice_date);
            $new_invoice_date =  $invoice_sql_date->format("Y-m-d");

            $protocol_sql_date = DateTime::createFromFormat("d/m/Y", $protocol_date);
            $new_protocol_date = $protocol_sql_date->format("Y-m-d");

            $sql = "INSERT INTO invoice (protocol_id, invoice_number, invoice_date, protocol_date, supplier_id, field_id, lab_id, cost, field_cost, protocol_pdf, invoice_pdf, payment_method, academic_year) SELECT $protocol_no, $invoice_no, '$new_invoice_date', '$new_protocol_date', $supplier_id, $field_id, $lab_id, $cost, $field_cost, '$protocol_pdf_name', '$invoice_pdf_name', '$payment_method', '$academic_year' FROM DUAL WHERE NOT EXISTS ( SELECT * FROM invoice WHERE protocol_id=$protocol_no AND academic_year = '$academic_year')";
            $result = mysqli_query($conn,$sql);

            if($result) {
                foreach ($materials_bought as $material) {
                    //store the purchace
                    $sql = "INSERT INTO purchace (material_id, invoice_id, amount, cost, academic_year) VALUES ($material[id], $invoice_no, $material[amount], 0, '$academic_year')";
                    $result = mysqli_query($conn,$sql);

                    //get the total num bought of the material of the year
                    $sql = "SELECT SUM(amount) FROM purchace WHERE material_id = $material[id] AND academic_year = '$academic_year'";
                    $result = mysqli_query($conn,$sql);
                    $year_amount = mysqli_fetch_row($result);

                    //get the id of the academic year
                    $sql = "SELECT id FROM academic_years WHERE academic_year = '$academic_year'";
                    $result = mysqli_query($conn,$sql);
                    $current_year_id = mysqli_fetch_row($result);

                    //set the previous academic year id 
                    $previous_year_id = $current_year_id[0] - 1;

                    //get the previous academic year 
                    $sql = "SELECT academic_year FROM academic_years WHERE id = $previous_year_id";
                    $result = mysqli_query($conn,$sql);
                    $previous_academic_year = mysqli_fetch_row($result);

                    //get the stock of the previous year 
                    $sql = "SELECT stock FROM material_stock WHERE material_id = $material[id] AND academic_year = '$previous_academic_year[0]'";
                    $result = mysqli_query($conn,$sql);
                    $previous_year_stock = mysqli_fetch_row($result);

                    //add the stock to this year total
                    $total_amount = $year_amount[0];
                    if (!is_null($previous_year_stock)){
                        $total_amount = $total_amount + $previous_year_stock[0];
                    }

                    $sql = "INSERT INTO material_stock (material_id, stock, academic_year) VALUES ($material[id], $total_amount, '$academic_year')";
                    $result = mysqli_query($conn,$sql);
                }
            }
        }
    }
    return $result;
}
function get_invoices($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $user_id = $arguments[0];

        $sql = "SELECT * FROM invoice WHERE lab_id IN ( SELECT lab_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΕΡΓΑΣΤΗΡΙΟΥ' ) OR field_id IN ( SELECT field_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΤΟΜΕΑ' )";
        // echo $sql;
        $res = mysqli_query($conn,$sql);
        $invs = mysqli_fetch_all($res,MYSQLI_ASSOC);
        // print_r($invs);

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

            $result[$count] = $inv;

            $count = $count + 1;
        }
    }
    return $result;
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
function get_academic_years($conn, $result){
    $sql = "SELECT DISTINCT academic_year FROM academic_years";
    $res = mysqli_query($conn,$sql);
    $years = mysqli_fetch_all($res,MYSQLI_ASSOC);

    return $years;
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

            $arr[$count] = $user_role;
            
            $count = $count + 1;
        }
    }

    return $arr;
}
function upload_pdf($conn, $result){
    $target_dir = "pdf_invoices/";
    $lab_short = $_POST['short_lab'];

    $invoice_sql_date = DateTime::createFromFormat("d/m/Y", $_POST['invoice_date']);
    $new_invoice_date =  $invoice_sql_date->format("Y-m-d");

    $invoice_pdf_name = $lab_short . "_" . $new_invoice_date . ".pdf";
    $target_file = $target_dir . $invoice_pdf_name;
    $file_type = $_FILES["pdf_file"]["type"];

    // Check if file is a PDF file
    if ($file_type == "application/pdf") {
        // Try to upload fileE]=
        $result = move_uploaded_file($_FILES["pdf_file"]["tmp_name"], $target_file);
    }

    return $invoice_pdf_name;
}
?>