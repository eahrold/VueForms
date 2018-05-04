<template>
    <div class="vf-form-section">
        <h4 class="vf-section-title"><slot name="heading">{{ heading }}</slot></h4>
        <div class="row">
            <div class="col">
                <slot/>
            </div>
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
.vf-form-section {
    margin-top: 1em;
}

.vf-form-section > .row {
    margin-left: 0;
    margin-right: 0
}

.vf-form-section .vf-section-title {
    width: 100%;
    padding-bottom: 1em;
    border-bottom: 1px solid #eeeeee;
}
</style>
