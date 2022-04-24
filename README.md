# Gestirediel
Este proyecto consiste en una aplicación web que permite gestionar una empresa de reparaciones tecnológica.

## Descripción del proyecto
Este proyecto ha sido creado porque muchas empresas buscan una web para poder gestionar su negocio en tiempo real. Para ello hemos creado plantilla web que se caracteriza por ser:
- Intuitiva
- Fácil de usar
- Segura
- Rápida
- En tiempo real

## Información del despliegue
Para este proyecto hemos usado:
- [Angular](https://angular.io/)
- [NodeJS](https://nodejs.org/)
- [Sql](https://www.sqlite.org/)

Para desplegar este proyecto en local deberás tener instalado:
- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)
- [NodeJS](https://nodejs.org/)
- [Npm](https://www.npmjs.com/)
- [Xampp](https://www.apachefriends.org/es/index.html)

Una vez instalado los anteriores elementos, podrás ejecutar el proyecto con:
```
$ mkdir gestirediel
$ cd gestirediel
$ git clone https://github.com/iesgrancapitan-proyectos/202122daw-junio-GESTIREDIEL-Tomas-Carlos-lmagarin
$ cd frontend
$ npm install
$ cd ../backend
$ npm install
```
Una vez compilado todos los módulos de node, levantamos el servidor con:
```
$ nodemon index.js
```

Ahora encendemos el xampp en local y accedemos a phpmyadmin para crear la base de datos con nombre gestirediel. Una vez creada la base de datos, importamos el fichero bd.sql que se encuentra en la carpeta raíz del proyecto.


Una vez ejecutado el servidor, podrás acceder a la web con:
```
$ cd ../frontend
$ ng serve -o
http://localhost:4200/
```
Y esto nos abrirá una nueva ventana en el navegador por defecto con la web de gestirediel.

## Información sobre cómo usarlo


## Autores
- [Tomás Hidalgo Martín](https://github.com/tomashm01)
- [Carlos Hidalgo Risco](https://github.com/Tach0ficial)