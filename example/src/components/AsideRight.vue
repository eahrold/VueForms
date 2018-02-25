<template>
    <aside class="col-md-4 h-100 o-scroll">
        <form-panel>
            <div class="list-group">
                <a v-for='(section, idx) in sections' @click.prevent.stop='scrollTo(section)' href="#" class="list-group-item">{{section}}</a>
            </div>
            <slot name='toggles'></slot>
        </form-panel>

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

          <button class='btn btn-default' :disabled='$validation.fails'>You Can Click Me When Valid</button>

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
        scrollTo(section) {
            window.document
                .getElementById(`section-${section}`)
                .scrollIntoView()

        }
    },
}
</script>

<style scoped lang="scss"></style>
