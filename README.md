# TVShowDashboard

Not written yet.

## Table of Contents

- [Project setup](#project-setup)
  - [Running the project](#running-the-project)
  - [Compiling and minifying for production](#compiling-and-minifying-for-production)
- [Application structure](#application-structure)
  - [Infrastructure](#infrastructure)
  - [Models](#models)
  - [Presentation](#presentation)
  - [Presenters](#presenters)
  - [Services](#services)
  - [Store](#store)

## Project setup

```
npm ci
```

### Running the project

```
npm run dev
```

### Compiling and minifying for production

```
npm run build
```

## Application structure

Inside the src folder of the application, a few clusters / groups of functionality can be found:

- Infrastructure
- Models
- Presentation
- Presenters
- Services
- Store

Below each of these groups is explained.

### Infrastructure

A set of classes that connect the application with some external packages or dependencies.

### Models

A set of classes, interfaces and enums that describe the different entities that the application works with.

### Presentation

The visual elements of the application.

### Presenters

A set of classes and objects that play a supporting role for the presentation elements by providing data or preparing it in the right format so that it's ready to be used or displayed by any of the components in the presentation layer.

### Services

A set of classes that connect the application with the back-end and add a bit of their own functionality to make the best use of it.

### Store

All store-related functionality, which provides an accessible, reactive place of front-end storage.