<template>
	<div>
	</div>
</template>

<script>

export default {

	data() {
		return {
			success: false,
			user: {},
		}
	},
	methods: {
     async logout(){
       this.success = true
       if(await this.$store.dispatch('user/logoutUser', this.session_id))
       {
         this.$router.push('/message/6');
       }
    },
    getUser() {
      this.user = this.$store.getters['user/getUser']
    },
  },
  created: function () {
    this.logout();
    this.success = !this.userLoggedIn;
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

<style scoped>

</style>