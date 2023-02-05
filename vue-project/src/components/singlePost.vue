<template>
<div>
    <div :class='{"bg-color":isActive}' class="p-3">
            <div class="title"> {{data.title}} {{isActive}} {{myData}}</div>
            <div>{{data.description}}</div>
    </div>
</div>
</template>
<script>

export default {
    //props:["isActive","data"],
    props:{
        data:{
            type:Object,
            required:true
        },
        isActive:{
           type:Number,
           required:false,
           default:1
        },
        myData:{
           type:String,
           required:false,
           default:"dd"
        }
    },
    data(){
        return {
        }
    }
}
</script>
<style  scoped>
.bg-color{
    background: gray;
}
</style>
