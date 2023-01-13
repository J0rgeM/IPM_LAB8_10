<template>
    <div>
        <Menu />
      <!-- Blog -->
      <div class="container mt-5" id="post-form" style="width: 75%">
        <div v-if="!userLoggedIn">
          <h3 style="text-align: center">Login first</h3>
        </div>
        <div v-else-if="postUtilizador"><h1 style="text-align: center"> {{information}}</h1><br><br>
          <form @submit.prevent="handleSubmit" class="shadow p-3 mb-5 bg-white rounded">
            <h1 class="mt-2">Update Post</h1>
            <div class="mb-3">
              <label for="inputTitle" class="form-label">Message</label>
              <textarea type="text" v-model="post.content" class="form-control" id="inputPost" placeholder="Hello, world!"></textarea>
            </div>
            <button type="submit" class="btn btn-dark">Submit</button>
          </form>
        </div><div v-else><h3>Not your post!</h3></div>

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
            id:"",
            content:"",
            user_id:"",        
            author:"", 
            created_at:"",   
            updated_at:"", 
            likes:"",                             
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
  created: function () {
    this.getPost()
  },
  mounted() {
    this.getPost();
  },
	methods: {
    getUser() {
      this.user = this.$store.getters['user/getUser']
    },
    async getPost() {
      if (this.userLoggedIn) {
        this.post = await this.$store.getters[('microposts/getMicropost')](this.$route.params.id)
      }
    },
    async handleSubmit() {
      this.submitting = true;

      if (this.post.content !== "") {
        await this.$store.dispatch('microposts/updateMicropost', this.post)
        this.submitting = false;
        this.$router.push('/message/1');
      } else {
        alert("Post vazio")
      }
    },
    verificaUtilizador (postId) {return postId === this.user.id },
  },
	computed: {
    userLoggedIn: function () {
      this.getUser();
      for (var i in this.user) return true
      return false
    },
    postUtilizador: function () {
      this.getPost()
      return this.verificaUtilizador(this.post.user_id)
    }
	},
	directives: {

	},
}
</script>

<style scoped>



</style>