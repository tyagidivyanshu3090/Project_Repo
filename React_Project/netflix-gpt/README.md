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


