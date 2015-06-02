(function($) {
 
    $.elevator = function(sections, options) {

        var defaults = {
                align_left: false,
                align_top: false,
                top: true,
                bottom: true,
                nav: false,
                margin: 100
            },
            asClass = function (c) { return c.replace('.', ''); },
            asId = function (c) { return c.replace('#', ''); },
            settings = $.extend({}, defaults, options),
            selectors = {
                elevator: '.elevator',
                top: '.jelevator-document-anchor-top',
                bottom: '.jelevator-document-anchor-bottom',
                section: '.jelevator-section-list',
                anchor: '.jelevator-section-anchor',
                anchor_top: '#jelevator-top',
                anchor_bottom: '#jelevator-bottom'
            };

        function createElement(elem, classes) {
            return $(elem).addClass(asClass(classes));
        }

        var align_horizontal = settings.align_left == true ? 'align-left' : 'align-right';
        var align_vertical = settings.align_top == true ? 'align-top' : 'align-bottom';
        var dom = $('<div>').addClass('jelevator ' + align_horizontal + ' ' + align_vertical);
        
        /**
         * Create the top anchor
         */
        function createTopAnchor() {
            return createElement('<div>', selectors.elevator).attr('id', asId(selectors.anchor_top));
        }
        
        /**
         * Create the go to top link
         */
        function createTopLink() {
            return createElement('<a>', selectors.top).attr('href', selectors.anchor_top).html('&#9650;');
        }
        
        /**
         * Create the bottom anchor
         */
        function createBottomAnchor() {
            return createElement('<div>', selectors.elevator).attr('id', asId(selectors.anchor_bottom));
        }
        
        /**
         * Create the go to bottom link
         */
        function createBottomLink() {
            return createElement('<a>', selectors.bottom).attr('href', selectors.anchor_bottom).html('&#9660;');
        }
        
        /**
         * Create the navigation for sections
         */
        function createNav() {
            return createElement('<nav>', selectors.section);
        }
        
        /**
         * Create a single link for sections
         */
        function createSectionLink(name, title) {
            return createElement('<a>', selectors.anchor).attr('href', name).text(title);
        }
        
        /**
         * Create the links for sections
         */
        function createSectionsLinks() {
            var links = [];
            sections.forEach(function(element) {
                links.append(createSectionLink(element.name, element.title));
            });
        }
    
        /**
         * Create all the needed elements and append to body
         */
        function createUI() {
            
            var bottom, 
                nav,
                nav_list,
                top,
                $body = $('body');

            if (settings.bottom) {
                $body.append(createBottomAnchor());
                bottom = createBottomLink();
                dom.append(bottom);
            }

            if (settings.nav) {
                nav = createNav();
                nav_list = createSectionsLinks();
                dom.append(nav);
            }

            if (settings.top) {
                $body.prepend(createTopAnchor());
                top = createTopLink();
                dom.append(top);
            }
            
            $body.append(dom);
            
        }
        
        /**
         * Add click event to button
         */
        function addScrollClickEvent(elem, target) {
            // TODO: Check AJAX implementation support
            $(elem).click(function() {
                $("html, body").animate({
                    scrollTop: target
                }, 1000);
                return false;
            });
        }
        
        /**
         * Add scroll position detection event
         */
        function addScrollDetectEvent() {
            var $win = $(window);
            var $doc = $(document);
            var height = $doc.height();
            var margin = settings.margin;
            $doc.scroll(function() {
                var pos = $doc.scrollTop();
                var at_top = pos <= margin;
                var at_bottom = $win.scrollTop() + $win.height() > height - margin;
                if (at_top) {
                    $(selectors.top).addClass('item');
                    $(selectors.bottom).removeClass('item');
                }
                else if (at_bottom) {
                    $(selectors.top).removeClass('item');
                    $(selectors.bottom).addClass('item');
                }
            });
        }
        
        /**
         * Add the needed events
         */
        function addEvents() {
            addScrollClickEvent(selectors.bottom, $(document).height());
            addScrollClickEvent(selectors.top, 0);
            addScrollDetectEvent();
        }
        
        // Init
        
        createUI();
        addEvents();
 
    };
    
}(jQuery));

/* -- HTML Prototype
----> ??
<div class="jelevator align-right align-bottom">
    <!-- class="align-left" -->
    <!-- class="align-right" -->
    <!-- class="align-top" -->
    <!-- class="align-bottom" -->

    <a href="#Document.BottomAnchor" class="jelevator-document-anchor-bottom">&#9660;</a>
        <!-- class="list-element" -->

    <!--
    <nav class="jelevator-section-list">
    
        <a href="#Section.anchor" class="jelevator-section-anchor">Section.Title</a>
        
    </nav>
    -->

        <!-- class="list-element" -->
    <a href="#Document.TopAnchor" class="jelevator-document-anchor-top">&#9650;</a>

</div>
----> ??
-- */