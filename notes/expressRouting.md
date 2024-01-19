In an Express.js application, you don't necessarily need to create a separate route handler for every page or resource in your app. The approach you take depends on the structure and complexity of your application.

Here are some considerations:

1. **Static Files**: For static pages (e.g., HTML, CSS, JavaScript files), you can use `express.static` middleware to serve them from a directory like "public." This allows you to serve multiple static files without creating individual route handlers for each file.

   ```javascript
   app.use(express.static("public"));
   ```

   With this setup, any file within the "public" directory can be accessed directly via its URL.

2. **Dynamic Routes**: For dynamic routes that require server-side processing or involve database queries, you'll need individual route handlers to define the behavior for those specific routes. This is common for handling different views, processing form submissions, or responding to API requests.

   ```javascript
   app.get("/page1", (req, res) => {
     // Your code for /page1 route
   });

   app.get("/page2", (req, res) => {
     // Your code for /page2 route
   });
   ```

   Each route handler can serve a different page or perform different actions based on the URL.

3. **Route Parameters**: You can also use route parameters to create dynamic routes that capture values from the URL. This allows you to handle similar routes with a single route handler.

   ```javascript
   app.get("/users/:userId", (req, res) => {
     const userId = req.params.userId;
     // Your code to handle user-specific pages
   });
   ```

   In this example, a single route handler can serve multiple user-specific pages based on the "userId" parameter in the URL.

4. **Route Modularity**: For larger applications, you might want to organize your routes into separate modules or files to keep your codebase maintainable. You can use Express Router to create modular route handlers.

   ```javascript
   // In a separate route file (e.g., routes.js)
   const express = require("express");
   const router = express.Router();

   router.get("/page1", (req, res) => {
     // Your code for /page1 route
   });

   // Export the router
   module.exports = router;

   // In server.js
   const routes = require("./routes");
   app.use("/", routes);
   ```

   This approach helps organize your code and makes it easier to manage routes for different parts of your application.

In summary, you don't need a separate route handler for every page or resource, but you should create route handlers based on the specific needs of your application. Use `express.static` for static files and create route handlers for dynamic routes, API endpoints, or pages that require server-side processing. Organize your code in a way that suits the complexity and structure of your application.