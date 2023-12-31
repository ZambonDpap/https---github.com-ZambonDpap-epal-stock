<?php
   include('./src/backend/session.php');

   $image_path = "";

   if ( $_SERVER['HTTP_HOST'] == "stefanos.work")
   {
        $image_path = "https://stefanos.work/ektimologia/src/images/";
   } else if ( $_SERVER['HTTP_HOST'] == "localhost") {
        $image_path = "http://localhost/src/images/";
   }
?>
<html>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />

    <head>
        <title>Νέο Τιμολόγιο</title>
        <!-- Load jquery 3.7.0 from the CDN -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>

        <!-- Add external js files-->
        <script src="./src/frontend/js/new_invoice.js"></script>
        <script src="./src/frontend/js/protocol.js"></script>
        <script src="./src/frontend/js/home.js"></script>
        <script src="./src/frontend/js/invoices.js"></script>
        <script src="./src/frontend/js/users_roles.js"></script>
        <script src="./src/frontend/js/suppliers.js"></script>
        <script src="./src/frontend/js/proposal.js"></script>
        <script src="./src/frontend/js/fields_labs_supplies.js"></script>
        <script src="./src/frontend/js/supplies_book.js"></script>


        <!-- Add css files-->
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/home.css">
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/new_invoice.css">
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/protocol.css" />
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/invoices.css" />
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/suppliers.css" />
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/fields_labs_supplies.css" />
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/supplies_book.css" />
        <link rel="stylesheet" type="text/css" href="./src/frontend/css/user_roles.css" />
    


        <!-- Add jqwidgets js files-->
        <link rel="stylesheet" href="./libs/jqwidgets_16.0.0/styles/jqx.base.css" type="text/css" />
        <link rel="stylesheet" href="./libs/jqwidgets_16.0.0/styles/jqx.energyblue.css" type="text/css" />


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
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxfileupload.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/globalization/globalize.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxgrid.pager.js"></script> 
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxwindow.js"></script> 
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxtabs.js"></script> 
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxtextarea.js"></script>
        <script type="text/javascript" src="./libs/jqwidgets_16.0.0/jqxvalidator.js"></script>
        <style>
		.cellcolor {
            background-color: rgb(255, 158, 158) !important;
			color: white !important;
		}
	</style>
    </head>
   
   <body>
        <div id="top_menu">
            <div id="top_left_menu">
                <div class="box-left" id="home_btn">Αρχική</div>
                <div class="box-left" id="new_invoice_btn">Νέο Τιμολόγιο</div>
                <div class="box-left" id="invoice_list_btn">Τιμολόγια</div>
                <div class="box-left" id="supplies_book_btn">Βιβλίο Υλικών</div>
                <?php 
                    if ( $_SESSION['admin_level'] == 2 ){
                        echo('<div class="box-left" id="users_list_btn">Καθηγητές/Ρόλοι</div>
                        <div class="box-left" id="fields_labs_list_btn">Τομείς/Εργαστήρια/Υλικά</div>
                        <div class="box-left" id="suppliers_list_btn">Προμηθευτές</div>');
                    }
                ?>
                <div class="box-left" id="proposal_btn">Πρόταση Αγοράς</div>
            </div>
            <div id="top_right_menu">
                <div class="box-right" id="username"><?php echo( $_SESSION['fullname'] ) ?></div>
                <div class="box-right" id="user_id"><?php echo( $_SESSION['id'] ) ?></div>
                <div class="box-right" id="logout">Sing out</div>
                <div id="notification_success"></div>
                <div id="notification_warning"></div>
                <div id="notification_info"></div>
            </div>
        </div>

        <!-- INVOICE FORM -->
        <div id="invoice_form">
            <div id="academic-year-form-group">
                <label id="academic-year-label" for="academic_year">Ακαδ. Έτος</label>
                <div id="academic_year"></div>
            </div>
            <div id="invoice-form-group">
                <label id="invoice-label" for="invoice_select">Τιμολόγιο</label>
                <input type="file" id="invoice_select" name="invoice_select" accept="application/pdf">
            </div>
            <div id="invoice-no-date-form-group">
                <label id="invoice-no-label" for="invoice_no">Αρ. Τιμολ.</label>
                <input id="invoice_no" name="invoice_no" required>
                <div id="invoice-date-form-group">
                    <label id="invoice-date-label" for="invoice_date">Ημ. Τιμολ.</label>
                    <input id="invoice_date" name="invoice_date" required>
                </div>
            </div>
            <div id="supplier-form-group">
                <label id="supplier-label" for="suppliers">Προμηθευτής</label>
                <input type="text" id="suppliers">
            </div>
            <button class="add_new_supplier" id="new_supplier"><img src="<?php echo( $image_path ) ?>add_16.png"></button>  
            <div id="new_supplier_popover">
                <div id="new_added_supplier_name_label">Όνομα Προμηθευτή</div><input type="text" id="new_added_supplier_name">
                <button div id="add_new_supplier">ΟΚ</button>
            </div>
            <div id="protocol-no-date-form-group">
                <label id="protocol-no-label" for="protocol_no">Αρ. πρωτοκ.</label>
                <input type="number" id="protocol_no" name="protocol_no" required>
                <div id="protocol-date-form-group">
                    <label id="protocol-date-label" for="protocol_date">Ημ. πρωτοκ.</label>
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
                <label for="payment_method">Πληρωμή</label>
                <div id="payment_methods"></div>

                <label id="cost-label" for="cost">Ποσό</label>
                <input type="number" id="cost" name="cost" required>

                <label id="field-cost-label" for="field_cost">Ποσό Τομέα</label>
                <input type="number" id="field_cost" name="field_cost" required>
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
            <button id="new_material"><img src="<?php echo( $image_path ) ?>add_16.png"></button>

            <div id="materials_added"></div>
            <button id="delete_added_material"><img src="<?php echo( $image_path ) ?>delete_16.png"></button>

            <textarea id="comments"></textarea>

            <input id="continue" type="submit" value="Συνέχεια">
            <input id="save" type="submit" value="Αποθήκευση">
        </div>

        <!-- PDF VIEWER -->
        <div id="pdf_viewer">
            <embed src="" type="application/pdf" id="pdf_file">
        </div>

        <!-- PROTOCOL VIEWER -->
        <div id="protocol_viewer">
            <table style="position:absolute;top:3%; left:5%;">
                <tr>
                    <td style="text-align: center"><img style="width:16%; height:5%" src="<?php echo( $image_path ) ?>ri_1.png" /></td>
                </tr>
                <tr>
                    <td style="text-align: center;font-style:normal;font-weight:bold;font-size:1em;">ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</td>   
                </tr>
                <tr>
                    <td style="text-align: center;font-style:normal;font-weight:bold;font-size:8pt;">ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ, ΘΡΗΣΚΕΥΜΑΤΩΝ</td>   
                </tr>
                <tr>
                    <td style="text-align: center;font-style:normal;font-weight:bold;font-size:8pt;">ΚΑΙ ΑΘΛΗΤΙΣΜΟΥ</td>   
                </tr>
                <tr>
                    <td style="height:15px"></td>   
                </tr>
                <tr>
                    <td style="text-align: center;font-style:normal;font-weight:bold;font-size:7pt;">ΠΕΡΙΦΕΡΕΙΑΚΗ Δ/ΝΣΗ Α/ΘΜΙΑΣ ΚΑΙ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΚΕΝΤΡ. ΜΑΚΕΔΟΝΙΑΣ</td>   
                </tr>
                <tr>
                    <td style="text-align: center;font-style:normal;font-weight:bold;font-size:7pt;">Δ/ΝΣΗ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΑΝΑΤ.ΘΕΣΣΑΛΟΝΙΚΗΣ</td>   
                </tr>
                <tr>
                    <td style="text-align: center;font-style:normal;font-weight:bold;font-size:10pt;">8ο Ε.Κ.ΕΠΑΝΟΜΗΣ</td>   
                </tr>
            </table>

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
                <span id="pv_for_who" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
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
                <span id="pv_praxis" style="font-style:normal;font-weight:bold;font-size:10pt;"></span>
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
                <span id="pv_delivers_to" style="font-style:normal;font-weight:normal;font-size:10pt;"></span>
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

            <table style="position:absolute;top:89%;left: 63%;">
                <tr><td style="text-align: center"><span style="font-style:normal;font-weight:bold;font-size:10pt;">ΘΕΩΡΗΘΗΚΕ</span></td></tr>
                <tr><td style="height:20px"></td></tr>
                <tr><td style="text-align: center"><span style="font-style:normal;font-weight:bold;font-size:10pt;">Ο Δ/ΝΤΗΣ</span></td></tr>
                <tr><td style="text-align: center"><span style="font-style:normal;font-weight:bold;font-size:10pt;">ΣΤΕΦΑΝΟΣ ΜΕΡΛΙΑΟΥΝΤΑΣ</span></td></tr>
            </table>
        </div>

        <!-- SUPPLIES BOOK -->
        <div id="supplies_book_fields">Τομέας</div>
        <div id="supplies_book_fields_dropdown"></div>
        <div id="supplies_book_labs">Υλικά Εργαστηρίου</div>
        <div id="supplies_book_labs_dropdown"></div>
        <div id="supplies_book_table">
            <ul>
                <li style="margin-left: 30px;">
                    ΑΝΑΛΩΣΙΜΑ
                </li>
                <li>
                    ΒΡΑΧΕΙΑΣ
                </li>
                <li>
                    ΜΑΚΡΑΣ
                </li>
            </ul>
            <div style="overflow: hidden;">
                <div style="border:none;" id="grid_cons"></div>
            </div>
            <div style="overflow: hidden;">
                <div style="border:none;" id="grid_sort"></div>
            </div>  
            <div style="overflow: hidden;">
                <div style="border:none;" id="grid_long"></div>
            </div>  
        </div>
        <div id="supplies_destroys_table"></div>

        <!-- INVOICES TABLE -->
        <div id="invoices_table"></div>
        <div id="invoices_supplies_table"></div>

        <!-- USERS TABLE -->
        <div id="users_table"></div>
        <div id="users_roles_table"></div>
        <div id="add_user_role_div"><input id="add_user_role" value="Νέος Ρόλος"></input></div>

        <div id="edit_user_role_popupwindow">
            <div>Edit</div>
            <div style="overflow: hidden;">
                <table>
                    <tr>
                        <td class="edit_roles_td_name" align="right">Ρόλος</td>
                        <td  align="left"><div class="edit_element" id="edit_user_role"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_roles_td_name" align="right">Τομέας</td>
                        <td align="left"><div  class="edit_element" id="edit_user_field"></div</td>
                    </tr>
                    <tr>
                        <td class="edit_roles_td_name" align="right">Εργαστήριο</td>
                        <td align="left"><div  id="edit_user_lab"></div</td>
                    </tr>
                    <tr>
                        <td class="edit_roles_td_name" align="right">Ακάδ έτος</td>
                        <td align="left"><div  id="edit_user_year"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_roles_td_name" align="right">Ενεργός</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr>
                    <tr>
                        <td align="right"></td>
                        <td style="padding-top: 10px;" align="right">
                            <input class=user_role_action type="button" id="update_user_role" value="Save" />
                            <input id="cancel_update_user_role" type="button" value="Cancel" />
                        </td>
                    </tr>
                </table>
            </div>
       </div>


        <!-- SUPPLIERS TABLE -->
        <div id="suppliers_table"></div>
        <div id="add_supplier"></div>
        <div id="delete_supplier"></div>


        <!-- FIELDS LABS MATERIAL STOCK TABLE -->
        <div id="fields_table"></div>
        <div id="labs_table"></div>
        <div id="consumables_materials_table"></div>
        <div id="labs_roles_academic_year"></div>
        <div id="fields_roles_table"></div>
        <div id="labs_roles_table"></div>
        <div id="add_consumable"></div>
        <div id="delete_consumable"></div>
        <div id="short_term_materials_table"></div>
        <div id="add_short_term"></div>
        <div id="delete_short_term"></div>
        <div id="long_term_materials_table"></div>
        <div id="add_long_term"></div>
        <div id="delete_long_term"></div>
        <div id="stock_table"></div>
        

        <div id="edit_lab_roles_div"><input id="edit_lab_roles" value="Άλλαγή ρόλων εργαστ."></input></div>
        <div id="edit_field_roles_div"><input id="edit_field_roles" value="Αλλαγή ρόλων τομέα"></input></div>
        <div id="add_lab_roles_div"><input id="add_lab_roles" value="Νέοι ρόλοι εργαστ."></input></div>
        <div id="add_field_roles_div"><input id="add_field_roles" value="Νέοι ρόλοι τομέα"></input></div>

        <div id="edit_field_roles_popupwindow">
            <div></div>
            <div style="overflow: hidden;">
                <table>
                    <tr>
                        <td class="edit_field_roles_td" align="right">Υπευθυνος Τομέα</td>
                        <td  align="left"><div class="edit_element" id="edit_field_role"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_field_roles_td" align="right">Ενεργός</td>
                        <td align="left"><div  id="edit_field_role_active"></div></td>
                    </tr>
                    <tr>
                        <td align="right"></td>
                        <td style="padding-top: 10px;" align="right">
                            <input class=field_role_action type="button" id="update_field_role" value="Save" />
                            <input id="cancel_update_field_role" type="button" value="Cancel" />
                        </td>
                    </tr>
                </table>
            </div>
       </div>

       <div id="edit_lab_roles_popupwindow">
            <div></div>
            <div style="overflow: hidden;">
                <table>
                    <tr>
                        <td class="edit_lab_roles_td" align="right">Υπευθυνος Εργαστηρίου</td>
                        <td  align="left"><div class="edit_element" id="edit_lab_manager_role"></div></td>
                    </tr>
                    <!-- <tr>
                        <td class="edit_lab_roles_td" align="right">Επιτροπη αγοράς 1</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_lab_roles_td" align="right">Επιτροπη αγοράς 2</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_lab_roles_td" align="right">Επιτροπη αγοράς 3</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_lab_roles_td" align="right">Επιτροπη παραλαβής 1</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_lab_roles_td" align="right">Επιτροπη παραλαβής 2</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_lab_roles_td" align="right">Επιτροπη παραλαβής 3</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr>
                    <tr>
                        <td class="edit_lab_roles_td" align="right">Ενεργός</td>
                        <td align="left"><div  id="edit_user_active"></div></td>
                    </tr> -->
                    <tr>
                        <td align="right"></td>
                        <td style="padding-top: 10px;" align="right">
                            <input class=lab_role_action type="button" id="update_lab_role" value="Save" />
                            <input id="cancel_update_lab_role" type="button" value="Cancel" />
                        </td>
                    </tr>
                </table>
            </div>
       </div>

        <!-- PURCHACE PROPOSAL TABLE -->
        <div id="proposal"></div>
    </body>
</html>