<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2>Posts</h2>
        
         <span v-for="(post) in posts" :key="post.title">
           <a href="" @click.prevent="chageTitle(post)" :style={color:blue} > chageTitle </a>
            <single-post  :isActive="1" my-data="postdata1"  :data="post"></single-post>
         </span>
      </div>
    </div>
  </div>
</template>
<script>
import SinglePost from "./components/singlePost.vue";
export default {
  name:"App",
  data(){
    return {
      posts:[{title:"Post1",
                   description:"description1"},
                   {title:"Post2",
                   description:"description2"}
                   ]
    }
  },
  methods:{
    chageTitle(post){
      post.title="Post1 updated"
    }
  },
  components:{"single-post":SinglePost}

}
</script>

<style  scoped>

</style>
