
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navPrincipal = document.getElementById('navegacao-principal');
    const botaoBaixarCvApresentacao = document.getElementById('baixar-cv-apresentacao');
    const habilidadesContainer = document.querySelector('.habilidades-container');
    const habilidadeCards = document.querySelectorAll('.habilidade-card');
    const nomeApresentacao = document.querySelector('#apresentacao h1.nome-principal');
    const textosNome = ["Erica Araújo"]; // Manter apenas o nome fixo
    const coresNome = [
        '#FF69B4'
    ];
    let textoIndexNome = 0;
    let corIndexNome = 0;
    const palavrasRotativasContainer = document.getElementById('palavras-rotativas-container');
    const palavraRotativaElemento = document.getElementById('palavra-rotativa');
    const palavrasRotativas = ["ILUSTRADORA", "PROTÓTIPOS", "DESIGNER"];
    let palavraRotativaIndex = 0;
    const tempoTrocaPalavra = 2000;
    const tempoTransicao = 500; // Duração da transição em milissegundos

    // Função para trocar a cor do nome (opcional: se quiser alguma animação no nome)
    function trocarTextoCorNomeApresentacao() {
        if (nomeApresentacao) {
            nomeApresentacao.style.color = coresNome[corIndexNome];
            corIndexNome = (corIndexNome + 1) % coresNome.length;
        }
    }

    // Inicia a troca de cor do nome (opcional)
    setInterval(trocarTextoCorNomeApresentacao, 3000); // Troca a cor a cada 3 segundos

    // Cria a linha de transição
    const linhaTransicao = document.createElement('div');
    linhaTransicao.classList.add('linha-transicao');
    palavrasRotativasContainer.appendChild(linhaTransicao);

    function iniciarTransicao() {
        palavrasRotativasContainer.classList.add('transicionando');
        return new Promise(resolve => setTimeout(resolve, tempoTransicao));
    }

    function trocarPalavra() {
        palavraRotativaElemento.textContent = "  " + palavrasRotativas[palavraRotativaIndex];
        palavraRotativaIndex = (palavraRotativaIndex + 1) % palavrasRotativas.length;
    }

    function finalizarTransicao() {
        palavrasRotativasContainer.classList.remove('transicionando');
    }

    async function cicloPalavras() {
        await iniciarTransicao();
        trocarPalavra();
        finalizarTransicao();
        setTimeout(cicloPalavras, tempoTrocaPalavra);
    }

    // Inicia o ciclo de palavras
    cicloPalavras();

    habilidadeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    function baixarCurriculo() {
        const arquivoCv = 'seu_curriculo.pdf';
        const link = document.createElement('a');
        link.href = arquivoCv;
        link.download = 'seu_curriculo.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (botaoBaixarCvApresentacao) {
        botaoBaixarCvApresentacao.addEventListener('click', baixarCurriculo);
    }

    if (menuIcon && navPrincipal) {
        menuIcon.addEventListener('click', function() {
            navPrincipal.style.display = navPrincipal.style.display === 'block' ? 'none' : 'block';
        });
    }

    const rolarParaBaixoIcon = document.querySelector('.rolar-para-baixo');
    const proximaSecao = document.querySelector('#sobre');

    if (rolarParaBaixoIcon && proximaSecao) {
        rolarParaBaixoIcon.addEventListener('click', function(event) {
            event.preventDefault();
            proximaSecao.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Animação 3D da foto na seção Sobre Mim
    const imagemContainerSobre = document.getElementById('sobreImagemContainer');
    const imagemSobre = document.getElementById('sobreImagem');
    const maxRotationSobre = 15; // Grau máximo de rotação
    const maxScaleSobre = 1.05; // Escala máxima

    if (imagemContainerSobre && imagemSobre) {
        imagemContainerSobre.addEventListener('mousemove', (e) => {
            const containerWidth = imagemContainerSobre.offsetWidth;
            const containerHeight = imagemContainerSobre.offsetHeight;
            const centerX = containerWidth / 2;
            const centerY = containerHeight / 2;
            const mouseX = e.clientX - imagemContainerSobre.getBoundingClientRect().left;
            const mouseY = e.clientY - imagemContainerSobre.getBoundingClientRect().top;

            const deltaX = (mouseX - centerX) / centerX; // Varia de -1 a 1
            const deltaY = (mouseY - centerY) / centerY; // Varia de -1 a 1

            const rotateY = deltaX * maxRotationSobre;
            const rotateX = deltaY * -maxRotationSobre; // Inverter para o efeito desejado
            const scale = 1 + Math.abs(deltaX * 0.02) + Math.abs(deltaY * 0.02); // Ligeira escala baseada na distância do centro

            imagemSobre.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        });

        imagemContainerSobre.addEventListener('mouseleave', () => {
            imagemSobre.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
});