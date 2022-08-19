<template>  
  <div id="app">
    <!-- <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'family' }">Family Recipes</router-link>|      
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <router-link :to="{ name: 'favorites' }">favorites</router-link>|
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|        
      </span>
    </div> -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
      <router-link :to="{ name: 'main' }" style="text-decoration: none;">
        <a class="navbar-brand" > DorAlon Recipes</a>
      </router-link>
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">            
            <router-link :to="{ name: 'search' }" style="text-decoration: none;">
              <a class="nav-link" href=""  >Search Recipes</a>
            </router-link>
          </li>

          <li class="nav-item">            
            <router-link :to="{ name: 'about' }" style="text-decoration: none;">
              <a class="nav-link" href=""  >About</a>
            </router-link>
          </li>

          <li class="nav-item" v-if="!$root.store.username">            
            <router-link :to="{ name: 'register' }" style="text-decoration: none;">
              <a class="nav-link" href=""  >Register</a>
            </router-link>
          </li>
          <li class="nav-item" v-if="!$root.store.username">            
            <router-link :to="{ name: 'login' }" style="text-decoration: none;">
              <a class="nav-link" href=""  >Login</a>
            </router-link>
          </li>          

          <b-nav-item-dropdown v-if="$root.store.username" text="Personal Area" >
           <li class="nav-item" >            
            <router-link :to="{ name: 'favorites' }" style="text-decoration: none; color: black;">
              Favorite Recipes
            </router-link>
           </li>
           <div class="dropdown-divider"></div>
            <li class="nav-item" >   
             <router-link :to="{ name: 'myrecipes' }" style="text-decoration: none; color: black;">
              My Recipes
            </router-link>
            </li>
            <div class="dropdown-divider"></div>
            <li class="nav-item" >   
            <router-link :to="{ name: 'family' }" style="text-decoration: none; color: black;">
              Family Recipes
            </router-link>
            </li>
         </b-nav-item-dropdown>     
	         <li v-if="$root.store.username" style="">            
            <!-- <router-link :to="{ name: 'createRecipe' }" style="text-decoration: none;"> -->
              <!-- <a class="nav-link" href="" @click.prevent="CreateRecipe">Create Recipes</a> -->
              <CreateRecipe/>
              <!-- <a class="nav-link" href="" @click.native="TestRec">Create Recipes</a> -->
            <!-- </router-link> -->
              <!-- <test v-on:click.native="TestRec"></test> -->
          </li> 
          <li class="nav-item" v-if="$root.store.username">            
            <router-link :to="{ name: 'prepareMeal' }" style="text-decoration: none;">
              <a class="nav-link" href=""  >Prepare Meal</a>
            </router-link>
          </li> 
          <li class="nav-item" v-if="$root.store.username">            
            <!-- {{ $root.store.username }}: <button @click="Logout">Logout</button>      --> 
            <a class="nav-link disabled"> Welcome {{ $root.store.username }} ! <span class="sr-only"></span></a>            
          </li>   
          <li class="nav-item" v-else>            
            <!-- {{ $root.store.username }}: <button @click="Logout">Logout</button>       -->
            <a class="nav-link disabled"> Welcome Guest ! <span class="sr-only"></span></a>            
          </li>   
          <li class="nav-item" v-if="$root.store.username" style="margin-right: auto !important">            
            <!-- {{ $root.store.username }}: <button @click="Logout">Logout</button>      --> 
            <a class="nav-link" href="#" @click="Logout"> Logout <span class="sr-only"></span></a>            
          </li>   
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import CreateRecipe from "./components/CreateRecipe.vue";
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      const response = this.axios.post(
          "https://doralonrecipes.cs.bgu.ac.il/Logout",
        );
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    routeRegister(){
      this.router.push("./pages/RegisterPage");
    }
  },
  components: {
    CreateRecipe
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
  background-color: #edddba;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #a62501;
}
</style>
