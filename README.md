
---

```markdown
# 📮 Anonymous Request Management API

A RESTful API built with **TypeScript**, **Express**, and **Prisma ORM** that enables users to submit, track, and manage anonymous requests. Supports filtering by date, date ranges and status but is optional, and provides admin features like taking, completing, and cancelling requests.

---

## 📁 Project Structure

```

root/
├── src/
│   ├── controllers/
│   │   └── request.ts      
│   ├── routes/
│   │   ├── request.ts       
│   │   └── postman\_collection.json # Postman collection for testing
│   ├── schema/
│   │   └── schema.ts        
│   ├── types/               
│   ├── utils/               
│   └── app.ts              
├── prisma/
│   └── schema.prisma        
├── .env                     
├── .env.example             
├── package.json             
├── tsconfig.json            
├── yarn.lock                
└── README.md                

````

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
yarn install
````

### 2. Configure Environment

Copy the sample environment file and configure it:

```bash
cp .env.example .env
```

Set your MySQL connection string:

```env
DATABASE_URL="mysql://root@localhost:3306/request_db"
```

> ℹ️ MySQL password is optional if none is set locally.
DATABASE_URL="mysql://username:password@localhost:5432/
you can change mysql to any relational data base of your choice e.g postgresql
username:replace with your database username
password:replace with your database password 
yourdb: replace with the name of your database
---

### 3. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

To visually browse your DB:

```bash
npx prisma studio
```

---

### 4. Run the Server

```bash
yarn dev
```

Server will start at: [http://localhost:4001](http://localhost:4001)

---

## 📬 API Endpoints

### ➕ Create Request

`POST /api/v1/request/create`

| Field   | Type   | Required | Description          |
| ------- | ------ | -------- | -------------------- |
| subject | string |    ✅    | Title of the request |
| description | string |    ✅    | Detailed description |

---
### 🔄 Take a Request into work

`PATCH /api/v1/request/in-progress`
| Field   | Type   | Required | Description          |
| ------- | ------ | -------- | -------------------- |
| id | string |    ✅    | Request id|

---

### ✅ Complete a Request

`PATCH /api/v1/request/complete`

| Field        | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| solutionText | string | ✅        | Solution for the request |
| id | string | ✅        | Request id |

---


### ❌ Cancel a Request

`PATCH /api/v1/request/cancel`

| Field        | Type   | Required | Description                   |
| ------------ | ------ | -------- | ----------------------------- |
| cancelReason | string | ✅        | Reason for cancelling request |
| id | string | ✅        | Request id |

---

### 🧹 Cancel All In-Progress Requests

`PATCH /api/v1/request/cancel-all-in-progress`

No request body is needed. This cancels all requests with status `in_progress`.

---

### 📋 List Requests

`GET /api/v1/request/list`

Filter using the query parameters below:

| Query     | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| status    | string | ❌        | Filter by request status               |
| date      | string | ❌        | Filter by specific date (`YYYY-MM-DD`) |
| startDate | string | ❌        | Start of date range (`YYYY-MM-DD`)     |
| endDate   | string | ❌        | End of date range (`YYYY-MM-DD`)       |

Example:

```http
GET /api/v1/request/list?startDate=2025-05-01&endDate=2025-05-20
```

```http
GET /api/v1/request/list?status=NEW&startDate=2025-05-01&endDate=2025-05-20
```

```http
GET /api/v1/request/list?date=2025-05-20
```

```http
GET /api/v1/request/list?status=NEW&date=2025-05-20
```
---



## 📦 Postman Collection

To test the API using Postman, import the collection file from:

```
src/routes/postman_collection.json
```

---

## 🏷️ Request Status Values

* `NEW`
* `IN_PROGRESS`
* `COMPLETED`
* `CANCELLED`

---

## 🛠️ Scripts

```bash
# Run the dev server with live reload
yarn dev

# Generate Prisma client
npx prisma generate

# Apply DB migrations
npx prisma migrate dev --name init

# Open Prisma Studio
npx prisma studio
```

---

## 🧪 Tech Stack

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* MySQL
* Joi (schema validation)

---



```



```
