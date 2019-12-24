<template>
  <div class="home">
    <form @submit="checkForm">
      <img alt="아트보리로고" src="../assets/logo.png">   
      <input type="email" id="inputEmail" class="form-control" placeholder="이메일" v-model="email" required="" autofocus=""> 
      <input type="password" id="inputPassword" class="form-control" placeholder="비밀번호" v-model="password" required=""> 
      <button class="btn btn-login" type="submit">로그인</button> 
    </form>  
  </div>
</template>
<script> 
import Vue from 'vue'; 
  import { 
    mapActions
  } from 'vuex'
  export default {
    name: 'Login', 
    data() {
      return {
        email: '', 
        password: ''
      }
    },
    methods:{
      ...mapActions([
        'login'
      ]), 
      checkForm(e){ 
        if(!this.email || !this.password){
          Vue.swal.fire('로그인애러', '이메일또는 비밀번호를 입력해주셔야 합니다.')
        } 
        if(this.email && this.password){
          this.login({email : this.email, password : this.password})
        }   
       e.preventDefault();
      }
    }, 
    mounted() {

    }
  }
</script>
<style> 
.home{
  display:flex;  
  align-items: center;
    background-color: #f5f5f5; 
    height: calc(100% - 64px);
}
.home > form{
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  text-align:center; 
}
.home img{
  width: 70%;
} 
.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    border: 1px solid #ced4da;  
    margin-bottom:.5rem;
}
</style>