<template>
  <div>
    
    <b-container>
        <h1>Your Recipes:</h1>
        <h1 v-if="this.recipes.length == 0" style="font-size: 150%;">You haven't added any recipes yet</h1>
        <div>
            <MyRecipePreview class="recipePreview" v-for="r in this.recipes" :key="r.recipe_id"
            v-bind:id="r.recipe_id"
            v-bind:title="r.title"
            v-bind:readyInMinutes="r.totalTime"
            v-bind:image="r.imageUrl"
            v-bind:aggregateLikes="0"
            v-bind:vegan="Boolean(r.vegan)"
            v-bind:vegetarian="Boolean(r.vegetarian)"
            v-bind:glutenFree="Boolean(r.glutenFree)"
            />
        </div>
        
<!-- 
        <div v-else>
            <h1>You haven't created any recipes.</h1>
        </div> -->
    </b-container>
  </div>
</template>

<script>
import MyRecipePreview from '../components/MyRecipePreview.vue'
export default {
    name:"MyRecipes",
    components:{
        MyRecipePreview
    },
    data(){
        return{
            recipes:[],
            recipesGet:[],
        }
    },
    
    async mounted(){
        const response = await this.axios.get(
                        "https://doralonrecipes.cs.bgu.ac.il/user/userRecipes",
        )
        this.recipesGet = response.data
        console.log(this.recipesGet.length)
        for(let i = 0; i<(this.recipesGet.length);i++){
            if(this.recipesGet.length<=i)
                break
            // console.log(this.recipesGet[i])
            // console.log(this.recipesGet[i])
            this.recipes.push(this.recipesGet[i])
        }
        // console.log(this.recipesGet)
        
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