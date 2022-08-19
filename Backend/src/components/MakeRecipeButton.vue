  <template>
<div class ="all-details">
    <div class="buttons" v-if="$root.store.username">        
        <router-link :to="{name: 'makeRecipe' , params: { id: this.id, title: this.title, image: this.image, instructions: this.recipeInstructions, ingredients: this.ingredients, servings: this.servings } }">
          <b-button class="make-button" @click="addToMeal(false)" variant="success" >Make this recipe</b-button> 
        </router-link>

        <b-button class="add-button" @click="addToMeal(true)" variant="success" >Add this recipe to the upcoming meal</b-button>          
         
    </div>
</div>
  
</template>

<script>

export default {
  data() {
    return {
      recipeInstructions : null
    };
  },
  async mounted() {    
    let response;
    try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          // this.$root.store.server_domain + "/recipes/info",
          "https://doralonrecipes.cs.bgu.ac.il/recipes/recipeAnalyzed" + "/" + this.id,
          {
            // params: { id: this.$route.params.recipeId }
          }
        );

    } catch (error) {}
    this.recipeInstructions = response.data
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    ingredients:{
      type: Array,
      required: true
    },
    servings:{
      type: Number,
      required: true
    }
  },
  methods:{
    async addToMeal(alerts){
      if (alerts){
        alert("recipe added to meal");
      }
      const response = await this.axios.post(
          "https://doralonrecipes.cs.bgu.ac.il/user/addRecipeToMeal" ,
        {
          imageUrl: this.image,
          title: this.title,
          id: this.id
        }
      );

    },
  },
};
</script>

<style scoped>

.all-details{
  width: 25.7%;
}

.buttons{
     /* width: 80%; */
    margin: auto;
    /* padding: 10px; */
}

.add-button{
    
    margin-top: 5px;
    width: 167px;
}
.recipe-details{
  display: inline-block;
  margin-bottom: 5px;
  margin-top: 5px;
  font-family: 'Times New Roman', serif;
  /* font-size: large; */
  font-size:95%;
  
}

.favorites{
  margin-left: -25px;
}

.watched{
  display: inline-block;
  margin-left: -25px;
}


</style>
