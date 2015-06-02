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
            show_bottom: true,
            navigation: [],
            margin: 100
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
            }, 1000);
        }

        function getDocHeight() {
            return $doc.height();
        }

        function bottomLink() {

            var _class = 'jq-elevator-bottom';

            bottom_link = $('<a>')
                .addClass(_class)
                .attr('href', '#' + _class)
                .html('&#9660;');

            bottom_link.on('click.' + _class, function(e) {
                scrollTo(getDocHeight());
                e.preventDefault();
            });

            $div.append(bottom_link);

        }

        function topLink() {

            var _class = 'jq-elevator-top';

            top_link = $('<a>')
                .addClass(_class)
                .attr('href', '#') // # points to the top of the page
                .html('&#9650;');

            top_link.on('click.' + _class, function(e) {
                scrollTo(0);
                e.preventDefault();
            });

            $div.append(top_link);

        }

        function navigationLinks() {

        }

        function align() {

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

        function atTop() {
            return $doc.scrollTop() <= settings.margin;
        }

        function atBottom() {
            return $win.scrollTop() + $win.height() > getDocHeight() - settings.margin;
        }

        function init() {

            $div.addClass('jq-elevator');

            align();

            if (settings.show_top) {
                topLink();
            }

            if (settings.navigation.length > 0) {
                navigationLinks();
            }

            if (settings.show_bottom) {
                bottomLink();
            }

            if (atBottom()) {
                bottom_link.addClass('item');
            }
            else if (atTop()) {
                top_link.addClass('item');
            }

            $doc.scroll(function() {
                if (atTop()) {
                    top_link.addClass('item');
                    bottom_link.removeClass('item');
                }
                else if (atBottom()) {
                    bottom_link.addClass('item');
                    top_link.removeClass('item');
                }
                else {
                    top_link.removeClass('item');
                    bottom_link.removeClass('item');
                }
            });

            $('body').append($div);

        }

        init();

    }

}));