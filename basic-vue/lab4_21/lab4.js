const { createApp}=Vue;
const app = createApp({
    data(){
        return{
            textMsg:""
        }
    },
    methods:{
        setText(){
            console.log("setText");
            this.textMsg = this.$refs.textref.value;
        }
    }
})
app.mount("#app")