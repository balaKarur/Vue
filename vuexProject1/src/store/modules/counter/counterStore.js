import { COUNTER_M_INCREAMENT, COUNTER_A_ON_INCREAMENT, COUNTER_A_ACTIONA, COUNTER_A_ACTIONB } from "../../storeConstant";

export default {
    namespaced:true,
    state(){
        return{
        count:1
        }
    },
    getters:{
        getTodoById:(state) => (id) =>{
            return { id: 1, text: 'task1_counter', done: true }
        }
    },
    mutations:{
        //increament(state,payload){
        [COUNTER_M_INCREAMENT](state,payload){
            state.count =  state.count + payload.value;
        }
    },
    actions:{
        //onIncreament(context,payload){
        [COUNTER_A_ON_INCREAMENT](context,payload){
            //context.commit("increament",payload);
            console.log(`${COUNTER_A_ON_INCREAMENT} action triggerd` );
            setTimeout(()=>{
                context.commit(COUNTER_M_INCREAMENT,payload);
            },2000)},
            actionA(context){
                return new Promise((resolve) =>{
                        setTimeout(()=> {
                            context.commit(COUNTER_M_INCREAMENT,{value:1});
                            console.log("call from action A");
                            resolve("call from action A");
                        },2000)
                      })
            },
            //actionB(context){
            [COUNTER_A_ACTIONB](context){
                console.log("Called Action B");
                return context.dispatch(COUNTER_A_ACTIONA);
            }
    }
}