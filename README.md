# Plantilla para microservicios de backend

Este repositorio contiene la estructura, instrumentación y herramientas estándares para utilizar en la creación de microservicios de backend en el BaaS de Davivienda.
**No se debe alterar la configuración de controles de linters y formateo en los proyectos que usen esta plantilla**

## Setup

- Una vez clonado el "repositorio platilla", copiar el contenido a un nuevo directorio para la API a crear.
- Desvincular GIT desde la plantilla borrando la carpeta ".git".
- Luego inicializar un repositorio nuevo para la API utilizando `git flow init`.
- Modificar package.json y reemplazar este README con los datos de la API.
- Instalar las dependencias con el comando `npm install`
- Crear un commit inicial "chore: creación de microservicio desde plantilla"
- Hacer Push al repositorio nuevo para la API

## Variables de entorno

Ver documentacion de [Variables de Entorno](docs/EnvVars.md) por la lista de valores posibles a configurar.

En entornos de desarrollo o testing se puede utilizar un archivo `.env` en la base del proyecto con las opciones deseadas.
Ver [.env.dev_sample](.env.dev_sample) como ejemplo.

## Scripts

- `npm run dev` Inicia servidor en modo desarrollo con refresco automatico ante cambios
- `npm run start` Inicia servidor
- `npm run test` Corre los test unitarios y de integración del proyecto

## Copyright Davivienda

Todo archivo de código fuente debe llevar en su encabezado la siguiente leyenda en referencia a los derchos de autor:

`// Copyright (C) <año> - Banco Davivienda S.A. y sus filiales.`

Reemplazando `<año>` por el año de creación del archivo.

## Notas sobre el stack

### TypeScript y Node LTS

Se utiliza [TypeScript](http://www.typescriptlang.org/) como lenguaje de desarrollo, compilando a JavaScript ES6 que corre sobre NodeJS LTS.

### Framework HTTP

Este proyecto utiliza [Express](http://expressjs.com/) como framework para exponer los servicios REST sobre HTTP.

### Linter y formateo de código

En el proyecto se utiliza [TSLint](https://palantir.github.io/tslint/) con [las reglas de AirBnb](https://github.com/airbnb/javascript) para análisis estático de código. Adicionalmente se utiliza [Prettier](https://prettier.io/) como herramienta de formateo de código fuente.

### Mensajes de Commit GIT

El proyecto adhiere al uso de [Commits Convencionales](https://www.conventionalcommits.org/es) que especifica el formato de los mensajes de commit para que su significado sea legible tanto para máquinas como humanos.

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Tipos válidos: build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test

Esta plantilla tiene configurado hooks de git para correr el linter de código fuente y de mensaje de commit automáticamente al hacer un `git commit`

### Seguridad HTTP

Esta plantilla incorpora [Helmet](https://helmetjs.github.io) como middleware de Express configurado con las reglas predeterminadas para configurar cabeceras HTTP que aumentan la seguridad de la API. No todas las opciones que Helmet soporta se activan por defecto debido que el uso de alguna característica puede ser necesaria en la API.
Por detalles de todas las características posibles de este middleware, ver la [página de documentación](https://helmetjs.github.io/docs/) de la librería.

Tambien se utiliza [Body-Parser](https://github.com/expressjs/body-parser) como middleware de Express. Una de las características es el límite de tamaño máximo a aceptar en el HTTP body del request, siendo 100kb el valor defecto. Esta característica ayuda a prevenir ataques de tipo Denegación de Servicio en la API. Si el tamaño es insuficiente para la tarea a realizar de la API, configurar un valor de `limit` acorde recibiendo el valor desde Config con una variable de entorno.

### Documentación de la API

El proyecto utiliza el estándar [OpenAPI](https://www.openapis.org/) de documentación utilizando Swagger como editor y visualización de API Docs con Swagger-UI embebido y ejecutándose solo en ambientes de development y testing.
Se debe documentar la especificación de API en un documento `swaggger.yaml` almacenado dentro de `docs/api`.
Se recomienda utlizar [Swagger Editor](https://swagger.io/tools/swagger-editor/) para mantener la documentacion.
Una vez actualizadas las especificaciones de la API se debe exportar en formato JSON y almacenar como `src/api-docs.json` para ser tomado por la instancia de Swagger-UI embebida.

Si el ambiente es development o testing, se podrá acceder a Swagger-UI en la ruta `/api-docs`

Ejemplo: `http://localhost:5000/api-docs`

### Docker

Se puede generar localmente la imagen de Docker para esta API ejecutando el comando:

`docker build . -t davivienda-baas/api-template`

Luego iniciar un contenedor con:

`docker run -d -e NODE_ENV=development -e PORT=5000 -p 5000:5000 --name dv-api-template davivienda-baas/api-template`
