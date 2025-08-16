# Command to run at IP:

- To run a Vite project and make it accessible on your local network (i.e., at your computer's IP address), you need to use the --host flag. You can pass the --host flag directly to the vite command. If you are using npm, you need to use -- to separate npm's options from your script's options.

```Bash
npm run dev -- --host
```

## Project Folder structure:

- All the routing is defined inside the `src/route/AppRoute.jsx`
- `utils folder`:
  - **validate.js**: for regex testing at Login time [ email, password and name]
  - **firebase.js**: file for saving the configuration of firebase
  - **.env**: save the key of firebase and to access it we use process.env.{KEY_NAME}

## Understanding the Flavours of .env file

- `.env` → Default environment variables for all environments.
- `.env.local` → Local overrides, not committed to Git (good for secrets in development).
- `.env.production` → For production build.
- `.env.development` → For dev build.

##

# Redux:

- Install 2 libraries: react-redux and toolkit
- Steps:
  - 1. Create a store using configureStore [ appStore.js ]
  - 2. Provide the store to the application -> [ App.js ]

Q: It automatically triggers a callback function whenever: A user signs dont want to implement full logic now just want to see the console log -> this console.log("User is authenticated:", user?.email); then i will dispatch the code. + I Have never called the onAuthStateChanged. how it is called and it is linked to createUserWithEmailAndPassword and signInWithEmailAndPassword internally >p. A user signs in. A user signs out. The page is reloaded, and Firebase checks if a user was previously signed in. This makes it the perfect, centralized place to manage your user's state in Redux.
