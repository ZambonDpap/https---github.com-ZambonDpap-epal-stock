<?php
   include('./src/backend/session.php');
?>
<html>
   
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />

    <head>
        <title>Νέο Τιμολόγιο</title>
        <!-- Load jquery 3.7.0 from the CDN -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>

        <!-- Add external js files-->
        <script src="/src/frontend/js/new_invoice.js"></script>
        <script src="/src/frontend/js/home.js"></script>


        <!-- Add css files-->
        <link rel="stylesheet" href="./src/frontend/css/home.css">
        <link rel="stylesheet" href="./src/frontend/css/new_invoice.css">

        <!-- Add jqwidgets js files-->
        <link rel="stylesheet" href="/libs/jqwidgets_16.0.0/styles/jqx.base.css" type="text/css" />

        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxcore.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxdata.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxbuttons.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxscrollbar.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxlistbox.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxdropdownlist.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxinput.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxmenu.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxcheckbox.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxgrid.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxgrid.selection.js"></script> 
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxpopover.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxnotification.js"></script>
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
            <div id="notification_success"></div>
            <div id="notification_warning"></div>
            <div id="notification_info"></div>
            </div>
        </div>
        <div id="invoice_form">
            <div class="form-group">
                <label for="academic_year">Ακαδημαϊκό Έτος</label>
                <div id="academic_year"></div>
            </div>
            <div class="form-group">
                <label for="invoice_select">Τιμολόγιο</label>
                <input type="file" id="invoice_select" name="invoice_select">
            </div>
            <div class="form-group">
                <label for="invoice_no">Αριθμός Τιμολογίου</label>
                <input type="number" id="invoice_no" name="invoice_no" required>
            </div>
            <div class="form-group">
                <label for="invoice_date">Ημερομηνία Τιμολογίου:</label>
                <input type="date" id="invoice_date" name="invoice_date" required>
            </div>
            <div class="form-group">
                <label for="protocol_no">Αριθμός πρωτοκόλλου</label>
                <input type="number" id="protocol_no" name="protocol_no" required>
            </div>
            <div class="form-group">
                <label for="protocol_date">Ημερομηνία πρωτοκόλλου</label>
                <input type="date" id="protocol_date" name="protocol_date" required>
            </div>
            <div class="form-group">
                <label for="suppliers">Προμηθευτής:</label>
                <div id="suppliers"></div>
            </div>
            <div id="new_supplier_popover">
                <div id="new_added_supplier_name_label">Όνομα Προμηθευτή</div><input type="text" id="new_added_supplier_name">
                <button div id="add_new_supplier">ΟΚ</button>
            </div>
            <div id="new_supplier">Νέο</div>
            <div class="form-group">
                <label for="payment_method">Τρόπος Πληρωμής</label>
                <div id="payment_methods"></div>
            </div>
            <div class="form-group">
                <label for="cost">Ποσό</label>
                <input type="number" id="cost" name="cost" required>
            </div>

            <div class="form-group">
                <label for="field_cost">Ποσό Τομέα</label>
                <input type="number" id="field_cost" name="field_cost" required>
            </div>
            <div class="form-group">
                <label for="field">Τομέας:</label>
                <div id="fields"></div>
            </div>
            <div class="form-group">
                <label for="lab">Εργαστήριο:</label>
                <div id="labs"></div>
            </div>
            <div class="form-group">
                <label for="materials">Υλικά:</label>
                <input type="text" id="materials">
            </div>
            <div id="new_material_popover">
                <div id="new_added_material_name_label">Όνομα Υλικού</div><input type="text" id="new_added_material_name">
                <div id="new_added_material_type_label">Τύπος Υλικού</div><div id="new_added_material_type"></div>
                <div id="new_added_material_number_label">Ποσότητα αγοράς</div><input type="number" id="new_added_material_number">
                <button div id="add_new_material">ΟΚ</button>
            </div>
            <div id="new_material">Νέο</div>

            <div id="materials_added">
            </div>

            <input type="submit" value="Αποθήκευση">
        </div>
        <div id="pdf_viewer">
            <embed src="" type="application/pdf" id="pdf_file">
        </div>
    </body>
</html>