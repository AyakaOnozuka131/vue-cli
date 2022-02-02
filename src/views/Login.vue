<template>
  <div>
    <h3>ろぐいん</h3>
    <label for="email">Email</label>
    <input type="email" name="" id="email" v-model="email">
    <br>
    <label for="password">Password</label>
    <input type="password" name="" id="password" v-model="password">
    <br>
    <button @click="login">送信</button>
    
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
    login() {
      this.$store.dispath('login', {
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
