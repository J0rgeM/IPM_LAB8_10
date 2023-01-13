<template>
      <!-- Navbar -->
      <div class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/microposts">BlogGIF</router-link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item"><router-link class="nav-link active rounded-3" aria-current="page" to="/microposts">Home</router-link></li>
              <li class="nav-item"><router-link class="nav-link active rounded-3" aria-current="page" to="/post">Post Blog</router-link></li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Welcome {{ name }}</a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  <li class="dropdown-item"> <router-link class="nav-link active rounded-3" aria-current="page" to="/login">Login</router-link></li>
                  <li class="dropdown-item"> <router-link class="nav-link active rounded-3" aria-current="page" to="/register">Register</router-link></li>
                  <li class="dropdown-item"> <router-link class="nav-link active rounded-3" aria-current="page" to="/logout">Logout</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- End Navbar -->

</template>

<script>
export default {
	data() {
		return {
			user: {
				id: '',
        name: '',
				email: '', 
				session_id: ''
			},
      name: ''
		}
	},
	mounted() {
    this.ifUserloggedIn();
	},
    methods: {
      async ifUserloggedIn() {
        if(this.userLoggedIn)
        {
          this.name = this.user.name
        }
      },
      getUser() {
        this.user = this.$store.getters['user/getUser']
      }
	},
	computed: {
    userLoggedIn: function () {
      this.getUser()
      for (var i in this.user) return true
      return false
    },
	}
}
</script>