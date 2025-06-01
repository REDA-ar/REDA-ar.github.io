window.addEventListener('load', inicializar);

const urlMoodle = "https://reda-ar.github.io/campus/";
const urlServidor = "https://epli.exp.dc.uba.ar";

const datos = {
  exec:[]
};

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
    b.addEventListener('click', function(e) {open(data.url);});
    e.appendChild(b);
    f.style.display = 'none';
    e.appendChild(f);
  } else if ('cuestionario' in data) {
    let f = document.createElement('div');
    f.classList.add('xmlView');
    e.appendChild(armarBotonFrameCuestionario(f, data.cuestionario));
    let br = document.createElement('button');
    br.innerHTML = 'responder este cuestionario';
    br.addEventListener('click', function(e) {open(`${urlMoodle}?curso=${data.cuestionario.curso}&ej=${data.cuestionario.ej}`);});
    e.appendChild(br);
    f.style.display = 'none';
    e.appendChild(f);
  } else if ('xml' in data) {
    let f = document.createElement('div');
    f.classList.add('xmlView');
    e.appendChild(armarBotonFrameXml(f, data.xml));
    let bd = document.createElement('button');
    bd.innerHTML = 'descargar';
    bd.addEventListener('click', function(e) {open(data.xml);})
    e.appendChild(bd);
    // let br = document.createElement('button');
    // br.innerHTML = 'responder este cuestionario';
    // br.addEventListener('click', function(e) { ? });
    // e.appendChild(br);
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

function armarBotonFrameCuestionario(f, cuestionario) {
  let b = document.createElement('button');
  b.innerHTML = 'vista previa';
  b.addEventListener('click', function(e) {
    if (f.style.display === 'none') {
      if (!f.hasChildNodes()) {
        cargarCuestionario(f, cuestionario);
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

function cargarCuestionario(e, cuestionario) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      e.appendChild(mostrarCuestionario(this.responseText));
    }
  };
  xhttp.open("GET", `${urlServidor}/cuestionario/${cuestionario.curso}/${cuestionario.ej}`, true);
  xhttp.send();
};

function mostrarCuestionario(texto) {
  let respuesta = JSON.parse(texto);
  if ("resultado" in respuesta) {
    if (respuesta.resultado == "OK" && "cuestionario" in respuesta) {
      let cuestionario = respuesta.cuestionario;
      let div = document.createElement('div');
      if ("nombre" in cuestionario) {
        div.appendChild(dom("h3", cuestionario.nombre));
      }
      if ("preguntas" in cuestionario) {
        div.appendChild(divPreguntas(cuestionario.preguntas));
      }
      return div;
    }
    return divFalla(respuesta);
  }
  return divFalla(respuesta);
};

function divPreguntas(preguntas) {
  let div = document.createElement('div');
  for (let pregunta of preguntas) {
    div.appendChild(divPregunta(pregunta));
  }
  return div;
};

function divPregunta(pregunta) {
  let div = document.createElement('div');
  div.classList.add('pregunta');
  if ("titulo" in pregunta) {
    div.appendChild(dom("h4", pregunta.titulo));
  }
  if ("pregunta" in pregunta) {
    div.appendChild(dom("div", pregunta.pregunta));
  }
  return div;
};

function dom(clase, contenido) {
  let elemento = document.createElement(clase);
  elemento.innerHTML = contenido;
  return elemento;
};

function divFalla(respuesta) {
  console.error(respuesta);
  return dom("div", "Error")
};

function cargarXML(e, ruta) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      e.appendChild(mostrarXML(this.responseXML));
      for (let f of datos.exec) {
        f();
      }
      datos.exec = [];
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
    case 'quiz':
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
        if (dataPregunta.respuestas.length > 0) { 
          i = idUnico();
          for (let r of dataPregunta.respuestas) {
            let j = idUnico();
            let b = document.createElement('button');
            b.innerHTML = r.respuesta;
            b.setAttribute('onclick', `mostrarDevolucion(${i}, ${j})`);
            div.appendChild(b);
            let d = document.createElement('p');
            d.setAttribute('id', `elemento_${j}`);
            d.innerHTML = r.devolucion;
            d.style.display = 'none';
            div.appendChild(d);
          }
          let devolucion = document.createElement('div');
          devolucion.setAttribute('id', `elemento_${i}`);
          devolucion.classList.add('campo_devolucion');
          div.appendChild(devolucion);
        }
      } else {
        debugger;
      }
      return div;
    case 'question':
      div = document.createElement('div');
      div.classList.add('pregunta');
      tmpStack.push({respuestas:[]});
      for (let c of xml.children) {
        div.appendChild(mostrarXML(c));
      }
      dataPregunta = tmpStack.pop();
      const tipo = xml.getAttribute('type');
      if (tipo == 'category') {
        // ?
        return document.createElement('div');
      } else if (tipo == 'cloze') {
        let dataCloze = divCloze(dataPregunta.contenido);
        div.appendChild(dataCloze.div);
        div.appendChild(botonCloze(dataCloze));
        let devolucion = document.createElement('div');
        devolucion.setAttribute('id', `elemento_${dataCloze.id}`);
        devolucion.classList.add('campo_devolucion');
        div.appendChild(devolucion);
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
    case 'questiontext':
      div = document.createElement('div');
      div.style.display = 'none';
      tmpStack.last().contenido = {formato:xml.getAttribute('format'), contenido:xml.innerHTML};
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

function divCloze(data) {
  const div = document.createElement('div');
  const campos = [];
  if (data.formato == "html") {
    let contenido = limpiar(data.contenido);
    let iAbreLlave = contenido.indexOf("{");
    while(iAbreLlave > 0) {
      let iCierraLlave = indexNoEscapeado(contenido, "}", iAbreLlave);
      let dataCampoCloze = campoCloze(contenido.substring(iAbreLlave+1,iCierraLlave));
      contenido = contenido.substring(0,iAbreLlave) +
        dataCampoCloze.xml +
        contenido.substring(iCierraLlave+1)
      ;
      if ('info' in dataCampoCloze) {
        campos.push(dataCampoCloze.info);
      }
      iAbreLlave = contenido.indexOf("{", iAbreLlave + dataCampoCloze.xml.length + 1);
    }
    div.innerHTML = contenido;
  } else {
    debugger;
  }
  return {div, campos, id:idUnico()};
};

const tiposCloze = {
  "SHORTANSWER":"SA","SA":"SA","MW":"SA",
  "SHORTANSWER_C":"SAC","SAC":"SAC","MWC":"SAC",
  "NUMERICAL":"NM","NM":"NM",
  "MULTICHOICE":"MC","MC":"MC",
  "MULTICHOICE_V":"MCV","MCV":"MCV",
  "MULTICHOICE_H":"MCH","MCH":"MCH",
  "MULTIRESPONSE":"MR","MR":"MR",
  "MULTIRESPONSE_H":"MR_H","MR_H":"MR_H"
};

function campoCloze(data) {
  let xml = "";
  const info = {};
  let iDosPuntos1 = data.indexOf(":");
  if (iDosPuntos1 > 0) {
    let iDosPuntos2 = data.indexOf(":", iDosPuntos1 + 1);
    let tipo = data.substring(iDosPuntos1 + 1, iDosPuntos2);
    if (tipo in tiposCloze) {
      tipo = tiposCloze[tipo];
    } else { // Falsa alarma
      return{xml: `{${data}}`};
    }
    info.tipo = tipo;
    if (iDosPuntos1 > 0) {
      info.n = Number.parseInt(data.substring(0,iDosPuntos1));
    }
    let j = iDosPuntos2+1
    info.respuestas = [];
    while (j < data.length) {
      let delimitador = data.charAt(j);
      let fin = proximoDelimitador(data, ["=","~","#"], j+1);
      if (["=","~","%"].includes(delimitador)) {
        j++;
        if (delimitador == "~" && data.charAt(j) == "=") {
          j++;
          delimitador = "=";
          fin = proximoDelimitador(data, ["=","~","#"], j);
        }
        let puntaje = delimitador == "=" ? 100 : 0;
        if (["=","~"].includes(delimitador) && data.charAt(j) == "%") {
          j++;
          delimitador = "%";
        }
        if (delimitador == "%") {
          let finPorcentaje = data.indexOf("%",j);
          puntaje = Number.parseFloat(data.substring(j,finPorcentaje));
          j = finPorcentaje+1;
        }
        let contenido = data.substring(j,fin);
        info.respuestas.push({contenido, puntaje});
      } else if (delimitador == "#") {
        let contenido = data.substring(j+1,fin);
        info.respuestas.last().feedback = contenido;
      } else { // Es la respuesta sin delimitador y por lo tanto, sin puntaje asignado
        let contenido = data.substring(j,fin);
        info.respuestas.push({contenido, puntaje:0});
      }
      j = fin;
    }
    const id = `cloze_${idUnico()}`;
    info.id = id;
    if (["SA","SAC","NM"].includes(tipo)) {
      xml = `<input type="${tipo=="NM" ? 'number" step="0.01' : "text"}" id="${id}">`;
    } else if (["MC","MCV","MCH","MR","MR_H"].includes(tipo)) {
      xml = `<select id="${id}"><option value="">&nbsp;</option>`;
      let i = 0;
      for (let respuesta of info.respuestas) {
        xml += `<option value="${i}">${respuesta.contenido}</option>`
        i++;
      }
      xml += "</select>"
    } else { // Falsa alarma
      return{xml: `{${data}}`};
    }
  } else { // Falsa alarma
    return{xml: `{${data}}`};
  }
  return {xml, info};
};

function botonCloze(data) {
  const boton = document.createElement('button');
  boton.innerHTML = "Comprobar";
  boton.addEventListener('click', function(e) {
    let contenido = [];
    for (let campo of data.campos) {
      let respuesta = document.getElementById(campo.id).value;
      let puntaje = null;
      if (["SA","SAC","NM"].includes(campo.tipo)) {
        for (let r of campo.respuestas) {
          if (respuestaCoincide(campo.tipo, respuesta, r.contenido) && (puntaje === null || campo.puntaje > puntaje)) {
            puntaje = campo.puntaje;
          }
        }
      } else {
        if (respuesta != "") {
          puntaje = campo.respuestas[respuesta].puntaje;
          respuesta = campo.respuestas[respuesta].contenido;
        }
      }
      contenido.push(`${respuesta == "" ? "-" : respuesta} :: ${puntaje === null ? 0 : puntaje}`);
    };
    document.getElementById(`elemento_${data.id}`).innerHTML = contenido.join("<br/>");
  });
  return boton;
};

function respuestaCoincide(tipo, dada, esperada) {
  if (tipo == "SA") {
    return dada.toUpperCase() == esperada.toUpperCase();
  }
  if (tipo == "SAC") {
    return dada == esperada;
  }
  if (tipo == "NM") {
    let n = esperada;
    let margen = 0;
    let iDosPuntos = n.indexOf(":");
    if (iDosPuntos > 0) {
      n = n.substring(0,iDosPuntos);
      margen = Number.parseFloat(n.substring(iDosPuntos+1));
    }
    n = Number.parseFloat(n);
    m = Number.parseFloat(dada);
    return m >= n-margen && m <= n+margen;
  }
  debugger;
};

function proximoDelimitador(texto, delimitadores, desde=0) {
  let i=desde;
  while (i<texto.length && !delimitadores.includes(texto.charAt(i))) {
    i++;
  }
  return i;
};

function indexNoEscapeado(texto, busqueda, desdeInicial=0) {
  let desde = desdeInicial;
  let i = texto.indexOf(busqueda, desde);
  while (i > 0 && texto.charAt(i-1) == "\\") {
    desde = i+1;
    i = texto.indexOf(busqueda, desde);
  }
  return i;
};

function limpiar(s) {
  let r = s;
  let iCDATA = r.indexOf("<![CDATA[");
  if (iCDATA >= 0) {
    let iEndCDATA = r.indexOf("]]>",iCDATA + "<![CDATA[".length);
    return limpiar(r.substring(0, iCDATA)) +
      parseLatex(r.substring(iCDATA + "<![CDATA[".length, iEndCDATA)) +
      limpiar(r.substring(iEndCDATA + "]]>".length))
    ;
  }
  return r.replaceAll('&lt;','<').replaceAll('&gt;','>');
};

function parseLatex(s) {
  let r = s;
  let iLatex = r.indexOf("\\[");
  if (iLatex >= 0) {
    let iEndLatex = r.indexOf("\\]", iLatex + "\\[".length);
    return r.substring(0, iLatex) +
      latex(r.substring(iLatex, iEndLatex + "\\[".length)) +
      parseLatex(r.substring(iEndLatex + "\\]".length))
    ;
  }
  return r;
}

function latex(s) {
  let id = idUnico();
  datos.exec.push(function() {
    document.getElementById(`latex_${id}`).innerHTML = s;
    MathJax.typeset();
  });
  return `<span id="latex_${id}"></span>`;
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
  if (history.replaceState) {
    window.history.replaceState({path:newurl},'',newurl);
  } else if (history.pushState) {
    window.history.pushState({path:newurl},'',newurl);
  } else {
    window.location.href = newurl;
  }
};