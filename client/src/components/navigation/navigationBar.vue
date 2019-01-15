<template>
    <nav class='menu-bar'>
        <div class="nav-left">
            <router-link to='/' class='nav-item'>Command</router-link>
            <router-link to='/teach' class='nav-item' v-if="this.$session.exists()">Teach</router-link>
        </div>
        <div class="nav-right">
            <router-link to='/login' class='nav-item' v-if="!this.$session.exists()">Login as Administrator</router-link>
            <span @click="logout" class='nav-span' v-if="this.$session.exists()">Logout</span>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'navigation-bar',
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.go({path: '/'})
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
.menu-bar {
    width: 100%;
    background-color: #42b983;
}

.nav-left{
    display: inline-flex;
}

.nav-right{
    display: inline-flex;
    float: right;
}

.nav-item {
    padding: 20px;
    color: #fff;
    text-decoration: none;
}

.nav-span {
    cursor: pointer;
    padding: 20px;
    color: #fff;
    text-decoration: none;
}

.nav-item:active {
    text-decoration: underline;
}
</style>
