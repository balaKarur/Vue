<template>
  <div id="employee-list">  
      <h1>Employ List</h1>
      <!-- <div>{{hasEmployee()}}</div> -->
      <div v-if="employeelist1.length>0?'Has employees':'No Employ'">{{hasEmployee()}}</div>
       
      <span v-for="employee in employeelist1" :key="employee.id">
        <div v-if="editingId == employee.id">
                <input type="text"  v-model="employee.name"/>
                <button @click="onSaveEmp(employee)">Save </button>
                <button @click="OnCancelEmp(employee)">Cancel </button>
        </div>
         <div v-else>
           <span>{{employee.name}}</span>
            <span><button @click="onEditEmp(employee)">Edit </button></span>
            <span><button @click="$emit('delete:employ',employee.id)">Delete </button></span>
           </div>
      </span>
      <employee-table></employee-table>
      <employee-form @add:employee="addEmployee"></employee-form> 
  </div>
</template>
<script>
 import EmployeeForm from './EmployeeForm.vue';
 import EmployeeTable from './EmployeeTable.vue';
export default{
    name:"employee-list",
    components:{
       EmployeeForm,
         EmployeeTable
    },
    props:{
      employeelist1:Array
    },
    data(){
      return{
        editingId:null,
        cachedEmpData:null
      }
    },
   methods:{
      addEmployee(emp){
        alert("Emp list"+emp.name)
        //this.employeelist1 = [...this.employeelist1,emp]
      },
      OnCancelEmp(employee){
        this.editingId = null;
        //employee=this.cachedEmpData;
        Object.assign(employee,this.cachedEmpData)
      },
     
      onSaveEmp(employee){
        if(employee.name == "")
        {
            return;
        }
        this.$emit("edit:employee",employee.id,employee);//can pass more then one para,
        this.editingId = null;
      },
     
      onEditEmp(emp){
        this.editingId = emp.id;
        this.cachedEmpData = {...emp};
      },
      onDeleteEmp(){

      },
      hasEmployee()
      {
       console.log("hasEmployee");
       return this.employeelist1.length>0?'Has employees':'No Employ'
      }
    }
  
}
</script>
<style scoped>

</style>