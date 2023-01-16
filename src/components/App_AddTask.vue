<template>
<!-- @submit directive pointint to onSubmit method in script block below.-->
    <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" name="text" v-model="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        type="text"
        name="date"
        v-model="date"
        placeholder="Add Day & Time"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" name="reminder" v-model="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
    export default {
        name: 'App_AddTask',
    
    // set a data object to save the bound inputs of the form from the relevant name fields to their v-bound properties. Note the data values are set to empty, awaiting binding to the v-model.
        data(){
            return {
                text: '',
                day: '',
                reminder: false, // default false
            }
        },
        methods: {
            onSubmit(ev) {
                ev.preventDefault();
                //basic form data validation
                if(!this.text || !this.date){
                    //if text field is empty alert user: 
                    alert('Please enter a task name and date');
                return;
                }
                // if validation is passed, take incoming form data and wrap it into a const. 
                const newTask = {
                    //issue a provisional front-end only random math based id because we have no backend access
                    id :  Math.floor(Math.random()*100000),
                    text: this.text,
                    day: this.day,
                    reminder: this.reminder,
                }
                //Emit/bubble upwards from this level to the upper levels the values of the const with save task info.
                this.$emit('add-task', newTask);
                //reset the v-bindings back to '' (rememebr that the v-model is a two way binding, what we now set to the v-models will also bind to the existing values of each field.
                this.text = '';
                this.day = '' ;
                this.reminder= false;
            },
        },
    }
</script>

<style scoped>
add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>