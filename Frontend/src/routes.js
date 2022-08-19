import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/myrecipe/:recipeId",
    name: "myrecipe",
    component: () => import("./pages/MyRecipesView"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/UserFavorites"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyRecipes"),
  },
  {
    path: "/makeRecipe",
    name: "makeRecipe",
    component: () => import("./pages/MakeRecipePage"),
  },
  {
    path: "/prepareMeal",
    name: "prepareMeal",
    component: () => import("./pages/PrepareMealPage"),
  },
  {
    path: "/about",
    name: "about",
    component: ()=> import("./pages/About")
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: ()=> import("./pages/MyRecipes")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/about",
    name: "about",
    component: ()=> import("./pages/About")
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: ()=> import("./pages/MyRecipes")
  },
];

export default routes;
