Mila.Modulo({
  usa:["$milascript/base","$milascript/archivo",
    "$milascript/pantalla/todo","$milascript/geometria",
    "datos"]
});

const tamañoInicial = 18;
const decrementoTamañoNivel = 2;
const paddingInicial = 0;
const incrementoPaddingNivel = 3;

const data = {
  carrito:[]
};

Mila.alIniciar(
  function() {
    const menuSuperior = Mila.Pantalla.nuevoPanel({alto:40,elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"REDA",
        margenExterno:Mila.Geometria.rectanguloEn__De_x_(10,10,0,0)
      }),
      Mila.Pantalla.nuevoBoton({texto:"Ver carrito", funcion:verCarrito,
        margenExterno:Mila.Geometria.rectanguloEn__De_x_(0,7,0,0)
      })
    ], disposicion:Mila.Pantalla.DisposicionHorizontalAlternada,
    cssAdicional:{'border':'solid 1px black'}});
    const menuBuscador = Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"Buscar: ",cssAdicional:{'padding-right':'10pt'}}),
      Mila.Pantalla.nuevoCampoTexto(),
      Mila.Pantalla.nuevaEtiqueta({texto:"Filtros: ...",cssAdicional:{'padding-left':'30pt'}})
    ], disposicion:Mila.Pantalla.DisposicionHorizontal});
    data.panelDatos = Mila.Pantalla.nuevoPanel({cssAdicional:{border:'solid 1px black'}});
    const escritorio = Mila.Pantalla.nuevoPanel({elementos:[
      menuBuscador,
      data.panelDatos
    ]});
    const menuInferior = Mila.Pantalla.nuevoPanel({alto:"Minimizar",elementos:[
      Mila.Pantalla.nuevaEtiqueta({texto:"2025"})
    ], disposicion:Mila.Pantalla.DisposicionHorizontalInvertida});
    Mila.Pantalla.nueva({elementos:[menuSuperior,menuInferior,escritorio],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada
    }, 'inicio');

    const menuSuperiorCarrito = Mila.Pantalla.nuevoPanel({alto:"Minimizar",
      elementos:[
        Mila.Pantalla.nuevoBoton({
          texto:"Atrás", funcion:volverAlInicio
        }),
        Mila.Pantalla.nuevoBoton({
          texto:"Completar pedido", funcion:completarPedido
        }),
        Mila.Pantalla.nuevaEtiqueta({texto:"Carrito",cssAdicional:{'padding-left':'10pt'}})
      ], disposicion:Mila.Pantalla.DisposicionHorizontalAlternada
    });
    data.panelCarrito = Mila.Pantalla.nuevoPanel({cssAdicional:{border:'solid 1px black'}});
    Mila.Pantalla.nueva({elementos:[menuSuperiorCarrito,menuInferior,data.panelCarrito],
      disposicion:Mila.Pantalla.DisposicionVerticalAlternada
    }, 'carrito');
    CargarDatosEn_(data);
    MostrarCatalogo();
  }
);

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
      cssAdicional:{'padding-left':`${padding}pt`,'padding-right':'10pt'}
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

function volverAlInicio() {
  Mila.Pantalla.CambiarA_('inicio');
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