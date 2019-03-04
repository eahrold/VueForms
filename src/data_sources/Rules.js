import _ from 'lodash'
import moment from 'moment'

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const HTTPS_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
const IMAGE_REGEX = /\.(gif|jpe?g|tiff|png|svg)$/i

export const required = function (value) {
    if (!_.isEmpty(value)) {
        return true
    }
    return false
}

export const number = function (value) {
    return _.isNumber(value)
}

export const email = function (value) {
    return EMAIL_REGEX.test(value)
}

export const url = function (value) {
    return HTTPS_REGEX.test(value)
}

export const date = function (value) {
    return moment(value).isValid()
}

export const max = function (max) {
    return function (value) {
        if (_.isString(value)) {
            return value.length <= max
        }
        if (_.isNumber(value)) {
            return value <= max
        }
        return true
    }
}

export const min = function (max) {
    return function (value) {
        if (_.isString(value) || _.isArray(value)) {
            return value.length > max
        }
        if (_.isNumber(value)) {
            return value > max
        }
        return true
    }
}

export const match = function (compared, label, response) {
    return function (value) {
        return (compared === value) || (response || false)
    }
}

export const image = function (value) {
    return _.isString(value) && IMAGE_REGEX.test(value)
}

export default {
    required,
    number,
    email,
    date,
    url,
    match,
    min,
    max,
}
