import {
    props,
    errors,
    watchers,
    dates,
    options,
    formData,
} from './Mixins'

import {
    validation,
    vfconfig
} from './Prototypes'

import FormText from './FormText'
import FormFile from './FormFile'

import FormTextMask from './FormTextMask'
import FormNumber from './FormNumber'
import FormPassword from './FormPassword'
import FormSlider from './FormSlider'
import FormCheckbox from './FormCheckbox'
import FormCheckboxGroup from './FormCheckboxGroup'


import FormSelect from './FormSelect'
import FormSelectize from './FormSelectize'
import FormRadioButton from './FormRadioButton'
import FormTextarea from './FormTextarea'
import FormTinymce from './FormTinymce'
import FormDateRange from './FormDateRange'
import FormDate from './FormDate'
import FormPanel from './FormPanel'
import FormGroup from './FormGroup'
import FormDropzone from './FormDropzone'

import FormSeoData from './FormSeoData'
import FormAddress from './FormAddress'

import FormLoader from './FormLoader'
import FormModal from './FormModal'

import FormErrors from './FormErrors'
import FormSaveButton from './FormSaveButton'

/**
 * Core Components
 */
export const VueFormsCore = {
    install (Vue, Option) {

        Vue.component('form-text',   FormText)

        Vue.component('form-number', FormNumber)
        Vue.component('form-password',   FormPassword)

        Vue.component('form-slider', FormSlider)
        Vue.component('form-checkbox', FormCheckbox)

        Vue.component('form-select', FormSelect)

        Vue.component('form-radio-button',  FormRadioButton)
        Vue.component('form-checkbox-group',  FormCheckboxGroup)

        Vue.component('form-textarea', FormTextarea)

        Vue.component('form-file', FormFile)

        Vue.component('form-panel', FormPanel)
        Vue.component('form-group', FormGroup)

        vfconfig.configure(options)
        Vue.prototype.$vfconfig = vfconfig
    }
}

export const VueForms = {
    install (Vue, options) {

        Vue.use(VueFormsCore, options)
        Vue.use(VueFormHelpers, options)

        /**
         * Components requiring all libs libs...
         */
        Vue.component('form-daterange', FormDateRange)
        Vue.component('form-date', FormDate)
        Vue.component('dropzonejs', require('./Vue/VueDropzone.vue'))
        Vue.component('tinymce', require('./Vue/VueTinymce.vue'))
        Vue.component('form-text-mask',   FormTextMask)
        Vue.component('form-selectize', FormSelectize)
        Vue.component('form-tinymce', FormTinymce)
        Vue.component('form-dropzone', FormDropzone)
        Vue.component('form-seo', FormSeoData)
        Vue.component('form-address', FormAddress)

    }
}

/**
 * Helpers
 */
export const VueFormHelpers = {
    install (Vue, options) {
        Vue.component('form-loader', FormLoader)
        Vue.component('form-errors', FormErrors)
        Vue.component('form-save-button', FormSaveButton)
        Vue.component('form-modal',   FormModal)

        Vue.prototype.$validation = validation
    }
}

export { ValidationSyncMixin, ValidationEvents } from './Prototypes/validation'

export {
    FormText,
    FormTextMask,
    FormTextarea,
    FormTinymce,
    FormPassword,
    FormNumber,
    FormFile,

    FormSlider,
    FormCheckbox,

    FormSelect,
    FormSelectize,
    FormRadioButton,

    FormDateRange,
    FormDate,

    FormPanel,
    FormGroup,
    FormDropzone,
    FormSeoData,

    FormLoader,
    FormErrors,
    FormSaveButton,
    FormModal,

    props,
    errors,
    watchers,
    dates,
    options,
    validation,
    formData,
}