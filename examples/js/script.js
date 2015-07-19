/*! jQuery Elevator - v1.0.6 - 2015
 * https://inzycle.github.com/jquery-elevator
 * Copyright (c) 2015 inZycle; Licensed MIT */

 var _elevator = null;

var _elevator_config = {
    item_top: $('#top-element'),
    item_bottom: $('#bottom-element'),
    align: 'bottom right',
    navigation: $('.section'),
    navigation_text: true,
    speed: 2000,
    shape: 'circle',
    glass: false,
    tooltips: true,
    onBeforeMove: function(){ showEvent('onBeforeMove'); },
    onAfterMove: function(){ showEvent('onAfterMove'); },
    onBeforeGoTop: function(){ showEvent('onBeforeGoTop'); },
    onAfterGoTop: function(){ showEvent('onAfterGoTop'); },
    onBeforeGoBottom: function(){ showEvent('onBeforeGoBottom'); },
    onAfterGoBottom: function(){ showEvent('onAfterGoBottom'); },
    onBeforeGoSection: function(){ showEvent('onBeforeGoSection'); },
    onAfterGoSection: function(){ showEvent('onAfterGoSection'); }
};

$(document).ready(function(){

    _elevator = $.elevator(_elevator_config);

    $('.controls-align').on('click','button',function(e){
        e.preventDefault();
        _elevator.reset_align($(this).attr('data-align'));
    });

    $('.controls-shape').on('click','button',function(e){
        e.preventDefault();
        _elevator.reset_shape($(this).attr('data-shape'));
    });

    $('.controls-speed').on('click','button',function(e){
        e.preventDefault();
        _elevator.reset_speed(parseInt($('input[name="speed"]').val()));
    });


    $('.controls-glass').on('change','input',function(e){
        e.preventDefault();
        if(this.checked) {
            _elevator.reset_glass(true);
        } else {
            _elevator.reset_glass(false);
        }
    });

    $('.controls-hide').on('change','input',function(e){
        e.preventDefault();
        if(this.checked) {
            _elevator.auto_hide(true);
        } else {
            _elevator.auto_hide(false);
        }
    });

    $('.controls-reset').on('click','button',function(e){
        e.preventDefault();

        _elevator_config['navigation_text'] = parseInt($(this).attr('data-text')) ? true : false;
        _elevator_config['align'] = _elevator.get_settings().align;
        _elevator_config['speed'] = 1000;
        _elevator_config['glass'] = $('.controls-glass input').is(':checked');
        _elevator_config['auto_hide'] = $('.controls-hide input').is(':checked');

        _elevator.destroy();

        _elevator = $.elevator(_elevator_config);

        $('.controls-speed input').val(2000);

    });

});

function showEvent(title){

    if ($('.controls-notifications input').is(':checked') ){
        var event_link = $('<span>').hide().text(title);
        $.when(
            event_link.appendTo('#events').fadeIn('slow')
        ).then(console.log(title));
        event_link.animate({
            opacity: 0
        }, 4000, function(){
            $(this).remove();
        });
    } else {
        return false;
    }

}