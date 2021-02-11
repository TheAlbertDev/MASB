<<<<<<< HEAD
# MASB webiste
=======
La página web [https://masb.thealbert.dev/](https://masb.thealbert.dev/) sirve como portafolio de los proyectos realizados por los estudiantes de la asignatura de Microcontroladores para Aplicaciones y Sistemas Biomédicos (MASB). Aquí se recogen los informes finales realizados por los estudiantes en los que presentan el proyecto realizado, la metodología y procedimientos utilizados, los resultados obtenidos y su conclusiones.  Por ello, en el siguiente documento se recoge el procedimiento que deben de seguir los estudiantes para subir sus trabajos a la página web.

# Instalación de NodeJS

La página web utiliza [Gatsby](https://www.gatsbyjs.com/), un *framework* para compilar una web estática mediante [NodeJS](https://nodejs.org/). Este último, es un entorno de ejecución de Javascript. Lo único que necistaremos será instalar NodeJS en nuestro ordenador. Las dependencias que requiere Gatsby para compilar la web se instalarán automáticamente mediante el gesto de paquestes [NPM](https://www.npmjs.com/) que se instala junto a NodeJS.

<details><summary><h2>Windows</h2> :arrow_forward:</summary>
<p>
- Ir a la página web [https://nodejs.org/es/download/](https://nodejs.org/es/download/).
- Descargar la última versión de NodeJS para Windows. **Asegúrate de coger la versión LTS.**
- Ejecutamos el instalador descargado y nos aseguramos de habilitar todas las opciones del instalador. La última opción **es opcional (Chocolatey, otro gestor de paquetes).**
- Una vez finalizada la instalación, nos aseguramos que se ha hecho correctamente. Abrimos un Git Bash y ahí introducimos el comando
```bash
node -v
```
El teminal nos tiene que devolver la versión de NodeJS que acabamos de instalar.
</p>
</details>

<details><summary><h2>MacOS</h2> :arrow_forward:</summary>
<p>
- Ir a la página web [https://nodejs.org/es/download/](https://nodejs.org/es/download/).
- Descargar la última versión de NodeJS para MacOS. **Asegúrate de coger la versión LTS.**
- Ejecutamos el instalador descargado y nos aseguramos de habilitar todas las opciones del instalador.
- Una vez finalizada la instalación, nos aseguramos que se ha hecho correctamente. Abrimos un Terminal y ahí introducimos el comando
```bash
node -v
```
El teminal nos tiene que devolver la versión de NodeJS que acabamos de instalar.
</p>
</details>

<details><summary><h2>Linux</h2> :arrow_forward:</summary>
<p>
Si usas Linux, ya sabes cómo instalarl :wink:
</p>
</details>

# Fork del repositorio e instalación de dependencias

El repositorio no puede modificarse directamente. Es público, pero no tiene "permisos para todos". Sin embargo, GitHub provee de una herramienta para permitir que terceros puedan realizar modificaciones del código y luego pueda **proponer** esas modificaciones. Esta herramienta es un **fork**. El flujo de trabajo es el siguiente:

1. Vamos al repositorio en el cuál queremos que se hagan cambios (en este caso, queremos que el repositorio con la web de MASB contenga nuestro informe final).
2. Hacemos un *fork* de ese repositorio. Esto hará que se nos haga una copia del repositorio en nuestro perfil de GitHub. Ahora tendremos en nuestra posesión una copia exacta del repositorio original, pero esta vez tenemos total libertad para modificar esta copia.
3. Hacemos las modificaciones pertinentes. (Clonamos el repositorio en nuestro PC, hacemos las modificaciones que queramos, hacemos los *commits* y *pushes* pertinentes, etc.)
4. Una vez finalizados los cambios (una vez hemos acabado el report y hemos probado que se ve bien en la web (ahora veremos cómo hacerlo)), hacemos un *Pull Request* (PR) hacia el repositorio original. (GitHub ya sabe que se trata de un *fork* y nos dejará hacer un PR a un repositorio externo).
5. Esperamos a que el propietario del repositorio original (servidor :sunglasses:) compruebe que todo funciona correctamente y no se ha modificado nada más allá de lo estrictamente necesario, y aprueba el PR para que el contenido sea incorporado a la página web.

## *Fork* del repositorio

- Nos vamos a la página del repositorio de la asignatura: [https://github.com/TheAlbertDev/MASB](https://github.com/TheAlbertDev/MASB).
- Arriba a la derecha, clicamos sobre el botón <kbd>Fork</kbd>.
- En la página siguiente, no hace falta modificar nada. Clicamos en <kbd>Create fork</kbd>.
- Por último, clonamos el repositorio recién creado (ya sabes cómo hacerlo).

## Instalación de dependencias

Vamos a instalar las dependencias que necesita Gatsby para compilar.

- Abrimos el terminal dentro de nuestro repositorio clonado y cambiamos a la rama que contiene la página web.
```bash
git checkout www/master
```
- Finalmente, instalamos dependencias:
```bash
npm i
```
Aquí puede estar un ratito hasta que lo instale todo :sweat_smile:
- Cuando acabe de ejecutarse el comando, ya tendremos todo instalado.

# Creación del report

En nuestro repositorio, vamos a crear la carpeta a la que irá nuestro informe y ahí lo crearemos. Puedes ver la estructura de los proyectos de años anteriores.

- Creamos la carpeta de nuestro en año en:
```bash
content/projects/student-projects/
```
- Creamos dentro de esta carpeta otra con el nombre de nuestro repostorio en GitHub.
- En esa carpeta crearemos los dos ficheros README. El que estará en español lo nombraremos `readme.es.md` y el que estará en inglés lo nombraremos `readme.en.md`.
- Crearemos una carpeta adicional llamada `assets` donde colocaremos todas las imágenes que añadamos al informe. **Importante:** recomendable solo utilizar imagenes en formatos tipo `.jpg`, `.png` o `.svg` y **siempre** la extensión en minúsculas (:x: `imagen.PNG`, :white_check_mark: `imagen.png`).

## *Front matter*

El *front matter* de un archivo markdown es información que se emplaza al principio del documento y que se utiliza como metadatos. No aparecen en el documento final. El *front matter* se envuelve de tres guiones al principio y otros tres al final.

```md
---
<Aquí van los metadatos>
---
```

Los informes deben de contener los siguientes metadatos en el *front matter* (usad como plantilla el siguiente bloque de código o los archivos de antiguos estudiantes).

```md
---
project: '<Vuestro proyecto. Opciones disponibles: 'potentiostat'>'
students:
  - name: '<Nombre y apellidos del estudiante 1>'
    picture: 'assets/<Nombre de la imagen del retrato del estudiante 1>'
  - name: '<Nombre y apellidos del estudiante 2>'
    picture: 'assets/<Nombre de la imagen del retrato del estudiante 2'
repo: '<URL al repositorio de vuestro proyecto>'
date: <Fecha en la que subis el informe en formato AAAA-MM-DD>
language: '<Idioma. Opciones disponibles: 'en', 'es'>'
title: '<El título de vuestro informe>'
---
```

El campo `title` y `language` debe de cumplimentarse según corresponda en español o inglés. El resto deben de ser iguales para ambos casos.

## Opciones disponibles

Estan disponibles todas las funcionalidades básicas de markdown y además se incluyen las siguientes características:

- [katex](https://www.gatsbyjs.com/plugins/gatsby-remark-katex/): se pueden indicar ecuaciones en LaTeX.
- [mermaid](https://www.gatsbyjs.com/plugins/gatsby-remark-mermaid/): para dibujar diagramas de flujo vectoriales mediante mermaid.

## Comprobar cómo se ve

Para levantar la web en local y así poder comprobar cómo se ve y que no hayan errores de compilación, simplemente ejecutamos el siguiente comando:

```bash
npm run develop
```
y hacemos clic al enlace web que nos aparecerá en el terminal una vez se haya compilado la web.

# *Pull Request*

Una vez finalizamos nuestro informe, lo subimos en GitHub y hacemos un Pull Request al repositorio original. Esperamos retroacción y, si todo está correcto, se hará un *merge* al repositorio.
>>>>>>> caf027d (Readme con instrucciones para añadir el report)
