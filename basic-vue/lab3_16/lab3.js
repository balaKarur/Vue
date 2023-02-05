const { createApp } = Vue;
console.log("App added");
const app = createApp({
    data(){
        return{
            goals:[{name:"React",id:1},{name:"Vue",id:2}],
            enteredGoal:""
        }
    },
    methods:{
        addGoal(){
            this.goals.push({"name":this.enteredGoal,"id":this.goals+1});
            this.enteredGoal="";
        },
        deleteGoal(index){
            this.goals.splice(index,1);
            // for(var goal1 of this.goals) {
            //     if(goal1["name"] === goal["name"]) 
            //     {
            //         delete goal1["name"];
            //         console.log(this.goals);
            //         return;
            //     }
            // }
        }
    }
});
app.mount("#app");