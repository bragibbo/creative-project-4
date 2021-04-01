<template>
  <div class="d-flex schedule justify-content-between">
    <div class="section calendar d-flex flex-column">
      <h3>{{days[schedule.dayOfWeek]}}</h3>
      <div v-for="index in times" :key="index">
        <HourCard :hourData="schedule[index]" @delete="(e) => deleteFromSchedule(e)" />
      </div>
    </div>
    <div class="section add">
      <h3>Schedule a Time</h3>
      <ScheduleAdd :hours="times" @add="(e) => addToSchedule(e)"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ScheduleAdd from './ScheduleAdd'
import HourCard from './ScheduleHourCard'

export default{
  name: 'Schedule',
  data() {
    return {
      date: new Date(),
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      startTime: 6,
      endTime: 18,
      times: [],
      schedule: {},
    }
  },
  components: {
    ScheduleAdd,
    HourCard
  },
  created() {
    this.schedule ={
      date: this.date,
      dayOfMonth: this.date.getDate(),
      dayOfWeek: this.date.getDay()
    }
    for(let i=this.startTime; i <= this.endTime; i++) {
      this.times.push(i)
      this.$set(this.schedule, i, {
        label: i,
        hour: moment(i, 'HH').format('h a'),
        appointments: []
      })
    }

    const schedule = this.$root.$data.schedule
    for(let i=0; i < schedule.length; i++) {
      this.schedule[schedule[i].hour].appointments.push(schedule[i])
    }
  },
  methods: {
    addToSchedule(e) {
      this.$set(this.schedule[e.hour].appointments, this.schedule[e.hour].appointments.length, e)
    },
    deleteFromSchedule(e) {
      this.schedule[e.hour].appointments = this.schedule[e.hour].appointments.filter(item => item.firstName !== e.firstName && item.lastName !== e.lastName)
    }
  }
}
</script>

<style scoped>
.section {
  width: 45%;
}

.schedule {
  flex-direction: row;
}

@media only screen and (max-width: 700px) {
  .add {
    margin-top: 20px;
    order: 0
  }

  .calendar {
    margin-top: 20px;
    order: 1
  }

  .section {
    width: 100%;
  }

  .schedule {
    flex-direction: column;
  }
}
</style>
