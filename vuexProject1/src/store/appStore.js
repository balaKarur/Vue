import { createStore } from 'vuex';
import counterModule from "./modules/counter/counterStore";
import todosModule from "./modules/todo/todoStore";
const store = createStore({
    modules: {
        counterModule:counterModule,
        todosModule:todosModule
    },
    state(){
        return {
        }
    },
    getters:{},
    mutations:{},
    actions:{}
});
export default store;