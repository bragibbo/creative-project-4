<template>
  <form>
    <div class="d-flex flex-column input my-2">
      <label for="first_name">First Name</label>
      <input id="first_name" v-model="firstName" type="text" />
    </div>
    <div class="d-flex flex-column input my-2">
      <label for="last_name">Last Name</label>
      <input id="last_name" v-model="lastName" type="text" />
    </div>
    <div class="d-flex flex-column input my-2">
      <label for="hour-select">Hour to Schedule</label>
      <v-select id="hour-select" class="w-50" v-model="selectedHour" :options="hours"/>
    </div>
    <div class="d-flex flex-column input my-4">
      <button type="button" class="btn btn-outline-primary" @click="submit">Add to Schedule</button>
    </div>
    <div v-if="errors.length > 0">
      <div class="d-flex flex-column input" v-for="(error, index) in errors" :key="index">
        <div class="errors">{{error}}</div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    hours: Array,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      selectedHour: '',
      errors: []
    }
  },
  methods: {
    submit() {
      this.errors = []
      if (!this.firstName || !this.lastName || !this.selectedHour) {
        if(!this.firstName) this.errors.push('Missing student first name')
        if(!this.lastName) this.errors.push('Missing student last name')
        if(!this.selectedHour) this.errors.push('Missing a selected hour')
      } else {
        this.$emit('add', {
          firstName: this.firstName,
          lastName: this.lastName,
          hour: this.selectedHour
        })

        this.firstName = ''
        this.lastName = ''
        this.selectedHour = ''
      }
    }
  }
}
</script>

<style scoped>
.btn {
  font-size: 1rem;
}

.errors {
  color: red;
}

.input {
  align-items: flex-start;
}

@media only screen and (max-width: 700px) {
  .input {
    align-items: center;
  }
}
</style>
