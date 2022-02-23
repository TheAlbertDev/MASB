---
project: 'potentiostat'
students:
  - name: 'Lucía Chacón'
    picture: 'assets/imgs/LUCIA-CHACON-CARRACEDO.jpg'
  - name: 'Celia Sánchez'
    picture: 'assets/imgs/CELIA-SANCHEZ-LAORDEN.jpg'
repo: 'https://github.com/Biomedical-Electronics/masb-pot-s-datablondies'
date: 2021-06-18
language: 'es'
title: 'Proyecto: potenciostato'
---

En el presente documento se detalla la programación de un potenciostato portable para poder realizar dos tipos de mediciones electroquímicas: voltametría cíclica y cronoamperometría. En este proyecto se ha realizado el **control** de un potenciostato a través de un **microcontrolador**. El microcontrolador es una herramienta muy útil que nos va a permitir conectar el potenciostato a un **ordenador** que actuará como interfaz de usuario para que este pueda hacer cambios en el sistema y a la vez visualice los resultados. Los objetivos específicos se describen en la siguiente sección.

## Contenidos

- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Diseño](#diseño)
- [Resultados](#resultados)

## Introducción

Con los avances en miniaturización, es posible diseñar complejos **SoC** (Systems-on-Chip) en espacios reducidos, y obtener dispositivos portátiles con un gran impacto en el _healthcare_. Para ello, los biopotenciostatos son de las partes más importantes que componen un **biosensor**. Este controla una celda compuesta de tres electrodos: el **electrodo de trabajo** (WE), **el de referencia** (RE), y un **electrodo auxiliar** (AUX). El circuito mantiene el potencial del electrodo de trabajo a un nivel constante con respecto al potencial del electrodo de referencia, mediante el ajuste de la corriente en el electrodo auxiliar.

Este componente es fundamental para aquellos **estudios electroquímicos** con sistemas de tres electrodos empleados en el estudio de reacciones redox y otros fenómenos químicos.

Una de estas medidas electroquímicas es la **voltammetria cíclica** (CV), un tipo de medición potenciodinámica, es decir, dónde se aplica un potencial variable a una celda electroquímica. Por otro lado, se mide la corriente que esta celda proporciona y se representa frente al voltaje aplicado. El potencial se mide entre el electrodo de trabajo y el electrodo de referencia, mientras que la corriente se mide entre el electrodo de trabajo y el auxiliar. El potencial del electrodo aumenta linealmente en **función del tiempo** en las **fases cíclicas** hasta que alcanza un valor y cambia de dirección. Este mecanismo se denomina **barrido triangular** de potencial y se puede ver representado en la siguiente figura. La tasa de cambio de voltaje a lo largo del tiempo durante cada una de estas fases se conoce como **velocidad de exploración** (V/s).

![Señal triangular de excitación de la CV.](assets/triangular-excitation-CV.png)

La otra medida tratada en este proyecto es la **cronoamperometría** (CA). En esta se aplica un **señal escalón**, elevando el valor del potencial a una tal que ocurre una reacción redox. Y entonces, se mide la **variación de la respuesta** de la corriente en función del **tiempo**.

Con tal de entender el proyecto, se darán cuatro pinceladas de los componentes del circuito _e-Reader_ (_PMU_, _front-end_, microcontrolador y unidad de visualización) del potenciostato que se acompañarán con un esquema del circuito _front-end_. En este esquema no se detalla ni la fuente de alimentación ni el sensor, en nuestro caso uno de tres electrodos. Como podemos contemplar en la siguiente figura, la **PMU** extrae alimentación de la fuente y la convierte en los señales de control y de suministro de voltaje. Al mismo tiempo el **_front-end_** obtiene las medidas. El voltaje de salida del _front-end_ es procesado por el **microcontrolador** y se envía a la interfaz de **LabVIEW _viSens-S_** en nuestros ordenadores.

El _front-end_ se encarga de estabilizar la diferencia de voltaje entre los electrodos de la celda electroquímica y leer/procesar la señal de salida. El voltaje de regulación (V<sub>LDO</sub>) alimenta los componentes analógicos del _front-end_. Tal y como vemos en el circuito, el primer amplificador es un op-amp que se usa como control. Este proporciona al sensor el V<sub>IN</sub> ajustado con un divisor de tensión (R1 y R2). También nos encontramos con un amplificador _buffer_. Este lo utilizamos para aislar. El V<sub>OCV</sub> es controlado por el ADC del microcontrolador y aplicado a CE (en la celda) como referencia. En el momento de tomar la muestra el relé (_switch_) se cierra. Y el TIA (amplificador de transimpedancia) genera la señal de salida, a través de la R<sub>TIA</sub>, que es proporcional a la corriente en la celda [[1]](https://doi.org/10.3390/s19173715).

![Block diagram del <i>e-Reader</i>.](assets/front_end.png)

## Objetivos

- Programar un potenciostato portable.
- Controlar la _Power Management Unit_ (PMU) del módulo _front-end_ del potenciostato.
- Mandar y recibir datos desde el potenciostato.
- Obtener señales del _timer_ para controlar los tempos.
- Generar interrupciones en la secuencia de acciones.
- Convertir señales analógicas en digitales y viceversa.
- Comunicarse con la aplicación viSens-S instalada con el _host_ u ordenador mediante el protocolo MASB-COMM-S.
- Testear la voltametría cíclica.
- Testear la cronoamperometría.
- Implementar la _branching policy_ para el control de versiones.

## Diseño

Para cada funcionalidad descrita se ha configurado una herramienta del microcontrolador:

- **USART**: permite recibir/enviar datos a través de los puertos habilitados.

![Configuración de la USART.](assets/USART.png)

Seleccionamos _modo asíncrono_ en el campo `Mode` y en la parte inferior seleccionamos los **parámetros de la comunicación**: _baud rate_, _bits de datos_, _paridad_, _número de bits de stop_ y _oversampling_ (lo dejamos en 16 muestras).

- **I<sup>2</sup>C**: protocolo de transmisión de información.

![Configuración de I<sup>2</sup>C.](assets/I2C.png)

Asignaremos a PB8 y PB9 las funciones I2C_SCL (Serial Clock) y I2C_SDA (Serial Data), respectivamente.

- **TIMERS**: relojes que generan interrupciones cada ciertas unidades de tiempo.

![Configuración del <i>timer</i> 3.](assets/TIMERS.png)

Si el _timer_ opera con una frecuencia de 84 MHz, como se indica en la _Clock Configuration_, tenemos que dejar que el _timer_ cuente hasta 84,000,000 para que pase 1 segundo. En el campo _Counter Period_ solo podemos poner un número de máximo 16 bits (lo que equivale a como máximo 65,535). La alternativa es bajar la frecuencia del _timer_ pero sin tocar el reloj (APB2). Para evitar tener que modificar el _preescaler_, tomamos una frecuencia de un período divisor de 1 ms. Con un _preescaler_ de 8,399, se obtiene una frecuencia de reloj de 10 kHz. En otras palabras, cada incremento del temporizador es de 0.1 ms. Tal y como hemos dicho, el _Counter Period_ es de 16 bits (en el caso de TIM3). Por la tanto, se puede contar de 0 a 65,535 segundos con una resolución de 0.1 ms.

Configurado el periodo, en la pestaña _NVIC Settings_ del mismo formulario de configuración y habilitamos la interrupción _TIM3 global interrupt_.

En otra sección, veremos cómo configuramos el _timer_ para cada prueba electroquímica mediante el uso de unas fórmulas que contienen valores determinados por el usuario como por ejemplo el _sampling rate_.

- **ADC y GPIO**: pines programables de entrada/salida. Las entradas son analógicas y las salidas digitales.

![Entradas analógicas.](assets/analog_input.png)

Para las entradas analógicas utilizamos el ADC. _Analog-to-Digital Converter_ es un periférico fundamental que convierte una señal de tensión continua a una señal digital realizando una discretización y una cuantificación de la señal continua. De ADC solo hay uno. Pero ese único ADC puede convertir la señal de cada uno de sus canales alternando entre ellos. Por ejemplo, la nomenclatura ADC1_IN0 indica que se trata del canal 0 del ADC 1. Las librerías HAL nos permiten operar el ADC y obtener el valor resultante.

Las salidas digitales se configuran así:

![Salidas digitales.](assets/GPIO_output.png)

Y haciendo uso de las librerías _HAL_ las controlamos.

## Operativas del proyecto

A continuación, se muestran las operativas tanto de la voltametría cíclica, cronoamperometría y main del stm32:

- Función CA_firstMeasure de la cronoamperometría:

![Función CA_firstMeasure de la cronoamperometría.](assets/CA_firstMeasure.png)

- Función CA_testing de la cronoamperometría:

![Función CA_testing de la cronoamperometría.](assets/CA_testing_castellano.png)

- Función CV_firstMeasure de la voltametría:

![Función CV_firstMeasure de la voltametría.](assets/CV_firstMeasure_castellano.png)

- Función CV_testing de la voltametría:

![Función CV_testing de la voltametría.](assets/CV_testing_castellano.png)

- Función setup del archivo stm32.main:

![Función setup del archivo stm32.main.](assets/setup_caastellano.png)

- Función loop del archivo stm32.main:

![Función loop del archivo stm32.main.](assets/loop_castellano.png)

## Resultados

En total, se han realizado dos pruebas en diferentes sesiones. En la primera, se ha testeado el sistema con la siguiente configuración de diodos:

![Conexionado de la celda para el primer testing: diodos.](assets/circuit_diode.png)

En la siguiente imagen, se puede observar el _setup_ del día de la primera prueba:

![<i>Setup</i> para el primer testing: diodos.](assets/TEST1.jpeg)

### Voltametría cíclica de diodos

Los valores introducidos por el usuario se leen en la siguiente tabla:

| Variable |  Value   |
| :------: | :------: |
|  eBegin  |  0.25 V  |
| eVertex1 |  0.5 V   |
| eVertex2 |  -0.5 V  |
|  cycles  |    2     |
| scanRate | 0.01 V/s |
|  eStep   | 0.005 V  |

![Voltametría cíclica con vértice 1 mayor a vértice 2.](assets/diode_CV_1.png)

Se ha comprobado que la nueva funcionalidad que permite un valor para el vértice 2 mayor al del vértice 1 funciona.

![Voltammetría Cíclica con vértice 2 mayor a vértice 1.](assets/diode_CV_2.png)

A continuación, se muestran los resultados del segundo test. En la siguiente imagen podemos ver el _setup_.

![<i>Setup</i> para el segundo testing: sensor y placa.](assets/TEST2.jpeg)

### Cronoamperometría de diodos

Los valores introducidos por el usuario se leen en la siguiente tabla:

|     Variable     | Value |
| :--------------: | :---: |
|       eDC        | 0.3 V |
| samplingPeriodMs | 10 ms |
| measurementTime  | 120 s |

![Voltametría cíclica con vértice 1 mayor a vértice 2.](assets/diode_CA.png)

### Voltametría cíclica prueba electroquímica

Finalmente, el dispositivo ha sido validado haciendo mediciones con una muestra de ferricianuro de potasio a diferentes concentraciones en un tampón/buffer de cloruro de potasio. Los valores introducidos por el usuario se leen en la siguiente tabla:

| Variable |  Value   |
| :------: | :------: |
|  eBegin  |  0.0 V   |
| eVertex1 |  0.6 V   |
| eVertex2 |  -0.6 V  |
|  cycles  |    2     |
| scanRate | 0.01 V/s |
|  eStep   | 0.005 V  |

Para la concentración de 1 mM de tampón:

![Voltametría cíclica para concentración 1 mM.](assets/CV1.png)

Para la concentración de 5mM de tampón:

![Voltametría cíclica para concentración 5 mM.](assets/CV5.png)

### Cronoamperometría prueba electroquímica

Los valores introducidos por el usuario se leen en la siguiente tabla:

|     Variable     |  Value  |
| :--------------: | :-----: |
|       eDC        | 0.150 V |
| samplingPeriodMs |  20 ms  |
| measurementTime  |  10 s   |

Para la concentración de 1 mM de tampón:

![Cronoamperometría para concentración 1 mM.](assets/CA1.png)

Para la concentración de 5 mM de tampón:

![Cronoamperometría para concentración 5 mM.](assets/CA5.png)
