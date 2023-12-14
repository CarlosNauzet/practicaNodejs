# practicaNodejs
Práctica Desarrollo de backend con NodeJs para el bootcamp Full Stack 2023 Keep Coding

## Instalación
- Clonar el repositorio
```sh
git clone https://github.com/CarlosNauzet/practicaNodejs.git
cd practicaNodejs
```
- Instalar dependencias
```sh
npm install
```
- Inicializar BBDD
```sh
npm run iniciarDB
```
- Inciar la aplicación
 ```sh
npm run dev
```

## Funcionalidad API
- TODO: explicar cada endpoint
### Endpoints
-http://localhost:3000/api/v1/productos -> listado todos los productos disponibles tanto en venta como para comprar, método GET

-http://localhost:3000/api/v1/test -> test de prueba para comprobar carga en BBDD, método GET

-http://localhost:3000/api/v1/productos/tags -> genera un listado de los tags actualmente utilizados, método GET

-http://localhost:3000/api/v1/productos/:id -> para borrar los productos por medio de la clave primaria id, método DELETE

-http://localhost:3000/api/v1/productos para crear productos nuevos desde postman, método POST

### Filtros : 
- El filtro más importante, por nomnbre del artículo, es con la siguiente sintaxis

```sh
( if (req.query.nombre) {
    filtros.nombre = req.query.nombre;
  }
```

 -> ejemplo url : http://localhost:3000/?nombre=bici // este filtro permite filtrar por nombre.

- La misma fórmula se aplica a precio: http://localhost:3000/api/v1/productos/?precio=250
```sh
if (req.query.precio) {
    filtros.precio = req.query.precio;
  }
```
- También podemos filtrar por tags : http://localhost:3000/api/v1/productos/?tags=motor
```sh
if (req.query.tags) {
    console.log(req.query.tags);
    const arrayTags = req.query.tags.split(",");
    console.log(arrayTags);
    filtros.tags = {
      $in: arrayTags,
    };
    console.log(filtros.tags);
  }
```
- Por último, se puede filtrar por aquellos artículos que están en venta, o no: http://localhost:3000/api/v1/productos/?sevende=true [para artículos en venta] / http://localhost:3000/api/v1/productos/?sevende=false [para artículos en demanda]
```sh
 if (req.query.seVende) {
    filtros.seVende = req.query.seVende;
```

### Validaciones: 
Realizadas las validaciones desde Mongoose: P
- Para que el campo 'nombre' no este vacío he usado el trim/required:
```sh
nombre: {
    type: String,
    required: [true, "El campo nombre es obligatorio"],
    trim: true,
  },
```
- Para el campo 'precio', un min/max required para limitar unas cantidades máximas y mínimas:
```sh
precio: {
    type: Number,
    required: true,
    min: [0, " El valor mínimo de precio es 0"],
    max: [100000, "El valor máximo de precio es 100000"],
  },
```

- Para el campo se vende validamos con que se aun Boolean:
```sh
 seVende: {
    type: Boolean,
    default: true, // validamos por defecto como true si no introduce este valor
  },
```
- Y los tags que sea al menos elegido uno de la lista con un enum:
```sh
tags: [
    {
      type: String,
      enum: ["lifestyle", "motor", "work", "mobile"], // Valido que sea uno de los 4 tags que tenemos asigandos
    },
```

## Vista
-Accediendo a http://localhost:3000 nos muestra una lista de todos los productos en la base de datos. 
Podemos añadir filtros a esta Url para filtrar los productos desde aquí mismo (?nombre=bici / ?tags=motor , etc)

### Conclusión

He aprendido muchísimo con esta práctica y en general con las clases. Me aterrorizaba NodeJs y ahora me siento que finalmente lo voy pillando. 
Y mira que he dado guerra en clase. Ha habido momentos muy fustrantes, entre mi ordenador lentísimo, mi dedo roto, salir de currar una hora antes de las clases o empatar...Pero valió la pena.
¡Gracias por toda tu paciencia profe! 😉


