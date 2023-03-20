import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store/store';
import Axios from "axios";
import {GET_USER_TOKEN_GETTER} from "@/store/storeConstant";

//Axios.interceptors
Axios.interceptors.request.use(function(config){
    let params = new URLSearchParams();
    let token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
    console.log("token : "+token);
    params.append("auth",store.state.auth.token);
    //config.headers["token"]=store.state.auth.token;
    config.params = params;
    return config;
},function(error){
 return Promise.reject(error);
})

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app')
