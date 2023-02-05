const {createApp} = Vue;
const app = createApp({
        data(){
            return {
            name:"",
            boxASelected:false,
            boxBSelected:false,
            boxCSelected:false,
            }
        },
        computed:{
            boxAClass(){
                //return {active:this.boxBSelected , class2:true,box:true}
                return [{active:boxBSelected},{class2:true},'box'];
            }
        },
        methods:{
            onBoxSelected(box){
                console.log("Box : " + box);
                if(box == "A")
                {
                    this.boxASelected = !this.boxASelected;
                }
                else if(box == "B")
                {
                    this.boxBSelected = !this.boxBSelected ;
                }
                else 
                {
                    this.boxCSelected = !this.boxCSelected ;
                }
            }
        }
    }
)
app.mount("#app");