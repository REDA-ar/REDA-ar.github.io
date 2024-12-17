window.addEventListener('load', inicializar);

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
    {text:"Cursos", sub:[{text:"Exactas Programa 2025"}]},
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
    e.appendChild(armarBotonFrame(f, data.url));
    let b = document.createElement('button');
    b.innerHTML = 'abrir';
    b.addEventListener('click', function(e) {open(data.url);})
    e.appendChild(b);
    f.style.display = 'none';
    e.appendChild(f);
  }
  return e;
};

function armarBotonFrame(f, url) {
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
  return results == null ? null : results[1];
};

const actualizarURL = function(clave) {
  let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?s=${clave}`;
  if (history.pushState) {
    window.history.pushState({path:newurl},'',newurl);
  } else {
    window.history.replaceState({path:newurl},'',newurl);
  }
};