import { SIGNUP_ACTION, SET_USER_TOKEN_DATA_MUTATIONS,LOGIN_ACTION ,GET_USER_TOKEN_GETTER ,
    IS_USER_AUTHENTICATE_GETTER,LOGOUT_ACTION ,
    AUTO_LOGIN_ACTION ,Auth_REST_ACTION , AUTO_LOGOUT_ACTION,AUTO_LOGOUT_MUTATION,GET_REFRESH_TOKEN_ACTION,
    UPDATE_NEW_TOKEN} from "@/store/storeConstant";
   
//import  signupValidation  from "@/services/signupValidation";
import signupValidation from "../../../services/signupValidation"; 
const axios = require('axios');
let timer ="";
let sec = 0;
let sessionInterval="";
export default{
    namespaced:true,
    state(){
        return {
            token	:"",
            email : "",
            refreshToken : "",	
            expiresIn : "",
            userId : "",
            userName:"",
            autoLogout:false,
            API_KEY:"AIzaSyAsnzjOLoC5brynW8p5VZzwHyNQu9Nv3U4"
        }
    },
    mutations:{
        [SET_USER_TOKEN_DATA_MUTATIONS](state,payload){
            state.email = payload.email;
            state.refreshToken = payload.refreshToken;
            state.expiresIn = payload.expiresIn;
            state.userId = payload.userId;
            state.token = payload.token;
            state.autoLogout = false;
            console.log(`${SET_USER_TOKEN_DATA_MUTATIONS} called `+JSON.stringify(payload));
           
        },
        [AUTO_LOGOUT_MUTATION]:(state)=>{
            state.autoLogout = true;
        },
        [UPDATE_NEW_TOKEN]:(state,payload) =>{
            state.token = payload.token;
            
        }
    },
    getters:{
        [GET_USER_TOKEN_GETTER]:(state)=>{
            console.log("GET_USER_TOKEN_GETTER called....");
            return state.token;
        },
        [IS_USER_AUTHENTICATE_GETTER](state) {
            console.log("IS_USER_AUTHENTICATE_GETTER called....");
            return !!state.token ;
        },
       
        checkIsAuthExist(state){
            return !!state.token ;
        }
    },
    actions:{
       
        [AUTO_LOGOUT_ACTION](context){
           
            context.dispatch(LOGOUT_ACTION);
        },
        async [AUTO_LOGIN_ACTION](context){
            clearInterval(sessionInterval);
            console.log("sessionInterval cleared....");
            context.dispatch("_logSession");
            
            const authDetailsString = localStorage.getItem("AuthDetails");
            if(authDetailsString != null)
            {
                let authDetails = JSON.parse(authDetailsString);
                let expire = authDetails.expiresIn - new Date().getTime();
                console.log("Session expire in :"+expire);
                if(expire < 10000)
                {
                   //get refresh token by token
                    //call auto logout
                    console.log("Session expired calling autoLogout");
                    //context.dispatch(AUTO_LOGOUT_ACTION);
                    //context.dispatch(GET_REFRESH_TOKEN_ACTION);
                }
                context.commit(SET_USER_TOKEN_DATA_MUTATIONS,authDetails);
                await context.dispatch(GET_REFRESH_TOKEN_ACTION);//for testing
            }
        },
        [LOGOUT_ACTION](context){
            clearInterval(sessionInterval);
            
            console.log("sessionInterval cleared....");
            console.log("LOGOUT_ACTION called....");
            
            context.commit(SET_USER_TOKEN_DATA_MUTATIONS,{
                token	:null,
                email : null,
                refreshToken : null,	
                expiresIn : null,
                userId : null,
            });
            localStorage.removeItem("AuthDetails");
            if(timer)
            {
                //clear the sesstion set timeout
                console.log("Clearig setTime out");
                clearTimeout(timer);
            }
            context.commit(AUTO_LOGOUT_MUTATION);
        },
        async [GET_REFRESH_TOKEN_ACTION](context){
            let refreshToken = context.state.refreshToken;
            let API_KEY = context.state.API_KEY;
            let payload = {"grant_type":"refresh_token",refresh_token : refreshToken};
            
            await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,payload).then(response =>{
                console.log("GET_REFRESH_TOKEN_ACTION : "+JSON.stringify(response.data));

                const authDetailsString = localStorage.getItem("AuthDetails");
                const authDetailsObj = JSON.parse(authDetailsString);
                authDetailsObj.token = response.data.id_token;

                localStorage.setItem("AuthDetails",JSON.stringify(authDetailsObj));
                context.commit(UPDATE_NEW_TOKEN,response.data); 
           })
        },
        async [SIGNUP_ACTION](context,payload)
        {
            let API_KEY = context.state.API_KEY;
            context.dispatch(`${Auth_REST_ACTION}`,{
                ...payload,
                url:`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
            })
        },
        async [LOGIN_ACTION](context,payload)
        {
            context.dispatch("_logSession");
            let API_KEY = context.state.API_KEY;
            return await context.dispatch(`${Auth_REST_ACTION}`,{
                ...payload,
                url:`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}` 
            })
        },
        _logSession(){
            sessionInterval = setInterval(() =>{
                sec = sec+1;
                //console.log("Seconds : "+sec);
                },1000)
        },
       //async [SIGNUP_ACTION](context,payload)
       async [Auth_REST_ACTION](context,payload)
        {
           console.log("Action :" +SIGNUP_ACTION);
            let postData = {
               email:payload.email,
               password:payload.password,
               returnSecureToken:true
           }
           let response = "";
           try{
               //https://firebase.google.com/docs/reference/rest/auth 
               // from firebase we can get teh URL
               // api key we can get from project Settings
               //https://console.firebase.google.com/project/demobve-324913/settings/general/web:MzgwMDcwMGUtMThmNi00NGNjLWE1ZjItNmI2MDUzN2M2NDk1
                // response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsnzjOLoC5brynW8p5VZzwHyNQu9Nv3U4`,
                // postData);
                 response = await axios.post(payload.url,
                postData);
                
           }
           catch(ex)
           {
               console.log(ex);
               let errorMessage =  signupValidation.getErrorMessageFromCode(ex.response.data.error.message);
               throw errorMessage;
           }
           console.log(`Response : ${response}`);
            if(response.status == 200)
            {
                context.dispatch({type:"_updateUserData",data:response.data});
              return true;
            }
           return false;
           
           
        },
        _updateUserData(context,response){
            let data = response.data;
            let expiresIn = +data.expiresIn*1000;
            //let expiresIn = 10*1000;
            console.log("Initialize  setTime out");
            timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION);
            },expiresIn);
            let paylod = {
                token	:data.idToken,
                email : data.email,
                refreshToken : data.refreshToken,	
                expiresIn : data.expiresIn,
                userId : data.localId,
            }
            context.commit(SET_USER_TOKEN_DATA_MUTATIONS,paylod);
            localStorage.setItem("AuthDetails",JSON.stringify(paylod));  
        },
    }
}