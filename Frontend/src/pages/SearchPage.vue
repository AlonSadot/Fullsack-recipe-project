<template>
  <div class="container">

    
    <h1 class="title">Search Page</h1>
    <!-- <SearchBar title="searchBar" class="search-bar" />     -->
    <b-form-group >
        <b-form-input v-on:keyup.enter="search"  v-model="searchQuery" class="search-field" :placeholder="this.lastSearched" ></b-form-input>
        <!-- <b-button type="submit" class="search-button"  variant="success"> search<img src="@/assets/search.png"></b-button> -->
        <img img src="@/assets/search.png" class="search-image">
    </b-form-group>

    <b>Amount:</b>
    <b-form-select    
      v-model="amountSelected"
      :options="amountOptions"
      class="search-amount"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>

    <b>Cuisine:</b>
    <b-form-select    
      v-model="cuisineSelected"
      :options="cuisineOptions"
      class="search-cuisine"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>
    
    <b>Diet:</b>
    <b-form-select    
      v-model="dietSelected"
      :options="dietOptions"
      class="search-diet"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>
    
    <b>Intolerance:</b>
    <b-form-select    
      v-model="intoleranceSelected"
      :options="intoleranceOptions"
      class="search-intolerance"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>
    <br>
    <b>Sort results by:</b>
    <b-form-select    
      v-on:change="changeSort"
      v-model="sortSelected"
      :options="sortOptions"
      class="search-intolerance"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select> 

    <div v-if="this.recipesFound">
      <RecipePreview v-for="r in this.recipes" :key="r.id" class="recipePreview" v-bind:id="r.id" v-bind:title="r.title" v-bind:readyInMinutes="r.readyInMinutes" v-bind:image="r.image" v-bind:aggregateLikes="r.aggregateLikes" v-bind:vegan="r.vegan" v-bind:vegetarian="r.vegetarian" v-bind:glutenFree="r.glutenFree"/>    
    </div>
    <div v-else>
      <h1> No recipes found</h1>
    </div>
    


  </div>


</template>

<script>
import { METHODS } from 'http'


// npm install --save v-autosuggest

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// };
import RecipePreviewList from "../components/RecipePreviewList";
import RecipePreview from "../components/RecipePreview";

export default {
  name: "SearchPage",
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: [],
      recipesFound: true,
      lastSearched: "Search recipes",
      searchQuery: '',
      amountSelected: '5',
      amountOptions: [
        { item: '5', name: '5' },
        { item: '10', name: '10' },          
        { item: '15', name: '15' }
      ],
      cuisineSelected: 'All Cuisines',
      cuisineOptions: [
        { item: 'All Cuisines', name: 'All Cuisines' },
        { item: 'African', name: 'African' },
        { item: 'American', name: 'American' },          
        { item: 'British', name: 'British' },
        { item: 'Cajun', name: 'Cajun' },
        { item: 'Caribbean', name: 'Caribbean' },          
        { item: 'Chinese', name: 'Chinese' },
        { item: 'Eastern European', name: 'Eastern European' },
        { item: 'European', name: 'European' },          
        { item: 'French', name: 'French' },
        { item: 'German', name: 'German' },
        { item: 'Greek', name: 'Greek' },          
        { item: 'Indian', name: 'Indian' },
        { item: 'Italian', name: 'Italian' },
        { item: 'Japanese', name: 'Japanese' },          
        { item: 'Jewish', name: 'Jewish' },
        { item: 'Korean', name: 'Korean' },
        { item: 'Latin American', name: 'Latin American' },          
        { item: 'Mediterranean', name: 'Mediterranean' },
        { item: 'Mexican', name: 'Mexican' },
        { item: 'Middle Eastern', name: 'Middle Eastern' },          
        { item: 'Nordic', name: 'Nordic' },
        { item: 'Southern', name: 'Southern' },
        { item: 'Spanish', name: 'Spanish' },          
        { item: 'Thai', name: 'Thai' },
        { item: 'Vietnamese', name: 'Vietnamese' }
      ],
      dietSelected: 'All Diets',
      dietOptions: [
        { item: 'All Diets', name: 'All Diets' },
        { item: 'Gluten Free', name: 'Gluten Free' },
        { item: 'Ketogenic', name: 'Ketogenic' },
        { item: 'Vegetarian', name: 'Vegetarian' },
        { item: 'Lacto-Vegetarian', name: 'Lacto-Vegetarian' },
        { item: 'Ovo-Vegetarian', name: 'Ovo-Vegetarian' },
        { item: 'Vegan', name: 'Vegan' },
        { item: 'Pescetarian', name: 'Pescetarian' },
        { item: 'Paleo', name: 'Paleo' },
        { item: 'Primal', name: 'Primal' },
        { item: 'Low FODMAP', name: 'Low FODMAP' },
        { item: 'Whole30', name: 'Whole30' }          
      ],
      sortSelected: 'Popularity',
      sortOptions: [
        { item: 'Popularity', name: 'Popularity' },
        { item: 'Prep-time', name: 'Prep-time' }          
      ],
      intoleranceSelected: 'No Intolerances',
      intoleranceOptions: [
        { item: 'No Intolerances', name: 'No Intolerances' },
        { item: 'Dairy', name: 'Dairy' },
        { item: 'Egg', name: 'Egg' },       
        { item: 'Gluten', name: 'Gluten' },
        { item: 'Grain', name: 'Grain' },     
        { item: 'Peanut', name: 'Peanut' },
        { item: 'Seafood', name: 'Seafood' },       
        { item: 'Seasame', name: 'Seasame' },
        { item: 'Shellfish', name: 'Shellfish' },  
        { item: 'Soy', name: 'Soy' },
        { item: 'Sulfite', name: 'Sulfite' },       
        { item: 'Tree Nut', name: 'Tree Nut' },
        { item: 'Wheat', name: 'Wheat' }          
      ]
    }
  },
  mounted(){
    if (localStorage.getItem('lastSearch')){
      this.lastSearched = localStorage.getItem('lastSearch');
    } 
  },
  methods:{
    async search(){
      var that = this;
      localStorage.setItem('lastSearch', that.searchQuery);
      this.lastSearched = localStorage.getItem('lastSearch');
      var cuisine_ = '_';
      if (that.cuisineSelected != "All Cuisines"){
        cuisine_ = that.cuisineSelected;
      }
      var diet_ = '_';
      if (that.dietSelected != "All Diets"){
        diet_ = that.dietSelected;
      }
      var intolerance_ = '_';
      if (that.intoleranceSelected != "No Intolerances"){
        intolerance_ = that.intoleranceSelected;
      }
      try{ 
        const response = await this.axios.get(
          "https://doralonrecipes.cs.bgu.ac.il/recipes/search" + "/" + that.searchQuery + "/" + that.amountSelected + "/" + cuisine_ + "/" + diet_ + "/" + intolerance_,
          // this.$root.store.server_domain + "/recipes/search" + "/" + that.searchQuery + "/" + that.amountSelected + "/" + cuisine_ + "/" + diet_ + "/" + intolerance_,
          {
            params:{},
          }
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);

        if (this.recipes.length == 0){
          this.recipesFound = false;
        }
        else{
          this.recipesFound = true;
          if (that.sortSelected == "Popularity"){
          this.recipes.sort(function(a, b) {return parseFloat(a.aggregateLikes) - parseFloat(b.aggregateLikes);});
          this.recipes.reverse();
          }
          else{
            this.recipes.sort(function(a, b) {return parseFloat(a.readyInMinutes) - parseFloat(b.readyInMinutes);});
          }
        }
        

        

        console.log(response);
      }
      catch(error){
        console.log(error);
      } 
    },
    async changeSort(){
      var that = this;
      if (that.sortSelected == "Popularity"){
        this.recipes.sort(function(a, b) {return parseFloat(a.aggregateLikes) - parseFloat(b.aggregateLikes);});
        this.recipes.reverse();
      }
      else{
        this.recipes.sort(function(a, b) {return parseFloat(a.readyInMinutes) - parseFloat(b.readyInMinutes);});
      }
    }
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



.search-field {
  width: 70%;
  padding: 10px 35px 10px 15px;
  border-radius: 100px;
  outline: none;
  border: 3px solid #ccc;
  display: inline-block;
}

/* .search-button {
  
  background: transparent;
  border: none;
  outline: none;
  margin-left: -50px;
} */


.search-image {
  width: 20px;
  height: 20px;
  margin-left: -50px;
  object-fit: cover;
}

.search-amount {
  display: inline-block;
  width: 5%;
  height: 100%;
  position: relative;  
  border-radius: 15px;
  white-space: pre;
  margin-top: 2px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  
}
.search-cuisine, .search-diet, .search-intolerance{
  display: inline-block;
  width: 13%;
  height: 100%;
  position: relative;  
  border-radius: 15px;
  white-space: pre;
  margin-top: 2px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>