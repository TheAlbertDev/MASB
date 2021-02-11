---
project: 'potentiostat'
students:
  - name: 'Adrià Díaz'
    picture: 'assets/imgs/ADRIA-DIAZ-FERRERO.jpg'
    linkedin: 'adrian-diaz'
  - name: 'Francisco Domingo'
    picture: 'assets/imgs/FRAN-DOMINGO-GIL.jpg'
    linkedin: 'francisco-domingo-219b99172'
  - name: 'Lluís Colomer'
    picture: 'assets/imgs/LLUIS-COLOMER-COLL.jpg'
    linkedin: 'llu%C3%ADs-colomer-coll-52747b17b'
repo: 'https://github.com/Biomedical-Electronics/masb-pot-s-nopucmes'
date: 2021-06-18
language: 'es'
title: 'Proyecto masb-pot-s-nopucmes'
---

<a name="top"></a>

En este informe se describirá el proyecto final de la asignatura de _Microcontroladores para Aplicaciones y Sistemas Biomédicos_ sobre la programación de un potenciostato para la realización de dos tipos de mediciones electroquímicas: la _cronoamperometría_ y la _voltametría cíclica_. Al final del proyecto, se realizarán diversas mediciones para validar el proyecto en una muestra de [ferricianuro de potasio](https://es.wikipedia.org/wiki/Ferricianuro_de_potasio) a diferentes concentraciones en un tampón (_buffer_) de [cloruro de potasio](https://es.wikipedia.org/wiki/Cloruro_de_potasio).

El proyecto se ha desarrollado mediante la programación de una placa STM32 Nucleo-F401RE en el entorno de programación STM32CubeIDE. Mediante Git, se ha realizado un control de versiones de todo el código desarrollado y en GitHub lo hemos podido almacenar para compartirlo con el resto del equipo y el gestor del proyecto. A continuación, podemos encontrar una breve descripción de todos los elementos relevantes para el desarrollo del proyecto.

## Potenciostato

El potenciostato es un dispositivo electrónico requerido para controlar una celda de tres electrodos y ejecutar experimentos electroanalíticos. Es capaz de medir y controlar el potencial de una celda, detectando cambios en su resistencia. El sistema funciona manteniendo el potencial del electrodo de trabajo (WE) a un nivel constante respecto al potencial del electrodo de referencia (RE) mediante el ajuste de la corriente en un electrodo auxiliar (CE). Aplicando un potencial a una cierta superficie, la cantidad de electrones de su superficie se reduce o aumenta. Esto causa que el líquido contenga o consuma electrones para compensar esa diferencia.

![Esquema de la electrónica de un potenciostato. <a target="_blank" href="https://es.wikipedia.org/wiki/Potenciostato" rel="noopener noreferrer nofollow">Fuente</a> de la imagen.](assets/Potentiostat.png)

## Cronoamperometría

La [cronoamperometría](https://en.wikipedia.org/wiki/Chronoamperometry) (CA) es una **técnica electroquímica** en la cual el potencial del electrodo de trabajo (WE) se escalona y se mide la corriente resultante de los procesos farádicos que ocurren en la muestra. Este proceso se basa en monitorizar la corriente de la celda en función del tiempo, la cual fluctuará de acuerdo con la difusión del analito en la solución. Esto nos permitirá cuantificar la concentración del analito de interés. La cronoamperometría puede usarse para medir la dependencia entre la corriente y el tiempo para el proceso de difusión controlado que ocurre en un electrodo, que varía con la concentración de analito. Es un proceso mucho más simple en el que únicamente se fija un potencial inicial, el cual se amplía hasta que se produce la reacción. La señal de respuesta es una curva intensidad-tiempo. Para más información sobre esta técnica se puede consultar la siguiente [página](https://es.scribd.com/document/264324581/CRONOAMPEROMETRIA).

![Imagen donde se puede ver el cambio de voltaje que se genera y la forma de la curva de respuesta. Como hemos visto anteriormente, la curva de respuesta es en función de la <i>corriente</i> y el <i>tiempo</i>; en cambio, la de excitación es en función del <i>voltaje</i> y el <i>tiempo</i>. <a target="_blank" href="https://en.wikipedia.org/wiki/Chronoamperometry" rel="noopener noreferrer nofollow">Fuente</a> de la imagen.](assets/Chronoamperometry.jpg)

## Voltametría cíclica

La [voltametría cíclica](<https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Instrumental_Analysis/Cyclic_Voltammetry>) (CV) es un tipo de medida [electroquímica](https://en.wikipedia.org/wiki/Electrochemistry) [potenciodinámica](https://en.wikipedia.org/wiki/Voltammetry) que mide la corriente que se desarrolla en una celda electroquímica en condiciones en las que el voltaje supera el predicho por la ecuación de Nernst. La CV se obtiene realizando ciclos en el potencial de un electrodo de trabajo y midiendo la corriente resultante. Para más información sobre la técnica se puede consultar la siguiente [página](<https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Instrumental_Analysis/Cyclic_Voltammetry>).

![Señal de excitación para realizar la voltametría cíclica (realizando dos ciclos). <a target="_blank" href="https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Instrumental_Analysis/Cyclic_Voltammetry" rel="noopener noreferrer nofollow">Fuente</a> de la imagen.](assets/CV_excitation_signal.jpg)

## Aplicación viSens-S

Para enviar y recibir la información del microcontrolador, hemos utilizado una aplicación de LabVIEW llamada **viSens-S**, la cual nos permite la comunicación con el microcontrolador tanto para enviar la selección del usuario (CA y CV y los respectivos parámetros) como para recibir los datos de la medida CA o CV. A continuación, dejamos el [repositorio](https://github.com/Albert-Alvarez/viSens-S/releases/latest) de GitHub para descargar la aplicación.

## Tabla de contenidos

- [Introducción](#top)
- [Objetivos](#objetivos)
- [Técnicas a implementar](#técnicas-a-implementar)
- [Desarrollo del proyecto](#desarrollo-del-proyecto)
- [Resultados obtenidos](#resultados-obtenidos)
- [Conclusiones](#conclusiones)

## Objetivos

- Programar un potenciostato con STM32CubeIDE.
- Realizar una cronoamperometría y una voltametría cíclica.
- Configurar el microcontrolador para recibir y entender los datos que envía la aplicación sobre la técnica escogida por el usuario.
- Permitir la comunicación bidireccional entre el microcontrolador y la aplicación viSens-S.
- Mostrar los datos captados a través de la aplicación viSens-S.
- Efectuar una verificación técnica utilizando un potenciómetro.
- Realizar un control de versiones con [Git](https://git-scm.com/) y [GitHub](https://github.com/).

## Técnicas a implementar

### Implementación cronoamperometría

Esta técnica consiste en la aplicación de un voltaje durante cierto intervalo de tiempo en la celda y el registro de la corriente resultante. La implementación de esta técnica se basa en fijar la tensión de la celda electroquímica a un valor concreto y realizar las medidas de V<sub>CELL</sub> y I<sub>CELL</sub> a diferentes tiempos, como podemos ver en el [diagrama de flujo](#diagrama-de-flujo-ca). Posteriormente solo se tienen que enviar los datos al _host_. Cada vez que se realiza una medición se debe enviar la siguiente información: **punto** en el que nos encontramos, **tiempo** en segundos en el que se realiza la medición y por último, el **voltaje** y la **intensidad** medidos, V<sub>CELL(REAL)</sub> y I<sub>CELL</sub> respectivamente.

#### Diagrama de flujo (CA)

El siguiente diagrama de flujo es el que hemos realizado para la implementación de la cronoamperometría.

![Diagrama de flujo de la función implementada para la cronoamperometría.](assets/imgs/ca-flow.png)

### Implementación de la voltametría cíclica

Técnica electroquímica, popularmente usada para investigar sobre los procesos de reducción y oxidación de especies moleculares. Como hemos visto anteriormente, en esta técnica el potencial del electrodo de trabajo (WE) es variado _linealmente_ respecto al tiempo, partiendo de un potencial inicial, hasta que el **primer potencial objetivo es alcanzado**. Seguidamente, se hace un barrido de potencial, linealmente, en el sentido opuesto para alcanzar el **segundo potencial objetivo**, pasando por el _potencial inicial_. Toda esa variación de potencial viene recogida en el eje de abscisas de una [figura típica de voltametría cíclica](https://www.ossila.com/pages/cyclic-voltammetry). El eje de ordenadas recoge la respuesta de este sistema al potencial aplicado, mediante el paso de corriente.

![Figura típica de voltametría cíclica. <a target="_blank" href="https://pubs.acs.org/doi/10.1021/acs.jchemed.7b00361" rel="noopener noreferrer nofollow">Fuente</a> de la imagen.](assets/CV_example.png)

En esta figura podemos observar, paso a paso, el comportamiento de esa voltametría. En la primera etapa (A) vemos como, aunque varíe el potencial, la corriente se mantiene estable. Cuando entramos en la etapa (B), la variación de corriente sufre un incremento exponencial por una pequeña variación de potencial. En la etapa (C) llegamos al pico de corriente y, hasta llegar a la (D), sufrimos un decrecimiento exponencial hasta llegar al primer potencial objetivo (D). Toda esta etapa corresponde al proceso de reducción, el Fc<sup>+</sup> gana electrones (e<sup>-</sup>) convirtiéndose en Fc.

Del punto (D) al punto (G), hacemos un barrido del primer al segundo potencial objetivo en un proceso inverso al descrito anteriormente. En ese tramo se lleva a cabo el proceso de oxidación. El Fc pierde un electrón, volviéndose Fc<sup>+</sup> + e<sup>-</sup>.

Finalmente, para entender el porqué de esa forma tan característica, nos remitimos a la **Ecuación de Nernst**, la cual describe el equilibrio entre dos especies.

$$
E=E^0+\frac{RT}{nF}\ln\frac{(\textrm{Ox})}{(\textrm{Red})}=E^0+2.3026\frac{RT}{nF}\log_{10}\frac{(\textrm{Ox})}{(\textrm{Red})}
$$

Si estudiamos el ejemplo concreto del ferrocenium (Fc+) y el ferrocene (Fc), reducción de un electrón, podemos reemplazar la ecuación anterior por la siguiente:

$$
E=E^0+\frac{RT}{F}\ln\frac{[\textrm{Fc}^+]}{[\textrm{Fc}]}=E^0+2.3026\frac{RT}{F}\log_{10}\frac{[\textrm{Fc}^+]}{[\textrm{Fc}]}
$$

La ecuación de Nernst nos proporciona una potente manera de predecir la respuesta del sistema delante de un cambio de concentraciones en las especias o un cambio de potencial en el electrodo potencial. Así pues, cuando el potencial es escaneado durante una voltametría cíclica, la concentración de las especies alrededor del electrodo varían en función del tiempo, de acorde a la ecuación de Nernst.

_[Fuente](https://pubs.acs.org/doi/10.1021/acs.jchemed.7b00361) de la información y de las fórmulas, consultar para más información sobre esta técnica._

#### Diagrama de flujo (CV)

El siguiente diagrama de flujo corresponde a la voltametría cíclica. Podemos ver como el flujo corresponde a la explicación previa del la técnica y como vamos variando `vObjetivo` a los diferentes vértices que hemos visto en la figura anterior. Cada vez que se realiza una medición, por tanto, que incrementamos V<sub>CELL</sub> con `eStep`, se debe enviar la siguiente información: **punto** en el que nos encontramos, **tiempo** en milisegundos en el que se realiza la medición y por último, el **voltaje** y la **intensidad** medidos, V<sub>CELL</sub> y I<sub>CELL</sub> respectivamente.

![Diagrama de flujo de la función implementada para la voltametría cíclica.](assets/CV_flux.png)

### Diagrama de flujo de la aplicación

El siguiente flujo muestra la operativa del usuario con la aplicación [viSens-S](https://github.com/Albert-Alvarez/viSens-S/releases/latest) y su interacción con nuestro dispositivo. El usuario configurará la aplicación e iniciará la medida para, entonces, ser el dispositivo el que tomará los diferentes puntos y los enviará a la aplicación.

![Diagrama de flujo de la aplicación.](assets/app-flow-nuestro.png)

### Diagrama de flujo del microcontrolador

Para el diagrama de flujo del microcontrolador, hemos creado un diagrama específico para nuestro código con la herramienta [draw.io](http://draw.io/).

![Diagrama de flujo del microcontrolador implementado en el proyecto.](assets/MICRO.png)

## Desarrollo del proyecto

Para el desarrollo del proyecto se han creado diversas ramas desde `develop/project` para cada una de las funcionalidades que queríamos implementar. A continuación, tenemos una lista con las diferentes ramas y su funcionalidad.

- **`develop/project`**: configuración del archivo `.ioc` y generación del código. Los cambios de configuración del archivo `main.c` y `.ioc` se realizaron desde esta rama.
- **`feature/stm32main`**: creación y configuración de las funciones `setup()` y `loop()`. En esta rama creamos los archivos `header` y `source` de _stm32main_ ubicado en la carpeta de **components**.
- **`feature/timer`**: gestión de la función ISR que se activa cuando el _timer_ completa un periodo. En esta rama creamos los archivos `header` y `source` del _timer_ ubicado en la carpeta de **components**.
- **`feature/chronoamperometry`**: gestión de la cronoamperometría. En esta rama creamos los archivos `header` y `source` de _chronoamperometry_ ubicado en la carpeta de **components**.
- **`feature/voltammetry`**: gestión de la voltametría cíclica. En esta rama creamos los archivos `header` y `source` de _cyclic_voltammetry_ ubicado en la carpeta de **components**.
- **`feature/prueba-crono`**: gestión de la cronoamperometría completa, gestionando el resto de _features_. En esta rama hemos juntado todas las ramas anteriores (excepto la de voltametría) y configurado esta técnica.
- **`feature/prueba-volta`**: tras completar el cronoamperometría en la rama anterior se ha realizado la gestión de la _voltametría cíclica_ completa, gestionando el resto de _features_. Esta rama se ha creado a partir de la rama anterior, por tanto encontramos también implementada la cronoamperometría. Sobre esta rama hemos configurado y completado la voltametría.

Por último, se han realizado varias ramas `feature/**` donde se han probado las funcionalidades juntas y se han corregido los diferentes errores de código. Cuando el código ha sido correcto, se ha implementado ese código en la rama `develop/project`.

La elaboración de los diferentes archivos se han realizado mayoritariamente a través de videollamadas por lo que los tres componentes del grupo han estado presentes en los diferentes _commits_ y _pull requests_ realizados en las ramas. Cada integrante ha realizado el diseño de cada rama _feature_ de manera teórica y de manera conjunta se han implementado en STM32CubeIDE teniendo en cuenta el diseño teórico de cada integrante del grupo.

### Componentes del proyecto

#### _Power management unit_

Este componente es la unidad de gestión de la potencia. Será el encargado de alimentar todo el _front-end_ durante las mediciones. Inicialmente deberá estar deshabilitada para evitar consumo de corriente y en el momento que el microcontrolador negocie con el ordenador un consumo máximo, esta se deberá de habilitar. Esta unidad se controlará a través del pin `EN` que veremos en la configuración.

#### Relé

Este componente será el encargado de cerrar y abrir nuestro circuito. Funciona como un interruptor entre el _front-end_ y el sensor. Cuando el relé esté abierto (estado por defecto), el circuito estará abierto y no habrá conexión (por lo que no se podrán hacer mediciones). Cuando queramos realizar una medición, deberemos cerrar el relé y, posteriormente, cuando finalice, volverlo a abrir. Esta unidad se controlará a través del pin `RELAY`.

#### Potenciostato y ADC

El potenciostato es el responsable de polarizar la celda electroquímica a una tensión V<sub>CELL</sub> y leer la corriente I<sub>CELL</sub> que circula por ella.

Además, utilizaremos el ADC del microcontrolador para leer la tensión real que estamos aplicando y para calcular V<sub>CELL</sub> y I<sub>CELL</sub>.

### Configuración del microcontrolador

| Pin | Alias |         Tipo         | Descripción                                                                                                     |
| :-: | :---: | :------------------: | :-------------------------------------------------------------------------------------------------------------- |
| PA0 | VREF  |  Entrada analógica   | Tensión absoluta del _Reference Electrode_ (RE) V<sub>REF</sub> utilizada para la medición de V<sub>CELL</sub>. |
| PA1 | ICELL |  Entrada analógica   | Tensión de salida del TIA utilizada para la medición de I<sub>CELL</sub>.                                       |
| PB8 |  SCK  | I<sup>2</sup>C (SCK) | Señal SCK del I<sup>2</sup>C. Con el bus I<sup>2</sup>C se controla el DAC del _front-end_.                     |
| PB9 |  SDA  | I<sup>2</sup>C (SDA) | Señal SDA del I<sup>2</sup>C. Con el bus I<sup>2</sup>C se controla el DAC del _front-end_.                     |
| PA5 |  EN   |    Salida digital    | Señal de (des)habilitación de la PMU.<br/>`0`: PMU deshabilitada.<br/>`1`: PMU habilitada.                      |
| PB5 | RELAY |    Salida digital    | Señal de control del relé.<br/>`0`: Relé abierto.<br/>`1`: Relé cerrado.                                        |

[Fuente](https://github.com/Biomedical-Electronics/masb-pot-s-nopucmes) de la tabla utilizada para configurar el microcontrolador.

### Funciones previas

- **STM32main:**

En el fichero `stm32main.c` hemos creado las funciones de `setup()` y `loop()`. Primeramente en el `setup` lo que haremos será habilitar la PMU y configurar la comunicación I<sup>2</sup>C, el potenciómetro y el DAC. Por otro lado, en la función `loop`, la cual se ejecutará de manera continua (ya que está dentro del bucle `while` en el archivo `main.c`), encontramos un condicional que en caso de recibir un mensaje entrará en el bucle. En función de qué comando se haya recibido, se entrará en un caso o en otro. Dentro de cada técnica, encontramos un primer comando de configuración, el cual nos permite pasar del valor en hexadecimal que envía la aplicación, y que recibimos, a los valores de cada variable que ha configurado el usuario. Esto lo realizamos haciendo una [decodificación en COBS](https://blog.mbedded.ninja/programming/serialization-formats/consistent-overhead-byte-stuffing-cobs/). Seguidamente, configuramos la técnica con los valores previamente obtenidos y obtenemos los valores. Ambas funciones se especificarán más adelante en la sección correspondiente a la [cronoamperometría](#función-para-la-cronoamperometría) y a la [voltametría cíclica](#función-para-la-voltametría-cíclica).

- **Timer:**

El archivo `timer.c` está formado básicamente por la función [ISR](https://en.wikipedia.org/wiki/Interrupt_handler). Cuando el microcontrolador recibe una interrupción, deja de ejecutar el código que esté procesando en ese momento y pasa a ejecutar el código que hayamos asociado a esa interrupción.

En nuestro caso hemos utilizado el _timer_ 2 (`TIM2`) el cual tiene un contador de 32 bits y nos permite no tener que configurar un [preescalado](https://www.prometec.net/timers/) y utilizar directamente un periodo de 84,000. Dentro de la función `Callback`, tenemos que, en función de la variable `estado`, entraremos en una parte del código u otra. En el caso de estar en la cronoamperometría, la variable estado será igual a `CA`, por lo que activaremos la medición de valores de la cronoamperometría como veremos más adelante. De la misma manera, si estamos realizando una voltametría, la variable `estado` será igual a `CV` por lo que activaremos esa medición.

### Función para la cronoamperometría

El desarrollo de la función para la cronoamperometría está basado en el diagrama de flujo anteriormente mostrado. Como ya se ha explicado anteriormente, en la cronoamperometría medimos la intensidad de corriente que pasa a través de una celda tras haberle fijado un voltaje. Como no estamos en un dispositivo perfecto e ideal, este voltaje que hemos enviado tendrá pequeñas variaciones, por tanto es importante medirlo para saber el valor real. Este voltaje se mide utilizando el ADC del microcontrolador. El valor medido se obtiene aislando V<sub>señal</sub> de la siguiente fórmula.

$$
\textrm{ADC}_{\textrm{valor}}=\frac{V_{\textrm{señal}}}{V_\textrm{ref}}\left( 2^\textrm{bits}-1\right)
$$

Nuestro microcontrolador tiene una resolución de 12 bits, por lo que la fórmula se puede expresar de la siguiente manera:

$$
V_\textrm{señal}=\frac{\textrm{ADC}_\textrm{valor}V_\textrm{ref}}{2^\textrm{bits}-1}
$$

Con V<sub>señal</sub>, podemos calcular el Voltaje en la celda usando la siguiente fórmula:

$$
V_\textrm{CELL}=2\left(1.65-V_\textrm{ADC0}\right)
$$

siendo

$$
V\textrm{señal}=V_\textrm{ADC}
$$

Y la intensidad de corriente viene definida por la siguiente fórmula:

$$
I_\textrm{CELL}=\frac{2\left(V_\textrm{ADC}-1.65\right)}{R_\textrm{TIA}}
$$

Sin embargo, V<sub>ADC</sub> en V<sub>CELL</sub> no es lo mismo que V<sub>ADC</sub> en I<sub>CELL</sub>, por lo que hay que medir dos valores distintos y usar el ADC<sub>value</sub> correspondiente para cada uno. Tras esta idea general del funcionamiento de la cronoamperometría, vayamos a ver su implementación real. Para ello hemos utilizado una interrupción del _timer_, incluida en el archivo `timer.c`, y dos funciones que se encuentran en el archivo `chronoamperometry.c`.

En la interrupción controlamos únicamente una variable que es la encargada de iniciar la medida de la cronoamperometría. Las dos funciones son `Chronoamperometry_Config` y `Chronoamperometry_Value`. En la primera se cierra el relé, se configura el ADC, el _timer_, se fija el valor de V<sub>CELL</sub> como eDC y se envía la petición de hacer una cronoamperometría. Por otro lado, en la segunda función se llevan a cabo todas las mediciones. Para ello es necesario, primero de todo, detectar el tiempo total de medida pedido por el usuario. A continuación, se inicia la conversión y se mide V<sub>CELL</sub> e I<sub>CELL</sub>. Tras ello, enviamos el punto inicial, que corresponde a tiempo 0, y los valores medidos de V<sub>CELL</sub> e I<sub>CELL</sub>; e iniciamos el _timer_. Tras el envío, sumamos un punto a `pointCA`. Esta variable se encarga de controlar el número de puntos pedidos por el usuario. Además, al enviar cada punto y, por tanto, cumplir un periodo, se sumará un `samplingPeriod` a la variable `counter`.

Para el resto de medidas es necesario hacer un bucle `while`, el cual se mantendrá activo hasta que la variable de control llamada `counter` sea superior al tiempo total de medida configurado por el usuario. Dentro de este bucle `while` encontramos una sentencia `if` que se activa si la variable bandera es `TRUE`. Esta variable únicamente es así cuando se activa la **función ISR** del _timer_. En él encontramos, una vez más, las funciones que inician la conversión, las medidas de V<sub>CELL</sub> e I<sub>CELL</sub>, y su envío al host.

### Función para la voltametría cíclica

El desarrollo de la función, en este caso, está basado en el **workflow** de la voltametría cíclica y en el propio concepto de voltametría en sí. Es decir, en términos generales, pretendemos dar un voltaje inicial al electrodo de trabajo (WE), hacer un barrido creciente de voltaje hasta llegar al potencial objetivo 1 (`eVertex1`) y, una vez ahí, hacer un barrido decreciente de voltaje hasta llegar al potencial objetivo 2 (`eVertex2`). Finalmente, de ahí volver a hacer un barrido creciente de potencial hasta llegar al objetivo. Este procedimiento lo repetiremos tantas veces como ciclos nos indique el usuario. Y los datos serán enviados al _host_ cada vez transcurra el _sampling period_ indicado, por lo que activaremos el sensor y este nos devolverá la medida de V<sub>CELL</sub> y I<sub>CELL</sub>.

Esto a modo de idea general. Haciendo el barrido de potencial indicado, si el funcionamiento es el esperado, obtendremos la típica curva tan característica de la voltametría cíclica. Pero vamos por partes, que probablemente se va a entender mejor. Dentro de la rama creada bajo el nombre de **`feature/voltammetry`**, hemos definido dos funciones distintas dentro del fichero **`cyclic_voltammetry.c`**, que puede encontrarse en el directorio `../Core/Src/components`.

La primera es una función llamada _Voltammetry_Config_ que pretende ejecutarse una única vez una vez el _host_ envía la indicación de que desea realizar una voltametría cíclica. Dentro de esta, cerramos el relé para poder llevar a cabo las distintas mediciones, fijamos el valor de V<sub>CELL</sub> al voltaje inicial deseado por el usuario (`eBegin`) y definimos el período de muestreo del _timer_ como el cociente entre `eStep` y `scanRate`.

La segunda función _Volatmmetry Value_ es la que engloba la mayor parte del proceso, donde se va a llevar a cabo el barrido de potencial y donde se tomarán las distintas medidas que se enviarán al _host_. Empezamos inicializando el _timer_ fijando el V<sub>CELL</sub> a eBegin y el voltaje objetivo al deseado por el usuario (introducido como _input_ en eVertex1). Definimos también una variable llamada measure como `FALSE`. Esta nos permitirá obtener el control sobre cada vez que el _timer_ se active y realice una medida. Cerramos el relé y empezamos la voltametría. Cada vez que transcurre el _sampling period_, medimos V<sub>CELL</sub> y I<sub>CELL</sub> y enviamos los datos al _host_. Mientras V<sub>CELL</sub> no sea igual al potencial objetivo definido, aplicamos un incremento eStep. Vamos procediendo de este modo hasta llegar al potencial objetivo. Una vez llegado a este punto, fijamos como nuevo objetivo `eVertex2` (definido también por el usuario cómo _input_). Tomamos medidas y aplicamos variaciones eStep cada vez que transcurre el _sampling period_ hasta llegar a `eVertex2`, dónde definimos como objetivo eBegin. Llegados a eBegin, si se ha llegado al número de ciclos definido como _input_, paramos la medida y abrimos el relé. En caso contrario, procedemos a un nuevo ciclo siguiendo el mismo procedimiento descrito anteriormente.

## Resultados obtenidos

Se ha realizado la implementación de ambas técnicas utilizando un potenciómetro, una validación técnica previa a la prueba final y, por último, se han realizado diversas mediciones para validar el proyecto en una muestra de [ferricianuro de potasio](https://es.wikipedia.org/wiki/Ferricianuro_de_potasio) a diferentes concentraciones en un tampón (_buffer_) de [cloruro de potasio](https://es.wikipedia.org/wiki/Cloruro_de_potasio). A continuación, se pueden revisar los resultados que hemos obtenido en ambas técnicas:

### Cronoamperometría

- Potenciómetro

Realizando una medición cada 500 ms y variando el valor del potenciómetro obtuvimos los siguientes resultados:

![Resultados cronoamperometría con un potenciómetro.](assets/Resultados_Crono.png)

- Validación técnica

Realizando una medición cada 100 ms y fijando una tensión de V<sub>CELL</sub> de 0.5 V, hemos obtenido los siguiente resultados, donde la corriente estaba entorno a 2.3 &micro;A.

![Resultados cronoamperometría con una celda Randles de calibración.](assets/Resultados_CA_validacion.png)

- Resultados con una muestra de ferricianuro de potasio a diferentes concentraciones en un tampón de cloruro de potasio

Por último, se realizó la prueba final efectuando ambas mediciones en una solución de ferricianuro de potasio a dos concentraciones diferentes en un tampón de cloruro de potasio. A continuación, podemos ver la placa con la que se han realizado las mediciones y los gráficos de la cronoamperometría obtenidos. El gráfico del medio corresponde a una concentración 1 mM y el de la derecha a una concentración 5 mM.

![Resultados cronoamperometría con muestra real.](assets/Resultados_CA_final.png)

### Voltametría cíclica

- Potenciómetro

También hemos realizado la prueba para ver si el envío de puntos y el _timer_ funcionaban correctamente. En la siguiente imagen podemos ver las condiciones de ambas pruebas y los resultados que hemos obtenido. Como podemos ver, ambas pruebas tienen una configuración diferente y realiza todos los puntos.

![Resultados voltametría cíclica con un potenciómetro.](assets/Resultados_Volta.png)

- Validación técnica

De la misma manera, también se ha realizado una validación técnica de la voltametría cíclica, fijando el punto inicial a 0 V, el vértice 1 a 0.6 V, el vértice 2 a -0.6 V y dos ciclos. Los resultados obtenidos son los siguientes donde vemos que el potencial llega a ambos vértices de la voltametría y para ambos ciclos los resultados son muy similares.

![Resultados voltametría cíclica con una celda Randles de calibración.]assets/Resultados_Crono.png()

- Resultados con una muestra de ferricianuro de potasio a diferentes concentraciones en un tampón de cloruro de potasio

Por último, se realizó la prueba final efectuando ambas mediciones en una solución de ferricianuro de potasio a dos concentraciones diferentes en un tampón de cloruro de potasio. A continuación, podemos ver la placa con la que se han realizado las mediciones y los gráficos de la voltametria cíclica obtenidos. El gráfico del medio corresponde a una concentración 1 mM y el de la derecha a una concentración 5 mM. Los gráficos corresponden a 3 cíclos.

![Resultados voltametría cíclica con muestra real.](assets/Resultados_CV_final.png)

## Conclusiones

En este proyecto se ha implementado con éxito la programación de un potenciostato con STM32CubeIDE para llevar a cabo la ejecución de una **cronoamperometría** y una **voltametría cíclica**. Para realizar ambas técnicas, se ha configurado el microcontrolador de la placa de evaluación STM32 Nucleo-F401RE para recibir y entender los datos que envía el usuario a través de la aplicación viSens-s, permitiendo así una comunicación bidireccional entre el microcontrolador y esta. Los datos captados en la ejecución de las técnicas se han enviado a la aplicación, la cual muestra tanto los datos _raw_ como una representación gráfica de los resultados. Para permitir la comunicación entre el microcontrolador y la aplicación, se ha realizado la codificación y decodificación de la información a través del **protocolo de comunicación COBS**.

En este proyecto, hemos tenido la oportunidad de desarrollar gran parte de los conocimientos adquiridos a lo largo de la asignatura para la programación de microcontroladores. A lo largo del proyecto se han utilizado diversos periféricos del microcontrolador como los _timers_, con sus respectivas **interrupciones**, los GPIOs, la comunicación serie síncrona (I<sup>2</sup>C) y asíncrona (UART) y los conversores analógicos digitales (ADCs) para la realización de aproximaciones discretas.

Para la coordinación del trabajo entre los distintos miembros del grupo, se ha usado la herramienta Git y la plataforma GitHub, donde se ha llevado a cabo el desarrollo del proyecto a través de la creación de distintas ramas. Además, también nos ha permitido tener un control de las versiones de nuestro código y poder trabajar en paralelo desarrollando diferentes ramas.

Por último, se han realizado diversas pruebas tanto con una placa de pruebas como con un potenciostato para realizar una verificación técnica previa a la implementación final. Las diversas pruebas han tenido un resultado satisfactorio y han realizado correctamente ambas técnicas.
