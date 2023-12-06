## Installation

### Run docker

```
docker compose up
```

### Credentialas

```
DB_PORT=5432
DB_DATABASE=laravel_docker
DB_USERNAME=postgres
DB_PASSWORD=secret
```

### Create a user

```
[POST]: localhost/api/register
body: {
    "name": "Joy",
    "email": "joy123@example.com",
    "password": "123456789"
}
```