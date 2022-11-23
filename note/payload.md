# POST `/api/users`
add user

### payload
```
{
    "id_card": "1234567890001",
    "title_name": "testing001",
    "first_name": "testing001",
    "last_name": "testing001",
    "phone": "0987654001",
    "email": "testing001@gmail.com",
    "birthday": "2015-03-25T12:00:00Z"
}
```

### response
```
{
    "statusCode": 200,
    "message": "success",
    "payload": {
        "id_card": "1234567890001"
    }
}
```
