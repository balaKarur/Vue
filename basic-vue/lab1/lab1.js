// const {createApp} = Vue;
// createApp({
//     data(){
//         return {
//             count:0,
            
//         }
//     }
// }).mount("#app");

const {createApp } = Vue;
const app = createApp(
    {
    data(){
        return{
            title:this.getTitle(),
            text1:"<h1>Learn</h1>",
            link:"https://vuejs.org",
            rowCls:"row",
            count:0,
            name:"Bala",
            confirmedName:"",
            databindingName:"",
            databindingName1:"",
            databindingNameByWatch:""
        }
    },
    watch:{
        databindingName(){
           return this.databindingNameByWatch = this.databindingName+"_watch";
        }
    },
    methods:{
        setName(e,lastname){
            this.name=e.target.value+lastname;
        },
        getText(){
            return "Learning vue js"
        },
        getTitle(){
            return "Create a post";
        },
        increment(){
            this.count = this.count+1;
        },
        decrement(){
            this.count = this.count-1;
        },
        formsubmit()
        {
            console.log("I am form submit click");
        },
        setConfirmedName(e){
            this.confirmedName = e.target.value;
        },
        setDatabindingName1(e){
            this.databindingName1 = e.target.value;
        },
        setDatabindingName(){
            console.log(" API setDatabindingName....");
           return this.setDatabindingNameC;
        }
        
    },
    computed:{
        setDatabindingNameC(){
            console.log("setDatabindingName....");
            return this.databindingName = this.databindingName;
        }
    }
})
app.mount("#app");

