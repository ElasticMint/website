$(document).ready(function () {
    
    var URL = 'https://v1ijjegv0g.execute-api.eu-west-1.amazonaws.com/latest/contact'
    
    $('#contact-form').submit(function (event) {
        event.preventDefault()

        if(grecaptcha.getResponse().length == 0){
            $("#errormessage").show();
            return;
        }
        
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
            captcha: grecaptcha.getResponse(),
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