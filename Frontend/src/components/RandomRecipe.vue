<template>
  <b-container>
    <div>
        <RecipePreview class="recipePreview"
        v-for="r in this.recipes" :key="r.id" 
        v-bind:id="r.id"
        v-bind:title="r.title"
        v-bind:readyInMinutes="r.readyInMinutes"
        v-bind:image="r.image"
        v-bind:aggregateLikes="r.aggregateLikes"
        v-bind:vegan="r.vegan"
        v-bind:vegetarian="r.vegetarian"
        v-bind:glutenFree="r.glutenFree"
        />
        <!-- <RecipePreview v-for="r in this.recipes" :key="r.id" v-bind:id="r.id" v-bind:title="r.title" v-bind:readyInMinutes="r.readyInMinutes" v-bind:image="r.image" v-bind:aggregateLikes="r.aggregateLikes" v-bind:vegan="r.vegan" v-bind:vegetarian="r.vegetarian" v-bind:glutenFree="r.glutenFree"/> -->
            
        <!-- <p>
            {{this.recipes.id}}
        </p> -->
    </div>
  </b-container>
</template>

<script>
// import { axios } from 'vue/types/umd'
import RecipePreview from './RecipePreview';
    export default{
    name: "getRandomRecipe",
    components: {
        RecipePreview
    },
    
    data(){
        return{
            recipes: []        
        };
    },
    async mounted(){
        const response = await this.axios.get(
        "https://doralonrecipes.cs.bgu.ac.il/recipes/random"
        );
        this.recipes=(response.data);

    }

}
</script>

<style>
.recipePreview{
  display: inline-block;
  margin: 12.5px;
  border: 3px solid rgb(230, 230, 226);
  border-radius: 10%;
}
</style>
