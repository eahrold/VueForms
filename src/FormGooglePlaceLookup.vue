<style scoped lang='scss'>
.vf-google-place-lookup {
    margin-top: 5px;
    margin-bottom: 15px;
}
</style>

<template>
    <input
        v-model="aValue"
        name="lookup"
        type="text"
        placeholder="Lookup Address..."
        class="form-control vf-google-place-lookup">
</template>

<script>

import _ from 'lodash'
import { values } from './mixins'

/* eslint-disable no-useless-escape */
export const GOOGLE_PLACE_INSTALL_ERROR_MESSAGE = `[VueForms] Google Places is not correctly installed. Make sure to include this script tag.\n\n\<script src="\/\/maps.googleapis.com\/maps\/api\/js?key=YOUR_API_KEY_HERE&libraries=places"\>\<\/script\>\n`
/* eslint-enable no-useless-escape */

const mapMapValues = function (place) {
    const { address_components, formatted_address } = place

    let address = {}
    _.forEach(address_components, (value) => {
        const type = _.get(value, 'types.0')
        if (type) {
            address[type] = value.short_name
        }
    })

    let line_1 = ''
    if (address.street_number) {
        line_1 = `${address.street_number}`
    }
    if (address.route) {
        line_1 += ` ${address.route}`
    }

    address.line_1 = line_1

    address.city = address.locality
    address.state = address.administrative_area_level_1
    address.formatted_address = formatted_address

    address.lat = place.geometry.location.lat()
    address.lng = place.geometry.location.lng()

    return _.pickBy(address, _.identity)
}

export default {
    mixins: [ values ],

    props: {
        types: {
            type: Array,
            default: () => { return ['geocode', 'establishment'] }
        }
    },

    mounted () {
        const MapsAutocomplete = _.get(window, 'google.maps.places.Autocomplete')
        if (!MapsAutocomplete) {
            console.error(GOOGLE_PLACE_INSTALL_ERROR_MESSAGE)
            return
        }

        const autocomplete = new MapsAutocomplete(
            (this.$el),
            {types: this.types}
        )

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()
            const address = mapMapValues(place)

            this.$emit('input', address.formatted_address)
            this.$emit('selected', address)
        })
    }
}
</script>
