<template>
<div>

    <Menu />
   <!-- Login -->
    <div v-if="!userLoggedIn" class="container mt-5"  id="form-signin" style="width: 75%">
        <form @submit.prevent="handleSubmit" class="shadow p-3 mb-5 bg-white rounded">
          <h1 class="mt-2">Login</h1>
          <div class="mb-3">
            <label for="InputEmail" class="form-label">Email address</label>
            <input type="email" v-model="user.email" class="form-control"  name="email" id="inputEmail" placeholder="Enter email">
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input type="password" v-model="user.password" class="form-control" name="password" id="inputPassword" placeholder="Enter password">
            </div>
            <button @click="userLoggedIn" type="submit" class="btn btn-dark">Submit</button>
          </div>
        </form>
    </div>
    <div v-else><h3 style="text-align: center;">Logout first</h3></div>
    <!-- End Login -->
    <Footer />

</div>
</template>

<script>

import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'

export default {
	components: {
		Footer,
        Menu
	},   
	data() {
      return {	
        user: {
          email: '',
          password: '',
        },
		submitting: false,
		error: false,
      }
    },

	methods: {
    async handleSubmit(){
      this.submitting = true;
        if (this.invalidEmail || this.invalidPassword ) {
          alert('Campos inválidos')
        }
        else if(await this.$store.dispatch('user/loginUser', this.user)){
          this.$router.push('/message/5')
        } else alert("Login failed")
      
      },
    },
	computed: {
    userLoggedIn: function () {
      let user = this.$store.getters['user/getUser']
      for (var i in user) return true
      return false
    },
    invalidEmail: function () {
      return this.user.email === '' || this.user.email.search('@') === -1;
    },
    invalidPassword: function () {
      return this.user.password.length < 4;
    },
  },
	directives: {

	},

}
</script>

<style scoped>

</style>