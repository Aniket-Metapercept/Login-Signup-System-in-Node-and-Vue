<template>
 <Header />
 <h1>Hello, Welcome to Contact Page</h1>
</template>

<script>

import Header from './Header.vue'
export default {
  name: 'Contact',
  props: {

  },components:{
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