<template>
    <form-section heading='Address'>
        <form-google-place-lookup v-if='showLookup' @selected='placeSelected'></form-google-place-lookup>

        <div v-if="!!$slots['before']" class="row">
            <slot name='before'></slot>
        </div>

        <div class="row">
            <form-text class='col-md-12' label='Line 1' v-model='aValue.line_1' :property='`${property}.line_1`'></form-text>
            <form-text class='col-md-12' label='Line 2' v-model='aValue.line_2' :property='`${property}.line_2`'></form-text>
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

        <div v-if="!!$slots['after']" class="row">
            <slot name='after'></slot>
        </div>

        <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
    </form-section>
</template>


<script>

import { core } from './mixins'
import FormStateSelect from './FormStateSelect'
import FormCountrySelect from './FormCountrySelect'

import  { GOOGLE_PLACE_INSTALL_ERROR_MESSAGE } from './FormGooglePlaceLookup'

export default {
    mixins: [ core ],
    components: {
        'form-state-select': FormStateSelect,
        'form-country-select': FormCountrySelect,
    },

    props: {
        includeLookup: {
            type: Boolean,
            default: false,
        },

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
            aValue: { line_1: '', line_2: '', city: '', state: null, postal_code: '', country: null, lat: null, lng: null }
        }
    },

    computed: {
        showLookup() {
            if (this.includeLookup) {
                const canShow = _.isFunction(_.get(window, 'google.maps.places.Autocomplete'))
                if( ! canShow) {
                    console.error(GOOGLE_PLACE_INSTALL_ERROR_MESSAGE)
                    return false;
                }
                return true;
            }
            return false;
        }
    },

    methods: {
        placeSelected(address) {
            const { line_1, city, state, postal_code, country, lat, lng, } = address
            this.aValue = { line_1, city, state, postal_code, country, lat, lng, }
        }
    }
}
</script>