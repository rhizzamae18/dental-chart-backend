# Dental IDP Backend

Backend service for the **Dental IDP** system.
This API handles:

- Image uploads
- OCR extraction using **Gemini AI**
- Persistence of dental records

---

## Tech Stack

- **Node.js + Express (TypeScript)**
- **Prisma**
- **PostgreSQL**
- **Docker**
- **Gemini AI (for OCR and form extraction)**

---

## Prerequisites

Make sure you have the following installed:

- **Node.js**
- **Docker**
- **Git**

## Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:fiesle0901/dental-backend.git
cd dental-backend
npm install
```

## Environment Setup

Copy the example env file:

```bash
cp .env.example .env
```

Generate your own api key here: https://aistudio.google.com/api-keys:

```bash
GEMINI_API_KEY="YOUR_GENERATED_API_KEY"
```

## Local Development

Start the backend and database using Docker:

```bash
docker compose up --build -d
```

## API Access

Once running, the API will be available at:

```bash
http://localhost:5001
```
