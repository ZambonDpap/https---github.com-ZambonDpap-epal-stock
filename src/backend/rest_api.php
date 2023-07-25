<?php

require 'mysql_connect.php';

header('Content-Type: application/json');

$result = array();

if( !isset($_POST['functionname']) ) 
{ 
    $result['error'] = 'No function name!'; 
}else
{
    $conn = connect_to_db();

    switch ($_POST['functionname']) {
        case "validate_user":
            $result = validate_user($conn, $result);
            break;
        case "get_fields":
            $result = get_fields($conn, $result);
            break;
        case "get_labs":
            $result = get_labs($conn, $result);
            break;
        case "get_suppliers":
            $result = get_suppliers($conn, $result);
            break;
        case "get_materials":
            $result = get_materials($conn, $result);
            break;
    }

    mysqli_close($conn);

    echo json_encode($result);
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
?>