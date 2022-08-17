<template>
    <div class="login container">
        <form @submit.prevent="signIn" class="card-panel">
            <h2 class="center purple-text">Sign In to My Account</h2>
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="center field">
                <button class="btn deep-purple">Sign In </button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase/app';
export default{
    name: 'SignIn',
    data(){
        return{
            email: null,
            password: null,
            feedback: null
        }
    }, 
    methods: {
        signIn(){
            // console.log(this.email, this.password)
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then( cred => {
                    this.$router.push({ name: 'GoogleMaps' })
                }).catch(err =>{
                    this.feedback = err
                })
                this.feedback = null
            } else{
                this.feedback = 'Please insert email && password'
            }
        }
    }
}
</script>

<style>
    .login {
        max-width: 400px;
        margin-top: 60px;
    }
    .login h2{
        font-size: 2em;
    }
    .login .field{
        margin-bottom: 16px;
    }
</style>