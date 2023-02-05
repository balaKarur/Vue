

<template>
<div class="container">
  <counter></counter>
  <h3> App vue counter</h3>
  <button @click.prevent="onIncreament({value:1})">Increament in App</button>
  <div>{{count}}</div>
  <div>getDoneListCount : {{getDoneListCount}}</div>
  <hr>
  <Todo></Todo>
</div>

</template>
<script>
import Counter from "./components/Counter.vue"
import Todo from "./components/TodoList.vue"
import {mapState , mapGetters,mapActions} from 'vuex';
export default({
 data(){
   return{
     counter:0
   }
 },
 computed:{
  //  count(){
  //   return  this.$store.state.count;
  //  }
     //simplified way
     ...mapState({
       count:(state) => state.counterModule.count
     }),
    //  getDoneListCount(){
    //     return this.$store.getters.getDoneListCount;
    //  },
     ...mapGetters({
        getDoneListCount:'todosModule/getDoneListCount'
     })
 },
 components:{
   Counter:Counter,
   Todo:Todo
 },
 methods:{
    //  onIncreament(){
    //       //this.$store.state.count++;
    //       this.$store.commit("increament",2);
    //  }
    ...mapActions({
      onIncreament:"counterModule/onIncreament"
    })
 }
})
</script>

<style scoped>
</style>

