<template>
    <form-section heading="Address">
        <form-google-place-lookup
            v-if="showLookup"
            @selected="placeSelected"/>

        <div
            v-if="!!$slots['before']"
            class="row">
            <slot name="before"/>
        </div>

        <div class="row">
            <form-text
                v-model="aValue.line_1"
                :property="`${property}.line_1`"
                class="col-md-12"
                label="Line 1"/>
            <form-text
                v-model="aValue.line_2"
                :property="`${property}.line_2`"
                class="col-md-12"
                label="Line 2"/>
        </div>

        <div class="row">
            <form-text
                v-model="aValue.city"
                :property="`${property}.city`"
                class="col-md-4"
                label="City"/>
            <form-state-select
                v-if="stateSelect"
                v-model="aValue.state"
                :property="`${property}.state`"
                class="col-md-4"
                label="State"/>
            <form-text
                v-else
                v-model="aValue.state"
                :property="`${property}.state`"
                class="col-md-4"
                label="State"/>
            <form-text-mask
                v-model="aValue.postal_code"
                :property="`${property}.postal_code`"
                class="col-md-4"
                label="Postal Code"
                placeholder="55555-5555"
                mask="#####-####"/>
        </div>

        <div class="row">
            <form-country-select
                v-if="stateSelect"
                v-model="aValue.country"
                :property="`${property}.country`"
                label="Country"
                class="col-md-4 col-md-offset-8"/>
        </div>

        <div
            v-if="includeCoordinates"
            class="row">
            <form-number
                :max="90"
                :min="-90"
                v-model="aValue.lat"
                :property="`${property}.lat`"
                label="Latitude"
                class="col-md-6" />
            <form-number
                :max="90"
                :min="-90"
                v-model="aValue.lng"
                :property="`${property}.lng`"
                label="Longitude"
                class="col-md-6"/>
        </div>

        <div
            v-if="!!$slots['after']"
            class="row">
            <slot name="after"/>
        </div>

        <p
            v-if="!!$slots['help']"
            class="help-block vf-help-block"><small><slot name="help"/></small></p>
    </form-section>
</template>

<script>

import { core } from './mixins'
import FormStateSelect from './FormStateSelect'
import FormCountrySelect from './FormCountrySelect'

import { GOOGLE_PLACE_INSTALL_ERROR_MESSAGE } from './FormGooglePlaceLookup'
import _ from 'lodash'

export default {
    components: {
        'form-state-select': FormStateSelect,
        'form-country-select': FormCountrySelect
    },
    mixins: [ core ],

    props: {
        includeLookup: {
            type: Boolean,
            default: false
        },

        includeCoordinates: {
            type: Boolean,
            default: false
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
        showLookup () {
            if (this.includeLookup) {
                const canShow = _.isFunction(_.get(window, 'google.maps.places.Autocomplete'))
                if (!canShow) {
                    console.error(GOOGLE_PLACE_INSTALL_ERROR_MESSAGE)
                    return false
                }
                return true
            }
            return false
        }
    },

    methods: {
        placeSelected (address) {
            const { line_1, city, state, postal_code, country, lat, lng } = address
            this.aValue = { line_1, city, state, postal_code, country, lat, lng }
        }
    }
}
</script>
