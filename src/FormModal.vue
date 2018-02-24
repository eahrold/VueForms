<template>
  <transition name="vf-modal">
    <div class="vf-modal-mask">
      <div class="vf-modal-wrapper">
        <div class="vf-modal-container">
          <span @click='$emit("close")' class="vf-modal-close close">x</span>

          <div v-if='!!$slots.header' class="vf-modal-header">
            <h4>
              <slot name="header"></slot>
            </h4>
          </div>

          <div class="vf-modal-body clearfix">
            <slot name="body">
              default body
            </slot>
          </div>

          <div v-if='!hideFooter' class="vf-modal-footer">
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

<style lang='css' scoped>
.vf-modal-mask {
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

.vf-modal-mask.vf-modal-rounded > .vf-modal-wrapper > .vf-modal-container {
  border-radius: 3em;
}

.vf-modal-mask.vf-modal-large > .vf-modal-wrapper > .vf-modal-container {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

.vf-modal-mask.vf-modal-small > .vf-modal-wrapper > .vf-modal-container {
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
}

.vf-modal-wrapper {
  display: table-cell;
  position: relative;
  height: 100%;
  overflow: scroll;
}

.vf-modal-container {
  position: relative;
  width: 80%;
  margin: 5% 10%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.vf-modal-sm .vf-modal-container {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}

.vf-modal-close {
  z-index: 2;
  cursor: pointer;
}

.vf-modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.vf-modal-body {
  margin: 20px 0;
}

.vf-modal-default-button {
  float: right;
}

.vf-modal-enter {
  opacity: 0;
}

.vf-modal-leave-active {
  opacity: 0;
}

.vf-modal-enter .vf-modal-container,
.vf-modal-leave-active .vf-modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
</style>
