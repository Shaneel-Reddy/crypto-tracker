# Crypto-Tracker

**Crypto-Tracker** is a cryptocurrency price tracking service developed using Node.js with Express.js for the backend and MongoDB for data storage. The platform fetches real-time cryptocurrency data from the CoinGecko API, providing accurate market insights, price deviations, and historical trends.

Backend Deployed Link : https://crypto-tracker-5k97.onrender.com 

Sample url to fetch latest data about the requested cryptocurrency (GET):
```bash
https://crypto-tracker-5k97.onrender.com/v1/crypto/stats?coin=bitcoin
```

Sample url to fetch the standard deviation of the price of the requested cryptocurrency (GET): 
```bash
https://crypto-tracker-5k97.onrender.com/v1/crypto/deviation?coin=bitcoin
```
---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation Instructions](#installation-instructions)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## Features

- Real-time cryptocurrency price tracking for supported coins (Bitcoin, Ethereum, Matic Network).
- API endpoints for retrieving current statistics and calculating price deviations.
- Scheduled updates to maintain up-to-date cryptocurrency prices.
- Comprehensive error handling and logging with Winston.
- Secure and scalable implementation with middleware for rate limiting and validation.

---

## Technologies Used

- **Node.js**: Backend development.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing cryptocurrency data.
- **CoinGecko API**: Source for real-time cryptocurrency data.
- **Jest**: Unit testing framework.
- **Supertest**: Integration testing for API endpoints.
- **Winston**: Logging.

---

## Prerequisites

Ensure the following software is installed on your system:

- **Node.js** (Latest stable version recommended)
- **MongoDB** (Local or cloud-based instance)
- **Git** (Version control system)

---

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/crypto-tracker.git
cd crypto-tracker
```

### 2. Install Dependencies

Run the following command in the project directory:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGO_URI=<your-mongodb-uri>
COINGECKO_API_BASE_URL=https://api.coingecko.com/api/v3
```

Replace `<your-mongodb-uri>` with your MongoDB connection string.

---

## Running the Application

Start the server using the following command:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Documentation

### Base URL

`http://localhost:3000/v1/crypto`

### Endpoints

#### 1. Get Cryptocurrency Statistics

**GET** `/stats`

Fetches the latest statistics for a specified cryptocurrency.

**Request Query Parameters:**

| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| `coin`    | string | Yes      | The ID of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`). |

**Example Request:**

```bash
GET /v1/crypto/stats?coin=bitcoin
```

**Example Response:**

```json
{
    "price": 95383,
    "marketCap": 1881034122932.035,
    "24hChange": 2.9364115942169144
}
```

#### 2. Get Price Deviation

**GET** `/deviation`

Calculates the price deviation for a cryptocurrency over the last 24 hours.

**Request Query Parameters:**

| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| `coin`    | string | Yes      | The ID of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`). |

**Example Request:**

```bash
GET /v1/crypto/deviation?coin=ethereum
```

**Example Response:**

```json
{
    "deviation": 527.05
}
```

---

## Configuration

- **Rate Limiting**: Configured to limit the number of requests per minute to prevent abuse.
- **Validation Middleware**: Ensures API query parameters are valid before processing requests.
- **Logging**: Winston logs errors and other significant events for easier debugging.

---

## Troubleshooting

- **MongoDB Connection Issues**: Ensure your MongoDB URI in `.env` is correct and accessible.
- **CORS Errors**: Use a CORS middleware if accessing the API from a different domain.
- **API Rate Limit Exceeded**: Wait for a few minutes before retrying.

---

