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
            show_top: true,
            show_bottom: true,
            item_top: false,
            item_bottom: false,
            align: 'bottom right',
            navigation: [],
            margin: 100,
            speed: 1000,
            onBeforeMove: function(){},
            onAfterMove: function(){}
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

            settings.onBeforeMove.call(this);

            $('body').animate({
                scrollTop: target
            }, {
                duration: settings.speed,
                complete: settings.onAfterMove
            });

        }

        function getDocHeight() {
            return $doc.height();
        }

        function createTopLink() {

            var classes = 'jq-top jq-mid',
                anchor = '#',
                title = 'Go to Top',
                item_top = settings.item_top;

            if(item_top && typeof(item_top) == 'object'){
                item_top.attr('id') ? item_top.attr('id') : item_top.attr('id','jq-TOP');
                anchor = '#' + item_top.attr('id');
                title = item_top.attr('title') ? item_top.attr('title') : item_top.attr('data-title');
            }

            top_link = $('<a>')
                .addClass(classes)
                .attr('href', anchor)
                .attr('title', title)
                .html('&#9650;');

            top_link.on('click.' + classes, function(e) {
                if(item_top && typeof(item_top) == 'object') {
                    scrollTo(item_top.offset().top);
                }
                else {
                    scrollTo(0);
                }
                e.preventDefault();
            });

            $div.append(top_link);

        }

        function createNavigationLinks() {

            var classes = 'jq-item jq-sml',
                anchor = '#',
                title = '',
                navigation = settings.navigation;

            $.each(navigation, function(key, val){

                $(val).attr('id') ? $(val).attr('id') : $(val).attr('id','jq-' + parseInt($(val).offset().top));
                anchor = '#' + $(val).attr('id');

                title = $(val).attr('title') ? $(val).attr('title') : $(val).attr('data-title');

                var item_link = $('<a>')
                    .addClass(classes)
                    .attr('href', anchor)
                    .attr('title', title)
                    .html('&nbsp');

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

            var classes = 'jq-bottom jq-mid',
                anchor = '#',
                title = 'Go to Bottom',
                item_bottom = settings.item_bottom;

            if(item_bottom && typeof(item_bottom) == 'object'){
                item_bottom.attr('id') ? item_bottom.attr('id') : item_bottom.attr('id','jq-BOTTOM');
                anchor = '#' + item_bottom.attr('id');
                title = item_bottom.attr('title') ? item_bottom.attr('title') : item_bottom.attr('data-title');
            }

            bottom_link = $('<a>')
                .addClass(classes)
                .attr('href', anchor)
                .attr('title', title)
                .html('&#9660;');

            bottom_link.on('click.' + classes, function(e) {
                if(item_bottom && typeof(item_bottom) == 'object') {
                    scrollTo(item_bottom.offset().top + (item_bottom.outerHeight(true) - $win.height()));
                }
                else {
                    scrollTo(getDocHeight());
                }
                e.preventDefault();
            });

            $div.append(bottom_link);

        }

        function atTop() {

            var item_top = settings.item_top,
                ret = null;

            if(item_top && typeof(item_top) == 'object'){
                ret = $win.scrollTop() <= item_top.offset().top + settings.margin;
            }
            else {
                ret = $win.scrollTop() <= settings.margin;
            }

            return ret;
        }

        function atBottom() {

            var item_bottom = settings.item_bottom,
                ret = null;

            if(item_bottom && typeof(item_bottom) == 'object'){
                ret = $win.scrollTop() >= item_bottom.offset().top - $win.height() - settings.margin;
            }
            else {
                ret = $win.scrollTop() + $win.height() >= getDocHeight() - settings.margin;
            }

            return ret;

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