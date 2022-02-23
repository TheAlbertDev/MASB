---
project: 'potentiostat'
students:
  - name: 'Lizaveta Shchasnovich'
    picture: 'assets/imgs/LIZAVETA-SHCHASNOVICH-SHCHASNOVICH.jpg'
    linkedin: 'liza-s-97a01597'
  - name: 'Eduard Solé'
    picture: 'assets/imgs/EDUARD_SOLÉ_GALINDO.png'
    linkedin: 'eduard-sol%C3%A9-galindo-07a1891ba'
repo: 'https://github.com/Biomedical-Electronics/masb-pot-s-gg'
date: 2021-06-18
language: 'es'
title: 'Proyecto MASB: Programación de un potenciostato'
---

## Introducción

Este proyecto consiste en la programación de un [potenciostato](https://es.wikipedia.org/wiki/Potenciostato) con el objetivo de caracterizar una muestra de [ferrocianuro de potasio ](https://es.wikipedia.org/wiki/Ferricianuro_de_potasio)([Fe(CN)6]3) a diferentes concentraciones sobre un [tampón](https://www.quimica.es/enciclopedia/Tamp%C3%B3n_qu%C3%ADmico.html) de cloruro de potasio.

La función principal de un potenciostato es la de controlar una [celda electroquímica](https://www.cio.mx/invest_13/gpom/archivos/Taller%20_CaracterizacionEQ_sesion1.pdf) o celda de 3 electrodos, de manera que controla la diferencia de potencial entre uno o más electrodos de trabajo (_working electrode_ [(WE)](https://quimica.laguia2000.com/conceptos-basicos/potenciostato)) combinados con un electrodo de referencia y otro auxiliar.

Concretamente, en este proyecto programaremos un potenciostato para obtener las mediciones de intensidad y voltaje detectados en nuestra celda electroquímica a partir de **dos** técnicas distintas: la cronoamperometría (CA) y la voltametría cíclica (CV).

### Voltametría cíclica

Esta es una [técnica electroquímica](https://bsginstitute.com/bs-campus/blog/voltametria-ciclica-109) que se utiliza principalmente para caracterizar procesos de reducción-oxidación, propiedades electrocanalíticas y estudio de intermediarios de reacción.

Para ello, la voltametría cíclica se basa en aplicar un barrido de potencial entre 2 tensiones fijadas antes del inicio de la medición, los potenciales de corte (_eVertex1_ y _eVertex2_). Este potencial se inicializa a un voltaje predefinido (eBegin) y se varía linealmente una cantidad fija (eStep) hasta llegar al primer potencial de corte. Luego cambia de dirección hasta llegar al segundo. Obteniendo un barrido triangular que se repite un número de ciclos concretos. Este se puede graficar obteniendo mediciones equidistantes temporalmente cada scanRate.

### Cronoamperometría

La segunda técnica electroquímica que hemos utilizado para la medición es la cronoamperometría. Esta técnica se basa en el estudio de la variación de corriente en nuestro WE con el paso del tiempo.

Para ello, se introduce el WE en la disolución que se quiere caracterizar y se aplica un potencial constante (eDC). Luego se aplica una señal en escalón que hará variar súbitamente el potencial produciendo un gran pico de corriente. Luego, el ferrocianuro de potasio entrará en un proceso de oxidación, reduciendo la corriente hasta quedar, finalmente, estabilizado. De esta manera se puede medir la corriente que pasa por una celda en un periodo de tiempo determinado.

## Tabla de contenidos

- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Materiales](#materiales)
- [Aplicación final](#aplicación-final)
- [Resultados](#resultados)
- [Conclusiones](#conclusiones)

## Objetivos

La realización de nuestro proyecto se ha producido teniendo, en todo momento, la finalidad de realizar los siguientes objetivos:

- Aplicar los conocimientos obtenidos para la programación en C del potenciostato para las 2 técnicas electroquímicas que se quieren llevar a cabo en una muestra de ferrocianuro
  potásico (K4[Fe(CN)6]) en cloruro de potasio (KCl) a diferentes concentraciones.
- Establecer el control de la _Power Management Unit_ (PMU).
- Comunicación con la aplicación viSens mediante el protocolo MASB-COMM-S, codificado en COBS.

## Materiales

A continuación, se describe el conjunto de materiales que se han utilizado durante el proyecto:

- Potenciostato, utilizado para establecer las diferencias de tensión. Este tiene un _front-end_ específico para que el usuario pueda modificar la entrada manualmente.
- Placa de evaluación (EVB) NUCLEO-F401RE, que procesará los _inputs_ del potenciostato (_back-end_).
- _Software_ de programación. Para programar las técnicas electroquímicas en nuestra EVB, se ha utilizado el entorno de programación [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html), que utiliza el lenguaje C/C++.
- Para la medición de las técnicas electroquímicas, se ha utilizado la aplicación [ViSens](https://github.com/Albert-Alvarez/viSens-S/releases/tag/v0.2.0), que nos permite tanto realizar una CA como una CV.

## Aplicación final

El siguiente diagrama de flujo corresponde al funcionamiento final de la aplicación desarrollada.

![Diagrama de flujo de la aplicación.](assets/FlujoFinal.png)

Los pasos que debe seguir el usuario para poder realizar los dos tipos de mediciones electroquímicas con el potenciostato son los siguientes:

- Primero tiene que abrir el programa viSense y conectar el dispositivo en el puerto del ordenador correspondiente.
- Una vez hecho esto, tiene que ejecutar el programa de STM32CubeIDE para poder medir con el potenciostato.
- Ahora puede escoger el tipo de medición deseada (voltametría o cronoamperometría), configurar los distintos parámetros deseados, e iniciar la medición.
- Una vez se inicia la medición, se envía una señal al microcontrolador, que recibe la instrucción correspondiente al tipo de medición escogida, realiza la medición y envía los distintos puntos en el tiempo hasta que acabe o el usuario lo pare. Al finalizar, el usuario puede escoger realizar otra medición, o simplemente desconectar el dispositivo y parar los programas.

Los diagramas de flujo correspondientes a la voltametría cíclica y a la cronoamperometría se pueden ver a continuación.

![Diagrama de flujo de la voltametrçía cíclica.](assets/Volta.png)

En la voltametría se realiza un barrido en tensión sobre la celda electroquímica. Para ello, se empieza desde `eBegin` y se va incrementando el valor en tensión en `eStep` hasta llegar a `eVertex1`. Una vez llegamos al primer vértice, cambiamos el objetivo para llegar al segundo vértice, también aplicando una diferencia de `eStep` en cada medición. Cuando ya hemos llegado al segundo vértice, volvemos a `eBegin`, completando un ciclo de la voltametría (y si tiene más ciclos, se repite el proceso).

![Diagrama de flujo de la cronoamperometría.](assets/Crono.png)

En la cronoamperometría se fija una tensión constante en la celda electroquímica durante un tiempo determinado, y se observan los resultados correspondientes.

## Resultados

Los resultados finales obtenidos se pueden ver a continuación.

### Resultados voltametría cíclica

En la primera imagen, correspondiente a la voltametría cíclica, podemos ver la medición realizada con el potenciómetro para los parámetros especificados a la izquierda de la imagen.

![Resultados de la voltametría cíclica con una celda Randles de calibración.](assets/ResultadoVolta1.png)

En las siguientes imágenes de la voltametría, podemos ver la misma medición pero en el gráfico correspondiente al potencial respecto al tiempo transcurrido (se puede ver claramente el barrido desde `eBegin` hasta cada vértice), y también de la corriente respecto al tiempo.

![Transitorio de la tensión en la voltametría cíclica con una celda Randles de calibración.](assets/ResultadoVolta2.png)

![Transitorio de la corriente en la voltametría cíclica con una celda Randles de calibración.](assets/ResultadoVolta3.png)

Una vez realizadas las pruebas sin la muestra y visto el correcto funcionamiento del programa, se procedió a realizar las medidas electroquímicas con una muestra de ferricianuro de potasio a diferentes concentraciones (1 mM y 5 mM). A continuación, pueden verse los respectivos gráficos resultantes de la medición (primero el de 1mM, y después el de 5 mM).

![Resultados de la voltametría cíclica con muestra real 1 mM.](assets/ResultadosVolta1mM.png)

![Resultados de la voltametría cíclica con muestra real 5 mM.](assets/ResultadosVolta5mM.png)

### Resultados cronoamperometría

En la siguiente imagen, podemos ver una cronoamperometría realizada con el potenciómetro con la configuración que se especifica a la izquierda de la imagen.

![Resultados de la cronoamperometría con una celda Randles de calibración.](assets/ResultadoCrono1.png)

A parte del gráfico con el potencial respecto a la corriente, también se han realizado los gráficos con el potencial y la corriente respecto al tiempo (se puede ver como el primer punto inicial está a 0, y luego se queda un valor fijo en la celda), que se pueden ver a continuación.

![Transitorio de la tensión en la cronoamperometría con una celda Randles de calibración.](assets/ResultadoCrono2.png)

![Transitorio de la corriente en la cronoamperometría con una celda Randles de calibración.](assets/ResultadoCrono3.png)

A continuación, pueden verse los respectivos gráficos resultantes de la medición de una muestra de ferricianuro de potasio a diferentes concentraciones (primero el de 1mM, y después el de 5 mM).

![Resultados de la cronoamperometría con muestra real 1 mM.](assets/ResultadoCrono1mM.png)

![Resultados de la cronoamperometría con muestra real 5 mM.](assets/ResultadoCrono5mM.png)

## Conclusiones

En líneas generales, en este proyecto se ha podido programar un potenciostato de manera satisfactoria. Hemos obtenido unos gráficos que coinciden con la morfología prevista para estas 2 técnicas bioquímicas caracterizando el proceso de oxidación del ferrocianuro de potasio a unas concentraciones de 1 y 5 mM.

Por otro lado, con la finalización de MASB, estamos muy satisfechos con el aprendizaje y la progresión que hemos alcanzado durante la asignatura, tanto en la introducción de nuevos conceptos importantes para trabajar con un microcontrolador como para la implementación de la comunicación entre diferentes dispositivos.

La forma en que se ha planteado nos ha permitido una introducción al flujo de trabajo en Git de una manera más individualizada y sobretodo para la coordinación de los integrantes del grupo para trabajar desde casa, que debido a la situación en la que nos encontramos cada vez tiene mayor importancia.

Por todo ello, consideramos que MASB nos ha servido como puerta hacia nuevos proyectos donde se necesiten dotes de programación en un entorno profesional.
