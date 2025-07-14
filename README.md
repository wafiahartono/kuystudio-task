## Project Setup Guide

This project includes a **Laravel 12** backend and a **Next.js 15** frontend.

---

### Backend: Laravel 12

#### Prerequisites

- **PHP** 8.2 or newer
- **Composer** (dependency manager for PHP)
- A local database (e.g., MySQL)

#### Setup Steps

1. **Navigate to the backend directory:**
    ```sh
    cd backend-laravel
    ```
2. **Install dependencies:**
    ```sh
    composer install
    ```
3. **Configure environment variables:**
    - Copy the example environment file:
      ```sh
      cp .env.example .env
      ```
    - Open the `.env` file and update the database credentials and any other necessary settings (e.g., `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) to match your local environment.

4. **Generate the application key:**
    ```sh
    php artisan key:generate
    ```
5. **Create the database** `kuystudio_task_backend_laravel` in your database server.
6. **Run migrations and seeders:**
    ```sh
    php artisan migrate:fresh --seed
    ```
7. **Start the backend server:**
    ```sh
    php artisan serve
    ```

> **Note:** The backend provides API endpoints only; there is no built-in user interface.

---

### Frontend: Next.js 15

#### Prerequisites

- **Node.js** 18.18 or newer
- **npm** (Node package manager)

#### Setup Steps

1. **Navigate to the frontend directory:**
    ```sh
    cd frontend-nextjs
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Start the frontend development server:**
    ```sh
    npm run dev
    ```
4. **Open your browser and visit:**
    ```
    http://localhost:3000
    ```

> **Note:** Ensure the backend server is running before using the frontend to enable API communication.
