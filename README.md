# note-taking-api

A note taking app served through a REST API.

## How to run

This was developed and tests under node.js v16.16.0 and npm v8.11.0.

The `npm` command is used to run this app. Before anything else, run `npm install` to install the dependencies.

- `npm start` starts the node server.
- `npm test` runs the automated tests.
- `npm run start:dev` starts the development server that watches for modifications on source files and restarts accordingly.
- `npm run build` creates the package to be deployed.
- `npm run lint` runs a lint on the source files.

# Rest API

The user of this API is the user that manages notes. So the scope of notes from the API consumer standpoint are always one own's notes.

The user will be identified on each call via the informed JWT token in the HTTP `Authentication` header. Right now a fixed user is being assumed in order not to extend the development effort by now.

### GET /v1/notes

- possible statuses are `200`, `401`
- responds JSON with the following format

```
{
  id: number
  note: string
  createdAt: Date
  updatedAt: Date
}
```

### POST /v1/notes

- possible statuses are `201`, `400`, `401`
- expects JSON with the following format

```
{
  note: string
}
```

- responds JSON with the following format

```
{
  id: number
  note: string
  createdAt: Date
  updatedAt: Date
}
```

### PUT /v1/notes/:id

- possible statuses are `200`, `400`, `404`, `401`
- expects JSON with the following format

```
{
  note: string
}
```

- responds JSON with the following format

```
{
  id: number
  note: string
  createdAt: Date
  updatedAt: Date
}
```

### DELETE /v1/notes/:id

- possible statuses are `204`, `400`, `404`, `401`

## To be implemented

The endpoints below were not implemented to keep this quick proof-of-concept small in terms of development effort.

The `signup` endpoint will create an user and properly store the hashed password.

The `login` endpoint receives the login credentials and returns a JWT token to be used on subsequent requests. That token should expire, but it should also be renewed on each request.

### POST v1/login

### POST v1/signup

# Database

![Database Diagram](/note-taking-app-db.drawio.png)
