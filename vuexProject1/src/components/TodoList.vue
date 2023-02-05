<template>
  <div class="container">
      <h2>MY TodoList (Done : {{getDoneListCount()}})</h2>
       <h2>MY TodoList (Done : {{doneListCount}}) from getters</h2>
      
    <ul class="list-group">
            <li v-for="todo in todoList" :key="todo.id" class="list-group-item" >
                <span>{{todo.text}} - {{todo.done ? "Done" : "Not Done"}}</span>
            </li>
    </ul>
        <div>Data from getters in getter via computed properties</div>
        <ul class="list-group">
            <li v-for="(todo) in getDoneList" :key="todo.id" class="list-group-item">
                <span @click.prevent="getSelectedTaskById(todo.id)">{{todo.text}} - {{todo.done ? "Done" : "Not Done"}}</span>

            </li>
        </ul>
        <div style="color:green">Selected Task</div>
            <!-- <div v-if="getSelectTask">{{getSelectTask.text}}- {{getSelectTask.done ? "Done" : "Not Done"}}</div>
            <div v-if="!getSelectTask">No Selected Task</div> -->
            <div v-if="selectedTask">{{selectedTask.text}}- {{selectedTask.done ? "Done" : "Not Done"}}</div>
            <div v-if="!selectedTask">No Selected Task</div>
            
  </div>
  
</template>
<script>
import {mapGetters, mapState} from 'vuex';
export default {

data(){
    return {
     selectedTaskId:"",
     selectedTask:""
    }
},
computed:{
    // todoList(){
    //     return this.$store.state.todos;
    // },
    ...mapState({
        todoList:(state) => state.todosModule.todos
    }),
    //   doneListCount(){
    //       console.log("call from getters"); 
    //     return this.$store.getters.getDoneListCount;
    // },
    // ...mapGetters({
    //     doneListCount:"todosModule/getDoneListCount",
    //     getDoneList:"todosModule/getDoneList",
    //     getSelectTask:"todosModule/getTodoById"
        
    // }),
  
  //or
   ...mapGetters("todosModule",{
        doneListCount:"getDoneListCount",
        getDoneList:"getDoneList",
        getSelectTask:"getTodoById"
        
    }),
    // getDoneList(){
    //         return this.$store.getters.getDoneList;
    // },
    // getSelectTask(){
    //    const selectedTask =   this.$store.getters.getTodoById(this.selectedTaskId);
    //    return selectedTask;
    // }
},
methods:{
    //we can avoid writing common logic in each componnet 
    //for that we can use getter and write our logic
    getDoneListCount(){
        console.log("getDoneListCountCount");
        return this.todoList.filter((todo) => todo.done).length;
    },
    getSelectedTaskById(id){
       this.selectedTaskId =id;
       this.selectedTask = this.getSelectTask(this.selectedTaskId);
       //even from method can call getters
       const todo = this.$store.getters["todosModule/getTodoById"](this.selectedTaskId);
       console.log("todo : "+ JSON.stringify(todo));
    }
}
}
</script>
<style lang="scss" scoped>

</style>
