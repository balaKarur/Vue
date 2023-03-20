<template>
    <div> <div>Posts List</div>
    <table class="table">
        <thead>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
        </thead>
        <tbody>
            <tr v-for="post in posts" :key="post.id">
                <td>{{post.id}}</td>
                <td>{{post.title}}</td>
                <td>{{post.description}}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<script>
import axios from 'axios'
import { GET_USER_TOKEN_GETTER } from "@/store/storeConstant";
import {mapGetters} from "vuex";
export default {
    data(){
        return {
            posts:[],
            token:""
            
        }
    },
    computed: {
        //this not working NTC
        /**auth mean store module name */
        ...mapGetters("auth",{
            token:GET_USER_TOKEN_GETTER,
            
        })
    },
    mounted(){
            this.getPosts()
    },
    // beforeRouteEnter (to, from, next) {
    //    next((vm) => {
    //             if(vm.token == "")
    //             {
                    
    //             }
    //     }) 
        
    // },
    methods:{
        getPosts(){
            this.token = this.$store.state.auth.token;
            //axios.get(`https://demobve-324913-default-rtdb.firebaseio.com/posts.json?auth=${this.token}`).then((response) =>{
            axios.get(`https://demobve-324913-default-rtdb.firebaseio.com/posts.json`).then((response) =>{
                   if(response.statusText == "OK"){
                        this.formatPostData(response.data);
                   }
            })
        },
        formatPostData(postData){
              for(let postItem in postData)
              {
                this.posts.push({id:postItem,...postData[postItem]});
              }
        }
    }
}
</script>