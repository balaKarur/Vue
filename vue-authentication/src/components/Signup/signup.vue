<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div>
                <h3>SignUp : {{userName}}</h3>
                <hr/>
            </div>
            <form @submit.prevent="onSignUp()">
                <div class="form-group">
                    <label for="">User Name</label>
                    <input placeholder="Enter User Name" type=text class="form-control" v-model="userName"/>
                    <div class="error" v-if="errors.email" >{{errors.userName}}</div>
                </div>
                 <div class="form-group">
                    <label for="">E-mail</label>
                    <input placeholder="Enter E-mail" type=text class="form-control" v-model="email"/>
                    <div class="error" v-if="errors.email" >{{errors.email}}</div>
                </div>
                 <div class="form-group">
                    <label for="">Password</label>
                    <input placeholder="Enter Password" type=text class="form-control" v-model="password"/>
                    <div class="error" v-if="errors.email" >{{errors.password}}</div>
                </div>
                 <div class="form-group">
                   <button type="submit">SignUp</button>
                   <div>refreshToken : {{refreshToken1}}</div>
                </div>
            </form>
        </div>
       
    </div>
</template>
<script>
import {mapState, mapActions} from "vuex";
import signupValidation from "../../services/signupValidation";
import { SIGNUP_ACTION } from "@/store/storeConstant";

export default{
    name:"sign-up",
    data(){
         return  {
            userName:"",
            email:"",
            password:"",
            errors:{}
         }
     },
     beforeRouteLeave(){
            console.log("beforeRouteLeave-------");
            console.log(this.$store.state.auth);
     },
     // here this wont available , because before componenet registration this beforeRouteEnter will be invoked 
     //vm mean current object , its equal to this 
     beforeRouteEnter(to,from,next){
         next(vm =>{
            console.log("beforeRouteEnter----");
            console.log(vm.$store.state.auth.email);
         })
           
     },
     computed:{
          ...mapState({
            refreshToken1:(state) => state.auth.refreshToken
         }),
     },
     methods:{
         ...mapActions("auth",{
                signup:SIGNUP_ACTION
         }),
         async onSignUp(){
             console.log("onSignUp");
             let validation = new signupValidation(this.email,this.password,this.userName);
             this.errors = validation.checkSignUpValidation();
             if("email" in this.errors || "password" in this.errors)
             {
                 return false;
             }
             let response = await this.signup({email:this.email,password:this.password,userName:this.userName});
             if(response)
             {
                 alert("User data saved...")
             }
         },
         
     }
}
</script>
