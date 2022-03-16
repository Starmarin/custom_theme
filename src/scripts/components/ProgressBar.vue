<template>
    <div class="progress-bar h-4 mx-auto my-3" :style="progressBarStyles"> 
        <div :style="fillBarStyles"> </div>
    </div>
</template>

<script>
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
    name: 'ProgressBar',
    props: {
        endtime: {
            required: true,
            type: String 
        }, 
        start: {
            required: true,
            type: String
        },
        background: {
            required: true,
            type: String,
            default: "#FFFFFF"
        },
        fill: {
            required: true,
            type: String,
            default: "#DA1221" 
        }
    }
})

export default class ProgressBar extends Vue {

    value = 0;

    get progressBarStyles() {
        return {
            backgroundColor: this.$props.background
        }
    }

    get fillBarStyles() {
        return {
            backgroundColor: this.$props.fill,
            width: this.value,
            height: '100%'
        }
    }

    remindTime(start, endtime ) {
        if (typeof endtime !== 'object') {
            throw new Error('remindTime expects a Date object');
        }

        if (typeof start !== 'object') {
            throw new Error('remindTime expects a Date object');
        }

        const total = Date.parse(endtime) - Date.parse(start);

        const remains = Date.parse(endtime) - Date.parse(new Date);

        return {
            value: `${100 - remains/total*100}%`
        }
    }

    initBar() {
        let timeInterval;
        const endtime = new Date(Date.parse(this.$props.endtime));
        const start = new Date(Date.parse(this.$props.start));

        const updateTimer = () => {
            const barWidth = this.remindTime(start, endtime);

            this.value = barWidth.value;
        }

        updateTimer();
        timeInterval = setInterval(updateTimer, 60000);
    }

    beforeMount() {
        this.initBar();
    }
}

</script>