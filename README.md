## Installation

### Run docker

```
docker compose up
```

### Credentialas

```
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=laravel-react
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_PORT=3306
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