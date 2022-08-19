<template>
  <div>


  <div class="text">
    <span>W</span>
    <span>E</span>
    <span>L</span>
    <span>C</span>
    <span>O</span>
    <span>M</span>
    <span>E</span>
    <span></span>
    <span>T</span>
    <span>O</span>
    <span></span>
    <span>O</span>
    <span>U</span>
    <span>R</span>
    <span></span>
    <span>R</span>
    <span>E</span>
    <span>C</span>
    <span>I</span>
    <span>P</span>
    <span>E</span>
    <span></span>
    <span>S</span>
    <span>I</span>
    <span>T</span>
    <span>E</span>
  </div>

    <div>
    
    <div v-if = !$root.store.username>
      <div class="Random_Recipes_Guest">
        <RandomRecipe :key="refresh"/>
        <div class="center_button">
        <b-button @click="UpdateRecipes()">Click here to refresh the recipes</b-button>
        </div>
      </div>
      <div class="Mainpage_login">
        <Login/>
      </div>
    </div>  

    <div v-else class="align_pages">
      <div class="Random_Recipes_User">
        <h1>Explore These Recipes:</h1>
        <RandomRecipe :key="refresh"/>
        <div class="center_button">
        <b-button @click="UpdateRecipes()">Click here to refresh the recipes</b-button>
        </div>
      </div>
      <div class="Recent_Recipes">
        <h1> Last Watched Recipes: </h1>
        <UserHistory/>  
      </div>            
      </div>
    </div>

  </div>


</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RandomRecipe from "../components/RandomRecipe";
import Login from "./LoginPage";
import UserFavoritesVue from "./UserFavorites.vue";
import UserHistory from "../components/UserHistory.vue";
export default {
  mounted(){
  },
  components: {
    Login,
    UserHistory,
    RandomRecipe
  },
  methods:{
    async UpdateRecipes(){
      this.refresh += 1
    }
  },
  data(){
    return{
      refresh: 0
    }
  }
};
</script>

<style lang="scss" scoped>
// .RandomRecipes {
//   margin-right: 500px;
// }
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
// .main_page{
//   //  text-align:center
   
// }
.center_button{
  margin-left:200px
}
.Random_Recipes_Guest{
  // border:1px solid #000;
  display:inline-block;
  width: 70%;
  // height: 0%;
  vertical-align:top; /* here */
  // margin-bottom: 100px;
  // padding: 2px;
  
  
}
.Random_Recipes_User{
  // border:1px solid #000;
  display:inline-block;
  width: 50%;
  // height: 0%;
  vertical-align:top; /* here */
  // margin-bottom: 100px;
  // padding: 2px;
  
  
}
.Recent_Recipes{
  // border:1px solid #000;
  display:inline-block;
  width: 50%;
  // height: 0%;
  // vertical-align:top; /* here */
  // margin-bottom: 100px;
  // padding: 2px;
}
.Mainpage_login{
  // border:1px solid red;
  display:inline-block;
  width: 30%;
  // margin-bottom: 100px;
  line-height: 100%;
  vertical-align: top; /* here */
  
}
.image-fit{
  width: 300px; 
  height: 200px; 
  // object-fit: scale-down;
  object-fit:fill;
  // width: 300px; 
  // height: 337px; 
  // object-fit: contain;
}
.text {
  display: flex;
  justify-content: center;
  margin-top: 15vh;
  transform: translateY(-50%);
  // margin: 250px auto;
  text-align: center;
  // border: 1px solid #000;
  transition: transform .3s ease-in-out;
  font-size: 26px;
  
  &:hover {
    transform: rotateX(35deg), translateY(-50%);   
    span {
      color: #ccc;
      &:nth-child(odd) {
        transform: skewY(15deg);      
        // background-color: #f00;
        // box-shadow: 0 60px 20px rgba(0,0,0,0.1);
      }
      &:nth-child(even) {
        transform: skewY(-15deg);      
        background-color: #f9f9f9;
        color: #a6a6a6;
        // box-shadow: 0 60px 20px rgba(0,0,0,0.1);
      }
    }
  }
  
  > span {
    display: block;
    background-color: #fff;
    width: 120px;
    height: 120px;
    line-height: 120px;
    transition: transform .3s ease-in-out, color .3s ease-in-out, background-color .3s ease-in-out;
    box-shadow: 0 40px 50px rgba(0,0,0,0.1);
    &:first-child {
      border-radius: 5px 0 0 5px;
    }
  }
}
.align_pages{
      display: flex;
    justify-content: space-between;
}
</style>
