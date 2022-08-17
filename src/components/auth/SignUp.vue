<template>
    <div class="signup container">
        <form class="card-panel" @submit.prevent="signUp">
            <h2 class="center deep-purple-text">Sign Up Your Account</h2>
            
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field">
                <label for="alias">People Call You? (alias)</label>
                <input type="text" name="alias" v-model="alias">
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="center field">
                <button class="btn deep-purple">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/config'
import firebase from 'firebase/app'
import 'firebase/auth'

export default{
    name: 'SignIn',
    data(){
        return{
            email: null,
            password: null,
            alias: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signUp(){
            if(this.alias && this.email && this.password){
                this.slug = slugify(this.alias, {
                    replacement: '-',
                    remove: /[$*_+~()'"!\-:@]/g,
                    lower: true
                })
                let refrence = db.collection ('users').doc(this.slug)
                refrence.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'Alias already exists!!'
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            refrence.set({
                                alias: this.alias,
                                geolocation: null,
                                userId: cred.user.uid
                            })
                        }).then(() => {
                            this.$router.push({ name: 'GoogleMaps'})
                        })
                        .catch(err => {
                            this.feedback = err.message
                        })
                        this.feedback = 'Alias is free to use!!'
                    }
                })
            }else {
                this.feedback = 'Please insert all data!!'
            }
        }
    }
}
</script>

<style>
.signup {
    max-width: 400px;
    margin-top: 60px;
}
.signup h2{
    font-size: 2em;
}
.signup .field{
    margin-bottom: 16px;
}
</style>