<template>
    <div class="form-group row">
        <div class="col-md-12 text-right">
            <button v-if='deletable' @click='remove()'
                class="btn btn-danger btn-delete btn-block"
                :class="{ 'active': saving }"
                :disabled="saving">
                <i v-if='saving' class="fa fa-spinner fa-spin"></i>
                Delete
            </button>

            <slot name='before'></slot>

            <button @click='save()'
                class="btn btn-primary btn-save btn-block"
                :class="{ 'active': saving, 'btn-dirty' : isDirty }"
                :disabled="saving || disabled">
                <i v-if='saving' class="fa fa-spinner fa-spin"></i>
                {{ (saving ? altLabel : label) }}
            </button>

            <slot name='after'></slot>

        </div>
    </div>
</template>

<script>
    export default {
        props : {
            isDirty: {
                type: Boolean,
                default: false
            },

            saving: {
                type: Boolean,
                default: false
            },

            deletable: {
                type: Boolean,
                default: false
            },

            disabled: {
                type: Boolean,
                default: false
            },

            label: {
                type: String,
                default: "Save"
            },

            altLabel: {
                type: String,
                default: "Saving..."
            },

            confirmRemove: {
                type: Boolean,
                default: true
            },

            removeMessage: {
                type: String,
                default: "Are you sure you want to delete this item?",
            },

            removeConfirmText: {
                type: String,
                default: "Yes delete this",
            },

            removeCancelText: {
                type: String,
                default: "No, I pressed the wrong button",
            }
        },

        data () {
            return {
                exit: false
            }
        },

        methods : {
            save() {
                this.$emit('save', this.exit);
            },

            remove() {
                if(this.confirmRemove === false) {
                    return this.$emit('remove');
                }

                const message = this.removeMessage
                const confirmText = this.removeConfirmText
                const cancelText = this.removeCancelText

                if(this.$vfalert && this.$vfalert.hasFormAlert()) {
                    let buttons = {
                        confirmText,
                        cancelText
                    }
                    this.$vfalert.confirm(message, 'warning', buttons).then((status)=>{
                        this.$emit('remove');
                    }).catch(()=>{
                        this.$vfalert.success("Cancelled. The item is safe.")
                    })
                    return;
                }

                if (confirm(message)) {
                    this.$emit('remove');
                }
            }
        }
    }
</script>

<style scoped>
button:disabled,
button[disabled]{
    cursor: not-allowed;
}

.btn.btn-save {
    min-width: 110px;
}

.btn.btn-dirty {
  -webkit-animation: pulse 1.5s infinite;
}

@-webkit-keyframes pulse {
  0% {

  }
  70% {
    opacity: 0.8;
  }
    100% {
  }
}
</style>