# Jquery Elevator

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
        align: 'bottom right'
    });
});
```

### Defining shape

You can customize **how** the **elevator** buttons panel should look by using ```shape``` argument:

```js
$(document).ready(function(){
    $.elevator({
        shape: 'circle'
    });
});
```

### Defining speed

You can customize **when** the **elevator** should arrive by using ```speed``` argument:

```js
$(document).ready(function(){
    $.elevator({
        speed: '1000'
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

## Contributors

+ Salvador Saldaña
+ Pablo Rosales