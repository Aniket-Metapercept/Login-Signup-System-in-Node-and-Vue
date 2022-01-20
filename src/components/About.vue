<template>
 <Header />
 <h1>Hello, Welcome to About Page</h1>
</template>

<script>

import Header from './Header.vue'
export default {
  name: 'About',
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