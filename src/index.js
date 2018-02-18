import {
    props,
    errors,
    values,
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

import FormSelect from './FormSelect'
import FormSelectize from './FormSelectize'
import FormRadioButton from './FormRadioButton'
import FormCheckboxGroup from './FormCheckboxGroup'
import FormSegmentedControl from './FormSegmentedControl'
import FormOptionsLists from './FormOptionsLists'

import FormTextarea from './FormTextarea'
import FormTinymce from './FormTinymce'
import FormMarkdown from './FormMarkdown'

import FormDateRange from './FormDateRange'
import FormDate from './FormDate'

import FormDropzone from './FormDropzone'
import FormDropzoneButton from './FormDropzoneButton'
import FormFilePicker from './FormFilePicker'

import FormSeoData from './FormSeoData'
import FormAddress from './FormAddress'
import FormStateSelect from './FormStateSelect'
import FormNamePrefixSelect from './FormNamePrefixSelect'
import FormNameSuffixSelect from './FormNameSuffixSelect'

import FormPanel from './FormPanel'
import FormGroup from './FormGroup'
import FormSection from './FormSection'

import FormLoader from './FormLoader'
import FormModal from './FormModal'
import FormProgressBar from './FormProgressBar'
import FormErrors from './FormErrors'
import FormSaveButton from './FormSaveButton'

export const VueForms = {
    install(Vue, options) {

        Vue.use(VueFormsCore, options)
        Vue.use(VueFormHelpers, options)

        /**
         * Components requiring all libs libs...
         */
        Vue.component('form-daterange', FormDateRange)
        Vue.component('form-date', FormDate)
        Vue.component('form-text-mask', FormTextMask)
        Vue.component('form-selectize', FormSelectize)

        Vue.component('form-name-prefix-select', FormNamePrefixSelect)
        Vue.component('form-name-suffix-select', FormNameSuffixSelect)
        Vue.component('form-state-select', FormStateSelect)

        Vue.component('form-tinymce', FormTinymce)
        Vue.component('form-markdown', FormMarkdown)
        Vue.component('form-dropzone', FormDropzone)
        Vue.component('form-dropzone-button', FormDropzoneButton)
        Vue.component('form-file-picker', FormFilePicker)

        Vue.component('form-options-list', FormOptionsLists)

    }
}

/**
 * Core Components
 */
export const VueFormsCore = {
    install(Vue, option) {
        vfconfig.configure(option)
        Vue.prototype.$vfconfig = vfconfig

        Vue.component('form-text', FormText)

        Vue.component('form-number', FormNumber)
        Vue.component('form-password', FormPassword)

        Vue.component('form-slider', FormSlider)
        Vue.component('form-checkbox', FormCheckbox)

        Vue.component('form-select', FormSelect)

        Vue.component('form-radio-button', FormRadioButton)
        Vue.component('form-checkbox-group', FormCheckboxGroup)
        Vue.component('form-segmented-control', FormSegmentedControl)

        Vue.component('form-textarea', FormTextarea)

        Vue.component('form-file', FormFile)

        Vue.component('form-panel', FormPanel)
        Vue.component('form-group', FormGroup)
        Vue.component('form-section', FormSection)

        Vue.component('form-seo', FormSeoData)
        Vue.component('form-address', FormAddress)
    }
}

/**
 * Helpers
 */
export const VueFormHelpers = {
    install(Vue, options) {
        Vue.component('form-loader', FormLoader)
        Vue.component('form-errors', FormErrors)
        Vue.component('form-save-button', FormSaveButton)
        Vue.component('form-modal', FormModal)
        Vue.component('form-progress-bar', FormProgressBar)

        Vue.prototype.$validation = validation
    }
}

export { ValidationSyncMixin, ValidationEvents } from './Prototypes/validation'

export {
    FormText,
    FormTextMask,
    FormTextarea,
    FormTinymce,
    FormMarkdown,
    FormPassword,
    FormNumber,
    FormFile,

    FormSlider,
    FormCheckbox,

    FormSelect,
    FormSelectize,
    FormRadioButton,
    FormCheckboxGroup,
    FormSegmentedControl,
    FormOptionsLists,

    FormDateRange,
    FormDate,

    FormDropzone,
    FormDropzoneButton,
    FormFilePicker,

    FormPanel,
    FormGroup,
    FormSection,

    FormAddress,
    FormSeoData,

    FormLoader,
    FormErrors,
    FormSaveButton,
    FormProgressBar,
    FormModal,

    values,
    props,
    errors,
    dates,
    options,
    formData,

    validation,
    vfconfig,
}
