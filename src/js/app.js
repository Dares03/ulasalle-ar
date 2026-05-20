import { locations } from './locations.js';

// ----------------------------------------------------
// ESTADO DE LA APLICACIÓN
// ----------------------------------------------------
let state = {
  currentLocationId: 'ingreso',
  audioPlaying: false,
  audioSource: 'tts', // 'tts' (Text-to-Speech) o 'mp3'
  audioElement: null,
  speechUtterance: null,
  estimatedDuration: 30, // en segundos
  audioProgress: 0,
  progressInterval: null,
  markerVisible: false,
  cardExpanded: false,
  accordionOpen: false,
  voices: []
};

// Datos adicionales de interés académico para el acordeón (dinámicos)
const academicDetails = {
  ingreso: [
    "Fundación: 2011 por el Instituto de los Hermanos de las Escuelas Cristianas.",
    "Acreditación: Licenciada por SUNEDU, garantizando calidad académica internacional.",
    "Filosofía: Educación centrada en la persona, valores éticos y compromiso social.",
    "Red Mundial: Conexión internacional con más de 80 universidades de la red La Salle."
  ],
  biblioteca: [
    "Recursos: Más de 15,000 libros físicos especializados y revistas científicas.",
    "Biblioteca Digital: Acceso gratuito a Scopus, ScienceDirect, IEEE Xplore y ProQuest.",
    "Salas de Estudio: 6 salas grupales con pantallas de proyección y pizarras interactivas.",
    "Horarios: Lunes a Viernes de 8:00 AM a 8:30 PM, Sábados de 9:00 AM a 1:00 PM."
  ],
  laboratorio: [
    "Infraestructura: PCs Intel Core i7, 32GB RAM, tarjetas gráficas dedicadas para IA.",
    "Software: MATLAB, Python (Anaconda), Android Studio, Docker, Unity y herramientas CAD.",
    "Proyectos: Desarrollo de tesis en Inteligencia Artificial, Robótica y Ciberseguridad.",
    "Capacidad: 30 estudiantes por laboratorio con monitoreo docente interactivo."
  ],
  auditorio: [
    "Capacidad: Aforo cómodo para 220 asistentes sentados.",
    "Tecnología: Ecualización acústica digital, proyector láser 4K y microfonía profesional.",
    "Eventos: Congresos internacionales, ponencias académicas, obras de teatro y graduaciones.",
    "Uso Común: Espacio compartido para asambleas de estudiantes y debates universitarios."
  ]
};

// ----------------------------------------------------
// SELECTORES DOM
// ----------------------------------------------------
const DOM = {
  welcomePortal: document.getElementById('welcome-portal'),
  btnEnter: document.getElementById('btn-enter'),
  arScene: document.querySelector('a-scene'),
  arMarker: document.getElementById('ar-marker'),
  hudContainer: document.getElementById('hud-container'),
  scanFeedback: document.getElementById('scan-feedback'),
  
  // HUD Cabecera
  locTitle: document.getElementById('loc-title'),
  locSubtitle: document.getElementById('loc-subtitle'),
  
  // Controles de Audio
  btnAudioPlay: document.getElementById('btn-audio-play'),
  btnAudioReplay: document.getElementById('btn-audio-replay'),
  audioProgressBar: document.getElementById('audio-progress-bar'),
  voiceWave: document.getElementById('voice-wave'),
  
  // Tarjeta Inferior
  hudBottomCard: document.querySelector('.hud-bottom-card'),
  bottomCardHandle: document.getElementById('bottom-card-handle'),
  locDescription: document.getElementById('loc-description'),
  locDetailsList: document.getElementById('loc-details-list'),
  accordionToggle: document.getElementById('accordion-toggle'),
  accordionContent: document.getElementById('accordion-content'),
  detailsAccordion: document.querySelector('.details-accordion'),
  
  // Modales e Interacciones
  btnMenu: document.getElementById('btn-menu'),
  menuModal: document.getElementById('menu-modal'),
  btnCloseModal: document.getElementById('btn-close-modal'),
  modalLocationsList: document.getElementById('modal-locations-list'),
  
  btnMap: document.getElementById('btn-map'),
  mapModal: document.getElementById('map-modal'),
  btnCloseMap: document.getElementById('btn-close-map'),
  mapPoints: document.querySelectorAll('.map-point')
};

// ----------------------------------------------------
// INICIALIZACIÓN
// ----------------------------------------------------
function init() {
  // 1. Determinar locación por URL o defecto
  const urlParams = new URLSearchParams(window.location.search);
  const locParam = urlParams.get('loc');
  if (locParam && locations[locParam]) {
    state.currentLocationId = locParam;
  } else {
    state.currentLocationId = 'ingreso';
  }

  // Cargar lista de voces de síntesis de voz (algunos navegadores la cargan de forma asíncrona)
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.onvoiceschanged = () => {
      state.voices = speechSynthesis.getVoices();
    };
  }

  // 2. Configurar la interfaz inicial
  setupLocation(state.currentLocationId);
  setupEvents();
  populateMenuModal();
}

// ----------------------------------------------------
// CONFIGURACIÓN DE LA LOCACIÓN SELECCIONADA
// ----------------------------------------------------
function setupLocation(locId) {
  state.currentLocationId = locId;
  const loc = locations[locId];
  if (!loc) return;

  // Detener audios anteriores
  stopNarration();

  // Actualizar textos del HUD
  DOM.locTitle.textContent = loc.name;
  DOM.locSubtitle.textContent = loc.subtitle;
  DOM.locDescription.textContent = loc.description;

  // Cambiar color de acento dinámicamente en variables de CSS para que coincida con el tema
  document.documentElement.style.setProperty('--color-secondary', loc.colorTheme);
  
  // Generar lista de detalles académicos
  DOM.locDetailsList.innerHTML = '';
  const details = academicDetails[locId] || [];
  details.forEach(detail => {
    const li = document.createElement('li');
    li.textContent = detail;
    DOM.locDetailsList.appendChild(li);
  });

  // Actualizar Holograma en A-Frame (Inyectar HTML)
  DOM.arMarker.innerHTML = '';
  // Esperar un breve instante para la limpieza e inyectar el nuevo contenido
  setTimeout(() => {
    DOM.arMarker.innerHTML = loc.hologramHTML;
  }, 100);

  // Actualizar marcador activo en el mapa visual
  DOM.mapPoints.forEach(point => {
    const pointNum = point.textContent.trim();
    const mapping = { '1': 'ingreso', '2': 'biblioteca', '3': 'laboratorio', '4': 'auditorio' };
    if (mapping[pointNum] === locId) {
      point.classList.add('active');
    } else {
      point.classList.remove('active');
    }
  });

  // Configurar origen de audio síncronamente (prioriza MP3 local si se define, sino TTS)
  if (loc.audioMp3) {
    state.audioSource = 'mp3';
    if (state.audioElement) {
      state.audioElement.pause();
    }
    state.audioElement = new Audio(loc.audioMp3);
    state.audioElement.addEventListener('ended', onAudioFinished);
    state.audioElement.addEventListener('timeupdate', updateAudioProgressFromElement);
  } else {
    setupTTS(loc.audioScript);
  }
}

// Configurar Síntesis de voz (Text-to-Speech)
function setupTTS(text) {
  state.audioSource = 'tts';
  state.audioElement = null;
  
  // Estimar duración basada en velocidad promedio de habla (aprox 2.3 palabras por segundo)
  const wordCount = text.split(/\s+/).length;
  state.estimatedDuration = Math.max(12, Math.round(wordCount / 2.3)); // Mínimo 12s

  state.speechUtterance = new SpeechSynthesisUtterance(text);
  state.speechUtterance.lang = 'es-LA'; // Español Latinoamericano o es-ES
  
  // Buscar una voz en español en el sistema
  if (state.voices.length === 0 && typeof speechSynthesis !== 'undefined') {
    state.voices = speechSynthesis.getVoices();
  }
  
  const spanishVoice = state.voices.find(voice => 
    voice.lang.includes('es-') || voice.lang.includes('es_') || voice.lang.toLowerCase() === 'es'
  );
  if (spanishVoice) {
    state.speechUtterance.voice = spanishVoice;
  }
  
  state.speechUtterance.rate = 0.95; // Habla ligeramente más pausada y natural
  state.speechUtterance.pitch = 1.0; 

  state.speechUtterance.onend = onAudioFinished;
  state.speechUtterance.onerror = (e) => {
    console.error("Evento o error en TTS:", e);
    // Solo finalizar progreso si no fue cancelado manualmente para cambio de parada
    if (state.audioPlaying) {
      onAudioFinished();
    }
  };
}

// ----------------------------------------------------
// REGISTRO DE EVENTOS Y DETECCIONES
// ----------------------------------------------------
function setupEvents() {
  // Botón de entrar al portal (Autorización del usuario para Cámara y Audio)
  DOM.btnEnter.addEventListener('click', startExperience);

  // Controles de audio
  DOM.btnAudioPlay.addEventListener('click', toggleAudio);
  DOM.btnAudioReplay.addEventListener('click', restartAudio);

  // Acordeón de detalles
  DOM.accordionToggle.addEventListener('click', toggleAccordion);

  // Bottom Sheet deslizable/interactivo
  DOM.bottomCardHandle.addEventListener('click', toggleBottomCard);

  // Controladores de Modales
  DOM.btnMenu.addEventListener('click', () => openModal(DOM.menuModal));
  DOM.btnCloseModal.addEventListener('click', () => closeModal(DOM.menuModal));
  
  DOM.btnMap.addEventListener('click', () => openModal(DOM.mapModal));
  DOM.btnCloseMap.addEventListener('click', () => closeModal(DOM.mapModal));

  // Cerrar modales si se hace click fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === DOM.menuModal) closeModal(DOM.menuModal);
    if (e.target === DOM.mapModal) closeModal(DOM.mapModal);
  });

  // Eventos de Marcador AR.js (Detección en Cámara)
  DOM.arMarker.addEventListener('markerFound', () => {
    state.markerVisible = true;
    DOM.scanFeedback.classList.remove('active');
    console.log("Marker Found - Holograma activado.");
  });

  DOM.arMarker.addEventListener('markerLost', () => {
    state.markerVisible = false;
    DOM.scanFeedback.classList.add('active');
    console.log("Marker Lost - Holograma oculto.");
  });
}

// ----------------------------------------------------
// FUNCIONES DE CONTROL DE AUDIO
// ----------------------------------------------------
function playNarration() {
  if (state.audioPlaying) return;

  state.audioPlaying = true;
  DOM.voiceWave.classList.add('playing');
  DOM.btnAudioPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';

  if (state.audioSource === 'mp3' && state.audioElement) {
    state.audioElement.play().catch(err => {
      console.warn("Autoplay bloqueado por el navegador:", err);
      onAudioFinished();
    });
  } else if (state.audioSource === 'tts' && state.speechUtterance) {
    // Si ya está pausada, reanudar
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      // Si no, cancelar en curso e iniciar
      speechSynthesis.cancel();
      speechSynthesis.speak(state.speechUtterance);
    }
    startProgressTimer();
  }
}

function pauseNarration() {
  if (!state.audioPlaying) return;

  state.audioPlaying = false;
  DOM.voiceWave.classList.remove('playing');
  DOM.btnAudioPlay.innerHTML = '<i class="fa-solid fa-play"></i>';

  if (state.audioSource === 'mp3' && state.audioElement) {
    state.audioElement.pause();
  } else if (state.audioSource === 'tts') {
    speechSynthesis.pause();
    clearInterval(state.progressInterval);
  }
}

function toggleAudio() {
  if (state.audioPlaying) {
    pauseNarration();
  } else {
    playNarration();
  }
}

function stopNarration() {
  pauseNarration();
  state.audioProgress = 0;
  DOM.audioProgressBar.style.width = '0%';

  if (state.audioSource === 'mp3' && state.audioElement) {
    state.audioElement.currentTime = 0;
  } else if (state.audioSource === 'tts') {
    speechSynthesis.cancel();
  }
  
  clearInterval(state.progressInterval);
}

function restartAudio() {
  stopNarration();
  // Breve delay para asegurar limpieza y reproducir
  setTimeout(() => {
    playNarration();
  }, 100);
}

function onAudioFinished() {
  state.audioPlaying = false;
  state.audioProgress = 100;
  DOM.audioProgressBar.style.width = '100%';
  DOM.voiceWave.classList.remove('playing');
  DOM.btnAudioPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
  clearInterval(state.progressInterval);
  console.log("Audio de parada finalizado.");
}

// Temporizador para simular barra de progreso de TTS
function startProgressTimer() {
  clearInterval(state.progressInterval);
  
  // El tiempo transcurrido depende del progreso que ya llevábamos
  let elapsedMs = (state.audioProgress / 100) * state.estimatedDuration * 1000;
  const totalMs = state.estimatedDuration * 1000;
  const intervalMs = 150; // actualizar cada 150ms

  state.progressInterval = setInterval(() => {
    if (!state.audioPlaying) {
      clearInterval(state.progressInterval);
      return;
    }

    elapsedMs += intervalMs;
    state.audioProgress = Math.min(99.5, (elapsedMs / totalMs) * 100);
    DOM.audioProgressBar.style.width = `${state.audioProgress}%`;

    if (elapsedMs >= totalMs) {
      onAudioFinished();
    }
  }, intervalMs);
}

// Actualizar barra de progreso desde el elemento de audio real (MP3)
function updateAudioProgressFromElement() {
  if (state.audioSource === 'mp3' && state.audioElement) {
    const current = state.audioElement.currentTime;
    const total = state.audioElement.duration || 1;
    state.audioProgress = (current / total) * 100;
    DOM.audioProgressBar.style.width = `${state.audioProgress}%`;
  }
}

// ----------------------------------------------------
// COMPONENTES DE INTERFAZ E INTERACCIONES UI
// ----------------------------------------------------
function startExperience() {
  // Animación del botón y transición de pantalla
  DOM.btnEnter.style.transform = 'scale(0.9)';
  DOM.welcomePortal.classList.add('fade-out');
  
  // Mostrar la escena de A-Frame de fondo y HUD
  DOM.arScene.style.opacity = '1';
  DOM.hudContainer.style.display = 'flex';

  // Despertar la API de Síntesis de voz (algunos navegadores requieren un disparo de voz vacío para activarse)
  if (typeof speechSynthesis !== 'undefined') {
    const wakeUpUtterance = new SpeechSynthesisUtterance('');
    speechSynthesis.speak(wakeUpUtterance);
  }

  // Reproducir un sonido de chime / bienvenida futurista
  const welcomeChime = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav');
  welcomeChime.volume = 0.3;
  welcomeChime.play().catch(() => {});

  console.log("Experiencia de Tour AR iniciada.");

  // Iniciar la narración inmediatamente de forma síncrona
  playNarration();
}

function toggleAccordion() {
  state.accordionOpen = !state.accordionOpen;
  if (state.accordionOpen) {
    DOM.detailsAccordion.classList.add('open');
  } else {
    DOM.detailsAccordion.classList.remove('open');
  }
}

function toggleBottomCard() {
  state.cardExpanded = !state.cardExpanded;
  if (state.cardExpanded) {
    DOM.hudBottomCard.classList.add('expanded');
  } else {
    DOM.hudBottomCard.classList.remove('expanded');
  }
}

// ----------------------------------------------------
// COMPORTAMIENTO DE MODALES Y MENÚS
// ----------------------------------------------------
function openModal(modal) {
  modal.classList.add('active');
}

function closeModal(modal) {
  modal.classList.remove('active');
}

// Crear el selector manual de paradas
function populateMenuModal() {
  DOM.modalLocationsList.innerHTML = '';
  
  Object.keys(locations).forEach(key => {
    const loc = locations[key];
    
    // Crear elemento de grilla
    const item = document.createElement('div');
    item.className = `location-item ${key === state.currentLocationId ? 'active' : ''}`;
    
    // Asignar icono según la parada
    let iconClass = 'fa-solid fa-location-dot';
    if (key === 'ingreso') iconClass = 'fa-solid fa-door-open';
    if (key === 'biblioteca') iconClass = 'fa-solid fa-book-open-reader';
    if (key === 'laboratorio') iconClass = 'fa-solid fa-laptop-code';
    if (key === 'auditorio') iconClass = 'fa-solid fa-masks-theater';

    item.innerHTML = `
      <i class="${iconClass}"></i>
      <span class="name">${loc.name}</span>
      <span class="tag">${loc.subtitle}</span>
    `;

    // Click en la parada manual
    item.addEventListener('click', () => {
      closeModal(DOM.menuModal);
      
      // Cambiar de locación
      setupLocation(key);
      
      // Actualizar los parámetros de la URL sin recargar la página
      const newUrl = `${window.location.origin}${window.location.pathname}?loc=${key}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
      
      // Actualizar estados visuales de la grilla
      document.querySelectorAll('.location-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      // Reproducir de forma síncrona la narración de la nueva parada
      playNarration();
    });

    DOM.modalLocationsList.appendChild(item);
  });
}

// Ejecutar cuando se carga el DOM
window.addEventListener('DOMContentLoaded', init);
