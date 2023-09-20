$(document).ready(function () {

    addRolesToDropdown()
    addFieldsToEditDropdown()
    addAcademicYearsToDropdown("#edit_user_year");
    addActiveToDropdown();
    addLabsToEditDropdown();

    $("#users_table").on('rowselect', function (event) {
        var user_id = event.args.row.id;

        jQuery.ajax({
            type: "GET",
            url: "/src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_user_roles", arguments: [user_id] },

            success: function (obj, textstatus) {
                if (!("error" in obj)) {
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'id', type: 'int' },
                            { name: 'field', type: 'string' },
                            { name: 'lab', type: 'string' },
                            { name: 'role', type: 'string' },
                            { name: 'academic_year', type: 'string' },
                            { name: 'active', type: 'string' }
                        ],
                        addrow: function (rowid, rowdata, position, commit) {

                            jQuery.ajax({
                                type: "POST",
                                url: "/src/backend/rest_api.php",
                                dataType: "json",
                                data: { functionname: "add_user_role", arguments: [user_id, rowdata.academic_year, rowdata.active, rowdata.field, rowdata.lab, rowdata.role ] },

                                success: function (obj, textstatus) {
                                    commit(true);
                                    $("#notification_success").html("Ο ρόλος του χρήστη καταχωρήθηκε με επιτυχία! ");
                                    $("#notification_success").jqxNotification("open");
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    $("#notification_warning").html("Σφάλμα κατα την καταχωρήση νέου ρόλου!");
                                    $("#notification_warning").jqxNotification("open");
                                    alert("Status: " + textStatus);
                                    alert("Error: " + errorThrown);
                                },
                            })
                        },
                        deleterow: function (rowid, commit) {
                            var data = $('#users_roles_table').jqxGrid('getrowdatabyid', rowid);
                            const role_id = data.id

                            jQuery.ajax({
                                type: "POST",
                                url: "/src/backend/rest_api.php",
                                dataType: "json",
                                data: { functionname: "delete_user_role", arguments: [role_id] },

                                success: function (obj, textstatus) {
                                    commit(true);
                                    $("#notification_success").html("Ο ρόλος του χρήστη διαγράφηκε με επιτυχία! ");
                                    $("#notification_success").jqxNotification("open");
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    $("#notification_warning").html("Σφάλμα κατα την διαγραφή ρόλου!");
                                    $("#notification_warning").jqxNotification("open");
                                    alert("Status: " + textStatus);
                                    alert("Error: " + errorThrown);
                                },
                            })
                        },
                        updaterow: function (rowid, newdata, commit) {
                            var data = $('#users_roles_table').jqxGrid('getrowdatabyid', rowid);
                            const role_id = data.id

                            jQuery.ajax({
                                type: "POST",
                                url: "/src/backend/rest_api.php",
                                dataType: "json",
                                data: { functionname: "update_user_role", arguments: [role_id, newdata.academic_year, newdata.active, newdata.field, newdata.lab, newdata.role ] },

                                success: function (obj, textstatus) {
                                    commit(true);
                                    $("#notification_success").html("Ο ρόλος του χρήστη ανανεώθηκε με επιτυχία! ");
                                    $("#notification_success").jqxNotification("open");
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    $("#notification_warning").html("Σφάλμα κατα της ανανέωση ρόλου!");
                                    $("#notification_warning").jqxNotification("open");
                                    alert("Status: " + textStatus);
                                    alert("Error: " + errorThrown);
                                },
                            })
                        },
                        localdata: obj
                    }

                    $("#edit_user_role").jqxDropDownList    ({ theme: 'energyblue', width: "250px", height: 40, });
                    $("#edit_user_field").jqxDropDownList   ({ theme: 'energyblue', width: "250px", height: 40, });
                    $("#edit_user_lab").jqxDropDownList     ({ theme: 'energyblue', width: "250px", height: 40, });
                    $("#edit_user_year").jqxDropDownList    ({ theme: 'energyblue', width: "250px", height: 40 });
                    $("#edit_user_active").jqxDropDownList  ({ theme: 'energyblue', width: "250px", height: 40 });

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    var editrow = -1;
                    $("#users_roles_table").jqxGrid(
                        {
                            width: "47%",
                            height: "90.8%",
                            source: dataAdapter,
                            theme: 'energyblue',
                            sortable: true,
                            altrows: false,
                            enabletooltips: true,
                            editable: true,
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
                                container.append('<input id="addrowbutton" type="button" value="Νέος ρόλος" />');
                                container.append('<input style="margin-left: 5px;" id="deleterowbutton" type="button" value="Διαγραφή ρόλου" />');
                                $("#addrowbutton").jqxButton();
                                $("#deleterowbutton").jqxButton();
                                // create new row.
                                $("#addrowbutton").on('click', function () {

                                    var offset = $("#users_roles_table").offset();
                                    $("#edit_user_popupwindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });
                                    // get the clicked row's data and initialize the input fields.
                                    
                                    $("#edit_user_role").val("");
                                    $("#edit_user_field").val("");
                                    $("#edit_user_lab").val("");
                                    $("#edit_user_year").val("");
                                    $("#edit_user_active").val("");

                                    // show the popup window.
                                    $("#edit_user_popupwindow").jqxWindow('open');
                                });
                                // delete row.
                                $("#deleterowbutton").on('click', function () {
                                    var selectedrowindex = $("#users_roles_table").jqxGrid('getselectedrowindex');
                                    var rowscount = $("#users_roles_table").jqxGrid('getdatainformation').rowscount;
                                    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                                        var id = $("#users_roles_table").jqxGrid('getrowid', selectedrowindex);
                                        var commit = $("#users_roles_table").jqxGrid('deleterow', id);
                                    }
                                });
                            },
                            columns: [
                                { text: 'ΡΟΛΟΣ', datafield: 'role', width: "20%", editable: false, cellsalign: 'left' },
                                { text: 'ΤΟΜΕΑΣ', datafield: 'field', width: "25%", editable: false, cellsalign: 'left' },
                                { text: 'ΕΡΓΑΣΤΗΡΙΟ', datafield: 'lab', width: "25%", editable: false, cellsalign: 'left' },
                                { text: 'ΑΚΑΔ. ΕΤΟΣ', datafield: 'academic_year', width: "12%", editable: false, cellsalign: 'center' },
                                {
                                    text: 'ΕΝΕΡΓΟΣ',
                                    datafield: "active",
                                    columntype: "dropdownlist",
                                    width: "10%",
                                    editable: true,
                                    cellsalign: 'center',
                                    cellclassname: function (row, column, value, data) {
                                        if (value === "ΝΑΙ") {
                                            return "1";
                                        } else if (value === "ΟΧΙ") {
                                            return "0";
                                        }
                                    }
                                },
                                {
                                    text: 'Edit', datafield: 'Edit', columntype: 'button', width: "8%", cellsrenderer: function () {
                                        return "Edit";
                                    }, buttonclick: function (row) {


                                        // open the popup window when the user clicks a button.
                                        editrow = row;
                                        var offset = $("#users_roles_table").offset();
                                        $("#edit_user_popupwindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });
                                        // get the clicked row's data and initialize the input fields.
                                        var dataRecord = $("#users_roles_table").jqxGrid('getrowdata', editrow);

                                        $("#edit_user_role").val(dataRecord.role);
                                        $("#edit_user_field").val(dataRecord.field);
                                        $("#edit_user_lab").val(dataRecord.lab);
                                        $("#edit_user_year").val(dataRecord.academic_year);
                                        $("#edit_user_active").val(dataRecord.active);
                                        // show the popup window.
                                        $("#edit_user_popupwindow").jqxWindow('open');
                                    }
                                }
                            ]
                        });
                    // initialize the popup window and buttons.
                    $("#edit_user_popupwindow").jqxWindow({
                        resizable: false, isModal: true, autoOpen: false, cancelButton: $("#edit_user_cancel"), modalOpacity: 0.01
                    });

                    $("#edit_user_cancel").jqxButton({ theme: "energyblue" });
                    $("#edit_user_save").jqxButton({ theme: "energyblue" });
                    // update the edited row when the user clicks the 'Save' button.
                    $("#edit_user_save").click(function () {
                        var row = { 
                            role: $("#edit_user_role").val(), 
                            field: $("#edit_user_field").val(), 
                            lab: $("#edit_user_lab").val(), 
                            academic_year: $("#edit_user_year").val(), 
                            active: $("#edit_user_active").val()};

                        if (editrow >= 0) {
                            var rowID = $('#users_roles_table').jqxGrid('getrowid', editrow);
                            $('#users_roles_table').jqxGrid('updaterow', rowID, row);
                        } else {
                            $("#users_roles_table").jqxGrid('addrow', null, row);
                        }
                        $("#edit_user_popupwindow").jqxWindow('hide');
                    });
                } else {
                    console.log(obj.error);
                }
            }
        })
    })
})


function buildUsersTable() {
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_users", arguments: [] },

        success: function (obj, textstatus) {
            if (!("error" in obj)) {
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: "id", type: "int" },
                        { name: "lastname", type: "string" },
                        { name: "firstname", type: "string" },
                        { name: "password", type: "string" },
                        { name: "admin_level", type: "int" },
                    ],
                    localdata: obj,
                };

                var dataAdapter = new $.jqx.dataAdapter(source);
                // initialize jqxGrid
                $("#users_table").jqxGrid({
                    width: "50%",
                    height: "90.8%",
                    source: dataAdapter,
                    theme: "energyblue",
                    sortable: true,
                    altrows: false,
                    enabletooltips: true,
                    editable: false,
                    filterable: true,
                    columnsheight: 45,
                    rowsheight: 45,
                    selectionmode: "singlerow",
                    showfilterrow: true,
                    columns: [
                        {
                            text: "Επίθετο",
                            datafield: "lastname",
                            width: "40%%",
                            cellsalign: "left",
                        },
                        {
                            text: "Όνομα",
                            datafield: "firstname",
                            width: "40%",
                            cellsalign: "left",
                        },
                        {
                            text: "Password",
                            datafield: "password",
                            width: "10%",
                            cellsalign: "center",
                        },
                        {
                            text: "Admin level",
                            datafield: "admin_level",
                            width: "10%",
                            cellsalign: "center",
                        },
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
function addRolesToDropdown() {
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_roles", arguments: [] },

        success: function (obj, textstatus) {
            if (!("error" in obj)) {
                var source = {
                    localdata: obj,
                    datatype: "json",
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#edit_user_role").jqxDropDownList({
                    source: dataAdapter,
                    displayMember: "role",
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
function addActiveToDropdown() {
    var source = [
        "ΝΑΙ",
        "ΟΧΙ",
    ];
    $("#edit_user_active").jqxDropDownList({ source: source });
}
function addLabsToEditDropdown() {
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_labs" },

        success: function (obj, textstatus) {
            if (!("error" in obj)) {
                var source = {
                    localdata: obj,
                    datatype: "json",
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#edit_user_lab").jqxDropDownList({
                    source: dataAdapter,
                    displayMember: "name",
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
function addFieldsToEditDropdown() {
    jQuery.ajax({
      type: "GET",
      url: "/src/backend/rest_api.php",
      dataType: "json",
      data: { functionname: "get_fields", arguments: [] },
  
      success: function (obj, textstatus) {
        if (!("error" in obj)) {
          var source = {
            localdata: obj,
            datatype: "json",
          };
          var dataAdapter = new $.jqx.dataAdapter(source);
          $("#edit_user_field").jqxDropDownList({
            selectedIndex: -1,
            source: dataAdapter,
            displayMember: "name",
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
