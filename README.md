# Full-Stack Login Application

This is a full-stack authentication system built with **Next.js**, **React**, **TypeScript**, **Prisma**, and **React Query**. It includes a secure login and registration system with proper validation, API routes, and database integration.

## 🏗️ Project Structure

The project follows a modular structure:

### 📂 Frontend
- `app/` - Next.js app router pages
- `components/` - Reusable UI components
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and helpers

### 📂 Backend
- `app/api/` - API routes for authentication
- `prisma/` - Prisma schema and database configuration

---

## 🛠️ Tech Stack

### 🌐 Frontend
- **Next.js** (App Router)
- **TypeScript**
- **React Hook Form** (Form handling)
- **Zod** (Schema validation)
- **React Query** (State management & caching)
- **Tailwind CSS** (Styling)

### ⚙️ Backend
- **Next.js API Routes**
- **Prisma ORM** (Database management)
- **PostgreSQL**
- **bcryptjs** (Password hashing)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/HimanshuJ16/login-app-nextjs.git
cd login-app-nextjs
```
### 2️⃣ Install Dependencies
Navigate to the project directory and install the necessary dependencies:   
```
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env.local** file in the root of your project and add the following environment variables:
```
DATABASE_URL="your_postgresql_connection_url"
```

### 4️⃣ Configure the Database
Run Prisma migrations:
```
npx prisma migrate dev --name init
```

### 5️⃣ Start the Development Server
```
npm run dev
# or
yarn dev
```
Now, visit http://localhost:3000 in your browser.

## ✅ Features
🔐 User authentication (Sign-up, login, logout)

✅ Form validation with React Hook Form & Zod

🔑 Secure password hashing using bcryptjs

📡 API routes for authentication with Prisma

⚡ Optimistic UI updates with React Query

🎨 Fully responsive UI using Tailwind CSS

## 🙏 Acknowledgements
##### ✔️ Next.js
##### ✔️ React
##### ✔️ TypeScript
##### ✔️ Prisma
##### ✔️ React Query
##### ✔️ React Hook Form
##### ✔️ Zod
##### ✔️ Tailwind CSS
##### ✔️ bcryptjs
##### ✔️ And all the amazing open-source contributors!