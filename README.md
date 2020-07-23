# YumaTrack development guid

This guid is showing how to start works with YumaTrack backend

## Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Database](#database)
    * [Run locally](#run-locally-docker)
    * [Migrations](#migrations)
    * [Local DB credentials](#local-db-credentials)
* [Documentation](#documentation)


## Requirements
* Node.js **12.13.0**
* PostgreSQL **11.6.0**


## Installation

1. Install Node 12.13.0
2. Install Docker
3. Clone this code
4. Run `npm install` from main directory of the project
6. Run `npm run local` to run server

**Important: use 'local' script in work process, but you need to run docker for DB**

*If you need to start Docker:*
- Create docker image 
```
sudo docker build -t yumatrack-backend .
``` 
- Start docker container 
```
sudo docker run -p <PORT>:80 -d yumatrack-backend
```

**[⬆ back to top](#yuma-development-guid)**

## Database

### Run locally (Docker)

Create docker image
```
sudo docker build -f src/database/Dockerfile -t yumatrack-db .
```

Start docker container
```
sudo docker run -p 5432:5432 -d yumatrack-db
```

### Migrations

### Useful commands

#### Create migration

```bash
npm run migration:create migration_name
```

---

#### Run migrations

```bash
npm run migration:run
```

---

#### Revert ONE migration

```bash
npm run migration:revert
```

---

### Local DB credentials

- TYPEORM_USERNAME = local_user_yuma
- TYPEORM_PASSWORD = yumayuma1
- TYPEORM_DATABASE = local_yumatrack

**[⬆ back to top](#yuma-development-guid)**

## Documentation

[API documentation](http://52.214.198.7:3000)
