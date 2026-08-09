# CRUD App con React, TypeScript, Context API y Reducers

## Descripción general

Esta aplicación web es un proyecto de tipo CRUD (Create, Read, Update, Delete) para gestionar usuarios de forma interactiva. Su objetivo es demostrar cómo construir una interfaz moderna, con manejo de estado global y validaciones de formularios, consumiendo una API externa para simular un backend real.

El proyecto está pensado como una muestra clara de desarrollo frontend con React y TypeScript, enfocada en buenas prácticas de arquitectura, separación de responsabilidades y experiencia de usuario.

## ¿Qué hace la aplicación?

La app permite al usuario:

- visualizar una lista de usuarios cargada desde una API externa;
- crear nuevos usuarios mediante un formulario;
- editar información existente de un usuario;
- eliminar usuarios de la lista;
- recibir notificaciones visuales de éxito o error durante las operaciones;
- validar datos ingresados antes de enviarlos.

La interfaz está organizada de forma simple y funcional para que el flujo CRUD sea intuitivo y fácil de seguir.

## Tecnologías y herramientas utilizadas

- React 19 para la construcción de la interfaz de usuario.
- TypeScript para agregar tipado estático y mayor seguridad en el desarrollo.
- Vite como herramienta de build y desarrollo rápido.
- Context API y reducers para manejar el estado global de la aplicación.
- React Hook Form para la gestión de formularios con menos código y mejor organización.
- Zod para validación de esquemas y mensajes de error claros.
- Sonner para mostrar notificaciones toast en la interfaz.
- ESLint y TypeScript configuraciones de calidad y mantenimiento del código.

## Arquitectura y enfoque de desarrollo

El proyecto aplica una estructura modular y escalable:

- componentes separados para la lista de usuarios y el formulario;
- hooks personalizados para encapsular la lógica de creación, actualización, eliminación y carga de datos;
- servicios dedicados para interactuar con la API;
- contextos y reducers para manejar el estado de forma organizada;
- modelos de datos definidos para mantener consistencia en la aplicación.

Este enfoque permite separar la lógica de negocio de la presentación y facilita futuras extensiones del proyecto.

## Recursos utilizados

Además de las librerías mencionadas, el proyecto incorporó recursos externos para enriquecer la experiencia:

- JSONPlaceholder API como fuente de datos simulada para las operaciones CRUD.
- Unavatar.io para mostrar avatares asociados a los usuarios.
- Documentación oficial de React, TypeScript, Context API, React Hook Form, Zod y Vite como base de implementación y aprendizaje.

## Cómo ejecutar el proyecto

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abre la aplicación en tu navegador.

## Valor del proyecto

Este proyecto representa una base sólida para demostrar habilidades en:

- desarrollo frontend con React y TypeScript;
- consumo de APIs;
- manejo de estado con Context API y reducers;
- validación de formularios;
- organización de código en proyectos reales.

Es una muestra práctica de cómo construir una aplicación interactiva con una arquitectura clara y un flujo CRUD completo.
