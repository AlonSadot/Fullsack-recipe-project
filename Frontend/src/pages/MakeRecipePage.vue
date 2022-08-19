<template>
  <div class="container">
        <p class="title"> {{this.title}} </p>              
        <img :src="this.image" class="recipe-image" />       

        <b-progress :max="this.numSteps" height="2rem"> 
            <b-progress-bar :value=this.stepsFinished.length>
                <span>Progress: <strong> {{this.stepsFinished.length}} / {{ numSteps }}</strong></span>
            </b-progress-bar>
        </b-progress>
        <p class="title" style="font-size:3vw"> Recipe ingredients amount</p>
        <input type="number" id="amounts" name="amounts" step="1" min="1" value="1" @change="amountChange()">
        <p class="title" style="font-size:2vw"> {{this.servings * this.recipeAmount}} Servings</p>        
        <p v-for="(ingredient) in this.ingredients" :key="ingredient.id">
         {{ingredient.amount * recipeAmount}} {{ingredient.nameClean}} 
         </p>
        

         <p class="title" style="font-size:3vw"> Recipe Steps </p>
         <div  v-for="(step) in this.recipeInstructions" :key="step.id">
            <hr style="height:2px;border-width:0;color:gray;background-color:gray">
            <p class="title" style="font-size:2vw"> step {{step.number}}  </p>            

            <input :id="step.number" :value="step.number" type="checkbox" v-model="stepsFinished" @change="checked(step.number)"/>

            <p> {{step.step}}  </p>            
            <p class="title" style="font-size:1.5vw" v-if="step.ingredients.length > 0"> Ingredients for this step: </p>
            <div v-for="(ing) in step.ingredients" :key="ing.name">             
            <li> {{ing.name}}</li>
            </div>
            <br>
            <p class="title" style="font-size:1.5vw" v-if="step.equipment.length > 0"> Equipment for this step: </p>
            <div v-for="(eq) in step.equipment" :key="eq.id">             
            <p> {{eq.name}}</p>
            </div>
            <div v-if="step.length">
                <p class="title" style="font-size:1.5vw"> Step length: </p>
                <p> {{step.length.number}} {{step.length.unit}} </p>
            </div>
        </div >

  </div>
</template>

<script>



export default {
  data() {
    return {
      stepsFinished : [] , 
      title : null,
      image : null,
      ingredients: null,
      servings: null,
      id: null,
      recipeInstructions : null,
      numSteps: null,
      recipeAmount: null
    };
  },
  async created() {
    this.recipeInstructions = this.$route.params.instructions[0].steps;
    this.numSteps = this.recipeInstructions.length;
    this.title = this.$route.params.title;
    this.id = this.$route.params.id;
    this.image = this.$route.params.image;   
    this.ingredients = this.$route.params.ingredients;
    this.servings = this.$route.params.servings;    
    this.recipeAmount = 1;
    
    localStorage.setItem(this.id.toString() + "0", this.numSteps);


    
  },    
  async mounted(){
    for (let i =0; i < this.recipeInstructions.length; i++){
        if (localStorage.getItem(this.id.toString() + this.recipeInstructions[i].number.toString()) == 1){
              document.getElementById(this.recipeInstructions[i].number).checked = true;              
              document.getElementById(this.recipeInstructions[i].number).click();
              document.getElementById(this.recipeInstructions[i].number).click();
        }
    }
  },
  methods:{
    checked(boxNumber){        
        if (document.getElementById(boxNumber).checked) {
            localStorage.setItem(this.id.toString() + boxNumber.toString(), 1);
        }
        else{
            localStorage.removeItem(this.id.toString() + boxNumber.toString());
        }
    },
    amountChange(){
      this.recipeAmount = document.getElementById("amounts").value;
    }
  }
};
</script>

<style scoped>

.title{
     font-weight: bold;
    font-family: Garamond, serif;
    font-size:4vw;
}
.recipe-image{
  border: 3px solid rgb(240, 236, 236);
  border-radius: 15px;
  padding: 5px;
  width: 550px;
}


</style>
