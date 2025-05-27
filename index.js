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

const data = {
  carrito:[]
};

Mila.alIniciar(
  function() {
    const menuSuperior = Mila.Pantalla.nuevoPanel({alto:"Minimizar",colorBorde:"#fff",elementos:[
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
            texto:"Proyectos", margenExterno:10, colorFondo:"#7bdcb5", margenInterno:10
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
    const menuInferior = Mila.Pantalla.nuevoPanel({alto:"Minimizar",colorBorde:"#fff",elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"2025",colorTexto:"#fff"})
    ], disposicion:Mila.Pantalla.DisposicionHorizontalInvertida});

    // Pantalla inicio
    const presentacion = Mila.Pantalla.nuevoPanel({margenExterno:20, elementos: [
      Mila.Pantalla.nuevaEtiqueta({texto:"Bienvenidos a ReDa", colorTexto:"#fff", ancho:"Maximizar",
        tamanioLetra:26, cssAdicional: {"font-family":"math", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:"Recursos Educativos Digitales Abiertos", colorTexto:"#7bdcb5", ancho:"Maximizar",
        tamanioLetra:22, cssAdicional: {"font-family":"math", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:presentacionReda[0], colorTexto:"#fff", ancho:"Maximizar",
        tamanioLetra:18, cssAdicional: {"font-family":"math", "text-wrap-mode":"wrap"}
      }),
      Mila.Pantalla.nuevaEtiqueta({texto:presentacionReda[1], colorTexto:"#7bdcb5", ancho:"Maximizar",
        tamanioLetra:18, cssAdicional: {"font-family":"math", "text-wrap-mode":"wrap"}
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

    // Pantalla catálogo
    const menuBuscador = Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"Buscar: ", margenExterno:Mila.Geometria.rectanguloEn__De_x_(10,5,5,5)}),
      Mila.Pantalla.nuevoCampoTexto({margenExterno:3,colorBorde:"#000",grosorBorde:1,margenInterno:2}),
      Mila.Pantalla.nuevaEtiqueta({texto:"Filtros: ...",margenExterno:Mila.Geometria.rectanguloEn__De_x_(30,5,0,5)})
    ], disposicion:Mila.Pantalla.DisposicionHorizontal});
    data.panelDatos = Mila.Pantalla.nuevoPanel({cssAdicional:{border:'solid 1px black'}});
    const escritorio = Mila.Pantalla.nuevoPanel({elementos:[
      menuBuscador,
      data.panelDatos
    ], colorFondo:"#fff"});
    Mila.Pantalla.nueva({elementos:[menuSuperior,menuInferior,escritorio],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada,
      colorFondo:"#000"
    }, 'catálogo');

    // Pantalla carrito
    const menuSuperiorCarrito = Mila.Pantalla.nuevoPanel({alto:"Minimizar",
      elementos:[
        Mila.Pantalla.nuevaEtiqueta({texto:"Carrito", margenExterno:10}),
        Mila.Pantalla.nuevoBoton({
          texto:"Completar pedido", funcion:completarPedido, margenExterno:8
        }),
        Mila.Pantalla.nuevoBoton({
          texto:"Seguir comprando", funcion:verCatalogo, margenExterno:8
        })
      ], disposicion:Mila.Pantalla.DisposicionHorizontalAlternada, colorFondo:"#fff"
    });
    data.panelCarrito = Mila.Pantalla.nuevoPanel({cssAdicional:{border:'solid 1px black'}, colorFondo:"#fff"});
    Mila.Pantalla.nueva({elementos:[menuSuperior,menuInferior,Mila.Pantalla.nuevoPanel({elementos:[menuSuperiorCarrito,data.panelCarrito]})],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada,
      colorFondo:"#000"
    }, 'carrito');
    CargarDatosEn_(data);
  }
);

function volverAlInicio() {
  Mila.Pantalla.CambiarA_('inicio');
};

function MostrarCatalogo(info={}) {
  const filtros = 'filtros' in info ? info.filtros : [];
  const orden = 'orden' in info ? info.orden : (x)=>x;
  const elementos = [];
  for (let tema of data.DATOS) {
    AgregarSeccion(tema, elementos);
  }
  data.panelDatos.CambiarElementosA_(elementos);
  const nodoAnterior = data.panelDatos._nodoHtml.parentNode;
  data.panelDatos.QuitarDelHtml();
  data.panelDatos.PlasmarEnHtml(nodoAnterior);
  Mila.Pantalla._Redimensionar();
};

function AgregarSeccion(tema, elementos, idRecurso=[], padding=paddingInicial, tamaño=tamañoInicial) {
  const subElementos = [];
  tamaño -= decrementoTamañoNivel;
  padding += incrementoPaddingNivel;
  const encabezado = Mila.Pantalla.nuevoPanel({
    alto:"Minimizar", disposicion:Mila.Pantalla.DisposicionHorizontal
  });
  const nuevosElementos = [encabezado];
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
      AgregarSeccion(subTema, subElementos, idRecurso, padding, tamaño);
    }
  }
  if ('recurso' in tema) {
    nuevosElementos.push(panelRecurso(tema.recurso, idRecurso.copia()));
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

function panelRecurso(tema, idRecurso) {
  const vistaPrevia = Mila.Pantalla.nuevaWebIncrustada({
    url:tema.url,
    cssAdicional:{border:'solid 1px black'},
    visible:false,
    alto:500
  });
  const elementos = [];
  const margen = Mila.Geometria.rectanguloEn__De_x_(15,0,0,0);
  elementos.push(Mila.Pantalla.nuevoBoton({
    texto:"Vista previa", funcion:function() {
      alternarVisibilidad(vistaPrevia);
    }, margenExterno:margen
  }));
  elementos.push(Mila.Pantalla.nuevoBoton({
    texto:"Abrir", destino:tema.url, margenExterno:margen
  }));
  elementos.push(Mila.Pantalla.nuevoBoton({
    texto:"Descargar", funcion:function() {
      Mila.Pantalla.Aviso("Próximamente");
    }, margenExterno:margen
  }));
  elementos.push(/*
    estaEnElCarrito(idRecurso)
      ? Mila.Pantalla.nuevaEtiqueta({texto:"En el carrito"})
      : */ Mila.Pantalla.nuevoBoton({
          texto:"Agregar al carrito", funcion:function() {
            agregarAlCarrito(idRecurso);
            // this.ConvertirAEtiqueta({texto:"En el carrito", cssAdicional:{'padding-left':'10pt'}});
          }, margenExterno:margen
        })
    );
  return Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos:[Mila.Pantalla.nuevoPanel({elementos,
    alto:"Minimizar",
    disposicion:Mila.Pantalla.DisposicionHorizontal
  }), vistaPrevia]});
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
  Mila.Pantalla.CambiarA_('carrito');
  if (nodoAnterior.esAlgo()) {
    data.panelCarrito.QuitarDelHtml();
    data.panelCarrito.PlasmarEnHtml(nodoAnterior);
    Mila.Pantalla._Redimensionar();
  }
};

function verCatalogo() {
  Mila.Pantalla.CambiarA_('catálogo');
  if (!catalogoYaCargado) {
    MostrarCatalogo();
    catalogoYaCargado = true;
  }
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
  "Sumate a esta gran comunidad, generando recursos gratuitos y compartiendo experiencias."
];