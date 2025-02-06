window.addEventListener('load', inicializar);

const urlMoodle = "https://reda-ar.github.io/campus/";

function inicializar() {
  const body = document.body;

  const main = document.createElement('div');
  main.setAttribute("id", "main");
  main.classList.add("main");
  body.appendChild(main);
  Vista.main = main;

  const topMenu = document.createElement('div');
  topMenu.setAttribute("id", "topMenu");
  topMenu.classList.add("topMenu");
  main.appendChild(topMenu);

  const mainTopMenuButton = document.createElement('a');
  mainTopMenuButton.setAttribute("id", "mainTopMenuButton");
  mainTopMenuButton.classList.add("topMenuButton");
  mainTopMenuButton.classList.add("clickeable");
  mainTopMenuButton.addEventListener('click', mostrarSeccionHandler("MAIN"));
  topMenu.appendChild(mainTopMenuButton);

  const topMenuButtonImg = document.createElement('img');
  topMenuButtonImg.setAttribute("id", "topMenuButtonImg");
  topMenuButtonImg.classList.add("topMenuButtonImg");
  topMenuButtonImg.setAttribute("src", "img/reda.png");
  mainTopMenuButton.appendChild(topMenuButtonImg);

  let topMenuButtonsBar = document.createElement('div');
  topMenuButtonsBar.setAttribute("id", "topMenuButtonsBar");
  topMenuButtonsBar.classList.add("topMenuButtonsBar");
  const topMenuButtons = [
    {text:"Temas", sub:[
      {text:"Programación"},
      {text:"Estadística"},
      {text:"Análisis Matemático"},
      {text:"Python"}
    ]},
    {text:"Herramientas", sub:[{text:"Shiny"}, {text:"Moodle"}, {text:"Blockly"}]},
    {text:"Cursos", sub:[
      {text:"Exactas Programa Invierno 2023"},
      {text:"Taller de Programación 1C 2023"}
    ]},
    {text:"Contacto"}
  ];
  addButtons(topMenuButtonsBar, topMenuButtons, "V");
  topMenu.appendChild(topMenuButtonsBar);
  let seccionActual = parametroURL("s") || "MAIN";
  mostrarSeccion(seccionActual);
};

function addButtons(container, buttons, dir="H") {
  for (let tmb of buttons) {
    let button = document.createElement('a');
    let idSection = 'idSection' in tmb ? tmb.idSection : tmb.text;
    button.setAttribute("id", `topMenuButton_${tmb.text}`);
    button.classList.add("topMenuButton");
    button.classList.add("textTopMenuButton");
    button.classList.add("clickeable");
    button.innerHTML = tmb.text;
    button.parentContainer = container;
    container.appendChild(button);
    button.addEventListener('click', mostrarSeccionHandler(idSection));
    if ('sub' in tmb) {
      for (let sub of tmb.sub) {
        sub.idSection = idSection + '_' + sub.text;
      }
      button.addEventListener('mouseenter', subSectionHandlerEnter(button, tmb.sub, dir));
      button.addEventListener('mouseleave', subSectionHandlerLeave(button));
    }
  }
};

const cursor = {
  stack: [],
  pendientes: []
};

function subSectionHandlerEnter(b, subs, dir="H") {
  return function(e) {
    if (!cursor.stack.includes(b)) {
      let idSubMenu = `${b.getAttribute('id')}_sub`;
      let subMenu = document.getElementById(idSubMenu);
      if (subMenu === null) {
        subMenu = document.createElement('div');
        subMenu.setAttribute("id", idSubMenu);
        subMenu.classList.add("subMenu");
        document.body.appendChild(subMenu);
        subMenu.parentContainer = b;
        subMenu.addEventListener('mouseenter', subMenuHandlerEnter(subMenu, b));
        subMenu.addEventListener('mouseleave', subMenuHandlerLeave(subMenu, b));
        addButtons(subMenu, subs);
      }
      if (!cursor.stack.includes(subMenu)) {
        let buttonRect = b.getBoundingClientRect();
        subMenu.style.top = buttonRect[dir == "H" ? 'top' : 'bottom'];
        subMenu.style.left = buttonRect[dir == "H" ? 'right' : 'left'];
        mostrarMenu(subMenu);
      }
      cursor.stack.push(b);
    }
  };
};

function subSectionHandlerLeave(b) {
  return function(e) {
    setTimeout(function() {
      let idSubMenu = `${b.getAttribute('id')}_sub`;
      let subMenu = document.getElementById(idSubMenu);
      if (subMenu !== null && !cursor.stack.includes(subMenu)) {
        ocultarMenu(subMenu, b);
      }
      cursor.stack.remove(b);
    }, 10);
  };
};

function esHijo(c, m) {
  return 'parentContainer' in c && (c.parentContainer === m || esHijo(c.parentContainer, m))
};

function hayHijo(m) {
  return cursor.stack.some((x) => esHijo(x, m));
};

function subMenuHandlerEnter(menu, b) {
  return function(e) {
    if (cursor.stack.length > 0 && (cursor.stack.includes(b) || cursor.stack.includes(b.parentContainer) || hayHijo(menu))) {
      cursor.stack.push(menu);
      mostrarMenu(menu);
    }
  };
};

function subMenuHandlerLeave(menu, b) {
  return function(e) {
    setTimeout(function() {
      cursor.stack.remove(menu);
      if (!cursor.stack.includes(b) && !hayHijo(menu)) {
        ocultarMenu(menu, b);
        cursor.pendientes.remove(menu);
      } else {
        cursor.pendientes.pushSiNoEsta(menu);
      }
    }, 10);
  };
};

function mostrarMenu(menu) {
  menu.style['animation-name'] = 'appear';
  menu.style.display = 'grid';
};

function ocultarMenu(menu, b) {
  const parents = [];
  const newPendientes = [];
  for (let c of cursor.pendientes) {
    if (esHijo(menu, c) && !cursor.stack.includes(c) && !hayHijo(c)) {
      parents.push(c);
      c.style['animation-name'] = 'dissappear';
    } else {
      newPendientes.push(c);
    }
  }
  menu.style['animation-name'] = 'dissappear';
  setTimeout(function() {
    if (!(cursor.stack.includes(menu) || (b !== null && cursor.stack.includes(b)))) {
      menu.style.display = 'none';
      for (let c of parents) {
        c.style.display = 'none';
      }
      cursor.pendientes = newPendientes;
    }
  }, 500);
};

function mostrarSeccionHandler(clave) {
  return function(e) {
    for (let m of cursor.pendientes.concat(cursor.stack)) {
      if (m.id.endsWith("_sub")) {
        m.style.display = 'none';
      }
    }
    cursor.pendientes = [];
    cursor.stack = [];
    mostrarSeccion(clave);
  }
};

const Vista = {};

function mostrarSeccion(clave) {
  let id = `seccion_${clave}_div`;
  let div = document.getElementById(id);
  if (div === null) {
    div = document.createElement('div');
    div.setAttribute('id', id);
    div.classList.add('seccion');
    Vista.main.appendChild(div);
    let contenido = Contenido[clave] || [];
    armarContenido(div, contenido);
  }
  if ('activa' in Vista) {
    ocultarSeccion(Vista.activa);
  }
  div.style.display = 'block';
  Vista.activa = clave;
  actualizarURL(clave);
};

function ocultarSeccion(clave) {
  let id = `seccion_${clave}_div`;
  let div = document.getElementById(id);
  if (div !== null) {
    div.style.display = 'none';
  }
};

function armarContenido(div, contenido) {
  for (let data of contenido) {
    let e;
    if (data.k === "frame") {
      e = armarFrame(data);
    } else {
      e = document.createElement(data.k);
      if ('text' in data) {
        e.innerHTML = data.text;
      }
    }
    div.appendChild(e);
  }
};

function armarFrame(data) {
  let e = document.createElement('div');
  e.classList.add('frame_div');
  if ('title' in data) {
    let t = document.createElement('h3');
    t.innerHTML = data.title;
    e.appendChild(t);
  }
  if ('desc' in data) {
    let d = document.createElement('p');
    d.innerHTML = data.desc;
    e.appendChild(d);
  }
  if ('url' in data) {
    let f = document.createElement('iframe');
    e.appendChild(armarBotonFrameUrl(f, data.url));
    let b = document.createElement('button');
    b.innerHTML = 'abrir';
    b.addEventListener('click', function(e) {open(data.url);})
    e.appendChild(b);
    f.style.display = 'none';
    e.appendChild(f);
  } else if ('xml' in data) {
    let f = document.createElement('div');
    f.classList.add('xmlView');
    e.appendChild(armarBotonFrameXml(f, data.xml));
    // let bd = document.createElement('button');
    // bd.innerHTML = 'descargar';
    // bd.addEventListener('click', function(e) {open(data.xml);})
    // e.appendChild(bd);
    let br = document.createElement('button');
    br.innerHTML = 'responder este cuestionario';
    br.addEventListener('click', function(e) {open(`${urlMoodle}?q=${data.xml}`);})
    e.appendChild(br);
    f.style.display = 'none';
    e.appendChild(f);
  }
  return e;
};

function armarBotonFrameUrl(f, url) {
  let b = document.createElement('button');
  b.innerHTML = 'mostrar';
  b.addEventListener('click', function(e) {
    if (f.style.display === 'none') {
      let src = f.getAttribute('src');
      if (src === null) {
        f.setAttribute('src', url);
      }
      f.style.display = 'block';
    } else {
      f.style.display = 'none';
    }
  });
  return b;
};

function armarBotonFrameXml(f, ruta) {
  let b = document.createElement('button');
  b.innerHTML = 'vista previa';
  b.addEventListener('click', function(e) {
    if (f.style.display === 'none') {
      if (!f.hasChildNodes()) {
        cargarXML(f, ruta);
      }
      f.style.display = 'block';
    } else {
      f.style.display = 'none';
    }
  });
  return b;
};

function cargarXML(e, ruta) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      e.appendChild(mostrarXML(this.responseXML));
    }
  };
  xhttp.open("GET", ruta, true);
  xhttp.send();
};

let contadorGlobal = 0;
function idUnico() {
  contadorGlobal++;
  return contadorGlobal;
};

const tmpStack = [];

function mostrarXML(xml) {
  let div, texto, i;
  switch (xml.nodeName) {
    case '#document':
      div = document.createElement('div');
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      return div;
    case 'activity':
      div = document.createElement('div');
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      return div;
    case 'lesson':
      div = document.createElement('div');
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      return div;
    case 'name':
      div = document.createElement('h3');
      div.innerHTML = limpiar(xml.innerHTML);
      return div;
    case 'pages':
      div = document.createElement('div');
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      return div;
    case 'page':
      div = document.createElement('div');
      div.classList.add('pregunta');
      tmpStack.push({respuestas:[]});
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      dataPregunta = tmpStack.pop();
      if (dataPregunta.tipo == '20') { // Es sólo un texto de introducción

      } else if (dataPregunta.tipo == '2' || dataPregunta.tipo == '3') { // Opción múltiple
        // i = idUnico();
        // for (let r of dataPregunta.respuestas) {
        //   let j = idUnico();
        //   let b = document.createElement('button');
        //   b.innerHTML = r.respuesta;
        //   b.setAttribute('onclick', `mostrarDevolucion(${i}, ${j})`);
        //   div.appendChild(b);
        //   let d = document.createElement('p');
        //   d.setAttribute('id', `elemento_${j}`);
        //   d.innerHTML = r.devolucion;
        //   d.style.display = 'none';
        //   div.appendChild(d);
        // }
        // let devolucion = document.createElement('div');
        // devolucion.setAttribute('id', `elemento_${i}`);
        // devolucion.classList.add('campo_devolucion');
        // div.appendChild(devolucion);
      } else {
        debugger;
      }
      return div;
    case 'qtype':
      div = document.createElement('div');
      div.style.display = 'none';
      tmpStack.last().tipo = xml.innerHTML;
      return div;
    case 'title':
      div = document.createElement('h4');
      div.innerHTML = limpiar(xml.innerHTML);
      return div;
    case 'contents':
      div = document.createElement('div');
      div.innerHTML = limpiar(xml.innerHTML);
      return div;
    case 'answers':
      div = document.createElement('div');
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      return div;
    case 'answer':
      div = document.createElement('div');
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      return div;
    case 'answer_text':
      div = document.createElement('div');
      div.classList.add('respuesta');
      texto = limpiar(xml.innerHTML);
      div.innerHTML = `<b>Respuesta</b>: ${texto}`;
      div.style.display = 'none';
      tmpStack.last().respuestas.push({'respuesta':texto});
      return div;
    case 'response':
      div = document.createElement('div');
      div.classList.add('devolucion');
      texto = limpiar(xml.innerHTML);
      div.innerHTML = `<b>Devolución</b>: ${texto}`;
      div.style.display = 'none';
      tmpStack.last().respuestas.last().devolucion = texto;
      return div;
  }
  div = document.createElement('div');
  div.innerHTML = `Nodo desconocido: ${xml.nodeName}`;
  div.style.display = 'none';
  return div;
};

function limpiar(s) {
  return s.replaceAll('&lt;','<').replaceAll('&gt;','>');
};

function mostrarDevolucion(i_salida, i_texto) {
  document.getElementById(`elemento_${i_salida}`).innerHTML =
    document.getElementById(`elemento_${i_texto}`).innerHTML;
};

Array.prototype.last = function() {
  return this.length > 0 ? this[this.length-1] : null;
};

Array.prototype.remove = function(e) {
  while (this.includes(e)) {
    this.splice(this.indexOf(e), 1);
  }
};

Array.prototype.pushSiNoEsta = function(e) {
  if (!this.includes(e)) {
    this.push(e);
  }
};

const parametroURL = function(clave) {
  let url = location.href;
  clave = clave.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
  var regexS = "[\\?&]"+clave+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null :
    results[1].replaceAll("%20", ' ')
      .replaceAll("%C3%A1", 'á')
      .replaceAll("%C3%A9", 'é')
      .replaceAll("%C3%AD", 'í')
      .replaceAll("%C3%B3", 'ó')
      .replaceAll("%C3%BA", 'ú')
      .replaceAll("%C3%81", 'Á')
      .replaceAll("%C3%89", 'É')
      .replaceAll("%C3%8D", 'Í')
      .replaceAll("%C3%93", 'Ó')
      .replaceAll("%C3%9A", 'Ú')
      .replaceAll("%C3%91", 'Ñ')
      .replaceAll("%C3%B1", 'ñ');
};

const actualizarURL = function(clave) {
  let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?s=${clave}`;
  if (history.pushState) {
    window.history.pushState({path:newurl},'',newurl);
  } else {
    window.history.replaceState({path:newurl},'',newurl);
  }
};