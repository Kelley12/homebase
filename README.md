# AllPunsIndented Homebase

[![Build Status](https://travis-ci.com/kelley12/homebase.svg?branch=master)](https://travis-ci.com/kelley12/homebase)
[![Dependency Status](https://david-dm.org/kelley12/homebase/status.svg?style=flat)](https://david-dm.org/kelley12/homebase)
[![devDependencies Status](https://david-dm.org/kelley12/homebase/dev-status.svg)](https://david-dm.org/kelley12/homebase?type=dev)

## Usage

Meant to be used as a server for Raspberry Pi's and Arduino's to communicate with. It allows these devices to make API requests to check in with data they are collecting.

- [Project Goals](#project-goals)
- [Approach](#approach)
  - [Application](#application)
  - [Testing](#testing)
  - [Continuous Integration](#continuous-integration)
- [Prerequisites](#prerequisites)
  - [Validate Installations](#validate-installations)
- [Development](#development)
  - [Docker](#docker)
  - [App](#app)

## Project Goals

- Long-term maintainabilty
- Extreme reliability
- Minimal dependencies
- Simple build process
- Arduino integration
- RaspberryPi integration

## Approach

### Application

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Testing

- [Jest.js](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)

### Continuous Integration

- [Travis](https://travis-ci.com/)
- [David](https://david-dm.org/)

## Prerequisites

- [Node and NPM](https://nodejs.org/en/download/)
- [Docker and Docker Compose](https://docs.docker.com/install/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Validate Installations

```bash
# Validate Node
node -v

# Validate NPM
npm -v

# Validate Docker
docker -v

# Validate Docker Compose
docker-compose -v
```

## Development

### Docker

Update the [docker-compose.yml](/docker-compose.yml) file, set the `volumes` values to an existing local location.

```bash
    volumes:
    - /data/postgres:/existing/folder/location
```

Spin up the Docker container using the following command:

```bash
docker-compose up
```

[For more info on developing with Docker, PostgreSQL, and pgAdmin](./docs/docker-pgAdmin.md).

### App

Now you need to set up a `.env` file. You can use the `.env.example` file for use in development with the Docker container.

```bash
# Copy .env.example to .env
cp .env.example .env

# Install dependencies
npm install

# Run Development
npm run dev
```
