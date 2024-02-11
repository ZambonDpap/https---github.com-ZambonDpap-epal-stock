$(document).ready(function () {

    $("#field").change(function (e) {
        console.log(e)
    });

    $("#invoices_table").on('rowselect', function (event) {
        var invoice_number = event.args.row.invoice_number;
        var academic_year = event.args.row.academic_year;

        jQuery.ajax({
            type: "GET",
            url: "./src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_purchace", arguments: [invoice_number, academic_year] },

            success: function (obj, textstatus) {
                if (!("error" in obj)) {
                    $("#invoices_supplies_table").show();
                    var source =
                    {
                        editcell: function (rowid, rowdata, commit) {},
                        updaterow: function (rowid, rowdata, commit) {
                            // synchronize with the server - send update command
                            // call commit with parameter true if the synchronization with the server is successful 
                            // and with parameter false if the synchronization failder.
                            commit(true);
                        },
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
    $("#invoices_table").on('click', 'div[id^="pdf_protocol_"]', function() {
        var rowindex = $('#invoices_table').jqxGrid('getselectedrowindex');
        var rowid = $('#invoices_table').jqxGrid('getrowid', rowindex);
        var data = $('#invoices_table').jqxGrid('getrowdatabyid', rowid);
        downloadPDF("protocols", data.protocol_pdf, data.folder)
    });
    $("#invoices_table").on('click', 'div[id^="pdf_invoice_"]', function() {
        var rowindex = $('#invoices_table').jqxGrid('getselectedrowindex');
        var rowid = $('#invoices_table').jqxGrid('getrowid', rowindex);
        var data = $('#invoices_table').jqxGrid('getrowdatabyid', rowid);
        downloadPDF("invoices", data.invoice_pdf, data.folder)
    });

    // $("#invoices_table").on('cellbeginedit', function (event) {
    //     var args = event.args;
    //     $("#cellbegineditevent").text("Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
    // });
    // $("#invoices_table").on('cellendedit', function (event) {
    //     var args = event.args;
    //     $("#cellendeditevent").text("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
    // });

    // $("#invoices_table").on('cellbeginedit', function (event) {
    //     console.log(event)
    // })
    // $("#invoices_table").on('cellclick', function (event) {
    //     var args = event.args;
    //     var column = args.column;
    //     // check if the clicked column is the one with the dropdownlist
    //     if (column.datafield == 'lab') {
    //         var rowData = $("#invoices_table").jqxGrid("getrowdata", event.args.rowindex);
    //         var field = rowData["field"];
    //         var source = {localdata: g_field_labs[field], datatype: "json", };
    //         var dataAdapter = new $.jqx.dataAdapter(source);

    //         console.log("cell")
    //         var cell = $('#invoices_table').jqxGrid('getcell', event.args.rowindex, 'lab');
    //         console.log(cell.element)

    //         // var editor = $('#invoices_table').jqxGrid('geteditor', event.args.rowindex, 'ΕΡΓΑΣΤΗΡΙΟ');
    //         // console.log(edito)
    //         // var dropdownlist = $('#invoices_table').jqxGrid('getcellvalue', event.args.rowindex, 'lab');
    //         // console.log(dropdownlist)
    //         }
    // });
})

function downloadPDF(mode, pdf, folder){
    let url = ""
    if(mode === "protocols") {
        url = "./src/backend/Πρωτόκολλα/" + folder + pdf;
    } else if (mode === "invoices") {
        url = "./src/backend/Τιμολόγια/" + folder + pdf;
    }

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
}

function buildInvoiceTable() {
    const user_id = $("#user_id").html();

    jQuery.ajax({
        type: "GET",
        url: "./src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_invoices", arguments: [user_id] },

        success: function (obj, textstatus) {
            if (!("error" in obj)) {
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'count', type: 'int' },
                        { name: 'protocol_id', type: 'int' },
                        { name: 'invoice_number', type: 'string' },
                        { name: 'invoice_date', type: 'string' },
                        { name: 'protocol_date', type: 'string' },
                        { name: 'supplier_id', type: 'int' },
                        { name: 'field_id', type: 'int' },
                        { name: 'lab_id', type: 'int' },
                        { name: 'cost', type: 'float' },
                        { name: 'field_cost', type: 'float' },
                        { name: 'payment_method', type: 'string' },
                        { name: 'protocol_pdf', type: 'string' },
                        { name: 'invoice_pdf', type: 'string' },
                        { name: 'academic_year', type: 'string' },
                        { name: 'supplier', type: 'string' },
                        { name: 'field', type: 'string' },
                        { name: 'lab', type: 'string' },
                        { name: 'folder', type: 'string' }
                    ],
                    deleterow: function (rowid, commit) {
                        var data = $('#invoices_table').jqxGrid('getrowdatabyid', rowid);
                        jQuery.ajax({
                            type: "POST",
                            url: "./src/backend/rest_api.php",
                            dataType: "json",
                            data: { functionname: "delete_invoice", arguments: [data["protocol_id"], data["invoice_number"], data["protocol_pdf"], data["invoice_pdf"], data["folder"] ] },
                
                            success: function (obj, textstatus) {
                                commit(true);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                commit(false);
                            },
                        })
                    },
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
                        editable: true,
                        editmode: 'click',
                        filterable: true,
                        columnsheight: 45,
                        rowsheight: 50,
                        selectionmode: 'singlerow',
                        showfilterrow: true,
                        showtoolbar: true,
                        toolbarheight: 60, 
                        rendertoolbar: function (toolbar) {
                            var me = this;
                            var container = $("<div style='margin: 5px;'></div>");
                            toolbar.append(container);
                            container.append('<input style="margin-left: 5px;" id="delete_invoice_row_button" type="button" value="Διαγραφή τιμολογίου" />');
                            $("#delete_invoice_row_button").jqxButton();
                            $("#delete_invoice_row_button").on('click', function () {

                                $('#eventWindow').jqxWindow('setTitle',"Διαγραφή Τιμολογίου")
                                $('#eventWindow').jqxWindow('open');
                            });
                        },
                        columns: [
                            { text: 'Α/Α',                                      datafield: 'count',          width: "2%", cellsalign: 'center', editable: true },
                            { text: 'ΑΡ. ΤΙΜ.',    columntype: 'textbox',       datafield: 'invoice_number', width: "5%", cellsalign: 'center', editable: true,
                                validation: function (cell, value) {
                                    if (value == "" ) {
                                        return { result: false, message: "Το αριθμός τιμολογίου πρέπει να έχει τιμή" };
                                    }
                                    return true;
                                },
                            },
                            { text: 'ΗΜ. ΤΙΜ.',    columntype: 'datetimeinput', datafield: 'invoice_date',   width: "7%", cellsalign: 'center', editable: true, cellsformat: 'd',
                                validation: function (cell, value) {
                                    if (value == "")
                                       return true;
                                    var year = value.getFullYear();
                                    return true;
                                }
                            },
                            { text: 'ΠΟΣΟ',        columntype: 'numberinput',   datafield: 'cost',           width: "5%", cellsalign: 'center', editable: true, cellsformat: 'c2', symbol: '€',
                                validation: function (cell, value) {
                                    if (value < 0 ) {
                                        return { result: false, message: "Το ποσό πρέπει να είναι μεγαλύτερο ή ισο με το 0" };
                                    }
                                    return true;
                                },
                                createeditor: function (row, cellvalue, editor) {
                                    editor.jqxNumberInput({ digits: 3 });
                                }
                            },
                            { text: 'ΠΡΟΜΗΘΕΥΤΗΣ', columntype: 'combobox',      datafield: 'supplier',       width: "13%"                     , editable: true,
                                createeditor: function (row, column, editor) {
                                    // assign a new data source to the combobox.
                                    jQuery.ajax({
                                        type: "GET",
                                        url: "./src/backend/rest_api.php",
                                        dataType: "json",
                                        data: { functionname: "get_suppliers", arguments: [] },
                                        
                                        success: function (obj, textstatus) {
                                          if (!("error" in obj)) {
                                            var source = { localdata: obj, datatype: "json" };
                                            var dataAdapter = new $.jqx.dataAdapter(source);
                                            editor.jqxComboBox({
                                                source: dataAdapter,
                                                displayMember: "name",
                                                valueMember: "name",
                                                disabled: false,
                                                promptText: "Please Choose:"
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
                                },
                                // update the editor's value before saving it.
                                cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                                    // return the old value, if the new value is empty.
                                    if (newvalue == "") return oldvalue;
                                }
                            },
                            { text: 'ΑΡ. ΠΡΩΤ.',                                datafield: 'protocol_id',    width: "6%", cellsalign: 'center', editable: false},
                            { text: 'ΗΜ. ΠΡΩΤ.',   columntype: 'datetimeinput', datafield: 'protocol_date',  width: "7%", cellsalign: 'center', editable: true, cellsformat: 'd',
                                validation: function (cell, value) {
                                    if (value == "")
                                       return true;
                                    var year = value.getFullYear();
                                    return true;
                                }
                            },
                            { text: 'ΠΡΩΤΟΚ',                                   datafield: 'protocol_pdf',   width: "3%"                      , editable: false,
                                cellsrenderer: function (row, columnfield, value, defaulthtml) { 
                                    return '<div id="pdf_protocol_' + row + '" style = "text-align:center" > <img src="https://stefanos.work/ektimologia/src/images/acrobat.png" style="padding-top:15px;width:23px;height:23px;"></div>'; 
                                }
                            },
                            { text: 'ΤΙΜΟΛO',                                   datafield: 'invoice_pdf',    width: "3%"                      , editable: false, 
                                cellsrenderer: function (row, columnfield, value, defaulthtml) { 
                                    return '<div id="pdf_invoice_' + row + '" style = "text-align:center" > <img src="https://stefanos.work/ektimologia/src/images/acrobat.png" style="padding-top:15px;width:23px;height:23px;"></div>';
                                }
                            },
                            { text: 'ΤΟΜΕΑΣ',      columntype: 'dropdownlist',  datafield: 'field',          width: "13%"                      , editable: true,
                                createeditor: function(row, column, editor) {
                                    var source = { localdata: g_fields, datatype: "json" };
                                    var dataAdapter = new $.jqx.dataAdapter(source);
                                    editor.jqxDropDownList({ selectedIndex: -1, source: dataAdapter, displayMember: "name", valueMember: "id"});

                                    var rowData = $("#invoices_table").jqxGrid("getrowdata", row);
                                    // console.log(rowData)
                                    // $("#lab").jqxDropDownList("clear");
                                }
                            },
                            { text: 'ΕΡΓΑΣΤΗΡΙΟ',  columntype: 'dropdownlist',  datafield: 'lab',            width: "13%"                      , editable: true,
                                createeditor: function(row, column, editor) {
                                    var rowData = $("#invoices_table").jqxGrid("getrowdata", row);
                                    var field = rowData["field"];
                            
                                    // console.log(field)
                                    // console.log(g_field_labs)
                                    // console.log(g_field_labs[field])

                                    var source = {localdata: g_field_labs[field], datatype: "json", };
                                    var dataAdapter = new $.jqx.dataAdapter(source);
                                    editor.jqxDropDownList({ selectedIndex: -1, source: dataAdapter, displayMember: "name", valueMember: "id" });
                                }
                            },
                            { text: 'ΠΟΣΟ ΤΟΜΕΑ',  columntype: 'numberinput',   datafield: 'field_cost',     width: "7%", cellsalign: 'center' , editable: true, cellsformat: 'c2', symbol: '€',
                                validation: function (cell, value) {
                                    if (value < 0 ) {
                                        return { result: false, message: "Το ποσό πρέπει να είναι μεγαλύτερο ή ισο με το 0" };
                                    }
                                    return true;
                                },
                                createeditor: function (row, cellvalue, editor) {
                                    editor.jqxNumberInput({ digits: 3, spinButtons: false, symbol: "€" });
                                }
                            },
                            { text: 'ΤΡΟΠΟΣ ΠΛΗΡ.',columntype: 'dropdownlist',  datafield: 'payment_method', width: "8%", cellsalign: 'center' , editable: true, 
                                createeditor: function (row, column, editor) {    
                                    var source = [ "ΚΑΡΤΑ ONLINE", "ΚΑΡΤΑ ΦΥΣΙΚΗ", "ΤΡΑΠΕΖΙΚΗ ΚΑΤΑΘΕΣΗ", "ΜΕΤΡΗΤΑ", "ΔΩΡΕΑ", "ΕΥΡΩΠΑΙΚΟ ΠΡΟΓΡΑΜΜΑ", "ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ" ];
                                    editor.jqxDropDownList({
                                        source: source,
                                        disabled: false,
                                        promptText: "Please Choose:"
                                    });
                                }
                            },
                            { text: 'ΑΚΑΔ. ΕΤΟΣ',  columntype: 'dropdownlist',  datafield: 'academic_year',  width: "8%", cellsalign: 'center' , editable: true, 
                                createeditor: function (row, column, editor) {    
                                    jQuery.ajax({ type: "GET", url: "./src/backend/rest_api.php", dataType: "json", 
                                        data: { functionname: "get_academic_years", arguments: [] },
                                    
                                        success: function (obj, textstatus) { 
                                            if (!("error" in obj)) {
                                            var source = { localdata: obj, datatype: "json"};
                                            var dataAdapter = new $.jqx.dataAdapter(source);
                                            editor.jqxDropDownList({ source: dataAdapter, displayMember: "academic_year", valueMember: "academic_year" });
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
                            }
                        ],
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

function delete_invoice() {
    var selectedrowindex = $("#invoices_table").jqxGrid('getselectedrowindex');
    var rowscount = $("#invoices_table").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var id = $("#invoices_table").jqxGrid('getrowid', selectedrowindex);
        var commit = $("#invoices_table").jqxGrid('deleterow', id);
        $("#invoices_supplies_table").jqxGrid("clear")
        $("#invoices_supplies_table").hide();
    }
}