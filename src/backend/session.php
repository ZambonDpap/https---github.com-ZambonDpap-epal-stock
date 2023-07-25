<?php
   include('mysql_connect.php');
   
   session_start();
   
   $username = $_SESSION['username'];
   $password = $_SESSION['password'];
   
   $conn = connect_to_db();

   $sql = "SELECT id FROM users WHERE lastname = '$username' and password = '$password'";
   $res = mysqli_query($conn,$sql);
   $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
   
   if(!isset($_SESSION['username']) && !isset($_SESSION['password'])){
      header("location:index.html");
      die();
   }
?>