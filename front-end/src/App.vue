<template>
  <div id="app">
    <div class="content">
      <div class="nav">
      </div>
      <Dashboard/>
    </div>
  </div>
</template>

<script>
import Dashboard from './views/Dashboard'

export default {
  name: 'App',
  components: {
    Dashboard
  }

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
