<template>
    

        <div class="con">




            <h1>SignIn</h1>
            <h5>LearnOL User Portal</h5>

            <div style="color:red">{{msg}}</div>
            
            <hr>
            
            <div class="register" v-if="!toshow">
                
                <input type="email" name="" id="e" placeholder="Email" v-model="email">
                <input type="password" name="" id="p" placeholder="Password" v-model="password">
                <button v-on:click="login">Login</button>
            </div>

            
            <div v-if="msg2" style="color:red">Invalid Otp</div>


            <div v-if="toshow" class="register">
                <input type="text" name="" id="o" placeholder="Otp" v-model="Otp">
                <button v-on:click="Check">Login</button>
            </div>


            <!-- <small>Dont have Account? <router-link to="/signup">signup</router-link> </small> -->
            <small>Dont have Account?  <a v-on:click="sign">signup</a> </small>
    <!-- <a v-on:click="sign">signup</a> -->
        </div>

        <footer>

            &copy; copyright 2022 metapercept technology service
        </footer>

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
          msg:"",
          toshow:false,
          Otp:null,
          msg2:false,
        
      }
  },
  methods:{
      async login(){
          console.log("wait a sec")
          this.msg=""
          let url = `http://localhost:4000/api/user/login`
          let result = await axios.post(url,{email:this.email,password:this.password})
          console.log(result.data)  
          
          

            if(result.data.token){
                localStorage.setItem("user",result.data.token)
                localStorage.setItem("name",result.data.name)
                let data = await axios.get(`http://localhost:4000/api/user/getByName/${localStorage.getItem('name')}`)
               
               if(data.data.data[0].twoFaceVerification){
                    
                    await axios.post('http://localhost:4000/api/user/email',{email:this.email})
                    this.toshow=true
                    alert(localStorage.getItem("name")+ " Otp has been send to you in your mail..." )

                }
                else {

                    this.$router.push({name:"Home"})
                }
            }
            else {
                this.$router.push({name:"login"})
                this.msg = "Please Provide Valid Information"

            }
        
      },
      async Check(){
          
           let v = await axios.post('http://localhost:4000/api/user/verify',{otp:this.Otp})
            console.log(this.Otp)
            console.log(v.data)  

            if(v.data == 'User Verified')  {
            this.msg2=false
            
            this.$router.push({name:"Home"})
        } else {
            this.msg2=true
            localStorage.clear()
            this.toshow=false
            
        }
      },

      sign (){
          localStorage.clear()
          this.$router.push({name:"signup"}) 
          console.log("egiaehgiuaehn")
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
        width: 380px;
        position: relative;
        top: 100px;
        left: 40%;
        padding:15px 10px;
       
    }


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
        border: 1px solid rgb(10, 10, 10);
    }

    .register button{
        width: 320px;
        height: 40px;
        border: 1px solid skyblue;
        color: white;
        background: skyblue;
        cursor: pointer;
        margin-bottom: 5px;
        background: #413394;
    }

    a{
        cursor: pointer;
    }

    hr{
        width: 320px;
        margin-bottom: 25px;
    }
    h1, h5{
        color: #413394;
    }

    footer{
        padding: 1px 3px;
    margin: 8pc;
       margin-left: 200px;
    }

</style>

