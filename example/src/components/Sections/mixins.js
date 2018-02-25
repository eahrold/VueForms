export const section = {
    props: {
        value: {
            type: Object,
            required: true,
        },
        errors: {}
    },

    data() {
        return {
            model: this.value
        }
    },

    watch: {
        value(newVal) {
            this.model = newVal
        },

        model(newVal) {
            this.$emit('input', newVal)
        }
    }
}