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

            $('.inner1').remove();

            $('.xxx1').append(
                '<div class="inner1">'+
                    '<input class="multi1" type="text" name="multi1" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="multi1" type="text" name="multi1" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="multi1" type="text" name="multi1" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="multi1" type="text" name="multi1" placeholder="Enter text for checkbox here"><br>'
                +'</div>'
            );

        }
        else if(($('#type1').val())==(2)){
            $('.changeMe').text('2');

            $('.inner1').remove();

            $('.xxx1').append(
                '<div class="inner1">'+
                    '<input class="single1" type="text" name="single1" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="single1" type="text" name="single1" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="single1" type="text" name="single1" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="single1" type="text" name="single1" placeholder="Enter text for checkbox here"><br>'
                +'</div>'
            );
        }
        else if(($('#type1').val())==(3)){
            $('.changeMe').text('3');

            $('.inner1').remove();

            $('.xxx1').append(
                '<div class="inner1">'+
                    '<textarea class="textarea1" name="textarea1">xxx</textarea>'
                +'</div>'
            );
        }

        //$('<h4>It worked</h4>').replaceAll('.multi1');

    });
});

/*
 https://api.jquery.com/wrap/
 https://api.jquery.com/replaceAll/
 http://learn.jquery.com/using-jquery-core/faq/how-do-i-get-the-text-value-of-a-selected-option/
 */