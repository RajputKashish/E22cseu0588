# Social Media Analytics Microservice

A microservice for analyzing social media data built with Express.js and React.

## Overview

This application provides API endpoints for monitoring user behavior on a social media platform in real-time, allowing business stakeholders to access analytics data without requiring login.

## Requirements Implemented

- ✅ Top 5 users by post count
- ✅ Popular posts (highest comment count)
- ✅ Latest posts (5 most recent posts)
- ✅ Comment viewing for each post
- ✅ Efficient API usage with caching
- ✅ Clean frontend UI for easy data interpretation

## Quick Start

### One-step Setup

Run the setup script to install all dependencies:

```bash
node setup.js
```

### Manual Setup

#### Server Setup

```bash
cd server
npm install
npm run dev
```

#### Client Setup

```bash
cd client
npm install
npm start
```

## API Endpoints

- **GET /api/users/top**: Returns top 5 users with most posts
- **GET /api/posts/popular**: Returns posts with highest comment counts
- **GET /api/posts/latest**: Returns 5 most recent posts
- **GET /api/posts/:postId/comments**: Returns comments for a specific post

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React
- **API Communication**: Axios
- **Caching**: In-memory with TTL

## Project Structure

```
project/
├── client/             # React frontend
│   ├── public/         # Static files
│   └── src/            # React components and styles
├── server/             # Express.js backend
│   ├── src/            # Server source code
│   └── test.js         # API testing script
├── setup.js           # Project setup script
└── .gitignore         # Git ignore configuration
``` 