<template>

<div class="full">



 <v-form   class="">

      <v-card
    class="mx-auto con"
    max-width="644"
    >
        
        <h1 class="text-center">Registeration</h1>
        <h4 class="text-center pb-6">LearnOL User Portal</h4>

        <div v-if="msg" style="color:red" class="text-center ">Invalid Otp</div>
        <div v-if="msg2" style="color:red" class="text-center ">Email Has been Already Taken</div>
        <div v-if="msg3" style="color:red" class="text-center ">Password is not equal</div>
        <div v-if="msg4" style="color:red" class="text-center ">Please Fill All fields</div>
        <div v-if="msg5" style="color:red" class="text-center ">Please provide Correct Email</div>
        
        <hr  class="mb-4">
        



    <v-container    v-if="! toshow">
      <v-row >
        <!-- cols="4"
          md="4" -->
        <v-col
          
        >
          <v-text-field
            v-model="first"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          
        >
          <v-text-field
            v-model="last"
            
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>
      </v-row>


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
            v-model="company"
            :rules="nameRules"
            :counter="10"
            label="Company"
            required
          ></v-text-field>
        </v-col>

        <v-col
         
        >
          <v-text-field
            v-model="job_title"
            :rules="nameRules"
            :counter="10"
            label="job_title"
            required
          ></v-text-field>
        </v-col>
      </v-row>



       <v-row>
        <v-col

        >
          <v-text-field
            v-model="country"
            :rules="nameRules"
            :counter="10"
            label="Country"
            required
          ></v-text-field>
        </v-col>

        <v-col
        
        >
          <v-text-field
            v-model="phone"
            :rules="nameRules"
            :counter="10"
            label="Phone"
            required
          ></v-text-field>
        </v-col>
      </v-row>


     
      <v-row>
        <v-col
        
        >
          <v-text-field
            v-model="password"
            :rules="nameRules"
            :counter="10"
            label="password1"
            required
          ></v-text-field>
        </v-col>

        <v-col
        
        >
          <v-text-field
            v-model="password2"
            :rules="nameRules"
            :counter="10"
            label="password2"
            required
          ></v-text-field>
        </v-col>
      </v-row>


       <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
       <v-btn
       class="btn"
      color="primary"
      v-on:click="showOtp"
    >
      SignIn
    </v-btn>
    </div>

    
    
    </v-container>


    

        <!-- <div v-if="toshow" class="register">
            <input type="text" name="" id="o" placeholder="Otp" v-model="Otp">
            <button v-on:click="signup">SignUp</button>
        </div> -->


    <v-container  v-if="toshow" > 
        
      <v-row >
        <v-col
         
        >
          <v-text-field
            v-model="Otp"
            
            :counter="10"
            label="OTP"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      
       <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
      <v-btn
      class="btn"
      color="primary"
      v-on:click="signup"
    >
      SignIn
    </v-btn>
    </div>
<!-- <small class="text-center">Already have account? <router-link to="/login">Login</router-link> </small> -->
    </v-container>

<div class="text-center">
    <small >Already have account? <router-link to="/login">Login</router-link> </small>
    </div>
     
  </v-card>
  </v-form>

  <div class="text-center pt-6">
    &copy; copyright 2022 metapercept technology service
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
          password2:"",
          id: "" ,
          toshow:false,
          Otp:null,
          msg:false,
          msg2:false,
          msg3:false,
          msg4:false,
          msg5: false,
          checkData : null ,
          country:"",
          phone:"",
          job_title:"",
          company:"",
          firstname: '',

      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
    //   email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      }
  },
  methods:{
       async showOtp(){

         this.msg=false
         this.msg2=false
         this.msg3=false
         this.msg4=false
         this.msg5 = false

           if(this.password2 !== this.password){
               this.msg3 = true
               return
           }


           if(this.first=="" || this.last=="" || this.email=="" || this.password=="" || this.password2=="" || this.job_title=="" || this.phone=="" || this.country =="" || this.company=="" ){
             this.msg4 = true
               return
           }

           if(this.email){
            let ans =  String(this.email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );

            if(!ans){
              this.msg5 = true
              return
            }
           }



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

.full{
  margin-top: 5px;
}

    .con {
        /* border: 1px solid black; */
        box-shadow: 0 0 31px 1px
        /* background-color: rgb(116, 122, 124); */
        /* margin-right: 292px;
        margin: 55px;
        width: 380px;
        position: relative;
        top: 100px;
        left: 40%;
        padding:15px 10px;
        */
    }
    img{
        width: 100px;
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
        margin-left: 12px;
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
    h1,h4{
      color: 
#413394
;
    }
</style>
