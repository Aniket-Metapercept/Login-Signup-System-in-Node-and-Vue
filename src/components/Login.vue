<template>


<div class="justify-center"> 
<div class="full">


  

  <v-form v-model="valid" >
    
     <v-card
    class="mx-auto con"
    max-width="444"
    >
        
      <h1 class="text-center">SignIn</h1>
      <h5 class="text-center pb-4" >LearnOL User Portal</h5>
      <div style="color:red;" class="text-center">{{msg}}</div>
      <hr class="mb-4">

    <v-container class="main"  v-if="! toshow">
      <v-row>
        <v-col
          
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row> 

      <v-row>  
        <v-col
          
        >
          <v-text-field
            v-model="password"
            
            :counter="10"
            label="Password"
            required
            type="password"
          ></v-text-field>
        </v-col>
        
      </v-row>
      <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
          <v-btn
          class="btn"
          color="primary"
          v-on:click="login"
        >
          Login
        </v-btn>
      </div>

    </v-container>

    <v-container class="main"  v-if="toshow">
      <v-row>
        <v-col>
          <v-text-field
            v-model="Otp"
            label="Otp"
            required
          ></v-text-field>
        </v-col>
      </v-row> 

      <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
       <v-btn
      class="btn"
      color="primary"
      v-on:click="Check"
    >
      Login
    </v-btn>

      </div>

    </v-container>
    <div  class="text-center"> 

    <small >Dont have Account?<a v-on:click="sign" style="color:blue"> signup</a> </small>
    </div>
  </v-card>
  </v-form>
 




        
        <!-- <footer>

            &copy; copyright 2022 metapercept technology service
        </footer> -->

      <div class="text-center pt-6">
    &copy; copyright 2022 metapercept technology service
    </div>

</div>
</div>
</template>

<script>

// import { ref } from '@vue/composition-api'

import axios from 'axios'
export default {

  // setup() {
  //   // const myForm = ref(null)  // 1️⃣

  //   return {
  //     // myForm, // 1️⃣

      
  //   validate () {
  //       // this.$refs.form.validate()
  //       console.log(this.$refs)
  //     },


  
  //   }
  // },


  name: 'Login',
  props: {

  },
  components:{
  
  }
  ,

  data(){
      return {
          // email:"",
          password:"",
          msg:"",
          toshow:false,
          Otp:null,
          msg2:false,


          valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
     

      checkbox: false,
        
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
      },



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
        /* border: 1px solid black; */
        box-shadow: 0 0 31px 1px
        /* width: 380px;
        position: relative;
        top: 100px;
        left: 0%;
        padding:15px 15px; */
       
    }
    .full{
     
      margin-top:105px ;
      
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

    .btn{
        width: 290px;
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
        /* width: 350px;
        margin-bottom: 25px; */
    }
    h1, h5{
        color: #413394;
    }

    footer{
        padding: 1px 3px;
        margin: 8pc;
       margin-left: 400px;
    }


  v-container{
     border: 1px solid rgb(10, 10, 10);
  }


 
</style>

