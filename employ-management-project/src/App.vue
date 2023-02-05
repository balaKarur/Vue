<template>

  <div>
  
  <employee-form @add:employee="addEmployee"></employee-form> 
  <employee-list :employeelist1="employees" 
                 @delete:employ="deleteEmp" 
                 @edit:employee="editEmploy"
                 />
  </div>
</template>

<script>
import EmployeeList from './components/EmployeeList.vue';
import EmployeeForm from './components/EmployeeForm.vue';

export default {
  name: 'App',
  components: {
    EmployeeList,
    EmployeeForm
  },
  data(){
    return {
      /*employees:[
        {id:1,name:"Bala"},
        {id:2,name:"Mani"},
        {id:3,name:"Ram"}
      ]*/
      employees: []
    }
  },
  methods:{
      async addEmployee(emp){
        emp.id = this.employees.length+1;
        //this.employees = [...this.employees,emp];
        this.postEmployee(emp);
      },
     
      async deleteEmp(empId){
        console.log("Deleting emp");
        var employeeList = [...this.employees];
        const data = await this.deleteEmployee(empId);
        if(data != "")
        {
          this.employees =  employeeList.filter(emp => emp.id != empId);
        }
        // var empIndex =  employeeList.findIndex(emp => emp.id == empId);
        // delete employeeList[empIndex];
        // this.employees = employeeList;
      },
      async editEmploy(empId,updatedEmp){
             console.log("Emp Edited");
            const updatedData =  await this.putEmployee(updatedEmp);
            if(updatedData != "")
            {
              this.employees.map((emp) =>  {
                  return emp.id == empId ? updatedEmp : emp
               });
            }
            
      },
      //APi call
      async getEmployees()
      {
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/users",{method:"GET"});
            const data =  await response.json();
            this.employees = data;
        }
        catch(error){
            console.log(error);
        }
      },
      async postEmployee(employee)
      {
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/users",
            {
              method:"POST",
              body:JSON.stringify(employee),
              headers:{
                "Content-type":"application/json;charset=UTF-8"
              }
            });
            const data = await response.json();
            if(data != null)
            {
                this.employees = [...this.employees,data];
            }
            
        }
        catch(error){
            console.log(error);
        }
      },
     async putEmployee(emp)
      {
          const response = await fetch("https://jsonplaceholder.typicode.com/users/"+emp.id,{
                              method:"PUT",
                              body:JSON.stringify(emp),
                              header:{
                                "Content-type":"application/json;charset=UTF-8"
                              }
                            });
          const data = await response.json();
          console.log("Edited user data :" + data);
          return data;
      },
      async deleteEmployee(empId)
      {
        var data = "";
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/users1/"+empId,{
                   method:"DELETE"
              });
             if(response.status != 404) 
             {
                data = await response.json();
             }
            
        
        }catch(error)
        {
            console.log(error);
        }
       return data;
      }
    },
  mounted(){
    console.log("mounted event triggered");
    this.getEmployees()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
