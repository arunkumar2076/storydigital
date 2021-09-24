
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You need Nodejs, MongoDB installed on your local machine

### Installation


# Step1
```sh
git clone url of bitbucket or github
cd sd
npm install
```
Running on your local machine linux based machine
# Step2
### Run as a localhost
### This will use .env.localhost 
```sh
npm run start
```

# API PostMan collection link
### https://www.getpostman.com/collections/18393ccade8b5e3e3338

# Admin Create API
### Method Post
```sh
body {
    "firstName":"arun",
    "lastName":"kumar",
    "email":"arun1.kumar@cobold.in",
    "mobile":"8969185001",
    "password":"Ums!@#1234"
}
url localhost:5050/admin/v1
```

# Admin Login API
### Method Post
```sh
body {
    "email":"arun1.kumar@cobold.in",
    "password":"Ums!@#1234"
}
url localhost:5050/admin/v1/login
```



# Admin ReadMay Own Post 
### Method Get
```sh
headers {
    "Authorization":"authToken"
}
url localhost:5050/admin/v1
```

# Post Create 
### Method Post
```sh
headers {
    "Authorization":"authToken"
}
url localhost:5050/post/v1
```

# ReadMany Post 
### Method Get
```sh
headers {
    "Authorization":"authToken"
}
url localhost:5050/post/v1
```

# ReadOne Post 
### Method Get
```sh
headers {
    "Authorization":"authToken"
}
url localhost:5050/post/v1/:_id
```

# DeleteOne Post 
### Method Delete
```sh
headers {
    "Authorization":"authToken"
}
url localhost:5050/post/v1/:_id
```


# Filters | ParPage | PageNumber | Sort
### This is optional this 
### You can pass this thing any readMany route Method Get
```sh
    query {
        "filters": {"title":"title","body":"body","status":true,"number":123456,"createdAt":"DD/MM/YYYY"},
        "pageNumber":1,
        "parPage":30,
        "sort":{"title":"descending"}
    }
```