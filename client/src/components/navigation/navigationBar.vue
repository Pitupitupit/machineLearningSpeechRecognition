<template>
    <nav class='menu-bar'>
        <router-link to='/' class='nav-item'>Teach</router-link>
        <router-link to='/main' class='nav-item'>Command</router-link>
    </nav>
</template>

<script>
export default {
  name: 'navigation-bar'
}
</script>

<style scoped>
.menu-bar {
    width: 100%;
    background-color: #fff;
    display: inline-flex;
}

.nav-item {
    padding: 20px;
}
</style>
