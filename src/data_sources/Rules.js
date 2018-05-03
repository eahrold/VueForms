import _ from 'lodash'

/* eslint-disable no-useless-escape */
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const HTTPS_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
const IMAGE_REGEX = /\.(gif|jpe?g|tiff|png)$/i
/* eslint-enable no-useless-escape */

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

export const match = function (compared, label) {
    return function (value) {
        return (compared === value)
    }
}

export const image = function (value) {
    return _.isString(value) && IMAGE_REGEX.test(value)
}

export default {
    required,
    number,
    email,
    url,
    match
}
