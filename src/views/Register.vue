<template>
<div>
	<Menu />

  <!-- Register -->
  <div v-if="!userLoggedIn" id="register-form" class="container mt-5"  style="width: 75%">
    <form @submit.prevent="handleSubmit" name="register-form" class="shadow p-3 mb-5 bg-white rounded">
      <h1 class="mt-2">Register</h1>
      <div class="form-row ">
        <div class="form-group col-md-6 mb-3">
          <label for="firstName">Full Name</label>
          <input type="text" v-model="user.name" class="form-control" id="fullName" name="username" placeholder="Enter your name">
        </div>
      </div>
      <div class="mb-2">
        <label for="InputEmail" class="form-label">Email address</label>
        <input type="email" v-model="user.email" class="form-control" id="InputEmail" aria-describedby="emailHelp" name="email" placeholder="example@email.com">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-2">
        <label for="inputPassword" class="form-label">Password</label>
        <input type="password" v-model="user.password" class="form-control" id="inputPassword" name="password"  placeholder="Enter your password">
        <div id="passwordHelpBlock" class="form-text">
          Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
        </div>
      </div>
      <div class="mb-2">
        <label for="repeatPassword" class="form-label">Repeat Password</label>
        <input type="password" v-model="passwordConfirmation" class="form-control" id="repeatPassword" name="confirm" placeholder="Repeat your password">
      </div>
      <button type="submit" class="btn btn-dark" name="submitok" value="Create account">Submit</button>
    </form>
  </div>
  <div v-else><h3 style="text-align: center;">Logout first</h3></div>
  <!-- End Register -->
	
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
        user:
          {
            name: '',
            email: '',
            password: '',
          },
    passwordConfirmation: '',
		submitting: true,
		error: true,	
      }
    },

	methods: {
    handleSubmit: async function () {
      this.submitting = true;
      if (this.invalidName || this.invalidEmail) {
        alert('Campos inválidos')
      } else if (this.invalidPassword) {
        alert('Campos inválidos')
      } else if (this.invalidPasswordConfirm) {
        alert("Passwords diferentes");
      } else if (!await this.$store.dispatch('user/userExists', this.user)) {
        await this.$store.dispatch('user/addUser')
        await this.$router.push('/message/4');
      } else {
        alert("Utilizador já registado");
      }
    }
  },
	computed: {
    userLoggedIn: function () {
      let user = this.$store.getters['user/getUser']
      for (var i in user) return true
      return false
    },
    invalidName: function () {
      return this.user.name === '' || this.user.name.length > 15 || this.user.name.match(/[0-9]/g) != null;
    },
    invalidEmail: function () {
      return this.user.email === '' || this.user.email.search('@') === -1;
    },
    invalidPassword: function () {
      return this.user.password.length < 4;
    },
    invalidPasswordConfirm: function () {
      return this.passwordConfirmation !== this.user.password;
    },
  },
	directives: {

  },
	created() {

	}
}
</script>

<style scoped>

</style>