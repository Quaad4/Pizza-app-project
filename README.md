A full-stack job application with Laravel and React.js. Currently allows for the creation of pizzas, managing pizzas and basic functionality to order a pizza.

Tech Stack
Backend

PHP 8 / Laravel 11
MySQL / MariaDB
RESTful API

Features
Current
Create, view, update and delete pizzas
RESTful API with validation and error handling
Shaped API responses via API Resources

Planned
User authentication (Laravel Sanctum)
Filter and search pizzas
Pagination
Dashboard with orders
Responsive UI with Tailwind CSS

Getting Started
Prerequisites
PHP 8+
Composer
Node.js & npm
MySQL / MariaDB

Installation

Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

Frontend
cd frontend
npm install
npm run dev

API Endpoints
Method	Endpoint	Description
GET	/api/pizzas	List all pizzas
POST	/api/pizzas	Create a pizza
PUT	/api/pizzas/{id}	Update an application
DELETE	/api/pizzas/{id}	Delete an application
