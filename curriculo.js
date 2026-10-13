

document.addEventListener('DOMContentLoaded', function() {

    const botaoBaixarCvApresentacao = document.getElementById('baixar-cv-apresentacao');
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");

     hamburger.addEventListener("click", () => nav.classList.toggle("active"));
 });