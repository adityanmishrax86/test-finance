# Backend

### Note: Rename the .env.example folder to .env and fill the URL and client ID detail mentioned in the sheet

## Authentication

-- backend - localhost:3000 (default)

1. send get request to http://backend/login, user will login using their email or direct google/apple signin
2. Once logged in it will redirect to /, where through success we can check if the user is successfully logged in or not. [Body may change in future for other data requirement]
3. send get request to http://backend/profile, to get user details [Route and permission may change]
4. send get request to http://backend/logout, to logout and check success message to successful logout
5. Before sending any request to backend first check if user is logged in or not by calling http://backend and check the success message.[This url will be changed, Facing some issues at Auth0 service]
6. Any non matched route will return this message -> `{"message":"Not Found","error":{"status":404}}`