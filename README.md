# Laravel + Vue.js Project with Docker

This repository contains a **Laravel backend** and a **Vue.js frontend**, set up with **Docker** to facilitate easy deployment. The project also includes a **MySQL database**.

---

## Prerequisites

Ensure you have the following tools installed on your system:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Git**: [Install Git](https://git-scm.com/)

---

## Step-by-Step Installation Guide

Follow these steps to set up and run the project on your local machine:

## 1. Clone the Repository

Clone the project repository to your local system:

```
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```
## 2. Build and Start Docker Containers

Run the following command from the **root of the project directory** to build and start all Docker containers:

```
docker-compose up --build
```
This will:

- Start the **Laravel backend** on port `8000`.
- Start the **Vue.js frontend** on port `5173`.
- Set up a **MySQL database** on port `3306`.

---

## 3. Set Up Laravel Backend

1. **Navigate to the backend directory**:

```
cd backend
```

2. **Access the Laravel container**:

```
docker exec -it laravel_app bash
```

3. **Install Composer dependencies**:

```
composer install
```

4. **Set up the .env file:**:

```
cp .env.example .env
```

5. **Generate the application key**:

```
php artisan key:generate
```

6. **Run migrations to set up the database structure**:

```
php artisan migrate
```

7. Exit the Laravel container:

```
exit
```

## 4. Set Up Vue.js Frontend

1. **Navigate to the frontend directory**:

```
cd ../frontend
```
2. **Set up the .env file:**:

```
touch .env
```

3. **Access the Vue.js container**:

```
docker exec -it vue_app bash
```

3. **Install npm dependencies**:

```
npm install
```

4. **Exit the Vue.js container**:

```
exit
```

## 5. Update Environment Variables
Update the .env files in both backend and frontend folders with the necessary configurations.

#### Laravel .env file (backend)
Open backend/.env and configure the database settings as follows:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=custom_user
DB_PASSWORD=custom_password
```
#### Vue .env file (frontend)
Open frontend/.env and set the API endpoint:

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```
### 6. Access the Application
Once the setup is complete, you can access the application in your browser:

- Frontend (Vue.js): http://127.0.0.1:5173
- Backend (Laravel): http://127.0.0.1:8000

## Additional Commands

#### To Stop Docker Containers
Run this command in the root of the project directory:

```
docker-compose down
```

#### To View Logs
Run this command in the root of the project directory:

```
docker-compose logs
```
