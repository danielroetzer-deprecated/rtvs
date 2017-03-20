/**
 * Created by Dani on 18.01.2017.
 */


$(document).ready(function () {
    $('#type1').change(function() {

        if(($('#type1').val())==(1)){

            $('.inner1').remove();

            $('.xxx1').append(
                '<div class="inner1">'+
                    '<input class="multi1" type="text" name="multi00" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="multi1" type="text" name="multi01" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="multi1" type="text" name="multi02" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="multi1" type="text" name="multi03" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input type="hidden" name="hiddenType1" value="multi">'
                +'</div>'
            );

        }
        else if(($('#type1').val())==(2)){

            $('.inner1').remove();

            $('.xxx1').append(
                '<div class="inner1">'+
                    '<input class="single1" type="text" name="single00" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="single1" type="text" name="single01" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="single1" type="text" name="single02" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input class="single1" type="text" name="single03" placeholder="Enter text for checkbox here"><br>'
                    +
                    '<input type="hidden" name="hiddenType1" value="single">'
                +'</div>'
            );
        }
        else if(($('#type1').val())==(3)){

            $('.inner1').remove();

            $('.xxx1').append(
                '<div class="inner1">'+
                    'User gets a text field to fill out'
                    +
                    '<input type="hidden" name="hiddenType1" value="text">'
                +'</div>'
            );
        }
    });
});