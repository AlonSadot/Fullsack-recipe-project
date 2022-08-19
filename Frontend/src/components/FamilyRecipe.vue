<template>
  <div class="container" style=" margin-right: 400px;">
    <p> <span class="ingredients-text">  {{this.recipeName}} </span> <span class="owner-text"> by {{this.familyOwner}} </span> </p>
    <p class="owner-text"> A {{this.occasion}} recipe </p>

    
    <img :src="this.recipeImage" class="recipe-image" />



    
    <p class="ingredients-text"> Ingredients </p>


    <ul>
        <li
          v-for="(r, index) in this.ingredients_list.slice(0, -1)"
          :key="index">
          {{ r }}
        </li>
    </ul>

    <hr style="height:2px;border-width:0;color:gray;background-color:gray">

    <p class="ingredients-text"> Instructions </p>
    
    <ol>
    <li class="step-li"
        v-for="(r, index) in this.instructions_list.slice(0, -1)"
        :key="index">
        {{ r }}
    </li>
    </ol>
    
    <hr style="height:6px;border-width:5px;color:black;background-color:black">

  </div>
</template>

<script>



export default {

  async mounted(){
    let ing = this.ingredients.split("\.");
    this.ingredients_list = ing;
    let ins = this.instructions.split("\.");
    this.instructions_list = ins;
  },
  data() {
    return {
      ingredients_list: [],
      instructions_list: [],
      recipe: null
    };
  },
    props: {
    familyOwner: {
      type: String,
      required: true
    },
    recipeName: {
      type: String,
      required: true
    },
    occasion: {
      type: String,
      required: true
    },
    ingredients: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    recipeImage: {
      type: String,
      required: true
    },

  },
  

};


</script>

<style scoped>
.ingredients-text{
  font-family: Garamond, serif;
  font-size:3.5vw;
}

.owner-text{
  font-family: Garamond, serif;  
  font-size:1.5vw;
}

.recipe-image{
  border: 3px solid rgb(255, 255, 255);
  border-radius: 15px;
  padding: 5px;
  width: 550px;
}
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
