// VUE object instance entry point with the importing of  createApp method from vue superclasss and the deployment of that for dependency injection into our index.HTML template.
import { createApp } from 'vue';
// this import injects the app.vue component's contents
import App from './App.vue';
// import the router 
import router from './router';

// this main.js namespace is the ntry point for the injection of the vue engine into the index.html placeholder so this is also where we inject the router to wrap around our app.
//much more elegant in wrapping that react.
createApp(App).use(router).mount('#app');

