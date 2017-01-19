/**
 * Created by Dani on 18.01.2017.
 */
/*
$(document).ready(function () {
    $('#type1').change(function() {
        $('.changeMe').text('success');
    });
})*/

$(document).ready(function () {
    $('#type1').change(function() {

        if(($('#type1').val())==(1)){
            $('.changeMe').text('1');
        }
        else if(($('#type1').val())==(2)){
            $('.changeMe').text('2');
        }
        else if(($('#type1').val())==(3)){
            $('.changeMe').text('3');
        }
    });
});

/*
 https://api.jquery.com/wrap/
 https://api.jquery.com/replaceAll/
 http://learn.jquery.com/using-jquery-core/faq/how-do-i-get-the-text-value-of-a-selected-option/
 */