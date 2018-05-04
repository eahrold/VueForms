<template>
    <div class="progress">
        <div
            :aria-valuenow="progress"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :style="barStyle"
            class="progress-bar"
            role="progressbar">
            <span class="sr-only">{{ progress }}% Complete</span>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        progress: {
            type: [Number, String],
            required: true
        },

        max: {
            type: Number,
            default: 100
        },

        min: {
            type: Number,
            default: 0
        }
    },

    computed: {
        barStyle () {
            return 'width:' + this.progress + '%'
        }
    }
}
</script>
