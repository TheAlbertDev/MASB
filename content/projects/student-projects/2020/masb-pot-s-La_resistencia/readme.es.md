---
project: 'potentiostat'
students:
  - name: 'Maria Guerrero'
    email: 'marionaguerrlop@gmail.com'
    picture: 'assets/imgs/MARIA-GUERRERO-LOPEZ.jpg'
  - name: 'Mariona Ribera'
    email: 'mariona.r.d1998@gmail.com'
    picture: 'assets/imgs/MARIONA-RIBERA-DIVI.jpg'
repo: 'https://github.com/Biomedical-Electronics/masb-pot-s-La_resistencia'
date: 2020-06-18
language: 'es'
title: 'Proyecto masb-pot-s'
---

El proyecto masb-pot-s está diseñado para realizar medidas electroquímicas en una celda y analizar propiedades de los analitos. Es un proyecto realizado con un microcontrolador EVB de STM32 y usando la plataforma STM32cubeIDE. Este artículo contiene la definición del proyecto así como los resultados obtenidos y aclaraciones necesarias para entenderlo.

## Contenidos

- [Introducción](#introducción)
- [Diagrama de flujo](#diagrama-de-flujo)
- [Resultados obtenidos](#resultados-obtenidos)
- [Conclusiones](#conclusiones)

## Introducción

Con este proyecto se pretende programar un potenciostato para la realización de cronoamperometrías y voltametrías cíclicas de una celda electroquímica. Para ello, se ha usado el programa STM32CubeIDE para configurar el microcontrolador y programar las instrucciones necesarias para realizar las mediciones.

El microcontrolador debe comunicarse con el potenciostato y el ordenador para recibir y enviar los valores de voltaje y corriente y, posteriormente, deben ser representados en una gráfica usando una aplicación que puede conectarse con la plataforma STM32CubeIDE (viSens-S). De este modo, podemos ver los resultados de la voltametría cíclica o la cronoamperometría.

Una **celda electroquímica** de tres electrodos contiene el electrodo de trabajo (WE) que aplica el potencial deseado a la celda, el electrodo de referencia (RE) que actúa como referencia en la medición ya que tiene un potencial conocido para medir el potencial del WE, y un último electrodo llamado electrodo auxiliar (AE) que se utiliza para equilibrar la reacción en el WE.

El **potenciostato** permite controlar los tres electrodos de la celda electroquímica controlando la diferencia de potencial en uno de ellos, en dos o en los tres. A continuación podemos ver el esquema de un potenciostato que puede controlar la diferencia de potencial en uno, dos o más electrodos de trabajo, con ayuda de un electrodo de referencia y un electrodo auxiliar. Para más información sobre el funcionamiento de los potenciostatos, se puede consultar el siguiente [enlace](https://quimica.laguia2000.com/conceptos-basicos/potenciostato).

![Circuito de un potenciostato.](assets/imgs/potenciostat.png)

Debido a las circunstancias vividas estos últimos meses con el Covid-19, el proyecto no se ha podido realizar. Su planteamiento era usar una muestra de ferricinuro de potasio a diferentes concentraciones y un tampón de cloruro de potasio.

Las dos mediciones que se realizan, voltammetría cíclica y cronoamperometría, son técnicas muy importantes en la electroquímica para estudiar reacciones o propiedades electrocatalíticas.

La **voltametría cíclica** se basa en hacer un barrido triangular de potencial. Para realizarla, se aplica una diferencia de potencial entre el electrodo de trabajo (WE) y el electrodo de referencia (RE) de la celda electroquímica. El potencial aplicado va cambiando hasta llegar al deseado y, una vez que llega, cambia de dirección mientras se mide la corriente que proporciona la celda. El número de veces que se realiza el barrido triangular de potencial viene determinado por el número de ciclos deseado. Esta técnica proporciona información sobre el comportamiento químico y físico del sistema. Para más información, puede consultarse el siguiente [enlace](<https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Instrumental_Analysis/Cyclic_Voltammetry>).

La **cronoamperometría** consiste en aplicar una señal escalón en el potencial del WE y medir la corriente que pasa por la celda en función del tiempo. Nos permite cuantificar la concentración del analito a partir de su actividad. Es un proceso mucho más simple en el que únicamente se fija un potencial inicial inocuo y se amplía hasta que se produce la reacción. Para ampliar la información se puede consultar [aquí](https://es.scribd.com/document/264324581/CRONOAMPEROMETRIA).

A nivel técnico, para ejecutar el trabajo, se ha usado la infraestructura Git. Git nos ha ayudado a trabajar paralelamente creando ramas específicas para cada funcionalidad `feature/funcionalidad` y controlando la configuración del proyecto desde la rama `develop`. Git nos ha permitido evitar errores de compilación a la hora de trabajar los distintos miembros a la vez. Cabe mencionar que, en caso de modificar la configuración del proyecto posteriormente a la creación de una rama, se debe realizar un `git rebase` para que la configuración sea aplicada a la rama. Una vez finalizadas las funcionalidades, mediante las funciones de `merge` de GitHub, se ha juntado todo el proyecto para poder ser evaluado y subido a la rama `master` en buen estado.

## Diagrama de flujo

La ejecución del proyecto se puede resumir en el siguiente diagrama de flujo:

![Diagrama de flujo del proyecto.](assets/imgs/diagrama.png)

Las diferentes funcionalidades se han ido desarrollando en ramas individuales para ser luego unidas en el proyecto. El proyecto está desarrollado en STM32cubeIDE y por ello se han usado las funciones de la [librería HAL](https://www.st.com/resource/en/user_manual/dm00105879-description-of-stm32f4-hal-and-ll-drivers-stmicroelectronics.pdf).

La configuración del microcontrolador se puede ver en la siguiente figura donde vemos todas las conexiones que son necesarias para realizar el proyecto.

![Configuración de los pines del microcontrolador.](assets/imgs/configuracio.png)

Los componentes principales del proyecto están descritos a continuación:

1. PMU

La _Power Management Unit_ (PMU) se encuentra en el módulo _front-end_ del potenciostato y su función es alimentar todo el _front-end_ del potenciostato. Para comunicarse con esta, se ha configurado el pin PA5 del microcontrolador al que se ha llamado EN como una salida digital GPIO*INPUT. Este pin habilita (1) y deshabilita la PMU (0) mediante la funcion GPIO_WritePin. Como por defecto esta se encuentra deshabilitada para evitar que el \_front-end* consuma corriente, se ha programado una función que llevara a nivel alto el pin EN cuando se inicie el programa habilitando la PMU.

También conviene destacar el uso del relé que nos permite controlar la comunicación entre el _front-end_ y el sensor. Cuando el relé está abierto, la comunicación está disponible; si está cerrado, no. Lo controlamos mediante un GPIO pin del microcontrolador controlado como la PMU mediante `WritePin`.

2. _Timers_

Los _timers_ del microcontrolador nos permiten que se repita una acción con una frecuencia determinada o pasado un periodo de tiempo. En este caso, se ha implementado el _timer_ 2 del microcontrolador para controlar las medidas de la voltametría cíclica y de la cronoamperometria.

La función que se ha implementado permite cambiar el periodo del _timer_ y, por lo tanto, la frecuencia entre muestras en base a los parámetros que se indiquen para cada medida.

3. ADC

El ADC del microcontrolador nos permite leer los datos de la celda mediante una entrada del microcontrolador. Nos permite pasar las medidas analógicas tanto de voltaje como de corriente realizadas por el potenciostato en la celda electroquímica a unos datos digitales. Las señales son convertidas a señales unipolares para ser leídas. Para leer la corriente, usamos un amplificador de transimpedancia con una resistencia de 10 kOhm.

La comunicación del ADC es asíncrona configurada con un _baud rate_ de 115200, 8 bits, sin paridad y con un bit de stop mediante una USART del microcontrolador.

4. DAC

Nuestro proyecto tiene un DAC configurado que se encarga de escribir en la celda electroquímica el potencial deseado. El DAC convierte la señal que es digital a analógica para poder ser escrita en la celda. El DAC tiene un papel muy importante porque nos permite interactuar con la celda y definir el potencial inicial que nos permite iniciar los procesos. La comunicación del DAC usado, [MCP4725](https://pdf1.alldatasheet.com/datasheet-pdf/view/233449/MICROCHIP/MCP4725.html), se realiza mediante I<sup>2</sup>C, es decir, mediante la comunicación síncrona del microcontrolador. El DAC tiene una etapa de conversión que crea una señal bipolar y nos da el rango de tensiones positivas y negativas que podemos usar.

5. Voltametría cíclica

En nuestro caso, el microcontrolador mide la tensión de la celda electroquímica mediante el ADC y a continuación le va sumando/restando parámetros hasta llegar o superar un potencial determinado. Este ultimo proceso se repite tres veces en cada ciclo ya que primero se fija una tensión llamada eBegin a la celda, a continuación se aplican incrementos y decrementos hasta llegar a eVertex1, a eVertex2 y por último volviendo a eBegin. El periodo entre las muestras de la celda que lee el ADC viene determinado por dos parámetros ($Ts = eStep/scanRate$).

Para conseguir que el programa se ejecute cuando haya pasado este tiempo, se ha usado el _timer_ configurado del microcontrolador con su pertinente _callback_.

6. Cronoamperometría

En la cronoamperometría fijamos la tensión de la celda que deseamos mediante el DAC, dejamos el tiempo necesario para la muestra mediante el _timer_ y leemos los datos de la celda de tensión y corriente mediante el ADC. Se van tomando muestras hasta que termina el tiempo de muestreo.

Todo el envío de datos se realiza mediante el protocolo de comunicación COBS. Esto nos permite leer los datos de una manera clara y sin errores usando `0x00` como _term char_. Lo que hacemos usando el protocolo es convertir nuestra serie de datos en otra codificada en la que primero se eliminan todos los `0x00` (_term char_) y se escribe el número de paquetes entre `0x00` y `0x00` y el contenido de ellos. En nuestro proyecto tenemos una función que decodifica los mensajes y otra que los codifica y nos permite trabajar con el protocolo.

## Resultados obtenidos

Como se ha comentado, debido a la situación en la que nos encontramos con la pandemia del COVID-19, no hemos tenido acceso al laboratorio y no hemos podido probar nuestro código con un potenciostato y una celda electroquímica.

En este caso, para comprobar el funcionamiento del código, se ha usado el programa viSens-S que nos permite realizar las dos medidas con los datos que va recibiendo del microcontrolador, tanto la voltametría cíclica como la cronoamperometria y obtener los datos obtenidos tanto en gráfico como en formato de tabla.

Al tener un potenciómetro que nos fue proporcionado antes de encontrarnos en esta situación, lo hemos podido adaptar para hacer un divisor de tensión y conectarlo a las entradas analógicas del microcontrolador como se ve en la imagen que encontramos a continuación:

![Conexión del potenciómetro.](assets/imgs/placa.jpg)

El resultado final no es el esperado ya que nos se ha podido conectar con la aplicación viSense por causas que no hemos sabido resolver. El código compila sin errores, pero parece que no envía datos a la aplicación.

## Conclusiones

En esta asignatura hemos aprendido a trabajar con un microcontrolador desde el encendido y apagado de un LED hasta la realización de un proyecto para hacer medidas electroquímicas. Se ha trabajado también la parte teórica para entender la importancia de los microcontroladores y la presencia que tienen en cualquier dispositivo que pensemos. Se han trabajado interrupciones, _timers_, conversores de señales, comunicaciones síncronas y asíncronas, etc. Usar Arduino al inicio del curso nos ha ayudado a entender cómo se estructuran las instrucciones que el microcontrolador recibe. Arduino no tiene librerías especificas para microcontroladores y los códigos son más simples. Por eso, se ha hecho uso de la plataforma STM32CubeIDE y toda la librería HAL para realizar los proyectos. La evolución del curso nos ha permitido poder desarrollar este proyecto.

A parte de toda la parte de instrucciones y tareas del microcontrolador, también nos hemos introducido al uso de Git. Git es una herramienta muy buena para hacer trabajos y, sobretodo, para hacer trabajos en grupo. Nos permite subir archivos como versiones que quedan almacenados en el repositorio y pueden ser rescatados después. Podemos ver lo que los otros miembros del equipo hacen y pedirles revisiones de nuestros archivos. GitHub es la interfaz con el repositorio remoto donde a parte de subir los archivos también podemos verlos y unirlo con otros. En definitiva, es una herramienta que probablemente usaremos otras veces porque nos ha mostrado un modo distinto de trabajar en equipo bastante eficiente.

Aunque no se ha podido trabajar con algunos componentes reales debido a la falta de movilidad para ir al laboratorio, este proyecto nos ha servido para estimularnos y buscar recursos alternativos para entender los componentes, así como para conocer mejor el _datasheet_ de algunos como serían el DAC externo al microcontrolador.

El proyecto nos ha resultado complicado en algunas partes, sobretodo a la hora de reproducir los _workflows_ de la voltametría cíclica y cronoamperometría e introducir los _timers_ en ellas.

Para terminar, la valoración de la asignatura que hacemos es muy positiva ya que nos hemos podido introducir un poco en una parte de la electrónica más computarizada y de programación que desconocíamos totalmente.
