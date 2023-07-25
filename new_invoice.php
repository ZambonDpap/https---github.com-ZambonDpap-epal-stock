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

        <!-- Add css files-->
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
    </head>
   
   <body>
        <div id="new_invoice">
            <!-- <h1>Νέο Tιμολόγιο</h1> -->
            <div id="invoice_form">
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
                    <label for="suppliers">Προμηθευτής:</label>
                    <div id="suppliers"></div>
                </div>

                <div class="form-group">
                    <label for="materials">Υλικά:</label>
                    <input type="text" id="materials">
                </div>
                <div id="new_material">Προσθήκη Νέου</div>

                <div id="materials_added">
                    <div class="material_name">Όνομα Υλικού</div>
                    <div class="material_type">Τύπος Υλικού</div>
                    <div class="material_amount">Ποσότητα</div>
                </div>

                <input type="submit" value="Αποθήκευση">
            </div>
        </div>
        <div id="pdf_viewer">
            <embed src="" type="application/pdf" id="pdf_file">
        </div>
    </body>
</html>