/**
 * Created by Pierluigi on 14/03/17.
 */

// Check for jQuery.
if (typeof(jQuery) === 'undefined') {
    var jQuery;
    // Check if require is a defined function.
    if (typeof(require) === 'function') {
        jQuery = $ = require('jquery');
        // Else use the dollar sign alias.
    } else {
        jQuery = $;
    }
};

(function(window){
    if(window.Package){
        Materialize = {};
    } else {
        window.Materialize = {};
    }
})(window);

;(function ($) {
    $(document).ready(function() {

        // Function to update labels of text fields
        Materialize.updateTextFields = function() {
            var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
            $(input_selector).each(function(index, element) {
                var $this = $(this);
                if ($(element).val().length > 0 || element.autofocus || $this.attr('placeholder') !== undefined) {
                    $this.siblings('label').addClass('active');
                } else if ($(element)[0].validity) {
                    $this.siblings('label').toggleClass('active', $(element)[0].validity.badInput === true);
                } else {
                    $this.siblings('label').removeClass('active');
                }
            });
        };

        // Text based inputs
        var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

        // Add active if form auto complete
        $(document).on('change', input_selector, function () {
            if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
                $(this).siblings('label').addClass('active');
                $(this).parent().siblings('label').addClass('active');
            }
            validate_field($(this));
        });

        // Add active if input element has been pre-populated on document ready
        $(document).ready(function() {
            Materialize.updateTextFields();
        });

        // HTML DOM FORM RESET handling
        $(document).on('reset', function(e) {
            var formReset = $(e.target);
            if (formReset.is('form')) {
                formReset.find(input_selector).removeClass('valid').removeClass('invalid');
                formReset.find(input_selector).each(function () {
                    if ($(this).attr('value') === '') {
                        $(this).siblings('label').removeClass('active');
                        $(this).parent().siblings('label').removeClass('active');
                    }
                });

                // Reset select
                formReset.find('select.initialized').each(function () {
                    var reset_text = formReset.find('option[selected]').text();
                    formReset.siblings('input.select-dropdown').val(reset_text);
                });
            }
        });

        // Add active when element has focus
        $(document).on('focus', input_selector, function () {
            $(this).siblings('label, .prefix').addClass('active');
            $(this).parent().siblings('label').addClass('active');
        });

        $(document).on('blur', input_selector, function () {
            var $inputElement = $(this);
            var selector = ".prefix";

            if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
                selector += ", label";
            }

            $inputElement.siblings(selector).removeClass('active');
            $inputElement.parent().siblings(selector).removeClass('active');

            validate_field($inputElement);
        });

        window.validate_field = function(object) {
            var hasLength = object.attr('data-length') !== undefined;
            var lenAttr = parseInt(object.attr('data-length'));
            var len = object.val().length;

            if (object.val().length === 0 && object[0].validity.badInput === false) {
                if (object.hasClass('validate')) {
                    object.removeClass('valid');
                    object.removeClass('invalid');
                }
            }
            else {
                if (object.hasClass('validate')) {
                    // Check for character counter attributes
                    if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
                        object.removeClass('invalid');
                        object.addClass('valid');
                    }
                    else {
                        object.removeClass('valid');
                        object.addClass('invalid');
                    }
                }
            }
        };

    }); // End of $(document).ready

}( jQuery ));

// fn characterCounter

;(function ($) {

    console.log('APP.JS');

    $.fn.characterCounter = function(){
        return this.each(function(){
            var $input = $(this);
            var $counterElement = $input.parent().find('span[class="character-counter"]');

            // character counter has already been added appended to the parent container
            if ($counterElement.length) {
                return;
            }

            var itHasLengthAttribute = $input.attr('data-length') !== undefined;

            if(itHasLengthAttribute){
                $input.on('input', updateCounter);
                $input.on('focus', updateCounter);
                $input.on('keyup', updateCounter);
                $input.on('blur', removeCounterElement);

                addCounterElement($input);
            }

        });
    };

    function updateCounter(){
        var maxLength     = +$(this).attr('data-length'),
            actualLength      = +$(this).val().length,
            isValidLength     = actualLength <= maxLength;

        $(this).parent().find('span[class="character-counter"]').html( actualLength + '/' + maxLength);

        addInputStyle(isValidLength, $(this));
    }

    function addCounterElement($input) {
        var $counterElement = $input.parent().find('span[class="character-counter"]');

        if ($counterElement.length) {
            return;
        }

        $counterElement = $('<span/>')
            .addClass('character-counter')
            .css('position','absolute')
            .css('right',0)
            .css('bottom',-5)
            .css('font-size','12px')
            .css('height',1);

        $input.parent().append($counterElement);
        
        $input.trigger('keyup');
    }

    function removeCounterElement(){
        //$(this).parent().find('span[class="character-counter"]').html('');
    }

    function addInputStyle(isValidLength, $input){
        var inputHasInvalidClass = $input.hasClass('invalid');
        if (isValidLength && inputHasInvalidClass) {
            $input.removeClass('invalid');
        }
        else if(!isValidLength && !inputHasInvalidClass){
            $input.removeClass('valid');
            $input.addClass('invalid');
        }
    }

    $(document).ready(function(){
        $('input, textarea').characterCounter();
    });

}( jQuery ));