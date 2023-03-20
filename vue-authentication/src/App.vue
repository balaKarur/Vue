<template>
<div>
  <navigation></navigation>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
        
          <router-view></router-view>
            
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import navigation from "./components/navigation.vue";
import { AUTO_LOGIN_ACTION } from "@/store/storeConstant";
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
   navigation
  },
  computed:{
       ...mapState({
         autoLogout:(state) => state.auth.autoLogout
       })
       //try to use map getter
  },
  watch:{
    autoLogout(currentValue,oldValue) {
      console.log("currentValue : " +currentValue);
      console.log("oldValue : " +oldValue);
      if(currentValue)
      {
          this.$router.replace("/login");
      }
    }
  },
  created(){
    this.$store.dispatch({type:`auth/${AUTO_LOGIN_ACTION}`});
  }
}
</script>

<style>

</style>
