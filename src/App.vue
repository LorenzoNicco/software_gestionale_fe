<script>
  import TheSidebarNavigation from './components/TheSidebarNavigation.vue';

  export default {
    data() {
      return {
      }
    },
    components: {
      TheSidebarNavigation,
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<template>
  <div id="main-container" class="flex h-screen">
    <TheSidebarNavigation v-if="this.$route.name != 'Login'" />
  
    <div class="p-4 w-full h-full overflow-y-auto">
      <router-view></router-view>
    </div>
  </div>
</template>
