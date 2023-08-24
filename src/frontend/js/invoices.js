$(document).ready(function () {
    $("#invoices_table").on('rowselect', function (event) {
    console.log("test")
    var invoice_no = event.args.row.invoice_number;
    var academic_year = event.args.row.academic_year;

    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_purchace", arguments: [invoice_no, academic_year] },
    
        success: function (obj, textstatus) {
            console.log(obj)
            if (!("error" in obj)) {
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'count', type: 'int' },
                        { name: 'supply', type: 'string' },
                        { name: 'amount', type: 'int' }
                    ],
                    localdata: obj
                };

                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#invoices_supplies_table").jqxGrid(
                    {
                        width: "40%",
                        height: "30%",
                        source: dataAdapter,    
                        theme: 'energyblue',            
                        sortable: true,
                        altrows: false,
                        enabletooltips: true,
                        editable: false,
                        filterable: true,
                        columnsheight: 45,
                        rowsheight: 50,
                        selectionmode: 'singlerow',
                        showfilterrow: true,
                        columns: [
                            { text: 'Α/Α', datafield: 'count', width: "7%", cellsalign: 'center' },
                            { text: 'ΠΡΟΪΟΝ', datafield: 'supply', width: "78%", cellsalign: 'left' },
                            { text: 'ΠΟΣΟΤΗΤΑ', datafield: 'amount', width: "15%", cellsalign: 'center' },
                        ]
                    });
            } else {
                console.log(obj.error);
            }
        }
    })
    })
})

function buildInvoiceTable(){
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_invoices", arguments: [] },
    
        success: function (obj, textstatus) {
          if (!("error" in obj)) {
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'count', type: 'int' },
                    { name: 'protocol_id', type: 'int' },
                    { name: 'invoice_number', type: 'int' },
                    { name: 'invoice_date', type: 'string' },
                    { name: 'protocol_date', type: 'string' },
                    { name: 'supplier_id', type: 'int' },
                    { name: 'field_id', type: 'int' },
                    { name: 'lab_id', type: 'int' },
                    { name: 'cost', type: 'float' },
                    { name: 'field_cost', type: 'float' },
                    { name: 'payment_method', type: 'string'},
                    { name: 'protocol_pdf', type: 'string' },
                    { name: 'academic_year', type: 'string' },
                    { name: 'supplier', type: 'string'},
                    { name: 'field', type: 'string' },
                    { name: 'lab', type: 'string' }
                ],
                localdata: obj
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $("#invoices_table").jqxGrid(
            {
                width: "99.9%",
                height: "50%",
                source: dataAdapter,    
                theme: 'energyblue',            
                sortable: true,
                altrows: false,
                enabletooltips: true,
                editable: false,
                filterable: true,
                columnsheight: 45,
                rowsheight: 50,
                // pageable: true,
                // pagerheight: 60,
                // pagesize: 20,
                selectionmode: 'singlerow',
                showfilterrow: true,
                columns: [
                    { text: 'Α/Α', datafield: 'count', width: "3%", cellsalign: 'center' },
                    { text: 'ΑΡ. ΤΙΜ.', datafield: 'invoice_number', width: "5%", cellsalign: 'center' },
                    { text: 'ΗΜΕΡ. ΤΙΜ.', datafield: 'invoice_date', width: "7%", cellsalign: 'center' },
                    { text: 'ΠΟΣΟ', datafield: 'cost', width: "4%", cellsalign: 'center' },
                    { text: 'ΠΡΟΜΗΘΕΥΤΗΣ', datafield: 'supplier', width: "16%" },
                    { text: 'ΑΡ. ΠΡΩΤ.', datafield: 'protocol_id', width: "6%", cellsalign: 'center' },
                    { text: 'ΗΜΕΡ. ΠΡΩΤ.', datafield: 'protocol_date', width: "7%", cellsalign: 'center' },
                    { text: 'ΤΟΜΕΑΣ', datafield: 'field', width: "15%" },
                    { text: 'ΕΡΓΑΣΤΗΡΙΟ', datafield: 'lab', width: "15%" },
                    { text: 'ΠΟΣΟ ΤΟΜΕΑ', datafield: 'field_cost', width: "7%", cellsalign: 'center' },
                    { text: 'ΤΡΟΠΟΣ ΠΛΗΡ.', datafield: 'payment_method', width: "8%", cellsalign: 'center' },
                    { text: 'ΑΚΑΔ. ΕΤΟΣ', datafield: 'academic_year', width: "7%", cellsalign: 'center' }
                ]
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
function buildUsersTable(){}
function buildFieldsLabsMaterialTable(){}
function buildSupplierTable(){
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_suppliers", arguments: [] },
    
        success: function (obj, textstatus) {
            console.log(obj)
          if (!("error" in obj)) {
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id', type: 'int' },
                    { name: 'name', type: 'string' },
                ],
                localdata: obj
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $("#suppliers_table").jqxGrid(
            {
                width: "99.9%",
                height: "90.8%",
                source: dataAdapter,    
                theme: 'energyblue',            
                sortable: true,
                altrows: false,
                enabletooltips: true,
                editable: false,
                filterable: true,
                columnsheight: 45,
                rowsheight: 45,
                selectionmode: 'singlerow',
                showfilterrow: true,
                columns: [
                    { text: 'Όνομα', datafield: 'name', width: "100%", cellsalign: 'left' },
                ]
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
function buildProposalTable(){}