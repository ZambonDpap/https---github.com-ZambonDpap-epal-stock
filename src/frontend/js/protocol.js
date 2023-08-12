$(document).ready(function() {

    //when the button "συνεχεια" ia pressed. set pdf viewer to inactive and activate the protocol viewer
    $("#continue").on('click', ()=>{

        if (validateInput()){
            $("#pdf_viewer").hide();
            $("#protocol_viewer").show();
        
            const protocol_no = $("#protocol_no").val();
            $("#pv_protocol_id").text(protocol_no);

            const protocol_date = $("#protocol_date").val();
            $('#pv_protocol_date_1').text(protocol_date);
            $('#pv_protocol_date_2').text(protocol_date);

            var field_item = $("#fields").jqxDropDownList('getSelectedItem');
            $('#pv_field_name').text(field_item.label);

            var lab_item = $("#labs").jqxDropDownList('getSelectedItem');
            $('#pv_lab').val(lab_item.label);

            var academic_year = $("#academic_year").jqxDropDownList('getSelectedItem');
            getLabBuyers(lab_item.value,academic_year.label)

            getLabReceivers(lab_item.value,academic_year.label)

            getLabManager(lab_item.value,academic_year.label)

            const invoice_no = $("#invoice_no").val();
            $('#pv_invoice_id').text(invoice_no);

            const invoice_date = $("#invoice_date").val();
            $('#pv_invoice_date').text(invoice_date);

            const field_cost = $("#field_cost").val();
            $('#pv_invoice_amount').text(field_cost);

            var supplier_item = $("#suppliers").jqxDropDownList('getSelectedItem');
            $('#pv_supplier').text(supplier_item.label);

            $('#save').show()
        }
    })

    $("#save").on('click', ()=>{
        savePDF()
    })

});

function savePDF(){
    jQuery.ajax({
        type: "POST",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'save_pdf', arguments: [$("#protocol_viewer").html()]},
        
         success: function (obj, textstatus) {
            console.log(obj)
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}
function validateInput(){
    return true
}

function getLabBuyers(lab_id,academic_year){
    jQuery.ajax({
        type: "GET",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'get_lab_buyers', arguments: [lab_id,academic_year]},
        
         success: function (obj, textstatus) {
            $('#pv_buyer_1').text(obj[0].lastname + " " + obj[0].firstname);
            $('#pv_buyer_2').text(obj[1].lastname + " " + obj[1].firstname);
            $('#pv_buyer_3').text(obj[2].lastname + " " + obj[2].firstname);      
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}

function getLabManager(lab_id,academic_year){
    jQuery.ajax({
        type: "GET",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'get_lab_manager', arguments: [lab_id,academic_year]},
        
         success: function (obj, textstatus) {
            $('#pv_lab_manager').text(obj[0].lastname + " " + obj[0].firstname);
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}

function getLabReceivers(lab_id,academic_year){
    jQuery.ajax({
        type: "GET",
        url: '/src/backend/rest_api.php',
        dataType: 'json',
        data: {functionname: 'get_lab_receivers', arguments: [lab_id,academic_year]},
        
         success: function (obj, textstatus) {
            $('#pv_receiver_1').text(obj[0].lastname + " " + obj[0].firstname);
            $('#pv_receiver_2').text(obj[1].lastname + " " + obj[1].firstname);       
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    });
}