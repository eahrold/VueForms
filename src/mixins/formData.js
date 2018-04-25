import _ from 'lodash'

export default {
    methods: {
        /**
         * Convert a model to FormData for xhr submission
         * @param  Object model     The Data to submit
         * @param  String method    The method to spoof,  ["PUT", "POST"]
         *                          Note: Make sure to POST the actual xhr request!
         * @return FormData         FormData object
         */
        transformModelToFormData(model, method) {
            const formData = new FormData()
            formData.append('_method', method || 'POST');

            _.forOwn(model, (value, key)=>{
                if (value instanceof FileList) {
                    _.each(value, (file)=>{
                        formData.append(`${key}[]`, file);
                    })
                } else if (value instanceof Array) {
                    const serialize = (_.find(value, _.isObject) !== undefined)
                    _.each(value, (raw)=>{
                        const aValue = serialize ? JSON.stringify(raw) : raw;
                        formData.append(`${key}[]`, aValue);
                    })
                } else if (value instanceof Object) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            })
            return formData
        },
    }
}
