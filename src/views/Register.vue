<template>
  <div>
    <h3>登録</h3>
    <label for="email">Email</label>
    <input type="email" name="" id="email" v-model="email">
    <br>
    <label for="password">Password</label>
    <input type="password" name="" id="password" v-model="password">
    <br>
    <button @click="register">送信</button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    register() {
      this.$store.dispath('register', {
        email: this.email,
        password: this.password
      })
      this.email = '';
      this.password = '';
    }
  }
}
</script>

<style scoped>
 label, input, textarea {
   display: block;
 }
</style>
