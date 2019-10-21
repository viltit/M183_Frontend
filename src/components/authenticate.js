import axios from 'axios'

/* TODO: We authenticate twice (in navbar.js and here) */
const auth = {
    isAuthenticated: false,   // TODO: Obsolete, we could get for user = null
    user: null,
    async authenticate() {
        await axios.get('http://localhost:8080/loginStatus/', { withCredentials: true })
        .then(response => {
            this.user = response.data
            console.log(this.user)
            this.isAuthenticated = true
        })
        .catch( error => {
            console.log(error)
            this.user = null
            this.isAuthenticated = false
        })
    }
}

export default auth