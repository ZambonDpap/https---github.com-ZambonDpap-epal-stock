let g_last_year
let g_current_year
let g_selected_row
let g_row_data
let g_grid
$(document).ready(async function () {
    const academic_years = await getAcademicYears();
    g_current_year = academic_years[academic_years.length-1]["academic_year"];
    g_last_year = academic_years[academic_years.length-2]["academic_year"];


    $("#supplies_book_fields_dropdown").change(function () {
        var field = $("#supplies_book_fields_dropdown").jqxDropDownList("getSelectedItem");

        if (field !== null){
            $('#supplies_book_table').jqxTabs('select', 0);
            $ ('#grid_cons').jqxGrid ('clear');
            $ ('#grid_sort').jqxGrid ('clear');
            $ ('#grid_long').jqxGrid ('clear');
            $ ('#supplies_destroys_table').jqxGrid ('clear');

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
             $('#supplies_book_table').jqxTabs('select', 0);
             $ ('#grid_cons').jqxGrid ('clear');
             $ ('#grid_sort').jqxGrid ('clear');
             $ ('#grid_long').jqxGrid ('clear');
             $ ('#supplies_destroys_table').jqxGrid ('clear');
            prepareSuppliesBookTables(lab.value, "supplies_book")
        }
    })

    $('#grid_cons').on('cellselect', function (event) {
        get_material_destroys(event)
    })
    $('#grid_sort').on('cellselect', function (event) {
        get_material_destroys(event)
    })
    $('#grid_long').on('cellselect', function (event) {
        get_material_destroys(event)
    })

    $("#lab_materials_book_button").on('click', function(){
        get_lab_materials_book()
    })

    $("#lab_materials_book_overview_button").on('click', function(){
        get_lab_materials_book_overview()
    })
})
async function get_lab_materials_book(){
    var lab = $("#supplies_book_labs_dropdown").jqxDropDownList("getSelectedItem");
    let url = './src/backend/rest_api.php?functionname=get_lab_materials_book&lab_id=' + encodeURIComponent(lab.value)
    let response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json'  } });
    if (response.ok) {
      let data = await response.json();
      console.log(data)
      return data;
    }
}
function get_lab_materials_book_overview(){
    
}
async function getAcademicYears(){
    let url = './src/backend/rest_api.php?functionname=get_academic_years'
    let response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' }, });
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
        theme: 'energyblue',
        selectedIndex: -1,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: "30%",
        height: "34"
    });
    $("#supplies_book_labs_dropdown").jqxDropDownList({theme: 'energyblue', width: "25%", height: "34"})
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
            { name: 'action'       , type: 'string' },
            { name: 'destroy'      , type: 'number' },
            { name: 'labs'         , type: 'json' },
            { name: 'from'         , type: 'string' },
            { name: 't_lab_ido'           , type: 'string' },
            { name: 'comments'     , type: 'string' }
        ],
        localdata: data
    };
    var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });

    let text1 = 'Απόθεμα ' + g_last_year
    let text2 = 'Απόθεμα ' + g_current_year

    height = "100%"
    width  = "100%"
    if(page === "fields_labs_supplies"){
        $("#supplies_book_table").jqxTabs({theme: 'energyblue', width: "43%", height: "42.8%"})
        $("#supplies_book_table").css("top", "53%")
        $("#supplies_book_table").css("left", "0%")
        height = "100%"
        width  = "100%"
    } else {
        $("#supplies_book_table").jqxTabs({theme: 'energyblue', width: "98.8%", height: "50%"})
        $("#supplies_book_table").css("top", "14%")
        $("#supplies_book_table").css("left", "1%")
    }

    $(grid_name).jqxGrid({
        source: dataAdapter,
        theme: 'energyblue',
        height: height,
        width: width,
        filterable: true,
        showfilterrow: true,
        editable: true,
        editmode: 'click',
        selectionmode: 'singlecell',
        ready: function()
        {
            // $(grid_name).jqxGrid('hidecolumn', 'from');
            // $(grid_name).jqxGrid('hidecolumn', 'to_lab_id');
            $(grid_name).show()
        },
        handlekeyboardnavigation: function (event) {
            // Handle the Enter key to insert new lines
            if (event.keyCode === 13) {
                var textarea = event.target;
                var currentValue = textarea.value;
                textarea.value = currentValue + '\n'; // Insert a new line
            }
        },
        columns: [
            { text: column_name, datafield: 'name', width: "22%", editable: false },
            { text: text1, datafield: g_last_year   , width: "11%", cellsalign: 'center', editable: false },
            { text: text2, datafield: g_current_year, width: "11%", cellsalign: 'center', editable: false },
            { text: 'Ενέργεια', datafield: 'action', width: "8%", columntype: 'dropdownlist',
                createeditor: function (row, column, editor) {
                    // assign a new data source to the dropdownlist.
                    var list = ["Καταστροφή", "Μεταφορά"];
                    editor.jqxDropDownList({ autoDropDownHeight: true, source: list, placeHolder: "Επιλογή ενέργειας", displayMember: "text", selectedIndex: -1 });
                },
                // update the editor's value before saving it.
                cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    // return the old value, if the new value is empty.
                    if(newvalue == "Μεταφορά"){
                        // $(grid_name).jqxGrid('showcolumn', 'from');
                        // $(grid_name).jqxGrid('showcolumn', 'to_lab_id');
                    } else {
                        // $(grid_name).jqxGrid('hidecolumn', 'from');
                        // $(grid_name).jqxGrid('hidecolumn', 'to_lab_id');
                    }
                }
            },
            { text: 'Μεταφορά προς εργαστ.', datafield: 'to_lab_id', width: "20%", columntype: 'dropdownlist',
                createeditor: function (row, column, editor) {
                    // assign a new data source to the dropdownlist.
                    editor.jqxDropDownList({ autoDropDownHeight: true, source: data[row].labs, placeHolder: "Επιλογή εργαστηρίου", displayMember: "text", selectedIndex: -1 });
                }
            },
            { text: 'Ποσότητα', datafield: 'destroy', width: "5%", cellsalign: 'center', editable: true, 
                cellclassname: function(row, column, value, data) {
                    return "cellcolor";
                }
            },
            { text: 'Παρατηρήσεις', columntype: 'template', datafield: 'comments', cellsalign: 'left', width: "20%",
                createeditor: function (row, cellvalue, editor, cellText, width, height) {
                    // Construct the editor (jqxTextArea in this case)
                    var textareaElement = $("<textarea/>").prependTo(editor);
                    textareaElement.jqxTextArea({
                        width: "100%",
                        height: "100%"
                    });
                },
                initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                    // Set the initial value of the textarea
                    var textarea = editor.find('textarea');
                    textarea.val(cellvalue);
                    textarea.focus();
                },
                geteditorvalue: function (row, cellvalue, editor) {
                    // Return the edited value from the textarea
                    var textarea = editor.find('textarea');
                    return textarea.val();
                }
            },
            { text: '', datafield: '.', width: "3%",  columntype: 'button', editable: false,
                cellsrenderer: function () { return "OK"; }, 
                buttonclick: function (row) {
                    var selectedItem = $('#supplies_book_table').jqxTabs('selectedItem'); 
                    var tabContent = $("#supplies_book_table").jqxTabs("getContentAt", selectedItem);
                    var grid = $(tabContent).find(".jqx-grid");
                    var rowData = grid.jqxGrid("getrowdata", row);
                    var lab = $("#supplies_book_labs_dropdown").jqxDropDownList("getSelectedItem");

                    const material_id = rowData["id"];
                    const amount = rowData["destroy"];
                    const user_id = $("#user_id").html();
                    const action = rowData["action"];
                    const to = rowData["to_lab_id"];
                    const comments = rowData["comments"];
                    const date = new Date (); // get current date
                    const offset = date.getTimezoneOffset () * 60 * 1000; // get timezone offset in milliseconds
                    const localDate = new Date (date - offset); // subtract offset from date
                    const sqlDate = localDate.toISOString ().slice (0, 19).replace ('T', ' '); // format date as YYYY-MM-DD HH:mm:ss

                    if(action === "Καταστροφή") {
                        if( Number(amount) > 0) {
                            jQuery.ajax({
                                type: "POST",
                                url: "./src/backend/rest_api.php",
                                dataType: "json",
                                data: { functionname: "destroy_material", arguments: [material_id, amount, user_id, sqlDate, action, comments, lab.value] },

                                success: function (obj, textstatus) {
                                    if(obj == "LARGER"){
                                        $("#notification_error").html("Σφάλμα. Η ποσότητα καταστροφής είναι μεγαλύτερη του αποθέματος.");
                                        $("#notification_error").jqxNotification("open");
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
                    } else if(action === "Μεταφορά") {
                        if(to === ""){
                            $("#notification_error").html("Σφάλμα. Παρακαλώ επιλέξτε 'πρός' εργαστήρια.");
                            $("#notification_error").jqxNotification("open");
                        } else {
                            jQuery.ajax({
                                type: "POST",
                                url: "./src/backend/rest_api.php",
                                dataType: "json",
                                data: { functionname: "move_material", arguments: [material_id, amount, to, user_id, sqlDate, action, comments, lab.value] },

                                success: function (obj, textstatus) {
                                    if(obj == "LARGER"){
                                        $("#notification_error").html("Σφάλμα. Η ποσότητα μεταφοράς είναι μεγαλύτερη του αποθέματος.");
                                        $("#notification_error").jqxNotification("open");
                                    } else if (obj !== ""){
                                        $(grid).jqxGrid('setcellvalue', row, g_current_year, obj["current_amount"]);
                                        $(grid).jqxGrid('setcellvalue', row, "destroy", 0 );
                                        $(grid).jqxGrid('setcellvalue', row, "comments", "");
                                        $(grid).jqxGrid('setcellvalue', row, "action", "");
                                        $(grid).jqxGrid('setcellvalue', row, "to_lab_id", "");
                                        $("#notification_success").html("Tο υλικό μεταφέρθηκε με επιτυχία.");
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
                    } else {
                        $("#notification_error").html("Σφάλμα. Παρακαλώ επιλέξτε ενέργεια.");
                        $("#notification_error").jqxNotification("open");
                    }
                },
            }
        ]
    });
}
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
            { name: 'destroy_id'    , type: 'number' },
            { name: 'action'        , type: 'string' },
            { name: 'to_lab_id'     , type: 'string' },
            { name: 'user_name'     , type: 'string' },
            { name: 'date'          , type: 'string' },
            { name: 'academic_year' , type: 'string' },
            { name: 'comments'      , type: 'string' }
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
            { text: "Όνομα χρήστη"         , datafield: "user_name"     , width: "15%"},
            { text: "Ενέργεια"             , datafield: "action"        , width: "8%", cellsalign: 'center'},
            { text: "Ποσότητα"             , datafield: "amount"        , width: "7%", cellsalign: 'center' },
            { text: "Μεταφορά πρός Εργ."   , datafield: "to_lab_id"     , width: "20%", cellsalign: 'center' },
            { text: "Παρατηρήσεις"         , datafield: "comments"      , width: "24%" },
            { text: "Ακαδημαϊκό Έτος"      , datafield: "academic_year" , width: "10%", cellsalign: 'center' },
            { text: "Ημέρα"                , datafield: "date"          , width: "8%", cellsalign: 'center' },
            { text: ''                     , datafield: ''              , width: "8%", columntype: 'button', editable: false,
                cellsrenderer: function () { return "Διαγραφή"; }, 
                buttonclick: function (row) {

                    g_selected_row = row
                    g_row_data = rowData
                    g_grid = grid

                    $('#eventWindow').jqxWindow('title','Διαγραφή Καταστροφής/Μεταφοράς');
                    $('#eventWindow').jqxWindow('open'); 
                }
            }
        ]
    })
}
function delete_destroy_material( ) { 
    var action_rowData  = $("#supplies_destroys_table").jqxGrid("getrowdata", g_selected_row);
    var lab = $("#supplies_book_labs_dropdown").jqxDropDownList("getSelectedItem");

    if (lab !== null){
        jQuery.ajax({
            type: "POST",
            url: "./src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "delete_destroy_material", arguments: [ action_rowData["destroy_id"], action_rowData["action"], lab.value] },
            success: function (obj, textstatus) {
                if(obj[0] == true){
                    let html_success = "";
                    if(action_rowData["action"] == "Καταστροφή"){
                        $(g_grid).jqxGrid('setcellvalue', g_row_data["uid"], action_rowData["academic_year"], obj[1]);
                        html_success = "H ποσότητα καταστροφής προστέθηκε στo απόθεμα του " + action_rowData["academic_year"]; 
                    } else if(action_rowData["action"] == "Μεταφορά"){
                        $(g_grid).jqxGrid('setcellvalue', g_row_data["uid"], action_rowData["academic_year"], obj[1]);
                        html_success = "H μεταφορά καταργήθηκε με επιτυχία" 
                    }
                    $(g_grid).jqxGrid('setcellvalue', g_row_data["uid"], "comments", "");
                    $(g_grid).jqxGrid('setcellvalue', g_row_data["uid"], "action", "");
                    $(g_grid).jqxGrid('setcellvalue', g_row_data["uid"], "to_lab_id", "");
                    $("#supplies_destroys_table").jqxGrid('deleterow', action_rowData["uid"]);
                    $("#notification_success").html(html_success);
                    $("#notification_success").jqxNotification("open");
                } else {
                    let html_fail = ""
                    if(action_rowData["action"] == "Καταστροφή"){
                        html_fail    = "Σφάλμα. H ποσότητα καταστροφής δεν προστέθηκε στo απόθεμα του " + action_rowData["academic_year"]; 
                    } else if(action_rowData["action"] == "Μεταφόρα"){
                        html_fail    = "Σφάλμα. H ποσότητα δεν μεταφέρθηκε" 
                    }
                    $("#notification_error").html(html_fail);
                    $("#notification_error").jqxNotification("open");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            },
        })
    }
}
