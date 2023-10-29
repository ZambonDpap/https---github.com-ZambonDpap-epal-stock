<?php 
// Define the function to connect to the database
function connect_to_db() {
    // Define the connection parameters
    $servername = "localhost";
    $database = "epal_stock";
    $username = "root";
    $password = "45az-w5B53YGRD4@";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    } else {
        mysqli_set_charset($conn, "utf8");
    }
    return $conn;
}

?>