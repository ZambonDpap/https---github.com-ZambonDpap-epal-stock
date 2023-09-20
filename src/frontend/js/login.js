$(document).ready(function() {
    
    $(".login-button").on('click', ()=>{
        const username = $("#username").val()
        const password = $("#password").val()

        jQuery.ajax({
            type: "POST",
            url: '/src/backend/rest_api.php',
            dataType: 'json',
            data: {functionname: 'validate_user', arguments: [username, password]},
        
            success: function (obj, textstatus) {
                console.log(obj)
                          if( ('success' in obj) ) {
                            window.location = '/home.php';
                          }
                          else {
                                alert("Λάθος στοιχεία!"); 
                                console.log(obj.error);
                          }
                    },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        });
    })
});