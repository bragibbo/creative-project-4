<template>
  <div id="app">
    <div class="content">
      <div class="nav">
      </div>
      <Dashboard v-if="user"/>
      <LandingPage v-else />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dashboard from './views/Dashboard'
import LandingPage from './views/LandingPage'

export default {
  name: 'App',
  components: {
    Dashboard,
    LandingPage
  },
  computed: {
    user() {
      return this.$root.$data.user
    }
  },
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },

}
</script>


<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  height: 100%;
}

.nav {
  background: var(--secondaryBlue);
  padding: 30px;
  box-shadow: 0px 1px 10px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
