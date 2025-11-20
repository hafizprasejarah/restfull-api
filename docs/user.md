# User API Spec

## Register User API
Endpoint: POST /api/users

Request Body:
```json 
{
    "username": "Hafiz123",
    "password": "adalah",
    "name": "hafiz pratama"
}
```
Response Body Succes:
```json
{
    "data":{
        "username":"hafiz123",
        "name":"hafiz pratama"
    }
}
```
Response Body Errors :
```Json
{
    "errors" : "message1,message2"
}
```
## Login User
Endpoint: POST /api/users/login

Request Body:
```json
{
    "username":"hafiz pratama",
    "password":"adalah"
}
```
Response Body Succes:
```json
{
    "data" : {
        "token": "unique-token"
    }
}
```

Response Body Error :
```json
{
   "errors":"username and password wrong" 
}
```
## Update User
Endpoint: PATCH /api/users/current

Headers:
- Authorization : token

Request Body:
```json
{
    "name":"nama baru", //optional
    "password":"password baru" //optional
}
```

Response Body Success:
```json
{
    "data":{
        "username":"hafiz123",
        "name":"hafiz pratama"
    }
}
```

Response Body Errors:
```json
{
    "errors":"name length max 100"
}
```
## Get user
Endpoint: Get /api/user/current

Headers:
- Authorization : token

Response Body Succes:
```json
{
    "data":{
        "username":"hafiz123",
        "name":"hafiz pratama"
    }
}
```

Response Body Error:
```json
{
    "errors":"Unauthorized"
}
```
## Logout user

Endpoint: DELETE /api/users/logout

Headers:
- Authorization : token

Response Body Succes:
```json
{
    "data":"OK"
}
```

Response Body Errors:
```json
{
    "errors":"Unauthorized"
}
```