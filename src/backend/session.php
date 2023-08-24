<?php
   include('mysql_connect.php');
   
   session_start();

   if(!isset($_SESSION['username']) && !isset($_SESSION['password'])){
      header("location:index.html");
      die();
   } else {
      $username = $_SESSION['username'];
      $password = $_SESSION['password'];
   
      $conn = connect_to_db();

      $sql = "SELECT id, firstname FROM users WHERE lastname = '$username' and password = '$password'";
      $sql = "SELECT id, firstname FROM users WHERE lastname = '$username' and password = '$password'";
      $res = mysqli_query($conn,$sql);
      $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
      $count = mysqli_num_rows($res);

      if($count == 1) {
          $_SESSION['firstname'] = $row["firstname"];
          $result["success"] = "success";
      }else {
         header("location:index.html");
          $result["error"] = "Your Login Name or Password is invalid";
      }
   }

?>