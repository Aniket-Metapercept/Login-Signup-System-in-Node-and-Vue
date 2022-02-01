<template>
 <div class="con">
     <div class="myform">

        <h1>SignUp</h1>

        <div v-if="msg" style="color:red">Invalid Otp</div>
        <div v-if="msg2" style="color:red">Email Has been Already Taken</div>
        
        <div class="register" v-if="!toshow">
            <input type="text" name="" id="f" placeholder="First Name" v-model="first">
            <!-- <input type="text" name="" id="m" placeholder="Middle Name" v-model="middle"> -->
            <input type="text" name="" id="l" placeholder="Last Name" v-model="last">
            <input type="text" name="" id="comp" placeholder="company" v-model="company">
            <input type="text" name="" id="jo" placeholder="job_title" v-model="job_title">
            <input type="text" name="" id="ph" placeholder="phone" v-model="phone">
            <input type="text" name="" id="co" placeholder="country" v-model="country">
            <!-- <input type="text" name="" id="b" placeholder="Born Year" v-model="born"> -->
            <input type="email" name="" id="e" placeholder="Email" v-model="email">
            <input type="password" name="" id="p" placeholder="Password" v-model="password">
            <button v-on:click="showOtp">SignUp</button>
        </div>

        
    


        <div v-if="toshow" class="register">
            <input type="text" name="" id="o" placeholder="Otp" v-model="Otp">
            <button v-on:click="signup">SignUp</button>
        </div>

        <small>Already have account? <router-link to="/login">Login</router-link> </small>
    </div>
 
 </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'SignUp',
  props: {

  },
  data(){
      return {
          first:"",
          middle:"",
          last:"",
          born:"",
          email:"",
          password:"",
          id: "" ,
          toshow:false,
          Otp:null,
          msg:false,
          msg2:false,
          checkData : null ,
          country:"",
          phone:"",
          job_title:"",
          company:""
      }
  },
  methods:{
       async showOtp(){
           this.checkData = await axios.get(`http://localhost:4000/api/user/checkuserpresent/${this.email}`)
            console.log(this.checkData.data.data.length)   // length of the user if any

            if(this.checkData.data.data.length){
                this.msg2 = true
                console.log("Taken email")
            } else {
                    this.msg2 = false
                await axios.post('http://localhost:4000/api/user/email',{
                    email:this.email
                 })
                this.toshow=true
          } 
            
       } ,

      async signup(){
          
          let v = await axios.post('http://localhost:4000/api/user/verify',{otp:this.Otp})
          console.log(this.Otp)
          console.log(v.data)  
          
          if(v.data == 'User Verified')  {
            this.msg=false
            let result = await axios.post('http://localhost:4000/api/user/register',{
                first:this.first,last:this.last,company:this.company,country:this.country,phone:this.phone,job_title:this.job_title,email:this.email,password:this.password,id:String(Math.floor((Math.random() * 1000) + 1))
                })
            alert("Data Added Successfully...")   
            console.log(result.data)
            localStorage.setItem("user",result.data.token)
            localStorage.setItem("name",result.data.name)
            this.$router.push({name:"Home"})
        } else {
            this.msg=true
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


    .con {
        border: 1px solid black;
        /* margin: 55px; */
        /* width: 380px;
        position: relative;
        top: 100px;
        left: 40%;
        padding:15px 10px; */
       
    }
    img{
        width: 100px;
    }

    .register input{
        /* width: 300px;
        height: 40px;
        padding-left:20px;
        display: block;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid skyblue; */
    }

    .register button{
        /* width: 320px;
        height: 40px;
        border: 1px solid skyblue;
        color: white;
        background: skyblue;
        cursor: pointer;
        margin-bottom: 5px; */
    }
</style>
