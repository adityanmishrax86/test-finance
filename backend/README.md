# Backend

### Note: Rename the .env.example folder to .env and fill the URL and client ID detail mentioned in the sheet

## Authentication

-- backend - localhost:3000 (default)

### DB Setup
1. Install postgres in you system
2. Create a new database
3. Make sure postgres service is running in the background
4. In `.env` update the all the variables starts with DATABASE and NODE_ENV
5. In config directory create config.json and update as below
```
{
    "development": {
        "username": "postgres",
        "password": "postgres",
        "database": "test",
        "host": "localhost",
        "dialect": "postgres"
    }
}
```
6. After all file setup is complete, switch to backend/src location and run `npx sequelize-cli db:migrate` it will create all the required tables at one time
7. Online Setup - In Progress

1. send get request to http://backend/auth/login, user will login using their direct google signin
2. Once logged in it will redirect to /, where through success we can check if the user is successfully logged in or not. With`{"status": true}` or `{"status": false}`, on UI we can show messages along with the reponse as success message or error message [Body may change in future for other data requirement]
3. After successful login it will redirect to /profile route, where we can check user details name and id is there in response or not
4. Send POST request to  http://backend/auth/login with body like `{
	"username":"admin@gmail.com",
	"password":"Hellothere"
}`, once loggedin it rediect to same 'profile' for user details
5. Send POST request to http://backend/auth/signup with body {
	"name":"asdawsa",
	"email":"asdw@gmail.com",
	"password":"Hellothere"
}
4. send get request to http://backend/logout, to logout and check success message to successful logout
5. All the request are authenticated, so non authenticated requests will send response as `
{
	"status": false,
	"message": "Failed to Authenticate Request"
}`
6. Any non matched route will return this message -> `{"message":"Not Found","error":{"status":404}}`

### Routes

|Route|Description  |Request Type   |Response and Description   |
|---|---|---|---|
|`http://backend/user/all` |  Get All Users List | GET | [{users data}] |
|`http://backend/user/:id` |  Get Single User All Details List | GET | {user data}|
|`http://backend/user/update/:id` |  Update User Details | PUT | [0]/[1] 0 - Not updated/ 1 Updated |
|`http://backend/auth/signup` | Signup | POST `{	"name":"awdsa",	"email":"awdsa@gmail.com",	"password":"Hellothere"}` | `{	"status": false,	"message": "User is already registered with us. Please Login with the given Email address."}`|
| `http://backend/auth/login` | Login | POST ` {	"username":"dtmishra43@gmail.com" ,"password":"Hellothere"} `| `{	"status": true,	"user": {		"name": "Aditya Narayan Mishra",		"id": "2b9959ed-3056-48bf-8f68-9206c768d594"	}}` |
| `http://backend/expenses/all` | Get ALl Expenses by User | POST `{ "id":"uuid" }` | `{ expense_data }` |
| `http://backend/expenses/create` | Create User Expenses | POST `{userId: 'uuid', expenseId: '', value: 1000, dateOfExpense: ''} `| {} |
