<template>
  <div class="note">
    <div class="note-header">
      <div class="note-header__left-container">
        <p>дата создания: <b>{{ getCreationDate }}</b></p>
      </div>
      <div class="note-header__right-container">
        <p>прошло с момента создания: <b>{{ getDuration }}</b></p>
      </div>
    </div>
    <div class="note-title">
      {{ title }}
    </div>
    <div class="note-body">
      {{ description }}
    </div>
  </div>
</template>

<script>
import mixinDateMethods from "@/mixins/MixinDateMethods.js";
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru'

export default {
  name: "Note",
  props: {
    title: String,
    description: String,
    creationTimestamp: Number,
  },
  mixins: [mixinDateMethods],
  data: function() {
    return {
      now: Date.now(),
      intervalId: null,
    }
  },
  computed: {
    getCreationDate: function() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return (new Date(this.creationTimestamp)).toLocaleDateString('ru', options);
    },
    getDuration: function() {
      dayjs.extend(duration);
      dayjs.extend(relativeTime);

      let result = "";

      const lengthOfTime = this.now - this.creationTimestamp;

      const durations = dayjs.duration(lengthOfTime);

      const oneMinute = 1000 * 60;

      if (!(durations.$d && durations.$d.minutes >= 0)) {
        return "ошибка вычисления времени";
      }

      if (lengthOfTime < oneMinute) {
        return "несколько секунд назад";
      }

      if (durations.$d.years > 0) {
        result += `${durations.$d.years}${this.mixinDateMethods_Humanize(durations.$d.years, 'years')} `;
      }

      if (durations.$d.months > 0) {
        result += `${durations.$d.months}${this.mixinDateMethods_Humanize(durations.$d.months, 'months')} `;
      }

      if (durations.$d.days > 0) {
        result += `${durations.$d.days}${this.mixinDateMethods_Humanize(durations.$d.days, 'days')} `;
      }

      if (durations.$d.hours > 0) {
        result += `${durations.$d.hours}${this.mixinDateMethods_Humanize(durations.$d.hours, 'hours')} `;
      }

      if (durations.$d.minutes > 0) {
        result += `${durations.$d.minutes}${this.mixinDateMethods_Humanize(durations.$d.minutes, 'minutes')} `;
      }

      return result;
    }
  },
  mounted() {
    const self = this;
    this.intervalId = setInterval(function() {
      self.$data.now = Date.now();
    }, 1000);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
</script>

<style scoped>
  .note {
    width: 100%;
    min-height: 5rem;
    border-radius: 5px;
    background-color: #D9EAD9;
    padding: 10px;
  }

  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    font-size: 1.4rem;
    font-family: monospace;
    font-style: italic;
  }

  .note-header > div {
    min-width: 200px;
  }

  .note-header__left-container {
    display: flex;
    justify-content: flex-start;
  }

  .note-header__right-container {
    display: flex;
    justify-content: flex-end;
  }

  .note-title {
    font-size: 2rem;
    font-weight: bold;
    padding: 4px 0 10px 0;
  }
  .note-body {
    /*padding: 1rem;*/
    text-align: left;
  }
</style>