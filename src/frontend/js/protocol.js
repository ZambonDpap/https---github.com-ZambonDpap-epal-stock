$(document).ready(function () {
  //when the button "συνεχεια" ia pressed. set pdf viewer to inactive and activate the protocol viewer
  
  $('#invoice_form').jqxValidator({
    rules: [
           { input: '#invoice_no',     message: 'Ο αριθμός τιμολογίου είναι υποχρεωτικός!', action: 'keyup', rule: 'required' },
           { input: '#invoice_date',   message: 'H ημερ. τιμολογίου ειναι υποχρεωτική!', action: 'keyup', rule: 'required' },
           { input: '#suppliers',      message: 'Ο προμηθευτής είναι υποχρεωτικός!', action: 'keyup', rule: 'required' },
           { input: '#invoice_date',   message: 'H ημερ. πρωτοκόλλου ειναι υποχρεωτική!', action: 'valuechanged', rule: 'required' },
           { input: '#fields',         message: 'Ο τομέας είναι υποχρεωτικός!', action: 'change', 
              rule: function () {
                var item = $('#fields').jqxDropDownList('getSelectedItem')
                if (item == null) {
                  return false;
                } else {
                  return true;
                }
              }
          },
           { input: '#labs',           message: 'Tο εργαστήριο είναι υποχρεωτικό!', action: 'change',
             rule: function () {
              var item = $('#fields').jqxDropDownList('getSelectedItem')
              if (item == null) {
                return false;
              } else {
                return true;
              }
            }
           },
           { input: '#payment_methods',message: 'Ο τρόπος πληρωμής είναι υποχρεωτικός!', action: 'change', 
             rule: function () {
              var item = $('#payment_methods').jqxDropDownList('getSelectedItem')
              if (item == null) {
                return false;
              } else {
                return true;
              }
            }
           },
           { input: '#materials_added',message: 'Οι αγορές είναι υποχρεωτικές!', action: 'change', 
              rule: function () {
                var buys = $('#materials_added').jqxGrid('getRows');
                var result = buys.length > 0;
                return result;
              }
            }
          ]
  });
  $("#continue").on("click", () => {
    $('#invoice_form').jqxValidator('validate');
    if (validateInput() == true) {
      $("#pdf_viewer").hide();
      // prepareProtocolViewer();
      prepareProtocolViewer()

      const protocol_no = $("#protocol_no").val();
      $("#pv_protocol_id").text(protocol_no);

      const protocol_date = $("#protocol_date").val();
      $("#pv_protocol_date_1").text(protocol_date);
      $("#pv_protocol_date_2").text(protocol_date);

      var field_item = $("#fields").jqxDropDownList("getSelectedItem");
      if(field_item.label == "ΕΡΓΑΣΤΗΡΙΑΚΟ ΚΕΝΤΡΟ"){
        $("#pv_for_who").text("για το ΕΚ");
        $("#pv_field_name").text("");
        $("#pv_delivers_to").text("Παραλαμβάνει &amp; παραδίδει στον Δ/ντή του:");
      } else {
        $("#pv_for_who").text("για τον ΤΟΜΕΑ");
        $("#pv_field_name").text(field_item.label);
        $("#pv_delivers_to").text("Παραλαμβάνει και παραδίδει στον Υπεύθυνο του Εργαστηρίου:");
      }

      var lab_item = $("#labs").jqxDropDownList("getSelectedItem");
      $("#pv_lab").text(lab_item.label);

      var academic_year = $("#academic_year").jqxDropDownList("getSelectedItem");
      getLabBuyers(lab_item.value, academic_year.label);

      getLabReceivers(lab_item.value, academic_year.label);

      getLabManager(lab_item.value, academic_year.label);

      getPraxis();

      const invoice_number = $("#invoice_no").val();
      $("#pv_invoice_id").text(invoice_number);

      const invoice_date = $("#invoice_date").val();
      $("#pv_invoice_date").text(invoice_date);

      const field_cost = $("#field_cost").val();
      $("#pv_invoice_amount").text(field_cost);

      let supplier_name = $("#suppliers").val();
      if (Object.prototype.toString.call(supplier_name) === '[object Object]'){
        supplier_name = supplier_name.label
      }
      $("#pv_supplier").text(supplier_name);

      $("#save").show();
    }
  });
  $("#save").on("click", (event) => {
    event.preventDefault();

    savePDF();
  });
});

function savePDF() {
  const academic_year_item = $("#academic_year").jqxDropDownList("getSelectedItem");
  const academic_year = academic_year_item.value;
  const protocol_date = $("#protocol_date").val();
  const field_item = $("#fields").jqxDropDownList("getSelectedItem");
  const field_id = field_item.value;
  const lab_item = $("#labs").jqxDropDownList("getSelectedItem");
  const lab_id = lab_item.value;
  const invoice_number = $("#invoice_no").val();
  const invoice_date = $("#invoice_date").val();
  const field_cost = $("#field_cost").val();
  const cost = $("#cost").val();
  const comments = $("#comments").val();
  let supplier_name = $("#suppliers").val();
  if (Object.prototype.toString.call(supplier_name) === '[object Object]'){
    supplier_name = supplier_name.label
  }
  const materials_bought = $("#materials_added").jqxGrid("getrows");
  const protocol_no = $("#protocol_no").val();
  const payment_method_item = $("#payment_methods").jqxDropDownList("getSelectedItem");
  const payment_method = payment_method_item.value;
  
  var pdf_file = $("#invoice_select");
  var file = pdf_file[0].files[0];
  if (file.type == "application/pdf") {
    var invoice_pdf = new FormData();
    invoice_pdf.append("pdf_file", file);
    invoice_pdf.append("lab_id", lab_item.originalItem.id)
    invoice_pdf.append("field_id", field_item.originalItem.id)
    invoice_pdf.append("invoice_date", invoice_date)
    invoice_pdf.append("supplier_name", supplier_name);
    invoice_pdf.append("field_cost", field_cost);
    invoice_pdf.append("invoice_number", invoice_number);
    invoice_pdf.append("comments", comments);
    invoice_pdf.append("functionname", "upload_pdf")

    jQuery.ajax({
      type: "POST",
      url: "./src/backend/rest_api.php",
      dataType: "json",
      data: invoice_pdf,
      contentType:false,
      processData:false,
      success: function(invoice_pdf_name){

          jQuery.ajax({
            type: "POST",
            url: "./src/backend/rest_api.php",
            dataType: "json",
            data: {
              functionname: "save_pdf",
              arguments: [
                $("#protocol_viewer").html(),
                academic_year,
                protocol_date,
                field_id,
                lab_id,
                invoice_number,
                invoice_date,
                field_cost,
                cost,
                supplier_name,
                materials_bought,
                protocol_no,
                payment_method,
                invoice_pdf_name,
                comments
                ],
            },
        
            success: function (obj, textstatus) {
              if (obj === true) {
                $("#notification_success").html("Το τιμολόγιο αποθηκεύτηκε.");
                $("#notification_success").jqxNotification("open");
                $("#notification_success").html("Το πρωτόκολλο αποθηκεύτηκε.");
                $("#notification_success").jqxNotification("open");
        
              } else {
                $("#notification_success").html("Το τιμολόγιο δεν αποθηκεύτηκε.");
                $("#notification_success").jqxNotification("open");
                $("#notification_success").html("Το πρωτόκολλο δεν αποθηκεύτηκε.");
                $("#notification_success").jqxNotification("open");
              }
              clearInvoiceForm();
              $("#pdf_viewer").hide();
              $("#protocol_viewer").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert("Status: " + textStatus);
              alert("Error: " + errorThrown);
            },
          });
      }
    });
  }
}
function validateInput() {

  var buys = $('#materials_added').jqxGrid('getRows');

  if( $("#invoice_no").val() != "" && $("#invoice_date").val() != "" && $("#suppliers").val() != "" 
  && $("#protocol_no").val() != "" && $("#invoice_date").val() != "" && $("#fields").val() != "" 
  && $("#labs").val() != "" && $("#payment_methods").val() != "" && buys.length > 0 ){
    return true;
  }else{
    return false;
  }
}

function getLabBuyers(lab_id, academic_year) {
  jQuery.ajax({
    type: "GET",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: {
      functionname: "get_lab_buyers",
      arguments: [lab_id, academic_year],
    },

    success: function (obj, textstatus) {
      $("#pv_buyer_1").text(obj[0].lastname + " " + obj[0].firstname);
      $("#pv_buyer_2").text(obj[1].lastname + " " + obj[1].firstname);
      $("#pv_buyer_3").text(obj[2].lastname + " " + obj[2].firstname);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function getLabManager(lab_id, academic_year) {
  jQuery.ajax({
    type: "GET",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: {
      functionname: "get_lab_manager",
      arguments: [lab_id, academic_year],
    },

    success: function (obj, textstatus) {
      $("#pv_lab_manager").text(obj[0].lastname + " " + obj[0].firstname);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function getLabReceivers(lab_id, academic_year) {
  jQuery.ajax({
    type: "GET",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: {
      functionname: "get_lab_receivers",
      arguments: [lab_id, academic_year],
    },

    success: function (obj, textstatus) {
      $("#pv_receiver_1").text(obj[0].lastname + " " + obj[0].firstname);
      $("#pv_receiver_2").text(obj[1].lastname + " " + obj[1].firstname);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function getPraxis() {
  jQuery.ajax({
    type: "GET",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: {
      functionname: "get_praxis",
      arguments: [],
    },

    success: function (obj, textstatus) {
      $("#pv_praxis").text(obj);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });  
}
function prepareProtocolViewer(){
  let host = window.location.host;
  let image_path = "";
  if(host === "localhost"){
    image_path = "http://localhost/src/images/";
  } else if(host === "stefanos.work"){
    image_path = "https://stefanos.work/ektimologia/src/images/";
  }

  let html  = "<table style='position:absolute;top:3%;left:5%;'> \
                <tr><td style='text-align: center'><img style='width:16%; height:5%' src='" + image_path + "ri_1.png' /></td></tr> \
                <tr><td style='text-align: center;font-style:normal;font-weight:bold;font-size:1em;'>ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</td></tr> \
                <tr><td style='text-align: center;font-style:normal;font-weight:bold;font-size:8pt;'>ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ, ΘΡΗΣΚΕΥΜΑΤΩΝ</td></tr> \
                <tr><td style='text-align: center;font-style:normal;font-weight:bold;font-size:8pt;'>ΚΑΙ ΑΘΛΗΤΙΣΜΟΥ</td></tr> \
                <tr><td style='height:15px'></td></tr> \
                <tr><td style='text-align: center;font-style:normal;font-weight:bold;font-size:7pt;'>ΠΕΡΙΦΕΡΕΙΑΚΗ Δ/ΝΣΗ Α/ΘΜΙΑΣ ΚΑΙ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΚΕΝΤΡ. ΜΑΚΕΔΟΝΙΑΣ</td></tr> \
                <tr><td style='text-align: center;font-style:normal;font-weight:bold;font-size:7pt;'>Δ/ΝΣΗ Β/ΘΜΙΑΣ ΕΚΠ/ΣΗΣ ΑΝΑΤ.ΘΕΣΣΑΛΟΝΙΚΗΣ</td></tr> \
                <tr><td style='text-align: center;font-style:normal;font-weight:bold;font-size:10pt;'>8ο Ε.Κ.ΕΠΑΝΟΜΗΣ</td></tr> \
              </table> \
              <table style='position:absolute; top:4%; left:60%; width: 30%; border: 1px solid black;' > \
                <tr style='line-height:180%; border: 1px solid black;'> \
                    <td style='font-style:normal;font-weight:normal;font-size:9pt;'>Αρ. Πρωτ. :</td> \
                    <td id = 'pv_protocol_id' style='text-align: center;font-style:normal;font-weight:normal;font-size:9pt;'></td> \
                </tr> \
                <tr> \
                  <td style='font-style:normal;font-weight:normal;font-size:9pt;'>Ημερομηνία:</td> \
                  <td id='pv_protocol_date_1' style='text-align: center;font-style:normal;font-weight:normal;font-size:9pt;'></td> \
                </tr> \
              </table> \
              <div style='position:absolute;top:26%; left: 34%; width:2.04in;line-height:0.22in;'> \
                <span style='font-style:normal;font-weight:bold;font-size:14pt;letter-spacing:10px'>ΠΡΩΤΟΚΟΛΛΟ </span> \
                <br> \
              </div> \
              <div style='position:absolute;top:28.5%; left: 35%; width:40%;line-height:0.19in;'> \
                <span style='font-style:normal;font-weight:bold;font-size:9.5pt;'>ΠΑΡΑΛΑΒΗΣ ΥΛΙΚΩΝ &amp; ΕΡΓΑΣΙΩΝ</span> \
                <br> \
              </div> \
              <div style='position:absolute;top:34%; left: 5%; width:2.04in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>Σήμερα </span> \
              </div> \
              <div style='position:absolute;top:34%; left: 14%; width:2.04in;line-height:0.14in;'> \
                <span id='pv_protocol_date_2' style='font-style:normal;font-weight:bold;font-size:10pt;'></span> \
              </div> \
              <div style='position:absolute;top:34%; left: 33%; width:70%;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:9pt;'>συνήλθαν στο 8ο Ε.Κ. Επανομής οι επιτροπές αγοράς &amp; παραλαβής υλικών</span> \
              </div> \
              <div style='position:absolute;top:36.5%; left: 5%; width:2.04in;line-height:0.14in;'> \
                <span id='pv_for_who' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
              </div> \
              <div style='position:absolute;top:36.5%; left: 20%; width:60%;line-height:0.14in;'> \
                <span id='pv_field_name' style='font-style:normal;font-weight:bold;font-size:9pt;'></span> \
              </div> \
              <div style='position:absolute;top:36.5%; left: 65%; width:2.04in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>όπως αυτές ορίσθηκαν</span> \
              </div> \
              <div style='position:absolute;top:39%; left: 5%; width:2.04in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>με την υπ’ αριθμ.</span> \
              </div> \
              <div style='position:absolute;top:39%; left: 22%; width:2.04in;line-height:0.14in;'> \
                <span id='pv_praxis' style='font-style:normal;font-weight:bold;font-size:10pt;'></span> \
              </div> \
              <div style='position:absolute;top:39%; left: 36%; width:70%;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>του Συλ. Διδ/ντων του 8ου Ε.Κ. Επανομής αποτελούμενες από τους:</span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:44.7%; left: 5%; width:40%;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:bold;font-size:10pt;'><u>ΕΠΙΤΡΟΠΗ ΑΓΟΡΑΣ</u></span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:49%; left: 6%; width:0.09in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>1.</span> \
                <br /> \
              </div> \
              <div style='position:absolute; top:48.5%; left: 8%;width:30%;line-height:0.21in;'> \
                <span id='pv_buyer_1' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
              </div> \
              <div style='position:absolute;top:52.3%; left: 6%; ;width:0.09in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>2.</span> \
                <br /> \
              </div> \
              <div style='position:absolute; top:51.8%; left: 8%;width:30%;line-height:0.21in;'> \
                <span id='pv_buyer_2' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
              </div> \
              <div style='position:absolute;top:55.5%; left: 6%; ;width:0.09in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>3.</span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:55%;left: 8%;width:30%;line-height:0.21in;'> \
                <span id='pv_buyer_3' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
              </div> \
              <div style='position:absolute;top:59.3%; left: 5%; width:40%;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:bold;font-size:10pt;'><u>ΕΠΙΤΡΟΠΗ ΠΑΡΑΛΑΒΗΣ</u></span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:64%; left: 6%; ;width:30%;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>1.</span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:64%;left: 8%;width:30%;line-height:0.14in;'> \
                <span id='pv_receiver_1' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:67.5%; left: 6%; ;width:0.09in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>2.</span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:67.5%;left: 8%;width:30%;line-height:0.14in;'> \
                <span id='pv_receiver_2' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
                <br /> \
              </div> \
              <div style='position:absolute; top:71%; left:5%; width:70%; line-height:0.14in;'> \
                <span id='pv_delivers_to' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
                <br /> \
              </div> \
              <div style='position:absolute; top:71% ;left: 63%; width:60% ;line-height:0.15in;'> \
                <span id='pv_lab' style='font-style:normal;font-weight:bold;font-size:10pt;'></span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:75%; left: 5%; ;width:0.09in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>κ.</span> \
                <br /> \
              </div> \
              <div style='position:absolute; top:75%; left:8%; width:30%;line-height:0.14in;'> \
                <span id='pv_lab_manager' style='font-style:normal;font-weight:normal;font-size:10pt;'></span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:75%; left:47%; width:0.59in;line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>Υπογραφή:</span> \
                <br /> \
              </div> \
              <div style='position:absolute;top:80%; left: 5%; width:80%; line-height:0.14in;'> \
                <span style='font-style:normal;font-weight:normal;font-size:10pt;'>τα υλικά/εργασίες που αναφέρονται στα παρακάτω παραστατικά:</span> \
                <br /> \
              </div> \
              \
              <table style='position:absolute; top:83%; left:4.6%; width: 90%; border: 1px solid black;' > \
                <tr style='text-align: center;border: 1px solid black;'> \
                  <th style='width:5%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;'>Α/Α</th> \
                  <th style='width:15%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;'>ΑΡΙΘΜΟΣ</th> \
                  <th style='width:15%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;'>ΗΜ/ΝΙΑ</th> \
                  <th style='width:10%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;'>ΠΟΣΟ</th> \
                  <th style='width:55%;font-weight:bold;font-size:9pt;border-bottom: 1px solid black;'>ΠΡΟΜΗΘΕΥΤΗΣ</th> \
                </tr> \
                <tr style='text-align: center;'> \
                  <td style='width:5%;'>1</td> \
                  <td id = 'pv_invoice_id'     style='width:15%;font-size:9pt;'></td> \
                  <td id = 'pv_invoice_date'   style='width:15%;font-size:9pt;'></td> \
                  <td id = 'pv_invoice_amount' style='width:10%;font-size:9pt;'></td> \
                  <td id = 'pv_supplier'       style='width:55%;font-size:9pt;'></td> \
                </tr> \
              </table> \
              \
              <table style='position:absolute;top:89%;left: 63%;'> \
                <tr><td style='text-align: center'><span style='font-style:normal;font-weight:bold;font-size:10pt;'>ΘΕΩΡΗΘΗΚΕ</span></td></tr> \
                <tr><td style='height:20px'></td></tr> \
                <tr><td style='text-align: center'><span style='font-style:normal;font-weight:bold;font-size:10pt;'>Ο Δ/ΝΤΗΣ</span></td></tr> \
                <tr><td style='text-align: center'><span style='font-style:normal;font-weight:bold;font-size:10pt;'>ΣΤΕΦΑΝΟΣ ΜΕΡΛΙΑΟΥΝΤΑΣ</span></td></tr> \
              </table>"
  $("#protocol_viewer").html(html)
  $("#protocol_viewer").show();

}
