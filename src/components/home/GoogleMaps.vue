<template>
    <div class="map">
        <div class="google-map center " id="map"></div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/firebase/config'

export default {
    name: 'GoogleMaps',
    data(){
        return{
            lat: 53,
            lng: -2
        }
    },
    methods: {
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 8,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })

            db.collection('users').get().then(users => {
                users.docs.forEach(doc => {
                    let data = doc.data()

                    if(data.geolocation){
                        let marker = new google.maps.Marker({
                            position: {
                                lat : data.geolocation.lat,
                                lng : data.geolocation.lng
                            },
                            map
                        })
                        marker.addListener('click', () => {
                            this.$router.push({name: 'ViewProfile', params: {id: doc.id}})
                        })
                    }
                })
            })
        },
    },
    mounted(){
        let user = firebase.auth().currentUser
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude

                db.collection('users').where('userId', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        db.collection('users').doc(doc.id).update({
                            geolocation:  {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        })
                    })
                }).then(() => {
                    this.renderMap()
                })
            }, (err) => {
                console.log(err)
                this.renderMap()
            }, {maximumAge: 60000, timeout: 3000})
        }else{
            this.renderMap()
        }  
    }
}
</script>

<style>
    .google-map{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>