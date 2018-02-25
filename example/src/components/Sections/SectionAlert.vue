<template>
  <form-section heading='Alert and Toast'>
    <form-alert></form-alert>
    <form-panel class="row">
      <div class="form-group">
        <button class='btn btn-default' @click='toast'>Click To Toast</button>
        <button class='btn btn-default' @click='alert'>Click To Alert</button>
        <button class='btn btn-default' @click='confirm'>Click To Confirm</button>
      </div>
      <div class="form-group">
        <form-selectize class="col-md-6" v-model='status' :options='statuses' property='status' label='Status'></form-selectize>
        <form-selectize class="col-md-6" v-model='position' :options='positions' property='position' label='Position'></form-selectize>
      </div>
    </form-panel>
  </form-section>
</template>

<script type="text/javascript">

import _ from 'lodash'
import { section } from './mixins'

export default {
  mixins: [ section ],
  props: {
      statuses: {},
      positions: {},
      messages: {},
  },

  data() {
    return {
      alertMessage: null,
      status: 'success',
      position: 'top',
    }
  },

  methods: {
    confirm(event, message) {
      this.$vfalert.confirm(message || this.randomMessage(), this.status).then(()=>{
        this.confirm(null, `${this.randomMessage()}. We <b><em>could</em></b> do this all day, click cancel to break out.`)
      }).catch(()=>{
         this.alert(null, "You cancelled loop.")
      })
    },

    alert(event, message) {
      this.$vfalert.alert(message || this.randomMessage(), this.status, { timeout: 3000})
    },

    toast() {
      this.$vfalert.toast(this.randomMessage(), this.status, { position: this.position, timeout: 3000})
    },

    randomMessage() {
      return _.sample(this.messages)
    },

    randomStatus() {
      return _.sample(_.keys(this.statuses))
    }
  }
}
</script>

<style scoped lang="scss"></style>
