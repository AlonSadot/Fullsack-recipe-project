
<template>
  <div class="container">
    <div v-if="recipe">
    <h1 class="title-text">{{ this.recipe.title }}</h1>
      <div class="wrapper">
        <div class="left">
          <img :src="recipe.image" class="recipe-image" />
          <div class="images">
            <img src="../assets/vegan.png" class="diet-image" v-if="typeof recipe.vegan === 'boolean' && recipe.vegan"/>
            <img src="../assets/vegetarian.png" class="diet-image" style="width: 15%; height: 15%;" v-if="typeof recipe.vegetarian === 'boolean' && recipe.vegetarian"/>
            <img src="../assets/gluten.png" class="diet-image" v-if="typeof recipe.glutenFree === 'boolean' && recipe.glutenFree"/>
          </div>
        </div>
        <div class="right">
          <img src="../assets/clock.png" class="details-image" />
          <b>Preparation: </b>
          <p class="recipe-details">{{ this.recipe.readyInMinutes }} minutes</p>
          <br>
          <img src="../assets/like.png" class="details-image" />
          <b>Popularity: </b>     
          <p class="recipe-details">{{ this.recipe.popularity }} likes</p>
          <br>
          <img src="../assets/servings.png" class="details-image" />
          <b>Yield: </b>     
          <p class="recipe-details">{{ this.recipe.servings }} servings</p>
          
        </div>
      </div>
      <hr style="height:2px;border-width:0;color:gray;background-color:gray">
      <h1 class="ingredients-text"> Ingredients </h1>
      <ul>
        <li
          v-for="(r, index) in this.recipe.extendedIngredients"
          :key="index + '_' + r.recipe_id"
        >
          {{ r }}
        </li>
      </ul>
      <hr style="height:2px;border-width:0;color:gray;background-color:gray">
      <h1 class="ingredients-text"> Instructions </h1>
      <ol>
        <li class="step-li"
          v-for="(r, index) in this.recipe._instructions.slice()"
          :key="index + '_' + r.recipe_id"
        >
          {{ r }}
        </li>
      </ol>
      <hr style="height:5px;border-width:0;color:gray;background-color:black">
    </div>
    
  </div>
</template>

<script>
import FavoriteHistory from "../components/FavoriteHistory";
export default {
  components: {
  },
  data() {
    return {
      recipe: null,
      isFavorite:false,
      watched:false,
      recipe_id:""
    };
  },
  
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          // this.$root.store.server_domain + "/recipes/info",
          "https://doralonrecipes.cs.bgu.ac.il/user/userRecipes",
          {
            // params: { id: this.$route.params.recipeId }
          }
        );
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      try{
      console.log(response.data)
      for(let i=0;i<response.data.length;i++){
        if (response.data[i].recipe_id == this.$route.params.recipeId){
          this.recipe = response.data[i]
          break
        }
        if (i==response.data.length-1)
          throw error;
      }
      }catch (error) {
        console.log("error.response.status", error.response);
        this.$router.replace("/NotFound");
        return;
      }
      
      console.log(this.recipe.ingredients)
      let inFavorites = false; 
      let watched = false; 
      let extendedIngredients = this.recipe.ingredients.split("\n");
      let glutenFree = this.recipe.glutenFree;
      let image = this.recipe.imageUrl
      let id = this.recipe.recipe_id
      let instructions = this.recipe.instructions
      let popularity = this.recipe.aggregateLikes
      let readyInMinutes = this.recipe.totalTime
      let vegan = this.recipe.vegan
      let vegetarian = this.recipe.vegetarian
      let servings = this.recipe.servings
      let title = this.recipe.title
      let _instructions = instructions.split("\n");
      console.log(_instructions)
      // console.log(id,
      //   instructions,
      //   _instructions,
      //   // analyzedInstructions,
      //   extendedIngredients,
      //   popularity,
      //   readyInMinutes,
      //   image,
      //   vegan,
      //   vegetarian,
      //   glutenFree,
      //   inFavorites,
      //   watched,
      //   servings,
      //   title)
      let _recipe = {
        id,
        instructions,
        _instructions,
        // analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        vegan,
        vegetarian,
        glutenFree,
        inFavorites,
        watched,
        servings,
        title
      };
      console.log(extendedIngredients)
      
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.wrapper {
    width: 1000px;
    /* border: 5px solid black; */
    overflow: hidden; /* will contain if #first is longer than #second */
}
.left {
    width: 600px;
    float:left; /* add this */
    /* border: 5px solid red; */
}
.right {
    /* border: 3px solid rgb(0, 0, 0); */
    overflow: hidden; /* if you don't want #second to wrap below #first */
    margin-top: 10px;
    /* margin-right: -300px; */
}
.favorite-watched{
      margin-top: 175px;
      width: 205px;
      margin-left: 30px;
}
.title-text{
  font-weight: bold;
  font-family: Garamond, serif;
  font-size:4vw;
}
.ingredients-text{
  font-family: Garamond, serif;
  font-size:3.5vw;
}
.recipe-image{
  border: 3px solid rgb(240, 236, 236);
  border-radius: 15px;
  padding: 5px;
  width: 550px;
}
.diet-image{
  width: 11.5%;
  height: 11.5%;
  margin-right: 10px;
}
.details-image{
  width: 7.5%;
  height: 7.5%;
  margin-right: 10px;
}
.recipe-details{
  display: inline-block;
  margin-bottom: 5px;
  margin-top: 5px;
  font-family: 'Times New Roman', serif;
  font-size: large;
}
/* .recipe-header{
} */
ol {
  list-style-type: none;
  counter-reset: elementcounter;
  padding-left: 0;
}
.step-li:before {
  content: "Step " counter(elementcounter) ". ";
  counter-increment: elementcounter;
  font-weight: bold;
  
}
</style>