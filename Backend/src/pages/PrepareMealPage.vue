<template>
  <div class="container">
    <h1 class="title">Prepare Meal </h1>
    <p class="title" style="font-size:1.75vw;">  Total recipes : {{numOfRecipes}}</p>
    <!-- <h1 class="title">{{this.recipes.data[0]}} </h1> -->
    <!-- <h1 v-if=" this.recipes.data.length" class="title" style="font-size:2.25vw;"> No recipes added </h1> -->
    <!-- <p> {{this.numOfRecipes}} </p> -->
    <b-button style="float:right" variant="danger" @click="resetMeal()">Reset Meal</b-button>
    <div class="recipes" v-for="recipe in this.recipes.data" :key="recipe.recipe_id">

        
        <p class="title" style="font-size:1.75vw;"> {{recipe.recipe_title}}</p>
        <p class="title" style="font-size:1.25vw;">  Recipe position : {{recipe.recipe_count}}</p>
        
        <div class="arrowContain">
            <a class="above-arrow" v-if="recipe.recipe_count != 1" @click="moveUp(recipe.recipe_count, recipe.recipe_id)"  target="_blank">
                <img class="arrowButton" src="../assets/upArrow.png"  />           
            </a>          
            <br>
            <br>
            <a class="bottom-arrow" style="position: relative;" v-if="recipe.recipe_count != numOfRecipes" @click="moveDown(recipe.recipe_count, recipe.recipe_id)"  target="_blank">
                <img class="arrowButton" src="../assets/downArrow.png"  />       
            </a>
      
 
        </div>        
         <a class="bottom-arrow" style="position: relative; float:right;"  @click="deleteSingleRecipe(recipe.recipe_id)"  target="_blank">
            <img class="arrowButton" src="../assets/cross.png"  />       
        </a>


        <img :src="recipe.recipe_image" class="recipe-image" />       
        
        
        <div v-for="id in [recipe.recipe_id]" :key="id">             
            <b-progress :max="recipesTotal[id + 9]" height="2rem"> 
                <b-progress-bar :value=recipesAmount[id]>
                    <span>Progress: <strong> {{recipesAmount[id]}} / {{ recipesTotal[id + 9] }}</strong></span>
                </b-progress-bar>
            </b-progress>
        </div>        

        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        
    </div>
  </div>
</template>

<script>


export default {
  name: "UserFavorites",

  data() {
    return {
      recipes: [],
      numOfRecipes: null,
      recipesAmount: null,
      recipesTotal: null
    }
  },
  async mounted(){
    this.recipes = await this.axios.get(
      "https://doralonrecipes.cs.bgu.ac.il/user/mealRecipes",
      {
        params:{},
      }
    );
    this.numOfRecipes =this.recipes.data.length;    

    this.recipesAmount = Object;
    this.recipesTotal = Object;
    
    
    for (let i = 0 ; i < this.recipes.data.length ; i ++){
        let instructionAmount = localStorage.getItem(this.recipes.data[i].recipe_id + "0");            
        let currNum = this.recipes.data[i].recipe_id;
        if (instructionAmount != null)
            this.recipesTotal[currNum + 9] = parseInt(instructionAmount);
        else{            
            this.recipesTotal[currNum + 9] = 0;
            instructionAmount =0;
        }   
        // alert(this.recipesTotal[currNum])

        let counter =0;                 
        for (let j =1 ; j <= instructionAmount ; j++){
            let currentStep = localStorage.getItem(this.recipes.data[i].recipe_id.toString() + j.toString());               
            if (currentStep != null){
                counter += 1;
            }
        } 
        // alert(this.recipesTotal[currNum]);
        this.recipesAmount[currNum] = counter;    
        // alert(this.recipesAmount[currNum]);        
    }

  },
  methods:{
    async moveUp(recipe_c, recipe_i){
        await this.axios.put(
          "https://doralonrecipes.cs.bgu.ac.il/user/changeMealOrderAbove" ,
          {
            recipe_count: recipe_c,
            recipe_id : recipe_i
          }
        );

        this.recipes = await this.axios.get(
            "https://doralonrecipes.cs.bgu.ac.il/user/mealRecipes",
            {
                params:{},
            }
        );
    },
    async moveDown(recipe_c, recipe_i){
        await this.axios.put(
          "https://doralonrecipes.cs.bgu.ac.il/user/changeMealOrderBellow" ,
          {
            recipe_count: recipe_c,
            recipe_id : recipe_i
          }
        );        
        this.recipes = await this.axios.get(
            "https://doralonrecipes.cs.bgu.ac.il/user/mealRecipes",
            {
                params:{},
            }
        );
    },
    async deleteSingleRecipe(recipe_i){
        await this.axios.delete(
          "https://doralonrecipes.cs.bgu.ac.il/user/RemoveRecipeFromMeal" ,
          {  data:{
            recipe_id : recipe_i
          }            
          }
        );
        this.recipes = await this.axios.get(
            "https://doralonrecipes.cs.bgu.ac.il/user/mealRecipes",
            {
                params:{},
            }
        );
        this.numOfRecipes =this.recipes.data.length;

    },
    async resetMeal(){        
        await this.axios.delete(
          "https://doralonrecipes.cs.bgu.ac.il/user/resetMeal" ,
          {  
          }                      
        );
        this.recipes = await this.axios.get(
            "https://doralonrecipes.cs.bgu.ac.il/user/mealRecipes",
            {
                params:{},
            }
        );
        this.numOfRecipes =this.recipes.data.length;    

    }
  }
}
</script>


<style>
.recipe-image{  
  max-width: 25%;
  height: auto;
  width: auto;
  /* border: thick double #fcb40c; */
  border-radius: 30px;
  background-position: left top;
  background-repeat: repeat;
  transition: transform .35s;
  border-collapse: inherit;
  margin-left: 5%;


}
.title{
    font-weight: bold;
    font-family: Garamond, serif;
    font-size:4vw;
}

.arrowContain {
    /* height: 150px; */
    position: relative;
    /* float: left; */    
    float: left;

}
.bottom-arrow {
    position: absolute;
    /* bottom: 0;
    left: 0; */
    /* width:50px;     */
    /* padding-bottom: -50px; */
}
.above-arrow {
    position: absolute;
    /* bottom: 100%; */    
    /* width:50px; */
    /* padding-top: -25px; */
}

.arrowButton{
    width: 50px;
    cursor: pointer;
    
}

</style>