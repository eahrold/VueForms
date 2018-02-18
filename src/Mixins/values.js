export default {
    data() {
        return {
            aValue: this.value
        }
    },

    mounted() {
        this.$nextTick(() => {
            if (this.value !== this.aValue) {
                this.aValue = this.value;
            }
        });
    },

    watch: {
        aValue(change) {
            this.$emit('input', change);
            this.touched = true;
        },

        value(change) {
            this.aValue = change;
        }
    },

    methods: {
        autocomplete(event) {
            this.aValue = event.target.value;
        }
    }

}
