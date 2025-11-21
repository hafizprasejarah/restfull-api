# Addres API Spec

## Create Address API 
Endpoint: POST /api/contact/:contactid/addresses

Headers:
- Aunthorization : TOken
  
Reqest Body:
```json
{
    "street":"Jalan",
    "city":"kota",
    "province":"Provinsi",
    "couuntry":"Negara",
    "postal_code":"Kode Pos",
    
}
```

Response Body Succes:
```json
{
    "data":{
        "id":1,
        "street":"Jalan",
        "city":"kota",
        "province":"Provinsi",
        "couuntry":"Negara",
        "postal_code":"Kode Pos",
    }
}
```
Response Body Errors:
```json
{
    "Errors" : "Country is required"
}
``` 


## Update Address API 
Endpoint: PUT /api/contact/:contactid/addresses/:adressid

Headers:
- Aunthorization : TOken
  
Reqest Body:
```json
{
    "street":"Jalan",
    "city":"kota",
    "province":"Provinsi",
    "couuntry":"Negara",
    "postal_code":"Kode Pos",
}
```

Response Body Succes:
```json
{
    "data":{
        "id":1,
        "street":"Jalan",
        "city":"kota",
        "province":"Provinsi",
        "couuntry":"Negara",
        "postal_code":"Kode Pos",
    }
}
```
Response Body Errors:
```json
{
    "errors": "Couuntry is required"
}
``` 
## Get Address API 
Endpoint: GET /api/contact/:contactid/addresses/:addressid

Headers:
- Aunthorization : TOken


Response Body Succes:
```json
{
    "data":{
        "id": 1,
        "street":"Jalan",
        "city":"kota",
        "province":"Provinsi",
        "couuntry":"Negara",
        "postal_code":"Kode Pos",
    }
}
```
Response Body Errors:
```json
{
    "errors":"Contact is not found"
}
``` 

## List Address API 
Endpoint: GET /api/contact/:contactid/addresses


Headers:
- Aunthorization : TOken
 
Response Body Succes:
```json
{
    "data":{
        {
            "id": 1,
            "street":"Jalan",
            "city":"kota",
            "province":"Provinsi",
            "couuntry":"Negara",
            "postal_code":"Kode Pos",
        },{
            "id": 2,
            "street":"Jalan",
            "city":"kota",
            "province":"Provinsi",
            "couuntry":"Negara",
            "postal_code":"Kode Pos",
        }
    }
}
```
Response Body Errors:
```json
{
    "errors": "Contact is not found"
}
``` 
## Remove Address API 
Endpoint: DELETE /api/contact/:contactid/addresses/:addressid

Headers:
- Aunthorization : TOken

Response Body Succes:
```json
{
    "data":"OK"
}
```
Response Body Errors:
```json
{
    "errors": "Addresswa is not found"
}
``` 
