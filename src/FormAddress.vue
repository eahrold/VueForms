<template>
    <form-panel>
        <template slot='heading'>Address</template>
        <div class="row">
            <form-text class='col-md-12' v-model='aValue.address_line1' property='address_line1'></form-text>
            <form-text class='col-md-12' v-model='aValue.address_line2' property='address_line2'></form-text>
        </div>

        <div class="row">
            <form-text class='col-md-5' v-model='aValue.city' property='city'></form-text>
            <form-state-select class='col-md-4' v-if='stateSelect' v-model='aValue.state' property='state' label='State'></form-state-select>
            <form-text v-else class='col-md-3'v-model='aValue.state' property='state'></form-text>
            <form-text-mask class='col-md-3' v-model='aValue.zip' property='zip' mask='00000-0000'></form-text-mask>
        </div>

        <div class="row">
            <form-text class='col-md-3 col-md-offset-9' v-model='aValue.country' property='country'></form-text>
        </div>

        <div class='row' v-if='includeCoordinates'>
            <form-text class='col-md-6' v-model='aValue.lat' property='lat' label='Latitude'></form-text>
            <form-text class='col-md-6' v-model='aValue.lng' property='lng' label='Longitude'></form-text>
        </div>

        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </form-panel>
</template>


<script>

import { props, errors, watchers } from './FormElementMixins'
import FormStateSelect from './FormStateSelect'

export default {
    mixins: [ props, errors, watchers ],
    components: {
        'form-state-select': FormStateSelect
    },

    props: {
        includeCoordinates: {
            type: Boolean,
            default: false,
        },

        stateSelect: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            aValue: { address_line1: '', address_line2: '', city: '', state: '', zip: '', lat: null, lng: null }
        }
    },

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
        });
    }
}
</script>