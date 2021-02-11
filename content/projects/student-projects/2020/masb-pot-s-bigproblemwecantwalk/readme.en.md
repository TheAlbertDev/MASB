---
project: 'potentiostat'
students:
  - name: 'Carlos Maimó'
    picture: 'assets/Img/maimo.jpg'
  - name: 'Carles Bada'
    picture: 'assets/Img/carles.jpg'
repo: 'https://github.com/Biomedical-Electronics/masb-pot-s-bigproblemwecantwalk'
date: 2020-06-18
language: 'en'
title: 'MASB project: configuration of a potentiostat'
---

In this document there are the necessary contents to carry out and understand thi project, which has consisted of the configuration of a microcontroller to perform electrochemical test using a potentiostat. From the work done, we can perform automated chronoamperometries and cyclic voltammetries.

## Contents

- [Introduction](#introduction)
  - [Potentiostat](#potentiostat)
  - [Chronoamperometry](#chronoamperometry)
  - [Cyclic voltammetry](#cyclic-voltammetry)
  - [Hardware](#hardware)
  - [Git y GitHub](#git-y-github)
- [Objetives](#objetives)
- [Development of the project](#development-of-the-project)
- [Obtained results](#obtained-results)
- [Conclusions](#conclusions)
- [References](#references)

## Introduction

This project has been developed in the subject of Microcontrollers for Biomedical Applications and Systems, in the 4th year of Biomedical Engineering at the University of Barcelona. This work has been carried out by the "BigProblemWeCantWalk" team formed by Carlos Maimó and Carles Bada.

<p align="center">
  <img src="Assets/Img/maimo.jpg" alt="Git" width="250" />
  <img src="Assets/Img/carles.jpg" alt="Git" width="300" />
</p>

> **Figure 1:** Carlos Maimó y Carles Bada

In this section of the introduction there is a brief description of the techniques used to develop the project. It is necessary to understand how the electrochemical techniques that can be done with a potentiostat work in order to develop automated control systems for them.

#### Potentiostat

A potentiostat is a type of circuit used to make electrochemical measurements. It is a very used device in the field of medicine, more specifically in the design and development of biosensors, such as glucose detectos for example. It consists of three electrodes: the counter electrode (CE), the working electrode (WE), and the reference electrode (RE). It also counts with a high-amplification and high-impedande amplifier to set the working voltage, and with a transimedance amplifier at the output to measure the intensity current variations inside the electrochemical cell. In figure 1 we can see an example of the potentiostat circuit

<p align="center">
<img src="Assets/Img/potentiostat.png" alt="Git" width="400" />

</p>

> **Figure 2**: Basic schematic of a potentiostat [2].

These types of devices are widely used for the development of medical sensors and points-of-care since the have the ability of detecting very small changes in concentration, i.e, they have a very high sensitivity and this makes them ideal to carry out measurements of the biologic concentrations in the organism. The two main measurements that we can do with the potentiostat are the chronoamperometry (CA) and the cyclic voltammetry (CV), which we will now see what they are about, on what they are based and how they should be done.

#### Chronoamperometry

The chronoamperometry is a time-dependent measurement technique in which a certain potential is applied using a square signal on the working electrode. The current in the electrochemical cell, which is measured as a function of time, fluctuates according to the diffusion as a function of the concentration of an analyte in the solution [3]. Therefore, studying the relation between current and time, the concentration of a certain analyte can be determined without a need for labelling.

<p align="center">

<img src="Assets/Img/crono.png" alt="Git" width="300" />
</p>

> **Figure 3**: Representation of a chronoamperometry [4].

#### Cyclic voltammetry

The cyclic voltametry, on the other hand, is an electrochemical technique widely used that can be useful for obtaining qualitative and quantitative information on electrochemical reactions, such as kinematics, reaction mechanisms, electrocatalytic processes, the reversibility of reaction and more parameters. During the measurement, the potential of the WE is measured with respect to the RE, and the potential is forces between two limits using a signal like the one shown in figure 3. At the same time, the current passing through the cell is also measured, which depends on the applied potential [5]. The signal corresponding to a redox has a shape similar to the one in figure 3, where the top peak marks the oxidation of the solution, and the lower peak indicates its reduction. This technique can also be used to do redox studies on the surface of the WE.

<p align="center">
  <img src="Assets/Img/ciclic.png" alt="Git" width="600" />
</p>

> **Figure 4**: Esquema de una cronoamperometría [5].

#### Hardware

In order to implement this type of measurements within a sensor it is very important to automate the configuration and development of the measurement using an electronic device. For this, the use of microcontrollers is ideal and greatly facilitates the application of the test using this type of equipment. A microcontroller is an integrated circuit that works like a small computer that includes systems to control input and output elements. It also includes a processor and memory to be able to save the program to be executed and its variables. The function of a microcontroller is to automate processes and process information.

There are many types of microcontrollers that can be used to automate processes, Arduino and Raspberry are the most known brands, in this project we will use the STM32F4021 Nuclei-64 of the STM brand. In this [link](https://www.st.com/resource/en/user_manual/dm00105823-stm32-nucleo-64-boards-mb1136-stmicroelectronics.pdf) you will find relative information of this board. It will be programmed using the [STM32CubeIDE](https://www.st.com/resource/en/data_brief/stm32cubeide.pdf) software.

<p align="center">

<img src="Assets/Img/placa.png" alt="Git" width="300" />

</p>

> **Figure 5**: Image of the used microcontroller [6].

#### Git y GitHub

Para desarrollar aplicaciones mediante el uso de microcontroladores es necesario programar la placa para que esta realice las funciones deseadas. Para realizar proyectos basados en el desarrollo de código en equipo, existen dos herramientas muy útiles que serán usadas en este proyecto: Git y GitHub. Git es un programa de código abierto y gratuito que ofrece herramientas para desarrollar proyectos de cualquier tamaño y embergadura. Usando Git se pueden crear distintas lineas de trabajo independientes dentro del mismo proyecto para poder tener ramas de desarrollo, de test y operativas. De este modo se puede trabajar en el desarrollo en equipo de un mismo proyecto. Además permite guardar versiones de las modificaciones realizar por, en caso de necesidad, poder recuperar versiones anteriores de un mismo documento [7].

GitHub, por otro lado, es una aplicación gratuita para la gestión de repositorios Git. Dispone de una interfaz web para tener acceso y control de las distintas colaboraciones y desarrollos del proyecto, incluyendo la opción de jerarquización de equipos, donde es necesaria la comprobación y aceptación por un project manager de las modificaciones realizadas por un desarrollador antes que se pueda unir el nuevo código, al programa principal. Otra forma de trabajar que ofrece GitHub es el “forking” que consiste en adquirir el código de otro proyecto para poder desarrollar cualquier usuario. Esta opción promociona el desarrollo cooperativo, y además, con la aprobación del gestor del proyecto, se pueden compartir las modificaciones realizadas por un usuario [8].

## Objetives

The objective of this project is the implementation of a microcontroller to manage a potentiostat. The microcontroller must be able to start, configura, perform chronoamperometries and cyclic voltammetries, and send the results obtained through the information received by an external control application.

The developed program must have the following structue and be able to carry out the described functions in the following flow diagram.

<p align="center">
  <img src="Assets/Img/micro-flow.png" alt="Git" width="700" />
</p>

> **Figure 6**: Flow diagram that the microcontroller must follow.

## Development of the project

In order to develop this project, our team form by Carlos Maimó and Carles Bada has used the team-work to carry out the necessary configuration of the whole program. The description of the process that has been worked during this project is shown in the following flow diagram.

<p align="center">

<img src="Assets/Img/diagrama.png" alt="Git" width="600" />

</p>

> **Figure 7**: Flow diagram of the program.

The workflow that has been followed to develop the different files is the one in the documentation, where the functionalities are developed individually in the different feature/**\*\*** branches, and are grouped into the develop branch so that we can check whether we have bugs or not. To correct such mistakes the hotfix/**\*\*\*** branches are used. Once all errors are corrected the project is passed to the master branch, from where the client will see it. By specifying more in this process we will explain how we have applied this workflow to our project.

First of all, each member has been assigned differnet functionalities, always sharing the individual progress between us, and we have group these functionalities in three feature branches:

- **Feature/CAconf.** In this branch we have carried out the development of the DAC configuration, the configuration of the Timers and we have also performed the function of the chronoamperometry behaviour, following the flow diagram of the documentation.
- **Feature/CVconf.** In this branch we hae carried out the ADC converson configuration and the cyclic voltammetry behaviour as well, following its flow diagram.

In these branches feature/CAconf and feature/CVconf, in order to later assemble the overall operation of the project with a more readable and interpretive code, we have created functions for each configuration or use mentioned above. These are:

- **SendVoltageToDac():** This function is responsible for configuring the DAC (Digital to Analog Converter) to be able to set the desired voltage value in VCell. Using this function converts the voltage to the actual value required by the DAC, in this case the voltage by 4096/4. This value is then sent to the DAC via I2C communication.

- **ADC_function():** This function is the one in charge of reading the analog pins during the measurement and the reconstruction of the data package to be able to be sent later. First, it activates the aDC (Analog to Digital Converter) and converts the voltage measurement. Subsequentsly it stores the measurement value and performs the inverse transformation than the DAC. Then, it calculated the value of VCell and ICell so together with the measruement point and the elapsed time, assemble a data structure, which is the one sent.

- **Clock_configuration():** This function is used to automatically configure the timer with the period required by the user. It is done by converting the period in milliseconds to tics of the clock. Subsequently, it initializes the timer with the determined period with the interrups activated.

- **Cyclic_voltammetryManagement():** This function is in charge of managing the configuration and development of the cyclic voltammetry. First, it extracts the values contained within the data package that configure this measurement. Subsequently, it sets the DAC value with the value defined by the user and activates the relay that closes the electrochemical sensor circuit. Then it configures the timer with the required period and start the analysis. By controlling the reading of the cell voltage, it determines different voltage targets that the cell must reach in each cycle. This is done by increasing or decreasing the voltage set in the cell. When it is in the last cycle it changes the state to IDLE and opens the relay.

- **ChronoamperometryManagement():** This function has the same operation as the previous one, but in this case, the measurement time is not determined by the number of cycles, but by the time required by the user. Based on this time and the measurement period, the number of points necessary to complete the analysis is calculated. When the number of points is as indicated, it changes state to IDLE and opens the relay.

**Feature/mainconf.** In this branch, with the previous functions created by us and the functions that were already created, we have built the operation of the project. To do this, we have created the setup() and loop() functions in the loop,c file. We create these two functions here but later we use them in the main.c, with this we manage to group the behavior of the microcontroller into two funcitons and we also modify the main.c as little as possible. Also, the interrupt_management() function has been created. Here we will explain these three functions:

- **setup():** This function is the one that is executed just when the program is activated. It consists of only two steps: turning on the PMU that powers the system, and executing the wait for a data package from the host function.
- **loop():** This is the function that takes care of the general order of the program. It waits for a package to be received, and when it is received, it determines what function it is, obtains the other data received and executes the required measurement configuration.
- **interrupt_management():** This function is executed every time the timer interrupt is activated. First, each time it is activated it determines in which state the program is in, whether it is doing a Ca, a Cv or if it is in IDLE, that is, in the last measurement. If it is in Ca, or in Cv, it performs the ADC measurement and sends this information to the host. In the event that the state is IDLE, it stops the clock, in order to finish the measurement.

Proceeding with the work flow, we have made a pull request from the three feature branches to the develop branch. This is where we have really been able to see the mistakes we had, when we put all the files together. So we have started to review the bugs and fix them with the hotfix / \*\* branches. Some of these errors have derived from the individual procedure in the feature branches (variables with different names, function names, includes, etc.), others came from how we should define the variables or in which file we had to do it, and a few have been of improvement when seeing that some piece of code did not give errors but could be optimized more.

When we have the code without compilation errors we can pass it to the master branch

## Obtained results

In order to check the functionality of the developed program, we have been provided with an application, called viSense (with a video tutorial at this [link](https://www.youtube.com/watch?v=UkXToFs8g6Y)), with which the configuration of the type of measurement to be performed is done, communication with the microcontroller board and the visualization of the results obtained.

The best way to test the functionality of the program would be to run it in an experiment with all connected devices, putting the potentiostat in a solution with different concentrations. Due to the events generated by Covid-19, it has been impossible to perform this test in the laboratory. Thus, in order to check the functionality of the program, a potentiometer in the form of a tensioner divider has been connected to the analog input simulating a signal.

The results obtained have not been good. Communication between the application and the board was not successful, because when an analysis request was sent from the application, the microcontroller did not receive any data package, and therefore it was not activated. This process has been repeated changing the USB ports and the result has been the same in all attempts. Still, we believe that the results would be positive if the communication worked out well.

## Conclusions

This project has helped us to show into an effective program the different knowledge that we have acquired over the months of the subject. We have related board configurations, pin reading, communication types, relationships between functions, configuration and use of timers with interrupts, and much more. We have gained more knowledge about using Git and GitHub to develop team programs in a comfortable and useful way, and also remotely due to the Covid-19.

The result of this course has been very satisfactory, since we have been able to acquire the bases to be able to develop our own medical equipment projects with microcontrollers. The world of software and hardware is very important in our field of study, but it is also not easy to learn if you do not have a good foundation. Once we are done with this class, we are not geniuses of programming and hardware, but we have learned how to do simple projects. But what is more important is that we now know how to find the information and resources necessary, with time and dedication, to carry out all kinds of developments.

## References

1. DrDennis Fitzpatrick PhD CEng BEng(Hons), in [Implantable Electronic Medical Devices](https://www.sciencedirect.com/book/9780124165564), 2015

2. Custom Sensor Solutions, Inc. - Potentiostat Operation Simplified. Available at: http://www.customsensorsolutions.com/ap-pstat.html.
3. Owen J. Guy, Kelly-Ann D. Walker, in [Silicon Carbide Biotechnology (Second Edition)](https://www.sciencedirect.com/book/9780128029930), 2016
4. Chronoamperometry - Wikipedia. Available at: https://en.wikipedia.org/wiki/Chronoamperometry.
5. Jianlu Zhang, ... Jiujun Zhang, in [Pem Fuel Cell Testing and Diagnosis](https://www.sciencedirect.com/book/9780444536884), 2013
6. NUCLEO-F401RE STMicroelectronics | Mouser España. Available at: https://www.mouser.es/ProductDetail/STMicroelectronics/NUCLEO-F401RE?qs=fK8dlpkaUMvGeToFJ6rzdA==.
7. About - Git. Available at: https://git-scm.com/about.
8. What Exactly Is GitHub Anyway? | TechCrunch. Available at: https://techcrunch.com/2012/07/14/what-exactly-is-github-anyway/.
