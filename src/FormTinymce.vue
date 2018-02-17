<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }}</label>
        <vue-tinymce v-model='aValue'></vue-tinymce>
        <form-errors v-if='errors' :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, values } from './Mixins';
import VueTinymce from './Vue/VueTinymce.vue'

export default {
    components: {
        'vue-tinymce' : VueTinymce
    },

    mixins: [ props, errors, values ],
    props: {
        rows: {
            required: false,
            default: 3
        },
    },
}
</script>
