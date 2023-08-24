$(document).ready(function() {

    $("#invoice_form").hide();
    $("#pdf_viewer").hide();
    $("#protocol_viewer").hide();
    $("#invoices_table").hide();
    $("#invoices_supplies_table").hide();
    $("#users_table").hide();
    $("#users_roles_table").hide();
    $("#suppliers_table").hide();
    $("#fields_table").hide();
    $("#labs_table").hide();
    $("#consumables_materials_table").hide();
    $("#long_term_materials_table").hide();
    $("#short_term_materials_table").hide();
    $("#stock_table").hide();
    $("#proposal").hide();
    
    $("#home_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        changeButtonColor("#home_btn");
    });

    $("#new_invoice_btn").on('click', ()=>{
        $("#invoice_form").show();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        changeButtonColor("#new_invoice_btn");
        clearInvoiceForm();
    });

    $("#invoice_list_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#invoices_table").show();
        $("#invoices_supplies_table").show();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        buildInvoiceTable();
        changeButtonColor("#invoice_list_btn");
    })
    $("#users_list_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").show();
        $("#users_roles_table").show();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        buildUsersTable();
        changeButtonColor("#users_list_btn");
    })
    $("#fields_labs_list_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#suppliers_table").hide();
        $("#fields_table").show();
        $("#labs_table").show();
        $("#consumables_materials_table").show();
        $("#long_term_materials_table").show();
        $("#short_term_materials_table").show();
        $("#stock_table").show();
        $("#proposal").hide();
        buildFieldsLabsMaterialTable();
        changeButtonColor("#fields_labs_list_btn");
    })
    $("#suppliers_list_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#suppliers_table").show();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").hide();
        buildSupplierTable();
        changeButtonColor("#suppliers_list_btn");
    })
    $("#proposal_btn").on('click', ()=>{
        $("#invoice_form").hide();
        $("#pdf_viewer").hide();
        $("#protocol_viewer").hide();
        $("#invoices_table").hide();
        $("#invoices_supplies_table").hide();
        $("#users_table").hide();
        $("#users_roles_table").hide();
        $("#suppliers_table").hide();
        $("#fields_table").hide();
        $("#labs_table").hide();
        $("#consumables_materials_table").hide();
        $("#long_term_materials_table").hide();
        $("#short_term_materials_table").hide();
        $("#stock_table").hide();
        $("#proposal").show();
        buildProposalTable();
        changeButtonColor("#proposal_btn");
    })

})

function changeButtonColor(button_name) {
    $("#home_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#new_invoice_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#invoice_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#users_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#roles_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#fields_labs_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#suppliers_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#supplies_list_btn").css ("background-color", "rgb(213, 213, 213)");
    $("#proposal_btn").css ("background-color", "rgb(213, 213, 213)");

    $(button_name).css ("background-color", "rgb(189, 189, 189)");
}