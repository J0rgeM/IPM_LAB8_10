<template>
	<div>
		<Menu />
    <!-- Blog -->
    <div class="container mt-5" id="post-form" style="width: 75%">
      <div v-if="!userLoggedIn">
        <h3 style="text-align: center">Login first</h3>
      </div>
      <div v-else><h1 style="text-align: center"> {{information}}</h1><br><br>
        <form @submit.prevent="handleSubmit" class="shadow p-3 mb-5 bg-white rounded">
          <h1 class="mt-2">Post</h1>
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Message</label>
            <textarea type="text" v-model="post.content" class="form-control" id="inputPost" placeholder="Hello, world!"></textarea>
          </div>
          <button type="submit" class="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
  <!-- End Blog -->
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
		submitting: false,
		error: false,
        post: {
            content: '',
        },
		user: {
			id: '', 
			name: '', 
			email: '', 
			session_id: ''
		},
        information: 'Post Blog'
      }
    },
	methods: {
    async handleSubmit() {
      this.submitting = true;

      if(this.post.content === ""){
        alert("Post vazio")
      } else{
        await this.$store.dispatch('microposts/addMicropost', this.post);
        this.$router.push('/message/3');
      }
    }
  },
	computed: {
    userLoggedIn: function () {
      let user = this.$store.getters['user/getUser']
      for (var i in user) return true
      return false
    },
	},
	directives: {

	},
}
</script>

<style scoped>



</style>