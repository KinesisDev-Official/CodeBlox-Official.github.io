// ==========================================
// 1. CONFIGURATION DES TRADUCTIONS
// ==========================================
const translations = {
    en: {
        title: "Project Dashboard",
        subtitle: "Explore the next generation of games and scripts.",
        search: "Search a game or script...",
        cat_all: "All Categories",
        cat_html: "HTML Games",
        cat_roblox: "Roblox Scripts",
        tab_html: "Games / HTML",
        tab_roblox: "Scripts / Roblox",
        tab_credits: "Credits & Goals",
        tab_team: "Our Team",
        mission: "Our mission is to create a powerful and secure hub for the gaming community.",
        play: "Play Demo",
        get: "Get Script",
        coming: "Coming Soon.",
        share: "Share Project Link",
        role_anton: "Co-Owner / Game Tester",
        role_stap: "Owner"
    },
    fr: {
        title: "Tableau de Bord",
        subtitle: "Découvrez la nouvelle génération de jeux et scripts.",
        search: "Rechercher un jeu ou un script...",
        cat_all: "Toutes les catégories",
        cat_html: "Jeux HTML",
        cat_roblox: "Scripts Roblox",
        tab_html: "Jeux / HTML",
        tab_roblox: "Scripts / Roblox",
        tab_credits: "Crédits & Objectifs",
        tab_team: "Notre Équipe",
        mission: "Notre mission est de créer un hub puissant et sécurisé pour la communauté gaming.",
        play: "Jouer à la démo",
        get: "Obtenir le script",
        coming: "Bientôt disponible",
        share: "Partager le lien",
        role_anton: "Co-Propriétaire / Testeur",
        role_stap: "Propriétaire"
    },
    ru: {
        title: "Панель Проекта",
        subtitle: "Откройте новое поколение игр и скриптов.",
        search: "Поиск игры или скрипта...",
        cat_all: "Все категории",
        cat_html: "HTML игры",
        cat_roblox: "Roblox скрипты",
        tab_html: "Игры / HTML",
        tab_roblox: "Скрипты / Roblox",
        tab_credits: "Авторы и цели",
        tab_team: "Наша команда",
        mission: "Наша миссия — создать мощный и безопасный центр для игрового сообщества.",
        play: "Играть в демо",
        get: "Получить скрипт",
        coming: "Скоро будет",
        share: "Поделиться ссылкой",
        role_anton: "Совладелец / Тестировщик",
        role_stap: "Владелец"
    }
};

let currentLang = localStorage.getItem("lang") || "en";

// ==========================================
// 2. FONCTION DE TRADUCTION (APPLY)
// ==========================================
function applyTranslations() {
    const t = translations[currentLang];
    
    // Header & Recherche
    document.getElementById("mainTitle").textContent = t.title;
    document.getElementById("mainSubtitle").textContent = t.subtitle;
    document.getElementById("searchBar").placeholder = t.search;
    
    // Sélecteur de catégories
    const catOpts = document.getElementById("categoryFilter").options;
    catOpts[0].text = t.cat_all;
    catOpts[1].text = t.cat_html;
    catOpts[2].text = t.cat_roblox;

    // Boutons des Onglets
    const tabs = document.querySelectorAll(".tab-btn");
    tabs[0].textContent = t.tab_html;
    tabs[1].textContent = t.tab_roblox;
    tabs[2].textContent = t.tab_credits;
    tabs[3].textContent = t.tab_team;

    // Crédits & Share
    document.getElementById("creditMission").textContent = t.mission;
    document.getElementById("shareText").textContent = t.share;
    
    // Team Rôles
    document.getElementById("roleAntonTeam").textContent = t.role_anton;
    document.getElementById("roleStapTeam").textContent = t.role_stap;

    // Boutons dynamiques dans les cartes
    document.querySelectorAll("#html-games .btn-main").forEach(btn => btn.textContent = t.play);
    document.querySelectorAll("#roblox-scripts .btn-main").forEach(btn => btn.textContent = t.get);
    if(document.getElementById("comingSoonText")) {
        document.getElementById("comingSoonText").textContent = t.coming;
    }
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyTranslations();
}

// ==========================================
// 3. NAVIGATION ET ONGLETS
// ==========================================
function openTab(evt, tabName) {
    const tabcontents = document.getElementsByClassName("tab-content");
    const tablinks = document.getElementsByClassName("tab-btn");

    for (let content of tabcontents) {
        content.classList.remove("active");
        content.style.opacity = "0";
    }
    for (let link of tablinks) {
        link.classList.remove("active");
    }

    const currentTab = document.getElementById(tabName);
    currentTab.classList.add("active");
    setTimeout(() => { currentTab.style.opacity = "1"; }, 10);
    evt.currentTarget.classList.add("active");
}

// ==========================================
// 4. THEME CLAIR / SOMBRE
// ==========================================
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
}

// ==========================================
// 5. RECHERCHE ET FILTRES
// ==========================================
function filterContent() {
    const searchValue = document.getElementById("searchBar").value.toLowerCase();
    const categoryValue = document.getElementById("categoryFilter").value;
    const cards = document.querySelectorAll(".card:not(.team-card)");

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const category = card.getAttribute("data-category");
        
        const matchesSearch = text.includes(searchValue);
        const matchesCategory = (categoryValue === "all" || category === categoryValue);
        
        card.style.display = (matchesSearch && matchesCategory) ? "block" : "none";
    });
}

document.getElementById("searchBar").addEventListener("input", filterContent);
document.getElementById("categoryFilter").addEventListener("change", filterContent);

// ==========================================
// 6. MODALE ET PARTAGE
// ==========================================
function openModal() {
    document.getElementById('discordModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('discordModal').style.display = 'none';
}

function shareSite() {
    const siteUrl = window.location.href;
    const toast = document.getElementById('shareToast');
    navigator.clipboard.writeText(siteUrl).then(() => {
        toast.style.transform = "translateY(0)";
        setTimeout(() => { toast.style.transform = "translateY(100px)"; }, 3000);
    });
}

// Lancement initial
document.addEventListener("DOMContentLoaded", applyTranslations);
