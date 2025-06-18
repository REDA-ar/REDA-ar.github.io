Mila.Modulo({
  necesita:["$milascript/base"]
});

const urlBloques = "https://reda-ar.github.io/campus/milanator/";

Mila.Base.RegistrarFuncion_(function CargarDatosEn_(data) {
  // TODO: ¿Ir a buscarlos al servidor? ¿Al repo de ejercicios? ¿A otro lado?
  data.EJERCICIOS_BLOQUES = [{
    nombre: "Álbum de figuritas nivel 1",
    desc:"Tenés que armar un programa que complete el álbum de figuritas. ¿Cuántas figuritas tenés que comprar para completar el álbum?",
    url:`${urlBloques}?juego=figus0&toolbox=off`
  },{
    nombre: "Álbum de figuritas nivel 2",
    desc:"Ahora vamos a completar el álbum varias veces. ¿Podés calcular, en promedio, cuántas figuritas habría que comprar para completar un álbum de 6 figuritas?",
    url:`${urlBloques}?juego=figus`
  },{
    nombre: "Álbum de figuritas nivel 3",
    desc:"¿Qué pasa si en lugar de 6 figuritas el álbum tuviera 12? ¿Se necesitaría comprar el doble de figuritas? ¿Y si fueran 24? ¿Y si fueran 600?",
    url:`${urlBloques}?juego=figus&fix=N`
  },{
    nombre: "Álbum de figuritas nivel 4",
    desc:"Veamos ahora si podemos pensar cómo deberíamos programar la simulación usando listas y variables. Vamos a usar una lista de números para representar al álbum. Cada posición de esta lista tendrá un 1 si esa figurita la tenemos y un 0 si no (así que la lista comienza llena de ceros). ¿Cómo podemos saber cuando el álbum ya está completo?",
    url:`${urlBloques}?juego=figus2`
  }];
  data.EJERCICIOS_MOODLE = [{
    nombre:"Secundaria",
    ruta:"secundaria",
    contenido:[{
      nombre:"Estadística y probabilidad",
      ruta:"estadistica_y_probabilidad",
      recurso: {
        html:"html_n_100_semilla_280525"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"SEC_EP_ConceptosTendenciaCentral"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"SEC_EP_DecisionVarianzaRelativa"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"SEC_EP_IdentificacionGraficoBarras"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"SEC_EP_IdentificacionGraficoCircular"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"SEC_EP_MedianasDatosSinagrupar"
        }
      },{
        nombre:"Ejercicio 6",
        recurso:{
          xml:"SEC_EP_ProbabilidadCondicionalTabla"
        }
      },{
        nombre:"Ejercicio 7",
        recurso:{
          xml:"SEC_EP_ProbabilidadConjuntaConrepo"
        }
      },{
        nombre:"Ejercicio 8",
        recurso:{
          xml:"SEC_EP_ProbabilidadConjuntaSinrepo"
        }
      },{
        nombre:"Ejercicio 9",
        recurso:{
          xml:"SEC_EP_ProbabilidadConjuntaTotales"
        }
      },{
        nombre:"Ejercicio 10",
        recurso:{
          xml:"SEC_EP_ProbabilidadTotalTabla"
        }
      },{
        nombre:"Ejercicio 11",
        recurso:{
          xml:"SEC_EP_ProbabilidadesVariasEncuesta"
        }
      },{
        nombre:"Ejercicio 12",
        recurso:{
          xml:"SEC_EP_ProbabilidadesVariasRifa"
        }
      },{
        nombre:"Ejercicio 13",
        recurso:{
          xml:"SEC_EP_PromedioDatosAgrupados"
        }
      },{
        nombre:"Ejercicio 14",
        recurso:{
          xml:"SEC_EP_PromedioDatosSinagrupar"
        }
      },{
        nombre:"Ejercicio 15",
        recurso:{
          xml:"SEC_EP_PromedioSalariosAgrupados"
        }
      }]
    },{
      nombre:"Funciones y ecuaciones",
      ruta:"funciones_y_ecuaciones",
      recurso: {
        html:"html_n_100_semilla_280525"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"SEC_FE_CalculoInversionInteres"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"SEC_FE_ComparacionInversionesModelo"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"SEC_FE_EcuacionCuadraticaDossol"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"SEC_FE_EcuacionCuadraticaSinsol"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"SEC_FE_EcuacionCubicaTressol"
        }
      },{
        nombre:"Ejercicio 6",
        recurso:{
          xml:"SEC_FE_EcuacionRadicalesSolfict"
        }
      },{
        nombre:"Ejercicio 7",
        recurso:{
          xml:"SEC_FE_ElementosGraficoCubica"
        }
      },{
        nombre:"Ejercicio 8",
        recurso:{
          xml:"SEC_FE_GraficoCuadraticaDosraices"
        }
      },{
        nombre:"Ejercicio 9",
        recurso:{
          xml:"SEC_FE_GraficoCuadraticaSinraices"
        }
      },{
        nombre:"Ejercicio 10",
        recurso:{
          xml:"SEC_FE_IdentificarFormulaProporcionalidad"
        }
      },{
        nombre:"Ejercicio 11",
        recurso:{
          xml:"SEC_FE_IdentificarGraficoCuadratica"
        }
      },{
        nombre:"Ejercicio 12",
        recurso:{
          xml:"SEC_FE_IdentificarGraficoCubica"
        }
      },{
        nombre:"Ejercicio 13",
        recurso:{
          xml:"SEC_FE_IdentificarLinealCosto"
        }
      },{
        nombre:"Ejercicio 14",
        recurso:{
          xml:"SEC_FE_PorcentajeCalculoDescuento"
        }
      },{
        nombre:"Ejercicio 15",
        recurso:{
          xml:"SEC_FE_PorcentajeCalculoRecargo"
        }
      }]
    },{
      nombre:"Geometría y trigonometría",
      ruta:"geometria_y_trigonometria",
      recurso: {
        html:"html_n_100_semilla_280525"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"SEC_GT_CalculoCatetoHipotenusa"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"SEC_GT_CalculoCatetoTrigonometria"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"SEC_GT_CalculoDistanciaAngulo"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"SEC_GT_CalculoPitagorasTriangulo"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"SEC_GT_IdentificarSuficienciaCongruencia"
        }
      },{
        nombre:"Ejercicio 6",
        recurso:{
          xml:"SEC_GT_PropiedadesPoligonosLados"
        }
      },{
        nombre:"Ejercicio 7",
        recurso:{
          xml:"SEC_GT_SemejanzaAlturaSombra"
        }
      },{
        nombre:"Ejercicio 8",
        recurso:{
          xml:"SEC_GT_SemejanzaCalculoAltura"
        }
      },{
        nombre:"Ejercicio 9",
        recurso:{
          xml:"SEC_GT_SemejanzaCalculoLado"
        }
      }]
    },{
      nombre:"Números y operaciones",
      ruta:"numeros_y_operaciones",
      recurso: {
        html:"html_n_100_semilla_280525"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"SEC_NO_ConceptosNumerosOperaciones"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"SEC_NO_InterseccionIntervalosR"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"SEC_NO_OperacionesCombinadasQ"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"SEC_NO_OperacionesCombinadasZ"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"SEC_NO_OperacionesSignosZ"
        }
      },{
        nombre:"Ejercicio 6",
        recurso:{
          xml:"SEC_NO_OperacionesZTemperaturas"
        }
      },{
        nombre:"Ejercicio 7",
        recurso:{
          xml:"SEC_NO_OrdenAlturasQ"
        }
      },{
        nombre:"Ejercicio 8",
        recurso:{
          xml:"SEC_NO_OrdenNumerosQ"
        }
      },{
        nombre:"Ejercicio 9",
        recurso:{
          xml:"SEC_NO_OrdenPesosQ"
        }
      },{
        nombre:"Ejercicio 10",
        recurso:{
          xml:"SEC_NO_OrdenZFechas"
        }
      },{
        nombre:"Ejercicio 11",
        recurso:{
          xml:"SEC_NO_OrdenZTemperaturas"
        }
      },{
        nombre:"Ejercicio 12",
        recurso:{
          xml:"SEC_NO_PropiedadesOperacionesQ"
        }
      },{
        nombre:"Ejercicio 13",
        recurso:{
          xml:"SEC_NO_SimplificacionFracciones"
        }
      },{
        nombre:"Ejercicio 14",
        recurso:{
          xml:"SEC_NO_SumaRestaZ"
        }
      },{
        nombre:"Ejercicio 15",
        recurso:{
          xml:"SEC_NO_UnionIntervalosR"
        }
      }]
    }]
  },{
    nombre:"Probabilidad",
    ruta:"proba",
    contenido:[{
      nombre:"Primeros Datos",
      ruta:"primeros_datos",
      recurso: {
        html:"index"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"UPR_PD_ConceptosHistogramaMediana"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"UPR_PD_ResumenPerdidaAbsoluto"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"UPR_PD_ResumenPerdidaCuadratica"
        }
      }]
    },{
      nombre:"Teoría axiomática de la probabilidad",
      ruta:"teoria_axiomatica",
      recurso: {
        html:"index"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"UPR_TAP_AcotarProbabilidadConjunta"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"UPR_TAP_CalculoProbabilidadColor"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"UPR_TAP_CalculoProbabilidadHijos"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"UPR_TAP_CalculoProbabilidadesUrna"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"UPR_TAP_EspacioEquiprobableConceptual"
        }
      },{
        nombre:"Ejercicio 6",
        recurso:{
          xml:"UPR_TAP_FrecuenciaRelativaConceptual"
        }
      },{
        nombre:"Ejercicio 7",
        recurso:{
          xml:"UPR_TAP_ProbabilidadParadojaCumpleanios"
        }
      }]
    },{
      nombre:"Probabilidad condicional e independencia",
      ruta:"proba_condicional",
      recurso: {
        html:"index"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"UPR_PCI_ProbaCondicionalCaramelos"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"UPR_PCI_ProbaCondicionalMamografia"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"UPR_PCI_ProbaCondicionalVuelos"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"UPR_PCI_ProbasPelosOjos"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"UPR_PCI_SensibilidadEspecificidadTest"
        }
      }]
    },{
      nombre:"Variables aleatorias",
      ruta:"var_aleatorias",
      recurso: {
        html:"index"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"UPR_VAD_CalculoProbaBernoulli"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"UPR_VAD_CalculoProbaBernoullies"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"UPR_VAD_CalculoProbaMoneda"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"UPR_VAD_CalculosDistribucionAcumulada"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"UPR_VAD_CapturaRecapturaHipergeometrica"
        }
      },{
        nombre:"Ejercicio 6",
        recurso:{
          xml:"UPR_VAD_EsperanzaVarianzaAcumulada"
        }
      },{
        nombre:"Ejercicio 7",
        recurso:{
          xml:"UPR_VAD_EsperanzaVarianzaPropiedades"
        }
      },{
        nombre:"Ejercicio 8",
        recurso:{
          xml:"UPR_VAD_EsperanzaVarianzaPuntual"
        }
      },{
        nombre:"Ejercicio 9",
        recurso:{
          xml:"UPR_VAD_EsperanzaVarianzaTransformacion"
        }
      },{
        nombre:"Ejercicio 10",
        recurso:{
          xml:"UPR_VAD_EsperanzaVarianzaUrna"
        }
      },{
        nombre:"Ejercicio 11",
        recurso:{
          xml:"UPR_VAD_PoissonLarvasEstanque"
        }
      },{
        nombre:"Ejercicio 12",
        recurso:{
          xml:"UPR_VAD_PoissonParticulasAlfa"
        }
      },{
        nombre:"Ejercicio 13",
        recurso:{
          xml:"UPR_VAD_ProbasFabricaAlfajores"
        }
      }]
    },{
      nombre:"Variables aleatorias continuas",
      ruta:"var_aleatorias_continuas",
      recurso: {
        html:"index"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"UPR_VAC_BateriasSumaNormal"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"UPR_VAC_CuantilNormalArea"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"UPR_VAC_LongitudCinturonesNormal"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"UPR_VAC_QuesosSumaNormal"
        }
      },{
        nombre:"Ejercicio 5",
        recurso:{
          xml:"UPR_VAC_TiempoBibliotecaExponencial"
        }
      },{
        nombre:"Ejercicio 6",
        recurso:{
          xml:"UPR_VAC_TiempoColectivoUniforme"
        }
      },{
        nombre:"Ejercicio 7",
        recurso:{
          xml:"UPR_VAC_TiroAlBlanco"
        }
      }]
    },{
      nombre:"Convergencia de variables aleatorias. Teoremas límite",
      ruta:"convergencia",
      recurso: {
        html:"index"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"UPR_CTL_ConvergenciaFrecuenciaRelativa"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"UPR_CTL_EstimadorMediaPosicion"
        }
      },{
        nombre:"Ejercicio 3",
        recurso:{
          xml:"UPR_CTL_PromedioNormalesChebyshev"
        }
      },{
        nombre:"Ejercicio 4",
        recurso:{
          xml:"UPR_CTL_ProporcionBinomialChebyshev"
        }
      }]
    },{
      nombre:"Vectores aleatorios",
      ruta:"vectores_aleatorios",
      recurso: {
        html:"index"
      },
      contenido:[{
        nombre:"Ejercicio 1",
        recurso:{
          xml:"UPR_VA_BinomialCondicionalCalculos"
        }
      },{
        nombre:"Ejercicio 2",
        recurso:{
          xml:"UPR_VA_NormalCondicionalCalculos"
        }
      }]
    }]
  },{
    nombre:"Estadística",
    ruta:"estadistica",
    contenido:[{
      nombre:"Estimación puntual",
      ruta:"estimacion_puntual",
      recurso:{
        html:"index"
      }
    },{
      nombre:"Estimación por intervalos",
      ruta:"estimacion_intervalos",
      recurso:{
        html:"index"
      }
    }]
  },{
    nombre:"Química",
    ruta:"quimica",
    contenido:[{
      nombre:"Sales",
      ruta:"sales",
      recurso:{
        html:"index"
      }
    }]
  }];
});