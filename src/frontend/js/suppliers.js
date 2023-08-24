function buildSupplierTable(){
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_suppliers", arguments: [] },
    
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
            $("#suppliers_table").jqxGrid(
            {
                width: "50%",
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