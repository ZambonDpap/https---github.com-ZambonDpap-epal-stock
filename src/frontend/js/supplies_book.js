$(document).ready(function () {
    $('#supplies_book_table').jqxTabs({ width: "98%", height: "87%"});

    $("#supplies_book_fields_dropdown").change(function () {
        var field = $("#supplies_book_fields_dropdown").jqxDropDownList("getSelectedItem");

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
    });

    $("#supplies_book_labs_dropdown").change(function () {
        var lab = $("#supplies_book_labs_dropdown").jqxDropDownList("getSelectedItem");
        if (lab !== null){
            prepareSuppliesBookTables(lab.value)
            $("#supplies_book_table").show();
        }
    })

})
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
function prepareSuppliesBookTables(lab_id) {

    jQuery.ajax({
        type: "GET",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "get_materials", arguments: [lab_id, "SPLIT"] },

        success: function (obj, textstatus) {
            initGrid("Αναλώσημα", obj["ΑΝΑΛΩΣΗΜΑ"]);
            initGrid("Βραχείας", obj["ΒΡΑΧΕΙΑΣ"]);
            initGrid("Μακράς", obj["ΜΑΚΡΑΣ"]);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        },

    })
}

function initGrid(name, data) {
    grid_name = "";
    column_name = "";

    if (name === "Αναλώσημα") {
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
