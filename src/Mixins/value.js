export default {
    data () {
        return {
            aValue: null
        }
    },

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
        });
    },

    watch : {
        aValue (change) {
            this.$emit('input', change);
            this.touched = true;
        },

        value (change) {
            this.aValue = change;
        }
    },
}