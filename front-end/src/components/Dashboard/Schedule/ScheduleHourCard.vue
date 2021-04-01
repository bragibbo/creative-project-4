<template>
  <div class="card my-1 grid-container">
    <div class="time-slot grid-item">{{hourData.hour}}</div>
    <div class="grid-item">
      <div class="d-flex flex-column w-100">
        <div class="grid-container-names my-2" v-for="(item, index) in hourData.appointments" :key="index">
          <div class="d-flex flex-column align-items-start">{{item.firstName}} {{item.lastName}}</div>
          <div class="delete-button grid-items">
            <button class="btn btn-outline-danger" @click="(index) => submit(item)">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hourData: Object
  },
  methods: {
    submit(item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid var(--primaryGreen);
  box-shadow: 0px 1px 5px;
}

.time-slot{
  margin: 1px;
  min-height: 75px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 20px;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-container-names {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 20px;
}

.delete-button {
  width: 50px;
  height: 50px;
}
</style>