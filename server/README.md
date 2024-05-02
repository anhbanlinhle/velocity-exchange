# Velocity Exchange backend module

## Installation and Boot command

To install prerequisites, run

```
npm ci
```

To boot server, run

```
npm start
```

Server is ready at _http://localhost:1111_

## Usage

### Sign Up

`/auth/sign-up/`

|Parameter|Description|
|-|-|
|`email`|Validated email|
|`password`|Raw password|
|`username`|Required|
|`first_name`|Required|
|`last_name`|Required|
|`dob`|ISO format *"YYYY-MM-DD"*|
|`phone_num`|Validated phone number|

### Login

`auth/login/`

|Parameter|Description|
|-|-|
|`email`|Validated email|
|`password`|Raw password|