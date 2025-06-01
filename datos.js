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