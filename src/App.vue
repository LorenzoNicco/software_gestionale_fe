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
  
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
