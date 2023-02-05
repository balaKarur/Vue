<template>
 <div>
   <div>{{$store.state.counterModule.count}}</div>
   <div>{{count}}</div><!--thru computed property -->
   <button @click.prevent="onIncreament({value:2})">Increament_counter_Action</button>
     <button @click.prevent="increament({value:3})">Increament_counter_mutation</button><!--  thsi will call mutation-->
 </div>
</template>
<script>
import {mapState,mapActions, mapMutations} from 'vuex';
import { COUNTER_M_INCREAMENT, COUNTER_A_ON_INCREAMENT, COUNTER_A_ACTIONA, COUNTER_A_ACTIONB} from "../store/storeConstant";
export default({
 data(){
   return{
     counter:0
   }
 },
 computed:{
    //  count(){
    //   return this.$store.state.count; 
    //  }
    ...mapState({
      count:(state) => state.counterModule.count
    })
 },
 methods:{
    //  onIncreament(){
    //       //this.$store.state.count++;
    //      // this.$store.commit("increament",1);
    //     //   this.$store.commit({
    //     //       type:"increament",
    //     //        value:1});
    //     // this.$store.dispatch({
    //     //        type:"onIncreament",
    //     //         value:1});
    //     //caling action
    //     //this.$store.dispatch("actionA").then((response) =>{
    //       this.$store.dispatch("actionB").then((response) =>{
    //         console.log("successfully called Action A");
    //         console.log(response);
            
    //     });
    //  }
    //how to handel Async call in mapAction
    ...mapActions({
      //onIncreament:`counterModule/${COUNTER_A_ON_INCREAMENT}`
      //onIncreament:`counterModule/${COUNTER_A_ACTIONA}`
      onIncreament:`counterModule/${COUNTER_A_ACTIONB}`

    }),
    ...mapMutations({
      //increament:"counterModule/increament"
    increament:`counterModule/${COUNTER_M_INCREAMENT}`
    })

 }
})
</script>

<style scoped>
</style>