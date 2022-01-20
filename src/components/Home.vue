<template>
  <Header />
 <h1>Hello, Welcome to Home Page</h1>
</template>

<script>


import Header from './Header.vue'
export default {
  name: 'Home',
  props: {

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