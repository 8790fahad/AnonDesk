# 📮 Anonymous Request Management API

A RESTful API built with **TypeScript**, **Express**, and **Prisma ORM** that enables users to submit, track, and manage anonymous requests. Supports filtering by date, date ranges, and status (optional), and provides admin features like taking, completing, and cancelling requests.

---

## 📁 Project Structure
```markdown
root/
├── src/
│   ├── controllers/
│   │   └── request.ts
│   ├── routes/
│   │   ├── request.ts
│   │   └── postman\_collection.json   # ✅ Postman collection for testing
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
```




---

## 🚀 Getting Started

### 1. 📦 Install Dependencies

```bash
yarn install
````

---

### 2. ⚙️ Configure Environment

Copy the sample environment file and configure your own values:

```bash
cp .env.example .env
```

Update your `.env` with your database config:

```env
DATABASE_URL="mysql://root@localhost:3306/request_db"
```

> 📝 **Note**:
>
> * MySQL password is optional if none is set.
> * You can change `mysql` to any relational database (e.g., `postgresql`).
> * Format:
>   `mysql://<username>:<password>@localhost:3306/<yourdb>`

---

### 3. 🔧 Prisma Setup

Generate and migrate the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

To visually browse your DB:

```bash
npx prisma studio
```

---

### 4. ▶️ Run the Server

```bash
yarn dev
```

The server runs at: [http://localhost:4001](http://localhost:4001)

---

## 📬 API Endpoints

### ➕ Create Request

`POST /api/v1/request/create`

| Field         | Type   | Required | Description          |
| ------------- | ------ | -------- | -------------------- |
| `subject`     | string | ✅        | Title of the request |
| `description` | string | ✅        | Detailed description |

---

### 🔄 Take Request

`PATCH /api/v1/request/in-progress`

| Field | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| `id`  | string | ✅        | Request ID  |

---

### ✅ Complete Request

`PATCH /api/v1/request/complete`

| Field          | Type   | Required | Description             |
| -------------- | ------ | -------- | ----------------------- |
| `id`           | string | ✅        | Request ID              |
| `solutionText` | string | ✅        | Solution of the request |

---

### ❌ Cancel Request

`PATCH /api/v1/request/cancel`

| Field          | Type   | Required | Description                   |
| -------------- | ------ | -------- | ----------------------------- |
| `id`           | string | ✅        | Request ID                    |
| `cancelReason` | string | ✅        | Reason for cancelling request |

---

### 🧹 Cancel All In-Progress Requests

`PATCH /api/v1/request/cancel-all-in-progress`

> No body needed. Cancels all requests with `IN_PROGRESS` status.

---

### 📋 List Requests

`GET /api/v1/request/list`

Filter options via query params:

| Query       | Type   | Required | Description                        |
| ----------- | ------ | -------- | ---------------------------------- |
| `status`    | string | ❌        | Filter by request status           |
| `date`      | string | ❌        | Specific date (`YYYY-MM-DD`)       |
| `startDate` | string | ❌        | Start of date range (`YYYY-MM-DD`) |
| `endDate`   | string | ❌        | End of date range (`YYYY-MM-DD`)   |

#### 🔍 Examples:

```http
GET /api/v1/request/list?startDate=2025-05-01&endDate=2025-05-20

GET /api/v1/request/list?status=NEW&startDate=2025-05-01&endDate=2025-05-20

GET /api/v1/request/list?date=2025-05-20

GET /api/v1/request/list?status=NEW&date=2025-05-20
```

---

## 📦 Postman Collection

To test the API using Postman, import the collection:

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
# Run dev server with live reload
yarn start

# Generate Prisma client
npx prisma generate

# Apply DB migrations
npx prisma migrate dev --name init

# Open Prisma Studio
npx prisma studio
```

---

## 🧪 Tech Stack

* 🟦 Node.js
* ⚙️ Express.js
* 🧠 TypeScript
* 🛢️ Prisma ORM
* 🐬 MySQL
* 📏 Joi (for schema validation)

---

> Built with ❤️ by **Muhammad Fahad Ado(8790fahadado@gmail.com)**


