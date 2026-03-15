// Initialisation Particules
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#a333ff", "#ff33f6"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#a333ff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
    },
    "retina_detect": true
});

// Fonction d'obfuscation
function protect() {
    const gameName = document.getElementById('gameName').value || "CodeBlox_Script";
    let code = document.getElementById('scriptInput').value;

    if (!code) { alert("Veuillez coller un script !"); return; }

    // Obfuscation basique pour le test
    code = code.replace(/--.*$/gm, ""); // Enlever commentaires
    code = code.replace(/\s+/g, " ").trim(); // Minifier
    
    const finalCode = "-- Protected by CodeBlox Studio\n" + code;
    const blob = new Blob([finalCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = gameName + "_Protected.lua";
    a.click();
}