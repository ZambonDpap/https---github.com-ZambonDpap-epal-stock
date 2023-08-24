$(document).ready(function () {
    $("#fields_table").on('rowselect', function (event) {
        $("#consumables_materials_table").jqxGrid('clear');
        $("#consumables_materials_table").jqxGrid('clearselection');
        $("#short_term_materials_table").jqxGrid('clear');
        $("#short_term_materials_table").jqxGrid('clearselection');
        $("#long_term_materials_table").jqxGrid('clear');
        $("#long_term_materials_table").jqxGrid('clearselection');
        $("#labs_table").jqxGrid('clearselection');
        $("#labs_table").jqxGrid('clear');

        var field_id = event.args.row.id;

        jQuery.ajax({
            type: "GET",
            url: "/src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_labs", arguments: [field_id] },        

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
                            width: "25%",
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
    })

    $("#labs_table").on('rowselect', function (event) {
        var lab_id = event.args.row.id;


        jQuery.ajax({
            type: "GET",
            url: "/src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_materials", arguments: [lab_id, "SPLIT"] },        

            success: function (obj, textstatus) {
                if (!("error" in obj)) {
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'id', type: 'string' },
                            { name: 'name', type: 'string' },
                        ],
                        localdata: obj["ΑΝΑΛΩΣΗΜΑ"]
                    }

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#consumables_materials_table").jqxGrid(
                        {
                            width: "25%",
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
                                { text: 'ΥΛΙΚΑ ΑΝΑΛΩΣΗΜΑ', datafield: 'name', width: "100%", cellsalign: 'left' },
                            ]
                        });
                    
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'id', type: 'string' },
                            { name: 'name', type: 'string' },
                        ],
                        localdata: obj["ΒΡΑΧΕΙΑΣ"]
                    }

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#short_term_materials_table").jqxGrid(
                        {
                            width: "25%",
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
                            width: "25%",
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
    })
})

function buildFieldsLabsMaterialTable(){
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_fields", arguments: [] },

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
                  width: "25%",
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