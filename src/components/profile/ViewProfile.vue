<template>
    <div class="view-profile container">
        <div class="card deep-purple">
            <h2 class="center white-text">Chat Room</h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in comment" :key="index">
                    <div class="username">{{ comment.from }} <span class="comment">{{ comment.content }} </span></div>
                </li>
            </ul>
            <form @submit.prevent="addComment">
            <div class="field">
                <label for="comment">Add Comment (enter to send)</label>
                <input type="text" name="comment" v-model="newComment">
                <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '@/firebase/config'

export default {
    name: 'ViewProfile',
    data(){
        return{
            profile: null,
            newComment: null,
            feedback: null,
            user: null,
            comment: []
        }
    },
    created(){
        let refrence = db.collection('users')

        refrence.where('userId', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data(),
                this.user.id = doc.id
            })
        })

        //profile data
        refrence.doc(this.$route.params.id).get().then(user => {
            this.profile = user.data()
        })

        //comment data
        db.collection('comment').where('to', '==', this.$route.params.id)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    this.comment.unshift({
                        from: change.doc.data().from,
                        content: change.doc.data().content
                    })
                }
            })
        })
    },
    methods: {
        addComment(){
            if(this.newComment){
                this.feedback = null
                db.collection('comment').add({
                    to: this.$route.params.id,
                    from: this.user.id,
                    content: this.newComment,
                    time: Date.now()
                }).then(() => {
                    this.newComment = null
                })
            }else {
                this.feedback = 'Please insert your comment!!'
            }
        }
    }
}
</script>

<style>
.card {
    padding: 20px;
    margin-top: 50px;
    border-radius: 25px;
}
.view-profile h2{
    font-size: 2em;
    margin-top: 0;
}
.view-profile li{
    margin: 8px;
}
.field{
    border-radius: 15px;
    background-color: #fff;
    padding: 15px;
}
.comments{
    border-radius: 15px;
    max-height: 260px;
    overflow: auto;
}
.comments::-webkit-scrollbar{
    width: 2px;
}
.comments::-webkit-scrollbar-track{
    background: #ddd;
}
.comments::-webkit-scrollbar-thumb{
    background: #aaa;
}

.username{
    color: #fff;
    font-size: 16px;
    font-weight: bold;
}
.comment{
    font-weight: 200;
}


</style>