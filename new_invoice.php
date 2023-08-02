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
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/home.css">
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/new_invoice.css">
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/protocol.css" />

        <!-- Add jqwidgets js files-->
        <link rel="stylesheet" href="./libs/jqwidgets_16.0.0/styles/jqx.base.css" type="text/css" />

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
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxgrid.sort.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxgrid.edit.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxgrid.filter.js"></script>
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
            <button id="new_supplier"><img src="./src/images/add_16.png"></button>
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
            <button id="new_material"><img src="./src/images/add_16.png"></button>

            <div id="materials_added">
            </div>
            <button id="delete_added_material"><img src="./src/images/delete_16.png"></button>

            <input id="continue" type="submit" value="Συνέχεια">
        </div>

        <!-- PDF VIEWER -->
        <div id="pdf_viewer">
            <embed src="" type="application/pdf" id="pdf_file">
        </div>

        <!-- PROTOCOL VIEWER -->
        <div id="protocol_viewer">

            <img style="position:absolute;top:5%; left:21%; width:0.49in;height:0.43in" src="./src/images/ri_1.png" />

            <div style="position:absolute;top:10.7%; left:15%; width:20%; line-height:0.15in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Calibri;color:#000000">ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</span>
                <br />
            </div>
             <div style="position:absolute;top:13%; left:18.2%; width:20%;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:8pt;font-family:Calibri;color:#000000">ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:15%; left:18.2%; width:20%;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:8pt;font-family:Calibri;color:#000000">ΚΑΙ ΘΡΗΣΚΕΥΜΑΤΩΝ</span>
                <br />
            </div>
            <div style="position:absolute;top:18%; left:5%; width:45%;line-height:0.16in;">
                <span style="font-style:normal;font-weight:bold;font-size:7pt;font-family:Calibri;color:#000000">ΠΕΡΙΦΕΡΕΙΑΚΗ Δ/ΝΣΗ Α/ΘΜΙΑΣ ΚΑΙ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΚΕΝΤΡ. ΜΑΚΕΔΟΝΙΑΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:20%; left:12%; width:45%;line-height:0.16in;">
                <span style="font-style:normal;font-weight:bold;font-size:7pt;font-family:Calibri;color:#000000">Δ/ΝΣΗ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΑΝΑΤ.ΘΕΣΣΑΛΟΝΙΚΗΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:1.82in; left:18%; width:20%;line-height:0.15in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Calibri;color:#000000">8ο Ε.Κ.ΕΠΑΝΟΜΗΣ </span>
            </div>


            <div style="position:absolute;top:1.02in;left: 63%;width:15%;line-height:0.15in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Calibri;color:#000000">Αρ. Πρωτ. :</span>
                <br />
            </div>
            <div style="position:absolute;top:1.02in;left: 80%;width:0.12in;line-height:0.15in;">
                <span id = "protocol_id" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Calibri;color:#000000">83</span>
                <br />
            </div>
            <div style="position:absolute;top:1.30in;left: 63%;width:0.67in;line-height:0.15in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Calibri;color:#000000">Ημερομηνία :</span>
                <br />
            </div>
            <div style="position:absolute;top:1.30in;left: 80%;width:0.46in;line-height:0.15in;">
                <span id="protocol_date_1" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Calibri;color:#000000">8/6/2023</span>
                <br />
            </div>
            <div style="position:absolute;top:29%; left: 34%; width:2.04in;line-height:0.22in;">
                <span style="font-style:normal;font-weight:bold;font-size:14pt;font-family:Cambria;color:#000000;letter-spacing:10px">ΠΡΩΤΟΚΟΛΛΟ </span>
                <br />
            </div>
            <div style="position:absolute;top:31.5%; left: 34.5%; width:40%;line-height:0.19in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Cambria;color:#000000">ΠΑΡΑΛΑΒΗΣ ΥΛΙΚΩΝ &amp; ΕΡΓΑΣΙΩΝ</span>
                <br />
            </div>



            <div style="position:absolute;top:37%; left: 5%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">Σήμερα </span>
            </div>
            <div style="position:absolute;top:37%; left: 14%; width:2.04in;line-height:0.14in;">
                <span id="protocol_date_2" style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Calibri;color:#000000">Πέμπτη, 8/06/2023</span>
            </div>
            <div style="position:absolute;top:37%; left: 33%; width:60%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Cambria;color:#000000">συνήλθαν στο 8ο Ε.Κ. Επανομής οι επιτροπές αγοράς &amp; παραλαβής υλικών</span>
            </div>
            <div style="position:absolute;top:39.5%; left: 5%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">για τον ΤΟΜΕΑ</span>
            </div>
            <div style="position:absolute;top:39.5%; left: 28%; width:2.04in;line-height:0.14in;">
                <span id="field_name" style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Calibri;color:#000000">ΥΓΕΙΑΣ-ΠΡΟΝΟΙΑΣ-ΕΥΕΞΙΑΣ</span>            
            </div>
            <div style="position:absolute;top:39.5%; left: 56%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">όπως αυτές ορίσθηκαν</span>
            </div>
            <div style="position:absolute;top:42%; left: 5%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">με την υπ’ αριθμ.</span>
            </div>
            <div style="position:absolute;top:42%; left: 21%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Cambria;color:#000000">1 - 5/10/2021</span>
            </div>
            <div style="position:absolute;top:42%; left: 36%; width:60%;line-height:0.14in;">
             <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">του Συλ. Διδ/ντων του 8ου Ε.Κ. Επανομής αποτελούμενες από τους:</span>            <br />
            </div>



            <div style="position:absolute;top:4.17in; left: 5%; width:20%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Cambria;color:#000000">ΕΠΙΤΡΟΠΗ ΑΓΟΡΑΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:4.38in; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">1.</span>
                <br />
            </div>
            <div style="position:absolute; top:52%; left: 8%;width:22%;line-height:0.21in;">
                <span id="buyer_1_id" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">ΚΑΡΓΟΠΟΥΛΟΥ Ο.</span>
            </div>
            <div style="position:absolute;top:4.66in; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">2.</span>
                <br />
            </div>
            <div style="position:absolute; top:55.3%; left: 8%;width:22%;line-height:0.21in;">
                <span id="buyer_2_id" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">ΚΟΥΤΣΟΓΙΑΝΝΗ Ι. </span>
            </div>
            <div style="position:absolute;top:4.95in; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">3.</span>
                <br />
            </div>
            <div style="position:absolute;top:58.8%;left: 8%;width:22%;line-height:0.21in;">
                <span id="buyer_3_id" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">ΠΕΤΡΟΒΙΤΣΟΣ Ε.</span>
            </div>



            <div style="position:absolute;top:5.39in; left: 5%; width:25%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Cambria;color:#000000">ΕΠΙΤΡΟΠΗ ΠΑΡΑΛΑΒΗΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:5.61in; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">1.</span>
                <br />
            </div>
            <div style="position:absolute;top:5.90in;left: 8%;width:30%;line-height:0.14in;">
                <span id="receiver_1_id" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">ΤΣΟΥΓΚΑ Π.</span>
                <br />
            </div>
            <div style="position:absolute;top:5.90in; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">2.</span>
                <br />
            </div>
            <div style="position:absolute;top:5.61in;left: 8%;width:30%;line-height:0.14in;">
                <span id="receiver_2_id" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">ΒΟΪΔΟΜΑΤΗ ΓΛ.</span>
                <br />
            </div>




            <div style="position:absolute;top:6.47in; left: 5%; width:55%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">Παραλαμβάνει &amp; παραδίδει στον Υπεύθυνο του Εργαστηρίου:</span>
                <br />
            </div>
            <div style="position:absolute;top:6.47in;left: 63%;width:1.14in;line-height:0.15in;">
                <span id="lab_id" style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Calibri;color:#000000">ΒΡΕΦΟΝΗΠΙΟΚΟΜΙΑΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:7.00in; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">κ.</span>
                <br />
            </div>
            <div style="position:absolute; top:83.7%; left:8%; width:30%;line-height:0.14in;">
                <span id="manager_id" style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">ΚΑΡΓΟΠΟΥΛΟΥ Ο.</span>
                <br />
            </div>
            <div style="position:absolute;top:7.00in; left:47% ;width:0.59in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">Υπογραφή:</span>
                <br />
            </div>
            <div style="position:absolute;top:7.45in; left: 5%; width:55%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;font-family:Cambria;color:#000000">τα υλικά/εργασίες που αναφέρονται στα παρακάτω παραστατικά:</span>
                <br />
            </div>




            <div style="position:absolute;top:7.83in; left:4.6%; width:10%;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:9pt;font-family:Cambria;color:#000000">Α/Α</span>
                <br />
            </div>
            <div style="position:absolute;top:8.13in; left:13%; width:0.16in;line-height:0.13in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Calibri;color:#000000">215</span>
                <br />
            </div>
            <div style="position:absolute;top:7.83in; left:11%; width:0.46in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:9pt;font-family:Cambria;color:#000000">ΑΡΙΘΜΟΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:8.13in;left: 6%;width:0.06in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Cambria;color:#000000">1</span>
                <br />
            </div>
            <div style="position:absolute;top:8.34in;left: 6%;width:0.06in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Cambria;color:#000000">2</span>
                <br />
            </div>
            <div style="position:absolute;top:8.52in;left: 6%;width:0.06in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Cambria;color:#000000">3</span>
                <br />
            </div>
            <div style="position:absolute;top:8.69in;left: 6%;width:0.06in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Cambria;color:#000000">4</span>
                <br />
            </div>
            <div style="position:absolute;top:8.87in;left: 6%;width:0.06in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Cambria;color:#000000">5</span>
                <br />
            </div>
            <div style="position:absolute;top:9.04in;left: 6%;width:0.06in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Cambria;color:#000000">6</span>
                <br />
            </div>
            <div style="position:absolute;top:7.83in; left:27%; width:10%;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:9pt;font-family:Cambria;color:#000000">ΗΜ/ΝΙΑ</span>
                <br />
            </div>
            <div style="position:absolute;top:8.12in; left:26.4%; width:0.45in;line-height:0.13in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Calibri;color:#000000">31/5/2023</span>
                <br />
            </div>
            <div style="position:absolute;top:7.83in; left:40%; width:0.28in;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:9pt;font-family:Cambria;color:#000000">ΠΟΣΟ</span>
                <br />
            </div>
            <div style="position:absolute;top:7.83in; left:62%; width:30%;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:9pt;font-family:Cambria;color:#000000">Π Ρ Ο Μ Η Θ Ε Υ Τ Η Σ</span>
                <br />
            </div>
            <div style="position:absolute;top:8.12in; left:62%; width:20%;line-height:0.13in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;font-family:Calibri;color:#000000">Δ.ΓΕΡΓΟΥ-Χ.ΣΤΡΑΒΑ Ο.Ε.</span>
                <br />
            </div>
            <div style="position:absolute;top:9.19in;left: 63%;width:0.84in;line-height:0.16in;">
                <span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Cambria;color:#000000">ΘΕΩΡΗΘΗΚΕ</span>
                <br />
            </div>
            <div style="position:absolute;top:9.89in; left:57%; width:30%;line-height:0.26in;">
                <div style="position:relative; left:0.30in;">
                    <span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Cambria;color:#000000">Ο ΑΝ/ΤΗΣ Δ/ΝΤΗΣ</span>
                    <br />
                </div>
                <span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Cambria;color:#000000">ΣΤΕΦΑΝΟΣ ΜΕΡΛΙΑΟΥΝΤΑΣ</span>
                <br />
            </div>



            <img style="position:absolute;top:5.51in; left: 5%; width:1.36in;height:0.01in" src="./src/images/vi_1.png" />
            <img style="position:absolute;top:4.29in; left: 5%; width:1.10in;height:0.01in" src="./src/images/vi_2.png" />
            <img style="position:absolute;top:0.89in; left:4%; width:6.32in;height:8.31in" src="./src/images/vi_3.png" />
            <img style="position:absolute;top:0.89in; left:4%; width:6.33in;height:8.31in" src="./src/images/vi_4.png" />
            <img style="position:absolute;top:7.71in; left:4%; width:6.32in;height:1.48in" src="./src/images/vi_5.png" />
            
        </div>
    </body>
</html>