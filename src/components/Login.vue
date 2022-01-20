<template>
    <img src="../assets/twitter-logo.jpg" alt="">

    <h1>Login</h1>
    <div style="color:red">{{msg}}</div>
    <div class="register">
        
        <input type="email" name="" id="e" placeholder="Email" v-model="email">
        <input type="password" name="" id="p" placeholder="Password" v-model="password">
        <button v-on:click="login">Login</button>
    </div>

    <small>Dont have Account? <router-link to="/signup">signup</router-link> </small>
</template>

<script>

import axios from 'axios'
export default {
  name: 'Login',
  props: {

  },

  data(){
      return {
          email:"",
          password:"",
          msg:""
      }
  },
  methods:{
      async login(){
          this.msg=""
          let url = `http://localhost:4000/api/user/login`
          let result = await axios.post(url,{email:this.email,password:this.password})
          console.log(result.data.token)  
            if(result.data.token){
                localStorage.setItem("user",result.data.token)
                this.$router.push({name:"Home"})
            }
            else {
                this.$router.push({name:"login"})
                this.msg = "Please Provide Valid Information"

            }
        
      }
  },


    mounted(){
      let user = localStorage.getItem('user')
      if(user){
          this.$router.push({name:"Home"}) 
      }
  }
 
}
</script>


<style scoped>
    img{
        width: 100px;
    }
    .register input{
        width: 300px;
        height: 40px;
        padding-left:20px;
        display: block;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid skyblue;
    }

    .register button{
        width: 320px;
        height: 40px;
        border: 1px solid skyblue;
        color: white;
        background: skyblue;
        cursor: pointer;
        margin-bottom: 5px;
    }
</style>
