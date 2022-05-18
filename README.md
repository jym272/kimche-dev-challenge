# Kimche Dev Challenge

> **Deploy** del proyecto [kimchedevchallenge.com](https://www.kimchedevchallenge.com/).

## Pregunta abierta

"La tabla que contiene la información correspondiente a la asistencia diaria de un niño en un colegio tiene 90 millones de filas. Todas las tablas del sistema existen en la misma BDD en MySQL. La lógica del backend que actualiza la información correspondiente al pasar la asistencia tiene un tiempo de servicio p95 de 10 segundos. El equipo está interesado en bajar este tiempo para mejorar la experiencia del usuario (y porque nos gusta pensar en Kimche como un Ferrari). ¿Qué propondrías para enfrentar el problema? Esta pregunta es abierta, no hay respuestas malas. Puedes proponer arquitectura, tecnologías, diseño, etc."


## Respuesta



> **Índices**: 

Se podría clasificar a las escuelas en regiones y luego estas seccionarlas en distritos. 

Se modifica el esquema de la tabla y se crea **índices de Database** para realizar *queries* and *writes* de forma eficiente.
Para la implementación de índices se podría usar Árboles Balanceados, Árboles B+, Hashes
y de esta forma se mejora la complejidad de las *queries* dependiendo de la estructura de datos que se elija.


**Ejemplo:** Necesito escribir la asistencia para un usuario con `user_id=808`. En una database de índices obtengo el 
índice `REG1-DIST5`, y con esta información realizo el **write** en la tabla.


> **Master-Slave**:

Dependiendo del volumen de lectura/queries podría implementar una configuración master-slave, y tener tantas *Slaves-DB* como necesite, 
de esta forma la *master-DB* la uso solo para realizar **writes**.

Si necesito *consistencia* en los datos (obtener la información de asistencia de un alumno de forma inmediata) 
se podría implementar *database caching*.
De esta forma siempre se dispone de información actualizada. 

De la misma manera uso tantas máquinas de caching como se necesite, el objetivo es el mismo:
dejar a la *master-DB* exclusiva para realizar **writes**.

> **Sharding**:
> 
Para optimizar los writes se usa *database sharding*, en el cual, se divide a la DB en multiples master databases.
Ya que solo se tiene una tabla y es muy grande en en el problema propuesto, se escala usando *horizontal sharding*, 
la tabla única  se divide en multiples databases, de esta forma, se escala el tiempo de escritura.

Una técnica para realizar esta división sería usar la operacion `MOD` con el user_id y el número 
total de máquinas que se tienen disponibles para realizar la asignación. La operacion sería `user_id % 3` por ejemplo.

![alt text](public/sharding.png)

Luego se podría crear una `master-table` encargada del algoritmo de sharding que indicaría 
para cuál usuario corresponde su máquina e incluso en esta master-table 
se podría combinar con los *índices de database* descritos anteriormente.

**Ejemplo:** Para el usuario con `user_id=808` la consulta en la master-table me 
indicaría que consulte en la máquina *master-3* por ejemplo, y  con los índices `REG1-DIST5`


## Principales tecnologías implementadas

1. **FrontEnd**: React, Styled Components 
2. **BackEnd**/ **Data Structures**: Apollo Client, React Context, Árbol Trie para el autocompletado de países en la página principal, Hashmap de Continentes y Lenguajes para los países filtrados en la página por categorías.
3. **Server**: instancia en Google Cloud Platform.
4. **Web Server**: Configurado con Caddy Web Server.
