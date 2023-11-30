[![CircleCI](https://dl.circleci.com/status-badge/img/gh/ayequill/ShutterSync/tree/main.svg?style=svg&circle-token=1ec3dcff5a5ca8d0559b6a48c3f5881a9706f76b)](https://dl.circleci.com/status-badge/redirect/gh/ayequill/ShutterSync/tree/main)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![React](https://img.shields.io/badge/React-black.svg?logo=react)
![TypeScript](https://img.shields.io/badge/Typescript-black.svg?logo=typescript)
![Chakra](https://img.shields.io/badge/ChakraUi-black.svg?logo=chakraui)
![ExpressJs](https://img.shields.io/badge/Express-black.svg?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-black.svg?logo=mongodb)
![Heroku](https://img.shields.io/badge/Heroku-black.svg?logo=heroku)
![GCP](https://img.shields.io/badge/GoogleCloud-black.svg?logo=googlecloud)
![Jest](https://img.shields.io/badge/Jest-black.svg?logo=jest)

<div style="display: flex; justify-content: center; align-items: center; width: 100%; gap: 25px;">
   <img style="width: 300px;" src="https://res.cloudinary.com/dzpjlfcrq/image/upload/w_400/v1701140611/fc1dayydbmiibpober8t.png" alt="Screenshot 1">
   <img style="width: 200px;" src="https://res.cloudinary.com/dzpjlfcrq/image/upload/w_400/v1701140611/bhhc14yuzvjt880nsqxf.png" alt="Screenshot 2">
</div>

# ShutterSync

ShutterSync aims to address the need for professional photographers to efficiently share and collaborate on their work with clients, enhancing client engagement and project management.

## Documentation

[Documentation](https://docs.shuttersync.live)

[Documentation & Testing](https://api.shuttersync.live/api-docs)
You will need an API_KEY for production server.

## Features

- Lightweight image assets for display and you get to keep your original files
- Light/dark mode toggle
- Responsive design
- User authentication
- User authorization
- User profile management
- Album management
- Photo management
- Photo sharing

## Tech Stack

**Client:** React, TypeScript, Chakra UI, Framermotion

**Server:** Node, Express, JavaScript, MongoDB, Cloudinary, Multer

**Testing:** Jest, React Testing Library, Supertest

**Deployment:** Heroku, Google Cloud Platform, Vercel

## Installation

Run locally. Git clone first.

```bash
  npm install ShutterSync
  cd ShutterSync
```

You will need a Mongo DB setup if you want to run it with your DB.

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`
`DB_URI`
`DB_URI`
`PORT`
`CLOUDINARY_API_KEY`
`MAIL_HOST`
`MAIL_PORT`
`MAIL_USER`
`MAIL_PWD`
`MAIL_DOMAIN`
`GOOGLE_PROJECT_ID`
`GOOGLE_PRIVATE_KEY_ID`
`GOOGLE_PRIVATE_KEY`
`GOOGLE_CLIENT_EMAIL`

### CI Tests
[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/ayequill/ShutterSync/main/lint_test/badge.svg?window=30d&circle-token=f3acaa2ba41774698c4036d6c77791cbb4c5c2a1)](https://app.circleci.com/insights/github/ayequill/ShutterSync/workflows/lint_test/overview?branch=main&reporting-window=last-30-days&insights-snapshot=true)

## API References

### Include a 'x-api-key' header with your API_KEY in all requests

#### Sign up

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Your email   |
| `name`    | `string` | **Required**. Your name    |
| `password`| `string` | **Required**. Your password|

#### Sign in

```http
  POST /api/auth/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Your email   |
| `password`| `string` | **Required**. Your password|

#### Sign out

```http
  GET /api/auth/signout
```

#### Get user

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Update user

```http
  PUT /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to update|
| `name`    | `string` | **Required**. Your name           |
| `email`   | `string` | **Required**. Your email          |
| `password`| `string` | **Required**. Your password       |

#### Delete user

```http
  DELETE /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete|

#### Create an album

```http
  POST /api/users/${userid}/albums
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Required**. Id of user          |
| `name`    | `string` | **Required**. Name of album       |

#### Get an album

```http
  GET /api/users/${userid}/albums/${albumid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Required**. Id of user          |
| `albumid` | `string` | **Required**. Id of album         |

#### Update an album

```http
  PUT /api/users/${userid}/albums/${albumid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Required**. Id of user          |
| `albumid` | `string` | **Required**. Id of album         |
| `name`    | `string` | **Required**. Name of album       |

#### Delete an album

```http
  DELETE /api/users/${userid}/albums/${albumid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Required**. Id of user          |
| `albumid` | `string` | **Required**. Id of album         |

#### Get all albums

```http
  GET /api/users/${userid}/albums
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Required**. Id of user          |

#### Create a photo

```http
  POST /api/users/${userid}/albums/${albumid}/photo
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Required**. Id of user          |
| `albumid` | `string` | **Required**. Id of album         |
| `file`    | `binary` | **Required**. Name of photo       |

#### Get a photo

```http
  GET /api/photos/${photoid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `photoid` | `string` | **Required**. Id of photo         |

#### Update a photo

```http
  PUT /api/photos/${photoid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `photoid` | `string` | **Required**. Id of photo         |

#### Delete a photo

```http
  DELETE /api/photos/${photoid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `photoid` | `string` | **Required**. Id of photo         |

#### Get all photos

```http
  GET /api/users/${userid}/albums/${albumid}/photos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Required**. Id of user          |
| `albumid` | `string` | **Required**. Id of album         |

## Authors

- [Siaw A. Nicholas](https://www.github.com/ayequill)
