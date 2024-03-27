<script>
  //Componenti
  import TheSidebarNavigation from './components/TheSidebarNavigation.vue';

  export default {
    data() {
      return {
        userData: '',
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
    created() {
      this.fetchUserDetails();
    }
  }
</script>

<template>
  <div id="main-container" class="flex h-screen">
    <TheSidebarNavigation v-if="this.$route.name != 'Login' && this.$route.name != 'Password-reset'" />
  
    <div class="w-full h-full overflow-y-auto" v-bind:class="{'p-4 bg-slate-100': this.$route.name != 'Login' && this.$route.name != 'Password-reset'}">
      <router-view :userData="userData"></router-view>
    </div>
  </div>
</template>
