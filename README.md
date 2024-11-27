# URL Shortener API

This is a simple URL shortener API built with Node.js, Express.js, and MongoDB. The API allows users to shorten URLs, retrieve the original URL, and track usage statistics like click count and last accessed timestamp.

## Demo

The application is live and can be accessed at:  
[https://url-shortener-api-2ii4.onrender.com/](https://url-shortener-api-2ii4.onrender.com/)

## Features

- Shorten URLs
- Redirect to original URLs
- View usage statistics (click count and last access timestamp)
- Rate limiting to prevent excessive requests

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via MongoDB Atlas)
- **Other:** rate-limiter-flexible for rate limiting

## Environment Variables

Before running the application, ensure that the following environment variables are set:

- `MONGO_URI` - MongoDB connection string (required)
- `BASE_URL` - Base URL for the shortened URL (used for generating short URLs)

Example `.env` file:
```bash
MONGO_URI=<your-mongodb-atlas-uri> 
BASE_URL=http://localhost:5000
PORT=5000
```
## API Endpoints

### 1. **POST /shorten**
Shortens a given URL.

**Request Body:**

```json
{
  "originalUrl": "https://example.com"
}
```
**Response:**
```json
{
  "shortId": "abcd1234",
  "shortUrl": "https://url-shortener-api-2ii4.onrender.com/abcd1234"
}
```
**Error response:**
```json
{
  "error": "Original URL is required."
}
```

### 2. **GET /:shortId**
Returns the statistics for the shortened URL, including the number of clicks and the last accessed timestamp.

**Request:**

```bash
GET http://localhost:5000/abcd1234

```
**Response:**
Redirects to the original URL, e.g., `https://example.com.`

### 3. **GET /stats/:shortId**
Redirects the user to the original URL.

**Request:**

```bash
GET http://localhost:5000/stats/abcd1234

```
**Response:**
```json
{
  "originalUrl": "https://example.com",
  "clicks": 42,
  "lastAccessed": "2024-11-26T12:34:56Z"
}
```
**Error response:**
```json
{
  "error": "Short URL not found."
}
```

## How to Run the Application Locally

#### 1. Clone the repository
```bash
git clone https://github.com/retrojokerr/Url-shortener-API.git
cd Url-shortener-API
```
#### 2. Install Dependencies
```bash
npm install
```
#### 3. Set Environment Variables
Create a .env file in the root of the project and add your MongoDB URI and the base URL (for local development, use http://localhost:5000):

```env
MONGO_URI=<your-mongodb-atlas-uri>
BASE_URL=http://localhost:5000
PORT=5000
```

#### 4. Start the server
```bash
npm start
```
The app will be running at `http://localhost:5000`

## Deployment

The application is deployed on Render, and the public URL is:
https://url-shortener-api-2ii4.onrender.com/


