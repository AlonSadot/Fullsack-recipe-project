<template>
  <div>
    <h1 class="title-text">Family Recipes</h1>
    
      <FamilyRecipe v-for="r in this.recipes.data" :key="r.recipeId"  v-bind:familyOwner="r.familyOwner" v-bind:recipeName="r.recipeName" v-bind:occasion="r.occasion" v-bind:ingredients="r.ingredients" v-bind:instructions="r.instructions" v-bind:recipeImage="r.recipeImage" />            

  </div>


</template>

<script>

import FamilyRecipe from "../components/FamilyRecipe";


export default {
  name: "family",
  components: {
    FamilyRecipe
  },
  data() {
    return {
      recipes: []
    }
  },
  async mounted(){
    this.recipes = await this.axios.get(
        "https://doralonrecipes.cs.bgu.ac.il/familyrecipes/getFamRecipes" ,
        {        
        }
    );
  },
  methods:{
  }
}
</script>


<style>




.title-text{
  font-weight: bold;
  font-family: Garamond, serif;
  font-size:4vw;
  margin-left: 100px;
}


</style>