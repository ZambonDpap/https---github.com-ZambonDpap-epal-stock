g_current_page = ""
$(document).ready(function() {

    $('#eventWindow').on('close', function (event) {
        if (event.type === 'close') {
            const title = $('#eventWindow').jqxWindow('title'); 
            if (event.args.dialogResult.OK) {
                if (title === "Διαγραφή Καταστροφής/Μεταφοράς"){
                    delete_destroy_material();
                } else if (title === "Διαγραφή Τιμολογίου") {
                    delete_invoice();
                } else if (title === "Διαγραφή Ρόλου") {
                    delete_user_role();
                }
            }
        }
    });

    $('#eventWindow').jqxWindow({
        position: { x: "45%", y: "30%"} ,
        height: 188, width: 430,
        showCloseButton: false,
        resizable: false, 
        isModal: true, 
        modalOpacity: 0.3,
        okButton: $('#ok'), 
        autoOpen: false,
        cancelButton: $('#cancel'),
        initContent: function () {
            $('#ok').jqxButton({ width: '190px' });
            $('#cancel').jqxButton({ width: '190px' });
            $('#cancel').focus();
        }
    });

    $("#user_id").hide();
    $("#invoice_form").hide();
    $("#pdf_viewer").hide();
    $("#protocol_viewer").hide();
    $("#supplies_book_fields").hide();
    $("#supplies_book_fields_dropdown").hide();
    $("#supplies_book_labs").hide();
    $("#supplies_book_labs_dropdown").hide();
    $("#supplies_book_table").hide();
    $("#supplies_destroys_table").hide();
    $("#invoices_table").hide();
    $("#invoices_supplies_table").hide();
    $("#users_table").hide();
    $("#users_roles_table").hide();
    $("#add_user_role_div").hide();
    $("#suppliers_table").hide();
    $("#fields_table").hide();
    $("#labs_table").hide();
    $("#consumables_materials_table").hide();
    $("#long_term_materials_table").hide();
    $("#short_term_materials_table").hide();
    $("#stock_table").hide();
    $("#proposal").hide();
    $("#edit_user_role_popupwindow").hide();
    $("#labs_roles_academic_year").hide();
    $("#fields_roles_table").hide();
    $("#labs_roles_table").hide();
    $("#add_lab_roles_div").hide();
    $("#add_field_roles_div").hide();
    $("#edit_field_roles_popupwindow").hide();
    $("#edit_lab_roles_popupwindow").hide();
    $("#edit_lab_roles_div").hide();
    $("#edit_field_roles_div").hide();
    $("#lab_materials_book_button").hide();
    $("#lab_materials_book_overview_button").hide();

    $("#logout").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        logout();
    })
    
    $("#home_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        changeButtonColor("#home_btn");
    });

    $("#new_invoice_btn").on('click', ()=>{
        g_current_page = "new_invoice_btn";
        $("#invoice_form").show();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        changeButtonColor("#new_invoice_btn");
    });

    $("#invoice_list_btn").on('click', ()=>{
        g_current_page = "invoice_list_btn";
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").show();
        $("#invoices_supplies_table").show();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        buildInvoiceTable();
        changeButtonColor("#invoice_list_btn");
    })

    $("#supplies_book_btn").on('click', ()=>{
        g_current_page = "supplies_book_btn";
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").show();
        $("#supplies_book_fields_dropdown").show();
        $("#supplies_book_labs").show();
        $("#supplies_book_labs_dropdown").show();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").show();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        buildSuppliesBookDropdowns()
        changeButtonColor("#supplies_book_btn");
    })

    $("#users_list_btn").on('click', ()=>{
        g_current_page = "users_list_btn";

        $("#users_roles_table").jqxGrid('clear');
        $("#users_table").jqxGrid('clear');
        $('#users_table').jqxGrid('clearselection');

        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").show();
        $("#users_roles_table").show();
        $("#add_user_role_div").show();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        buildUsersTable();
        buildUsersRolesTable();
        changeButtonColor("#users_list_btn");
    })
    $("#fields_labs_list_btn").on('click', ()=>{
        g_current_page = "fields_labs_list_btn";

        $("#fields_table").jqxGrid('clearselection');
        $("#labs_table").jqxGrid('clearselection');

        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").show();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").show();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        buildFieldsLabsMaterialTable();
        changeButtonColor("#fields_labs_list_btn");
    })
    $("#suppliers_list_btn").on('click', ()=>{
        g_current_page = "suppliers_list_btn";

        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").show();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        buildSupplierTable();
        changeButtonColor("#suppliers_list_btn");
    })

    $("#proposal_btn").on('click', ()=>{
        g_current_page = "proposal_btn";

        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#supplies_destroys_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").show();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        $("#add_lab_roles_div").hide();
        $("#add_field_roles_div").hide();
        $("#edit_field_roles_popupwindow").hide();
        $("#edit_lab_roles_popupwindow").hide();
        $("#edit_lab_roles_div").hide();
        $("#edit_field_roles_div").hide();
        $("#lab_materials_book_button").hide();
        $("#lab_materials_book_overview_button").hide();
        buildProposalTable();
        changeButtonColor("#proposal_btn");
    })
})

function changeButtonColor(button_name) {
    $("#home_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#new_invoice_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#invoice_list_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#supplies_book_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#users_list_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#fields_labs_list_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#suppliers_list_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#supplies_list_btn").css ("background-color", "rgb(50, 54, 57)");
    $("#proposal_btn").css ("background-color", "rgb(50, 54, 57)");

    $(button_name).css ("background-color", "rgb(82, 86, 89)");
}

function logout(button_name) {
    jQuery.ajax({
        type: "POST",
        url: "./src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "logout", arguments: [] },
            success: function (obj, textstatus) {
                window.location = './index.html';
            }
    })
}