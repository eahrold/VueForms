<style scoped>
.error.list-unstyled {
    margin-bottom: 0;
}
.has-error .help-block {
    margin: 0;
}
</style>
<template>
<transition name='fade'>
    <ul v-if='hasError || hasWarning' class='error list-unstyled'>
        <li v-if='hasError' v-for='err in typeErrors'>
            <span class="help-block">{{ err }}</span>
        </li>
        <li v-if='!hasError && hasWarning'>
            <span class="help-block">{{ this.warning }}</span>
        </li>
    </ul>
</transition>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        property: {
            type: String,
            required: true
        },

        errors: {
            required: true
        },

        warning: {
            type: String,
            required: false
        }
    },

    computed: {
        typeErrors() {
            return _.get(this.errors, this.property);
        },

        hasError() {
            return Boolean(this.errors && !!this.typeErrors);
        },

        hasWarning() {
            return _.isString(this.warning) && this.warning.length
        },
    }
}
</script>
