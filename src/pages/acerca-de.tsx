import React from 'react';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const AcercaDePage = () => {
  return (
    <Layout title="Acerca de">
      <Heading as="h1" mt={{ base: 24, sm: 32 }}>
        Acerca de MASB
      </Heading>
      <Heading as="h2" fontSize="3xl">
        Microcontroladores para Aplicaciones y Sistemas Biomédicos
      </Heading>
      {/*      <Heading as="h3" fontSize="2xl">
        Motivación
      </Heading>
      <Text>Masb viene de...</Text>*/}
      <Heading as="h3" fontSize="2xl">
        Objetivos de aprendizaje
      </Heading>
      <Heading as="h4" fontSize="lg">
        Referidos a conocimientos
      </Heading>
      <UnorderedList>
        <ListItem>
          Identificar los diferentes elementos que conforman la estructura
          básica de un microcontrolador.
        </ListItem>
        <ListItem>
          Reconocer y clasificar, en función de volatilidad, velocidad y coste,
          los diferentes tipos de memoria que coexisten en un microcontrolador.
        </ListItem>
        <ListItem>
          Programar en C/C++ a nivel de registro para la programación de
          microcontroladores.
        </ListItem>
        <ListItem>
          Conocer y aplicar la funcionalidad de los diferentes tipos de
          periféricos que coexisten en un microcontrolador (sistema de reloj,
          contadores, convertidores analógico-digital, entradas y salidas de
          propósito general e interrupciones).
        </ListItem>
      </UnorderedList>
      <Heading as="h4" fontSize="lg">
        Referidos a habilidades y destrezas
      </Heading>
      <UnorderedList>
        <ListItem>
          Programar un microcontrolador de 32 bits a nivel de registros
          utilizando entornos de desarrollo y depuración profesionales (IDE).
        </ListItem>
        <ListItem>
          Programar un microcontrolador de 32 bits mediante la interfaz
          Arduino&trade;.
        </ListItem>
        <ListItem>
          Diseñar diagramas de flujo atendiendo la aplicación y requisitos del
          dispositivo biomédico.
        </ListItem>
        <ListItem>
          Trasladar un diagrama de flujo a un lenguaje de programación para
          microcontroladores.
        </ListItem>
        <ListItem>
          Programar siguiendo buenas prácticas, como un estilo de programación
          legible y el uso de comentarios, que facilite la colaboración en
          desarrollos en equipo.
        </ListItem>
        <ListItem>
          Crear documentación de aplicación específica dentro del ámbito del
          desarrollo de <i>software</i>.
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl">
        Competencias desarrolladas
      </Heading>
      <Heading as="h4" fontSize="lg">
        Transversales
      </Heading>
      <UnorderedList>
        <ListItem>
          Capacidad de resolución de problemas con iniciativa, creatividad y
          toma de decisiones tecnológicas según criterios de coste, calidad,
          seguridad, sostenibilidad, tiempo y principios éticos de la profesión.
        </ListItem>
        <ListItem>
          Conocimiento de materias básicas y tecnológicas que capaciten el
          aprendizaje de nuevos métodos y tecnologías, así como provean una gran
          versatilidad para adaptarse a nuevas situaciones.
        </ListItem>
      </UnorderedList>
      <Heading as="h4" fontSize="lg">
        Específicas
      </Heading>
      <UnorderedList>
        <ListItem>
          Formación científica y tecnológica para el ejercicio profesional en el
          diseño y desarrollo de sistemas de medición, control y comunicación en
          todas aquellas actividades biomédicas que la sociedad y el
          conocimiento científico solicite.
        </ListItem>
        <ListItem>
          Capacidad de aproximación del diseño de nuevos productos de una manera
          sistémica. Escoger de manera óptima qué partes de la aplicación
          requieren una solución <i>hardware</i> o <i>software</i> sabiendo
          integrar adecuadamente las dos partes en el producto final y siendo
          capaz de desarrollar, si fuese necesario, la interfaz que permita la
          integración de arquitecturas más complejas.
        </ListItem>
        <ListItem>
          Capacidad para concebir, diseñar y producir equipos y sistemas
          especificamente dedicados a la biología y la medicina.
          Particularmente, integrar algoritmos de procesamiento de información
          en el <i>hardware</i> adecuado.
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl">
        Metodología
      </Heading>
      En todo equipo o instrumentso biomédico existe una unidad encargada del
      procesado y la gestión de los datos. Al mismo tiempo, también se encarga
      de ofrecer interfaces con el usuario (UI) y los diferentes módulos de
      instrumentación que puedan haber. Estos dispositivos son los
      microcontroladores. En MASB se utiliza una metodología{' '}
      <Link href="https://es.wikipedia.org/wiki/Aprendizaje_semipresencial">
        <i>b-learning</i> o <i>blended learning</i>
      </Link>
      . De este modo, se traslada parte del proceso de aprendizaje fuera del
      aula, como fundamentos teóricos explicados mediante diferentes recursos
      multimedia (documentos de texto, diapositivas, artículos, vídeos,
      infografías, etc.); y se utiliza el tiempo en el aula para realizar
      procesos cognitivos de mayor complejidad que favorzcan el aprendizaje
      significativo mediante prácticas y proyectos, demostraciones en vivo y
      resolución de dudas. MASB está organizada en dos macrocriclos. En un
      primer macrociclo se introduce a los estudiantes al mundo de los
      microcontroladores y a la programación de cada uno de los módulos básicos
      del dispositivo biomédico para, posteriormente, pasar a su implementación
      guiada y práctica en el laboratorio. Dentro de este macrociclo, cada uno
      de los módulos/prácticas corresponde a un microciclo. En el segundo
      macrociclo, los estudiantes, de manera autónoma, desarrollan un proyecto
      donde han de programar un potenciostato portable haciendo uso de todos los
      conocimiento y habilidades adquiridos en el primer macrociclo.
      <Heading as="h3" fontSize="2xl">
        Bloques de contenido
      </Heading>
      <Heading as="h4" fontSize="lg">
        Bloque 1 | Introducción a los microcontroladores
      </Heading>
      <UnorderedList>
        <ListItem>Evolución de los microcontroladores</ListItem>
        <ListItem>Estructura de un microcontrolador</ListItem>
        <ListItem>Aplicaciones</ListItem>
      </UnorderedList>
      <Heading as="h4" fontSize="lg">
        Bloque 2 | Periféricos y memorias
      </Heading>
      <UnorderedList>
        <ListItem>Tipos de memoria</ListItem>
        <ListItem>Sistema de reloj</ListItem>
        <ListItem>Entradas y salidas de propósito general</ListItem>
        <ListItem>Contadores</ListItem>
        <ListItem>Convertidor analógico-digital</ListItem>
        <ListItem>Comunicación serie</ListItem>
        <ListItem>Interrupciones</ListItem>
      </UnorderedList>
      <Heading as="h4" fontSize="lg">
        Bloque 3 | Desarrollo de un proyecto basado en <i>firmware</i>
      </Heading>
      <UnorderedList>
        <ListItem>Diagramas de flujo</ListItem>
        <ListItem>Metodologías de trabajo en equipo</ListItem>
        <ListItem>Programación en C/C++ y buenas prácticas</ListItem>
      </UnorderedList>
      {/* <Heading as="h3" fontSize="2xl">
         Proyectos de innovación docente
      </Heading>
      <Heading as="h3" fontSize="2xl">
        Colaboradores
      </Heading>
      <Heading as="h3" fontSize="2xl">
        Entidades colaboradoras
      </Heading> */}
    </Layout>
  );
};

export default AcercaDePage;
