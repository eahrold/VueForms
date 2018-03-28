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
      <button class="btn btn-default" @click='show.modal = true'>Launch An Example Modal</button>
      <form-modal @close='show.modal = false' v-if='show.modal'>
          <template slot='header'>This is a modal</template>
          <template slot='body'>
                <p>Hi, I'm a modal</p>
              </div>
              <button class="btn btn-default" @click='show.nested = true'>Launch a nested modal</button>

                <form-modal @close='show.nested = false' v-if='show.nested'>
                    <template slot='header'>Nested Modal</template>
                    <template slot='body'>
                      <p>Hi, I'm a nested modal</p>
                    </template>
                </form-modal>

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
        show: {
          modal: false,
          nested: false
        }
      }
    }
}
</script>

<style scoped lang="scss"></style>
