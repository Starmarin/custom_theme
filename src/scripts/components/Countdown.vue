/* eslint-disable */
<template>
    <div>
        <div class="flip-clock flex justify-center">
            <div class="mr-4 md:mr-7">
                <span class="flex">
                <span v-for="(day, index) in days" :key="index" class="flip-clock__piece mr-1 md:mr-2">
                    <b class="flip-clock__card card">
                    <b class="card__top" :style="cssColorsVars()">{{ day }}</b>
                    <b class="card__bottom" :style="cssColorsVars()" :data-value="nextValue(day++)"></b>
                    <b class="card__back" :style="cssColorsVars()" :data-value="nextValue(day++)"><b class="card__bottom" :data-value="nextValue(day - 2)"></b></b>
                    </b>
                </span>
                </span>
                <span class="flip-clock__slot" :style="cssColorsVars()">{{ state.language.countdown_days }}</span>
            </div>
            <div class="mr-4 md:mr-7">
                <span class="flex">
                <span v-for="(hour, index) in hours" :key="index" class="flip-clock__piece mr-1 md:mr-2">
                    <b class="flip-clock__card card">
                    <b class="card__top" :style="cssColorsVars()">{{ hour }}</b>
                    <b class="card__bottom" :style="cssColorsVars()" :data-value="nextValue(hour++)"></b>
                    <b class="card__back" :style="cssColorsVars()" :data-value="nextValue(hour++)"><b class="card__bottom" :data-value="nextValue(hour - 2)"></b></b>
                    </b>
                </span>
                </span>
                <span class="flip-clock__slot" :style="cssColorsVars()">{{ state.language.countdown_hours }}</span>
            </div>
            <div class="mr-4 md:mr-7">
                <span class="flex">
                <span v-for="(minute, index) in minutes" :key="index" class="flip-clock__piece mr-1 md:mr-2">
                    <b class="flip-clock__card card">
                    <b class="card__top" :style="cssColorsVars()">{{ minute }}</b>
                    <b class="card__bottom" :style="cssColorsVars()" :data-value="nextValue(minute++)"></b>
                    <b class="card__back" :style="cssColorsVars()" :data-value="nextValue(minute++)">
                        <b class="card__bottom" :style="cssColorsVars()" :data-value="nextValue(minute - 2)"></b>
                    </b>
                    </b>
                </span>
                </span>
                <span v-if="$mq === 'sm' && this.$props.shortslot" class="flip-clock__slot" :style="cssColorsVars()">{{ state.language.countdown_minutes_short }}</span>
                <span v-else class="flip-clock__slot" :style="cssColorsVars()">{{ state.language.countdown_minutes }}</span>
            </div>
            <div>
                <span class="flex">
                <span v-for="(second, index) in seconds" :key="index" :class="{ [flipper]: index == seconds.length - 1 }" class="flip-clock__piece mr-1 md:mr-2">
                    <b class="flip-clock__card card">
                    <b class="card__top" :style="cssColorsVars()"> {{ second }}</b>
                    <b class="card__bottom" :style="cssColorsVars()" :data-value="nextValue(second++)"></b>
                    <b class="card__back" :style="cssColorsVars()" :data-value="nextValue(second++)"><b class="card__bottom"  :style="cssColorsVars()" :data-value="nextValue(second - 2)"></b></b>
                    </b>
                </span>
                </span>
                <span v-if="$mq === 'sm' && this.$props.shortslot" class="flip-clock__slot" :style="cssColorsVars()">{{ state.language.countdown_seconds_short }}</span>
                <span v-else class="flip-clock__slot" :style="cssColorsVars()">{{ state.language.countdown_seconds }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Component, Watch } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
    name: 'Countdown',
    props: {
        endtime: {
            required: true,
            type: String // 10 Oct 2021 14:00:00
        },
        bgcolor: {
        required: false,
        type: String,
        default: "#3B30FE"
        },
        slotcolor: {
            required: false,
            type: String,
            default: "#FFFFFF"
        },
        shortslot: {
            required: false,
            type: Boolean,
            default: true
        }
    }
})

export default class Countdown extends Vue {
    state = window.APPSTATE;

    days = '00';

    hours  = '00';

    minutes  = '00';

    seconds  = '00';

    flipper = '';

    @Watch('seconds', { deep: true })
    toggleFlipCard() {
        setTimeout(()=>{
            this.flipper = 'flip';
        }, 10)    
    }

    cssColorsVars() {
        return {
            '--bg-color': this.$props.bgcolor,
            '--slot-color': this.$props.slotcolor
        }
    }

    nextValue(value){
        return value > 9 ? 0 : value;
    }

    remindTime(endtime ) {
        if (typeof endtime !== 'object') {
            throw new Error('remindTime expects a Date object');
        }

        const total = Date.parse(endtime) - Date.parse(new Date());

        return {
            total,
            days: Math.floor(total / (1000 * 60 * 60 * 24)),
            hours: Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((total / 1000 / 60) % 60),
            seconds: Math.floor((total / 1000) % 60)
        };
    }

    initCountdown() {
        let timeInterval;
        const endtime = new Date(Date.parse(this.$props.endtime));

        const updateTimer = () => {
            const t = this.remindTime(endtime);

            if (t.total >= 0) {
                this.flipper = '';
                this.days = (`0${t.days}`).slice(-3);
                this.hours = (`0${t.hours}`).slice(-2);
                this.minutes = (`0${t.minutes}`).slice(-2);
                this.seconds = (`0${t.seconds}`).slice(-2);
            }

            if (t.total <= 0) clearInterval(timeInterval);
        }

        updateTimer();
        timeInterval = setInterval(updateTimer, 1000);
    }

    beforeMount() {
        this.initCountdown();
    }
}

</script>

<style>
.flip-clock__piece *{
    font-family: 'Digital Numbers', sans-serif;
    text-align: center;
}

.card__top,
.card__bottom,
.card__back::before,
.card__back::after {
    background: var(--bg-color);
}

.flip-clock__slot {
    color: var(--slot-color);
}
</style>
