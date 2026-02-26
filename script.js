/**
 * Classe Voo - Representando a Programação Orientada a Objetos (POO)
 */
class Voo {
    constructor(codigo, origem, destino, horario) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.status = "No Solo";
        this.altitude = 0;
        this.horario = horario;
    }

    // Método para decolar
    decolar() {
        if (this.status === "No Solo") {
            this.status = "Em Voo";
            this.altitude = 10000;
            console.log(`Voo ${this.codigo} decolou com sucesso!`);
            return true;
        }
        return false;
    }

    // Método para pousar
    pousar() {
        if (this.status === "Em Voo") {
            this.status = "No Solo";
            this.altitude = 0;
            console.log(`Voo ${this.codigo} pousou com sucesso!`);
            return true;
        }
        return false;
    }

    // Método para ganhar altitude
    ganharAltitude() {
        if (this.status === "Em Voo") {
            this.altitude += 2000;
            return true;
        }
        return false;
    }
}

// Inicialização do Sistema
const meuVoo = new Voo("AD123", "São Paulo (GRU)", "Curitiba (CWB)", "14:30");

// Seleção de Elementos DOM
const elCodigo = document.getElementById('codigo-val');
const elOrigem = document.getElementById('origem-val');
const elDestino = document.getElementById('destino-val');
const elHorario = document.getElementById('horario-val');
const elStatus = document.getElementById('status-val');
const elAltitude = document.getElementById('altitude-val');
const elAltNum = document.getElementById('alt-num');

const btnDecolar = document.getElementById('btn-decolar');
const btnPousar = document.getElementById('btn-pousar');
const btnAltitude = document.getElementById('btn-altitude');

const radarDot = document.getElementById('radar-dot');
const radarText = document.getElementById('radar-text');
const planeContainer = document.getElementById('plane-container');
const planeIcon = document.getElementById('plane-icon');
const planeShadow = document.getElementById('plane-shadow');

/**
 * Função para atualizar a interface com base nos dados do objeto Voo
 */
function updateUI() {
    // Dados Textuais
    elCodigo.textContent = meuVoo.codigo;
    elOrigem.textContent = meuVoo.origem;
    elDestino.textContent = meuVoo.destino;
    elHorario.textContent = meuVoo.horario;
    elStatus.textContent = meuVoo.status;
    elAltitude.textContent = `${meuVoo.altitude.toLocaleString()} FT`;
    elAltNum.textContent = meuVoo.altitude.toLocaleString();

    const isNoAr = meuVoo.status === "Em Voo";

    // Status Badge
    elStatus.className = `status-badge ${isNoAr ? 'status-flight' : 'status-ground'}`;

    // Botões
    btnDecolar.disabled = isNoAr;
    btnPousar.disabled = !isNoAr;
    btnAltitude.disabled = !isNoAr;

    // Radar & Animações
    if (isNoAr) {
        radarDot.className = 'dot active';
        radarText.textContent = 'TRACKING ACTIVE';
        planeIcon.classList.add('plane-flight');
        planeIcon.classList.remove('plane-ground');
        
        // Movimento do avião
        planeContainer.style.transform = 'translate(50px, -50px) rotate(-10deg)';
        planeShadow.style.transform = 'translateX(-50%) scale(0.8) translateY(80px)';
        planeShadow.style.opacity = '0.2';
    } else {
        radarDot.className = 'dot standby';
        radarText.textContent = 'STANDBY';
        planeIcon.classList.add('plane-ground');
        planeIcon.classList.remove('plane-flight');
        
        // Posição no solo
        planeContainer.style.transform = 'translate(0, 0) rotate(0deg)';
        planeShadow.style.transform = 'translateX(-50%) scale(1) translateY(0)';
        planeShadow.style.opacity = '0.4';
    }
}

// Event Listeners
btnDecolar.addEventListener('click', () => {
    if (meuVoo.decolar()) {
        updateUI();
    }
});

btnPousar.addEventListener('click', () => {
    if (meuVoo.pousar()) {
        updateUI();
    }
});

btnAltitude.addEventListener('click', () => {
    if (meuVoo.ganharAltitude()) {
        updateUI();
    }
});

// Primeira atualização
updateUI();
