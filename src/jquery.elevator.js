(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {

    var defaults = {
            align: 'bottom right',
            show_top: true,
            item_top: false,
            show_bottom: true,
            item_bottom: false,
            navigation: [],
            margin: 100,
            speed: 1000
        },
        settings = {},
        $doc = $(document),
        $win = $(window),
        $div = $('<div>'),
        top_link,
        bottom_link;

    $.elevator = function(options) {

        settings = $.extend({}, defaults, options);

        function scrollTo(target) {
            $('html, body').animate({
                scrollTop: target
            }, settings.speed);
        }

        function getDocHeight() {
            return $doc.height();
        }

        function createTopLink() {

            var _class = 'jq-top jq-mid',
                _anchor = '#',
                _item_top = settings.item_top;

            if(_item_top && typeof(_item_top) == 'object'){
                _item_top.attr('id') ? _item_top.attr('id') : _item_top.attr('id','jq-TOP');
                _anchor = '#' + _item_top.attr('id');
            }

            top_link = $('<a>')
                .addClass(_class)
                .attr('href', _anchor)
                .html('&#9650;');

            top_link.on('click.' + _class, function(e) {
                if(_item_top && typeof(_item_top) == 'object') {
                    scrollTo(_item_top.offset().top);
                }
                else {
                    scrollTo(0);
                }
                e.preventDefault();
            });

            $div.append(top_link);

        }

        function createNavigationLinks() {

            var _class = 'jq-item jq-sml',
                _anchor = '#',
                _navigation = settings.navigation;

            $.each(_navigation, function(key, val){

                $(val).attr('id') ? $(val).attr('id') : $(val).attr('id','jq-' + parseInt($(val).offset().top));
                _anchor = '#' + $(val).attr('id');

                var item_link = $('<a>')
                    .addClass(_class)
                    .attr('href', _anchor)
                    .html('&#9664;');

                $div.append(item_link);

            });

            // TODO: Update jq-item handler to namespaces

            $(document).on('click', '.jq-item', function(e) {
                var _item = $($(this).attr('href'));
                scrollTo(_item.offset().top);
                e.preventDefault();
            });

        }

        function createBottomLink() {

            var _class = 'jq-bottom jq-mid',
                _anchor = '#',
                _item_bottom = settings.item_bottom;

            if(_item_bottom && typeof(_item_bottom) == 'object'){
                _item_bottom.attr('id') ? _item_bottom.attr('id') : _item_bottom.attr('id','jq-BOTTOM');
                _anchor = '#' + _item_bottom.attr('id');
            }

            bottom_link = $('<a>')
                .addClass(_class)
                .attr('href', _anchor)
                .html('&#9660;');

            bottom_link.on('click.' + _class, function(e) {
                if(_item_bottom && typeof(_item_bottom) == 'object') {
                    scrollTo(_item_bottom.offset().top + (_item_bottom.outerHeight(true) - $win.height()));
                }
                else {
                    scrollTo(getDocHeight());
                }
                e.preventDefault();
            });

            $div.append(bottom_link);

        }

        function atTop() {

            var _item_top = settings.item_top,
                _ret = null;

            if(_item_top && typeof(_item_top) == 'object'){
                _ret = $win.scrollTop() <= _item_top.offset().top + settings.margin;
            }
            else {
                _ret = $win.scrollTop() <= settings.margin;
            }

            return _ret;
        }

        function atBottom() {

            var _item_bottom = settings.item_bottom,
                _ret = null;

            if(_item_bottom && typeof(_item_bottom) == 'object'){
                _ret = $win.scrollTop() >= _item_bottom.offset().top - $win.height() - settings.margin;
            }
            else {
                _ret = $win.scrollTop() + $win.height() >= getDocHeight() - settings.margin;
            }

            return _ret;

        }

        function setAlign() {

            var positions = settings.align.split(' ');

            if (positions.indexOf('top') >= 0) {
                $div.addClass('align-top');
            }

            if (positions.indexOf('bottom') >= 0) {
                $div.addClass('align-bottom');
            }

            if (positions.indexOf('left') >= 0) {
                $div.addClass('align-left');
            }

            if (positions.indexOf('right') >= 0) {
                $div.addClass('align-right');
            }

        }

        function setShape() {

            var shape = settings.shape;

            switch (shape) {
                case 'square':
                    $div.addClass('square');
                    break;
                case 'rounded':
                    $div.addClass('rounded');
                    break;
                case 'circle':
                    $div.addClass('circle');
                    break;
                default:
                    $div.addClass('circle');
            }

        }

        function init() {

            $div.addClass('jq-elevator');

            setAlign();
            setShape();

            if (settings.show_top) {
                createTopLink();
            }

            if (settings.navigation.length > 0) {
                createNavigationLinks();
            }

            if (settings.show_bottom) {
                createBottomLink();
            }

            if (atTop()) {
                settings.show_top ? top_link.removeClass('jq-mid').addClass('jq-sml') : false;
                settings.show_bottom ? bottom_link.removeClass('jq-mid').addClass('jq-big') : false;
            }
            else if (atBottom()) {
                settings.show_top ? top_link.removeClass('jq-mid').addClass('jq-big') : false;
                settings.show_bottom ? bottom_link.removeClass('jq-mid').addClass('jq-sml') : false;
            }

            $doc.scroll(function() {

                if (atTop()) {
                    settings.show_top ? top_link.removeClass('jq-mid').addClass('jq-sml') : false;
                    settings.show_bottom ? bottom_link.removeClass('jq-mid').addClass('jq-big') : false;
                }
                else if (atBottom()) {
                    settings.show_top ? top_link.removeClass('jq-mid').addClass('jq-big') : false;
                    settings.show_bottom ? bottom_link.removeClass('jq-mid').addClass('jq-sml') : false;
                }
                else {
                    settings.show_top ? top_link.removeClass('jq-big jq-sml').addClass('jq-mid') : false;
                    settings.show_bottom ? bottom_link.removeClass('jq-big jq-sml').addClass('jq-mid') : false;
                }
            });

            $('body').append($div);

        }

        init();

    }

}));