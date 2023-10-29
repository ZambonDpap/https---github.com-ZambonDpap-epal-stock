function buildSupplierTable() {
  jQuery.ajax({
    type: "GET",
    url: "./src/backend/rest_api.php",
    dataType: "json",
    data: { functionname: "get_suppliers", arguments: [] },

    success: function (obj, textstatus) {
      if (!("error" in obj)) {
        var source = {
          datatype: "json",
          datafields: [
            { name: "id", type: "int" },
            { name: "name", type: "string" },
          ],
          deleterow: function (rowid, commit) {
            var data = $("#suppliers_table").jqxGrid("getrowdatabyid", rowid);
            console.log(data);
            jQuery.ajax({
              type: "POST",
              url: "./src/backend/rest_api.php",
              dataType: "json",
              data: {
                functionname: "delete_supplier",
                arguments: [data["id"]],
              },

              success: function (obj, textstatus) {
                commit(true);
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                commit(false);
              },
            });
          },
          addrow: function (rowid, rowdata, position, commit) {
            // synchronize with the server - send insert command
            // call commit with parameter true if the synchronization with the server is successful
            //and with parameter false if the synchronization failed.
            // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
            commit(true);
          },
          localdata: obj,
        };

        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#suppliers_table").jqxGrid({
          width: "50%",
          height: "84%",
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
          showtoolbar: true,
          toolbarheight: 60,
          rendertoolbar: function (toolbar) {
            var me = this;
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append(
              '<input style="margin-left: 5px;" id="delete_suppliers_row_button" type="button" value="Διαγραφή προμηθευτή" />'
            );
            container.append(
              '<input class="add_new_supplier" style="margin-left: 5px;" id="add_suppliers_row_button" type="button" value="Νέος προμηθευτής" />'
            );
            $("#delete_suppliers_row_button").jqxButton();
            $("#add_suppliers_row_button").jqxButton();
            // delete row.
            $("#delete_suppliers_row_button").on("click", function () {
              var selectedrowindex = $("#suppliers_table").jqxGrid(
                "getselectedrowindex"
              );
              var rowscount =
                $("#suppliers_table").jqxGrid("getdatainformation").rowscount;
              if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = $("#suppliers_table").jqxGrid(
                  "getrowid",
                  selectedrowindex
                );
                var commit = $("#suppliers_table").jqxGrid("deleterow", id);
              }
            });
            $("#add_suppliers_row_button").on("click", function () { });
          },
          columns: [
            {
              text: "Όνομα",
              datafield: "name",
              width: "100%",
              cellsalign: "left",
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
