<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active"  v-if="isAuth">
          <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item" v-if="!isAuth"> 
        <!-- <a class="nav-link" href="login">Login</a> -->
        <router-link class="nav-link"  to="/login">Login</router-link>
      </li>
      <li class="nav-item" v-if="!isAuth" >
        <!-- <a class="nav-link" href="signup">Signup</a> -->
        <router-link class="nav-link" to="/signup">Signup</router-link>
      </li>
       <li class="nav-item" v-if="isAuth">
        <!-- <a class="nav-link" href="signup">Signup</a> -->
        <router-link class="nav-link"  to="/PostList">Posts</router-link>
      </li>
      <li class="nav-item" style="cursor: pointer;" v-if="isAuth">
        <a class="nav-link" @click.prevent=onLogout()>Logout</a> 
      </li>
    
    </ul>
  </div>
</nav>
</template>
<script>
import { LOGOUT_ACTION } from "@/store/storeConstant";
//import { mapGetters } from "vuex";
import { mapActions } from "vuex";

//import {store} from "@/store/modules/auth/auth.js"
export default{
    name:"my-navigation",
    data(){
      return {
         //isAuth:false
      }
    },
    computed:{
       //isAuth:store.state.auth.token,
      // ...mapGetters("auth",{
      //       isAuth:IS_USER_AUTHENTICATE_GETTER,
      //       //data:console.log(this.isAuth)
      //        //isAuth:(state) => state.auth.token
      
      //     }),
          isAuth () {
            console.log("call from isAuth getters"); 
              //return this.$store.state.auth.token  == "" ? false :true;
             return this.$store.getters["auth/checkIsAuthExist"];
              // const todo = this.$store.getters["todosModule/getTodoById"](this.selectedTaskId);
            }
    },
    // mounted:{
    //   isAuth:true
    // },
     methods:{
        // ...mapActions({
        //     logoutAction:`auth/${LOGOUT}`

        //   }),
          // ...mapActions("auth",{
          //  logoutAction:`${LOGOUT}`
          //  }),
      ...mapActions("auth",{
            logoutAction:LOGOUT_ACTION
            }),
      onLogout(){
       let response  = this.logoutAction();
       if(response)
       {
          this.$router.replace({path:"/login"});
       }
        
      }
     }
}
</script>
