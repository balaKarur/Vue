<template>
<div class="row my-5">
    <div class="col-md-6 offset-md-3">
        <div>
            <h3>Login </h3>
            <hr/>
        </div>
        <form @submit.prevent="onLogin()">
                <div v-if="message" class="alert" :class="(messageStatus == 'success')?'alert-success':'alert-danger'">
                    <span >{{message}}</span>
                    <span class="close-icon" @click.prevent="closeWarning"> X</span> 
                </div>
                <div class="form-group">
                    <label >E-mail</label>
                    <input placeholder="Enter E-mail" class="form-control" v-model="email"/>
                    <div class="error" v-if="errors.email" >{{errors.email}}</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input placeholder="Enter Password" class="form-control" password v-model="password" />
                    <div class="error" v-if="errors.password" >{{errors.password}}</div>
                </div>
                <div class="my-3">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
    </div>
</div>
 
</template>
<script>
import { mapActions } from 'vuex';
//import {mapState} from "vuex";
import signupValidation from "../../services/signupValidation";
import {LOGIN_ACTION} from "@/store/storeConstant";
 export default {
     name:"my-login", 
     data(){
         return {
            email:"bala@gmail.com",
            password:"1234567",
            errors:{},
            message:"",
            messageStatus:"fail"
         }
     },
     methods:{
         ...mapActions("auth",{
            signin:LOGIN_ACTION
         }),         
         async onLogin(){
             let validation = new signupValidation(this.email,this.password);
             this.errors = validation.checkValidation();
            if ("email" in this.errors || "password" in this.errors) {
                return false;
            }
            this.message = '';
            try{
                let response = await  this.signin({email:this.email,password:this.password});
                if(response)
                {
                    //alert("Login Successfull...");
                    this.message =  "Login Successfull...";
                    this.messageStatus="success";
                    setTimeout( ()=>{
                        this.$router.push({path:"/PostList"})}
                        ,500)
                   
                }
            }catch(e)
            {
                this.message = e;
                this.messageStatus="fail";
            }
            
           
             //signup
         },
         closeWarning(){
            this.message="";
         }
     }
    //  computed:{
    //      ...mapState("auth",{
    //          userName:(state) => state.name

    //      })
    //  }
 }
</script>
<style>
.error{
    color:red
}
.close-icon{
    float: right;
    color: gray;
}
span.close-icon:hover {
    cursor: pointer;
    color: black;
}
</style>