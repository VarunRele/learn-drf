login_div = document.getElementById('login')
home_div = document.getElementById('home')

const getUserInfo = () => {
    access_token = localStorage.getItem('access_token')
    if (access_token) {
        home_div.disable = true
    } else {
        login_div
    }
}