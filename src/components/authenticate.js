import axios from 'axios'

const auth = {
    isAuthenticated: false,
    async authenticate() {
        await axios.get('http://localhost:8080/loginStatus/', { withCredentials: true })
        .then(response => {
            console.log(response)
            this.isAuthenticated = true
        })
        .catch( error => {
            console.log(error)
            this.isAuthenticated = false
        })
    }
}

export default auth