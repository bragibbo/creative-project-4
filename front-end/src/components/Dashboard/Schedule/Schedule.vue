<template>
  <div class="d-flex schedule justify-content-between">
    <div class="section calendar d-flex flex-column">
      <h3>{{days[schedule.dayOfWeek]}}</h3>
      <div v-for="index in times" :key="times[index]">
        <HourCard :hourData="schedule[index]" @delete="createSchedule" />
      </div>
    </div>
    <div class="section add">
      <h3>Schedule a Time</h3>
      <ScheduleAdd :hours="times" @add="createSchedule"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ScheduleAdd from './ScheduleAdd'
import HourCard from './ScheduleHourCard'
import axios from 'axios';

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
  async created() {
    await this.createSchedule();
  },
  methods: {
    async createSchedule() {
      let tmpSchedule = {}
      const schedule = await this.getSchedule()    

      tmpSchedule ={
        date: this.date,
        dayOfMonth: this.date.getDate(),
        dayOfWeek: this.date.getDay()
      }
      for(let i=this.startTime; i <= this.endTime; i++) {
        this.times.push(i)
        this.$set(tmpSchedule, i, {
          label: i,
          hour: moment(i, 'HH').format('h a'),
          appointments: []
        })
      }

      for(let i=0; i < schedule.length; i++) {
        tmpSchedule[schedule[i].time].appointments.push(schedule[i])
      }

      Object.assign(this.schedule, tmpSchedule)
    },
    async getSchedule() {
      try {
        const response = await axios.get('/api/schedule/')
        return response.data.schedules
      } catch (error) {
        console.log(error)
      }
    },
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
