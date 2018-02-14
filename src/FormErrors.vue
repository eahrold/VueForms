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
    <ul v-if='hasError' class='error list-unstyled'>
        <li v-for='err in typeErrors'>
            <span class="help-block">{{ err }}</span>
        </li>
    </ul>
</transition>
</template>

<script>
    export default {
        props: [
            'property',
            'errors',
        ],

        mounted() {},

        computed: {

            typeErrors() {
                return this.errors[this.property];
            },

            hasError() {
                return Boolean(this.errors && this.errors[this.property]);
            },

            formClass() {
                return [
                    { "has-error": this.hasError }
                ];
            },
        }
    }
</script>
