# VueForms
## (...coming soon)
### Vue form input helpers.

Here's a collection of form input and validation 

### To Start 
in your app's entry point

```
import { VueFroms } from './VueForms'
Vue.use(VueForms)
```


### Then in a component

```html
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