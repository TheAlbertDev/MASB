---
project: 'potentiostat'
students:
  - name: 'Julia Meca'
    picture: 'assets/imgs/julia.jpg'
  - name: 'Raimon Casamitjana'
    picture: 'assets/imgs/raimon.jpg'
repo: 'https://github.com/Biomedical-Electronics/masb-pot-s-blaugrana'
date: 2021-06-18
language: 'en'
title: 'Final project microcontrollers: configuration of a potentiostat'
---

This project has been developed in the subject of **Microcontrollers for Biomedical Applications and Systems**, from the Biomedical Engineering Degree at the University of Barcelona (UB). It has been carried out by the **BlauGrana** group, formed by Julia Meca (left) and Raimon Casamitjana (right), and with the help of our professor Albert Álvarez, to whom we are very grateful. :yum:

<p align="center">
  <img src="assets/imgs/julia.jpg" alt="Julia" width="250" />
  <img src="assets/imgs/raimon.jpeg" alt="Raimon" width="250" />
</p>

> **Figure 1:** Julia Meca (left) and Raimon Casamitjana, authors of this project.

In this document you will find the necessary contents to carry out and understand the project, which consists on the **configuration of a microcontroller to perform electrochemical tests using a potentiostat**. From the programming code we have developed, chronoamperometries and cyclic voltammetries can be performed in an automatized way.

## Contents

- [Introduction](#introduction)
  - [Potentiostat](#potentiostat)
  - [Chronoamperometry](#chronoamperometry)
  - [Cyclic voltammetry](#cyclic-voltammetry)
- [Goals of the project](#goals-of-the-project)
- [Software and Hardware](#software-and-hardware)
- [Front-end modules](#Front--end-modules)
- [Git and GitHub](#git-and-github)
  - [Development branches](#Development-branches)
- [Procedure](#procedure)
  - [Pinout](#pinout)
  - [Flow diagrams](#flow-diagrams)
    - [viSens-S and the communication](#viSens-S-and-the-communication)
    - [Chronoamperometry](#chronoamperometry)
    - [Cyclic voltammetry](#cyclic-voltammetry)
    - [Microcontroller](#microcontroller)
- [Results](#results)
  - [Initial tests](#initial-tests)
  - [Final validation](#final-validation)
- [Conclusions](#conclusions)
- [References](#references)

## Introduction

Within the Blaugrana team, Júlia Meca and Raimon Casamitjana have carried out the project documented in this report. This has been developed in the framework of the last course of Biomedical Engineering, in the subject of Microcontrollers for Biomedical Applications and Systems. In a nutshell, the project is based on the programming of a potentiostat. More specifically, this consists of a _front-end_ properly designed for use in the project, as well as a _back-end_ composed of the **STMelectronics NUCLEO-F410RE** evaluation board.

### Potentiostat

A potentiostat is an instrument widely used in electrochemical experiments such as potentiometry, an analytical method that **measures the potential difference between electrodes immersed in a solution.** In these experiments, a source of constant potential difference is required: the potentiostat, which controls the voltage at one or more **working electrodes** with the help of a **reference electrode** and an **auxiliary electrode**.

The electrodes must be in direct contact with the substance to be tested, but they must not interfere with the chemical process, otherwise the test would not be valid. In addition, the size of the electrodes affects the amount of current passing through them, so it must be meticulously designed.

Regarding its operation, the potentiostat is in charge of measuring and controlling the potential of the electrochemical cell, detecting changes in its resistance (R) and varying the intensity of the current administered (I) to the system according to these fluctuations, so that the potential difference remains constant.

### Chronoamperometry

Chronoamperometry (CA) [1] is a type of electrochemical measurement based on subjecting a **working electrode** to an instantaneous potential change, usually by means of a **step signal**. In this way, the response of the current or intensity of the electrochemical cell can be studied over time.

This technique is commonly used to obtain a determined activity of a biological species given the quantification of an analyte of interest in the form of an intensity signal [2].

First, the cell is maintained at a potential at which no faradaic process occurs so that, when a given potential is applied, an oxidation-reduction reaction of the electroactive species present in the solution occurs. In this way, a certain intensity is finally obtained by circulating. A chronoamperometry corresponds to a figure such as the following in which, after an application of voltage in the form of a step signal, the current is evaluated over time:

<p align="center">
  <img src="assets/imgs/CA_plots.jpg" alt="CA plot" width="400" />
</p>

> **Figure 1:** Typical plot of the Chronoamperometry.

In addition, this technique does not require labeling of the compound to be characterized.

### Cyclic Voltammetry

Voltammetry [3] is an electrochemical technique that consists on applying an electric potential to a **working electrode**, which is immersed in a solution containing an electro-active species. Then the current intensity (I) flowing through the electrode is measured.

**Cyclic voltammetry**, on the other hand, is used to study reaction mechanisms such as redox processes. The variation of potential at a **stationary electrode** is caused by a triangular-shaped signal that reverses and returns to its original value, giving rise to the typical shape of the CV.

The current is plotted against the voltage applied to the electrochemical cell. The voltage is swept up and down across a range of values to successively drive the opposite directions on an electrolysis reaction. The final plot looks like the next image:

<p align="center">
  <img src="assets/imgs/CV_plot.jpg" alt="CV plot" width="300" />
</p>

> **Figure 2:** Typical plot of the cyclic voltammetry.

## Goals of the project

The objective of the project is to obtain concentration measurements in samples of **potassium ferricyanide** at different concentrations in a **potassium chloride** buffer. We have left some links to go deeper into these chemical compounds. These electrochemical measurements are based on the 2 types previously described: chronoamperometry and cyclic voltammetry.

Therefore, the objectives can be summarized as follows:

- Program a potentiostat using the STM-32 Núcleo 64 Evaluation Board.
- To perform a measurement using cyclic voltammetry (CV).
- To perform a measurement using chronoamperometry (CA).
- Control the power management unit (PMU) of the _front-end_ module.
- To communicate with the **viSens-S** application using the [**MASB-COMM-S**](https://github.com/Biomedical-Electronics/masb-pot-s-blaugrana/blob/master/Docs/protocolo-de-comunicacion.md) protocol.

In addition, certain specific requirements have to be fulfilled for the correct implementation. As far as the PMU is concerned, it must be started at the beginning of the measurement and not be disabled again. Moreover, the communication must be done with the host by means of an **asynchronous communication with 115200 8N1** configuration. The types of configuration as well as their parameters and meaning can be found in this link. The encoding of the information must also be done in **COBS**, where the character 0x00 implies the completion of the message to be sent. As for the microcontroller and its function, it must act as a slave of the master, and follow the instructions on the measurements to be made reflected in the [MASB-COMM-S](https://github.com/Biomedical-Electronics/masb-pot-s-blaugrana/blob/master/Docs/protocolo-de-comunicacion.md) protocol. Also, when the corresponding instruction is sent, the microcontroller must start the measurement.

Another aspect to take into account is when a measurement is not being taken. In that case, the relay of the _front-end_ circuit that connects to the _Counter Electrode_ (CE) must remain open.

As for the programming in the STM environment in particular, this has been done in such a way that 2 functions setup and loop are created in order to simplify the code and thus free the main execution file `main.c`.

## Software and hardware

As discussed in previous sections, the project is based on a measurement _front-end_ as well as the control _back-end_. For this reason, both hardware and software are vital for the development of the project and its proper programming.

As far as the microcontroller is concerned, its programming is of crucial importance given its essential role in the communication and control of the potentiostat as well as for the reception of measurement instructions, data and its pertinent sending. The STM32F4021 Núcleo-64 board has been used for this project, so its programming has also been carried out with its relevant software in C language: **STM32CubeIDE.**

The STM board has incorporated certain peripherals, which have been used for the realization of this project. They are the case of the `USART` peripheral, for the communication with the _host_ (the _viSens-S_ application), and of I2C for the communication with the _front-end_ DAC at the time of establishing its output voltage and polarizing the cell. Also noteworthy is the use of digital outputs to open/close the relay as well as to activate the PMU. Finally, the use of the microcontroller's ADC takes a leading role in reading the voltage and determining the cell current.

The project also revolves around the _viSens-S_ desktop application (which can be found at this link). Its function is to send the relevant instructions to perform the measurements, as well as the receipt of the data and its corresponding visualization. Here you can find a video showing the application in more detail. Since the tests could not be performed directly in the cell, the use of a potentiometer on the board has been key to determine the correct operation of the implemented communication and the taking of measurements. By means of its voltage divider and the connection of its variable terminal to the analog input of the microcontroller, it has been possible to verify the correct operation of the system.

## _Front-end_ modules

This section explains in more detail the components of the _front-end_ of the potentiostat controlled by the microcontroller and their function. This is essential in order to be able to implement the programming in detail, and to take into account some of the formulas for certain variables of the prototypes used.

- **Power Management Unit (PMU)**

  The PMU is the power management unit (it powers the _front-end_). By default it is disabled and therefore it has to be enabled at startup. By means of the microcontroller we must enable its power supply on the `EN` pin, which must have a `HIGH` status.

- **Relay**

  The _front-end_ circuit is connected or disconnected from the cell by opening the relay. When the relay is open, no connection is possible and therefore no measurements are performed. This is its default setting. Therefore, when a measurement is to be made, the relay must be closed and reopened at the end. Its control is on the `RELAY` pin.

- **Potentiostat**

  As previously mentioned, the potentiostat is in charge of polarizing the cell to a certain voltage (_Vcell_) in order to read a current (_Icell_).

  In our case, the polarization is given by a DAC (_Digital to Analog Converter_) **MCP4725**. Its communication can be given with I2C to address `1100000` to determine the voltage to be set. It can generate a voltage from 0 to 4V. In addition, this unipolar signal is followed by a stage to generate both positive and negative voltages, i.e. from - 4 to 4V. It is important to note the formula that relates the output voltage of the DAC to the cell voltage _Vcell_:

  <p align="center">
    <img src="assets/imgs/vdac.jpg" alt="Vdac" width="250" />
  </p>

  > **Ecuation 1:** Calculation of Vdac.

However, this voltage cannot be taken as known exactly. This is why the ADC of the microcontroller can read **Vadc**, which is measured by the **_reference electrode (RE)_** and is then fed through a circuit that converts the **bipolar** signal into **unipolar** again. Given this consideration, the voltage measured by the ADC and that of the cell are related as follows:

<p align="center">
  <img src="assets/imgs/vcell.jpg" alt="Vcell" width="320" />
</p>

> **Ecuation 2:** Calculation of Vcell.

Finally, the cell current is measured thanks to the use of a **transimpedance amplifier (TIA),** which contains a 10 kΩ resistor. In this case the signal is also converted to unipolar by passing through a converter. Therefore, the current is defined as follows:

<p align="center">
  <img src="assets/imgs/icell.jpg" alt="Icell" width="300" />
</p>

> **Ecuation 3:** Calculation of Icell.

All of the above formulas must be used in the program in order to correctly determine the voltages and currents set and measured in the cell.

## Git and GitHub

To carry out projects based on team code development, there are two very useful tools: Git and GitHub. **Git** is a version control system (VCS) while **GitHub** is a website that provides an infrastructure to the Git server and hosts all its repositories, as well as different tools to work with them.

A version control system is a tool that allows us to collaborate with other developers or users of a project without the danger of them overwriting each other's work. In addition, it allows us to go back to previous versions of the code since, as we have said, they are not overwritten once saved.

### Development branches

To work in a more organized way and not overwrite files, it is common to create separate versions of the code (called **branches** in Git) and then merge it with the **master** version when we have finished editing it. If we look at the following image, the new changes would be tested in the `feature` branches and, once confirmed, they would be added to the `develop` branch and, finally, to the `master` branch.

<p align="center">
  <img src="assets/imgs/branches.JPG" alt="Branches" width="350" />
</p>

> **Figure 3:** Example of development branches in a Git project.

A commonly chosen option is for each developer to create his own branch and edit the overall project from it. In the case of our project, the different branches have been created according to their functionality, i.e. a branch was created for chronoamperometry, a branch for cyclic voltammetry, a branch for ADC communication, etc. We will now proceed to describe each of these branches:

- **Master:** in this branch we will find, at the end of the project, the code to be delivered. That is to say, until the last, the `feature` and `develop` branches will not be merged with the `master` branch.
- **Develop:** as the `feature` branches, in which we will test the different electrochemical measurements and communications of our project, are working successfully, we will merge them with the `develop` branch to integrate them into the project. Only in the final step, they will be dumped to the `master` branch.
- **Feature/adc:** in this branch the clock and all Analog to Digital communication is configured. All the `HAL libraries` must be incorporated in these files.
- **Feature/chronoamperometry:** this branch contains all the programming of the chronoamperometry, in which a constant voltage of the electrochemical cell is set for a certain time (posing the variable) and samples are taken.
- **Feature/dac:** in this branch, we must configure the DAC (_Digital to Analog Converter_) `MCP4725` by means of the device address and the slave address, the reference voltage, the desired voltage, etc.
- **Feature/stm32main:** this branch corresponds to the operation of the microcontroller, i.e. where all the functions (chronoamperometry, cyclic voltammetry, communications, etc.) are called to execute the complete program. Thus, in this branch, we can find the "setup" and "loop" functions to execute the measurements indefinitely as long as the preset conditions are met.
- **Feature/prova:** finally, in this branch we have dumped all the code for testing before making the _Pull Request_ in the `develop` branch. It has been another security branch prior to the `master`.

## Procedure

In this section we will talk about the operation of the programs (chronoamperometry, cyclic voltammetry, communications, etc.) as well as their flowcharts.

However, before that, we will talk about how to connect the potentiostat to the board (the **pinout**), which are these pins used by the microcontroller (_PA0, PA1, PB8..._) to control the potentiostat, as well as their typology and description.

### Pinout of the STM32 Evaluation Board

<p align="center">
  <img src="assets/imgs/stm32.png" alt="EVB" width="300" />
  <img src="assets/imgs/pinout.png" alt="Pinout" width="300" />
</p>

> **Figure 4**: STM-32 Núcleo 64 (left) and the input and output pins (right).

As you can see in the picture, there are many pins available on this evaluation board but not all of them are necessary for the use of the potentiostat. This device consists of five wires that you must connect to 5 pins on the board. These are the analog pins **A0** and **A1**; the pins that allow I2C communication (**SCL** and **SDA**), the digital output pin **D4** and finally the **SCK** pin.

- The analog pins are used to measure the **electrochemical cell voltages**. On the one hand, the PA0 pin is used to measure the reference voltage of the electrochemical cell (**VREF**), used to measure VCELL, and on the other hand, the PA1 pin represents the output voltage of the TIA, which is used to measure **ICELL**.
- Pins PB8 and PB9 handle the _Serial Data_ (SDA) and _Serial Clock_ (SCK) signals, to communicate the master with the slave via I2C.
- The PA5 pin represents the PMU status, being `0`: disabled and `1`: enabled.
- Finally, the PB5 pin represents the relay control (which allows the current to pass or not). Therefore it can be open (`0`) or closed (`1`).

### Flow diagrams

Next, in this section, the workflow followed for the final implementation of the application and realization of the previously defined objectives will be specified.

Before explaining the operation of the program and to facilitate the understanding of the following diagrams, we are going to make a glossary of all the existing files in `masb-pot-s-firmware`:

- In the `Core/Inc` folder, we will find the _header file_ `main.h` (among others) and inside the `Inc/components` folder, we will use the following files:
  - `ad5280_driver.h`
  - `adc.h`
  - `chronoamperometry.h`
  - `cyclic_voltammetry.h`
  - `dac.h`
  - `cobs.h`
  - `formulas.h`
  - `i2c_lib.h`
  - `masb_comm_s.h`
  - `mcp4725_driver.h`
  - `stm32main.h`
- In the `Core/Src` folder, we will find the _source file_ `main.c` (among others) and inside the `Src/components` folder, we will use the following files:
  - `ad5280_driver.c`
  - `adc.c`
  - `chronoamperometry.c`
  - `cyclic_voltammetry.c`
  - `dac.c`
  - `cobs.c`
  - `formulas.c`
  - `i2c_lib.c`
  - `masb_comm_s.c`
  - `mcp4725_driver.c`
  - `stm32main.c`

Now, let's take a look at the program description! :smile:

#### viSens-S and the communication

In reference to the desktop application as well as the initial submission of instructions and measurements taken, its diagram is depicted below:

<p align="center">
  <img
    src="assets/imgs/visense_flow.jpg"
    alt="viSense Flow Diagram"
    width="600"
  />
</p>

> **Figure 5:** Flow diagram of the viSens-S program

For the implementation of the depicted workflow, asynchronous communication via **USART** as well as **COBS** coding and the [MASB-COMM-S](https://github.com/Biomedical-Electronics/masb-pot-s-blaugrana/blob/master/Docs/protocolo-de-comunicacion.md) protocol between the device and the desktop application is essential. For this reason, the `cobs.c` and `masb_comm_s.c` files perform this function. The former is responsible for the encoding/decoding of the information, while the latter configures the asynchronous communication, the receiving/reading of measurement instructions to store their parameters in the appropriate structures (by means of junctions), as well as the transmission of the sensed data. It should be noted that these functionalities were already done in previous practices of the course. The taking of measurements depending on their technique will be described in detail below.

#### Chronoamperometry

In general, the functionality of chronoamperometry can be represented as follows:

<p align="center">
  <img src="assets/imgs/CA_flow.jpg" alt="CA Flow Diagram" width="400" />
</p>

> **Figure 6:** Chronoamperometry (CA) flowchart.

Different files have been necessary to implement the measurement process using chronoamperometry, now we are going to detail each one of them. It should be noted that many of the files discussed in this section will be used later as well. To give an example: the ADC implementation will have to be called from both chronoamperometry and cyclic voltammetry, obviously :open_mouth:. So, let's see what are these files that compose the CA:

- `chronoamperometry`: in this file we can see, first of all, the obtention of the measurement parameters: the voltage to be set (`eDC`), the `sampling period`, as well as the total time of the measurement. The relay is closed and the _timer_ is configured with the given _sampling period_ (the **ClockSettings** function is defined in another file that we will discuss below). In addition, the number of samples to be taken is calculated, given the measurement time and the _sampling period_. By doing so, we start a loop with a counter. We set a variable "state" that defines what the sensor is measuring, in this case, it is doing a chronoamperometry so it will mark `state = CA`. Later we will see that this is used by the _timer_. Finally, when the measurement is finished the relay opens.

- `adc`: this file has two main functions, the **ADC conversion** itself for the measurement, and the **timer\*** configuration so that the interruption is given according to the frequency sent by the user. These functionalities are called and used in both chronoamperometry and cyclic voltammetry.
  - `ADC_measure()`: this file has two main functions, the **ADC conversion** itself for the measurement, and the **timer\*** configuration so that the interruption is given according to the frequency sent by the user. These functionalities are called and used in both chronoamperometry and cyclic voltammetry.
  - `ClockSettings()`: this function is in charge of determining the sampling period in the _timer_ so that, whenever the interruption occurs in the _sampling period_ determined in the instructions, a measurement is made.
- `dac`: in this file are defined the _setup_ functions to initialize the DAC given its I2C address. The function **sendVoltage(),** in which the voltage to be determined in the cell is entered and which also calculates the voltage to be sent by the DAC for this purpose, is also defined. These functionalities must also be used and called in the **cyclic voltammetry**.

#### Cyclic Voltammetry

The voltammetry functionality is summarized in the flowchart above. As with the previous case, the use of the ADC file as well as the DAC file are essential to measure and set the voltages. Especially for voltammetry, we find the `cyclic_voltammetry` file, which implements the flow shown in the figure.

<p align="center">
  <img src="assets/imgs/CV_flow.jpg" alt="CV Flow Diagram" width="700" />
</p>

> **Figure 7:** Flow diagram of the Cyclic Voltammetry (CV).

First of all, obtaining the measurement instructions: voltage to be set (`eBegin`), the different vertices of the voltage signal, the cycles to be performed, as well as the `scanRate` (the variation of the voltage in the cell over time) and the `eStep` (increment/decrement between different consecutive points). Subsequently, by means of the following formula, the sampling period is determined, to be introduced in the **ClockSettings()** function previously commented to perform the pertinent measurements. The program is executed as long as the cycles to be performed have not ended (i.e., as long as the cycles>0) and each time the interruption is triggered by the sampling period. First it is determined if the voltage has reached one of the vertices, if so, the next target of the voltage signal to be sent to the cell is the consecutive vertex. If the target vertex has not been reached, a certain decrease or increase (depending on which vertex we are) is applied to the voltage signal sent to the cell until the target is reached. In case of reaching and passing this, the target itself is applied to the cell. It should be noted that in this flow is always considered that eVertex2 < eBegin < eVertex1 to perform the relevant increments and decrements, therefore different configuration to this would not result in good measurements. Finally, at the end of the measurement the relay opens. As with chronoamperometry, the state while the measurements are being made is defined as CV, so that when the interruption is triggered the relevant measurements of this technique are given. This will be seen in more detail below with the implementation in the **stm32main.** file.

#### Microcontroller

The `stm32main` file contains the operation of the microcontroller to determine, according to the instruction received, the measurement with the corresponding technique. First of all, the peripherals are initialized (such as the I2C communication) as well as the GPIO outputs in order to configure the _front-end_ modules such as the PMU. The DAC is also configured (which has a function generated in the `dac` file: **setup_DAC () )** as well as the potentiometer to determine the value of its resistance. Finally, the microcontroller waits to receive an instruction from the host.

According to the command received from the MASB-COMM-S communication protocol, the corresponding measurement is performed. First of all, the parameters of the measurement are extracted to be stored in the corresponding structures, to finally execute the flow of each measurement. For each technique, the state CA for chronoamperometry as well as CV for cyclic voltammetry are defined. These are used in the timer interrupt, in which it determines in which state the measurement is in and performs it to be sent to the host. In addition, the count is incremented each time a measurement is taken in order to number the points. In this way, the corresponding technique is performed until it is finished and another one is received.

<p align="center">
  <img
    src="assets/imgs/micro_flow.jpg"
    alt="Microcontroller Flow Diagram"
    width="600"
  />
</p>

> **Figure 8:** Flow diagram of the microcontroller.

## Results

Once the implementation of the whole program was completed, it was time to know how it really works.

### Initial tests

First of all, it was tested with the circuit shown in the figure below:

<p align="center">
  <img src="assets/imgs/circuit.jpg" alt="Potentiostat Circuit" width="400" />
</p>

> **Figure 9:** Electric circuit of the potentiostat.

Both chronoamperometry and cyclic voltammetry showed measurements corresponding to expectations. The results for this first test can be seen below:

#### Chronoamperometry

<p align="center">
  <img
    src="assets/imgs/initialCA.jpg"
    alt="Tests de cronoamperometría"
    width="400"
  />
</p>

> **Figure 10**: CA initial tests.

#### Cyclic Voltammetry

<p align="center">
  <img
    src="assets/imgs/initialCV.jpg"
    alt="Test de Voltametría cíclica"
    width="400"
  />
</p>

> **Figure 11**: CV initial tests.

### Final validation

However, the ultimate goal of the project is to be able to perform the different techniques to perform measurements on samples of **potassium ferricyanide** at different concentrations in a **potassium chloride buffer.** Specifically, **1 mM and 5 mM** were used for the tests.

<p align="center">
  <img src="assets/imgs/sensor.jpg" alt="Sensor" width="300" />
</p>

> **Figure 12:** Picture of the microcontroller during the measuring of the CA and CV.

The figure above shows the microcontroller board together with the chip where the samples are deposited to be measured with the implementation carried out.

The results obtained in **viSens-S** with respect to the parameters defined in chronoamperometry were the following, both for 1mM and 5mM.

#### Chronoamperometry

|      Parameters      | Value |
| :------------------: | :---: |
|       E DC (V)       | 0,15  |
| Sampling period (ms) |  20   |
| Measurement time (s) |  10   |

> **Table 1:** Initial parameters for the CA plot.

<p align="center">
  <img
    src="assets/imgs/final_CA_1.jpg"
    alt="Prueba final de la cronoamperometría"
    width="600"
  />
</p>

> **Figure 13 :** Final chronoamperometry plots for different potassium chloride _buffer_ concentrations. On the left, a concentration of 1mM, on the right, a concentration of 5mM.

In order to observe their differences more visually (given the different concentrations used), the two graphs have been superimposed:

<p align="center">
  <img src="assets/imgs/excel_CA.jpg" alt="Gráfico de la CA" width="400" />
</p>

> **Figure 14**: _Excel_ graph with the data obtained from the CA. In blue, potassium ferricyanide solution with 1mM buffer, in orange, 5mM buffer.

The graph above shows the different behavior given the same measurement parameters in the case of different concentrations in the sample.

#### Cyclic Voltammetry

In the same way, measurements were performed with cyclic voltammetry, obtaining the following results with the **viSens-s** application:

|   Parámetros    | Valor |
| :-------------: | :---: |
|   E begin (V)   |  0,7  |
| E vertex 1 (V)  |  0,8  |
| E vertex 2 (V)  | -0,1  |
|     Cycles      |   4   |
| Scan rate (V/s) |  0,1  |
|   E step (V)    | 0,01  |

> **Tabla 2:** Initial parameters for the CV plot.

<p align="center">
  <img
    src="assets/imgs/final_CV.jpg"
    alt="Prueba final de Voltametría cíclica"
    width="600"
  />
</p>

> **Figure 15 :** Final voltammetry plots for different potassium chloride _buffer_ concentrations. On the left, a concentration of 1mM, on the right, a concentration of 5mM.

Again, in order to be able to determine the differences clearly with different concentrations, the graphs have been superimposed:

<p align="center">
  <img src="assets/imgs/excel_CV.jpg" alt="Gráfico de VC" width="400" />
</p>

> **Figure 16:** _Excel_ graph with the data obtained from the CV. In blue, potassium ferricyanide solution with 1mM buffer, in orange, 5mM buffer.

Given these results, it can be confirmed that the microcontroller and its communication are working properly to perform the two electrochemical techniques.

## Conclusions

With the finalization of this project, we can conclude that it has been possible to successfully perform 2 electrochemical measurement techniques using a potentiostat controlled by the microcontroller: chronoamperometry and cyclic voltammetry. For this, it has been necessary to implement and understand the functioning of the different peripherals of the board such as the timers and their interruptions, the USART and I2C communication, as well as the ADC. It is also important to highlight the role of the MASB-COMM-S protocol together with the coding of messages using COBS. Also, the use of Git and GitHub has been essential to perform the tasks in an agile, parallel and complementary way.

Regarding the subject, it has been possible to acquire the basics of microcontrollers and their programming both in Arduino and STM32CubeIDE. This has been given in a very progressive way, going first to east implementations such as the simple activation of an LED, to communication between devices with coded messages through their peripherals. In addition, we have not only learned about microcontrollers, but we have also been able to extract essential information from datasheets for our engineering projects as well as adopting a new way of working in our developments with the Git tool.

## References

[1] ESTUDIO ELECTROQUÍMICO DE POLÍMEROS CONDUCTORES. (2020). UPC. https://upcommons.upc.edu/bitstream/handle/2099.1/4861/06_Annexos.pdf?sequence=7&isAllowed=yhttps://es.xcv.wiki/wiki/Chronoamperometry

[2] Chronoamperometry - Wikipedia. (s. f.). Wikipedia. Recuperado 13 de junio de 2021, de https://es.xcv.wiki/wiki/Chronoamperometry

[3] Galindo, R. (2020). Determinación de los niveles HOMO-LUMO mediante voltamperometría cíclica. https://www.cio.mx/invest_13/gpom/archivos/Taller%20_CaracterizacionEQ_sesion2.pdf
