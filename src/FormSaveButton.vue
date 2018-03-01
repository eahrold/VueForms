<template>
    <div class="form-group row">
        <div class="col-md-12 text-right">
            <div v-if='deletable' @click='remove()'
                class="btn btn-danger btn-delete"
                :class="{ 'active': saving }"
                :disabled="saving">
                <i v-if='saving' class="fa fa-spinner fa-spin"></i>
                Delete
            </div>

            <slot name='before'></slot>

            <div @click='save()'
                class="btn btn-primary btn-save"
                :class="{ 'active': saving, 'btn-dirty' : isDirty }"
                :disabled="saving">
                <i v-if='saving' class="fa fa-spinner fa-spin"></i>
                {{ (saving ? "Saving..." : label) }}
            </div>

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

            label: {
                type: String,
                default: "Save"
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
                if (confirm("Are you sure you want to delete this item?")) {
                    this.$emit('remove');
                }
            }
        }
    }
</script>

<style scoped>
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