<template>
<div class="page">
  <h1>Edit Student</h1>
  <form v-if="creating" @submit.prevent="saveStudent">
    <input v-model="firstName" placeholder="First Name">
    <br>
    <input v-model="lastName" placeholder="Last Name">
    <br>
    <input v-model="email" placeholder="Email">
    <br>
    <input v-model="billingPrice" placeholder="Billing Price">
    <br>
    <v-select class='dropdown' v-model="gender" :options="genderOptions" placeholder="Gender"/>
    <v-select class='dropdown' v-model="lessonLength" :options="lessonLengthOptions" placeholder="Lesson Length"/>

    <button class="submit-button btn btn-outline-primary" type="submit">Save</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      creating: true,
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      billingPrice: '',
      gender: '',
      lessonLength: '',
      genderOptions: ["M","F"],
      lessonLengthOptions: ["30 min", "45 min", "60 min"]
    }
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    saveStudent() {
      this.$root.$data.saveStudent(this.id, this.firstName, this.lastName, this.email, this.billingPrice, this.gender, this.lessonLength);
      this.$router.push("Students");
    },
    today() {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        return mm + "/" + dd + "/" + yyyy;
    },
    formatBillingPrice() {
        let price = this.billingPrice;
        if (price.length > 0) {
            if (price[0] != '$') {
                price = "$" + price;
            }
            if (!price.includes('.')) {
                price = price + ".00";
            }
            else if (price.includes('.') && (price.indexOf('.') != (price.length - 3))) {
                price = price + "0";
            }
        }
        return price;
    }
  },
  computed: {

  },
  created() {
      const userID = this.$route.query.id;
      const userOBJ = this.$root.$data.students.find(item => item.id === userID);
      console.log(userOBJ);
      this.id = userOBJ.id;
      this.firstName = userOBJ.first_name;
      this.lastName = userOBJ.last_name;
      this.email = userOBJ.email;
      this.billingPrice = userOBJ.billing_price;
      this.gender = userOBJ.gender;
      this.lessonLength = userOBJ.lesson_length;

  }
}
</script>

<style scoped>
input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}

.dropdown {
    margin-bottom: .5rem;
}

form {
    justify-content: center;
    width: 300px;
    
}

input {
    width: 100%;
    margin-bottom:.5rem;
}

.submit-button {
    margin: 0;
}

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
}


</style>