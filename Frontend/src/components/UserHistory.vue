<template>
    <div>

        <!-- <RecipePreview v-for="recipe in this.history"
        
        /> -->
        <div v-if="this.history.length > 0">
            <RecipePreview class="recipePreview" v-for="recipe in this.history" :key="recipe.id"
            v-bind:id="recipe.id"
            v-bind:title="recipe.title"
            v-bind:readyInMinutes="recipe.readyInMinutes"
            v-bind:image="recipe.image"
            v-bind:vegan="recipe.vegan"
            v-bind:vegetarian="recipe.vegetarian"
            v-bind:glutenFree="recipe.glutenFree"
            v-bind:aggregateLikes="recipe.popularity"
            />
        </div>
        
        <div v-else>
            <h1>You haven't viewed any recipe! Feel free to check them :)</h1>

        </div>


        <!-- <RecipePreview class="recipePreview"
        v-for = "r in this.history" :key="r.id"
        v-bind:id="r.id"
        v-bind:title="r.title"
        v-bind:readyInMinutes="r.readyInMinutes"
        v-bind:image="r.image"
        v-bind:aggregateLikes="r.aggregateLikes"
        v-bind:vegan="r.vegan"
        v-bind:vegetarian="r.vegetarian"
        v-bind:glutenFree="r.glutenFree"
        /> -->


    </div>    
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default({
    name: "userHistory",
    components:{
        RecipePreview
    },
    data(){
        return{
            history : [],
            ids: []
        }
    },
    async mounted(){ 
        const response = await this.axios.get(
        "https://doralonrecipes.cs.bgu.ac.il/user/history"
        );
        this.ids=(response.data);
        for(let i=0;i<3;i++){
            if(i>=this.ids.length)
                break
            // console.log(this.ids[i].recipe_id);
            this.history.push(
                (await this.axios.get("https://doralonrecipes.cs.bgu.ac.il/recipes/recipeDetails" + "/" + this.ids[i].recipe_id)).data
                
            )
        }
},
})
</script>

<style>
.recipePreview{
  display: inline-block;
  margin: 12.5px;
  border: 3px solid rgb(230, 230, 226);
  border-radius: 10%;
}
</style>