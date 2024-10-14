# jubelio-retail-service

A backend service for PT Kelola Bersama webstore that handles retail functionalities.

## Setup

1. Copy the `env.example` in the root directory and paste it in the root directory as `.env`. Also fill in the variables.

2. Run the following command to install the necessary packages.

```shell
$ npm install
```

3. Run the following command to run the database migrations.

```shell
$ npm run migrate:up
```

4. Run the following command to build the typescript codes to javascript.

```shell
$ npm run build
```

5. Run the following command to run the service.

```shell
$ npm run start:prod
```

## Database Schema

The db schema for the project can be found [here](https://dbdiagram.io/d/Jubelio-Test-6709142c97a66db9a3aa9552).

## API Collection

The REST API collection can be found [here](https://drive.google.com/file/d/1k5D9uvZBSoqySg2-hoOZnYJBpZK0-Yke/view?usp=sharing) and can accessed by importing it using [Insomnia](https://insomnia.rest/).
