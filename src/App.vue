<template>
  <div class="container">
  <!--step3 inject the header into DOM/html template-->
  <!--note here we give the app_header component a title prop value-->
  <!--Notice a neat aspect of VUE is the dual-binding and 'propagation' Most examples here show upward emission from the more micro-level components/elements up to this app view. But with the case of the changing appearance of the show tasks form button, we see that the data stat that is currently the case in the app view top level is what is feeding into the v-bound :formShowing property that is accessible to tha App_Header component, one level down. And over theere, in that components script block is where we will make alterations to the props that that 'mid-level' component is exporting. and notice that the exports go both upward and downward. So once exporting property formStatus which has been made available just here at the appLevel, the third, lowest level Header_Button component will have access to whatever boolean value is currently the case of the showing or not showing data piece held in the app vue data() meth (which remember, is itself actually toggled by an upwardly mobile emisison of that same Header_Button's click event listener... so its like a two way traffic but also a kind of spider web weaving connectiosn between upward adn downward states of components.  -->  
    <App_Header @toggle-task-form="toggleTaskForm" title="Tasks Runner" :formShowing="formShowing" />
    <!--deploy our singular view which will be routeed by our router.-->
    <!--note we pass the vbound formShowing prop binding used in the above header (which goes down two levels vi App_Header component to the button component) here as a prop of our router-view... this basically creates  a parlalel multi-level prop'drilling' but, in this case instead of being related to the components only, it is relating to the router view element that is presenting/routing relevant components onto this main app.vue view. Thus when we attach the vbound formshowing property onto our router-view element here only those components that have defined this prop within their compilation block (in this case the Home component) will render that property (which itself remmeber contains two levels of nested components (App_Header and App_Button). -->
    <router-view :formShowing="formShowing"></router-view>
    <App_Footer />
  </div>
</template>

<script>
// Step1 import the header component into our app view:
                      ///IMPORTS
import App_Header from './components/App_Header';
import App_Footer from './components/App_Footer';
                        ///EXPORTS
export default {
  name: 'App',
                    ///COMPONENTS REGISTRY
  components: {
  //step2: export the imported namespace component from our scripting compilation of the App view into the html/dom runtime template injection above              
    App_Header,
    App_Footer,
  },
  // normally the data would come in via a fetchAPI, which will be used with a mock api server called JSON server in this tutorial. But this initial inclusion of data relating to the various tasks to be displayed on the frontend are going to be statically coded initially. But even if we statically code it in, we will nevertheless use an inbuilt lifecycle method that Vue Class defines. In this case, the created() lifecycle meth will allow us to fire off cascading functions upon a change in state of the initial static data.
  data(){
    return {
      //boolean that toggles whether to show the add task form view based on clicking add tasks
      formShowing: false, //defaults false.
    }
  },
  methods: {
  //have had the addTask emmission bring over the newTask constant's value, we define here an addTask() method to deal with that data at this upper (app) view level 
    toggleTaskForm(){
      this.formShowing = !this.formShowing;
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid black;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
