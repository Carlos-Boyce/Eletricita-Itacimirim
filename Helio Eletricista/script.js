// Atualiza o ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Suaviza a rolagem para os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Máscara para telefone
function maskPhone(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);

            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');

            e.target.value = value;
        });
    }
}
maskPhone('input[type="tel"]');

// Validação do formulário
function validateForm() {
    const form = document.getElementById('formContato');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        // Remove mensagens de erro anteriores
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
            input.nextElementSibling.remove();
        }

        // Validação do nome
        if (input.type === 'text' && input.placeholder.includes('Nome')) {
            if (input.value.length < 3) {
                showError(input, 'Nome deve ter pelo menos 3 caracteres');
                isValid = false;
            }
        }

        // Validação do email
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
        }

        // Validação do telefone
        if (input.type === 'tel') {
            if (input.value.replace(/\D/g, '').length < 10) {
                showError(input, 'Por favor, insira um telefone válido');
                isValid = false;
            }
        }

        // Validação da mensagem
        if (input.tagName === 'TEXTAREA') {
            if (input.value.length < 10) {
                showError(input, 'Mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    input.insertAdjacentElement('afterend', error);
}

// Formulário de contato - redireciona para WhatsApp
document.getElementById('formContato').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Obter valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    // Formatando o número de telefone (removendo caracteres não numéricos)
    const numeroWhatsapp = '71996249194';

    // Criar mensagem para WhatsApp
    const textoWhatsApp = `Olá Hélio, sou *${nome}*!%0A%0A` +
        `*Meu telefone:* ${telefone}%0A` +
        (email ? `*Meu e-mail:* ${email}%0A` : '') +
        `*Mensagem:*%0A${mensagem}`;

    // Abrir WhatsApp
    window.open(`https://wa.me/55${numeroWhatsapp}?text=${textoWhatsApp}`, '_blank');

    // Resetar o formulário após enviar
    this.reset();
});

// Efeito de scroll para as seções
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    const hero = document.querySelector('.hero');

    // Mostra a seção hero imediatamente
    hero.classList.add('show');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');

                // Caso especial para o hero content
                if (entry.target.classList.contains('hero')) {
                    const heroContent = entry.target.querySelector('.hero-content');
                    if (heroContent) {
                        heroContent.classList.add('show');
                    }
                }
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Observer para o footer
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    footerObserver.observe(footer);
}

// Header scroll effect
function headerScrollEffect() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Back to top button
function backToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Menu ativo conforme rolagem
function activeMenuOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Cookie para mensagem de boas-vindas
function checkFirstVisit() {
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            alert('Seja bem-vindo ao site do Hélio Eletricista! Estamos à disposição para ajudar com seus projetos elétricos.');
            localStorage.setItem('visited', 'true');
        }, 1000);
    }
}

// Inicializa funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    animateOnScroll();
    headerScrollEffect();
    backToTop();
    activeMenuOnScroll();
    checkFirstVisit();
});

// Abrir Menu Lateral Mobile
// Menu Mobile
function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.querySelector('nav ul');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    menuBtn.addEventListener('click', function () {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function () {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Fechar menu quando um link for clicado
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
}

// Adicione esta função na inicialização
document.addEventListener('DOMContentLoaded', function () {
    // ... outras funções
    setupMobileMenu();
});

// Melhorando o menu mobile
function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.querySelector('nav ul');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Abrir/fechar menu
    menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fechar ao clicar no overlay
    overlay.addEventListener('click', function () {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';

            // Suaviza a rolagem para a seção
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
//Fim Abrir Menu Lateral Mobile