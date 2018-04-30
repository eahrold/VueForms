<template>
    <aside class="col-md-4 h-100 o-scroll">
        <form-section>
           <ul class="list-group">
                <li class="list-group-item" @click.prevent.stop='scrollTo(section)' v-for='(section, idx) in sections'>
                    <a  href="javascript:void(0)">{{section}}</a>
                </li>
            </ul>
            <slot name='toggles'></slot>
        </form-section>

        <form-section heading='Validation'>

          <form-panel>
            <p>Validation Passes: <code>{{ $validation.passes }}</code> </p>
            <p>Validation Fails: <code>{{ $validation.fails }}</code> </p>
          </form-panel>

          <form-panel>
            <h4>Faling Props</h4>
            <p v-for='(value, key) in $validation.failing'><code>{{key}}</code></p>
          </form-panel>

          <form-checkbox label='Show validation registry' v-model='showValidationRegistry' property='showValidationRegistry'></form-checkbox>
          <form-panel v-if='showValidationRegistry'>
            <p v-for='(value, key) in $validation.registry'><label>{{ key }}: </label><code>{{value}}</code></p>
          </form-panel>

            <label>Global Validation</label>
            <form-save-button
                :deletable='true'
                :saving='saving'
                :removing='removing'
                :disabled='$validation.fails'
                label='You can click when valid'
                @remove='remove'
                @save='save'>
            </form-save-button>
        </form-section>

        <form-section heading='Local Validation'>
            <form-text
              label="Stand Alone Validation"
              v-model='model.text_required_local'
              :validation='validation'
              :required='true'
              property='text_required_local'>
                <template slot='help'>
                  (Local) Validator Status <code>{{ `${validation.getStatus('text_required_local')}` }}</code>
                </template>
            </form-text>

            <form-file
                v-model='model.basic_file'
                property='basic_file'
                :accept='$vfconfig.fileTypes.any'
                :multiple='true'
                :required='true'
                :validation='validation'
                :errors='errors'>
            </form-file>

            <form-save-button
                :saving='saving'
                :disabled='validation.fails'
                label='You can click when valid'
                @remove='remove'
                @save='save'>
            </form-save-button>
        </form-section>

        <form-section heading='Properties'>
            <p v-for='(value, key) in model'><b>{{key}}: </b>{{ value }}</p>
        </form-section>
    </aside>
</template>

<script type="text/javascript">

import _ from 'lodash'

export default {

    mixins: [],
    props: {
        errors: {

        },
        model: {
            type: Object,
            required: true
        },

        validation: {
            type: Object,
            required: true
        }
    },

    //----------------------------------------------------------
    // Local State
    //-------------------------------------------------------
    data() {
        return {
            saving: false,
            removing: false,
            showValidationRegistry: false,
        }
    },

    computed: {
        sections() {
            return [
                'core',
                'array',
                'date-time',
                'alert',
                'file',
                'feature',
                'advanced-text-editor'
            ]
        }
    },

    //----------------------------------------------------------
    // Events
    //-------------------------------------------------------
    // watch: {},
    // mounted() {},
    // beforeDestroy() { /* dealloc anything you need to here*/ },

    //----------------------------------------------------------
    // Non-Reactive Properties
    //-------------------------------------------------------
    methods: {
        save() {
            this.saving = true;
            setTimeout(()=>{
                this.saving = false;
                const buttons = {
                    cancelText: "Close",
                    confirmText: "Keep Working on this"
                }
                this.$vfalert.confirm("Saved!", 'success', buttons).then(()=>{
                    this.$vfalert.success("Ok we'll keep working")
                }).catch(()=>{
                    this.$vfalert.info("Add nav back logic here...")
                })
            },1000)
        },

        remove() {
            this.removing = true;
            setTimeout(()=>{
                this.removing = false;
                this.$vfalert.warning("Deleted!")
            },1000)
        },

        scrollTo(section) {
            window.document
                .getElementById(`section-${section}`)
                .scrollIntoView()

        }
    },
}
</script>

<style scoped lang="scss"></style>
