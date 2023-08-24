$(document).ready(function () {
    $("#invoices_table").on('rowselect', function (event) {
        var invoice_no = event.args.row.invoice_number;
        var academic_year = event.args.row.academic_year;

        jQuery.ajax({
            type: "GET",
            url: "/src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_purchace", arguments: [invoice_no, academic_year] },

            success: function (obj, textstatus) {
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

    $('#invoices_table').on('rowselect', function (event) {
        var rowindex = $('#invoices_table').jqxGrid('getselectedrowindex');
        var rowid = $('#invoices_table').jqxGrid('getrowid', rowindex);
        var data = $('#invoices_table').jqxGrid('getrowdatabyid', rowid);
        var url = "/src/backend/pdf_protocols/"+data.protocol_pdf;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            if (this.status === 200) {
                var blob = new Blob([this.response], { type: 'application/octet-stream' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = url.split('/').pop();
                link.click();
            }
        };
        xhr.send();
    });
})

function buildInvoiceTable() {
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
                        { name: 'payment_method', type: 'string' },
                        { name: 'protocol_pdf', type: 'string' },
                        { name: 'academic_year', type: 'string' },
                        { name: 'supplier', type: 'string' },
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
                        selectionmode: 'singlerow',
                        showfilterrow: true,
                        columns: [
                            { text: 'Α/Α', datafield: 'count', width: "3%", cellsalign: 'center' },
                            { text: 'ΑΡ. ΤΙΜ.', datafield: 'invoice_number', width: "5%", cellsalign: 'center' },
                            { text: 'ΗΜ. ΤΙΜ.', datafield: 'invoice_date', width: "6%", cellsalign: 'center' },
                            { text: 'ΠΟΣΟ', datafield: 'cost', width: "4%", cellsalign: 'center' },
                            { text: 'ΠΡΟΜΗΘΕΥΤΗΣ', datafield: 'supplier', width: "14%" },
                            { text: 'ΑΡ. ΠΡΩΤ.', datafield: 'protocol_id', width: "6%", cellsalign: 'center' },
                            { text: 'ΗΜ. ΠΡΩΤ.', datafield: 'protocol_date', width: "6%", cellsalign: 'center' },
                            {
                                text: 'ΠΡΩΤΟΚΟΛΛΟ', datafield: 'protocol_pdf', width: "6%", cellsrenderer: function (row, columnfield, value, defaulthtml) {
                                    return '<div id="pdf_' + row + '" style = "text-align:center" > <img src="http://localhost/src/images/acrobat.png" style="padding-top:15px;width:23px;height:23px;"></div>';
                                }
                            },
                            { text: 'ΤΟΜΕΑΣ', datafield: 'field', width: "16%" },
                            { text: 'ΕΡΓΑΣΤΗΡΙΟ', datafield: 'lab', width: "12%" },
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