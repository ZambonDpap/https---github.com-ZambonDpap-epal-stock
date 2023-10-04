$(document).ready(function() {

    $("#user_id").hide();
    $("#invoice_form").hide();
    $("#pdf_viewer").hide();
    $("#protocol_viewer").hide();
    $("#supplies_book_fields").hide();
    $("#supplies_book_fields_dropdown").hide();
    $("#supplies_book_labs").hide();
    $("#supplies_book_labs_dropdown").hide();
    $("#supplies_book_table").hide();
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

    $("#logout").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
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
        changeButtonColor("#home_btn");
    });

    $("#new_invoice_btn").on('click', ()=>{
        new_edit_invoice(null);
    });

    $("#invoice_list_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
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
        buildInvoiceTable();
        changeButtonColor("#invoice_list_btn");
    })

    $("#supplies_book_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").show();
        $("#supplies_book_fields_dropdown").show();
        $("#supplies_book_labs").show();
        $("#supplies_book_labs_dropdown").show();
        $("#supplies_book_table").hide();
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
        buildSuppliesBookDropdowns()
        // buildSuppliesBookTable(g_fields);
        changeButtonColor("#supplies_book_btn");
    })

    $("#users_list_btn").on('click', ()=>{

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
        buildUsersTable();
        buildUsersRolesTable();
        changeButtonColor("#users_list_btn");
    })
    $("#fields_labs_list_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#add_user_role_div").hide();
        $("#suppliers_table").hide();
        $("#fields_table").show();
        $("#labs_table").show();
        $("#consumables_materials_table").show();
        $("#long_term_materials_table").show();
        $("#short_term_materials_table").show();
        $("#stock_table").show();
        $("#proposal").hide();
        $("#edit_user_role_popupwindow").hide();
        $("#labs_roles_academic_year").hide();
        $("#fields_roles_table").hide();
        $("#labs_roles_table").hide();
        buildFieldsLabsMaterialTable();
        changeButtonColor("#fields_labs_list_btn");
    })
    $("#suppliers_list_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
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
        buildSupplierTable();
        changeButtonColor("#suppliers_list_btn");
    })

    $("#proposal_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#supplies_book_fields").hide();
        $("#supplies_book_fields_dropdown").hide();
        $("#supplies_book_labs").hide();
        $("#supplies_book_labs_dropdown").hide();
        $("#supplies_book_table").hide();
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
        buildProposalTable();
        changeButtonColor("#proposal_btn");
    })
})

function new_edit_invoice(edit_data_record)
{
    $("#invoice_form").show();
    $("#pdf_viewer").hide();
    $("#protocol_viewer").hide();
    $("#supplies_book_fields").hide();
    $("#supplies_book_fields_dropdown").hide();
    $("#supplies_book_labs").hide();
    $("#supplies_book_labs_dropdown").hide();
    $("#supplies_book_table").hide();
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
    changeButtonColor("#new_invoice_btn");
    clearInvoiceForm(edit_data_record);
}

function changeButtonColor(button_name) {
    $("#home_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#new_invoice_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#invoice_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#supplies_book_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#users_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#fields_labs_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#suppliers_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#supplies_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#proposal_btn").css ("background-color", "rgb(213, 213, 213)");

    $(button_name).css ("background-color", "rgb(189, 189, 189)");
}

function logout(button_name) {
    jQuery.ajax({
        type: "POST",
        url: "/src/backend/rest_api.php",
        dataType: "json",
        data: { functionname: "logout", arguments: [] },
            success: function (obj, textstatus) {
                window.location = '/index.html';
            }
    })
}