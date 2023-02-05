export default {
    namespaced:true,
    state(){
        return{
            todos: [
                { id: 1, text: 'task1', done: true },
                { id: 2, text: 'task2', done: true },
                { id: 3, text: 'task3', done: false },
                { id: 4, text: 'task4', done: true },
                { id: 5, text: 'task5', done: true },
                { id: 6, text: 'task6', done: false }
              ]
        }
    },
    getters:{ 
        getDoneList(state){
        console.log("getDoneList");
        return state.todos.filter((todo) => todo.done);
        },
        getDoneListCount(state,getters){
            console.log("getDoneListCount");
            return getters.getDoneList.length;
        },
        getTodoById:(state) => (id) =>{
            return state.todos.find((todo) =>  {
                return todo.id === id 
            }
            )}
    },
    mutations:{},
    actions:{
       
    }
}
