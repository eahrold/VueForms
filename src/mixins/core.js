import values from './values'
import errors from './errors'
import props from './props'
import vf_uid from './vf_uid'

export default {
    mixins: [
        values,
        vf_uid,
        props,
        errors
    ]
}
