# Floating Form Labels ([Demo](http://codepen.io/jChris85/pen/jrZypv))
Floating Form Labels takes [this concept from Matt D. Smit](https://dribbble.com/shots/1254439--GIF-Mobile-Form-Interaction) and wraps it into an easy to use jQuery plugin written by [jChris85](https://github.com/jChris85) and I. Take a look at [this blog post by Brad Frost](http://bradfrost.com/blog/post/float-label-pattern/) to understand why this is essential when dealing with inline form labels.

![Floating Form Labels Demo](https://cloud.githubusercontent.com/assets/412895/19565872/9ff91416-9712-11e6-8f2f-2e05fe6ac5d2.gif)

> But there are some other code snippets out there that do the same thing. Why do I need another one?

Floating Form Labels ...
* Is [UMD](https://github.com/umdjs/umd) capable (can be loaded with any module loader)
* Supports the placeholder attribute
* Is markup agnostic (works with nearly every markup)
* Works with _input_ **and** _textarea_ elements

## Installation
We recommend using a package manager to install Floating Form Labels as a dependency of your project. Please read the docs of the respective package manager if you don't know how to use it.
* [npm](https://www.npmjs.com/package/floating-form-labels): `npm install floating-form-labels`
* Bower: `bower install floating-form-labels`

You can add `--save` as a parameter if you want to add the plugin into your `package.json` or `bower.json`.

Alternatively, you can download the plugin directly from GitHub, unzip the folder and copy the file `floating-form-labels/dist/floatingFormLabels.min.js` into your project.

## Usage
### HTML
First group your _labels_ and _inputs_ into a container. These containers are the starting point for the JavaScript. We recommend to give them a unique class name. The plugin looks for a class named `ffl-wrapper` by default but you can change that if you wish.

It's a good idea to add a unique class to your _labels_ as well to avoid bugs if for example error messages are be added by validation or the like. By default we are looking for a _label_ named `ffl-label`.

```html
<div class="ffl-wrapper">
    <label class="ffl-label" for="input-1">Label for field 1</label>
    <input id="input-1" type="text">
</div>
<div class="ffl-wrapper">
    <label class="ffl-label" for="input-2">Label for field 2</label>
    <input id="input-2" type="text">
</div>
```

### JavaScript
Next you have to load the file `floating-form-labels/dist/floatingFormLabels.min.js` into your project and make sure that [jQuery](http://jquery.com/) is ready to use. You can do this by adding another script tag to your DOM or by using a module loader. Then you have to call the plugin with a selector that matches your wrapping containers.

```javascript
$('.ffl-wrapper').floatingFormLabels();
```

#### Options
| Option | Value | Default | Description |
|---|---|---|---|
| label | _String_ | '.ffl-label' | The selector string to find the _label_ that will be floated inside your wrapping container. |
| formElements | _String_ | 'input, textarea' | The _form_ elements that Floating Form Labels will watch. |
| floatedClass | _String_ | 'ffl-floated' | The class that is added to the DOM when a label becomes floated. |

#### Events
The following events are fired on your wrapping container:

| Event | Returns | Description |
|---|---|---|
| init.ffl | _Instance of plugin_ | Fires when Floating Form Labels is ready. |
| toggle.ffl | _Instance of plugin_ | Fires on every interaction with the _input_. |

#### Examples
If you don't have the control of your markup and want to add this plugin to some custom html.
```javascript
$('.your-custom-wrapper').floatingFormLabels({
    label: 'label',
    floatedClass: 'postponed'
});
```

If you want to check if a label is floated programmatically you use can use events for this.
```javascript
$('label#label-for-input-1').on('toggle.ffl', function (event, ffl) {
    // log out the current state of the label
    console.log(ffl.floated);
});
```

### Sass
By default Floating Form Labels just triggers some classes in the DOM. To see the desired effect you have to insert some CSS. You can write that for yourself or you can include our handy [Sass](http://sass-lang.com/) mixin that will do most of the work for you. Import the file `floating-form-labels/scss/floating-form-labels.scss` into your project and then include our mixin inside the selector of the wrapping container.
```scss
.ffl-wrapper {
    @include floating-form-labels($position-top, $reserved-space);
}
```
As you can see there are **two parameters our mixin expects**. The first one (`$position-top`) is used to move the _label_ from its regular position above the _input_ element. The second one (`$reserved-space`) is used to create a padding-top inside the wrapper to reserve the space for the _label_ to get floated.

> Why didn't you choose a better way to center the label above the input?

With a _normal_ CSS centering solution you could get in trouble when more markup is added into your wrapper container e.g. by a validation plugin.  Or in the case of _textareas_ you don't want to have a _true_ centering. This is why you have to move the _labels_ down using a static parameter. The `$reserved-space` is necessary so the _form_ doesn't jump when a _label_ becomes floated. We didn't want to negatively position the _labels_ because this could cause some trouble with foregoing form elements.

#### Settings
| Setting | Default | Description |
|---|---|---|
| $ffl-label | ".ffl-label" | The selector string to find the _label_ that will be floated inside your wrapping container. |
| $ffl-floatedClass | ".ffl-floated | The class that is added by the JavaScript. |
| $ffl-transition-duration | 200ms |  |
| $ffl-transition-easing | ease |  |

#### Example
You can change the markup to your own needs or speed up the transition simply by setting two variables.
```scss
$ffl-label: ".my-own-label-class";
$ffl-transition-duration: 100ms;

.your-custom-wrapper {
    @include floating-form-labels(0.7rem, 0.5rem);
}
```

## FAQ
> I've got some ajax content in my form. Is there an update method to init the plugin for this new fields?

You can simply call the plugin again after the ajax is done. The plugin won't get double initialized on the fields that are already present.

> I have nested my input element inside the _label_ to save the for attribute. Is this DOM structure also supported or do the input and the label elements need to be on the same level?

Yes this structure is also supported because Floating Form Label is markup agnostic. You only have to wrap the text of the _label_ inside an element (e.g. a `<span>`) that can be positioned above the _input_. For example your markup could look like this:

```html
<label class="ffl-wrapper">
    <span class="ffl-label">Label</span>
    <input type="text">
</label>
```
