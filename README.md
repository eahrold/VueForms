# VueForms

_Toolkit for form input and validation_

## To Start
### In your app's entry point

```
import { VueFroms } from 'vue-forms'

const options = {
	... see the $vfconfig section ...
}

Vue.use(VueForms, options)
```


### Then in a component

```vue
<form-text
	v-model='model.text'
	property='text'
	:errors='errors'>
	<template slot='help'>Some Help Text</template>
</form-text>

<form-text
    v-model='model.required_text'
    property='required_text'
    :placeholder='Placeholder text'
    :errors='errors'
    :required='true'>
</form-text>

<form-text
	v-model='model.email'
   property='email'
   :errors='errors'
   :rules='[$validation.rules.email]'
   :required='true'>
</form-text>

<!-- Using the validation -->
<h2> Is The Form Valid{{ $validation.passes }} </h2>
<button class='btn btn-default'
	:disabled='$validation.fails'
	@click='submit'>
</button>

</template>
```

```javascript
<script>

...
data() {
	return {
   		model: {
       	text: null,
        	required_text: null,
        	email: null,
      	}
	}
}
...

</script>

```

## Using The Mixins
The benefit of this package is it's easily extensible
just use the mixins in a component (not globally)

```javascript
import { core } from 'vue-forms'

export default {
    mixins: [ core ],
    ...
}
```
And it'll add the errors, validation, and other goodies.

Additionally, this is an easy way to overwrite vue-form components. If for example you want to change the `<form-text />` layout, just create a component, use the core mixin, and register your new component,

```javascript
import MyFormText from './MyFormText'
Vue.component('form-text', MyFormText)
```


## [VFConfig](./src/prototypes/vfconfig.js)

`$vfconfig` is a global config object used throughout vue-forms.
The options property passed into `Vue.use(VueForms, options)` will be merged with $vfconfig

```
headers: {
	// Any Headers to include in http requests buy default ...
	Accept: 'application/json',
	Authorization: "Bearer XYZ..."
},

endpoints: {
    upload: null, // The endpoint for default file uploads, used by dropzone, tinymce, editor
    files: null, // An endpoint for getting a list of files, used for the file picker and media galleries
},

format: {
    date: 'MM/DD/YYYY', // Default date display (see moment.js for formats)
    time: 'h:mm A', // default time display (see moment.js for formats)
    dateValueFormat: null, // Format to use for the date value
},

dropzone: {
    maxFileSize: 10 // in MB
},

tinymce: {
    apiKey: null, // If you pull from tinymce cdn
    config: { // Any tinymce config values
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualchars',
            'searchreplace visualblocks fullscreen textcolor contextmenu',
            'insertdatetime media table contextmenu paste imagetools code'
        ],
        toolbar: `undo redo | insert code  | bold italic | alignleft aligncenter alignright alignjustify |
            bullist numlist outdent indent | link image vf_image_picker | styleselect fontselect fontsizeselect forecolor | visualblocks code`,
        css: '',
        menubar: true,
    }
},
```

## [Validation](./src/prototypes/validation.js)

You can attach a rule to any `<form-xyz :rules='[$validation.rule.url]' .../>` element
The rule can be a function, or an array of functions.

#### Rules
- `email`
- `url`
- `required`
- `number`
- `date`
- `match(value.to.match)`

The global `$validation` is added after VueForms is loaded. you can add additional rules by calling

```
this.$validation.addRule('rule_name', (value)=>{
	 if(value === 'somethig') return true
	 else return "That value is incorrect"
})

```
Rules must return `true` to pass validation. The returned string will be the error message.

__NOTE:__ All vue form elements have a `:required` prop that can be used as a shorthand.

## [VFAlert](./src/prototypes/vfalert.js)
`$vfalert` is a global for alert/confirm/toast

__Usage:__

Included this in your top level component

```html
<form-alert></form-alert>
```

Then you can

```javascript

// For a flash alert
const position = 'top' // 'bottom'
this.$vfalert.toast('hello there', 'success', {position, timeout})

// For an alert panel
this.$vfalert.alert('hello there', 'success', {timeout, errors})

// For a confirmation dialog
const message = 'Are you sure you want to continue'
const type = 'success'
const options = {
	conrirmText: "Yep, let's go",
	cancelText: "No way, get me outta here!"
}

this.$vfalert.confirm(message, type, options)
.then(()=>{
	// Confirm clicked...
})
.catch(()=>{
	// Cancel Clicked...
})

```

## Specific Usages
### Date Range

```vue
<form-daterange
   :start.sync='start_prop'
   :end.sync='end_prop'
   :properties="['start_prop', 'end_prop']"
   label='Some Label'
   :errors='errors'>
</form-daterange>
```

### Dropzone

```vue
<form-dropzone
    v-model='model.dropzone'
    label='File'
    property='images'
    type='SOME_MODEL_TYPE'
    :file-types='$vfconfig.fileTypes.any'
    :id='model.id'
    :errors='errors'>
</form-dropzone>
```

### Array Types
The following use the options mixin.
- `<form-select>`
- `<form-checkbox-group>`
- `<form-radio-button>`

```vue
<form-select
  v-model='model.select_example'
  property='select_example'
  :multiple='true'
  :options='options'
  :errors='errors'>
      <template slot='help'>
        <b>Current Val: {{ model.select_example }}</b>
      </template>
</form-select>
```

Options Mixin
```javascript

props: {
    options: {
        type: [Array, Object],
        required: false
    },

    /**
     * If the options array is an array of
     * objects, which key to use as the
     * value, eg [{text: "Great", value: 1}]
     * would have the label "Great"
     */
    textKey: {
        type: String,
        default: 'text'
    },

    /**
     * If the options array is an array of
     * objects, which key to use as the
     * value, eg [{text: "Great", value: 1}]
     * would result as 1 being the set value when
     * Great was selected
     * Setting the :value-key='false' will
     * result in the entire opt object being returned
     */
    valueKey: {
        type: [String, Boolean],
        default: 'value'
    },

    /**
     * If the options array is an array of objects
     * return the index of the object, rather than the
     * object as the emitted input.
     */
    useIndexAsValue: {
        type: Boolean,
        default: false
    },

    /**
     * If the :options passed in is an object,
     * return the key of the object, rather than the object value.
     * eg if :options='{ hello: "Hello there!", goodbye: "See you later!"}'
     * set this to true to return either "hello", or "goodbye", as the
     * emitted input
     */
    useKeyAsValue: {
        type: Boolean,
        default: false
    }
},

computed: {
    $_VF_OptionsMixin_optionsListIsObject () {
        return !isArray(this.options)
    }
},

methods: {
    optionDescription (opt) {
        if (isObject(opt)) {
            return opt[this.textKey]
        }
        return opt
    },

    optionValue (opt, indexOrKey) {
        if (!this.$_VF_OptionsMixin_optionsListIsObject && this.useIndexAsValue) return indexOrKey

        if (this.useKeyAsValue === true) {
            return indexOrKey
        }

        if (isObject(opt) && (this.valueKey !== false)) {
            return opt[this.valueKey]
        }
        return opt
    }
}
```
