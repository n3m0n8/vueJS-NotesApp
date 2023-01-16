import { createRouter, createWebHistory } from "vue-router";
import About from '../views/App_About';
import Home from '../views/App_Home';


// create array of routes. each route is an object with properties relating to path, name and component to render
// NOTE that vue is picky about naming... routes HAS To be routes... router has to be router  - no renamin...
const routes = [
    {   
        path: '/',
        name: 'Home',
        component: Home,
    },
    {   
        path: '/about',
        name: 'About',
        component: About,
    },
];

// user createRouter to define our router. Arg1 takes a destructured object that has mulktiple properties. In this case we have one property of a histroy which uses the also imported createWebHistory method and passes in the environment's base url.
//the second property passed in to the router object is the routesArray which gives defionintions to the routes.
const router =  createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;