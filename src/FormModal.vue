<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span @click='$emit("close")' class="modal-close close">x</span>

          <div v-if='!!$slots.header' class="modal-header">
            <h4>
              <slot name="header"></slot>
            </h4>
          </div>

          <div class="modal-body clearfix">
            <slot name="body">
              default body
            </slot>
          </div>

          <div v-if='!hideFooter' class="modal-footer">
            <slot name="footer">
              <button class="btn btn-default" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
export default {
    props: {
      hideHeader: {
        type: Boolean,
        default: false,
      },

      hideFooter: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        default: document.body.style.display
      }
    },

    beforeDestroy() {
        document.body.style.overflow = this.default;
    },

    mounted() {
        document.body.style.overflow = "hidden";
    }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  overflow: scroll;
}

.modal-mask.modal-rounded > .modal-wrapper > .modal-container {
  border-radius: 3em;
}

.modal-mask.modal-large > .modal-wrapper > .modal-container {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

.modal-mask.modal-small > .modal-wrapper > .modal-container {
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
}

.modal-wrapper {
  display: table-cell;
  /*vertical-align: middle;*/
  height: 100%;
  overflow: scroll;
}

.modal-container {
  position: absolute;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-close {
  z-index: 2;
  cursor: pointer;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
</style>
