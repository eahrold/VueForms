export default {
    watch : {
        aValue (change) {
            this.$emit('input', change);
            this.touched = true;
        },

        value (change) {
            this.aValue = change;
        }
    },

    methods : {
        autocomplete (event) {
            this.aValue = event.target.value;
        }
    }
}