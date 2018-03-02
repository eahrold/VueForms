<template>
    <aside class="col-md-4 h-100 o-scroll">
        <form-section>
           <ul class="navbar-nav">
                <li v-for='(section, idx) in sections'>
                    <a @click.prevent.stop='scrollTo(section)' href="#" class="nav-item">{{section}}</a>
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

            <form-save-button
                :deletable='true'
                :saving='saving'
                :disabled='$validation.fails'
                @remove='remove'
                label='You can click when valid'
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
        model: {
            type: Object,
            required: true
        },
    },

    //----------------------------------------------------------
    // Local State
    //-------------------------------------------------------
    data() {
        return {
            saving: false,
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
                this.$vfalert.success("Saved!")
            },1000)
        },

        remove() {
            this.saving = true;
            setTimeout(()=>{
                this.saving = false;
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
