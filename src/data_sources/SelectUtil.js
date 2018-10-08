import _ from 'lodash'


const isSelectedArrayByKey = function(opt, value, localKey, foreignKey) {
    const alt = foreignKey || localKey
    return  !_.isEmpty(_.find(value, {[localKey]: opt[alt]}))
}

const isSelectedObjectByKey = function(opt, value, localKey, foreignKey) {
    const alt = foreignKey || localKey
    return _.get(opt, alt, false) === _.get(value, localKey, true)
}

const isSelectedByKey = function(localKey, foreignKey) {
    return function(opt, value) {
        if(_.isEmpty(value)) return false
        return _.isArray(value) ?
            isSelectedArrayByKey(opt, value, localKey, foreignKey) :
            isSelectedObjectByKey(opt, value, localKey, foreignKey)
    }
}

const valueByKey = function(key) {
    return function(opt, idx) {
        return _.get(opt, key)
    }
}

export default {
    isSelected: {
        includes: function(opt, value) {
            return _.includes(value, opt)
        },

        is: function(opt, value) {
            return _.isEqual(opt, value)
        },

        byKey: isSelectedByKey,
        byValue: isSelectedByKey("value"),
        byId: isSelectedByKey("id")
    },

    valueMap: {
        raw: function(opt, idx) {
            return opt
        },
        byIndex: function (opt, idx) {
            return idx
        },
        byKey: valueByKey,
        byValue: valueByKey('value'),
        byName: valueByKey('name'),
        byText: valueByKey('text'),
        byEmail: valueByKey('email'),
        byLabel: valueByKey('label'),
    }
}