<template>
  <div class="container">
    <div class="row">
      <form>
        <div class="form-group">
          <input
          v-model="email"
            type="text"
            id="login"
            class="form-control"
            name="login"
            placeholder="login"
          />
        </div>
        <div class="form-group">
          <input
            v-model="pass"
            type="password"
            id="password"
            class="form-control"
            name="login"
            placeholder="password"
          />
        </div>
        <input @click.prevent="login" type="submit" class="fadeIn fourth" value="Log In" />
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      email: "",
      pass: "",
    }
  },
  methods: {
    ...mapActions(['setCurrentUser']),
    login() {
      if(this.user != '' && this.pass != '') {
        firebase.auth().signInWithEmailAndPassword(this.email, this.pass).then(() => {
          //add user to store
          this.setCurrentUser(firebase.auth().currentUser);
          this.$router.push('/home')
        })
        .catch(() => {
          alert('Nooo');
        });
      } else {
        alert('Ambos campos son requeridos');
      }
    },
  },
};
</script>

<style>

</style>
