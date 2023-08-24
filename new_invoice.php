 <?php
//    include('./src/backend/session.php');
 ?>
<!-- <html> -->
   
    <!-- <meta http-equiv="content-type" content="text/html;charset=utf-8" /> -->

    <!-- <head> -->
        <!-- <title>Νέο Τιμολόγιο</title> -->
        <!-- Load jquery 3.7.0 from the CDN -->
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script> -->

        <!-- Add external js files-->
        <!-- <script src="/src/frontend/js/new_invoice.js"></script>
        <script src="/src/frontend/js/protocol.js"></script>
        <script src="/src/frontend/js/home.js"></script> -->


        <!-- Add css files-->
        <!-- <link rel="stylesheet" type="text/css" href="./src/frontend/css/home.css">
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/new_invoice.css">
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/protocol.css" /> -->

        <!-- Add jqwidgets js files-->
        <!-- <link rel="stylesheet" href="./libs/jqwidgets_16.0.0/styles/jqx.base.css" type="text/css" />

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
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxtooltip.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxnumberinput.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxdatetimeinput.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxcalendar.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/globalization/globalize.js"></script>

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
        </div> -->

        <!-- INVOICE FORM -->
        <!-- <div id="invoice_form">
            <div id="academic-year-form-group">
                <label id="academic-year-label" for="academic_year">Ακαδημαϊκό Έτος</label>
                <div id="academic_year"></div>
            </div>
            <div id="invoice-form-group">
                <label id="invoice-label" for="invoice_select">Τιμολόγιο</label>
                <input type="file" id="invoice_select" name="invoice_select">
            </div>
            <div id="invoice-no-date-form-group">
                <label id="invoice-no-label" for="invoice_no">Αριθμός Τιμολογίου</label>
                <input type="number" id="invoice_no" name="invoice_no" required>
                <div id="invoice-date-form-group">
                    <label id="invoice-date-label" for="invoice_date">Ημερομηνία Τιμολογίου</label>
                    <input id="invoice_date" name="invoice_date" required>
                </div>
            </div>
            <div id="supplier-form-group">
                <label id="supplier-label" for="suppliers">Προμηθευτής</label>
                <div id="suppliers"></div>
            </div>
            <button id="new_supplier"><img src="http://localhost/src/images/add_16.png"></button>  
            <div id="new_supplier_popover">
                <div id="new_added_supplier_name_label">Όνομα Προμηθευτή</div><input type="text" id="new_added_supplier_name">
                <button div id="add_new_supplier">ΟΚ</button>
            </div>
            <div id="protocol-no-date-form-group">
                <label id="protocol-no-label" for="protocol_no">Αριθμός πρωτοκόλλου</label>
                <input type="number" id="protocol_no" name="protocol_no" required>
                <div id="protocol-date-form-group">
                    <label id="protocol-date-label" for="protocol_date">Ημερομηνία πρωτοκόλλου</label>
                    <input id="protocol_date" name="protocol_date" required>
                </div>
            </div>
            <div id="fields-form-group">
                <label for="field">Τομέας</label>
                <div id="fields"></div>
            </div>
            <div id="labs-form-group">
                <label for="lab">Εργαστήριο</label>
                <div id="labs"></div>
            </div>
            <div id="payment-methods-form-group">
                <label for="payment_method">Τρόπος Πληρωμής</label>
                <div id="payment_methods"></div>
            </div>
            <div id="costs-form-group">
                <label for="cost">Ποσό</label>
                <input type="number" id="cost" name="cost" required>
                <div id="field-cost-form-group">
                    <label id="field-cost-label" for="field_cost">Ποσό Τομέα</label>
                    <input type="number" id="field_cost" name="field_cost" required>
                </div>
            </div>
            <div id="materials-form-group">
                <label for="materials">Υλικά:</label>
                <input type="text" id="materials">
            </div>
            <div id="new_material_popover">
                <div id="new_added_material_name_label">Όνομα Υλικού</div><input type="text" id="new_added_material_name">
                <div id="new_added_material_type_label">Τύπος Υλικού</div><div id="new_added_material_type"></div>
                <div id="new_added_material_number_label">Ποσότητα αγοράς</div><input type="number" id="new_added_material_number">
                <button div id="add_new_material">ΟΚ</button>
            </div>
            <button id="new_material"><img src="http://localhost/src/images/add_16.png"></button>

            <div id="materials_added">
            </div>
            <button id="delete_added_material"><img src="http://localhost/src/images/delete_16.png"></button>

            <input id="continue" type="submit" value="Συνέχεια">
            <input id="save" type="submit" value="Αποθήκευση">

        </div> -->

        <!-- PDF VIEWER -->
        <!-- <div id="pdf_viewer">
            <embed src="" type="application/pdf" id="pdf_file">
        </div> -->

        <!-- PROTOCOL VIEWER -->
        <!-- <div id="protocol_viewer">

            <img style="position:absolute;top:3%; left:25%; width:8%; height:6%" src="http://localhost/src/images/ri_1.png" />

            <div style="position:absolute; top:8.7%; left:15%; width:40%; line-height:0.15in;">
                <span style="font-style:normal;font-weight:bold;font-size:1em;">ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</span>
                <br />
            </div>
             <div style="position:absolute; top:11%; left:21.3%; width:20%; line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:8pt;">ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:13%; left:21.5%; width:20%;line-height:0.12in;">
                <span style="font-style:normal;font-weight:bold;font-size:8pt;">ΚΑΙ ΘΡΗΣΚΕΥΜΑΤΩΝ</span>
                <br />
            </div>
            <div style="position:absolute;top:16%; left:5%; width:70%;line-height:0.16in;">
                <span style="font-style:normal;font-weight:bold;font-size:7pt;">ΠΕΡΙΦΕΡΕΙΑΚΗ Δ/ΝΣΗ Α/ΘΜΙΑΣ ΚΑΙ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΚΕΝΤΡ. ΜΑΚΕΔΟΝΙΑΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:18%; left:14%; width:45%;line-height:0.16in;">
                <span style="font-style:normal;font-weight:bold;font-size:7pt;">Δ/ΝΣΗ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΑΝΑΤ.ΘΕΣΣΑΛΟΝΙΚΗΣ</span>
                <br />
            </div>
            <div style="position:absolute;top:20%; left:21%; width:20%;line-height:0.15in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;">8ο Ε.Κ.ΕΠΑΝΟΜΗΣ </span>
            </div>


            <table style="position:absolute; top:4%; left:60%; width: 30%; border: 1px solid black;" >
                <tr style="line-height:180%; border: 1px solid black;">
                    <td style="font-style:normal;font-weight:normal;font-size:9pt;">Αρ. Πρωτ. :</td>
                    <td id = "pv_protocol_id" style="text-align: center;font-style:normal;font-weight:normal;font-size:9pt;"></td>
                </tr>
                <tr>
                  <td style="font-style:normal;font-weight:normal;font-size:9pt;">Ημερομηνία:</td>
                  <td id="pv_protocol_date_1" style="text-align: center;font-style:normal;font-weight:normal;font-size:9pt;"></td>

                </tr>
            </table>

            <div style="position:absolute;top:26%; left: 34%; width:2.04in;line-height:0.22in;">
                <span style="font-style:normal;font-weight:bold;font-size:14pt;;letter-spacing:10px">ΠΡΩΤΟΚΟΛΛΟ </span>
                <br />
            </div>
            <div style="position:absolute;top:28.5%; left: 35%; width:40%;line-height:0.19in;">
                <span style="font-style:normal;font-weight:bold;font-size:9.5pt;">ΠΑΡΑΛΑΒΗΣ ΥΛΙΚΩΝ &amp; ΕΡΓΑΣΙΩΝ</span>
                <br />
            </div>
            <div style="position:absolute;top:34%; left: 5%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">Σήμερα </span>
            </div>
            <div style="position:absolute;top:34%; left: 14%; width:2.04in;line-height:0.14in;">
                <span id="pv_protocol_date_2" style="font-style:normal;font-weight:bold;font-size:10pt;"></span>
            </div>
            <div style="position:absolute;top:34%; left: 33%; width:70%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:9pt;">συνήλθαν στο 8ο Ε.Κ. Επανομής οι επιτροπές αγοράς &amp; παραλαβής υλικών</span>
            </div>
            <div style="position:absolute;top:36.5%; left: 5%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">για τον ΤΟΜΕΑ</span>
            </div>
            <div style="position:absolute;top:36.5%; left: 20%; width:60%;line-height:0.14in;">
                <span id="pv_field_name" style="font-style:normal;font-weight:bold;font-size:9pt;"></span>            
            </div>
            <div style="position:absolute;top:36.5%; left: 65%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">όπως αυτές ορίσθηκαν</span>
            </div>
            <div style="position:absolute;top:39%; left: 5%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">με την υπ’ αριθμ.</span>
            </div>
            <div style="position:absolute;top:39%; left: 22%; width:2.04in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;">1 - 5/10/2021</span>
            </div>
            <div style="position:absolute;top:39%; left: 36%; width:70%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">του Συλ. Διδ/ντων του 8ου Ε.Κ. Επανομής αποτελούμενες από τους:</span>            
                <br />
            </div>



            <div style="position:absolute;top:44.7%; left: 5%; width:40%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;"><u>ΕΠΙΤΡΟΠΗ ΑΓΟΡΑΣ</u></span>
                <br />
            </div>
            <div style="position:absolute;top:49%; left: 6%; width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">1.</span>
                <br />
            </div>
            <div style="position:absolute; top:48.5%; left: 8%;width:30%;line-height:0.21in;">
                <span id="pv_buyer_1" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
            </div>
            <div style="position:absolute;top:52.3%; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">2.</span>
                <br />
            </div>
            <div style="position:absolute; top:51.8%; left: 8%;width:30%;line-height:0.21in;">
                <span id="pv_buyer_2" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
            </div>
            <div style="position:absolute;top:55.5%; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">3.</span>
                <br />
            </div>
            <div style="position:absolute;top:55%;left: 8%;width:30%;line-height:0.21in;">
                <span id="pv_buyer_3" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
            </div>



            <div style="position:absolute;top:59.3%; left: 5%; width:40%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;"><u>ΕΠΙΤΡΟΠΗ ΠΑΡΑΛΑΒΗΣ</u></span>
                <br />
            </div>
            <div style="position:absolute;top:64%; left: 6%; ;width:30%;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">1.</span>
                <br />
            </div>
            <div style="position:absolute;top:64%;left: 8%;width:30%;line-height:0.14in;">
                <span id="pv_receiver_1" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
                <br />
            </div>
            <div style="position:absolute;top:67.5%; left: 6%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">2.</span>
                <br />
            </div>
            <div style="position:absolute;top:67.5%;left: 8%;width:30%;line-height:0.14in;">
                <span id="pv_receiver_2" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
                <br />
            </div>




            <div style="position:absolute; top:71%; left:5%; width:70%; line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">Παραλαμβάνει &amp; παραδίδει στον Υπεύθυνο του Εργαστηρίου:</span>
                <br />
            </div>
            <div style="position:absolute; top:71% ;left: 63%; width:60% ;line-height:0.15in;">
                <span id="pv_lab" style="font-style:normal;font-weight:bold;font-size:10pt;"></span>
                <br />
            </div>
            <div style="position:absolute;top:75%; left: 5%; ;width:0.09in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">κ.</span>
                <br />
            </div>
            <div style="position:absolute; top:75%; left:8%; width:30%;line-height:0.14in;">
                <span id="pv_lab_manager" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
                <br />
            </div>
            <div style="position:absolute;top:75%; left:47%; width:0.59in;line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">Υπογραφή:</span>
                <br />
            </div>
            <div style="position:absolute;top:80%; left: 5%; width:80%; line-height:0.14in;">
                <span style="font-style:normal;font-weight:normal;font-size:10pt;">τα υλικά/εργασίες που αναφέρονται στα παρακάτω παραστατικά:</span>
                <br />
            </div>

            <table style="position:absolute; top:83%; left:4.6%; width: 90%; border: 1px solid black;" >
                <tr style="text-align: center;border: 1px solid black;">
                  <th style="width:5%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;">Α/Α</th>
                  <th style="width:15%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;">ΑΡΙΘΜΟΣ</th>
                  <th style="width:15%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;">ΗΜ/ΝΙΑ</th>
                  <th style="width:10%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;">ΠΟΣΟ</th>
                  <th style="width:55%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;">ΠΡΟΜΗΘΕΥΤΗΣ</th>
                </tr>
                <tr style="text-align: center;">
                  <td style="width:5%;">1</td>
                  <td id = "pv_invoice_id"     style="width:15%;font-size:9pt;"></td>
                  <td id = "pv_invoice_date"   style="width:15%;font-size:9pt;"></td>
                  <td id = "pv_invoice_amount" style="width:10%;font-size:9pt;"></td>
                  <td id = "pv_supplier"       style="width:55%;font-size:9pt;"></td>
                </tr>
            </table>

            <div style="position:absolute;top:89%;left: 63%;width:0.84in;line-height:0.16in;">
                <span style="font-style:normal;font-weight:bold;font-size:10pt;">ΘΕΩΡΗΘΗΚΕ</span>
                <br />
            </div>
            <div style="position:absolute;top:93%; left:57%; width:50%;line-height:0.26in;">
                <div style="position:relative; left:0.30in;">
                    <span style="font-style:normal;font-weight:bold;font-size:10pt;">Ο ΑΝ/ΤΗΣ Δ/ΝΤΗΣ</span>
                    <br />
                </div>
                <span style="font-style:normal;font-weight:bold;font-size:10pt;">ΣΤΕΦΑΝΟΣ ΜΕΡΛΙΑΟΥΝΤΑΣ</span>
                <br />
            </div>
        </div>
    </body>
</html> -->