<template>

 <div class="nav">
     <ul>
         <li> <router-link to="/">Home</router-link> </li>
         <li> <router-link to="/about">About</router-link> </li>
         <li> <router-link to="/contact">Contact</router-link> </li>
         <li> <a v-on:click="logout">Logout</a> </li>
     </ul>
 </div>
</template>

<script>


export default {
  name: 'Header',
  props: {

  },
   
 methods:{
     logout(){
        localStorage.clear()
        this.$router.push({name:"login"}) 
    }
 },
 
}
</script>

<style scoped>
    ul{
        display: flex;
        background: black;
        padding: 5px;
    }

    li{
        list-style: none;
        padding: 15px;
    }
    a{
        color:white;
        text-decoration: none;
        cursor: pointer;
    }
</style>