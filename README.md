# entrega_semana7
 
Este repositorio contiene los artefactos construídos para las pruebas e2e con generacion de datos pool de datos prio, pseudo aleatorios y aleatorio, para la consecución de los objetivos definidos en la estrategia de pruebas sobre las versiones v3.42.5 de la interfaz de usuario de administración de Ghost.

Este repositorio ha sido construído por:
| Apellidos | Nombres | Correo @uniandes | 
| --------- | ------- | ---------------- |  
|     AMARILLO LOZADA       |  IVAN DARIO        |   id.amarillo224@uniandes.edu.co |
|     ROSALES               |     GINETT         |   g.rosales@uniandes.edu.co      |
|     PINTO VACACELA        |  CARLOS ANDRES     |   c.pintov@uniandes.edu.co       |
|     GAITAN SANCHEZ        |  MARIA ANGELICA    |   m.gaitans@uniandes.edu.co      |

Contenido

# Estrategia de pruebas

El documento con la definición de la estrategia de pruebas se encuentra disponible en el siguiente enlace:

* [Documento estrategia de pruebas](../../wiki/Documento-estrategia-de-pruebas) 

# Pruebas E2E con Cypress
 Instrucciones de ejecución
 
# Prerequisitos
Una versión actualizada de Node.js instalada en su computadora.
Una versión actualizada del manejador de paquetes npm instalada en su computadora.
Instalar la versión 3.42.5 de Ghost en su máquina local siguiendo el tutorial del siguiente enlace Tutorial - [Ghost](https://misovirtual.virtual.uniandes.edu.co/codelabs/ghost-local-deployment/index.html#4)  
Crear una cuenta de usuario en Ghost (Incluído en el tutorial del anterior punto).

Instalar librerías
Clone el repositorio de pruebas utilizando uno de los siguientes comandos:
git clone https://github.com/ginettrosales/entrega_semana7.git

Ahora navegue hasta el subdirectorio entrega_semana7 con el siguiente comando:
cd entrega_semana7

Finalmente instale las librerías requeridas:
npm install

# Configuración de parámetros de ejecución
En una terminal ubíquese en el directorio entrega_semana7 y abra el archivo cypress.json en el editor de texto de su preferencia. Establezca el valor de las variables email y password con los valores que utilizó cuando creó la cuenta de usuario en Ghost.

# Ejecución de las pruebas E2E
En una terminal ubíquese en el directorio entrega_semana7 y ejecute el siguiente comando para probar todos los escenarios:

./node_modules/.bin/cypress run -C cypress.json
