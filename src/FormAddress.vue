<template>
    <form-panel>
        <template slot='heading'>Address</template>
        <div class="row">
            <form-text class='col-md-12' label='Line 1' v-model='aValue.address_line1' :property='`${property}.address_line1`'></form-text>
            <form-text class='col-md-12' label='Line 2' v-model='aValue.address_line2' :property='`${property}.address_line2`'></form-text>
        </div>

        <div class="row">
            <form-text class='col-md-4' label='City' v-model='aValue.city' :property='`${property}.city`'></form-text>
            <form-state-select class='col-md-4' label='State' v-if='stateSelect' v-model='aValue.state' :property='`${property}.state`'></form-state-select>
            <form-text v-else class='col-md-4' label='State' v-model='aValue.state' :property='`${property}.state`'></form-text>
            <form-text-mask class='col-md-4' label='Postal Code' v-model='aValue.postal_code' placeholder='55555-5555' :property='`${property}.postal_code`' mask='#####-####'></form-text-mask>
        </div>

        <div class="row">
            <form-country-select
                v-model='aValue.country'
                :property='`${property}.country`'
                label='Country'
                class='col-md-4 col-md-offset-8'
                v-if='stateSelect'></form-country-select>
        </div>

        <div class='row' v-if='includeCoordinates'>
            <form-number
                :max='90'
                :min='-90'
                v-model='aValue.lat'
                :property='`${property}.lat`'
                label='Latitude'
                class='col-md-6' >
            </form-number>
            <form-number
                :max='90'
                :min='-90'
                v-model='aValue.lng'
                :property='`${property}.lng`'
                label='Longitude'
                class='col-md-6'>
            </form-number>
        </div>

        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </form-panel>
</template>


<script>

import { core } from './mixins'
import FormStateSelect from './FormStateSelect'
import FormCountrySelect from './FormCountrySelect'

export default {
    mixins: [ core ],
    components: {
        'form-state-select': FormStateSelect,
        'form-country-select': FormCountrySelect,
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
    }
}
</script>