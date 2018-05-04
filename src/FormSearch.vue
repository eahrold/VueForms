<style type="text/css">
.input-group-search .form-control {
    border-radius: 22px;
    width: 100%;
}
.spy-glass {
    position: absolute;
    right: 2em;
    top: .5em;
    bottom: .5em;
    margin: auto;
    color: lightgrey;
}

</style>

<template>
    <div class="input-group-search vf-form-group">
        <span class="col-xs-12">
            <input
                v-model="aValue"
                type="search"
                class="form-control">
            <span class="spy-glass"><i
                class="fa fa-search"
                aria-hidden="true"/></span>
        </span>
    </div>
</template>

<script>

import { errors, values } from './mixins'

export default {
    mixins: [ errors, values ],

    props: {
        value: {
            required: true
        }
    }
}
</script>
