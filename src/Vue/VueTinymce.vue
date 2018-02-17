<template>
    <div>
        <textarea v-if="isReady" :id="element"></textarea>
    </div>
</template>

<style>
.mce-window-head {
    min-height: 1.1em;
}
</style>

<script>

var elFinderBrowser = function (field_name, url, type, win) {
    tinymce.activeEditor.windowManager.open({
        file: '/elfinder/tinymce4', // use an absolute path!
        title: 'Tinymce File Manager',
        width: 900,
        height: 450,
        resizable: 'yes'
    },{
        setUrl: function (url) {
            win.document.getElementById(field_name).value = url;
        }
    });
    return false;
}

export default {
    props: {
        value: {
            required: true
        },

        options: {
            type: Object,
            default: ()=>{ return {}; }
        },

        property: {
            type: String,
        },

        content: {
            type: String,
        },

        headers: {
            type: Object,
            default: () => { return {}; }
        },

        isReady: {
            type: Boolean,
            default: true
        },

        css: {
            type: String,
            default: ""
        },

        height: {
            type: Number,
            default: 300
        },

        menubar: {
            type: Boolean,
            default: false
        },

        plugins: {
            type: Array,
            default: () => { return [
                  'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                  'searchreplace wordcount visualchars',
                  "searchreplace visualblocks codemirror fullscreen textcolor contextmenu",
                  "insertdatetime media table contextmenu paste imagetools"
                ];
            }
        },

        toolbar: {
            type: String,
            default: 'undo redo | insert  | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | styleselect fontselect fontsizeselect forecolor | visualblocks code'
        },

        filepicker: {
            type: Function,
            default: elFinderBrowser
        }
    },

    data () {
        return {
            selector: null,
            tinymce: null,
            editor: null,
            recreate: false,
            element: 'tinymce-' + Math.floor(Math.random() * 9999)
        }
    },

    mounted () {
        if(this.isReady) {
            this.$nextTick(()=>{
                this.loadTinymce();
            });
        }
    },

    watch: {
        isReady (ready) {
            if(ready && !this.tinymce) {
                this.loadTinymce()
            }
        },

        $route (newVal, oldVal) {
            this.editor = tinymce.get(this.element);
            this.recreate = true;
        },

        value (newVal, oldVal) {
            if((newVal === "") || newVal === null || (oldVal === undefined) || this.recreate) {
                const editor = this.editor = tinymce.get(this.element);
                editor.setContent(newVal || "");
                this.recreate = false;
            }
        }
    },

    computed: {
        defaults() {
            var selector = "#"+this.element;
            return {
                // theme: 'modern',
                selector: selector,
                height: this.height,
                menubar: false,
                plugins: this.plugins,
                toolbar: this.toolbar,
                content_css: this.css,

                image_caption: true,
                image_advtab: true,

                remove_script_host : false,
                relative_urls : false,
                convert_urls : true,

                file_browser_callback : this.filepicker,
                image_caption: true
            }
        }
    },

    methods: {

        setup(editor) {
            editor.on('init', ()=>{
                editor.setContent(this.value || "");
                if(!this.value) {}
                this.editor = editor;
            });

            editor.on('change',(e)=>{
                editor.save(); // Propagate back up to parent textarea
                this.$emit('input', editor.getContent());
            });
        },

        loadTinymce () {
            var opts = Object.assign({}, this.defaults, this.options);
            opts.setup = this.setup;
            //----------------------------------------------------------
            // Init Tinymce...
            //-------------------------------------------------------
            this.tinymce = tinymce.init(opts);
        }
    }
}
</script>


