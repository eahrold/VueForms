export default {
    computed: {
        vf_uid () {
            return this.makeVfUuid()
        }
    },

    methods: {
        makeVfUuid () {
            return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0
                /* eslint-disable eqeqeq */
                var v = c == 'x' ? r : (r & 0x3 | 0x8)
                /* eslint-enable eqeqeq */
                return v.toString(16)
            })
        }
    }
}
