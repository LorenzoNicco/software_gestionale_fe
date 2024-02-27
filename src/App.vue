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
      <router-view></router-view>
    </div>
  </div>
</template>
