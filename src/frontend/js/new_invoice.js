$(document).ready(function() {

    //disable everything until an invoice pdf is selected
    disableElements();

    //academic year
    addAcademicYearsToDropdown()

    //each time a new invoice is selected trigger pdf viewer to preview the file
    invoicePDFSelected();

    //get the payment methods and fill the dropdown
    addPaymentMethodsToDropdown();

    //get the fields from the db and fill the dropdown
    addFieldsToDropdown();

    //each time a new field is selected get the related labs and update the labs dropdown list
    addFieldsLabsToDropdown();

    //each time a new lab is selected get the related materials and update the materials source array
    addLabsMaterialsToAutocompleteInput();  

    //get the material types from the db and fill the dropdown
    addMaterialTypesToDropdown()

    //get the suppliers from the db and fill the dropdown
    addSuppliersToDropdown();


    //notifications
    $("#notification_success").jqxNotification({ width: 350, height: 50, position: "top-right", opacity: 0.9, autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 4000, template: "success"});
    $("#notification_info").jqxNotification({ width: 350, height: 50, position: "top-right", opacity: 0.9, autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 4000, template: "info"});
    $("#notification_warning").jqxNotification({ width: 350, height: 50, position: "top-right", opacity: 0.9, autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 4000, template: "warning"});

    //popovers
    $("#new_material_popover").jqxPopover({offset: {left: -50, top:0}, width: 1200, height: 100, autoClose: false, title: "Καταχώρηση Νέου Υλικού", selector: $("#new_material") });
    $("#new_supplier_popover").jqxPopover({offset: {left: -50, top:0}, width: 680, height: 100, title: "Καταχώρηση Νέου Προμηθευτή", selector: $("#new_supplier") });

    //on actions
    //add material in bought list
    $('#materials').on('select', function () { 
        var material = $('#materials').val();
        var parts = material.value.split("|-|");

        addMaterialToBoughtList(parts[0], material.label, parts[1], 0)
    });

    //add new material in bought list and add it to the dropdown and the database
    $("#add_new_material").on('click', ()=>{
        addNewMaterial($("#new_added_material_name").val(), $("#new_added_material_type").val(), $("#new_added_material_number").val());
    })

    //add new supplier to the dropdown and add it to the dropdown and the database
    $("#add_new_supplier").on('click', ()=>{
        addNewSupplier($("#new_added_supplier_name").val())
    })
});

function disableElements(){
    $("#new_added_material_type").jqxDropDownList({itemHeight: 40, height: 35, width: 200, popupZIndex: 999999, disabled: false});
    $("#invoice_no").prop("disabled",true);
    $("#invoice_date").prop("disabled",true);
    $("#protocol_no").prop("disabled",true);
    $("#protocol_date").prop("disabled",true);
    $("#fields").jqxDropDownList({itemHeight: 40, height: 35, width: 445, disabled: true});
    $("#labs").jqxDropDownList({itemHeight: 40, height: 35, width: 445, disabled: true});
    $("#suppliers").jqxDropDownList({itemHeight: 40, height: 35, width: 445, disabled: true});
    $("#materials").jqxInput({placeHolder: "Επιλογή Υλικών", height: 35, width: 445, minLength: 1, items: 11, disabled: true });
    $("#payment_methods").jqxDropDownList({itemHeight: 40, height: 35, width: 445, disabled: true});
    $("#cost").prop("disabled",true);
    $("#field_cost").prop("disabled",true);
}

function enableElements(){
    $("#invoice_no").prop("disabled",false);
    $("#invoice_date").prop("disabled",false);
    $("#protocol_no").prop("disabled",false);
    $("#protocol_date").prop("disabled",false);
    $("#fields").jqxDropDownList({disabled: false});
    $("#suppliers").jqxDropDownList({disabled: false});
    $("#payment_methods").jqxDropDownList({disabled: false});
    $("#cost").prop("disabled",false);
    $("#field_cost").prop("disabled",false);
}

function addAcademicYearsToDropdown(){
    var source = [ "2023-2024"];
    $('#academic_year').jqxDropDownList({ source: source, selectedIndex: 0});
}

function invoicePDFSelected(){
    $("#invoice_select").change(function() {
        var file = this.files[0];
        var pdf_file = $("#pdf_file");
        if (file) {
            var url = URL.createObjectURL(file);
            console.log("URL: " + url)
            pdf_file.attr("src", url);

            //enable elements once an invoice pdf is selected
            enableElements();

            //get the correct protocol id from database and add it to the form
            getLastInvoiceId();
        }
    });
}

function getLastInvoiceId(){
    jQuery.ajax({
        type: "POST",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'get_last_invoice_id', arguments: []},
    
        success: function (obj, textstatus) {
            let last_invoice_id = 1
            //if the invoice table is empty a null value is returned. In that case the invoice is assigned the number one
            if ( obj[0]["MAX(id)"] !== null ){
                last_invoice_id = obj[0]["MAX(id)"];
            }

            $("#protocol_no").val(last_invoice_id)
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}

function addFieldsToDropdown(){
    jQuery.ajax({
        type: "POST",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'get_fields', arguments: []},
    
        success: function (obj, textstatus) {
            if( !('error' in obj) ) {
                var source = { 
                    localdata: obj,
                    datatype: "json"
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $('#fields').jqxDropDownList({ selectedIndex: -1,  source: dataAdapter, displayMember: "name", valueMember: "id"});
            }
            else {
                console.log(obj.error);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}

function addFieldsLabsToDropdown(){
    $("#fields").change(function() {
        var field = $("#fields").jqxDropDownList('getSelectedItem'); 

        jQuery.ajax({
            type: "POST",
            url: '/src/backend/rest_api.php',
            dataType: 'json',
            data: {functionname: 'get_labs', arguments: [field.value]},
        
            success: function (obj, textstatus) {
                if( !('error' in obj) ) {
                    var source = { 
                        localdata: obj,
                        datatype: "json"
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $('#labs').jqxDropDownList({ selectedIndex: -1,  source: dataAdapter, displayMember: "name", valueMember: "id", disabled: false});
                } else {
                    console.log(obj.error);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        });
    });
}

function addLabsMaterialsToAutocompleteInput(){
    $("#labs").change(function() {
        var lab = $("#labs").jqxDropDownList('getSelectedItem'); 
        if(lab !== null){
            jQuery.ajax({
                type: "POST",
                url: '/src/backend/rest_api.php',
                dataType: 'json',
                data: {functionname: 'get_materials', arguments: [lab.value]},
            
                success: function (obj, textstatus) {
                    // console.log(obj)

                    let obj_length = Object.entries(obj).length;

                    for (i=0; i<obj_length; i++){
                        obj[i]["id"] = obj[i]["id"] + "|-|" + obj[i]["type"]
                    }

                    if( !('error' in obj) ) {
                        var source = { 
                            localdata: obj,
                            datatype: "json"
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        $('#materials').jqxInput({ source: dataAdapter, displayMember: "name", valueMember: "id", disabled: false});
                    }
                    else {
                        console.log(obj.error);
                    }
                },
                 error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
            });
        }
    })
}

function addSuppliersToDropdown(){
    jQuery.ajax({
        type: "POST",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'get_suppliers', arguments: []},
        
         success: function (obj, textstatus) {
            if( !('error' in obj) ) {
                var source = { 
                    localdata: obj,
                    datatype: "json"
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $('#suppliers').jqxDropDownList({ selectedIndex: -1,  source: dataAdapter, displayMember: "name", valueMember: "id"});
            }
            else {
                console.log(obj.error);
            }
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}

function addMaterialTypesToDropdown(){
    var source = [ "ΑΝΑΛΩΣΗΜΑ", "ΒΡΑΧΕΙΑΣ", "ΜΑΚΡΑΣ"];
    $('#new_added_material_type').jqxDropDownList({ source: source, placeHolder: "Τύπος Υλικού"});
}

function addPaymentMethodsToDropdown(){
    var source = [ "ΚΑΡΤΑ ONLINE", "ΚΑΡΤΑ ΦΥΣΙΚΗ", "ΤΡΑΠΕΖΙΚΗ ΚΑΤΑΘΕΣΗ", "ΜΕΤΡΗΤΑ"];
    $('#payment_methods').jqxDropDownList({ source: source, placeHolder: "Τρόπος Πληρωμής"});
}

function addNewSupplier(supplier_name){
    jQuery.ajax({
        type: "POST",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'add_new_supplier', arguments: [supplier_name]},
        
         success: function (obj, textstatus) {
            console.log(obj)
            if( obj === true ) {
                $("#notification_success").html("Ο νέος προμηθευτής καταχωρήθηκε με επιτυχία. Επιλέξτε από την λίστα.")
                $("#notification_success").jqxNotification("open");
                addSuppliersToDropdown();
            } else if (obj === "exists"){
                $("#notification_info").html("Ο νέος προμηθευτής υπάρχει. Επιλέξτε από την λίστα.")
                $("#notification_info").jqxNotification("open");
            } else {
                $("#notification_warning").html("Σφάλμα κατα της καταχώρηση.")
                $("#notification_warning").jqxNotification("open");
                console.log(obj.error);
            }
            $("#new_supplier_popover").jqxPopover('close'); 
            
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}

function addNewMaterial(name, type, amount){
    jQuery.ajax({
        type: "POST",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'add_new_material', arguments: [name, type]},
        
         success: function (obj, textstatus) {
            console.log(obj)
            let res = obj.split("|-|");
            console.log(res[0])
            console.log(res[1])
            if( res[0] == 1 ) {
                $("#notification_success").html("Tο νέο υλικό καταχωρήθηκε με επιτυχία.")
                $("#notification_success").jqxNotification("open");
                addMaterialTypesToDropdown();
                addMaterialToBoughtList(res[1], name, type, amount)
            } else if (res[0] === "exists"){
                $("#notification_info").html("Tο νέο υλικό υπάρχει.")
                $("#notification_info").jqxNotification("open");
            } else {
                $("#notification_warning").html("Σφάλμα κατα της καταχώρηση.")
                $("#notification_warning").jqxNotification("open");
                console.log(obj.error);
            }
            $("#new_material_popover").jqxPopover('close'); 
            
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });

}

function addMaterialToBoughtList(id, name, type, number){
    var val = ` <div class=material_added>
                    <div class="material_name" id=${id}> ${name}</div>
                    <div class="material_type" id=${id}_type> ${type}</div>
                    <input class="material_amount" type=number id=${id}_number value=${number} required>
                </div>`
    $('#materials_added').append(val)
    $("#materials").jqxInput("val", "");
}