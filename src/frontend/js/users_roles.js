$(document).ready(function () {
    $("#users_table").on('rowselect', function (event) {
        var user_id = event.args.row.id;

        jQuery.ajax({
            type: "GET",
            url: "/src/backend/rest_api.php",
            dataType: "json",
            data: { functionname: "get_user_roles", arguments: [user_id] },        

            success: function (obj, textstatus) {
                console.log(obj)
                if (!("error" in obj)) {
                    var source =
                    {
                        datatype: "json",
                        datafields: [
                            { name: 'field', type: 'string' },
                            { name: 'lab', type: 'string' },
                            { name: 'role', type: 'string' },
                            { name: 'academic_year', type: 'string' },
                            { name: 'active', type: 'string' }
                        ],
                        localdata: obj
                    }

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#users_roles_table").jqxGrid(
                        {
                            width: "40%",
                            height: "90.8%",
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
                                { text: 'ΡΟΛΟΣ', datafield: 'role', width: "23%", cellsalign: 'left' },
                                { text: 'ΤΟΜΕΑΣ', datafield: 'field', width: "28%", cellsalign: 'left' },
                                { text: 'ΕΡΓΑΣΤΗΡΙΟ', datafield: 'lab', width: "27%", cellsalign: 'left' },
                                { text: 'ΑΚΑΔ. ΕΤΟΣ', datafield: 'academic_year', width: "12%", cellsalign: 'center' },
                                { text: 'ΕΝΕΡΓΟΣ', datafield: 'active', width: "10%", cellsalign: 'center' },
                            ]
                        });
                } else {
                    console.log(obj.error);
                }
            }
        })
    })
})

function buildUsersTable(){
    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_users", arguments: [] },
    
        success: function (obj, textstatus) {
          if (!("error" in obj)) {
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id', type: 'int' },
                    { name: 'lastname', type: 'string' },
                    { name: 'firstname', type: 'string' },
                    { name: 'password', type: 'string' },
                    { name: 'admin_level', type: 'int' },
                ],
                localdata: obj
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $("#users_table").jqxGrid(
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
                    { text: 'Επίθετο', datafield: 'lastname', width: "40%%", cellsalign: 'left' },
                    { text: 'Όνομα', datafield: 'firstname', width: "40%", cellsalign: 'left' },
                    { text: 'Password', datafield: 'password', width: "10%", cellsalign: 'center' },
                    { text: 'Admin level', datafield: 'admin_level', width: "10%", cellsalign: 'center' },
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