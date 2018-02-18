<template>
    <div class="form-group" :class='formClass'>
        <div class="checkbox">
            <label class="control-label" :for="'checkbox-' + property">
                <input
                    v-model='aValue'
                    :id="'checkbox-' + property"
                    type="checkbox">{{ aLabel }}
            </label>
        </div>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],
}
</script>
