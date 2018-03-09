## VueForms

_A collection of form input and validation_

### To Start
in your app's entry point

```
import { VueFroms } from 'vue-forms'

const options = {
	... see the $vfconfig section ...
}

Vue.use(VueForms, options)
```


### Then in a component

```vue
<template>
  <form-text v-model='model.text'
    property='text'
    :errors='errors'>
    <template slot='help'>Some Help Text</template>
 </form-text>

  <form-text v-model='model.required_text'
    property='required_text'
    :placeholder='Placeholder text'
    :errors='errors'
    :required='true'>
    <template slot='help'>Some Required Help Text</template>
  </form-text>

  <form-text v-model='model.email'
    property='email'
    :errors='errors'
    :rules='[$validation.rules.email]'
    :required='true' />

   <!-- Using the validation -->
   <h2> Is The Form Valid{{ $validation.passes }} </h2>
   <button class='btn btn-default' :disabled='$validation.fails' @click='submit'></button>
</template>
```

```javascript
<script>
import { ValidationSyncMixin } from 'VueForms'

...
  mixins: [
    ValidationSyncMixin
  ],
  data() {
    return {

    model: {
        text: null,
        required_text: null,
        email: null,
      }
    }
...

</script>

```
**NOTE:** The `ValidationSyncMixin` takes keeps the current changes in the `$validator` synced to the DOM. If you don't include it status updates will be 1 render behind. it simply calls `this.$forceUpdate()`, so do not make it a global mixin

## VFConfig

`$vfconfig` is a global config object used throughout vue-forms.
The options property passed into `Vue.use(VueForms, options)` will be merged with $vfconfig 

```
headers: {
	... Any Headers to include in http requests buy default ...
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

## Validation

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

## VFAlert
`$vfalert` is a global for alert/confirm/toast

__Usage:__

Included this in your top level component

```html
<form-alert></form-alert>
```

Then you can 

```javascript
// For a flash alert
this.$vfalert.toast('hello there', 'success', {position, timeout})

// For an alert panel
this.$vfalert.alert('hello there', 'success', {timeout, errors})

// For a confirmation dialog
const options = {
	conrirmText: "Yep, let's go",
	cancelText: "No way, get me outta here!"
}
this.$vfalert.confirm('Are you sure you want to continue', 'success', options).then(()=>{
	// Confirm clicked...
}).catch(()=>{
	// Cancel Clicked...
})

```

### Specific Usage
- Date Range

```
<form-daterange
   :start.sync='start_prop'
   :end.sync='end_prop'
   :properties="['start_prop', 'end_prop']"
   label='Some Label'
   :errors='errors'>
</form-daterange>
```

- Dropzone

```
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

