const { createApp}=Vue;
const app = createApp({
    data(){
        return{
            count:0
        }
    },
    beforeCreate(){
        console.log("beforeCreate");
    },
    created(){
        console.log("create");
    },
    beforeMount(){

        console.log("template will be createdbeforeMount");
    },
    mounted(){
        console.log("Template will be retdured After mount");
        this.count=this.count+1;
        this.count=this.count+1;
        console.log(this.count);
    },
    beforeUpdate()
    {
        console.log("beforeUpdate");
        console.log(this.count);
    },
    updated(){
        console.log("update");
        console.log(this.count);
    },
    beforeUnmount(){
        console.log("beforeUnmount");
    },
    unmounted(){
        console.log("unmount");
    }
    
})
app.mount("#app")
setTimeout(() =>{
    app.unmount();
},6000
    
)