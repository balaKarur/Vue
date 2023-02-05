<template>
<div @edit:employ="editEmploy">

    <h1>Employee Form</h1>
    <!-- <form v-on:submit.prevent="addEmploy"> -->
        <form @submit.prevent="addEmploy" >
        <div>
            <label>Name :</label>
            <input type="text" 
            v-model="employee.name"
            :class="{'has-error':submitting && invalidName}"
            @focus="clearStatus"
            @keypress="clearStatus"
            ref="firstInput">
        </div>
        <div>
            <label> Email :</label>
            <input type="text" placeholder="E-mail" v-model="employee.email"
            :class="{'has-error':submitting && invalidName}"
            @focus="clearStatus"
            @keypress="clearStatus"
            >
        </div>
         <p class="errorMsg" v-if="error">
             Please fill out all the required fields!
         </p>
         <p class="successMsg" v-if="success">Employee Successfully added!</p>
        <button >Add Employee</button>
       
    </form>
    </div>
</template>
<script>
export default{
    name:"employee-form",
    data(){
       return {
        submitting:false,
        success:false,
        error:false,
        employee:{
            name:"",
            email:""
        }
       } 
    },
    methods:{
        addEmploy()
        {
           this.submitting=true;
           this.clearStatus();
           if(this.invalidName || this.invalidEmail )
           {
                this.error = true;
                return;
           }
            //e.preventDefault();
            this.$emit("add:employee",this.employee);
            this.clearState();
             this.success = true;
             this.error =false;
             this.submitting=false;
             this.$refs.firstInput.focus();
        },
        editEmploy(emp)
        {
            alert("Edit employ"+emp.name);
        },
        clearStatus(){
            this.success = false,
            this.error = false
        },
         clearState(){
            this.employee={ name:"",
                            email:""
                        }
        }
    },
    computed:{
        invalidName(){
            console.log("invalidName called");
           return  this.employee.name === "";
        },
        invalidEmail(){
             console.log("invalidEmail called");
           return  this.employee.email === "";
        }
    }
   
}
</script>
<style scoped>
[class*="Msg"]{
font-size: 16px;
}
.errorMsg{
    color: red;
}
.successMsg{
    color: forestgreen;
}
.has-error{
    border: 1px solid red;
}
</style>
