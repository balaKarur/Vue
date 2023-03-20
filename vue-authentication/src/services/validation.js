/* eslint-disable */
export default class Validation{
    
    static checkEmail(email){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
          return true;
        }
        return false;
    }
    static minLength(name,minLength){
        if(name.length > minLength)
        {
            return true;
        }
        return false;
    }
    static isEmpty(name){
        if(name.length > 0 )
        {
            return true;
        }
        return false;
    }
}
