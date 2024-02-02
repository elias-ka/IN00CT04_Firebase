# IN00CT04_Firebase

> [!CAUTION]
> Dogshit code ahead, this was a school assignment made in a couple of hours just to learn how to use Firebase.

## What is this?
A simple to-do list app that allows you to create, read, update and delete to-dos from Firestore.

## Demo
See `demo.gif` in the root of the repository. (too lazy to remove black bars and embed it here)

## How to use
```bash
git clone git@github.com:elias-ka/IN00CT04_Firebase.git && cd IN00CT04_Firebase

npm install

# rename .env.example to .env and fill in your Firebase credentials.
# The env variables must be prefixed with VITE_ which is required for Vite to pick them up.
mv .env.example .env

npm run dev # for development
npm run build # for production

open http://localhost:5173
```
