export const locations = {
  ingreso: {
    id: "ingreso",
    name: "Ingreso Principal",
    subtitle: "Pabellón San Juan Bautista",
    description: "Bienvenidos a la Universidad La Salle de Arequipa, ubicada en la Av. Alfonso Ugarte 517. Una institución licenciada por SUNEDU que ofrece 8 carreras profesionales y está comprometida con la formación integral basada en valores.",
    colorTheme: "#0D47A1", // Azul La Salle
    audioScript: "Bienvenidos a la Universidad La Salle de Arequipa. Fundada bajo el legado y los valores de San Juan Bautista de La Salle, nuestra institución ofrece ocho carreras profesionales orientadas a la excelencia e innovación. Contamos con licenciamiento institucional de SUNEDU otorgado en 2018 y estamos bajo la dirección de nuestro rector, el doctor Patricio Quintanilla Paulet. Te invitamos a conocer nuestro campus guiado por los valores de fe, fraternidad y servicio.",
    hologramHTML: `
      <!-- Modelo GLTF del Estudiante Graduado (graduate_kid.glb) en la Entrada -->
      <a-entity position="0 0.4 0" 
                scale="0.4 0.4 0.4" 
                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear">
        <a-gltf-model src="./assets/models/graduate_kid.glb"></a-gltf-model>
      </a-entity>
      
      <!-- Efecto de Anillos de Bienvenida (Fe, Fraternidad y Servicio) -->
      <a-ring radius-inner="0.6" radius-outer="0.63" color="#0D47A1" rotation="90 0 0" position="0 0.05 0"
              material="side: double; opacity: 0.8; transparent: true"
              animation="property: scale; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 3000; easing: easeInOutSine">
      </a-ring>
      <a-ring radius-inner="0.8" radius-outer="0.83" color="#FFD54F" rotation="90 0 0" position="0 0.05 0"
              material="side: double; opacity: 0.5; transparent: true"
              animation="property: scale; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 4500; easing: easeInOutSine">
      </a-ring>
    `
  },
  biblioteca: {
    id: "biblioteca",
    name: "Biblioteca Universitaria",
    subtitle: "Centro de Información y Documentación",
    description: "Centro de recursos bibliográficos de la Universidad La Salle. Ofrece acceso a colecciones de textos físicos, salas grupales de estudio, y a una robusta Biblioteca Virtual con bases científicas globales (Scopus, ScienceDirect).",
    colorTheme: "#00796B", // Verde Azulado / Teal
    audioScript: "Te encuentras en la entrada de la Biblioteca Universitaria. Este es el centro de recursos de información y documentación de la universidad. Aquí podrás acceder a catálogos físicos, colecciones especializadas y a la Biblioteca Virtual con acceso directo a prestigiosas bases de datos globales como Scopus y ScienceDirect, además de nuestro Repositorio Institucional de tesis e investigaciones.",
    hologramHTML: `
      <!-- Modelo GLTF del Libro (book.glb) -->
      <a-entity position="0 0.3 0" 
                scale="0.4 0.4 0.4" 
                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear">
        <a-gltf-model src="./assets/models/book.glb"></a-gltf-model>
      </a-entity>
      
      <!-- Efecto de Aura de Datos (Anillo de luz flotante) -->
      <a-ring radius-inner="0.6" radius-outer="0.63" color="#00E5FF" rotation="90 0 0" position="0 0.1 0"
              material="side: double; opacity: 0.6; transparent: true"
              animation="property: scale; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 2000; easing: easeInOutSine">
      </a-ring>
    `
  },
  laboratorio: {
    id: "laboratorio",
    name: "Lab. Ingeniería de Software",
    subtitle: "Pabellón de Ingeniería",
    description: "Laboratorios avanzados de cómputo para la Escuela Profesional de Ingeniería de Software. Equipados con infraestructura moderna para el desarrollo ágil, pruebas unitarias, DevOps, inteligencia artificial y computación en la nube.",
    colorTheme: "#00838F", // Cyan Oscuro
    audioScript: "Estás frente a los laboratorios de cómputo especializados de la Escuela Profesional de Ingeniería de Software. En este espacio, los estudiantes adquieren experiencia práctica diseñando, construyendo y probando sistemas de software complejos. Trabajamos con metodologías ágiles como Scrum, herramientas de automatización DevOps, bases de datos avanzadas, desarrollo móvil y computación en la nube.",
    hologramHTML: `
      <!-- Modelo GLTF de la Laptop Macbook (macbook_laptop.glb) con escala optimizada para evitar clipping -->
      <a-entity position="0 0.2 0" 
                scale="0.12 0.12 0.12" 
                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear">
        <a-gltf-model src="./assets/models/macbook_laptop.glb"></a-gltf-model>
      </a-entity>

      <!-- Órbita de Nodos de Red -->
      <a-entity position="0 0.3 0" animation="property: rotation; to: 0 -360 0; loop: true; dur: 8000; easing: linear">
        <a-sphere position="0.6 0.1 0" radius="0.04" color="#00FF88" material="emissive: #00FF88"></a-sphere>
        <a-sphere position="-0.6 -0.05 0" radius="0.03" color="#00E5FF" material="emissive: #00E5FF"></a-sphere>
      </a-entity>
    `
  },
  auditorio: {
    id: "auditorio",
    name: "Auditorio Principal",
    subtitle: "Edificio Juan Bautista de La Salle",
    description: "El auditorio mayor de la universidad es el epicentro de congresos académicos internacionales, obras de teatro, seminarios magistrales y ceremonias solemnes de graduación.",
    colorTheme: "#AD1457", // Rosado / Magenta Oscuro (Elegancia)
    audioScript: "Has llegado al Auditorio Principal. Este emblemático espacio es el centro de reunión para la difusión científica y cultural del campus. Es aquí donde nuestros estudiantes de las ocho escuelas profesionales asisten a congresos internacionales, debates académicos y, finalmente, celebran la ceremonia de graduación, recibiendo sus títulos de la mano de las autoridades universitarias.",
    hologramHTML: `
      <!-- Tarima de Escenario Circular -->
      <a-cylinder position="0 0.05 0" radius="0.8" height="0.08" color="#3f0f29" material="roughness: 0.6"></a-cylinder>

      <!-- Modelo GLTF del Micrófono (microphone.glb) -->
      <a-entity position="0 0.3 0" 
                scale="0.15 0.15 0.15" 
                animation="property: rotation; to: 0 360 0; loop: true; dur: 12000; easing: linear">
        <a-gltf-model src="./assets/models/microphone.glb"></a-gltf-model>
      </a-entity>

      <!-- Haz de Luz Cónico de Foco/Spotlight -->
      <a-cone position="0 1.2 0" radius-bottom="0.75" radius-top="0.05" height="2.2" 
              color="#E0F7FA" material="opacity: 0.15; transparent: true; side: double"
              rotation="180 0 0">
      </a-cone>
    `
  }
};
