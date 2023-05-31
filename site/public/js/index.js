// Navbar fixa
window.addEventListener('scroll', function () {
  var fixedNavbar = document.querySelector('header');
  fixedNavbar.classList.toggle('sticky', window.scrollY > 60);
});

// Link para o login
function redirectToLogin() {
  window.location.href = 'sign-page.html';
}

const EnterprisesPartners = [
  { name: 'SPTECH', img: './assets/partners/sptech.jpg', url: 'https://www.sptech.school/' },
  { name: 'Digital Work', img: './assets/partners/digital_work.png', url: 'https://digitalwork.com.br/' },
  { name: 'Itau', img: './assets/partners/itau.png', url: 'https://www.itau.com.br/' },
  { name: 'Box Delviery', img: './assets/partners/box_delivery.png', url: 'https://boxdelivery.com.br/' },
  { name: 'Matrix', img: './assets/partners/matrix.png', url: 'https://www.matrixenergia.com/' },
];

document.addEventListener('DOMContentLoaded', () => {
  const partners = document.getElementById('partners');

  for (let partner of EnterprisesPartners) {

    partners.innerHTML += `
       <a href="${partner.url}">
        <img src="${partner.img} " alt="Logo ${partner.name}">
       </a>
  `;
  }
});
