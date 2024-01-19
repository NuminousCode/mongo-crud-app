In Express.js, the `req` (request) object provides access to various properties and methods that allow you to access information about the incoming HTTP request. Here's a list of some commonly used methods and properties available on the `req` object:

**Properties:**

1. `req.params`: An object containing properties mapped to the named route "parameters." For example, if you have a route pattern like `/users/:userId`, `req.params.userId` would contain the value of `userId` from the URL.

2. `req.query`: An object containing parsed query string parameters. For example, if you have a URL like `/search?query=example`, `req.query.query` would contain the value `"example"`.

3. `req.body`: An object containing the parsed request body. This is typically used for parsing data from HTML forms or JSON request bodies when working with POST or PUT requests.

4. `req.headers`: An object containing the HTTP request headers.

5. `req.cookies`: An object containing parsed cookies sent by the client.

6. `req.originalUrl`: A string containing the original URL of the request, including any query parameters.

7. `req.protocol`: A string containing the HTTP protocol used (e.g., "http" or "https").

8. `req.hostname`: A string containing the hostname from the request headers.

9. `req.ip`: A string containing the IP address of the client.

**Methods:**

1. `req.get(headerName)`: Returns the value of the specified HTTP request header.

2. `req.is(type)`: Checks if the incoming request's `Content-Type` header matches the given MIME type.

3. `req.accepts(types)`: Checks if the incoming request accepts the specified MIME types.

4. `req.acceptsCharsets(charsets)`: Checks if the incoming request accepts the specified character sets.

5. `req.acceptsEncodings(encodings)`: Checks if the incoming request accepts the specified content encodings.

6. `req.acceptsLanguages(languages)`: Checks if the incoming request accepts the specified languages.

7. `req.param(name)`: Returns the value of the named route parameter, query parameter, or request body parameter.

These are some of the most commonly used properties and methods of the `req` object in Express.js. Depending on your application's requirements, you may also find additional properties and methods provided by Express middleware or custom middleware you've added to your application.