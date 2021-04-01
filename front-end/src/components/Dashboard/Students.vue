<template>
<div class="page">
  <div>
      <h1>Students</h1>
  </div>
  <div class="top-bar">
    <button class='btn btn-primary btn-sm' @click="$router.push('CreateStudent')">Add Student</button>
  </div>

  <div class="students">
    <StudentTable :students="studentData"/>
  </div>

</div>
</template>

<script>
import StudentTable from "./Students/StudentTable.vue"
export default {
  name: 'Students',
  components: {
    StudentTable
  },
  data() {
   return {
     
   }
  },
  methods: {

  },
  computed: {
    studentData() {
      return this.$root.$data.students;
    }
  },
}
</script>

<style scoped>
  .top-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .btn {
    font-size: .7rem;
    margin-bottom: .5rem;

  }

  .page-title {
    font-size: 2rem;
    font-weight: 500;
  }

</style>