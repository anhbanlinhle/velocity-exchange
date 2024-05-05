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

### 1. Home Page

`/home/`

|Parameter|Description|
|-|-|
|`pageNo`|Index of page|
|`pageSize`|Number of results per page|

### 2. Auction Details

`/auction/detail/`

|Parameter|Description|
|-|-|
|`auctionId`|Auction's ID|

### 3. Sign Up

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

### 4. Login

`/auth/login/`

|Parameter|Description|
|-|-|
|`email`|Validated email|
|`password`|Raw password|

### 5. Car Inventory

`/car/inventory/`

work in process

### 6. Regist Car

`/car/regist/`

work in process

### 7. Pending Requests List

`/admin/request/`

|Parameter|Description|
|-|-|
|`pageNo`|Index of page|
|`pageSize`|Number of results per page|

### 8. Verification Request Details

`/admin/request/detail/`

|Parameter|Description|
|-|-|
|`requestId`|Verification request's ID|

### 9. Handle Verification Requests

`/admin/request/handle/`

|Parameter|Description|
|-|-|
|`requestId`|Verification request's ID|
|`adminId`|Admin's account ID|
|`status`|*APPROVED* or *REJECTED*|

### 10. Create Auction

`/auction/create/`

|Parameter|Description|
|-|-|
|`name`|Auction's name|
|`accountId`|Registrant's account ID|
|`carId`|Vehicle's ID|
|`startTime`|YYYY-MM-DD HH:MM:SS|
|`endTime`|YYYY-MM-DD HH:MM:SS|
|`bidStep`|Minimum price difference for each bid|
|`initialPrice`|Minimum price|
|`deposit`|Cost to participate in the auction|

### 11. Join Auction

`/auction/join/`

work in process

### 12. Registered Auctions List

`/auction/registered/`

work in process

### 13. Place Bid

`/auction/bid/`

work in process
