<template>
<div>
     <div>Login here</div>
     <form @submit.prevent="login">
         <input type="text" v-model="username"  placeholder="user" required>
         <input type="password" v-model="password" required>
         <button >login</button>
     </form>
</div>
 
</template>
<script>
export default {
  name:'login',
  data:function(){return{username:'', password:''}},
  methods:{
      login: function(){        
            localStorage.setItem("auth", btoa(this.username+":"+this.password));
            this.$eventHub.$emit('logged-in');       
      }
  }
}
</script>

