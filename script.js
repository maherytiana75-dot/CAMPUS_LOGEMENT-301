// ========== MENU RESPONSIVE ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Fermer le menu après clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // ========== ANIMATIONS AU SCROLL ==========
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(el => observer.observe(el));

    // ========== VALIDATION FORMULAIRE PUBLIER ==========
    const publishForm = document.getElementById('publishForm');
    if (publishForm) {
        publishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Nettoyer anciens messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Nom propriétaire
            const nom = document.getElementById('nom');
            if (!nom.value.trim()) {
                showError(nom, 'Veuillez entrer votre nom');
                isValid = false;
            }
            
            // Téléphone
            const tel = document.getElementById('tel');
            const telRegex = /^(0[1-9])([0-9]{8})$/;
            if (!tel.value.trim() || !telRegex.test(tel.value.replace(/\s/g, ''))) {
                showError(tel, 'Numéro de téléphone invalide (ex: 0612345678)');
                isValid = false;
            }
            
            // Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showError(email, 'Email invalide');
                isValid = false;
            }
            
            // Type, adresse, prix, description requis
            const type = document.getElementById('type');
            if (!type.value) {
                showError(type, 'Sélectionnez un type');
                isValid = false;
            }
            
            const adresse = document.getElementById('adresse');
            if (!adresse.value.trim()) {
                showError(adresse, 'Adresse requise');
                isValid = false;
            }
            
            const prix = document.getElementById('prix');
            if (!prix.value || prix.value <= 0) {
                showError(prix, 'Prix valide requis');
                isValid = false;
            }
            
            const description = document.getElementById('description');
            if (!description.value.trim()) {
                showError(description, 'Description requise');
                isValid = false;
            }
            
            if (isValid) {
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.textContent = '✅ Annonce publiée avec succès ! Nous vous contacterons sous 24h.';
                publishForm.prepend(successDiv);
                publishForm.reset();
                setTimeout(() => successDiv.remove(), 5000);
            }
        });
    }
    
    // ========== FORMULAIRE CONTACT ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            const nom = document.getElementById('contactNom');
            if (!nom.value.trim()) {
                showError(nom, 'Nom requis');
                isValid = false;
            }
            
            const email = document.getElementById('contactEmail');
            const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showError(email, 'Email invalide');
                isValid = false;
            }
            
            const sujet = document.getElementById('sujet');
            if (!sujet.value.trim()) {
                showError(sujet, 'Sujet requis');
                isValid = false;
            }
            
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError(message, 'Message requis');
                isValid = false;
            }
            
            if (isValid) {
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.textContent = '✅ Message envoyé avec succès ! Nous vous répondrons rapidement.';
                contactForm.prepend(successDiv);
                contactForm.reset();
                setTimeout(() => successDiv.remove(), 5000);
            }
        });
    }
    
    // ========== RECHERCHE ET FILTRE LOGEMENTS ==========
    const searchInput = document.getElementById('searchLogement');
    const priceFilter = document.getElementById('priceFilter');
    const cartesLogements = document.querySelectorAll('.logement-card');
    
    function filterLogements() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const maxPrice = priceFilter ? parseInt(priceFilter.value) : Infinity;
        
        cartesLogements.forEach(carte => {
            const titre = carte.querySelector('h3')?.innerText.toLowerCase() || '';
            const localisation = carte.querySelector('.localisation')?.innerText.toLowerCase() || '';
            const prixTexte = carte.querySelector('.prix')?.innerText || '';
            const prix = parseInt(prixTexte.replace(/\D/g, ''));
            
            const matchSearch = titre.includes(searchTerm) || localisation.includes(searchTerm);
            const matchPrice = isNaN(maxPrice) || prix <= maxPrice;
            
            if (matchSearch && matchPrice) {
                carte.style.display = 'block';
            } else {
                carte.style.display = 'none';
            }
        });
    }
    
    if (searchInput) searchInput.addEventListener('input', filterLogements);
    if (priceFilter) priceFilter.addEventListener('input', filterLogements);
    
    // ========== BOUTONS "VOIR PLUS" ==========
    document.querySelectorAll('.btn-card').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = this.closest('.logement-card');
            const titre = card.querySelector('h3')?.innerText || 'ce logement';
            alert(`🔍 Détails de "${titre}"\nContactez le propriétaire pour plus d'informations.`);
        });
    });
    
    // ========== BOUTON EXPLORER ==========
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            window.location.href = 'logements.html';
        });
    }
});

// Fonction utilitaire pour afficher les erreurs
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.classList.add('error-input');
    input.addEventListener('input', () => {
        errorDiv.remove();
        input.classList.remove('error-input');
    }, { once: true });
}