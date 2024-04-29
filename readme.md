# Cubify

<div>
    <img src="readmeMaterials/cubifyPoster.png">
</div>

## How to run

```
make up
```

## Example of the environment file (.env)

```
POSTGRES_DB=cubify
POSTGRES_USER=jhon
POSTGRES_PASSWORD=🤫
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL="postgresql://jhon:🤫@db:5432/cubify"

#Google Oauth Credentials
clientID=🤫
clientSecret=🤫
callbackURL='http://localhost:5029/auth/google/callback'

PGADMIN_PORT=5053

FRONTEND_DEV_PORT=2950
BACKEND_DEV_PORT=5029

SECRET_KEY=🤫
REFRESH_KEY=🤫
ACCESS_EXPIRE_TIME='15s'
REFRESH_EXPIRE_TIME='3h'

CUBE_IMAGES='cube_images'

VITE_BACKEND_URL='http://localhost:5029'
FRONTEND_URL='http://localhost:2950'

```
