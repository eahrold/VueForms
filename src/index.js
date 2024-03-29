import {
    core,
    props,
    errors,
    values,
    dates,
    options,
    vf_uid,
    formData
} from './mixins'

import {
    vfalert,
    vfconfig,
    ValidatorStore,
    ValidationSyncMixin
} from './prototypes'

import {
    dateFormats,
    fileTypes,
    selectUtil,
} from './data_sources'

import FormText from './FormText'
import FormFile from './FormFile'
import FormTextMask from './FormTextMask'
import FormNumber from './FormNumber'
import FormPassword from './FormPassword'

import FormSlider from './FormSlider'
import FormCheckbox from './FormCheckbox'

import FormSelect from './FormSelect'
import FormSelectMany from './FormSelectMany'

import FormRadioButton from './FormRadioButton'
import FormCheckboxGroup from './FormCheckboxGroup'
import FormSegmentedControl from './FormSegmentedControl'
import FormOptionsLists from './FormOptionsLists'
import FormOptionsListsScoped from './FormOptionsListsScoped'

import FormTextarea from './FormTextarea'
import FormTinymce from './FormTinymce'
import FormMarkdown from './FormMarkdown'
import FormCkeditor from './FormCkeditor'

import FormDateRange from './FormDateRange'
import FormDate from './FormDate'

import FormDropzone from './FormDropzone'
import FormDropzoneButton from './FormDropzoneButton'
import FormFilePicker from './FormFilePicker'
import FormFileEdit from './FormFileEdit'
import FormFileGallery from './FormFileGallery'

import FormSeoData from './FormSeoData'
import FormAddress from './FormAddress'
import FormStateSelect from './FormStateSelect'
import FormNamePrefixSelect from './FormNamePrefixSelect'
import FormNameSuffixSelect from './FormNameSuffixSelect'
import FormGooglePlaceLookup from './FormGooglePlaceLookup'

import FormPanel from './FormPanel'
import FormGroup from './FormGroup'
import FormSection from './FormSection'

import FormLoader from './FormLoader'
import FormAlert from './FormAlert'
import FormModal from './FormModal'
import FormProgressBar from './FormProgressBar'
import FormErrors from './FormErrors'
import FormSaveButton from './FormSaveButton'

export const VueForms = {
    install (Vue, options) {
        Vue.use(VueFormsCore, options)
        Vue.use(VueFormHelpers, options)

        /**
         * Components requiring all libs libs...
         */
        Vue.component('form-daterange', FormDateRange)
        Vue.component('form-date', FormDate)
        Vue.component('form-text-mask', FormTextMask)

        Vue.component('form-name-prefix-select', FormNamePrefixSelect)
        Vue.component('form-name-suffix-select', FormNameSuffixSelect)
        Vue.component('form-state-select', FormStateSelect)

        Vue.component('form-tinymce', FormTinymce)
        Vue.component('form-markdown', FormMarkdown)
        Vue.component('form-ckeditor', FormCkeditor)
        Vue.component('form-google-place-lookup', FormGooglePlaceLookup)

        Vue.component('form-dropzone', FormDropzone)
        Vue.component('form-dropzone-button', FormDropzoneButton)
        Vue.component('form-file-picker', FormFilePicker)
        Vue.component('form-file-edit', FormFileEdit)
        Vue.component('form-file-gallery', FormFileGallery)

        Vue.component('form-options-list', FormOptionsLists)
        Vue.component('form-options-list-scoped', FormOptionsListsScoped)
    }
}

/**
 * Core Components
 */
export const VueFormsCore = {
    install (Vue, option) {
        vfconfig.configure(option || {})

        Object.defineProperty(Vue.prototype, '$vfconfig', {
            get () {
                return vfconfig
            }
        })


        Object.defineProperty(Vue.prototype, '$vfselect', {
            get () {
                return selectUtil
            }
        })

        Vue.component('form-text', FormText)

        Vue.component('form-number', FormNumber)
        Vue.component('form-password', FormPassword)

        Vue.component('form-slider', FormSlider)
        Vue.component('form-checkbox', FormCheckbox)

        Vue.component('form-select', FormSelect)
        Vue.component('form-select-many', FormSelectMany)

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
    install (Vue, options) {
        Vue.component('form-loader', FormLoader)
        Vue.component('form-errors', FormErrors)
        Vue.component('form-save-button', FormSaveButton)
        Vue.component('form-modal', FormModal)
        Vue.component('form-alert', FormAlert)
        Vue.component('form-progress-bar', FormProgressBar)

        const validator = new ValidatorStore()

        Vue.mixin({
            data () {
                return {
                    VueForms_ValidatorStore: validator
                }
            }
        })

        Object.defineProperty(Vue.prototype, '$validation', {
            get () {
                return this.$root.VueForms_ValidatorStore
            }
        })

        Object.defineProperty(Vue.prototype, '$vfalert', {
            get () {
                return vfalert
            }
        })
    }
}

export { default as VueDropzone } from './vue/VueDropzone'

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
    FormSelectMany,
    FormRadioButton,
    FormCheckboxGroup,
    FormSegmentedControl,
    FormOptionsLists,
    FormOptionsListsScoped,

    FormDateRange,
    FormDate,

    FormDropzone,
    FormDropzoneButton,
    FormFilePicker,
    FormFileEdit,
    FormFileGallery,

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

    core,
    values,
    props,
    errors,
    dates,
    options,
    vf_uid,
    formData,

    ValidatorStore,
    ValidationSyncMixin,

    vfconfig,
    dateFormats,
    fileTypes
}
