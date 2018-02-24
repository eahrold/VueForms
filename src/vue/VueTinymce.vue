<template>
<textarea v-if="isReady" :id="vf_uid"></textarea>
</template>

<script>
var elFinderBrowser = function(field_name, url, type, win) {
  tinymce.activeEditor.windowManager.open({
    file: '/elfinder/tinymce4', // use an absolute path!
    title: 'Tinymce File Manager',
    width: 900,
    height: 450,
    resizable: 'yes'
  }, {
    setUrl: function(url) {
      win.document.getElementById(field_name).value = url;
    }
  });
  return false;
}

import _ from 'lodash'
import { vf_uid } from '../mixins'

export default {
  mixins: [vf_uid],

  props: {
    value: {
      required: true
    },

    property: {
      type: String,
    },

    content: {
      type: String,
    },

    options: {
      type: Object,
      default: () => {
        return {};
      }
    },

    headers: {
      type: Object,
      default: () => {
        return {};
      }
    },

    isReady: {
      type: Boolean,
      default: true
    },

    height: {
      type: Number,
      default: 300
    },

    filepicker: {
      type: Function,
      default: elFinderBrowser
    },

    menubar: {
      type: Boolean,
      default: false
    },

    plugins: {
      type: Array,
      required: false
    },

    toolbar: {
      type: String,
      required: false
    },

    css: {
      type: String,
      default: ""
    },
  },

  data() {
    return {
      selector: null,
      tinymce: null,
      editor: null,
      recreate: false,
    }
  },

  mounted() {
    if (this.isReady) {
      this.$nextTick(() => {
        this.loadTinymce();
      });
    }
  },

  watch: {
    isReady(ready) {
      if (ready && !this.tinymce) {
        this.loadTinymce()
      }
    },

    $route(newVal, oldVal) {
      this.editor = tinymce.get(this.vf_uid);
      this.recreate = true;
    },

    value(newVal, oldVal) {
      if ((newVal === "") || newVal === null || (oldVal === undefined) || this.recreate) {
        const editor = this.editor = tinymce.get(this.element);
        editor.setContent(newVal || "");
        this.recreate = false;
      }
    }
  },

  computed: {
    defaults() {
      var selector = `#${this.vf_uid}`
      let plugins = this.plugins || _.get(this.$vfconfig, 'tinymce.plugins')
      let toolbar = this.toolbar || _.get(this.$vfconfig, 'tinymce.toolbar')
      let menubar = this.menubar || _.get(this.$vfconfig, 'tinymce.menubar')
      let css = this.css || _.get(this.$vfconfig, 'tinymce.css');
      let theme = this.theme || _.get(this.$vfconfig, 'tinymce.theme', 'modern');

      return {
        theme: theme,
        selector: selector,
        menubar: menubar,
        plugins: plugins,
        toolbar: toolbar,
        content_css: css,

        height: this.height,
        image_caption: true,
        image_advtab: true,

        remove_script_host: false,
        relative_urls: false,
        convert_urls: true,

        file_browser_callback: this.filepicker,
        image_caption: true
      }
    }
  },

  methods: {

    setup(editor) {
      editor.on('init', () => {
        editor.setContent(this.value || "");
        if (!this.value) {
        }
        this.editor = editor;
      });

      editor.on('change', (e) => {
        editor.save(); // Propagate back up to parent textarea
        this.$emit('input', editor.getContent());
      });
    },

    loadTinymce() {
      var opts = _.assign({}, this.defaults, this.options);
      opts.setup = this.setup;
      //----------------------------------------------------------
      // Init Tinymce...
      //-------------------------------------------------------
      this.tinymce = tinymce.init(opts);
    }
  }
}

</script>

<style>
.mce-window-head {
    min-height: 1.1em;
}
</style>
