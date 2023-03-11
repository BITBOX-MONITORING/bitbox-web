// Navbar fixa
window.addEventListener('scroll', function(){
    var fixedNavbar = document.querySelector('header')
    fixedNavbar.classList.toggle('sticky', window.scrollY > 60)
})

// Link para o login
function redirectToLogin() {
    window.location.href = "sign-page.html"
}


