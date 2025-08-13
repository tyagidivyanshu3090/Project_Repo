# Command to run at IP:

- To run a Vite project and make it accessible on your local network (i.e., at your computer's IP address), you need to use the --host flag. You can pass the --host flag directly to the vite command. If you are using npm, you need to use -- to separate npm's options from your script's options.

```Bash
npm run dev -- --host
```


## Project Folder structure:

- All the routing is defined inside the `src/route/AppRoute.jsx`
- utils folder:
    - validate.js: for regex testing at Login time