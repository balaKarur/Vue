import Validation from "./validation";

export default class signupValidation{
    constructor(email,password,userName){
        this.email=email;
        this.password=password;
        this.userName=userName;
    }
    
    checkValidation(){
        let errors = {};
        if(!Validation.checkEmail(this.email))
        {
            errors["email"] = "Invalid E-Mail";
        }
        if(!Validation.minLength(this.password,6)){
            errors["password"]="password should be of 6 characters";
        }
        return errors;
    }
    checkSignUpValidation(){
        let errors = this.checkValidation();
        if(!Validation.isEmpty(this.userName)){
            errors["userName"]="userName cannot be empty";
        }
        return errors;
    }
    //Create own class for erros list and use it 
    static getErrorMessageFromCode(errorCode){
      switch(errorCode){
        case "EMAIL_EXISTS":
               return 'E-mail already exist';
        case "EMAIL_NOT_FOUND":
            return 'E-mail Not Found';
        case "INVALID_PASSWORD":
            return 'Invalid password';
        default:
            return "Unexpected error occured. Please contact Admin."
      }
    }
}