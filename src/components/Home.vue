<template>
  <Header />
 <h1>Hello, Welcome to Home Page</h1>

  <div v-if="src_img">
    <img :src="src_img" alt="">
  </div>

</template>

<script>


import Header from './Header.vue'
export default {
  name: 'Home',
  props: {

  },
  data(){
    return {
      src_img: localStorage.getItem("img")
    }
  },
  components:{
    Header
  },
   mounted(){
      let user = localStorage.getItem('user')
      if(!user){
          this.$router.push({name:"signup"}) 
      }
  }
 
}
</script>
