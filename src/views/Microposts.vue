<template >
  <div>
    <Menu />
    <!-- Carousel -->
    <div>
      <!-- Carousel -->
      <div id="modal" class="carousel slide mb-5" data-bs-ride="carousel">

        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#modal" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#modal" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#modal" data-bs-slide-to="2"></button>
        </div>

        <!-- The slideshow/carousel -->
        <div class="carousel-inner">
          <div class="carousel-item active"><img v-bind:src="astronauts" alt="Astronauts" class="d-block w-100"></div>
          <div class="carousel-item"><img v-bind:src="view" alt="Lion" class="d-block w-100"></div>
          <div class="carousel-item"><img v-bind:src="moon" alt="Sky" class="d-block w-100"></div>
        </div>

        <!-- Left and right controls/icons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#modal" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#modal" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
    <!-- End Carousel -->

    <!-- BEGIN MICROPOSTS -->
    <div v-for="micropost in microposts" :key="micropost.id" class="container shadow p-3 mb-5 bg-white rounded" >
      <div class="col " id="section1">
        <div class="card">
          <div class="row g-0">
            <div class="card-header">Author: {{micropost.name}} </div>
            <div class="col-md-4">
              <img :src="meme" alt="meme" width="100%" height="250">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <p class="card-text"> {{ micropost.content }} </p>
                <p class="card-text">
                  <small class="text-muted">Created: {{ micropost.created_at }} </small> <br>
                  <small class="text-muted">Last updated: {{ micropost.updated_at }}</small> <br>
                  <small class="text-muted">Likes:{{ micropost.likes }} </small>
                </p>

                <div v-if="micropost.id!=show" >
                  <button class="btn-primary" v-on:click="showComments(micropost.id)">
                    Click to Show Comments
                  </button>
                </div>
                <div v-for="comment in comments" :key="comment.id" class="container">
                  <div v-if="comment.micropost_id === micropost.id" class="container">
                    <h3 style="margin-bottom:0;">Comentarios</h3><br>
                    <b>Criado em {{comment.created_at}}. </b><br>
                    {{comment.name}} : {{comment.content}}<br>
                  </div>
                </div>

                <div v-if="userLoggedIn">
                  <div v-if="user.id === micropost.user_id" >
                    <div class="update_post btn-light rounded" style="text-align:right ">
                      <button  class="text-dark" :id="micropost.id" @click="updatePost($event)" >Update post</button>
                    </div>
                  </div>
                  <div v-else>
                    <div class="update_post btn-light rounded" style="text-align:right ">
                      <router-link class="text-dark" :to="'/commentPost/'+ micropost.id" >Comment post</router-link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END MICROPOSTS -->

    <Footer />

  </div>
</template>


<script>
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

export default {
  components: {
    Footer,
    Menu,
  },
  data() {
    return {
      microposts: [
      ],
      comments: [],
      user: {
        id: '',
        name: '',
        email: '',
        session_id: ''
      },
      show: '',
      meme: 'https://media.giphy.com/media/sQuHLqjWwRXGvrjkg0/giphy.gif',
      astronauts: require('@/assets/images/astronauts.jpg'),
      view: require('@/assets/images/view.jpg'),
      moon: require('@/assets/images/moon.jpg'),
    }
  },
  mounted(){
    this.getPosts();
    if (this.userLoggedIn) {
      this.getUser()
    }
    },

  methods: {
    getUser() {
      this.user = this.$store.getters['user/getUser']
    },
    async getPosts(){
      if(await this.$store.dispatch('microposts/getMicroposts')) {
        this.microposts = this.$store.getters['microposts/getMicroposts']
      }
    },
    async showComments(id){
      if( await this.$store.dispatch('comments/getComments')){
        this.comments = this.$store.getters['comments/getPostComments'](id)
      }
      this.show = id;
    },
    updatePost(event){
      this.$router.push('updatePost/' + event.target.id)
    },
    commentPost(event){
      this.$router.push('commentPost/' + event.target.id)
    }
  },
  computed: {
    userLoggedIn: function () {
      this.getUser();
      for (var i in this.user) return true
      return false
    },
  },
  created() {
  }
}
</script>

<style scoped>

</style>