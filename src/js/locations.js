export const locations = {
  ingreso: {
    id: "ingreso",
    name: "Ingreso Principal",
    subtitle: "Pabellón San Juan Bautista",
    description: "Bienvenidos a la Universidad La Salle de Arequipa. Fundada con el compromiso de formar profesionales competitivos y con sólidos valores humanos. Aquí inicia tu experiencia universitaria.",
    colorTheme: "#0D47A1", // Azul La Salle
    audioScript: "Bienvenidos a la Universidad La Salle de Arequipa. Estamos muy contentos de recibirte hoy. La Salle forma parte de una red mundial de educación con más de 300 años de historia y presencia en 80 países. Aquí comenzarás un viaje de aprendizaje, innovación y crecimiento personal, guiado por profesionales comprometidos con tu éxito. Explora nuestro campus escaneando los puntos de interés.",
    hologramHTML: `
      <!-- Estrella de La Salle (Octaedro y Anillos Holográficos) -->
      <a-entity position="0 0.8 0">
        <!-- Octaedro Central (Simboliza la Estrella de 5 puntas de La Salle en volumen) -->
        <a-octahedron color="#FFD54F" radius="0.55" 
                      material="roughness: 0.1; metalness: 0.8; opacity: 0.95; transparent: false"
                      animation="property: rotation; to: 0 360 0; loop: true; dur: 8000; easing: linear">
        </a-octahedron>
        
        <!-- Octaedro de alambre externo para efecto de interfaz holográfica -->
        <a-octahedron color="#0D47A1" radius="0.75" wireframe="true"
                      animation="property: rotation; to: 360 0 360; loop: true; dur: 12000; easing: linear">
        </a-octahedron>
        
        <!-- Anillo Orbital de Energía -->
        <a-ring radius-inner="1.0" radius-outer="1.05" color="#0D47A1" rotation="90 0 0"
                material="side: double; opacity: 0.8; transparent: true"
                animation="property: rotation; to: 90 360 90; loop: true; dur: 6000; easing: easeInOutSine">
        </a-ring>
        
        <!-- Anillo Orbital Secundario -->
        <a-ring radius-inner="1.2" radius-outer="1.23" color="#FFD54F" rotation="45 45 0"
                material="side: double; opacity: 0.6; transparent: true"
                animation="property: rotation; to: 45 405 360; loop: true; dur: 10000; easing: linear">
        </a-ring>
        
        <!-- Partículas flotantes alrededor -->
        <a-entity animation="property: rotation; to: 0 -360 0; loop: true; dur: 14000; easing: linear">
          <a-sphere position="1.1 0 0" radius="0.08" color="#00E5FF" material="emissive: #00E5FF"></a-sphere>
          <a-sphere position="-1.1 0.3 0.2" radius="0.05" color="#FFD54F" material="emissive: #FFD54F"></a-sphere>
          <a-sphere position="0 -0.4 1.1" radius="0.06" color="#0D47A1" material="emissive: #0D47A1"></a-sphere>
        </a-entity>
      </a-entity>
    `
  },
  biblioteca: {
    id: "biblioteca",
    name: "Biblioteca Universitaria",
    subtitle: "Centro de Información y Documentación",
    description: "Un espacio de estudio y consulta equipado con miles de títulos físicos y acceso a bases de datos científicas globales (Scopus, IEEE). Cuenta con salas de estudio grupal y computadoras de investigación.",
    colorTheme: "#00796B", // Verde Azulado / Teal
    audioScript: "Te encuentras en la entrada de la Biblioteca. Este es el corazón académico de nuestra universidad. Aquí encontrarás miles de recursos físicos y digitales para potenciar tus investigaciones, además de salas silenciosas especialmente diseñadas para trabajos en equipo o estudio individual concentrado.",
    hologramHTML: `
      <!-- Libro Holográfico y Esfera de Conocimiento -->
      <a-entity position="0 0.8 0">
        <!-- Cuerpo del "Libro" (Compuesto de tres cajas para parecer páginas abiertas) -->
        <a-entity rotation="25 0 0" animation="property: rotation; to: 25 360 0; loop: true; dur: 10000; easing: linear">
          <!-- Tapa Izquierda -->
          <a-box position="-0.3 0 0" width="0.55" height="0.75" depth="0.06" color="#004D40" material="roughness: 0.3"></a-box>
          <!-- Tapa Derecha -->
          <a-box position="0.3 0 0" width="0.55" height="0.75" depth="0.06" color="#004D40" material="roughness: 0.3"></a-box>
          
          <!-- Páginas Abiertas Izquierda (Blanco Brillante) -->
          <a-box position="-0.27 0.04 0" width="0.5" height="0.7" depth="0.04" color="#FFFFFF" material="emissive: #E0F2F1"></a-box>
          <!-- Páginas Abiertas Derecha (Blanco Brillante) -->
          <a-box position="0.27 0.04 0" width="0.5" height="0.7" depth="0.04" color="#FFFFFF" material="emissive: #E0F2F1"></a-box>
        </a-entity>
        
        <!-- Esfera de Sabiduría Flotante en el Centro -->
        <a-sphere position="0 0.5 0" radius="0.2" color="#00E5FF" 
                  material="opacity: 0.9; transparent: true; emissive: #00E5FF"
                  animation="property: position; to: 0 0.7 0; dir: alternate; loop: true; dur: 2000; easing: easeInOutQuad">
        </a-sphere>
        
        <!-- Orbitas de Información que rodean la escena -->
        <a-entity animation="property: rotation; to: 360 360 0; loop: true; dur: 9000; easing: linear">
          <a-torus radius="0.9" radius-tubular="0.02" color="#00796B" rotation="90 0 0"></a-torus>
          <a-sphere position="0.9 0 0" radius="0.06" color="#00E5FF"></a-sphere>
        </a-entity>
        <a-entity animation="property: rotation; to: -360 360 90; loop: true; dur: 7000; easing: linear">
          <a-torus radius="0.7" radius-tubular="0.015" color="#00E5FF" rotation="45 0 0" material="opacity: 0.7; transparent: true"></a-torus>
        </a-entity>
      </a-entity>
    `
  },
  laboratorio: {
    id: "laboratorio",
    name: "Laboratorio de Sistemas",
    subtitle: "Pabellón de Ingeniería",
    description: "Espacio tecnológico especializado con computadoras de alto rendimiento, entornos de desarrollo ágil y software licenciado para simulación de redes, desarrollo de software e inteligencia artificial.",
    colorTheme: "#00838F", // Cyan Oscuro
    audioScript: "Estás frente a los laboratorios de computación de la Escuela Profesional de Ingeniería de Sistemas. Aquí los estudiantes desarrollan habilidades clave en ingeniería de software, ciberseguridad, inteligencia artificial y computación en la nube. Equipados con herramientas modernas para crear soluciones que cambien el mundo.",
    hologramHTML: `
      <!-- Servidor de Datos / Red de Neuronas Holográfica -->
      <a-entity position="0 0.8 0">
        <!-- Cubo Servidor Central -->
        <a-box position="0 0 0" width="0.6" height="0.7" depth="0.6" color="#00E5FF" 
               material="wireframe: false; opacity: 0.45; transparent: true; roughness: 0.1; metalness: 0.9"
               animation="property: rotation; to: 0 360 0; loop: true; dur: 7000; easing: linear">
          
          <!-- Núcleo de Procesamiento Interno (Glow) -->
          <a-octahedron radius="0.25" color="#FF1744" 
                        material="emissive: #FF1744; opacity: 0.9; transparent: true"
                        animation="property: scale; to: 1.3 1.3 1.3; dir: alternate; loop: true; dur: 1500; easing: easeInOutSine">
          </a-octahedron>
        </a-box>
        
        <!-- Cubo Contenedor Holográfico Externo (Wireframe) -->
        <a-box position="0 0 0" width="0.8" height="0.9" depth="0.8" color="#006064" 
               material="wireframe: true; wireframeLineWidth: 2"
               animation="property: rotation; to: 360 0 -360; loop: true; dur: 12000; easing: linear">
        </a-box>
        
        <!-- Matriz de Conexiones (Red de Datos) -->
        <a-entity animation="property: rotation; to: 0 360 0; loop: true; dur: 9000; easing: linear">
          <!-- Nodos de red satélite -->
          <a-sphere position="0.9 0.4 0.9" radius="0.08" color="#00E5FF" material="emissive: #00E5FF"></a-sphere>
          <a-sphere position="-0.9 -0.4 -0.9" radius="0.06" color="#FF1744" material="emissive: #FF1744"></a-sphere>
          <a-sphere position="-0.9 0.4 0.9" radius="0.07" color="#00FF88" material="emissive: #00FF88"></a-sphere>
          <a-sphere position="0.9 -0.4 -0.9" radius="0.08" color="#FFFFFF" material="emissive: #FFFFFF"></a-sphere>
        </a-entity>
      </a-entity>
    `
  },
  auditorio: {
    id: "auditorio",
    name: "Auditorio Principal",
    subtitle: "Edificio Juan Bautista de La Salle",
    description: "El auditorio mayor de la universidad, escenario de congresos de investigación, seminarios magistrales, ceremonias solemnes de graduación e importantes muestras artísticas y culturales.",
    colorTheme: "#AD1457", // Rosado / Magenta Oscuro (Elegancia)
    audioScript: "Has llegado al Auditorio Principal San Juan Bautista de La Salle. Este emblemático espacio es el centro de la vida cultural, científica y académica de nuestra institución. Aquí se celebran conferencias magistrales, debates estudiantiles y la gran ceremonia de graduación que marca el inicio de la vida profesional de nuestros alumnos.",
    hologramHTML: `
      <!-- Escenario Holográfico de Conciertos y Luz de Foco -->
      <a-entity position="0 0.4 0">
        <!-- Tarima de Escenario -->
        <a-cylinder position="0 0.05 0" radius="0.8" height="0.1" color="#4A148C" material="roughness: 0.5; metalness: 0.5"></a-cylinder>
        <a-cylinder position="0 0.05 0" radius="0.85" height="0.08" color="#AD1457" wireframe="true"></a-cylinder>
        
        <!-- Haz de Luz Cónico (Efecto Reflector/Spotlight) -->
        <a-cone position="0 0.9 0" radius-bottom="0.7" radius-top="0.05" height="1.6" 
                color="#ECEFF1" material="opacity: 0.35; transparent: true; side: double"
                rotation="180 0 0">
        </a-cone>
        
        <!-- Símbolo Flotante del Logro / Arte (Torus Knot Dorado) -->
        <a-torus-knot position="0 0.8 0" radius="0.22" radius-tubular="0.04" p="2" q="3" color="#FFD54F"
                      material="roughness: 0.1; metalness: 0.9; emissive: #FF8F00"
                      animation="property: rotation; to: 0 360 0; loop: true; dur: 6000; easing: linear"
                      animation__bob="property: position; to: 0 1.0 0; dir: alternate; loop: true; dur: 2000; easing: easeInOutQuad">
        </a-torus-knot>
        
        <!-- Partículas de Luz Subiendo -->
        <a-entity animation="property: rotation; to: 0 360 0; loop: true; dur: 8000; easing: linear">
          <a-sphere position="0.3 0.3 0.3" radius="0.04" color="#FFF" material="opacity: 0.8; transparent: true"></a-sphere>
          <a-sphere position="-0.4 0.6 0.1" radius="0.03" color="#FFD54F" material="opacity: 0.7; transparent: true"></a-sphere>
          <a-sphere position="0.2 0.7 -0.3" radius="0.05" color="#AD1457" material="opacity: 0.6; transparent: true"></a-sphere>
        </a-entity>
      </a-entity>
    `
  }
};
