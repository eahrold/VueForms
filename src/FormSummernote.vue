<template>
    <textarea></textarea>
</template>

<script type="text/javascript">

import _ from 'lodash'

var $ = require('jquery')
require('summernote')

export default {
    data() {
        return {
            summernote: null,
        }
    },

    mounted (){
        this.load()
    },
    beforeDestroy(){
      this.editor.summernote('destroy')
    },

    methods: {
        load() {
            const { placeholder, height, minHeight, maxHeight, focus, $emit } = this
            var initOptions = {
                placeholder,
                height,
                minHeight,
                maxHeight,
                focus,
                callbacks: {
                    onInit: function(){
                        $emit('onInit')
                    },
                    onEnter: function(){
                        $emit('onEnter')
                    },
                    onFocus: function(){
                        $emit('onFocus')
                    },
                    onBlur: function(){
                        $emit('onBlur')
                    },
                    onKeyup:function(e){
                        $emit('onKeyup', e)
                    },
                    onKeydown:function(e){
                        $emit('onKeydown', e)
                    },
                    onPaste:function(e){
                        $emit('onPaste', e)
                    },
                    onImageUpload: function(files)=>{
                        $emit('onImageUpload', files)
                    },
                    onChange: function(contents)=>{
                        $emit('onChange', contents)
                    }
                }
            }
            const params = _.assign({}, initOptions)
            this.editor = $(this.$el).summernote(params)
        }
    }
}
</script>

<style scoped lang="scss"></style>
