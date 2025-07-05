Mila.Modulo({
  usa:["$milascript/base","$milascript/archivo",
    "$milascript/pantalla/todo","$milascript/geometria",
    "datos"]
});

const tamañoInicial = 18;
const decrementoTamañoNivel = 2;
const paddingInicial = 0;
const incrementoPaddingNivel = 3;
let catalogoYaCargado = false;
let bloquesYaCargados = false;

const data = {
  carrito:[]
};

const urlRepoEjerciciosRaw = "https://raw.githubusercontent.com/REDA-ar/ejercicios/refs/heads/main";
const urlWebEjercicios = "https://reda-ar.github.io/ejercicios";

Mila.alIniciar(
  function() {
    let l = document.createElement("link");
    l.setAttribute("href","https://fonts.googleapis.com/css?family=Nunito");
    l.setAttribute("rel","stylesheet");
    document.head.appendChild(l);
    const menuSuperior = Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos:[
      Mila.Pantalla.nuevaImagen({
        ruta:"https://reda.exactas.uba.ar/wp-content/uploads/2025/03/LOGO_Reda_Web-4.png",
        funcion:volverAlInicio, alto:60, margenExterno:15
      }),
      Mila.Pantalla.nuevoBoton({
        texto:"Carrito", margenExterno:25, colorFondo:"#7bdcb5", margenInterno:10, funcion:verCarrito
      }),
      Mila.Pantalla.nuevoPanel({
        alto:"Minimizar", margenExterno:15,
        elementos:[
          Mila.Pantalla.nuevoBoton({
            texto:"Proyectos", margenExterno:10, colorFondo:"#7bdcb5", margenInterno:10, funcion:verProyectos
          }),
          Mila.Pantalla.nuevoBoton({
            texto:"Equipo", margenExterno:10, colorFondo:"#7bdcb5", margenInterno:10
          }),
          Mila.Pantalla.nuevoBoton({
            texto:"Catálogo", margenExterno:10, colorFondo:"#7bdcb5", margenInterno:10, funcion:verCatalogo
          }),
          Mila.Pantalla.nuevoBoton({
            texto:"Apoyos", margenExterno:10, colorFondo:"#7bdcb5", margenInterno:10
          }),
          Mila.Pantalla.nuevoBoton({
            texto:"Contacto", margenExterno:10, colorFondo:"#7bdcb5", margenInterno:10
          })
        ], disposicion:Mila.Pantalla.DisposicionHorizontal
      })
    ], disposicion:Mila.Pantalla.DisposicionHorizontalAlternada});
    const menuInferior = Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"2025",colorTexto:"#fff"})
    ], disposicion:Mila.Pantalla.DisposicionHorizontalInvertida, colorFondo:"#373737"});

    // Pantalla inicio
    const presentacion = Mila.Pantalla.nuevoPanel({margenExterno:20, elementos: [
      Mila.Pantalla.nuevaEtiqueta({texto:"Bienvenidos a ReDa", colorTexto:"#fff", ancho:"Maximizar",
        tamanioLetra:26, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:"Recursos Educativos Digitales Abiertos", colorTexto:"#7bdcb5", ancho:"Maximizar",
        tamanioLetra:22, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:presentacionReda[0], colorTexto:"#fff", ancho:"Maximizar",
        tamanioLetra:18, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:presentacionReda[1], colorTexto:"#7bdcb5", ancho:"Maximizar",
        tamanioLetra:18, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      })
    ]});
    const panelInicio = Mila.Pantalla.nuevoPanel({elementos: [
      Mila.Pantalla.nuevaImagen({ruta:"https://reda.exactas.uba.ar/wp-content/uploads/2025/03/foto06-edited.jpg",
        alto:"Maximizar", ancho:"Maximizar", cssAdicional:{"aspect-ratio":1,"overflow":"clip","object-fit":"cover"}}),
      presentacion
    ], disposicion:Mila.Pantalla.DisposicionHorizontal});
    Mila.Pantalla.nueva({elementos:[menuSuperior,menuInferior,panelInicio],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada,
      colorFondo:"#000"
    }, 'inicio');

    // Pantalla proyectos
    const botonesProyectos = Mila.Pantalla.nuevoPanel({
      alto:"Minimizar", margenExterno:15,
      elementos:[
        Mila.Pantalla.nuevoPanel({cssAdicional:{"border-radius":"10px"}, alto:"Minimizar", elementos:[
          Mila.Pantalla.nuevaEtiqueta({texto:"Ejercitación",colorTexto:"#7bdcb5", ancho:"Maximizar", "text-wrap-mode":"wrap", margenExterno:10}),
          Mila.Pantalla.nuevaEtiqueta({texto:"Galería de ejercicios",colorTexto:"#fff", ancho:"Maximizar", "text-wrap-mode":"wrap", margenExterno:Mila.Geometria.rectanguloEn__De_x_(10,0,10,10)})
        ], margenExterno:10, colorFondo:"#373737", funcion: verCatalogo}),
        Mila.Pantalla.nuevoPanel({cssAdicional:{"border-radius":"10px"}, alto:"Minimizar", elementos:[
          Mila.Pantalla.nuevaEtiqueta({texto:"Visualización",colorTexto:"#7bdcb5", ancho:"Maximizar", "text-wrap-mode":"wrap", margenExterno:10}),
          Mila.Pantalla.nuevaEtiqueta({texto:"Y Datos Personalizados",colorTexto:"#fff", ancho:"Maximizar", "text-wrap-mode":"wrap", margenExterno:Mila.Geometria.rectanguloEn__De_x_(10,0,10,10)})
        ], margenExterno:10, colorFondo:"#373737", destino: "https://reda-ar.github.io/shinys/"}),
        Mila.Pantalla.nuevoPanel({cssAdicional:{"border-radius":"10px"}, alto:"Minimizar", elementos:[
          Mila.Pantalla.nuevaEtiqueta({texto:"Bloques",colorTexto:"#7bdcb5", ancho:"Maximizar", "text-wrap-mode":"wrap", margenExterno:10}),
          Mila.Pantalla.nuevaEtiqueta({texto:"Programar por bloques",colorTexto:"#fff", ancho:"Maximizar", "text-wrap-mode":"wrap", margenExterno:Mila.Geometria.rectanguloEn__De_x_(10,0,10,10)})
        ], margenExterno:10, colorFondo:"#373737", funcion: verBloques})
      ], disposicion:Mila.Pantalla.DisposicionHorizontal
    });
    const proyectos = Mila.Pantalla.nuevoPanel({margenExterno:Mila.Geometria.rectanguloEn__De_x_(20,0,20,0), elementos: [
      Mila.Pantalla.nuevaEtiqueta({texto:"PROYECTOS EN CURSO", colorTexto:"#7bdcb5", ancho:"Maximizar",
        tamanioLetra:20, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:"Innovación y Pasión", colorTexto:"#fff", ancho:"Maximizar",
        tamanioLetra:26, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:presentacionReda[2], colorTexto:"#7bdcb5", ancho:"Maximizar",
        tamanioLetra:16, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      }),
      botonesProyectos,
      Mila.Pantalla.nuevaEtiqueta({texto:presentacionReda[3], colorTexto:"#fff", ancho:"Maximizar",
        tamanioLetra:12, cssAdicional: {"font-family":"Nunito", "text-wrap-mode":"wrap"}
      })
    ]});
    const panelProyectos = Mila.Pantalla.nuevoPanel({elementos: [
      proyectos,
      Mila.Pantalla.nuevaImagen({ruta:"https://reda.exactas.uba.ar/wp-content/uploads/2025/03/foto02-edited.jpg",
        alto:"Maximizar", ancho:"Maximizar", cssAdicional:{"aspect-ratio":1,"overflow":"clip","object-fit":"cover","border-radius":"100%"},margenExterno:50})
    ], disposicion:Mila.Pantalla.DisposicionHorizontal});
    Mila.Pantalla.nueva({elementos:[menuSuperior,menuInferior,panelProyectos],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada,
      colorFondo:"#000"
    }, 'proyectos');

    // Pantalla bloques
    data.panelBloques = Mila.Pantalla.nuevoPanel();
    Mila.Pantalla.nueva({elementos:[/*menuSuperior,menuInferior,*/data.panelBloques],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada,
      colorFondo:"#000"
    }, 'bloques');

    // Pantalla catálogo
    const menuBuscador = Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"Buscar: ", margenExterno:Mila.Geometria.rectanguloEn__De_x_(10,5,5,5)}),
      Mila.Pantalla.nuevoCampoTexto({margenExterno:3,colorBorde:"#000",grosorBorde:1,margenInterno:2}),
      Mila.Pantalla.nuevaEtiqueta({texto:"Filtros: ...",margenExterno:Mila.Geometria.rectanguloEn__De_x_(30,5,0,5)})
    ], disposicion:Mila.Pantalla.DisposicionHorizontal, colorFondo:"#fff"});
    data.panelDatos = Mila.Pantalla.nuevoPanel({cssAdicional:{border:'solid 1px black'}, colorFondo:"#fff"});
    const escritorio = Mila.Pantalla.nuevoPanel({elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"Catálogo de ejercicios",ancho:"Maximizar",
        margenExterno:10,tamanioLetra:20,colorTexto:"#7bdcb5"
      }),
      menuBuscador,
      data.panelDatos
    ]});
    Mila.Pantalla.nueva({elementos:[menuSuperior,menuInferior,escritorio],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada,
      colorFondo:"#000"
    }, 'catálogo');

    // Pantalla carrito
    const menuSuperiorCarrito = Mila.Pantalla.nuevoPanel({alto:"Minimizar",
      elementos:[
        Mila.Pantalla.nuevoBoton({
          texto:"Seguir comprando", funcion:verCatalogo, margenExterno:8
        }),
        Mila.Pantalla.nuevoBoton({
          texto:"Completar pedido", funcion:completarPedido, margenExterno:8
        })
      ], disposicion:Mila.Pantalla.DisposicionHorizontalAlternada, colorFondo:"#fff"
    });
    data.panelCarrito = Mila.Pantalla.nuevoPanel({cssAdicional:{border:'solid 1px black'}, colorFondo:"#fff"});
    Mila.Pantalla.nueva({elementos:[
      menuSuperior,
      menuInferior,
      Mila.Pantalla.nuevoPanel({elementos:[
        Mila.Pantalla.nuevaEtiqueta({texto:"Carrito",ancho:"Maximizar",
          margenExterno:10,tamanioLetra:20,colorTexto:"#7bdcb5"
        }),
        menuSuperiorCarrito,
        data.panelCarrito]
      })],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada,
      colorFondo:"#000"
    }, 'carrito');
    CargarDatosEn_(data);
    ValidarArgumentosURL();
  }
);

function volverAlInicio() {
  MostrarSeccion('inicio');
};

function MostrarBloques() {
  const elementos = [];
  for (let actividad of data.EJERCICIOS_BLOQUES) {
    AgregarActividadBloques(actividad, elementos);
  }
  data.panelBloques.CambiarElementosA_([
    Mila.Pantalla.nuevaEtiqueta({texto:"Actividades de programación por bloques",ancho:"Maximizar",
      margenExterno:10,tamanioLetra:20,colorTexto:"#7bdcb5"}),
    Mila.Pantalla.nuevoPanel({elementos})
  ]);
  const nodoAnterior = data.panelBloques._nodoHtml.parentNode;
  data.panelBloques.QuitarDelHtml();
  data.panelBloques.PlasmarEnHtml(nodoAnterior);
  Mila.Pantalla._Redimensionar();
};

function AgregarActividadBloques(actividad, elementos) {
  const vistaPrevia = Mila.Pantalla.nuevaWebIncrustada({
    url:actividad.url,
    cssAdicional:{border:'solid 1px black'},
    visible:false,
    alto:500
  });
  const botonVistaPrevia = Mila.Pantalla.nuevoBoton({
    texto:"Vista previa", funcion:function() {
      alternarVisibilidad(vistaPrevia);
    }, margenExterno:10
  });
  elementos.push(Mila.Pantalla.nuevoPanel({alto:"Minimizar",colorFondo:"#fff",elementos:[
    Mila.Pantalla.nuevaEtiqueta({texto:actividad.nombre, margenExterno:5, tamanioLetra:16}),
    Mila.Pantalla.nuevoPanel({margenExterno:10,elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:actividad.desc, cssAdicional:{"text-wrap-mode":"wrap","text-align":"left"}}),
      Mila.Pantalla.nuevoPanel({disposicion:Mila.Pantalla.DisposicionHorizontal,elementos:[
        Mila.Pantalla.nuevoBoton({texto:"Abrir",destino:actividad.url,margenExterno:10}),
        botonVistaPrevia
      ],alto:"Minimizar"}),
      vistaPrevia
    ],colorFondo:"#fff",alto:"Minimizar"})
  ]}));
};

function MostrarCatalogo(info={}) {
  const filtros = 'filtros' in info ? info.filtros : [];
  const orden = 'orden' in info ? info.orden : (x)=>x;
  const elementos = [];
  for (let tema of data.EJERCICIOS_MOODLE) {
    AgregarSeccion(tema, elementos);
  }
  data.panelDatos.CambiarElementosA_(elementos);
  const nodoAnterior = data.panelDatos._nodoHtml.parentNode;
  data.panelDatos.QuitarDelHtml();
  data.panelDatos.PlasmarEnHtml(nodoAnterior);
  Mila.Pantalla._Redimensionar();
};

function AgregarSeccion(tema, elementos, idRecurso=[], padding=paddingInicial, tamaño=tamañoInicial, rutaDescarga="/") {
  const subElementos = [];
  tamaño -= decrementoTamañoNivel;
  padding += incrementoPaddingNivel;
  const encabezado = Mila.Pantalla.nuevoPanel({
    alto:"Minimizar", disposicion:Mila.Pantalla.DisposicionHorizontal
  });
  const nuevosElementos = [encabezado];
  const nuevaRuta = rutaDescarga + ('ruta' in tema ? tema.ruta + "/" : "");
  if ('nombre' in tema) {
    idRecurso.push(tema.nombre);
    encabezado.AgregarElemento_(Mila.Pantalla.nuevaEtiqueta({
      texto:tema.nombre,
      tamanioLetra:tamaño,
      margenExterno:Mila.Geometria.rectanguloEn__De_x_(padding,1,10,1)
    }));
  }
  if ('contenido' in tema) {
    for (let subTema of tema.contenido) {
      AgregarSeccion(subTema, subElementos, idRecurso, padding, tamaño, nuevaRuta);
    }
  }
  if ('recurso' in tema) {
    nuevosElementos.push(panelRecurso(tema.recurso, idRecurso.copia(), nuevaRuta));
  }
  if (!subElementos.esVacia()) {
    const subSeccion = Mila.Pantalla.nuevoPanel({elementos:subElementos,
      alto:"Minimizar", visible:false
    });
    encabezado.AgregarElemento_(Mila.Pantalla.nuevoBoton({
      texto:"+", funcion:function() {
        alternarVisibilidad(subSeccion);
      }
    }));
    nuevosElementos.push(subSeccion);
  }
  elementos.push(
    Mila.Pantalla.nuevoPanel({elementos:nuevosElementos,
      alto:"Minimizar"
    })
  );
  idRecurso.SacarUltimo();
};

function panelRecurso(tema, idRecurso, rutaDescarga) {
  const margen = Mila.Geometria.rectanguloEn__De_x_(15,0,0,0);
  const botones = [];
  const elementos = [Mila.Pantalla.nuevoPanel({elementos:botones,
    alto:"Minimizar",
    disposicion:Mila.Pantalla.DisposicionHorizontal
  })];
  let descarga = Mila.Nada;
  if ('html' in tema) {
    let urlHtml = urlWebEjercicios + rutaDescarga + tema.html + ".html";
    const vistaPrevia = Mila.Pantalla.nuevaWebIncrustada({
      url: urlHtml,
      cssAdicional:{border:'solid 1px black'},
      visible:false,
      alto:500
    });
    botones.push(Mila.Pantalla.nuevoBoton({
      texto:"Vista previa", funcion:function() {
        alternarVisibilidad(vistaPrevia);
      }, margenExterno:margen
    }));
    elementos.push(vistaPrevia);
    botones.push(Mila.Pantalla.nuevoBoton({
      texto:"Abrir", margenExterno:margen,
      destino:urlHtml
    }));
    descarga = urlRepoEjerciciosRaw + rutaDescarga + tema.html + ".html";
  } else if ('xml' in tema) {
    descarga = urlRepoEjerciciosRaw + rutaDescarga + "xml/" + tema.xml + ".xml";
  }
  if (descarga.esAlgo()) {
    botones.push(Mila.Pantalla.nuevoBoton({
      texto:"Descargar", funcion:function() {
        open(descarga); // TODO: que efectivamente lo descargue
      }, margenExterno:margen
    }));
  }
  botones.push(/*
    estaEnElCarrito(idRecurso)
      ? Mila.Pantalla.nuevaEtiqueta({texto:"En el carrito"})
      : */ Mila.Pantalla.nuevoBoton({
          texto:"Agregar al carrito", funcion:function() {
            agregarAlCarrito(idRecurso);
            // this.ConvertirAEtiqueta({texto:"En el carrito", cssAdicional:{'padding-left':'10pt'}});
          }, margenExterno:margen
        })
    );
  return Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos});
};

function alternarVisibilidad(elemento) {
  if (elemento.visible()) {
    elemento.Ocultar();
  } else {
    elemento.Mostrar();
  }
  Mila.Pantalla._Redimensionar();
};

function verCarrito() {
  const elementos = [];
  for (let recurso of data.carrito) {
    elementos.push(panelElemento(recurso));
  }
  const nodoAnterior = '_nodoHtml' in data.panelCarrito
    ? data.panelCarrito._nodoHtml.parentNode
    : Mila.Nada
  ;
  data.panelCarrito.CambiarElementosA_(elementos);
  MostrarSeccion('carrito');
  if (nodoAnterior.esAlgo()) {
    data.panelCarrito.QuitarDelHtml();
    data.panelCarrito.PlasmarEnHtml(nodoAnterior);
    Mila.Pantalla._Redimensionar();
  }
};

function verProyectos() {
  MostrarSeccion('proyectos');
};

function verBloques() {
  MostrarSeccion('bloques');
};

function verCatalogo() {
  MostrarSeccion('catálogo');
};

function estaEnElCarrito(idRecurso) {
  return data.carrito.contieneA_(idRecurso);
};

function agregarAlCarrito(idRecurso) {
  data.carrito.push(idRecurso);
};

function panelElemento(idRecurso) {
  const texto = idRecurso[0] + (idRecurso.length == 1
    ? "" : ` (${idRecurso.sinElPrimero().join(", ")})`
  );
  return Mila.Pantalla.nuevoPanel({
    elementos:[
      Mila.Pantalla.nuevoBoton({texto:"Quitar", funcion:function() {
        quitarDelCarrito(idRecurso)
      }}),
      Mila.Pantalla.nuevaEtiqueta({texto, alto:20, cssAdicional:{padding:'10pt'}})
    ],
    alto:"Minimizar"
  });
};

function completarPedido() {
  Mila.Pantalla.Aviso("Próximamente");
};

function quitarDelCarrito(idRecurso) {
  data.carrito.SacarPrimeraAparicionDe_(idRecurso);
  verCarrito();
};

const presentacionReda = [
  "En ReDa buscamos transformar y potenciar la experiencia de aprendizaje a través de herramientas digitales innovadoras. Trabajamos para desarrollar aplicaciones y recursos digitales gratuitos que permitan acompañar el aprendizaje de los estudiantes, tanto en entornos presenciales como virtuales. Explorá nuestras propuestas y descubrí cómo estas herramientas pueden hacer la diferencia en el camino del aprendizaje.",
  "Sumate a esta gran comunidad, generando recursos gratuitos y compartiendo experiencias.",
  "Nuestras principales líneas de trabajo son:<br/>El desarrollo de aplicaciones interactivas para facilitar la comprensión de conceptos complejos. La visualización interactiva y el trabajo con datos personalizados. La ejercitación con retroalimentación, para acceder a una posible resolución correcta de los ejercicios y la evaluación automática. La capacitación y  el acompañamiento docente en el uso de tecnologías educativas innovadoras. La generación y difusión de recursos educativos abiertos accesibles para la comunidad educativa, promoviendo una educación inclusiva, gratuita y de calidad.",
  "Si sos amigo del git, podés acceder a nuestro material \"crudo\" en <a style='color:#7bdcb5' href='https://github.com/orgs/REDA-ar/repositories' target='blank'>nuestro repositorio</a>."
];

function MostrarSeccion(idSeccion) {
  if (idSeccion == "Herramientas_Blockly") {
    MostrarSeccion('bloques'); return;
  }
  Mila.Pantalla.CambiarA_(idSeccion);
  ActualizarURL(idSeccion);
  if (idSeccion == "catálogo") {
    if (!catalogoYaCargado) {
      MostrarCatalogo();
      catalogoYaCargado = true;
    }
  } else if (idSeccion == "bloques") {
    if (!bloquesYaCargados) {
      MostrarBloques();
      bloquesYaCargadoscatalogoYaCargado = true;
    }
  }
};

function ValidarArgumentosURL() {
  let url = location.href;
  let clave = "s".replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
  let regexS = "[\\?&]"+clave+"=([^&#]*)";
  let regex = new RegExp( regexS );
  let results = regex.exec( url );
  if (Mila.Tipo.esNada(results)) {
    return;
  }
  results = results[1]
    .replaceAll("%20", ' ')
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
  MostrarSeccion(results);
};

function ActualizarURL(clave) {
  let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?s=${clave}`;
  if (history.replaceState) {
    window.history.replaceState({path:newurl},'',newurl);
  } else if (history.pushState) {
    window.history.pushState({path:newurl},'',newurl);
  } else {
    window.location.href = newurl;
  }
};