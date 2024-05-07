# Velocity Exchange backend module

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

|Parameter|Description|
|-|-|
|`userId`|User's account ID|

### 6. Car Detail

`/car/detail/`

|Parameter|Description|
|-|-|
|`carId`|Car's ID|

### 7. Regist Car

`/car/regist/`

work in process

### 8. Pending Requests List

`/admin/request/`

|Parameter|Description|
|-|-|
|`pageNo`|Index of page|
|`pageSize`|Number of results per page|

### 9. Filter Verification Request

`/admin/request/filter/`

|Parameter|Description|
|-|-|
|`pageNo`|Index of page|
|`pageSize`|Number of results per page|
|`status`|*PENDING* or *APPROVED* or *REJECTED*|

### 10. Verification Request Details

`/admin/request/detail/`

|Parameter|Description|
|-|-|
|`requestId`|Verification request's ID|

### 11. Handle Verification Requests

`/admin/request/handle/`

|Parameter|Description|
|-|-|
|`requestId`|Verification request's ID|
|`adminId`|Admin's account ID|
|`status`|*APPROVED* or *REJECTED*|

### 12. Create Auction

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

### 13. Regist Auction

`/auction/regist/`

|Parameter|Description|
|-|-|
|`userId`|Account's ID|
|`auctionId`|Auction's ID|

### 14. Unregist Auction

`/auction/unregist/`

|Parameter|Description|
|-|-|
|`userId`|Account's ID|
|`auctionId`|Auction's ID|

### 15. Registered/Unregistered Auctions List

`/auction/filter/`

|Parameter|Description|
|-|-|
|`pageNo`|Index of page|
|`pageSize`|Number of results per page|
|`userId`|Account's ID|
|`filter`|*REGISTERED* or *UNREGISTERED*|

### 16. Place Bid

`/auction/bid/`

|Parameter|Description|
|-|-|
|`userId`|User's account ID|
|`auctionId`|Auction ID|
|`price`|Price of the bid|

### 17. Check Auction Winner

`/auction/winner/`

|Parameter|Description|
|-|-|
|`userId`|User's account ID|
|`auctionId`|Auction ID|