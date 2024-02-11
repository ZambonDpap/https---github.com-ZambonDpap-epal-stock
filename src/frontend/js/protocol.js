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
      $("#protocol_viewer").show();

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
