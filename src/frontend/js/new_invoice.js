$(document).ready(function() {

    //disable everything until an invoice pdf is selected
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

    $('#materials').on('select', function () { 
        var material = $('#materials').val();
        console.log(material.value);
        var val = ` <div class=material_added>
                        <div class="material_name" id=${material.value}> ${material.label}</div>
                        <div class="material_type" id=${material.value}_type> ${material.value}</div>
                        <input class="material_amount" type=number id=${material.value}_number required>
                    </div>`
        $('#materials_added').append(val)
        $("#materials").jqxInput("val", "");
    });

    //each time a new invoice is selected trigger pdf viewer to preview the file
    $("#invoice_select").change(function() {
        var file = this.files[0];
        var pdf_file = $("#pdf_file");
        if (file) {
            var url = URL.createObjectURL(file);
            console.log("URL: " + url)
            pdf_file.attr("src", url);

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
    });

    //get the fields from the db and fill the dropdown
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

    //each time a new field is selected get the related labs and update the labs dropdown list
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

    //each time a new lab is selected get the related materials and update the materials source array
    $("#labs").change(function() {
        var lab = $("#labs").jqxDropDownList('getSelectedItem'); 
        if(lab !== null){
            jQuery.ajax({
                type: "POST",
                url: '/src/backend/rest_api.php',
                dataType: 'json',
                data: {functionname: 'get_materials', arguments: [lab.value]},
            
                success: function (obj, textstatus) {
                    console.log(obj)
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

    //get the suppliers from the db and fill the dropdown
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

    //payment methods dropdown
    var source = [ "ΚΑΡΤΑ ONLINE ", "ΚΑΡΤΑ ΦΥΣΙΚΗ", "ΤΡΑΠΕΖΙΚΗ ΚΑΤΑΘΕΣΗ", "ΜΕΤΡΗΤΑ"];
    $('#payment_methods').jqxDropDownList({ source: source, placeHolder: "Τρόπος Πληρωμής"});
});