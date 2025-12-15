# 🦷 Dental Chart IDP Backend

A **Node.js + Express** backend service for the **Dental Chart Intelligent Document Processing (IDP)** system. This service handles file uploads, AI-powered data extraction using **Google Gemini AI**, and data persistence with **PostgreSQL + Prisma ORM**.

---

## 📋 Table of Contents

* [Tech Stack](#-tech-stack)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)
* [Environment Configuration](#-environment-configuration)
* [Database Setup](#-database-setup)
* [Running the Application](#-running-the-application)
* [API Endpoints](#-api-endpoints)
* [Project Structure](#-project-structure)
* [Testing](#-testing)
* [Troubleshooting](#-troubleshooting)
* [Development Notes](#-development-notes)
* [Contributing](#-contributing)
* [License](#-license)
* [Support](#-support)

---

## 🛠 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Language**: TypeScript
* **Database**: PostgreSQL
* **ORM**: Prisma
* **AI Service**: Google Gemini AI
* **File Upload**: Multer
* **Development Tools**: Nodemon, ts-node

---

## ✅ Prerequisites

Ensure the following are installed:

* **Node.js** v18 or higher
* **npm** v9 or higher
* **PostgreSQL** v14 or higher
* **Google Gemini API Key**

---

## 📦 Installation

```bash
cd dental-chart-backend
npm install
```

---

## ⚙️ Environment Configuration

### Setup

```bash
cp .env.example .env
```

### `.env` Example

```env
# Server
PORT=5002

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dental_db?schema=public"

# Gemini AI
GEMINI_API_KEY="your-gemini-api-key"
```

### Configuration Details

* **PORT**: Server port (default: `5002`)
* **DATABASE_URL**: PostgreSQL connection string
* **GEMINI_API_KEY**: Google Gemini API key

---

## 🗄️ Database Setup

### 1. Create Database

```bash
psql -U postgres
CREATE DATABASE dental_db;
\q
```

### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

### 3. Run Migrations

```bash
npm run prisma:migrate
```

### 4. Verify (Optional)

```bash
npx prisma studio
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Server runs at: `http://localhost:5002`

### Production Mode

```bash
npm run build
npm start
```

---

## 🔌 API Endpoints

### Health Check

* **GET** `/`

```bash
curl http://localhost:5002/
```

---

### Page 1 – Patient Information & Medical History

* **POST** `/api/extract/page1`
* **Body**: `file` (image)
* **Response**: Extracted data + `patientId`

---

### Page 2 – Dental Chart

* **POST** `/api/extract/page2`
* **Body**:

  * `file` (image)
  * `patientId`
* **Response**: Dental chart data + `dentalChartId`

---

### Page 3 – Informed Consent

* **POST** `/api/extract/page3`
* **Body**:

  * `file` (image)
  * `dentalChartId`

---

### Page 4 – Treatment Records

* **POST** `/api/extract/page4`
* **Body**:

  * `file` (image)
  * `dentalChartId`

---

## 📁 Project Structure

```text
dental-backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   │   └── multer.ts
│   ├── controllers/
│   │   ├── page1_controller.ts
│   │   ├── page2_controller.ts
│   │   ├── page3_controller.ts
│   │   └── page4_controller.ts
│   ├── lib/
│   │   └── gemini.ts
│   ├── prompts/
│   │   ├── page_1_prompt.txt
│   │   ├── page_2_prompt.txt
│   │   ├── page_3_prompt.txt
│   │   └── page_4_prompt.txt
│   ├── routes/
│   │   └── extractRoutes.ts
│   ├── services/
│   │   └── extractionService.ts
│   └── index.ts
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Testing

### cURL Example (Page 1)

```bash
curl -X POST http://localhost:5002/api/extract/page1 \
  -F "file=@/path/to/page1.jpg"
```

### Postman

1. Create **POST** request
2. URL: `http://localhost:5002/api/extract/page1`
3. Body → `form-data`
4. Key: `file` (File)

### Database Check

```bash
npx prisma studio
```

---

## 🔧 Troubleshooting

### Database Connection Error

* Ensure PostgreSQL is running
* Verify `DATABASE_URL`

### Gemini API Errors (429)

* Free tier quota exceeded
* Wait or upgrade plan

### Port Already in Use

* Change `PORT` in `.env`
* Kill existing process

### Prisma Client Error

```bash
npm run prisma:generate
```

---

## 📝 Development Notes

### Add New Endpoint

1. Add controller in `controllers/`
2. Register route in `extractRoutes.ts`
3. Update prompt if needed

### Modify Schema

```bash
npx prisma migrate dev --name your_change
npm run prisma:generate
```

### Environment Safety

* Never commit `.env`
* Use `.env.example` as template

---

## 🤝 Contributing

1. Create feature branch
2. Commit changes
3. Test thoroughly
4. Open pull request

---

## 🆘 Support

* Review troubleshooting
* Check API documentation
* Contact the development team

---

**Last Updated**: December 2025
