# Contact  API Spec

## Create Contact API
Endpoint: POST /api/contacts
Header:
- Authorization: token

Requdest Body:
```json
{
    "first_name": "Hafiz",
    "last_name": "Hafiz",
    "email": "Hafizpratama@gmail.com",
    "phone": "0855321838",
}
```

Response Body Succes:
```json
{
    "data":{
        "id":1,
        "first_name": "Hafiz",
        "last_name": "Hafiz",
        "email": "Hafizpratama@gmail.com",
        "phone": "0855321838",
    }
}
```

Response Body Error:

```json
{
    "errors":"email is not valid"
}
```

## Update Contact API
Endpoint: PUT /api/contacts/:id
Header:
- Authorizztion : Token


Requdest Body:
```json
{
    "first_name": "Hafiz",
    "last_name": "Hafiz",
    "email": "Hafizpratama@gmail.com",
    "phone": "0855321838",
}
```
Response Body Succes:
```json
{
    "data":{
        "id":1,
        "first_name": "Hafiz",
        "last_name": "Hafiz",
        "email": "Hafizpratama@gmail.com",
        "phone": "0855321838",
    }
}
```
Response Body Error:
```json
{
    "errors":"email is not valid"
}
```


## Get Contact API
Endpoint: GET /api/contacts/:id
Header:
- Authorizztion : Token
- 
Response Body Succes:
```json
{
    "data":{
        "id":1,
        "first_name": "Hafiz",
        "last_name": "Hafiz",
        "email": "Hafizpratama@gmail.com",
        "phone": "0855321838",
    }
}
```
Response Body Error:
```json
{
    "errors":"Contact is not found"
}
```

## Search Contact API
Endpoint: GEt /api/contacts
Header:
- Authorizztion : Token
  
Query Params:
- name: Search by first_name or last_name, optional
- email: Search by email using like, optional
- phone: Search by phone number using like, optional
- page: Number of page, default 1
- size: Size Per Page, default 10

   
Response Body Succes: 
```json
{
    "data":
        {
            "id":1,
            "first_name": "Hafiz",
            "last_name": "Hafiz",
            "email": "Hafizpratama@gmail.com",
            "phone": "0855321838",
        },
        {
            "id":2,
            "first_name": "Hafiz",
            "last_name": "Hafiz",
            "email": "Hafizpratama@gmail.   com",
            "phone": "0855321838",
        }
    "paging":{
        "page":1,
        "total_page": 1,
        "total_item": 30,
    }
}
```
Response Body Error:


## Remove Contact API
Endpoint: DELETE /api/contacts/:id
Header:
- Authorizztion : Token
  
Response Body Succes:
```json
{
    "data":"OK"
}
```
Response Body Error:
```json
{
    "errors":"contact is not founf"
}
```
