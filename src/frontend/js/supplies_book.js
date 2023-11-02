let g_last_year
let g_current_year
$(document).ready(async function () {
    const academic_years = await getAcademicYears();
    g_current_year = academic_years[academic_years.length-1]["academic_year"];
    g_last_year = academic_years[academic_years.length-2]["academic_year"];


    $("#supplies_book_fields_dropdown").change(function () {
        var field = $("#supplies_book_fields_dropdown").jqxDropDownList("getSelectedItem");

        if (field !== null){
            var source = {
                localdata: g_field_labs[field.label],
                datatype: "json",
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#supplies_book_labs_dropdown").jqxDropDownList({
                selectedIndex: -1,
                source: dataAdapter,
                displayMember: "name",
                valueMember: "id",
                disabled: false,
            });
        } else {
            $("#supplies_book_labs_dropdown").jqxDropDownList("clear")
        }
    });

    $("#supplies_book_labs_dropdown").change(function () {
        var lab = $("#supplies_book_labs_dropdown").jqxDropDownList("getSelectedItem");
        if (lab !== null){
            prepareSuppliesBookTables(lab.value, "supplies_book")
        }
    })

    $('#grid_cons').on('rowselect', function (event) {
        get_material_destroys(event)
    })
    $('#grid_sort').on('rowselect', function (event) {
        get_material_destroys(event)
    })
    $('#grid_long').on('rowselect', function (event) {
        get_material_destroys(event)
    })
})
async function getAcademicYears(){
    let response = await fetch('./src/backend/rest_api.php?functionname=get_academic_years', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
}
function buildSuppliesBookDropdowns() {
    var source = {
        localdata: g_fields,
        datatype: "json",
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#supplies_book_fields_dropdown").jqxDropDownList({
        selectedIndex: -1,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: "30%"
    });
    $("#supplies_book_labs_dropdown").jqxDropDownList({width: "30%"})
}
function prepareSuppliesBookTables(lab_id, page) {
    jQuery.ajax({
        type: "GET",
        url: "./src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_materials", arguments: [lab_id, "SPLIT"] },

        success: function (obj, textstatus) {
            initGrid("Αναλώσιμα", obj["ΑΝΑΛΩΣΙΜΑ"], page);
            initGrid("Βραχείας", obj["ΒΡΑΧΕΙΑΣ"], page);
            initGrid("Μακράς", obj["ΜΑΚΡΑΣ"], page);
            $("#supplies_book_table").show()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        },

    })
}

function initGrid(name, data, page) {
    grid_name = "";
    column_name = "";

    if (name === "Αναλώσιμα") {
        grid_name = "#grid_cons"
        column_name = "Υλικά " + name
    } else if (name === "Βραχείας") {
        grid_name = "#grid_sort"
        column_name = "Υλικά " + name
    } else if (name === "Μακράς") {
        grid_name = "#grid_long"
        column_name = "Υλικά " + name
    }

    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'id'           , type: 'number' },
            { name: 'name'         , type: 'string' },
            { name: g_last_year    , type: 'string' },
            { name: g_current_year , type: 'string' },
            { name: 'destroy'      , type: 'number' },
        ],
        localdata: data
    };
    var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });

    let text1 = 'Απόθεμα ' + g_last_year
    let text2 = 'Απόθεμα ' + g_current_year

    height = "100%"
    width  = "100%"
    if(page === "fields_labs_supplies"){
        $("#supplies_book_table").jqxTabs({width: "43%", height: "42.8%"})
        $("#supplies_book_table").css("top", "53%")
        $("#supplies_book_table").css("left", "0%")
        height = "100%"
        width  = "100%"
    } else {
        $("#supplies_book_table").jqxTabs({width: "98.8%", height: "50%"})
        $("#supplies_book_table").css("top", "12%")
        $("#supplies_book_table").css("left", "1%")
    }

    $(grid_name).jqxGrid(
        {
            source: dataAdapter,
            theme: 'energyblue',
            height: height,
            width: width,
            filterable: true,
            showfilterrow: true,
            editable: true,
            ready: function()
            {
                $(grid_name).show()
            },
            columns: [
                { text: column_name, datafield: 'name', width: "52%", editable: false },
                { text: text1, datafield: g_last_year   , width: "20%", cellsalign: 'center', editable: false },
                { text: text2, datafield: g_current_year, width: "20%", cellsalign: 'center', editable: false },
                { text: 'Καταστροφή',        datafield: 'destroy'   ,   width: "5%" , cellsalign: 'center', editable: true,
                    cellclassname: function(row, column, value, data) {
                        return "cellcolor";
                    }
                },
                { text: '',        datafield: '',width: "2%",  columntype: 'button', editable: false,
                    cellsrenderer: function () { return "OK"; }, 
                    buttonclick: function (row) {
                        var selectedItem = $('#supplies_book_table').jqxTabs('selectedItem'); 
                        var tabContent = $("#supplies_book_table").jqxTabs("getContentAt", selectedItem);
                        var grid = $(tabContent).find(".jqx-grid");
                        var rowData = grid.jqxGrid("getrowdata", row);
                        const material_id = rowData["id"];
                        const amount = rowData["destroy"];
                        const user_id = $("#user_id").html();

                        const date = new Date (); // get current date
                        const offset = date.getTimezoneOffset () * 60 * 1000; // get timezone offset in milliseconds
                        const localDate = new Date (date - offset); // subtract offset from date
                        const sqlDate = localDate.toISOString ().slice (0, 19).replace ('T', ' '); // format date as YYYY-MM-DD HH:mm:ss

                        if( Number(amount) > 0) {
                            jQuery.ajax({
                                type: "POST",
                                url: "./src/backend/rest_api.php",
                                dataType: "json",
                                data: { functionname: "destroy_material", arguments: [material_id, amount, user_id, sqlDate] },

                                success: async function (obj, textstatus) {
                                    if(obj == "LARGER"){
                                        $("#notification_warning").html("Σφάλμα. Η ποσότητα καταστροφής είναι μεγαλύτερη του αποθέματος.");
                                        $("#notification_warning").jqxNotification("open");
                                    } else if (obj !== ""){
                                        $(grid).jqxGrid('setcellvalue', row, g_current_year, obj["current_amount"]);
                                        $(grid).jqxGrid('setcellvalue', row, "destroy", 0 );
                                        $("#notification_success").html("Tο υλικό καταστράφηκε με επιτυχία.");
                                        $("#notification_success").jqxNotification("open");
                                        $("#supplies_destroys_table").jqxGrid('addrow', null, obj)
                                    }
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    alert("Status: " + textStatus);
                                    alert("Error: " + errorThrown);
                                },
                            
                            })
                        }
                    },
                    cellclassname: function(row, column, value, data) {
                        return "cellcolor";
                    }
                }
            ]
        });
}



// declare an async function
async function get_supplies_destroys_data(material_id) {
    let url = './src/backend/rest_api.php?functionname=get_material_destroys&material_id=' + encodeURIComponent(material_id)
    let response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json'  } });
    if (response.ok) {
      let data = await response.json();
      return data;
    }
}

async function get_material_destroys(event) {
    var selectedItem = $('#supplies_book_table').jqxTabs('selectedItem'); 
    var tabContent = $("#supplies_book_table").jqxTabs("getContentAt", selectedItem);
    var grid = $(tabContent).find(".jqx-grid");
    var rowData = grid.jqxGrid("getrowdata", event.args.rowindex);
    const material_id = rowData["id"];

    if(g_current_page == "supplies_book_btn"){
        $("#supplies_destroys_table").show();
    }
    let data = await get_supplies_destroys_data(material_id)
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'material_id'   , type: 'number' },
            { name: 'user_id'       , type: 'number' },
            { name: 'amount'        , type: 'number' },
            { name: 'destroy_id'     , type: 'number' },
            { name: 'user_name'     , type: 'string' },
            { name: 'date'          , type: 'string' },
            { name: 'academic_year' , type: 'string' },
        ],
        localdata: data
    };
    var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
    $("#supplies_destroys_table").jqxGrid({
        source: dataAdapter,
        theme: 'energyblue',
        height: "30%",
        width: "98.8%",
        filterable: true,
        showfilterrow: true,
        columns: [
            { text: "Όνομα χρήστη"         , datafield: "user_name"     , width: "50%"},
            { text: "Καταστροφη Ποσότητας" , datafield: "amount"        , width: "10%", cellsalign: 'center' },
            { text: "Ακαδημαϊκό Έτος"      , datafield: "academic_year" , width: "15%", cellsalign: 'center' },
            { text: "Ημέρα"                , datafield: "date"          , width: "15%", cellsalign: 'center' },
            { text: ''                     , datafield: ''              , width: "10%", columntype: 'button', editable: false,
                cellsrenderer: function () { return "Διαγραφή"; }, 
                buttonclick: function (row) {

                    var selectedItem = $('#supplies_book_table').jqxTabs('selectedItem'); 
                    var tabContent = $("#supplies_book_table").jqxTabs("getContentAt", selectedItem);
                    var grid = $(tabContent).find(".jqx-grid");
                    var rowindex  = $(grid).jqxGrid('getselectedrowindex');
                    var rowData_1 = $(grid).jqxGrid("getrowdata", rowindex);
                    var rowData   = $("#supplies_destroys_table").jqxGrid("getrowdata", row);
                    jQuery.ajax({
                        type: "POST",
                        url: "./src/backend/rest_api.php",
                        dataType: "json",
                        data: { functionname: "delete_destroy_material", arguments: [ rowData["destroy_id"] ] },
                        success: function (obj, textstatus) {
                            if(obj == true){
                                let new_amount = Number(rowData_1[ rowData["academic_year"] ]) + Number(rowData["amount"])
                                $(grid).jqxGrid('setcellvalue', rowindex, rowData["academic_year"], new_amount);
                                $("#supplies_destroys_table").jqxGrid('deleterow', rowData["uid"]);
                                let html_success = "H ποσότητα καταστροφής προστέθηκε στo απόθεμα του " + rowData["academic_year"]; 
                                $("#notification_success").html(html_success);
                                $("#notification_success").jqxNotification("open");
                            } else {
                                let html_fail    = "Σφάλμα. H ποσότητα καταστροφής δεν προστέθηκε στo απόθεμα του " + rowData["academic_year"]; 
                                $("#notification_warning").html(html_fail);
                                $("#notification_warning").jqxNotification("open");
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("Status: " + textStatus);
                            alert("Error: " + errorThrown);
                        },
                    })
                }
            }
        ]
    })
}
