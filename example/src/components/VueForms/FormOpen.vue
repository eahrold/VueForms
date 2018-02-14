<template>
    <form :id='name' :name='name' :enctype="enctype">
        <input type='hidden' id='_method' name='_method' v-model="method"/>
        <slot></slot>
        <form-save-button v-if='saves' :saving='saving' :is-dirty='isDirty' @save='save'></form-save-button>
    </form>
</template>

<script>
export default {
    props: {
        saves: {
            type: Boolean,
            default: true
        },

        isDirty: {
            type: Boolean,
            default: false
        },

        name: {
            type: String,
            required: true
        },

        method: {
            type: String,
            default: "POST"
        },

        multipart: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            saving: false
        }
    },

    mounted() {
        this.$nextTick(()=>{
            window.foo = this.$children;
        })
    },

    methods : {
        formData () {
            var fromData = new FormData(this.$el);
            return formData;
        },

        finally () {
            this.saving = false;
        },

        save () {
            this.saving = true;
            this.http.post(this.formData, (respose)=>{
                this.$emit('saved', respose);
                this.finally();
            },(respose)=>{
                this.$emit('error', respose);
                this.finally();
            });
        }
    },

    computed : {
        isValid() {
            const children = this.$children.filter((child)=>{
                return child.required;
            })

            const valid = false;
            for (var i = children.length - 1; i >= 0; i--) {
                if(!children[i].isValid === false) {
                    return false
                }
            }
            return true
        },

        enctype () {
            return this.multipart ?
                "multipart/form-data" :
                "application/x-www-form-urlencoded";
        }
    }
}
</script>