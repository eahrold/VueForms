<template>
  <form-section heading='Other Features'>
    <form-address
      v-model='model.address'
      property='address'
      :include-coordinates='true'
      :errors='errors'>
        <template slot='help'>use the `include-coordinated` prop to conditionally display Lat &amp; Lng</template>
    </form-address>
    <!-- <form-seo label='SEO DATA' v-model='model.seo' property='seo'></form-seo> -->

    <form-panel>
      <button class="btn btn-default" @click='showModal = true'>Launch An Example Modal</button>
      <form-modal @close='showModal = false' v-if='showModal'>
          <template slot='header'>Reset Your Password</template>
          <template slot='body'>
              <form-text
                v-model='model.email'
                property='email'
                :errors='errors'>
              </form-text>

              <div class="row">
                <form-password class='col-md-6'
                  v-model='model.password'
                  property='password'
                  :errors='errors'
                />
                <form-password
                  class='col-md-6'
                  v-model='model.password_confirm'
                  property='password_confirm'
                  :errors='errors'
                />
              </div>
          </template>
      </form-modal>
    </form-panel>
  </form-section>
</template>

<script type="text/javascript">

import _ from 'lodash'
import { section } from './mixins'

export default {
    mixins: [ section ],
    props: {},

    data() {
      return {
        showModal: false,
      }
    }
}
</script>

<style scoped lang="scss"></style>
