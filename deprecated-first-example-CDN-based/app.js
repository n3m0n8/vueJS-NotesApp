// instantiate an app instance object of the Vue super class via VUE class' createApp method. Pass arg1 of this with various relevant properties that are defined in that Vue app superclass and here, with this appInst instance we are tailoring it with our values
const appInst = Vue.createApp({
    // note like laravel we use {{notation for injecting a data nested object value into a template object}} similar to reacts {}
    //note if we want to have multiple elements we don't need to nest them into a container like react injection BUT the formatting is messy because we cant use tabs newlines etc.
    //template: '<h1>Hi {{firstName}}&nbsp {{lastName}}</h1> <h3>Email: {{email}}</h3>',
    // note that the data propety is a method for returning property saved in memory state via Vue superclass method (data()) it can return a nested json of particular objects and values
    data() {
        return {
            firstName: 'John',
            // we add more data object values:
            lastName: 'Doe',
            email: 'john@gmail.com',
            gender: 'male',
            picture: 'https://randomuser.me/api/portraits/men/10.jpg',
        };
    },
        //here we define an alternative object array that holds the female version under the fetchNewUsr() method so it switchs value of container vars upon click. Note that this falls under the methods property container inherited from Vue superclass: 
        // note that the expressions such as RETURN above or assignment expressions like the below this(i.e. this vueInstance's data property of firstName,lastName etc) are terminated with ; by my convention to remind us that these are active bindings/runtimes in the case of return unlike the 'passive' compilation related object assignments like we see in this entir vue app instance which is fundamentally one big JSON block and the data block above for example- these are terminated with the , passive marker.
    /* this method is static and deprecated in the tutorial, superseded by the fetchAPI dynamic method below: 
    methods: {
        fetchNewUsr() {
            this.firstName = 'Rachael';
            this.lastName = 'Bolton';
            this.email = 'rach@gmail.com';
            this.gender = 'female';
            this.picture = 'https://randomuser.me/api/portraits/women/10.jpg';
            },
        }
        */
    methods: {
        async fetchNewUsr() {
            const response = await fetch('https://randomuser.me/api');
            const data = await response.json();
            const jason = data.results;
            console.log(jason);

            this.firstName = jason[0].name.first;
            this.lastName = jason[0].name.last;
            this.email = jason[0].email;
            this.gender = jason[0].gender;
            this.picture = jason[0].picture.medium;
            },
        }
})
// here our compiled vue app instance object is mounted by the instance object calling on its inherited Vue superclass mount() method.. this injects the compiled javascript code into a releveant DOM element- in this case the #app DOM element demarcated in our HTML structuring language. This is, in other words, runtime injection/execution (although with browsers the runtime is continuous...)
appInst.mount('#appDOMelement')


/*
const app = Vue.createApp({
    data() {
      return {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        gender: 'male',
        picture: 'https://randomuser.me/api/portraits/men/10.jpg',
      }
    },
    methods: {
      async getUser() {
        const res = await fetch('https://randomuser.me/api')
        const { results } = await res.json()
  
        // console.log(results)
  
        this.firstName = results[0].name.first
        this.lastName = results[0].name.last
        this.email = results[0].email
        this.gender = results[0].gender
        this.picture = results[0].picture.large
      },
    },
  })
  
  app.mount('#app')
  */