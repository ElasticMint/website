$(document).ready(function () {
    
    var URL = 'https://v1ijjegv0g.execute-api.eu-west-1.amazonaws.com/latest/contact'
    
    $('#contact-form').submit(function (event) {
        event.preventDefault()
        
        var data = {
            name: $('#name').val(),
            email: $('#email').val(),
            description: $('#message').val()
        }
        
        $.ajax({
            type: 'POST',
            url: URL,
            headers: { 'x-api-key': 'OIhpPhkomA2zT1Fjho6U614i34Ie0Mwm5eLMLI9m' },
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function () {
                $("#successmessage").show();
                $('#contact-form').trigger("reset");
            },
            error: function () {
                $('#contact-form').trigger("reset");
            }
        })
    })
})