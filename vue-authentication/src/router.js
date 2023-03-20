import { createRouter, createWebHistory } from "vue-router";
//Static way of loading component
// import Login from "./components/Login/login.vue";
// import Signup from "./components/Signup/signup.vue"
// import PostList from "./components/PostList.vue"
// import homeCom from "./components/homeCom.vue"
import { IS_USER_AUTHENTICATE_GETTER  } from "@/store/storeConstant";
//Dynamic loading teh componenet
const Login = () =>import(/*webpackChunkName:"Login"*/"./components/Login/login.vue");
const Signup = () => import(/*webpackChunkName:"Signup"*/"./components/Signup/signup.vue");
const PostList = () =>  import(/*webpackChunkName:"Post List"*/"./components/PostList.vue");
const homeCom = () => import(/*webpackChunkName:"Home"*/ "./components/homeCom.vue");

//import {mapActions} from "vuex";
import store from "./store/store"  
const routes = [
    { path: "/", component: homeCom ,meta:{auth:true}},
  { path: "/login", component: Login ,meta:{auth:false}},
  { path: "/signup", component: Signup ,meta:{auth:false}},
  { path: "/PostList", component: PostList,meta:{auth:true} },
  
];
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})
//access in store data in router guard
router.beforeEach((to,from,next) => {
    
    if((to.meta.auth) && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`])
    {
        
        next("/login");
    }
    // else if('auth' in to.meta && 
    //    !to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]){//PostList negative case
    //     next("/PostList");
    // }
    else{
        next();
    }
})

export default router;