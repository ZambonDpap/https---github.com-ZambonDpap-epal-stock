let g_field_id 
let g_lab_id 
$(document).ready(function () {

    $("#edit_field_role").jqxDropDownList({ theme: 'energyblue', width: "250px", height: 40 });
    // $("#edit_field_role_active").jqxInput({
    //     placeHolder: "Επιλογή Υλικών",
    //     height: 35,
    //     width: 445,
    //     minLength: 1,
    //     items: 9,
    //     disabled: true,
    //   });

    $("#edit_lab_roles").jqxButton({ width: 150, height: 40,  theme: 'energyblue' });
    $("#edit_field_roles").jqxButton({ width: 150, height: 40,  theme: 'energyblue' });
    $("#add_lab_roles").jqxButton({ width: 150, height: 40,  theme: 'energyblue' });
    $("#add_field_roles").jqxButton({ width: 150, height: 40,  theme: 'energyblue' });
    $("#labs_roles_academic_year").jqxDropDownList({ theme: 'energyblue', itemHeight: 40, height: 53, width: 100, disabled: false, });
    $("#edit_field_roles_popupwindow").jqxWindow({resizable: false, isModal: true, autoOpen: false, cancelButton: $("#cancel_update_field_role"), modalOpacity: 0.01});
    addAcademicYearsToDropdown("#labs_roles_academic_year");


    $("#edit_field_roles").on('click', function(){
        $("#edit_field_roles_popupwindow").jqxWindow('open');
    })
    $("#edit_lab_roles").on('click', function(){
        console.log("lala")
    })

    $("#fields_table").on('rowselect', function (event) {

        let academic_year = $("#labs_roles_academic_year").val();
        if (academic_year == "") {
            $("#labs_roles_academic_year").val("2023-2024")
        }

        $("#labs_roles_academic_year").show();
        $("#edit_field_roles_div").show();
        $("#add_field_roles_div").show();
        $("#labs_table").show();
        $("#consumables_materials_table").jqxGrid('clear');
        $("#consumables_materials_table").jqxGrid('clearselection');
        $("#short_term_materials_table").jqxGrid('clear');
        $("#short_term_materials_table").jqxGrid('clearselection');
        $("#long_term_materials_table").jqxGrid('clear');
        $("#long_term_materials_table").jqxGrid('clearselection');
        $("#labs_table").jqxGrid('clearselection');
        $("#labs_table").jqxGrid('clear');

        g_field_id = event.args.row.id;

        jQuery.ajax({
            type: "GET",
            url: "./src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_field_labs", arguments: [g_field_id] },        

            success: function (obj, textstatus) {
                if (!("error" in obj)) {
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'id', type: 'string' },
                            { name: 'name', type: 'string' },
                        ],
                        localdata: obj
                    }

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#labs_table").jqxGrid(
                        {
                            width: "21%",
                            height: "45%",
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
                                { text: 'ΕΡΓΑΣΤΗΡΙΑ', datafield: 'name', width: "100%", cellsalign: 'left' },
                            ]
                        });
                } else {
                    console.log(obj.error);
                }
            }
        })
        
        academic_year = $("#labs_roles_academic_year").val();
        if (academic_year !== "") {
            jQuery.ajax({
                type: "GET",
                url: "./src/backend/rest_api.php",
                dataType: "json",
                data: { functionname: "get_field_roles", arguments: [g_field_id, academic_year] },

                success: function (obj, textstatus) {
                    if (!("error" in obj)) {
                        build_field_roles_table(obj)
                    }
                }
            })
        }
    })

    $("#labs_table").on('rowselect', function (event) {

        $("#edit_lab_roles_div").show();
        $("#add_lab_roles_div").show();
        $("#consumables_materials_table").show();
        $("#long_term_materials_table").show();
        $("#short_term_materials_table").show();

        g_lab_id = event.args.row.id;


        jQuery.ajax({
            type: "GET",
            url: "./src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_materials", arguments: [g_lab_id, "SPLIT"] },        

            success: function (obj, textstatus) {
                if (!("error" in obj)) {
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'id', type: 'string' },
                            { name: 'name', type: 'string' },
                            // { name: '2022-2023', type: 'int' },
                            // { name: '2023-2024', type: 'int' }
                        ],
                        localdata: obj["ΑΝΑΛΩΣΙΜΑ"]
                    }

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#consumables_materials_table").jqxGrid(
                        {
                            width: "17%",
                            height: "40%",
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
                            columns: [
                                { text: 'ΥΛΙΚΑ ΑΝΑΛΩΣΙΜΑ', datafield: 'name', width: "100%", cellsalign: 'left', editable: false },
                                // { text: '2022-2023', datafield: '2022-2023', width: "20%", cellsalign: 'center', editable: true },
                                // { text: '2023-2024', datafield: '2023-2024', width: "20%", cellsalign: 'center', editable: true },
                            ]
                        });

                                // events
                    $("#consumables_materials_table").on('cellbeginedit', function (event) {
                        var args = event.args;
                        console.log(args)
                    });
                    $("#consumables_materials_table").on('cellendedit', function (event) {
                        var args = event.args;
                        console.log(args)
                    });
                    
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'id', type: 'string' },
                            { name: 'name', type: 'string' },
                            // { name: '2022-2023', type: 'int' },
                            // { name: '2023-2024', type: 'int' }
                        ],
                        localdata: obj["ΒΡΑΧΕΙΑΣ"]
                    }

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#short_term_materials_table").jqxGrid(
                        {
                            width: "17%",
                            height: "40%",
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
                                { text: 'ΥΛΙΚΑ ΒΡΑΧΕΙΑΣ', datafield: 'name', width: "100%", cellsalign: 'left' },
                            ]
                        });
                       
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'id', type: 'string' },
                            { name: 'name', type: 'string' },
                        ],
                        localdata: obj["ΜΑΚΡΑΣ"]
                    }

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#long_term_materials_table").jqxGrid(
                        {
                            width: "17%",
                            height: "40%",
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
                                { text: 'ΥΛΙΚΑ ΜΑΚΡΑΣ', datafield: 'name', width: "100%", cellsalign: 'left' },
                            ]
                        });
                } else {
                    console.log(obj.error);
                }
            }
        })

        academic_year = $("#labs_roles_academic_year").val();
        if (academic_year !== "") {
            jQuery.ajax({
                type: "GET",
                url: "./src/backend/rest_api.php",
                dataType: "json",
                data: { functionname: "get_lab_roles", arguments: [g_lab_id, academic_year] },

                success: function (obj, textstatus) {
                    if (!("error" in obj)) {
                        build_lab_roles_table(obj)
                    }
                }
            })
        }

    })

    $("#labs_roles_academic_year").on("change", function () {
        const academic_year = $("#academic_year").val();
        if (academic_year !== "") {
            jQuery.ajax({
                type: "GET",
                url: "./src/backend/rest_api.php",
                dataType: "json",
                data: { functionname: "get_labs_roles", arguments: [g_lab_id, academic_year] },

                success: function (obj, textstatus) {
                    if (!("error" in obj)) {
                    }
                }
            })
        }

        if (academic_year !== "") {
            jQuery.ajax({
                type: "GET",
                url: "./src/backend/rest_api.php",
                dataType: "json",
                data: { functionname: "get_labs_roles", arguments: [g_field_id, academic_year] },

                success: function (obj, textstatus) {
                    if (!("error" in obj)) {
                    }
                }
            })
        }

      });

      $("#labs_roles_academic_year").on("change", function () {
        const academic_year = $("#labs_roles_academic_year").val();
        if (academic_year !== "") {
            jQuery.ajax({
                type: "GET",
                url: "./src/backend/rest_api.php",
                dataType: "json",
                data: { functionname: "get_lab_roles", arguments: [g_lab_id, academic_year] },

                success: function (obj, textstatus) {
                    if (!("error" in obj)) {
                        build_lab_roles_table(obj)
                    }
                }
            })
        }

        if (academic_year !== "") {
            jQuery.ajax({
                type: "GET",
                url: "./src/backend/rest_api.php",
                dataType: "json",
                data: { functionname: "get_field_roles", arguments: [g_field_id, academic_year] },

                success: function (obj, textstatus) {
                    if (!("error" in obj)) {
                        build_field_roles_table(obj)
                    }
                }
            })
        }
      });
})

function build_field_roles_table(obj)
{
    $("#fields_roles_table").show();
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'lastname', type: 'strinf' },
            { name: 'firstname', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'user_id', type: 'int' },
            { name: 'field_id', type: 'int' },
            { name: 'active', type: 'string' },
            { name: 'academic_year', type: 'string' },
            { name: 'id', type: 'int' },
        ],
        localdata: obj
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#fields_roles_table").jqxGrid(
    {
        width: "55%",
        height: "20%",
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
            { text: 'Επίθετο', datafield: 'lastname', width: "30%", cellsalign: 'left' },
            { text: 'Όνομα',   datafield: 'firstname', width: "30%", cellsalign: 'left' },
            { text: 'Ρόλος',   datafield: 'role',      width: "30%", cellsalign: 'left' },
            { text: 'Ενεργός', datafield: 'active',    width: "10%", cellsalign: 'left' },
        ]
    });
}

function build_lab_roles_table(obj)
{
    $("#labs_roles_table").show();
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'lastname', type: 'string' },
            { name: 'firstname', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'user_id', type: 'int' },
            { name: 'field_id', type: 'int' },
            { name: 'active', type: 'string' },
            { name: 'academic_year', type: 'string' },
            { name: 'id', type: 'int' },
        ],
        localdata: obj
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#labs_roles_table").jqxGrid(
    {
        width: "55%",
        height: "50%",
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
            { text: 'Επίθετο', datafield: 'lastname', width: "30%", cellsalign: 'left' },
            { text: 'Όνομα',   datafield: 'firstname', width: "30%", cellsalign: 'left' },
            { text: 'Ρόλος',   datafield: 'role',      width: "30%", cellsalign: 'left' },
            { text: 'Ενεργός', datafield: 'active',    width: "10%", cellsalign: 'left' },
        ]
    });
}

function buildFieldsLabsMaterialTable(){
    const user_id = $("#user_id").html();

    jQuery.ajax({
        type: "GET",
        url: "./src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_fields", arguments: [user_id] },

        success: function (obj, textstatus) {
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
              $("#fields_table").jqxGrid(
              {
                  width: "21%",
                  height: "45%",
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
                      { text: 'ΤΟΜΕΙΣ', datafield: 'name', width: "100%", cellsalign: 'left' },
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