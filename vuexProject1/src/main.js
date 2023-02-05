import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import store from "./store/appStore";

const app = createApp(App);
app.use(store);
app.mount('#app')
// const counterModule = {
//     namespaced:true,
//     state(){
//         return{
//         count:1
//         }
//     },
//     getters:{
//         getTodoById:(state) => (id) =>{
//             return { id: 1, text: 'task1_counter', done: true }
//         }
//     },
//     mutations:{
//         increament(state,payload){
//             state.count =  state.count + payload.value;
//         }
//     },
//     actions:{
//         onIncreament(context,payload){
//             //context.commit("increament",payload);
//             setTimeout(()=>{
//                 context.commit("increament",payload);
//             },2000)},
//             actionA(context){
//                 return new Promise((resolve) =>{
//                         setTimeout(()=> {
//                             context.commit("increament",{value:1});
//                             console.log("call from action A");
//                             resolve("call from action A");
//                         },2000)
//                       })
//             },
//             actionB(context){
//                 console.log("Called Action B");
//                 return context.dispatch("actionA");
//             }
//     }
// }


// const todosModule = {
//     namespaced:true,
//     state(){
//         return{
//             todos: [
//                 { id: 1, text: 'task1', done: true },
//                 { id: 2, text: 'task2', done: true },
//                 { id: 3, text: 'task3', done: false },
//                 { id: 4, text: 'task4', done: true },
//                 { id: 5, text: 'task5', done: true },
//                 { id: 6, text: 'task6', done: false }
//               ]
//         }
//     },
//     getters:{ 
//         getDoneList(state){
//         console.log("getDoneList");
//         return state.todos.filter((todo) => todo.done);
//         },
//         getDoneListCount(state,getters){
//             console.log("getDoneListCount");
//             return getters.getDoneList.length;
//         },
//         getTodoById:(state) => (id) =>{
//             return state.todos.find((todo) =>  {
//                 return todo.id === id 
//             }
//             )}
//     },
//     mutations:{},
//     actions:{
       
//     }
// }
// const store1 = createStore({
//     modules: {
//         counterModule:counterModule,
//         todosModule:todosModule
//     }
// });
// const store1 = createStore({
//   state(){
//       return{
//           count:1,
//           todos: [
//             { id: 1, text: 'task1', done: true },
//             { id: 2, text: 'task2', done: true },
//             { id: 3, text: 'task3', done: false },
//             { id: 4, text: 'task4', done: true },
//             { id: 5, text: 'task5', done: true },
//             { id: 6, text: 'task6', done: false }
//           ]
//       }
//   },
//   //writing common function 
//   getters:{
//     getDoneList(state){
//         console.log("getDoneList");
//         return state.todos.filter((todo) => todo.done);
//     },
//     getDoneListCount(state,getters){
//         console.log("getDoneListCount");
//         return getters.getDoneList.length;
//     },
//     getTodoById:(state) => (id) =>{
//         return state.todos.find((todo) =>  {
//             return todo.id === id 
//         }
//         )
//     }
//   },
//   mutations:{
//       increament(state,payload){
//           state.count =  state.count + payload.value;
//       }
//   },
//   actions:{
//     onIncreament(context,payload){
//         //context.commit("increament",payload);
//         setTimeout(()=>{
//             context.commit("increament",payload);
//         },2000)},
//         actionA(context){
//             return new Promise((resolve) =>{
//                     setTimeout(()=> {
//                         context.commit("increament",{value:1});
//                         console.log("call from action A");
//                         resolve("call from action A");
//                     },2000)
//                   })
//         },
//         actionB(context){
//             console.log("Called Action B");
//             return context.dispatch("actionA");
//         }
//   }
// })

// const app = createApp(App);
// app.use(store);
// app.mount('#app')
