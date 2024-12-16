window.addEventListener('load', inicializar);

function inicializar() {
  const body = document.body;

  const main = document.createElement('div');
  main.setAttribute("id", "main");
  main.classList.add("main");
  body.appendChild(main);

  const topMenu = document.createElement('div');
  topMenu.setAttribute("id", "topMenu");
  topMenu.classList.add("topMenu");
  main.appendChild(topMenu);

  const mainTopMenuButton = document.createElement('a');
  mainTopMenuButton.setAttribute("id", "mainTopMenuButton");
  mainTopMenuButton.classList.add("topMenuButton");
  mainTopMenuButton.classList.add("clickeable");
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
};

function addButtons(container, buttons, dir="H") {
  for (let tmb of buttons) {
    let button = document.createElement('a');
    button.setAttribute("id", `topMenuButton_${tmb.text}`);
    button.classList.add("topMenuButton");
    button.classList.add("textTopMenuButton");
    button.classList.add("clickeable");
    button.innerHTML = tmb.text;
    button.parentContainer = container;
    container.appendChild(button);
    if ('sub' in tmb) {
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
    if (!(cursor.stack.includes(menu) || cursor.stack.includes(b))) {
      menu.style.display = 'none';
      for (let c of parents) {
        c.style.display = 'none';
      }
      cursor.pendientes = newPendientes;
    }
  }, 500);
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