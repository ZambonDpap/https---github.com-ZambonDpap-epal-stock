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
    } else if ($_POST['functionname'] == "get_fields"){
        $result = get_fields($conn, $result);
    } else if ($_POST['functionname'] == "get_labs"){
        $result = get_labs($conn, $result);
    } else if ($_POST['functionname'] == "get_suppliers"){
        $result = get_suppliers($conn, $result);
    } else if ($_POST['functionname'] == "get_materials"){
        $result = get_materials($conn, $result);
    } else if ($_POST['functionname'] == "get_last_invoice_id"){
        $result = get_last_invoice_id($conn, $result);
    } else if ($_POST['functionname'] == "add_new_supplier"){
        $result = add_new_supplier($conn, $result);
    } else if ($_POST['functionname'] == "add_new_material"){
        $result = add_new_material($conn, $result);
    } else if ($_POST['functionname'] == "save_pdf"){
        $result = save_pdf($conn, $result);
    }
} else if( !isset($_POST['functionname'])){
    if ($_GET['functionname'] == "get_lab_manager"){
        $result = get_lab_manager($conn, $result);
    } else if ($_GET['functionname'] == "get_lab_buyers"){
        $result = get_lab_buyers($conn, $result);
    } else if ($_GET['functionname'] == "get_lab_receivers"){
        $result = get_lab_receivers($conn, $result);
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

        $sql = "SELECT id FROM users WHERE lastname = '$username' and password = '$password'";
        $res = mysqli_query($conn,$sql);
        $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
        $count = mysqli_num_rows($res);

        if($count == 1) {
            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
            $result["success"] = "success";
        }else {
            $result["error"] = "Your Login Name or Password is invalid";
        }
    }

    return $result;
}
function get_fields($conn, $result){
    $sql = "SELECT name, id FROM fields";
    
    $res = mysqli_query($conn,$sql);
    $fields = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $fields;
}
function get_labs($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_POST['arguments'];
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
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_POST['arguments'];
        $lab_id = $arguments[0];
    }
    
    $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id";
    
    $res = mysqli_query($conn,$sql);
    $result = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $result;
}
function get_last_invoice_id($conn, $result){
    $sql = "SELECT MAX(id) FROM invoice";
    
    $res = mysqli_query($conn,$sql);
    $max_id = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $max_id;
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
function save_pdf(){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else 
    {
        $arguments = $_POST['arguments'];
        $html = $arguments[0];

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
        file_put_contents("newfile.pdf", $pdf);
    }
}

?>