<template>
    <div class="form-group form-check" :class='formClass'>
        <div class="checkbox">
            <label class="control-label form-check-label" :for="'checkbox-' + property">
                <input
                    class="form-check-input"
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

import { core } from './mixins';

export default {
    mixins: [ core ],
}
</script>
