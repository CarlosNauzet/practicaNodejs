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

## Segunda Parte de la Práctica: Node Avanzado

### Ajustes por defecto

STAGE=development

PORT=3000

MONGO_URL=mongodb://localhost:27017
MONGO_DB_NAME=nodepop

JWT_SEED=youSecretKey

PUBLIC_FOLDER=public
UPLOADS_FOLDER=database
4.- Arracanr el poryecto en modo development

npm run dev
5.- Poblar la BBDD

npm run seed
6.- Arrancar Thumbnail Microservice

npm run thumbnail-service
Production
1.- Clonar el proyecto

git clone
cd practica-node-avanzado
2.- Install the project dependencies

npm i
3.- Copy .env.template and rename it to .env, fill the needed environment variables with yours, set STAGE to production

# Default Settings

STAGE=production

PORT=3000

MONGO_URL=mongodb://localhost:27017
MONGO_DB_NAME=nodepop-adv

JWT_SEED=youSecretKey

PUBLIC_FOLDER=public
UPLOADS_FOLDER=uploads

### Run build command

npm run build

### Run start command

npm start

### TESTING

## Testeo usa .env.test environment file, rellenalo como desees

Test han sido hechos con jest and y hemos testeado todos los endpoints de la API.

NOTE: Eso inicializa un nuevo server en la BBDD

Example .env.test environment file

PORT=3001

MONGO_URL=mongodb://localhost:27017/test-db
MONGO_DB_NAME=nodepop-adv-test

PUBLIC_FOLDER=public
UPLOADS_FOLDER=uploads
Run:

npm test

## Características nuevas

### Autenticación

Nodepop usa bcrypt para hashear y securizar contraseñas y JWt por autenticación. Tras el registro, los datos del usario están guardados en una BBDD con contaseñas hasheadas. EL endpoind de logueo se encarga de la validación de las contraseñas y envía de vuelta un token en una cookie. La Auth middleware la autentica validando el toke reicibido en la cookie y establece una nueva propiedad en el body llamada 'user' con la carga-"payload"

### Internacionalización

Nodepop-adv uses the i18n library to internationalize the application. Accessing will display a frontend page showing the current products in the database. On this page, two flags are visible—one for Spanish language and one for English language. By clicking on them, users can switch the language of the page.

Nodepop usa la conocida librería i18n para internacionalizar la aplicación. Accediendo a http://localhost:3000 una página del frontal muestra los productos en la BBDD. En esta página, hay dos selectores para las lenguas: ES y EN. Al clicarlas, el usuario puede alternarlas.

### Image Upload with Thumbnail Background TaskCarga de imágenes con Thumbnail

Nodepop utiliza la subida de archiuvos express para manejar las imágenes de los productos. Cuando una imagen es cargada, es guardada en ${PUBLIC_FOLDER}/${IMAGES_FOLDER}/productos. La img cargada es generada en base al nombre original mas un identificador único.
Un thumbnail es generado durante la carga de la imagen utilizando Cote para el microservicio y jimp para construir el thumbanail. gracias a Multer, un evento llamado 'create-thumbnail' para genera el thumbnail es disparado, y el microservicio para tal fin escucha este evento para generarlo.

### Extras

Por otro lado, el endpoin de actualizar productos ha sido creado para prácticar, que se me quedo pendiente en la primera entrega de la práctica.
