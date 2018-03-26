<template>
<div>
     <div>Login here</div>
     <div>
         <input type="text" placeholder="user">
         <input type="password" >
         <button @click="login">login</button>
     </div>
</div>
 
</template>
<script>
export default {
  name:'login',
  methods:{
      login: function(){
            this.$eventHub.$emit('logged-in');
      }
  }
}
</script>

