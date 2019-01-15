<template>
    <div class="form-container">
        <div class="login-container">
            <h2 id="header">Login as Administrator</h2>
            <div v-if="this.error" class="error-box">{{this.error}}</div>
            <label for="loginName">Login</label>
            <input id ="loginName" v-model="loginName"/>
            <label for="loginPassword">Password</label>
            <input id="loginPassword" type="password" v-model="loginPassword"/>
            <button @click="proceedLogin">Sign In</button>
        </div>
    </div>
</template>

<script>
import { HTTP } from '@/services/httpService'
export default {
  name: 'LoginPage',
  data () {
    return {
      loginName: '',
      loginPassword: '',
      error: ''
    }
  },
  methods: {
    proceedLogin: function () {
      HTTP.post('/login', {
        loginName: this.loginName,
        loginPassword: this.loginPassword
      })
        .then(res => {
          if (res.data.authorized === 1) {
            this.$session.start()
            this.$router.go({path: '/teach'})
            this.$router.push({path: '/teach'})
          } else {
            this.error = res.data.error
          }
        })
        .catch(error => error)
    }
  }
}
</script>

<style scoped>
    h2 {
        font-weight: normal;
    }
    input{
        width: 100%;
        box-sizing: border-box;
    }
    #header{
        text-align: center;
    }
    .form-container{
        display: flex;
        justify-content: center;
    }
    .login-container{
        width: 25%;
        padding: 10px;
    }
    .error-box{
        color: red;
    }
</style>
