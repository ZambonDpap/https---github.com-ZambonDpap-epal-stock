<?php
   include('./src/backend/session.php');
?>
<html>  
   
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />

    <head>
       <title>Αρχική</title>
       <!-- Load jquery 3.7.0 from the CDN -->
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>

        <!-- Add external js files-->
        <script src="/src/frontend/js/home.js"></script>

        <!-- Add css files-->
        <link rel="stylesheet" href="./src/frontend/css/home.css">

    </head> 
    <body>
        <div id="top_menu">
            <div id="top_left_menu">
                <div class="box-left" id="home">Αρχική</div>
                <div class="box-left" id="new_invoice">Νέο Τιμολόγιο</div>
                <div class="box-left" id="update_supplies">Ενημέρωση Υλικών</div>
                <div class="box-left" id="proposal">Πρόταση Αργοράς</div>
            </div>
            <div id="top_right_menu">
            <div class="box-right" id="username">Ελευθερουδάκης Αλέξανδρος</div>
            <div class="box-right" id="logout">Sing out</div>
            </div>
        </div>
    </body>
</html>