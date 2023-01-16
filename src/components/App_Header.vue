//with the CLI, the template tag is much easier to handle and to have clarity with tabs etc... unlike CDN use where it becomes minified and clustered
<template>
    <header>
        <h1>{{ title }}</h1>
        <!--With v-bound acces to the status of whether the form is showing or not on the upper app level, we now v bind the proppety of the Header_Button deployment at this middle level to a ternaary conditional... so that if the condition is true, then the text of the button will read 'Close' (because if it is true then the add a task form is already showing) and vice versa and also the same with the color (green for open a task form, red for close)-->
        <!---Deploy the v-show binding conditional on the basis of the computed conditional method held in the script compilation block further down... that homePageRouterChk method absically checks the path of the vue router's request as it tries to render sub-components/elements into the router-link element deployed on the app.vue namespace. If the route is / then it will resolve conditional to true, and thus present this header_button to our app.vue. If false, because we are in /about or another route path then it won't present.-->
        <Header_Button v-show="homePageRouterChk" @toggle-task-form="$emit('toggle-task-form')" :text= "formShowing ? 'Close' : 'Add Task'" :color="formShowing ? 'red' : 'green'"/>
        <!--<Header_Button text="Update Task" color="grey"/>
        <Header_Button text="Remove Task" color="red"/>-->
    </header>
</template>

// note Vue3 rule that component names must be multi-parted to avoid a clash with html DOM element referents (i.e. instead of header which is used in HTML, we deploy app-header)
<script>
    import Header_Button from './Header_Button';    
    export default {
        name: 'App_Header',
            //we can pass props here via the script. the propst are {{injected into our component}} which itself injects into html/dom #app template
        props: {
                //several ways to define props but one way with type declaration follows- first we define the props object that is to be filling the relevant property of this component then we define its type. note that the title prop is given its value on the App view side, not in the component side.
            title: {
                type: String,
            },
            formShowing: {
                type: Boolean,// we declare the app view's current formShowing state information, that has been vbound up there as a property of this present App_Header component deployment, and thus been made available at this level, to a boolean.
            },
        },
        components: {
            Header_Button
        },
        // this computed object/prop of this app-header component compilation block is a shorthand state-responsive object. It's intent is to be bound to the the present ($this) component namespace and then be fed a mparticular function, usually a ternary boolean-based conditional resolving to true or false on the basis of the passed conditions. THe source of the conditional test below is a piece of data held/defined in $this present namespace component data() function property/object. On the basis of the state of that data held there, (which doesn't need to be frontend only as is the case in this app, but can be bound to a backend api) the below computation method will resolve whether a conidtion is true or false and thereby undertake whichever resulting action - for instance having app.vue render an element or not (which is what we are doing here vis-a-vis the rendereing of the App_button sub-component/element - which we want to show only when our home route is being deployed to App.vue, not when the router deployd is the /about)
        computed: {
                homePageRouterChk() {
                    if(this.$route.path === '/') {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
        },
    }
</script>

// note that we add a scope property to style to empahsis that this styling is only to be deployed in relation to elements injected into DOM/HTML by this component ONLY
<style>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
// NOTE that unlike react, we don't export the components from the component namespace but rather we import the component into the main view - in this case app.vue