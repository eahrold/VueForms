<template>
    <div class="form-section">
        <h4 class='section-title'><slot name='heading'>{{ heading }}</slot></h4>
        <div class="row">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        heading: {
            type: String,
            required: false
        }
    }
}
</script>

<style scoped>

.form-section {
    margin-top: 1em;
}

.form-section > .row {
    margin-left: 0;
    margin-right: 0
}

.form-section .section-title {
    width: 100%;
    padding-bottom: 1em;
    border-bottom: 1px solid #eeeeee;
}
</style>