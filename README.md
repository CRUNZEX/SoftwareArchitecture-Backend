# SoftArch Doc

### API : addUser [POST `/api/users`]

##### payload
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

##### response
```
{
    "statusCode": 200,
    "message": "success",
    "payload": {
        "id_card": "1234567890001"
    }
}
```

### API getUser [GET `/api/users/:id`]

##### response
```
{
    "statusCode": 200,
    "message": "success",
    "payload": {
        "id_card": "1234567890001",
        "title_name": "testing001",
        "first_name": "testing001",
        "last_name": "testing001",
        "phone": "0987654001",
        "email": "testing001@gmail.com",
        "birthday": "2015-03-25T12:00:00.000Z"
    }
}
```

### API updateUser [PUT `/api/users/:id`]

#### payload
```
{
    "id_card": <must have: string>,
    "title_name": <optional: string>, 
    "first_name": <optional: string>,
    "last_name": <optional: string>,
    "phone": <optional: string>,
    "email": <optional: string>,
    "birthday": <optional: string>
}
```

#### response
```
{
    "statusCode": 200,
    "message": "success"
}
```

### API getHospitalList [GET `/hospital`]
```
{
    "statusCode": 200,
    "message": "success",
    "payload": []
}
```

### API searchHospital [GET `/hospital/search`]
```
{
    "keyword": <ชื่อโรงพยาบาล: string>
}
```

response
```
{
    "statusCode": 200,
    "message": "success",
    "payload": []
}
```

### API Appointment [POST `/appointment/<id_card>/<id_hospital>/<appointment_type>`]
```
{
    "id_appointment": "1",
    "illness": "testing",
    "illness_note": "testing",
    "illness_duration": "3",
    "approve": true,
    "appointment_type": "appointment"
}
```

```
{
    "statusCode": 200,
    "message": "success",
}
```

### API getAppointmentList [GET `/appointment/<appointment_type>`]
```
{
    "statusCode": 200,
    "message": "success",
    "payload": [
        {
            "id_appointment": 1,
            "id_card": "1234567890123",
            "datetime": "2022-11-16T10:54:41.074Z",
            "id_hospital": "10",
            "appointment_picture": "-",
            "appointment_datetime": "2022-11-16T10:54:41.075Z",
            "illness": "testing",
            "illness_note": "testing",
            "illness_duration": "3",
            "approve": "true",
            "appointment_type": "appointment"
        }
    ]
}
```

### API getQueueLenght [GET `/queue`]
```
{
    "statusCode": 200,
    "message": "success",
    "payload": [
        {
            "q_date": "20/11/2565",
            "q_time": "09:00 - 09:30น.",
            "patients": "0"
        },
        {
            "q_date": "19/11/2565",
            "q_time": "10:00 - 10:30น.",
            "patients": "5"
        },
        {
            "q_date": "19/11/2565",
            "q_time": "11:00 - 11:30น.",
            "patients": "6"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "12:00 - 12:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "13:00 - 13:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "14:00 - 14:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "15:00 - 15:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "16:00 - 16:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "17:00 - 17:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "18:00 - 18:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "19:00 - 19:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "20:00 - 20:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "21:00 - 21:30น.",
            "patients": "0"
        },
        {
            "q_date": "20/11/2565",
            "q_time": "22:00 - 22:30น.",
            "patients": "0"
        }
    ]
}
```