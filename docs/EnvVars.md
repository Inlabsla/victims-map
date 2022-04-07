# Variables de entorno del microservicio

Estas son las variables de entorno que se pueden configurar para este microservicio:

Requeridas:

- **NODE_ENV**: Ambiente en el cual está corriendo el servicio. Requerido. Valores posibles: development, testing, production
- **ROOT_PATH**: Prefijo de las rutas de este microservicio. Requerido. Ejemplo: /api-template/v1

Opcionales:

- **PORT**: Puerto HTTP que utiliza el servidor para exponer los endpoints REST. Predeterminado: 8080.
- **LOGGER_LEVEL**: Nivel de detalle a mostrar en logs. Valores posibles: error, warn, info, verbose, debug, silly. Predeterminado: info
