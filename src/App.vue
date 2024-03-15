<script>
  import TheSidebarNavigation from './components/TheSidebarNavigation.vue';

  export default {
    data() {
      return {
        userData: ''
      }
    },
    components: {
      TheSidebarNavigation,
    },
    methods: {
      //Reperisco i dati dell'utente e li salvo in userData
      fetchUserDetails() {
        axios.get("http://localhost:8000/api/user")
        .then((response) => {
            this.userData = response.data;
        });
      },
    },
    mounted() {
      this.fetchUserDetails();
    }
  }
</script>

<template>
  <div id="main-container" class="flex h-screen">
    <TheSidebarNavigation v-if="this.$route.name != 'Login'" />
  
    <div class="p-4 w-full h-full overflow-y-auto">
      <router-view :userData="userData"></router-view>
    </div>
  </div>
</template>
