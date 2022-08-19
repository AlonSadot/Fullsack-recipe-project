<template>
  <div class="container">
    <h1 class="title-text">Favorites</h1>
    <RecipePreview v-for="r in this.recipes" :key="r.data.id" class="recipePreview" v-bind:id="r.data.id" v-bind:title="r.data.title" v-bind:readyInMinutes="r.data.readyInMinutes" v-bind:image="r.data.image" v-bind:aggregateLikes="r.data.popularity" v-bind:vegan="r.data.vegan" v-bind:vegetarian="r.data.vegetarian" v-bind:glutenFree="r.data.glutenFree"/>    


  </div>


</template>

<script>




import RecipePreview from "../components/RecipePreview";

export default {
  name: "UserFavorites",
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: [],
      favorites: []
    }
  },
  async mounted(){
    this.favorites = await this.axios.get(
      "https://doralonrecipes.cs.bgu.ac.il/user/favorites",
      {
        params:{},
      }
    );

    for (let i=0 ; i < this.favorites.data.length; i++){
      // this.recipes.push(this.favorites.data[i].recipe_id);
      this.recipes.push(
        await this.axios.get(
          // this.$root.store.server_domain + "/recipes/info",
          "https://doralonrecipes.cs.bgu.ac.il/recipes/recipeDetails" + "/" + this.favorites.data[i].recipe_id,
          {}
        )
      );
    }
  },
  methods:{
  }
}
</script>


<style>


.recipePreview{
  display: inline-block;
  margin: 12.5px;
  border: 3px solid rgb(232, 232, 232);
  border-radius: 10%;
}



.search-field {
  width: 70%;
  padding: 10px 35px 10px 15px;
  border-radius: 100px;
  outline: none;
  border: 3px solid #ccc;
  display: inline-block;
}

.title-text{
  font-weight: bold;
  font-family: Garamond, serif;
  font-size:4vw;
}


.search-image {
  width: 20px;
  height: 20px;
  margin-left: -50px;
  object-fit: cover;
}

.search-amount {
  display: inline-block;
  width: 5%;
  height: 100%;
  position: relative;  
  border-radius: 15px;
  white-space: pre;
  margin-top: 2px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  
}
.search-cuisine, .search-diet, .search-intolerance{
  display: inline-block;
  width: 13%;
  height: 100%;
  position: relative;  
  border-radius: 15px;
  white-space: pre;
  margin-top: 2px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>