<script>
  import TheSidebarNavigation from './components/TheSidebarNavigation.vue';

  export default {
    components: {
      TheSidebarNavigation
    }
  }
</script>

<template>
  <div id="main-container" class="flex h-screen">
    <TheSidebarNavigation />
  
    <div>
      <router-link to="/" class="btn btn-primary">Home</router-link>
      <router-link to="/about" class="btn btn-primary">About</router-link>
    
      <router-view></router-view>
    </div>
  </div>
</template>
