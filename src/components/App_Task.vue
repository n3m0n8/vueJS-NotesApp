<template>
<!--Just as with the case of the task deletion single click below , we here deploy the same multi-floor/multi-component bubbling up of emission of action up toward App.js namespace. This time we will do a double click on the iterated task div node as changing whether the state of reminder is switching from TRUE or FALSe and thus making the exclamation icon appearing below either appear or dissappear -->
    <div @dblclick = "$emit('toggle-reminder', idvdlTaskProp.id)" class="idvdlTask">
        <h3>{{ idvdlTaskProp.text }} 
        <!-- here we are using a vue function called $emit... it basically bubbles up action from a child-node to a parent-node in the DOM. In this case, we need to bubble up the action being triggered as this floor, which is the individualTask floor, upward to the next floor, the parent node component that deals with alltasks being presented , and then upward to the App.vue top-level floor, which deals with the main #app div element being presented. So we use the shorthand @ signifier to add a click event listener and then  tell Vue engine to emit this action happening at the indivudal sub-node(the x sign for deleteing) that appears for every node element in the presente floor of this component, i.e. for every case that there is a div with idvdlTask class being brought forth by our array looping construct.-->
        <i @click="$emit('delete-a-task', idvdlTaskProp.id)" class="fas fa-times"></i>
        </h3>
        <div class="idvdlTask-reminder">
        <!--In brad's example he deployed this ternerary check on whether the incomined tasksData array's remined attribute was set to true for each of the tasks being deployed on a green side bar on each of the div elements that cycled through each of the tasksData array elements... but I prefered to use a fa-exclamation mark from fontawsome... same structure of a ternaray check on whetehr reminder attribute is set to true. if not then <i> class is "" empty and nothing shows. we use the v-bind shortcut : and bind the fa icon's css class to the conditional ternary -->
            <i :class="[idvdlTaskProp.reminder ? 'fas fa-solid fa-exclamation' : '']"></i>
            <p>{{ idvdlTaskProp.day }}</p>
        </div>
    </div>
</template>

<script> 
    export default {
        name: 'App_Task',
        props: {
            idvdlTaskProp: Object,
        }
    }
</script>

<style>
    .fas.fa-times{
        color:darkred;
    }
    .fas.fa-solid{
        color:darkorange;
        padding-right: 4px;
    }
    .idvdlTask{
        background: lightgray;
        margin: 5px;
        padding: 10px 20px;
        cursor: pointer;
    }         
    .idvdlTask-reminder{
        display: inline-flex;
        align-items:center;
        justify-content: space-between;
    }
    .idvdlTask h3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
