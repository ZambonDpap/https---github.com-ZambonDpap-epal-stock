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
    } else if ($_POST['functionname'] == "destroy_material"){
        $result = destroy_material($conn, $result);
    } else if ($_POST['functionname'] == "move_material"){
        $result = move_material($conn, $result);
    } else if ($_POST['functionname'] == "delete_destroy_material"){
        $result = delete_destroy_material($conn, $result);
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
    }else if ($_GET['functionname'] == "get_lab_roles"){
       $result = get_lab_roles($conn, $result);
    }else if ($_GET['functionname'] == "get_field_roles"){
        $result = get_field_roles($conn, $result);
    }else if ($_GET['functionname'] == "get_current_academic_year"){
        $result = get_current_academic_year($conn, $result);
    }else if ($_GET['functionname'] == "get_previous_academic_year"){
        $result = get_previous_academic_year($conn, $result);
    }else if ($_GET['functionname'] == "get_material_destroys"){
        $result = get_material_destroys($conn, $result);
    }else if ($_GET['functionname'] == "get_praxis"){
        $result = get_praxis($conn, $result);
    }else if ($_GET['functionname'] == "get_lab_materials_book"){
        $result = get_lab_materials_book($conn, $result);
    }else if ($_GET['functionname'] == "get_lab_materials_book_overview"){
        $result = get_lab_materials_book_overview($conn, $result);
    } else {
        $result['error'] = 'No function name!'; 
    }
}

mysqli_close($conn);
echo json_encode($result);

//INVOICES
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
        $folder = $arguments[4];
        
        $sql = "DELETE FROM invoice WHERE protocol_id = $protocol_id";
        $result = mysqli_query($conn,$sql);

        $sql = "SELECT * FROM purchace WHERE invoice_number = '$invoice_number'";
        $result = mysqli_query($conn,$sql);
        $purchaces = mysqli_fetch_all($result,MYSQLI_ASSOC);

        foreach ($purchaces as $purchace){
            $material_id = $purchace["material_id"];
            $amount = $purchace["amount"];
            $academic_year = $purchace["academic_year"];

            $sql = "UPDATE material_stock SET stock = stock - $amount WHERE material_id = $material_id AND academic_year = '$academic_year'";
            $result = mysqli_query($conn,$sql);
        }

        $sql = "DELETE FROM purchace WHERE invoice_number = '$invoice_number'";
        $result = mysqli_query($conn,$sql);

        $file_to_delete = "Πρωτόκολλα/" . $folder . $protocol_pdf;
        unlink($file_to_delete);

        $file_to_delete = "Τιμολόγια/" . $folder . $invoice_pdf;
        unlink($file_to_delete);

        return $result;
    }
}
function get_invoices($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $user_id = $arguments[0];

        $sql = "SELECT admin_level FROM users WHERE id = $user_id";
        $res = mysqli_query($conn,$sql);
        $admin_lvl =  mysqli_fetch_row($res);
        $admin_level = $admin_lvl[0];

        $sql = "";
        if($admin_level == 2){
            $sql = "SELECT * FROM invoice";
        } else {
            $sql = "SELECT * FROM invoice WHERE lab_id IN ( SELECT lab_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΕΡΓΑΣΤΗΡΙΟΥ' ) OR field_id IN ( SELECT field_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΤΟΜΕΑ' )";
        }
        $res = mysqli_query($conn,$sql);
        $invs = mysqli_fetch_all($res,MYSQLI_ASSOC);

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


//SUPPLIER
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
function get_suppliers($conn, $result){
    $sql = "SELECT name, id FROM suppliers";
    
    $res = mysqli_query($conn,$sql);
    $suppliers = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $suppliers;
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


//USER ROLES
function get_users($conn, $result){
    $sql = "SELECT * FROM users";
    $res = mysqli_query($conn,$sql);
    $users = mysqli_fetch_all($res,MYSQLI_ASSOC);

    return $users;
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


//MATERIALS
function move_material($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments     = $_POST['arguments'];
        $material_id   = $arguments[0];
        $amount        = $arguments[1];
        $to            = $arguments[2];
        $user_id       = $arguments[3];
        $sqlDate       = $arguments[4];
        $action        = $arguments[5];
        $comments      = $arguments[6];
        $lab_id        = $arguments[7];
        $academic_year = current_academic_year($conn);

        //calculate material current stock for start lab
        $material_stocks = material_stock($conn, $material_id, $lab_id);
        $current_material_stock = $material_stocks[0] + $material_stocks[1];
        // echo("current material stock:" . $current_material_stock . " | ");

        //get the id of end lab
        $sql = "SELECT id, field_id FROM labs WHERE name = '$to'";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($result);
        $to_lab_id = $row["id"];
        $to_lab_field_id = $row["field_id"];
        // echo("to lab id:" . $to_lab_id . " | ");

        // if moving material is less than or equal to the current material stock
        if( intval($current_material_stock) >= intval($amount)){
            //get the name of the material
            $sql = "SELECT name, type FROM materials WHERE id = $material_id";
            $result = mysqli_query($conn,$sql);
            $material_name_type = mysqli_fetch_assoc($result);
            $material_name = $material_name_type["name"];
            $material_type = $material_name_type["type"];
            // echo("material name to move: " . $material_name . " type: " . $material_type . " | ");

            //check if the material exists for the end lab

            $sql = "SELECT id FROM materials WHERE name = '$material_name' AND lab_id = $to_lab_id";
            $result = mysqli_query($conn,$sql);
            $fetch = mysqli_fetch_assoc($result);

            if(is_null($fetch)){
                // echo ("material id for lab to move does not exists | ");
                //if material does not exists for this lab, create one and add the amount to the stock
                $sql = "INSERT INTO materials (name, field_id, lab_id, type) VALUES ('$material_name', $to_lab_field_id, $to_lab_id, '$material_type')";
                mysqli_query($conn,$sql);
                $new_material_id = mysqli_insert_id($conn);
                // echo ("new material id added " . $new_material_id);
                $sql = "INSERT INTO material_stock (material_id, lab_id, academic_year, stock) VALUES ($new_material_id, $to_lab_id, '$academic_year', $amount)";
                mysqli_query($conn,$sql);
            } else {
                $move_to_material_id = $fetch["id"];
                // echo ($move_to_material_id . " exists | ");
                // if it exists add the amount to the stock
                $sql = "UPDATE material_stock SET stock = stock + $amount WHERE material_id = $move_to_material_id AND lab_id = $to_lab_id AND academic_year = '$academic_year'";
                mysqli_query($conn,$sql);
            }

            //Update also the stock the the lab that the amount was moved
            $sql = "UPDATE material_stock SET stock = stock - $amount WHERE material_id = $material_id AND lab_id = $lab_id AND academic_year = '$academic_year'";
            $result = mysqli_query($conn,$sql);

            //Add the action to the destroy table for reference
            $sql = "INSERT INTO destroy (material_id, amount, user_id, lab_id, action, to_lab_id, comments, date, academic_year) VALUES ($material_id, $amount, $user_id, $lab_id, '$action', $to_lab_id, '$comments', '$sqlDate', '$academic_year')";
            mysqli_query($conn,$sql);
            $sql = "SELECT MAX(id) AS MaxID FROM destroy WHERE user_id = $user_id";
            $res = mysqli_query($conn,$sql);
            $max_id = mysqli_fetch_assoc($res);

            $material_stocks = material_stock($conn, $material_id, $lab_id);
            $current_material_stock = $material_stocks[0] + $material_stocks[1];

            $sql = "SELECT lastname, firstname FROM users WHERE id = $user_id"; 
            $res = mysqli_query($conn,$sql);
            $user_name = mysqli_fetch_assoc($res);

            $actions["material_id"]    = $material_id;
            $actions["lab_id"]         = $lab_id;
            $actions["destroy_id"]     = $max_id["MaxID"];
            $actions["current_amount"] = $current_material_stock;
            $actions["user_name"]      = $user_name["lastname"] . " " . $user_name["firstname"];
            $actions["action"]         = $action;
            $actions["academic_year"]  = $academic_year;
            $actions["amount"]         = $amount;
            $actions["to_lab_id"]      = $to;
            $actions["comments"]       = $comments;
            $actions["date"]           = $sqlDate;
            
            return $actions;

        } else {
            $result = "LARGER";
        }

        return $result;
    }    
}
function destroy_material($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments     = $_POST['arguments'];
        $material_id   = $arguments[0];
        $amount        = $arguments[1];
        $user_id       = $arguments[2];
        $sqlDate       = $arguments[3];
        $action        = $arguments[4];
        $comments      = $arguments[5];
        $lab_id        = $arguments[6];
        $academic_year = current_academic_year($conn);

        $material_stocks = material_stock($conn, $material_id, $lab_id);
        $current_material_stock = $material_stocks[0] + $material_stocks[1];

        // echo($lab_id . " " . $current_material_stock . " " . $amount);

        if( intval($current_material_stock) >= intval($amount)){
            $sql = "UPDATE material_stock SET stock = stock - $amount WHERE material_id = $material_id AND lab_id = $lab_id AND academic_year = '$academic_year'";
            $result = mysqli_query($conn,$sql);

            $sql = "INSERT INTO destroy (material_id, amount, lab_id, action, user_id, comments, date, academic_year) VALUES ($material_id, $amount, $lab_id, '$action', $user_id, '$comments', '$sqlDate', '$academic_year')";
            mysqli_query($conn,$sql);
            $sql = "SELECT MAX(id) AS MaxID FROM destroy WHERE user_id = $user_id";
            $res = mysqli_query($conn,$sql);
            $max_id = mysqli_fetch_assoc($res);

            $material_stocks = material_stock($conn, $material_id, $lab_id);
            $current_material_stock = $material_stocks[0] + $material_stocks[1];

            $sql = "SELECT lastname, firstname FROM users WHERE id = $user_id";
            $res = mysqli_query($conn,$sql);
            $user_name = mysqli_fetch_assoc($res);

            $destroy["material_id"] = $material_id;
            $destroy["destroy_id"] = $max_id["MaxID"];
            $destroy["current_amount"] = $current_material_stock;
            $destroy["lab_id"] = $lab_id;
            $destroy["user_name"] = $user_name["lastname"] . " " . $user_name["firstname"];
            $destroy["action"] = $action;
            $destroy["academic_year"] = $academic_year;
            $destroy["amount"] = $amount;
            $destroy["comments"] = $comments;
            $destroy["date"] = $sqlDate;

            $result = $destroy;

        } else if (intval($current_material_amount) < $amount) {
            $result = "LARGER";
        }

        return $result;
    }
}
function delete_destroy_material($conn, $result){
    if( !isset($_POST['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
        return $result;

    } else
    {
        $arguments   = $_POST['arguments'];
        $destroy_id  = $arguments[0];
        $action      = $arguments[1];
        $lab_id      = $arguments[2];

        $sql = "SELECT * FROM destroy WHERE id = $destroy_id";
        $result = mysqli_query($conn,$sql);
        $destroy = mysqli_fetch_all($result,MYSQLI_ASSOC);

        $amount        = $destroy[0]["amount"];
        $material_id   = $destroy[0]["material_id"];
        $academic_year = $destroy[0]["academic_year"];
        $to_lab_id     = $destroy[0]["to_lab_id"];

        $sql = "UPDATE material_stock SET stock = stock + $amount WHERE material_id = $material_id AND lab_id = $lab_id AND academic_year = '$academic_year'";
        mysqli_query($conn,$sql);

        $sql = "SELECT stock FROM material_stock WHERE material_id = $material_id AND lab_id = $lab_id AND academic_year = '$academic_year'";
        $result = mysqli_query($conn,$sql);
        $fetch = mysqli_fetch_assoc($result);
        $stock = $fetch["stock"];

        $last_year_stock = 0;
        $previous_academic_year = previous_academic_year($conn);
        $sql = "SELECT stock FROM material_stock WHERE material_id = $material_id AND lab_id = $lab_id AND academic_year = '$previous_academic_year'";
        $result = mysqli_query($conn,$sql);
        $fetch = mysqli_fetch_assoc($result);
        if(!is_null($fetch)){
            $last_year_stock = $fetch["stock"];
        }

        if($action == "Μεταφορά"){
            $sql = "SELECT name FROM materials WHERE id = $material_id";
            $result = mysqli_query($conn,$sql);
            $fetch = mysqli_fetch_assoc($result);
            $material_name = $fetch["name"];

            $sql = "SELECT id FROM materials WHERE lab_id = $to_lab_id AND name = '$material_name'";
            $result = mysqli_query($conn,$sql);
            $fetch = mysqli_fetch_assoc($result);
            $to_lab_material_id = $fetch["id"];

            $sql = "UPDATE material_stock SET stock = stock - $amount WHERE material_id = $to_lab_material_id AND lab_id = $to_lab_id AND academic_year = '$academic_year'";
            $result = mysqli_query($conn,$sql);
        }

        $sql = "DELETE FROM destroy WHERE id = $destroy_id";
        $result = mysqli_query($conn,$sql);

        return [true, $stock + $last_year_stock];
    }
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
        $sql = "SELECT name FROM labs ORDER BY name ASC ";
        $res = mysqli_query($conn,$sql);
        $labs = [];
        while($row = mysqli_fetch_row($res)) {
            $labs[] = $row[0];
        }

        $current_academic_year = current_academic_year($conn);
        $previous_academic_year = previous_academic_year($conn);

        $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id AND type='ΑΝΑΛΩΣΙΜΑ'";
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $new_result1 = array();
        foreach ($result as $material) {
            $material_stock = material_stock($conn, $material["id"], $lab_id);
            $material[$current_academic_year] = $material_stock[0] + $material_stock[1];
            $material[$previous_academic_year] = $material_stock[1];
            $material["action"] = "";
            $material["from"] = "";
            $material["to_lab_id"] = "";
            $material["comments"] = "";
            $material["labs"] = $labs;
            $material["destroy"] = 0;
            $new_result1[] = $material;
        }
        $arr["ΑΝΑΛΩΣΙΜΑ"] = $new_result1;


        $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id AND type='ΒΡΑΧΕΙΑΣ'";
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $new_result2 = array();
        foreach ($result as $material) {
            $material_stock = material_stock($conn, $material["id"], $lab_id);
            $material[$current_academic_year] = $material_stock[0] + $material_stock[1];
            $material[$previous_academic_year] = $material_stock[1];
            $material["action"] = "";
            $material["from"] = "";
            $material["to_lab_id"] = "";
            $material["comments"] = "";
            $material["labs"] = $labs;
            $material["destroy"] = 0;
            $new_result2[] = $material;
        }
        $arr["ΒΡΑΧΕΙΑΣ"] = $new_result2;

        $sql = "SELECT id, name, type FROM materials WHERE lab_id = $lab_id AND type='ΜΑΚΡΑΣ'";
        $res = mysqli_query($conn,$sql);
        $result = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $new_result3 = array();
        foreach ($result as $material) {
            $material_stock = material_stock($conn, $material["id"], $lab_id);
            $material[$current_academic_year] = $material_stock[0] + $material_stock[1];
            $material[$previous_academic_year] = $material_stock[1];
            $material["action"] = "";
            $material["from"] = "";
            $material["to_lab_id"] = "";
            $material["comments"] = "";
            $material["labs"] = $labs;
            $material["destroy"] = 0;
            $new_result3[] = $material;
        }
        $arr["ΜΑΚΡΑΣ"] = $new_result3;
    }
    
    return $arr;
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
function get_material_destroys($conn, $result){
    if( !isset($_GET['material_id']) ) 
    { 
        $result['error'] = 'No material id'; 
    } else 
    {
        $material_id = $_GET['material_id'];

        $current_academic_year = current_academic_year($conn);

        $sql = "SELECT * FROM destroy WHERE material_id = $material_id AND academic_year = '$current_academic_year' ";
        $res = mysqli_query($conn,$sql);
        $destroys = mysqli_fetch_all($res,MYSQLI_ASSOC);

        $count = 0;
        foreach ($destroys as $destroy){
            $user_id = $destroy["user_id"];
            $sql = "SELECT lastname, firstname FROM users WHERE id = $user_id";
            $res = mysqli_query($conn,$sql);
            $user_name = mysqli_fetch_assoc($res);
            $destroy["destroy_id"] = $destroy["id"];
            $destroy["user_name"] = $user_name["lastname"] . " " . $user_name["firstname"];

            $to_lab_id = $destroy["to_lab_id"];
            if(!is_null($to_lab_id)){
                $sql = "SELECT name FROM labs WHERE id = $to_lab_id";
                $res = mysqli_query($conn,$sql);
                $lab_name = mysqli_fetch_assoc($res);
                $destroy["to_lab_id"] = $lab_name["name"];
            } else {
                $destroy["to_lab_id"] = "";
            }
            
            $result[$count] = $destroy;
            $count = $count + 1;
        }
    }
    return  $result;
}
function material_stock($conn, $material_id, $lab_id){
    $current_stock = 0;
    $previous_stock = 0;
    $current_academic_year = current_academic_year($conn);
    $sql = "SELECT stock FROM material_stock WHERE material_id = $material_id AND lab_id = $lab_id AND academic_year = '$current_academic_year'";
    $result = mysqli_query($conn,$sql);
    $current_stock_res = mysqli_fetch_row($result);

    $previous_academic_year = previous_academic_year($conn);
    $sql = "SELECT stock FROM material_stock WHERE material_id = $material_id AND lab_id = $lab_id AND academic_year = '$previous_academic_year'";
    $result = mysqli_query($conn,$sql);
    $previous_stock_res = mysqli_fetch_row($result);
    
    if($current_stock_res != null){
        $current_stock = $current_stock_res[0];
    }
    if($previous_stock_res != null){
        $previous_stock = $previous_stock_res[0];
    }

    return  [$current_stock, $previous_stock];
}


//FIELDS
function get_fields($conn, $result){
    $sql = "SELECT name, id FROM fields";
    
    $res = mysqli_query($conn,$sql);
    $fields = mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    return $fields;
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
function get_user_fields($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else
    {
        $arguments = $_GET['arguments'];
        $user_id = $arguments[0];
    }

    $sql = "SELECT admin_level FROM users WHERE id = $user_id";
    $res = mysqli_query($conn,$sql);
    $admin_lvl =  mysqli_fetch_row($res);
    $admin_level = $admin_lvl[0];

    $field_ids = [];
    $lab_ids = [];
    if($admin_level == 2){
        $sql = "SELECT id FROM fields";
        $res = mysqli_query($conn,$sql);
        $field_ids = mysqli_fetch_all($res);

        $sql = "SELECT id FROM labs";
        $res = mysqli_query($conn,$sql);
        $lab_ids = mysqli_fetch_all($res);
    } else {
        $sql = "SELECT field_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΤΟΜΕΑ'";
        $res = mysqli_query($conn,$sql);
        $field_ids = mysqli_fetch_all($res);

        $sql = "SELECT lab_id FROM roles WHERE user_id = $user_id AND role = 'ΥΠΕΥΘΥΝΟΣ ΕΡΓΑΣΤΗΡΙΟΥ'";
        $res = mysqli_query($conn,$sql);
        $lab_ids = mysqli_fetch_all($res);
    }
    
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
function get_field_roles($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else 
    {
        $arguments     = $_GET['arguments'];
        $field_id      = $arguments[0];
        $academic_year = $arguments[1];

        $sql = "SELECT * FROM roles WHERE field_id = $field_id AND academic_year = '$academic_year' ";
        $res = mysqli_query($conn,$sql);
        $field_roles = mysqli_fetch_all($res,MYSQLI_ASSOC);

        for($i=0; $i<sizeof($field_roles); $i++){
            $id = $field_roles[$i]['user_id'];
            $sql1 = "SELECT id, lastname, firstname FROM users WHERE id =$id";
            $res1 = mysqli_query($conn,$sql1);
            $user_data = mysqli_fetch_all($res1,MYSQLI_ASSOC);

            $field_roles[$i]["firstname"] = $user_data[0]["firstname"];
            $field_roles[$i]["lastname"] = $user_data[0]["lastname"];
            $field_roles[$i]["user_id"] = $user_data[0]["id"];
        }
    }
    return $field_roles;
}


//LABS
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
function get_lab_roles($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else 
    {
        $arguments     = $_GET['arguments'];
        $lab_id      = $arguments[0];
        $academic_year = $arguments[1];

        $sql = "SELECT * FROM roles WHERE lab_id = $lab_id AND academic_year = '$academic_year' ";
        $res = mysqli_query($conn,$sql);
        $lab_roles = mysqli_fetch_all($res,MYSQLI_ASSOC);

        for($i=0; $i<sizeof($lab_roles); $i++){
            $id = $lab_roles[$i]['user_id'];
            $sql1 = "SELECT id, lastname, firstname FROM users WHERE id =$id";
            $res1 = mysqli_query($conn,$sql1);
            $user_data = mysqli_fetch_all($res1,MYSQLI_ASSOC);

            $lab_roles[$i]["firstname"] = $user_data[0]["firstname"];
            $lab_roles[$i]["lastname"] = $user_data[0]["lastname"];
            $lab_roles[$i]["user_id"] = $user_data[0]["id"];
        }
    }
    return  $lab_roles;
}
function get_lab_materials_book($conn, $result){
    $lab_id = $_GET['lab_id'];

    $lab_materials_with_last_year_stock = get_lab_materials_with_last_year_stock($conn, $lab_id);
    $lab_materials_destroyed            = get_lab_materials_destroyed($conn, $lab_id);
    $lab_materials_moved                = get_lab_materials_moved($conn, $lab_id);
    $lab_materials_current_year_data    = get_lab_materials_current_year_data($conn, $lab_id);

    $arr = array();
    $arr["current_year_stock"] = $lab_materials_current_year_data;
    $arr["last_year_stock"] = $lab_materials_with_last_year_stock;
    $arr["destroyed"] = $lab_materials_destroyed;
    $arr["moved"] = $lab_materials_moved;

    return $arr;
}
function get_lab_materials_book_overview($conn, $result){   
}
function get_lab_materials_with_last_year_stock($conn, $lab_id){
    $previous_academic_year =  previous_academic_year($conn);
    $sql = "SELECT material_id, stock FROM material_stock WHERE lab_id = $lab_id AND academic_year = '$previous_academic_year'";
    $res = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($res,MYSQLI_ASSOC);

    $arr = array();
    $count = 0;

    foreach($rows as $row){
        $mat = array();
        $sql = "SELECT name,type FROM materials WHERE id=$row[material_id]";
        $res = mysqli_query($conn,$sql);
        $name = mysqli_fetch_assoc($res);
        $mat["material_id"] = $row["material_id"];
        $mat["type"]        = $name["type"];
        $mat["stock"]       = $row["stock"];
        $mat["name"]        = $name["name"];
        $mat["comment"]     = "Απόθεμα προηγουμένων ετών";
        $mat["count"]       = $count;
        
        $arr[$count] =  $mat;
        $count = $count + 1;
    }

    return $arr;
}
function get_lab_materials_destroyed($conn, $lab_id){
    $current_academic_year  = current_academic_year($conn);
    $sql = "SELECT material_id, amount, comments FROM destroy WHERE lab_id = $lab_id AND academic_year = '$current_academic_year' AND action = 'Καταστροφή'";
    $res = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($res,MYSQLI_ASSOC);

    $arr = array();
    $count = 0;

    foreach($rows as $row){
        $mat = array();
        $sql = "SELECT name, type FROM materials WHERE id=$row[material_id]";
        $res = mysqli_query($conn,$sql);
        $name = mysqli_fetch_assoc($res);

        $mat["material_id"] = $row ["material_id"];
        $mat["amount"]      = $row ["amount"];
        $mat["name"]        = $name["name"];
        $mat["type"]        = $name["type"];
        $mat["comments"]    = $row ["comments"];
        $mat["count"]       = $count;
        
        $arr[$count] =  $mat;
        $count = $count + 1;
    }

    return $arr;
}
function get_lab_materials_moved($conn, $lab_id){
    $current_academic_year  = current_academic_year($conn);
    $sql = "SELECT material_id, amount, to_lab_id, comments FROM destroy WHERE lab_id = $lab_id AND academic_year = '$current_academic_year' AND action = 'Μεταφορά'";
    $res = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($res,MYSQLI_ASSOC);

    $arr = array();
    $count = 0;

    foreach($rows as $row){
        $mat = array();
        $sql = "SELECT name FROM materials WHERE id=$row[material_id]";
        $res = mysqli_query($conn,$sql);
        $name = mysqli_fetch_assoc($res);

        $sql = "SELECT name FROM labs WHERE id=$row[to_lab_id]";
        $res = mysqli_query($conn,$sql);
        $to_lab_name = mysqli_fetch_assoc($res);

        $mat["material_id"] = $row ["material_id"];
        $mat["amount"]      = $row ["amount"];
        $mat["name"]        = $name["name"];
        $mat["type"]        = $name["type"];
        $mat["to_lab_name"] = $to_lab_name["name"];
        if($row ["comments"] === ""){
            $mat["comments"] = "Μεταφορά στο εργαστήριο " . $mat["to_lab_name"];
        } else {
            $mat["comments"] = $row ["comments"];
        }
        $mat["count"]        = $count;
        
        $arr[$count] =  $mat;
        $count = $count + 1;
    }

    return $arr;
}
function get_lab_materials_current_year_data($conn, $lab_id){
    $current_academic_year  = current_academic_year($conn);

    $sql = "SELECT * FROM purchace WHERE academic_year = '$current_academic_year'";
    $res = mysqli_query($conn,$sql);
    $purchaces = mysqli_fetch_all($res,MYSQLI_ASSOC);

    $arr = array();
    $count = 0;

    foreach($purchaces as $purchace){
        $mat = array();

        $invoice_number = $purchace["invoice_number"];

        $material_id  = $purchace["material_id"];
        $sql = "SELECT name, type FROM materials WHERE id=$material_id";
        $res = mysqli_query($conn,$sql);
        $name = mysqli_fetch_assoc($res);

        $sql = "SELECT * FROM invoice WHERE lab_id = $lab_id AND invoice_number = '$invoice_number' AND academic_year = '$current_academic_year'";
        $res = mysqli_query($conn,$sql);
        $invoice_data = mysqli_fetch_assoc($res);

        if(!is_null($invoice_data)){    
            $mat["material_id"]    = $material_id;
            $mat["name"]           = $name["name"];
            $mat["type"]           = $name["type"];
            $mat["invoice_number"] = $invoice_number;
            $mat["amount"]         = $purchace["amount"];
            $mat["protocol_id"]    = $invoice_data["protocol_id"];
            $mat["protocol_date"]  = $invoice_data["protocol_date"];
            $mat["invoice_date"]   = $invoice_data["invoice_date"];
            $mat["comments"]       = $invoice_data["comments"];
            $mat["count"]          = $count+1;

            $arr[$count] =  $mat;
            $count = $count + 1;
        }
    }
    return $arr;
}


//ACADEMIC YEAR
function get_academic_years($conn, $result){
    $sql = "SELECT DISTINCT academic_year FROM academic_years";
    $res = mysqli_query($conn,$sql);
    $years = mysqli_fetch_all($res,MYSQLI_ASSOC);

    return $years;
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
        $max_id = mysqli_fetch_row($res);

        if($max_id[0] == NULL){
            return 1;
        }
        return $max_id[0] + 1;
    }
}
function get_previous_academic_year($conn, $result){
    return previous_academic_year($conn);
}
function get_current_academic_year($conn, $result){
    return current_academic_year($conn);
}
function current_academic_year($conn){
    $sql = "SELECT academic_year FROM academic_years WHERE id = (SELECT MAX(id) FROM academic_years)";
    $res = mysqli_query($conn,$sql);
    $current_academic_year = mysqli_fetch_row($res);
    return $current_academic_year[0];
}
function previous_academic_year($conn){
    $sql = "SELECT MAX(id) FROM academic_years";
    $res = mysqli_query($conn,$sql);
    $previous_academic_year_id = mysqli_fetch_row($res)[0] - 1;

    $sql = "SELECT academic_year FROM academic_years WHERE id = $previous_academic_year_id";
    $res = mysqli_query($conn,$sql);
    $previous_academic_year = mysqli_fetch_row($res);
    return $previous_academic_year[0];
}
function get_greek_month($month){
    switch ($month) {
        case "Jan":
            return "ΙΑΝ";
            break;  
        case "Feb":
            return "ΦΕΒ";
            break;
        case "Mar":
            return "ΜΑΡ";
            break;
        case "Apr":
            return "ΑΠΡ";
            break;
        case "May":
            return "ΜΑΙ";
            break;
        case "Jun":
            return "ΙΟΥΝ";
            break;
        case "Jul":
            return "ΙΟΥΛ";
            break;
        case "Aug":
            return "ΑΥΓ";
            break;
        case "Sep":
            return "ΣΕΠ";
            break;
        case "Oct":
            return "ΟΚΤ";
            break;
        case "Nov":
            return "ΝΟΕ";
            break;
        case "Dec":
            return "ΔΕΚ";
            break;
        default:
            return "NULL";
        break;
    }
}
function get_praxis($conn, $result){
    $current_academic_year = current_academic_year($conn);
    $sql = "SELECT praxis FROM academic_years WHERE academic_year = '$current_academic_year'";
    $res = mysqli_query($conn,$sql);
    $praxis = mysqli_fetch_row($res);

    return $praxis[0];
}


//PROTOCOL
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
        $invoice_number   = $arguments[5];
        $invoice_date     = $arguments[6];
        $field_cost       = $arguments[7];
        $cost             = $arguments[8];
        $supplier_name    = $arguments[9];
        $materials_bought = $arguments[10];
        $protocol_no      = $arguments[11];
        $payment_method   = $arguments[12];
        $invoice_pdf_name = $arguments[13];
        $comments         = $arguments[14];

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

        $protocol_sql_date = DateTime::createFromFormat("d/m/Y", $protocol_date);
        $new_protocol_date =  $protocol_sql_date->format("M-Y");
        $array = explode("-", $new_protocol_date);
        $greek_month = get_greek_month($array[0]);

        $folder = $greek_month . "_" . $array[1] . "/";

        $target_dir = "Πρωτόκολλα/" . $folder;

        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0755, true);
        }

        $sql = "SELECT short_name FROM labs WHERE id = $lab_id";
        $res = mysqli_query($conn,$sql);
        $val = mysqli_fetch_row($res);
        $lab_short_name = $val[0];

        $protocol_pdf_name = $protocol_no . "_" . $lab_short_name . ".pdf";
        $output_name = $target_dir . $protocol_pdf_name;

        if (file_put_contents($output_name, $pdf) !== false) {

            $invoice_sql_date = DateTime::createFromFormat("d/m/Y", $invoice_date);
            $new_invoice_date =  $invoice_sql_date->format("Y-m-d");

            $protocol_sql_date = DateTime::createFromFormat("d/m/Y", $protocol_date);
            $new_protocol_date = $protocol_sql_date->format("Y-m-d");

            $sql = "SELECT id FROM suppliers WHERE name = '$supplier_name'";
            $res = mysqli_query($conn,$sql);
            $supplier_id = mysqli_fetch_row($res);

            $sql = "INSERT INTO invoice (protocol_id, invoice_number, invoice_date, protocol_date, supplier_id, field_id, lab_id, cost, field_cost, protocol_pdf, invoice_pdf, comments, payment_method, academic_year, folder) SELECT $protocol_no, '$invoice_number', '$new_invoice_date', '$new_protocol_date', $supplier_id[0], $field_id, $lab_id, $cost, $field_cost, '$protocol_pdf_name', '$invoice_pdf_name', '$comments', '$payment_method', '$academic_year', '$folder' FROM DUAL WHERE NOT EXISTS ( SELECT * FROM invoice WHERE protocol_id=$protocol_no AND academic_year = '$academic_year')";
            $result = mysqli_query($conn,$sql);

            if($result) {
                foreach ($materials_bought as $material) {
                    //store the purchace
                    $sql = "INSERT INTO purchace (material_id, invoice_number, amount, cost, academic_year) VALUES ($material[id], '$invoice_number', $material[amount], 0, '$academic_year')";
                    $result = mysqli_query($conn,$sql);

                    $sql = "SELECT id FROM material_stock WHERE material_id = $material[id] AND lab_id = $lab_id AND academic_year = '$academic_year'";
                    $res = mysqli_query($conn,$sql);
                    $exists = mysqli_fetch_row($res);

                    if(is_null($exists)){
                        $sql = "INSERT INTO material_stock (material_id, stock, lab_id, academic_year) VALUES ($material[id], $material[amount], $lab_id, '$academic_year')";
                    }else{
                        $sql = "UPDATE material_stock SET stock = stock + $material[amount] WHERE material_id = $material[id]  AND lab_id = $lab_id AND academic_year = '$academic_year'";
                    }
                    $result = mysqli_query($conn,$sql);
                }
            }
        }
    }
    return $result;
}
function upload_pdf($conn, $result){
    $lab_id = $_POST['lab_id'];
    $field_id = $_POST['field_id'];
    $field_cost = $_POST['field_cost'];
    $invoice_number = $_POST['invoice_number'];
    $supplier_name  = $_POST['supplier_name'];

    $invoice_sql_date = DateTime::createFromFormat("d/m/Y", $_POST['invoice_date']);
    $new_invoice_date =  $invoice_sql_date->format("M-Y");

    $sql = "SELECT short_name FROM fields WHERE id = $field_id";
    $res = mysqli_query($conn,$sql);
    $val = mysqli_fetch_row($res);
    $field_short_name = $val[0];

    $sql = "SELECT short_name FROM labs WHERE id = $lab_id";
    $res = mysqli_query($conn,$sql);
    $val = mysqli_fetch_row($res);
    $lab_short_name = $val[0];

    if (strlen($supplier_name) > 6) { // check if the string length is greater than 6
        $short_supplier_name = mb_substr($supplier_name, 0, 6, "UTF-8"); // get the first 6 characters
    }

    $invoice_pdf_name = $field_short_name . "_" . $lab_short_name . "_" . $short_supplier_name . "_" . $field_cost . ".pdf";

    $array = explode("-", $new_invoice_date);
    $greek_month = get_greek_month($array[0]);

    $folder_dir = $greek_month . "_" . $array[1] . "/";
    $target_dir = "Τιμολόγια/" . $folder_dir;

    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    $target_file = $target_dir . $invoice_pdf_name;
    $file_type = $_FILES["pdf_file"]["type"];

    // Check if file is a PDF file
    if ($file_type == "application/pdf") {
        // Try to upload fileE]=
        $result = move_uploaded_file($_FILES["pdf_file"]["tmp_name"], $target_file);
    }

    return $invoice_pdf_name;
}


//PURCHACE
function get_purchace($conn, $result){
    if( !isset($_GET['arguments']) ) 
    { 
        $result['error'] = 'No arguments'; 
    } else 
    {
        $arguments     = $_GET['arguments'];
        $invoice_number    = $arguments[0];
        $academic_year = $arguments[1];

        $sql = "SELECT * FROM purchace WHERE invoice_number = '$invoice_number' AND academic_year = '$academic_year'";
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


//LOGIN/LOGOUT
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
?>