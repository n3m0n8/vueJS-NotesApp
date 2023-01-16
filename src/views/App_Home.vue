<template>
    <h4 style="text-align:center">Welcome! Here are your tasks.</h4> <br>
    <h5>Toggle the task urgency by double clicking on a task.</h5>
    <h5>Delete with the X button and add with the top-right button.</h5>
<!-- we create a div to contain the add task form. only on toggle the add task button will it show (it loads with a boolean value of false on first load as provided by data() method in our scripts block below.
    to achieve the condition we use a v-show binding that takes a boolean true or false. the emitted toggle-task-form event listener, which has gone up two levels from Header_Button ->> ti App_Header and now via the header componoent above into our scripts block will trigger the associated showTaskForm method, which is also defined in the scripts block. that method just inverse whatever the current state of the date() {} held formShowing property is - from true to false and vice versa on a successful listening of a click on the add task button held down in Header_Button.  
    -->
    <div v-show="formShowing">
    <!--We are recieving the emitted addTask const data that has been save to main memory and emitted upward to this app component level-->
    <App_AddTask @add-task="addTask" />
    </div>
    <!--Note that we are binding the tasks data defined in the tasks array below in this App view to the component App_Tasks' own tasks prop.-->
    <!--Note here that we finish pulling up the delete-a-task directive from the below floors lower into the DOM levels/components. We now can listen for any such emissions of a click event asking to delete a task based on the id of the task and pass that toa deleteTask method defined below in the script section-->
    <App_Tasks @toggle-reminder="toggleReminder" @delete-a-task="deleteTask" :tasksArrProp="tasksData"/>

</template>

<!--SCRIPT BLOCK-->
<script> 
// IMPORTS
import App_Tasks from '../components/App_Tasks';
import App_AddTask from '../components/App_AddTask';
// EXPORTS
export default {
    name: 'App_Home',
    // here we defined the drilledProp of formShowing, vbound on the app.vue and only rendered by the router-view element when those components being called upon by the router-view element have that defined in its props object o the compilation block, as is the case below with this current Home component
    props: {
        //remember with the props object, we are just declaring the property being used/caught by this element by an upper level component/element (in this case the router-view element). And we declare its type, i.e. typescript.
        formShowing: Boolean,
    },
    components: {
        App_Tasks,
        App_AddTask,
    },
    data(){
        return{
            // note that we initialise the tasks object returned by the data meth as an empty array. it's values are filled below by the created() lifecycle meth
            tasksData: [],
        }
    },
    methods: {
        addTask(incomingTask){
        this.tasksData = [...this.tasksData, incomingTask]
        },
        deleteTask(id){
        //before deploying the filter, we can deploy a simple popup warning for the user to confirm deletion here using vue's builtin confirm() method within an if condition block: 
            if (confirm('Are you sure you want to delete this task?')){
            // the delete task method will basically take anything recieved as arg1 id of the task node being emitted for deletion and will filter it OUT of the existing tasksData array (that we defined above). Once we filter it, we are assigning it to the same tasksData array, thus making that tasksData array's membership change (i.e. dropping the zeroed in arg1 pass id'd task node that was bubbled up to this floor). the filter method will go through each element of the tasksData array and is given a callback function as a filter condition. that callback says: if that particular array element's id does not match the deleteTask method's (arg1 passed id) then it 'makes the cut' and filters through to the newly assigned value of the tasksData array on the left hand side of the expression. If we do have a hit, then it d'oesnt make the cut, and is thus effectively deleted.
            this.tasksData = this.tasksData.filter((task) =>  task.id !==id);
            }
        },
        toggleReminder(id){
            console.log(id);
            // same as filter method but instead using map to iterate through the tasksData array elements and checked on the ternerary conditional..
            // remember to preface the locally scoped var (tasksData) with the this class/namespace global referent to 'escape' function block scop.
            this.tasksData = this.tasksData.map(
            // if the particular task element being mapped at the momemnt has an id attribute that matched the arg1 pass id in our function then...
                (task) => task.id === id 
                // then we have a hit, so we map through every property of current task element (i.e. we pass them through a filter or 'map them out into existence'/ or better to think of map as the parser acknowledges the existence of these other (...) task attributes and thus allows them through into the newly assigned tasksData array  BUT, when it comes to the reminder attributes of each of these iteratively mapped elements, we want to flip the value of that as we discover each of their reminder attributes we want to flip them to the opposite of the equivalent reminder attributes of the tasks that are being doubled clicked on by the user down there in the tasks.vue component and that have been bubbled up to us to our arg1 of this function - indicated by the !inverse notation
                ? { ...task, reminder: !task.reminder }
                // this third operation of the ternarary says simply, if the test at the first part of the ternary doesn't hold true, i.e then just map out all the elements values as they are - this one is needed to stabilise the state of the values -i.e if the function isnt recieving any clicks that are bubbling to arg1 then just stay put, don't mess with the task elements' attributes in the tasksData array
                : task
            );
        },
    },
    created(){
  // we now fill the data that is to be returned on completion of lifecycle.
    this.tasksData = [
      {
        id: 1,
        text: 'NodeJS FullStack Project',
        day: '6 January 2023',
        reminder: true,
      },
      {
        id: 2,
        text: 'Finish React Cinema App',
        day: '8 January 2023',
        reminder: true,
      },
      {
        id: 3,
        text: 'Laravel Auth with Sanctum Project',
        day: '10 January 2023',
        reminder: true,
      },
      {
        id: 4,
        text: 'Mern Stack with Redux',
        day: '13 January 2023',
        reminder: false,
      },
    ]
  },
}
</script>
<!--STYLE BLOCK-->
<style> 

</style>