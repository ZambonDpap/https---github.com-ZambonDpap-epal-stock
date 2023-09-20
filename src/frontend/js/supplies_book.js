function buildSuppliesBookTable(){
    const user_id = $("#user_id").html();

    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_user_labs", arguments: [user_id] },

        success: function (obj, textstatus) {
            if (!("error" in obj)) {
                console.log(obj)
                var source = {
                  localdata: obj,
                  datatype: "json",
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#supplies_book_labs_dropdown").jqxDropDownList({
                  selectedIndex: 0,
                  source: dataAdapter,
                  displayMember: "name",
                  valueMember: "id",
                });

                var item = $("#supplies_book_labs_dropdown").jqxDropDownList('getSelectedItem'); 
                const lab_id = item.value

                prepareSuppliesBookTables(lab_id)

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

function prepareSuppliesBookTables(lab_id){

    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_materials", arguments: [lab_id, "SPLIT"] },

        success: function (obj, textstatus) {
            // console.log(obj)


            var initWidgets = function (tab) {
                switch (tab) {
                    case 0:
                        initGrid("Αναλώσημα", obj["ΑΝΑΛΩΣΗΜΑ"]);
                        break;
                    case 1:
                        initGrid("Βραχείας", obj["ΒΡΑΧΕΙΑΣ"]);
                        break;
                    case 2:
                        initGrid("Μακράς", obj["ΜΑΚΡΑΣ"]);
                        break;
                }
            }


            // init widgets.
            $('#supplies_book_table').jqxTabs({ width: "98%", height: "87%",  initTabContent: initWidgets });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        },

    })

    var initGrid = function (name, data) {
        grid_name = "";
        column_name = "";
    
        if(name === "Αναλώσημα"){
            grid_name = "#grid_cons"
            column_name = "Υλικά " + name
        } else if(name === "Βραχείας"){
            grid_name = "#grid_sort"
            column_name = "Υλικά " + name
        } else if(name === "Μακράς"){
            grid_name = "#grid_long"
            column_name = "Υλικά " + name
        }
    
        var source =
       {
            datatype: "json",
            datafields: [
                { name: 'name' },
                { name: '2022-2023' },
                { name: '2023-2024' }
            ],
            localdata: data
       };
        var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
        
        $(grid_name).jqxGrid(
        {
            width: '100%',
            height: '100%',
            source: dataAdapter,
            theme: 'energyblue',
            columns: [
                { text: column_name, datafield: 'name', width: "60%" },
                { text: 'Απόθεμα 2022-2023', datafield: '2022-2023', width: "20%", cellsalign: 'center', editable: true },
                { text: 'Απόθεμα 2023-2024', datafield: '2023-2024', width: "20%", cellsalign: 'center', editable: true },
            ]
        });
    }

}
