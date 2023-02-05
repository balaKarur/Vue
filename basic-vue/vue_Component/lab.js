const myComponent = {
    template:`  <div class="row">
                    <div class="col-md-12">
                        <ul class="list-group">Goals
                            <li class="list-group-item">React</li>
                            <li class="list-group-item">React1</li>
                        </ul>
                    </div>
                </div>`,
    data(){
        return{

        }
    }
}
const { createApp}=Vue;

const app = createApp({
    data(){
        return {
            "data":""
        }
    },
   components:{"my-component":myComponent}
    
});

app.component("goal-component",{
    template:`  <div class="row">
                    <div class="col-md-12">
                        <ul class="list-group">Goals
                            <li class="list-group-item">React</li>
                            <li class="list-group-item">React1</li>
                        </ul>
                    </div>
                </div>`,
    data(){
        return{

        }
    }
})
app.mount("#app")