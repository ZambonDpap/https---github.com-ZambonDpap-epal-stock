let uploadfile = ""
let g_fields = {}
let g_field_labs = {}
let g_academic_years = {}
let g_suppliers = {}

$(document).ready(function () {
  //disable everything until an invoice pdf is selected
  disableElements();

  //get user fields and store them in a global
  getUserFields()

  //academic year
  addAcademicYearsToDropdown("#academic_year");

  //each time a new invoice is selected trigger pdf viewer to preview the file
  invoicePDFSelected();

  //each time a new field is selected get the related labs and update the labs dropdown list
  addFieldLabsToDropdown();

  //each time a new lab is selected get the related materials and update the materials source array
  addLabsMaterialsToAutocompleteInput();

  //get the material types from the db and fill the dropdown
  addMaterialTypesToDropdown();

  //setup grid for bought materials
  setupBoughtMaterialsGrid();

  //notifications
  $("#notification_success").jqxNotification({ width: 350, height: 50, position: "top-right", opacity: 0.9, autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 6000, closeOnClick: true, template: "success" });
  $("#notification_info").jqxNotification({  width: 350, height: 50, position: "top-right", opacity: 0.9, autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 6000, closeOnClick: true, template: "info" });
  $("#notification_warning").jqxNotification({ width: 350, height: 50, position: "top-right", opacity: 0.9, autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 6000, closeOnClick: true, template: "warning" });
  $("#notification_error").jqxNotification({ width: 600, height: 100, position: "top-right", opacity: 0.9, autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 10000, closeOnClick: true, template: "error" });

  //popovers
  $("#new_material_popover").jqxPopover({ offset: { left: -50, top: 0 }, width: 1200, height: 100, autoClose: false, title: "Καταχώρηση Νέου Υλικού", selector: $("#new_material") });
  $("#new_supplier_popover").jqxPopover({ offset: { left: -50, top: 0 }, width: 680,  height: 100, title: "Καταχώρηση Νέου Προμηθευτή", selector: $(".add_new_supplier") });

  //on actions
  //select an aqcademic year to enable the form
  $("#academic_year").on("select", function () {
    const academic_year = $("#academic_year").val();
    if (academic_year !== "") {
      $("#invoice_select").prop("disabled", false);
    }
  });

  //add material in bought list
  $("#materials").on("select", function () {
    var material = $("#materials").val();
    var parts = material.value.split("|-|");

    addMaterialToBoughtList(parts[0], material.label, parts[1], 0);
  });

  //add new material in bought list and add it to the dropdown and the database
  $("#add_new_material").on("click", () => {
    addNewMaterial($("#new_added_material_name").val(), $("#new_added_material_type").val(), $("#new_added_material_number").val());
  });

  //add new supplier to the dropdown and add it to the dropdown and the database
  $("#add_new_supplier").on("click", () => {
    addNewSupplier($("#new_added_supplier_name").val());
  });

  //delete an added material from the table. Nothing is changed to the mysql database.
  $("#delete_added_material").on("click", () => {
    selectedrowindex = $("#materials_added").jqxGrid("getselectedrowindex");
    var rowid = $("#materials_added").jqxGrid("getrowid", selectedrowindex);
    var commit = $("#materials_added").jqxGrid("deleterow", rowid);
  });

  $('#cost').keyup(function (event) {
    var value = $('#cost').val();
    $('#field_cost').val(value);
  });
});

function disableElements() {
  $("#invoice_select").prop("disabled", true);
  $("#pdf_viewer").show();
  $("#protocol_viewer").hide();
  $("#save").hide();
  $("#academic_year").jqxDropDownList({ theme: 'energyblue', itemHeight: 40, height: 35, width: 100, disabled: false });
  $("#invoice_no").jqxInput({ width: "30%", height: "35px", theme: "energyblue", disabled: true });
  $("#invoice_date").jqxDateTimeInput({ width: "110px", height: "35px", disabled: true });
  $("#protocol_no").jqxNumberInput({ width: "50px", height: "35px", theme: "energyblue", spinButtons: false, symbol: "", min: 1, inputMode: "simple", decimalDigits: 0, disabled: true });
  $("#protocol_date").jqxDateTimeInput({ width: "110px", height: "35px", disabled: true });
  $("#suppliers").jqxInput({ theme: 'energyblue', placeHolder: "Επιλογή προμηθευτή", height: 35, width: "530%", minLength: 1, items: 9, disabled: true });
  $("#new_supplier").hide();
  $("#fields").jqxDropDownList({ theme: 'energyblue', itemHeight: 40, height: 35, width: "83.3%", disabled: true });
  $("#labs").jqxDropDownList({ theme: 'energyblue', itemHeight: 40, height: 35, width: "83.3%", disabled: true });
  $("#payment_methods").jqxDropDownList({ theme: 'energyblue', itemHeight: 40, height: 35, width: 170, disabled: true });
  $("#cost").jqxNumberInput({ width: "75px", height: "35px", theme: "energyblue", spinButtons: false, symbol: "€", min: 0.00, inputMode: "simple", disabled: true });
  $("#field_cost").jqxNumberInput({ width: "75px", height: "35px", theme: "energyblue", spinButtons: false, symbol: "€", min: 0.00, inputMode: "simple", disabled: true });
  $("#materials").jqxInput({ theme: 'energyblue', placeHolder: "Επιλογή Υλικών", height: 35, width: "83.3%", minLength: 1, items: 9, disabled: true });
  $("#new_added_material_type").jqxDropDownList({ theme: 'energyblue', itemHeight: 40, height: 35, width: "200", popupZIndex: 999999, disabled: false });
  $("#new_material").hide();
  $('#comments').jqxTextArea({ placeHolder: 'Παρατηρήσεις', width: "89.3%", height: "10%", theme: 'energyblue' });
}

function enableElements() {
  $("#invoice_no").jqxInput({ disabled: false });
  $("#invoice_date").jqxDateTimeInput({ disabled: false });
  $("#protocol_date").jqxDateTimeInput({ disabled: false });
  $("#suppliers").jqxInput({ disabled: false });
  $("#new_supplier").show();
  $("#fields").jqxDropDownList({ disabled: false });
  $("#payment_methods").jqxDropDownList({ disabled: false });
  $("#cost").jqxNumberInput({ disabled: false });
  $("#field_cost").jqxNumberInput({ disabled: false });
  $("#new_material").show();
}

function addAcademicYearsToDropdown(element) {
  jQuery.ajax({
    type: "GET",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: { functionname: "get_academic_years", arguments: [] },

    success: function (obj, textstatus) {
      if (!("error" in obj)) {
        var source = {
          localdata: obj,
          datatype: "json",
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $(element).jqxDropDownList({
          selectedIndex: -1,
          source: dataAdapter,
          displayMember: "academic_year",
          valueMember: "",
        });
      } else {
        console.log(obj.error);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    }
  })
}

function invoicePDFSelected() {
  $("#invoice_select").change(function (e) {
    $("#pdf_viewer").show();
    $("#protocol_viewer").hide();
    var file_data = this.files[0];
    if (file_data) {
      var url = URL.createObjectURL(file_data);
      $("#pdf_file").attr("src", url);

      //enable elements once an invoice pdf is selected
      enableElements();

      //get the correct protocol id from database and add it to the form
      getMaxProtocolId();

      //get the suppliers from the db and fill the dropdown
      addSuppliersToDropdown("");

      //get the fields from the db and fill the dropdown
      addFieldsToDropdown();

      //get the payment methods and fill the dropdown
      addPaymentMethodsToDropdown();
    }
  });
}

function getMaxProtocolId() {
  const academic_year_item =
    $("#academic_year").jqxDropDownList("getSelectedItem");
  const academic_year = academic_year_item.value;

  jQuery.ajax({
    type: "POST",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: {
      functionname: "get_academic_year_max_protocol_id",
      arguments: [academic_year],
    },

    success: function (obj, textstatus) {
      let max_protocol_id = obj;
      $("#protocol_no").val(max_protocol_id);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function getUserFields() {
  const user_id = $("#user_id").html();
  // console.log(user_id);

  jQuery.ajax({
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: { functionname: "get_user_fields", arguments: [user_id] },

    success: function (obj, textstatus) {
      if (!("error" in obj)) {
        g_fields = obj[0];
        g_field_labs = obj[1];
      } else {
        console.log(obj.error);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function addFieldsToDropdown() {
  var source = {
    localdata: g_fields,
    datatype: "json",
  };
  var dataAdapter = new $.jqx.dataAdapter(source);
  $("#fields").jqxDropDownList({
    selectedIndex: -1,
    source: dataAdapter,
    displayMember: "name",
    valueMember: "id",
  });

}

function addFieldLabsToDropdown() {
  const user_id = $("#user_id").html();
  $("#fields").change(function () {
    $("#labs").jqxDropDownList("clear");
    $("#materials").jqxInput("clear");
    var field = $("#fields").jqxDropDownList("getSelectedItem");

    var source = {
      localdata: g_field_labs[field.label],
      datatype: "json",
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#labs").jqxDropDownList({
      selectedIndex: -1,
      source: dataAdapter,
      displayMember: "name",
      valueMember: "id",
      disabled: false,
    });
  });
}

function addLabsMaterialsToAutocompleteInput() {
  $("#labs").change(function () {
    var lab = $("#labs").jqxDropDownList("getSelectedItem");
    if (lab.value === undefined) {
      lab.value = 8
    }
    if (lab !== null) {
      jQuery.ajax({
        type: "GET",
        url: "./src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_materials", arguments: [lab.value, ""] },

        success: function (obj, textstatus) {
          let obj_length = Object.entries(obj).length;

          for (i = 0; i < obj_length; i++) {
            obj[i]["id"] = obj[i]["id"] + "|-|" + obj[i]["type"];
          }

          if (!("error" in obj)) {
            var source = {
              localdata: obj,
              datatype: "json",
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#materials").jqxInput({
              source: dataAdapter,
              displayMember: "name",
              valueMember: "id",
              disabled: false,
            });
          } else {
            console.log(obj.error);
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("Status: " + textStatus);
          alert("Error: " + errorThrown);
        },
      });
    }
  });
}

function addSuppliersToDropdown(supplier) {
  jQuery.ajax({
    type: "GET",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: { functionname: "get_suppliers", arguments: [] },

    success: function (obj, textstatus) {
      if (!("error" in obj)) {
        var source = {
          localdata: obj,
          datatype: "json",
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#suppliers").jqxInput({
          source: dataAdapter,
          displayMember: "name",
          valueMember: "id",
          disabled: false,
        });
      } else {
        console.log(obj.error);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function addMaterialTypesToDropdown() {
  var source = ["ΑΝΑΛΩΣΙΜΑ", "ΒΡΑΧΕΙΑΣ", "ΜΑΚΡΑΣ"];
  $("#new_added_material_type").jqxDropDownList({
    source: source,
    placeHolder: "Τύπος Υλικού",
  });
}

function addPaymentMethodsToDropdown() {
  var source = [
    "ΚΑΡΤΑ ONLINE",
    "ΚΑΡΤΑ ΦΥΣΙΚΗ",
    "ΤΡΑΠΕΖΙΚΗ ΚΑΤΑΘΕΣΗ",
    "ΜΕΤΡΗΤΑ",
    "ΔΩΡΕΑ",
    "ΕΥΡΩΠΑΙΚΟ ΠΡΟΓΡΑΜΜΑ",
    "ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ"
  ];
  $("#payment_methods").jqxDropDownList({source: source });
}

function addNewSupplier(supplier_name) {
  jQuery.ajax({
    type: "POST",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: { functionname: "add_new_supplier", arguments: [supplier_name] },

    success: function (obj, textstatus) {
      if (obj === true) {
        $("#notification_success").html(
          "Ο νέος προμηθευτής καταχωρήθηκε με επιτυχία."
        );
        $("#notification_success").jqxNotification("open");
        addSuppliersToDropdown("");
      } else if (obj === "exists") {
        $("#notification_info").html(
          "Ο νέος προμηθευτής υπάρχει."
        );
        $("#notification_info").jqxNotification("open");
      } else {
        $("#notification_warning").html("Σφάλμα κατα της καταχώρηση.");
        $("#notification_warning").jqxNotification("open");
        console.log(obj.error);
      }
      $("#new_supplier_popover").jqxPopover("close");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function addNewMaterial(name, type, amount) {

  var lab_id = $("#labs").jqxDropDownList("getSelectedItem").value;
  var field_id = $("#fields").jqxDropDownList("getSelectedItem").value;

  if(name == "" || type == "" || amount == ""){
    $("#notification_warning").html("Σφάλμα στοιχεία κατά της καταχώρηση.");
    $("#notification_warning").jqxNotification("open");    
    $("#new_material_popover").jqxPopover("close");
    return;
  }

  jQuery.ajax({
    type: "POST",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: { functionname: "add_new_material", arguments: [name, type, lab_id, field_id] },

    success: function (obj, textstatus) {
      let res = obj.split("|-|");
      if (res[0] == 1) {
        $("#notification_success").html("Tο νέο υλικό καταχωρήθηκε με επιτυχία.");
        $("#notification_success").jqxNotification("open");
        addMaterialTypesToDropdown();
        addMaterialToBoughtList(res[1], name, type, amount);
      } else if (res[0] === "exists") {
        $("#notification_info").html("Tο νέο υλικό υπάρχει.");
        $("#notification_info").jqxNotification("open");
      } else {
        $("#notification_warning").html("Σφάλμα κατά της καταχώρηση.");
        $("#notification_warning").jqxNotification("open");
        console.log(obj.error);
      }
      $("#new_added_material_name").val("");
      $("#new_added_material_type").jqxDropDownList({selectedIndex: -1});
      $("#new_added_material_number").val("");
      $("#new_material_popover").jqxPopover("close");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
}

function addMaterialToBoughtList(id, name, type, number) {
  data = [{ id: id, name: name, type: type, amount: number }];
  var commit = $("#materials_added").jqxGrid("addrow", null, data);
  $("#materials").val("");
}

function setupBoughtMaterialsGrid() {
  data = [];
  var source = {
    localdata: data,
    datafields: [
      { name: "id", type: "number" },
      { name: "name", type: "string" },
      { name: "type", type: "string" },
      { name: "amount", type: "number" },
    ],
    datatype: "array",
  };

  var adapter = new $.jqx.dataAdapter(source);
  $("#materials_added").jqxGrid({
    theme: 'energyblue',
    width: "89.3%",
    height: "25%",
    source: adapter,
    sortable: true,
    filterable: true,
    editable: true,
    editmode: "click",
    columns: [
      { text: "", datafield: "id", hidden: true, editable: false },
      { text: "Όνομα", datafield: "name", width: "61%", editable: false },
      { text: "Τύπος", datafield: "type", width: "23%", editable: false },
      { text: "Ποσότητα", datafield: "amount", width: "16%", editable: true },
    ],
  });
}

function clearInvoiceForm() {
  $('#academic_year').jqxDropDownList('clearSelection');
  $("#invoice_select").prop("disabled", true);
  $("#invoice_select").val("");
  $("#invoice_no").jqxInput({ disabled: true });
  $("#invoice_date").jqxDateTimeInput({ disabled: true });
  $("#invoice_date").jqxDateTimeInput("val", 0);
  $("#protocol_date").jqxDateTimeInput({ disabled: true });
  $("#protocol_date").jqxDateTimeInput("val", 0);
  $("#protocol_no").jqxNumberInput("val", 0);
  $("#protocol_no").jqxNumberInput({disabled: true });
  $("#suppliers").jqxInput("clear");
  $("#suppliers").jqxInput({disabled: true });
  $("#new_supplier").hide();
  $("#fields").jqxDropDownList("clear");
  $("#fields").jqxDropDownList({disabled: true });
  $("#labs").jqxDropDownList("clear");
  $("#labs").jqxDropDownList({disabled: true });
  $("#payment_methods").jqxDropDownList("clear");
  $("#payment_methods").jqxDropDownList({disabled: true });
  $("#cost").jqxNumberInput("val", 0);
  $("#cost").jqxNumberInput({ disabled: true });
  $("#field_cost").jqxNumberInput("val", 0);
  $("#field_cost").jqxNumberInput({ disabled: true });
  $("#materials").jqxInput("clear");
  $("#materials").jqxInput({ disabled: true });
  $("#new_material").hide();
  $("#materials_added").jqxGrid("clear");
  $("#save").hide();
}
