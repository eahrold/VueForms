import _ from 'lodash'

export default {
    methods: {
        formData(file_elems, method) {
            // This is an example of how to attach File input to the form submission.
            var keys = _.keys(this.model);
            var data = this.formDataFromModel(keys, method);

            _.each(file_elems, (el) => {
                var image = document.getElementById(file_elems).files[0];
                data.append(file_elems, image || null);
            })

            return data;
        },

        formDataFromModel(fillables, method) {
            var data = new FormData();
            data.append('_method', method || 'POST');

            _.each(fillables, (key) => {
                var val = _.get(this.model, key, null);
                if (val instanceof Object || val instanceof Array) {
                    val = JSON.stringify(val);
                }
                data.append(key, val);
            });
            return data;
        },
    }
}
