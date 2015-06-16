# jQuery Elevator

**Version 1.0.2**

An enhanced "back to top" and more, plugin for jQuery. With support for: top, bottom, sections, callbacks, smooth movement and fully customizable.

## Basic usage

Begin by call the **elevator** core:

```js
$(document).ready(function(){
    $.elevator();
});
```

### Defining position

You can customize **where** the **elevator** buttons panel should appear by using ```align``` argument:

```js
$(document).ready(function(){
    $.elevator({
        align: 'bottom right'   // default
    });
});
```

### Defining shape

You can customize **how** the **elevator** buttons panel should look by using ```shape``` argument:

```js
$(document).ready(function(){
    $.elevator({
        shape: 'circle'         // default
    });
});
```

### Defining speed

You can customize **when** the **elevator** should arrive by using ```speed``` argument:

```js
$(document).ready(function(){
    $.elevator({
        speed: '1000'           // default
    });
});
```

Those arguments: ```align```, ```shape``` and ```speed``` are totally optional and their default values are: ```bottom right```, ```circle``` and ```1000``` respectively.  

### Basic options

```js
$(document).ready(function(){
    $.elevator({

        align: 'top left'       // (string) Align to Top and Left of the page
        align: 'top right'      // (string) Align to Top and Right of the page
        align: 'bottom left'    // (string) Align to Bottom and Left of the page
        align: 'bottom right'   // (string) Align to Bottom and Right of the page

        shape: 'circle'         // (string) Circle shape for elevator buttons panel
        shape: 'rounded'        // (string) Rounded shape for elevator buttons panel
        shape: 'square'         // (string) Square shape for elevator buttons panel

        speed: 1000             // (integer) Speed of animation in milliseconds ( 1s )

    });
});
```

## Custom options

jQuery Elevator allow custom arguments to activate or set some functionalities on **elevator** element
 
### Defining new TOP and BOTTOM using elements

You can define an element of DOM which act as top or bottom for **elevator** using the arguments ```ìtem_top``` and ```ìtem_bottom```, setting a **jQuery Object** for this purpose:

```js
$(document).ready(function(){
    $.elevator({

        item_top: $('#element-as-top')

        item_bottom: $('#element-as-bottom')

    });
});
```

### Show or Hide the TOP and BOTTOM buttons

You can show or hide the TOP and BOTTOM buttons at **elevator** buttons panel, using the arguments ```show_top``` and ```show_bottom```. Those buttons are default enabled:

```js
$(document).ready(function(){
    $.elevator({

        show_top: true          // default

        show_bottom: true       // default

    });
});
```

### Defining a margin zone on TOP and BOTTOM

You can extended the TOP or BOTTOM zone with an extra margin, using the argument ```margin```. While you are moving inside or outside the zone the **elevator** objects modify its appearance to make more intuitive.  

```js
$(document).ready(function(){
    $.elevator({

        margin: 100             // (integer) default - extra margin in pixels

    });
});
```

### Defining the sections list

You can use a **jQuery Object** or an **array of jQuery Objects** to define a section list which the **elevator** will turn into buttons panel using the argument ```navigation```:
 
```js
$(document).ready(function(){
    $.elevator({

        navigation: $('h2')     // (object) section list based on H2 elements
        
        navigation: [           // (array) section list based on different elements

            $('h1'),
            $('h2.section_1'),
            $('h2.section_2'),
            $('h3')

        ]

    });
});
```

Those new section buttons can show a ```title``` if you define a ```data-title``` attribute in the right HTML element corresponding to the jQuery Object:

```html
<html>
    <body>
    
        <h1 data-title="Important Stuff">Lorem ipsum dolor sit amet<h1>
    
    </body>
</html>
```

### Activating text on section buttons

You can also show as content on section buttons at **elevator** buttons panel, the text defined in the HTML attribute ```data-title``` setting to ```true``` the attribute ```navigation_text```:
 
```js
$(document).ready(function(){
    $.elevator({

        navigation_text: true   // default: false

    });
});
```

## Callbacks

You can also use your own functions and code based on what happened while **elevator** is working using the callback functions provided:

```js
$(document).ready(function(){
    $.elevator({

        onBeforeMove: function(){}          // Execute Order: 0
        
            onBeforeGoTop: function(){}     // Execute Order: 1
            onAfterGoTop: function(){}      // Execute Order: 2
        
            onBeforeGoBottom: function(){}  // Execute Order: 1
            onAfterGoBottom: function(){}   // Execute Order: 2
        
            onBeforeGoSection: function(){} // Execute Order: 1
            onAfterGoSection: function(){}  // Execute Order: 2

        onAfterMove: function(){}           // Execute Order: 3

    });
});
```

## Options Summary

This is the full options list able for jQuery-elevator:

```js
$(document).ready(function(){
    $.elevator({

        align: 'bottom right',               // options: (string) 'top left' | 'top right' 
                                             //                   'bottom left' | 'bottom right' 

        shape: 'circle',                     // options: (string) 'circle' (default) | 'rounded' | 'square'

        speed: 1000,                         // options: (integer) 1000 (default | milliseconds)

        item_top: $('#item-as-top'),         // options: (object) null (default)

        item_bottom: $('#item-as-bottom'),   // options: (object) null (default)

        show_top: true,                      // options: (boolean) true (default) | false
        
        show_bottom: true,                   // options: (boolean) true (default) | false

        margin: 100,                         // options: (integer) 100 (default)

        navigation: $('h2'),                 // options: (object) | array[(object)]

        navigation_text: false,              // options: (boolean) true | false (default)

        onBeforeMove: function(){},          // Execute Order: 0
        
            onBeforeGoTop: function(){},     // Execute Order: 1
            onAfterGoTop: function(){},      // Execute Order: 2
        
            onBeforeGoBottom: function(){},  // Execute Order: 1
            onAfterGoBottom: function(){},   // Execute Order: 2
        
            onBeforeGoSection: function(){}, // Execute Order: 1
            onAfterGoSection: function(){},  // Execute Order: 2

        onAfterMove: function(){}            // Execute Order: 3

    });
});
```

```html
<html>
    <body>
    
        <h2 data-title="Title for Section">Lorem ipsum dolor sit amet<h2>
    
    </body>
</html>
```

## Contributors

+ Salvador Saldaña
+ Pablo Rosales