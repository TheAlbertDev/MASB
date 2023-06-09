---
project: 'potentiostat'
students:
  - name: 'Xavier Ullastre'
    linkedin: 'xavier-ullastre-4613a5225'
    picture: 'assets/imgs/ruben-cuervo-noguera.jpg'
  - name: 'Antonio Javier Gomez'
    linkedin: 'antonio-javier-gomez-asencio-4075bb23a'
    picture: 'assets/imgs/pere-pena-pujos.jpg'
repo: 'https://github.com/Biomedical-Electronics/masb-pot-s-xavi-2'
date: 2023-06-13
language: 'es'
title: 'MASB xavi2 project: Programming a Potentiostat'
---

<p style="text-align: justify;">A continuación, se detalla el proyecto realizado por dos alumnos del grado de Ingeniería Biomédica de la Universidad de Barcelona (UB) en la asignatura optativa de Microcontroladores para Aplicaciones y Sistemas Biomédicos. Xavier Gómez Asensio y Xavier Ullastre Buscá, han desarrollado el algoritmo del microcontrolador STM32F401 Nucleo-64 que permite realizar dos tipos diferentes de mediciones, voltamperometría cíclica y cronoamperometría, mediante un potenciostato. El proyecto también incluye el control del microcontrolador mediante un set de instrucciones específicos así como la visualización de los datos obtenidos mediante ViSens-S. En los siguientes apartados entraremos más en detalle en los diferentes pasos seguidos para el desarrollo del proyecto y también se mostrarán los resultados obtenidos. </p>

## Tabla de contenidos

[TOC]


## Objetivos

<p style="text-align: justify;">Como se ha comentado anteriormente el objetivo principal del proyecto es la programación de un potenciostato mediante la placa STM32 Núcleo 64 y mediante STM32Cube IDE, para el control y obtención de voltametrías cíclicas y cronoamperometrías. </p>

Para la correcta realización de este proyecto se han definido los siguientes subobjetivos:
- Control y creación del set de instrucciones
- Control de la *Power Management Unit* (PMU) del módulo *front-end* del potenciostato
- Utilizar ADC y DAC para leer y fijar los Voltages e Intensidades correspondientes
- Implementar los timers del microcontrolador para gestionar el los tiempos de medición y de muestreo
- Creación y programación del flujo de ejecución para la voltametría cíclica
- Creación y programación del flujo de ejecución para la cronoamperometría
- Comunicarse con la aplicación viSens-S mediante comunicación en serie I2C
- Testear el correcto funcionamiento tanto del código como de la aplicación final

## Marco Teórico

<p style="text-align: justify;">Una vez definidos los objetivos, en esta sección se describen brevemente los principales contextos relacionados con el proyecto para poder entender cada una de las partes de este. </p> 

### Potenciostato
<p style="text-align: justify;">Un potenciostato es un dispositivo electrónico utilizado en el mundo de la electroquímica para controlar y medir potenciales eléctricos de una celda electroquímica, dispositivo experimental para generar electricidad mediante una reacción redox. </p>

<p style="text-align: justify;">El potenciostato esta formado por tres electrodos. En primer lugar, el electrodo de trabajo, el cual está en contacto directo con la muestra o solución electroquímica a analizar y mantiene un potencial constante. El segundo electrodo es el llamado electrodo de referencia y establece el potencial de referencia para la medición. Finalmente, el electrodo auxiliar completa el circuito eléctrico permitiendo el flujo de corriente. </p>

<p style="text-align: justify;">Este sistema funciona manteniendo el potencial del electrodo de trabajo a nivel constante en relación con el electrodo de referencia mediante la aplicación de una tensión o corriente de control con el electrodo auxiliar. Al mantener constante el potencial entre el electrodo de trabajo y el de referencia, se puede medir la corriente generada en la celda electroquímica como respuesta a ese potencial. </p>

![](C:\microcontrolers\MASB\content\projects\student-projects\2023\masb-pot-s-xavi-2\assets\imgs\Potentiostato.png)

<p style="text-align: justify;">Uno de los principales usos del potenciostato es la aplicación de diferentes técnicas de medición electroquímica donde se incluyen la voltametría cíclica y la cronoamperometría. Estas técnicas permiten obtener información sobre las propiedades electroquímicas de una muestra como por ejemplo la concentración de especies químicas o la cinética de las reacciones electroquímicas. </p>

### Voltamperometría Cíclica


<p style="text-align: justify;">La voltametría cíclica (CV) es una técnica electroquímica potenciodinámica comúnmente utilizada para investigar las propiedades de una muestra en solución o de moléculas adsorbidas en el electrodo, mediante la medición del potencial de reducción. En un experimento de CV, el potencial del electrodo de trabajo se varía de forma lineal en función del tiempo y se monitorea la corriente a través de un circuito. Después de alcanzar el potencial establecido, el potencial del electrodo de trabajo se invierte en la dirección opuesta para regresar al potencial inicial, generando ciclos de rampas de potencial.</p>

<p style="text-align: justify;">La corriente leída se registra y se grafica en función del voltaje aplicado, lo que resulta en un voltamograma cíclico.</p>

![](C:\microcontrolers\MASB\content\projects\student-projects\2023\masb-pot-s-xavi-2\assets\imgs\vc_grafico.png)



<p style="text-align: justify;">En la figura de arriba podemos ver el resultado de una voltametría cíclica. Los dos picos corresponden a los picos de oxidación y reducción de la muestra. Los picos y las formas de los voltamograma cíclicos pueden indicar reacciones electroquímicas reversibles o irreversibles, la presencia de especies redox, la concentración de analitos, la cinética de las reacciones, la adsorción/desorción de moléculas en la superficie del electrodo, entre otros parámetros.</p>

### Cronoamperometría

<p style="text-align: justify;">Por otro lado, la cronoamperometría es una técnica electroquímica utilizada para obtener información sobre procesos de transferencia de carga  y reacciones electroquímicas en la muestra. El principio de esta técnica consiste en establecer el potencial del electrodo de trabajo y monitorizar el corriente resultante en función del tiempo. La corriente se debe a procesos farádicos  provocados por el paso del potencial en los que hay transferencia de electrones. </p>



## Materiales y herramientas

En esta sección explicaremos los principales elementos de hardware, así las diferentes herramientas de software o control de proyectos utilizadas. También se describirán los principales componentes del front-end del microcontrolador utilizados para la aplicación en cuestión. 

### STM32F401 Nucleo-64

Para la realización de este proyecto utilizaremos la Placa de Evaluación (EVB) STM32 Nucleo-F401RE de STMicroelectronics, la cual usa el microcontrolador STM32F401RET6U del mismo fabricante. Esta placa ofrece a los usuarios una forma asequible y flexible de probar nuevos conceptos y construir prototipos eligiendo entre las diferentes combinaciones de prestaciones y consumo de energía que ofrece el microcontrolador. Por esto es una placa perfecta para que los usuarios pueden introducirse en el mundo desarrollo mediante microcontroladores. A continuación os presentamos una figura donde se muestra la EVB y todos sus componentes y pines. 

![](C:\microcontrolers\MASB\content\projects\student-projects\2023\masb-pot-s-xavi-2\assets\imgs\EVB_STM32F401.jpg)

Una de las ventajas de esta EVB es que esta expone todos los pines del microcontrolador facilitando las conexiones con elementos externos durante el prototipaje. 

### STM32Cube IDE

STM32CubeIDE es una plataforma avanzada de desarrollo C/C++ con funciones de configuración de periféricos, generación de código, compilación de código y depuración para microcontroladores y microprocesadores STM32. QUE Permite la integración de los cientos de plugins existentes.

STM32CubeIDE integra las funcionalidades de configuración y creación de proyectos STM32 de STM32CubeMX para ofrecer una experiencia de herramienta todo en uno y ahorrar tiempo de instalación y desarrollo. Después de la selección de un vacío STM32 MCU o MPU, o preconfigurado microcontrolador o microprocesador de la selección de una placa o la selección de un ejemplo, el proyecto se crea y se genera el código de inicialización. En cualquier momento durante el desarrollo, el usuario puede volver a la inicialización y configuración de los periféricos o middleware y regenerar el código de inicialización sin impacto en el código de usuario.





### viSens-S



### GitHub



### Componentes frond-end





## Metodología

### Flujos de Trabajo



### Desarrollo de las funciones



### Test



## Resultados



## Conclusiones



## Referencias

