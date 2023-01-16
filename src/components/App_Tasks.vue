<template>
<!--We bound the array of data contained in the lifecycle meth of the app view namespace to the props(named appTasksProp) of the App_Tasks component (which we are presently in). So now, we deploy a simpl javascript for (condition){do this} loop which is made easy with Vue shorthand syntax -which is looking a bit like JQuery really:
// note also the important deployment of a key- necessary for the iteration of multiple h3 childnodes on this div... otherwise there is no way to distinguish them apart. So we pass the iterated array elements' id property as the key (for each element in tasksArrProp whose value is fed by the tasksData array defined in the App view under the moniker of task then print me out a key based on the underlying data array's element(i.e id) and an h3 with its text underlying data 
// note this is his initial construct. he changes this to have a tasks component which will hold a singular task element to be rendered by this App_Tasks multiple tasks component for our main App view.
    <div :key="task.id" v-for="task in tasksArrProp">
        <h3>{{ task.text }}</h3>
    </div>
    With the new construct, we keep much the same but instead of directly injecting our tasksData array by way of the tasksArrProp, we inject the text attribute of that tasksData array held in App.vue via the newly created and imported/registered App_Task component and its own individualTaskProp, which is being fed into by the iterations of the task element that are found within the tasks array prop of this App Tasks componet, which is itself drawn in from the App.vue tasksData array/json/api
    -->
    <div :key="task.id" v-for="task in tasksArrProp">
    <!-- this @delete-a-task directive follows through from the lower level App_Task.vue component's @click for clicks deleting a task. here we are using the directive to tell Vue engine to list for any emission of a delete-a-task directive coming from below, and now we will hoist/bubble it upward to the App.vue top-floor.  -->
        <App_Task @toggle-reminder = "$emit('toggle-reminder', task.id)" @delete-a-task = "$emit('delete-a-task', task.id)" :idvdlTaskProp = "task" />
    </div>
</template>

<script> 
import App_Task from './App_Task';
    export default {
        name: 'App_Tasks',
        props: {
            tasksArrProp: Array,
        },
        //DONT FORGET TO REGISTER IMPORTED COMPONENTS!
        components: {
            App_Task,
        },
        // this emits property is required only when we intermediate an emission directive directly from below to above without any change, we are just acting as an intermediary in this level so we should let the Vue engine know this by adding any such intermediary emits to an emit property array: 
        emits: [
            'delete-a-task',
            'toggle-reminder',
        ],
    }
</script>

<style>
</style>
