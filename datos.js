Mila.Modulo({
  necesita:["$milascript/base"]
});

Mila.Base.RegistrarFuncion_(function CargarDatosEn_(data) {
  // TODO: ¿Ir a buscarlos al servidor? ¿Al repo de ejercicios? ¿A otro lado?
  data.DATOS = [{
    nombre:"Probabilidad",
    contenido:[{
      nombre:"Primeros Datos",
      contenido:[{
        nombre:"Ejercicio de prueba 1",
        recurso:{
          url:"https://reda-ar.shinyapps.io/pruebas_analisis/"
        }
      },{
        nombre:"Ejercicio de prueba 2",
        recurso:{
          url:"https://reda-ar.github.io/ejercicios/proba/primeros_datos/index.html"
        }
      }]
    },{
      nombre:"Teoría axiomática de la probabilidad",
      contenido:[{
        nombre:"Ejercicio de prueba 1",
        recurso:{
          url:"https://reda-ar.github.io/ejercicios/proba/teoria_axiomatica/index.html"
        }
      }]
    },{
      nombre:"Probabilidad condicional e independencia",
      contenido:[{
        nombre:"Ejercicio de prueba 1",
        recurso:{
          url:"https://reda-ar.github.io/ejercicios/proba/proba_condicional/index.html"
        }
      }]
    },{
      nombre:"Variables aleatorias",
      contenido:[{
        nombre:"Ejercicio de prueba 1",
        recurso:{
          url:"https://reda-ar.github.io/ejercicios/proba/var_aleatorias/index.html"
        }
      }]
    },{
      nombre:"Variables aleatorias continuas"
    },{
      nombre:"Vectores aleatorios - primeros pasos"
    },{
      nombre:"Convergencia de variables aleatorias. Teoremas límite"
    },{
      nombre:"Vectores aleatorios"
    }]
  },{
    nombre:"Estadística",
    contenido:[{
      nombre:"Estimación puntual"
    },{
      nombre:"Estimación por intervalos"
    }]
  },{
    nombre:"Química",
    contenido:[{
      nombre:"Sales",
      contenido:[{
        nombre:"Ejercicio de prueba 1",
        recurso:{
          url:"https://reda-ar.github.io/ejercicios/quimica/sales/index.html"
        }
      }]
    }]
  }];
});