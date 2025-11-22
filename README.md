# Google Calendar Clone
A full-featured Google Calendar clone built with React, TypeScript, and Firebase. This application provides calendar management, event scheduling, holiday integration, and user authentication.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (version 14.x or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Google Cloud Console Account** - For Google Calendar API key
- **Firebase Account** - For authentication and database

## Installation

Follow these steps to set up the project on your local machine:

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd google-calendar-clone-main
```

### Step 2: Install Client Dependencies

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

This will install all required packages including:
- React 18.2.0
- TypeScript 5.2.2
- Firebase 10.3.0
- Day.js 1.11.9
- React Draggable 4.4.5
- And other dependencies listed in `package.json`

### Step 3: Install Server Dependencies

Open a new terminal window, navigate to the server directory, and install dependencies:

```bash
cd server
npm install
```

This will install:
- Express 4.18.2
- Google Calendar API client 9.3.1
- TypeScript 5.2.2
- CORS 2.8.5
- And other server dependencies

## Configuration

### Step 1: Configure Client Environment Variables

Create environment files in the `client` directory:

**Create `client/.env`:**
```bash
cd client
touch .env
```

Add the following content:
```dotenv
# Client-side Environment Variables
# Production/Default Configuration

# Holiday API URL - Points to the backend server endpoint
REACT_APP_HOLIDAY_API_URL=http://localhost:5000/api
```

**Create `client/.env.development`:**
```bash
touch .env.development
```

Add the following content:
```dotenv
# Client-side Environment Variables
# Development Configuration

# Holiday API URL - Points to the backend server endpoint for development
REACT_APP_HOLIDAY_API_URL=http://localhost:5000/api
```

### Step 2: Configure Server Environment Variables

Create environment file in the `server` directory:

**Create `server/.env`:**
```bash
cd server
touch .env
```

Add the following content:
```dotenv
# Server-side Environment Variables
# Backend API Configuration

# Google Calendar API Key
# Generate your API key from: https://console.cloud.google.com/
# Make sure to enable the Google Calendar API for your project
API_KEY=your-api-key-here

# Calendar ID for holiday events
# Default value for Google's public holiday calendar
CALENDAR_ID=holiday@group.v.calendar.google.com

# Calendar Region (Optional)
# Default region for holiday events
# For Indian Holidays, use: en.indian
# For US Holidays, use: en.usa
# To find available regions, check: client/src/data/localized-holiday-events.txt
CALENDAR_REGION=en.indian
```

### Step 3: Get Google Calendar API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Calendar API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"
4. Create an API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
5. Replace `your-api-key-here` in `server/.env` with your actual API key

### Step 4: Configure Firebase (Optional - for Authentication)

The Firebase configuration is already set in `client/src/firebase.config.ts`. If you want to use your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication (Google Sign-In)
4. Enable Firestore Database
5. Update `client/src/firebase.config.ts` with your Firebase configuration

## Running the Application

### Step 1: Start the Server

Open a terminal and navigate to the server directory:

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`. You should see:
```
Running the server on port 5000
```

**Note:** Keep this terminal window open while running the application.

### Step 2: Start the Client

Open a **new terminal window** and navigate to the client directory:

```bash
cd client
npm start
```

Or for development mode with environment variables:

```bash
npm run start:dev
```

The React development server will start and automatically open your browser at `http://localhost:3000`.

**Note:** The client is configured to proxy API requests to `http://localhost:5000` (as defined in `client/package.json`).

### Step 3: Enable Holidays (First Time Setup)

1. Click the **Settings icon** (gear icon) in the top-right corner
2. Navigate to **"External Calendars"** section
3. Check the box for **"Indian Holidays"** (or your preferred region)
4. Holidays will be fetched and displayed in your calendar

## Project Structure

```
google-calendar-clone-main/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API integration (holiday fetching)
│   │   ├── components/    # React components
│   │   │   ├── Calendar/  # Main calendar view
│   │   │   ├── MiniCalendar/ # Sidebar mini calendar
│   │   │   ├── Schedules/ # Events and tasks
│   │   │   └── ...
│   │   ├── contexts/      # React context providers
│   │   ├── functions/     # Firebase functions
│   │   ├── hooks/         # Custom React hooks
│   │   └── styles/        # SCSS stylesheets
│   ├── .env               # Client environment variables
│   ├── .env.development   # Development environment variables
│   └── package.json
├── server/                # Express backend API
│   ├── api/
│   │   └── server.ts      # Main server file
│   ├── .env               # Server environment variables
│   └── package.json
└── README.md
```

## Features

- ✅ **Calendars** - Create and manage multiple calendars
- ✅ **Mini Calendar** - Sidebar calendar with event indicators
- ✅ **Schedules** - Create and manage Events and Tasks
- ✅ **Calendar Views** - Day, Week, and 4-day custom view
- ✅ **Draggable Dialogs** - Resizable and repositionable dialogs
- ✅ **Time Indicator** - Real-time current time indicator
- ✅ **External Holiday Events** - Integration with Google Calendar holidays
- ✅ **User Settings** - Customizable calendar preferences
- ✅ **User Authentication** - Firebase Google Sign-In
- ✅ **Firebase Firestore** - Cloud data persistence
- ✅ **Event Indicators** - Visual indicators on mini calendar for dates with events

## Technologies Used

### Frontend
- **React** 18.2.0 - UI library
- **TypeScript** 5.2.2 - Type-safe JavaScript
- **Sass** 1.66.1 - CSS preprocessor
- **Day.js** 1.11.9 - Date manipulation
- **React Draggable** 4.4.5 - Draggable components
- **React Select** 5.7.4 - Select components
- **Firebase** 10.3.0 - Authentication and database

### Backend
- **Express** 4.18.2 - Web framework
- **TypeScript** 5.2.2 - Type-safe JavaScript
- **Google Calendar API** 9.3.1 - Holiday data fetching
- **CORS** 2.8.5 - Cross-origin resource sharing

## Troubleshooting

### Server won't start
- **Issue:** Port 5000 already in use
- **Solution:** 
  - Close other applications using port 5000, or
  - Change the PORT in `server/api/server.ts`

### Client won't connect to server
- **Issue:** CORS errors or connection refused
- **Solution:** 
  - Ensure the server is running on port 5000
  - Check that `REACT_APP_HOLIDAY_API_URL` in client `.env` matches server URL
  - Verify the proxy setting in `client/package.json`

### Holidays not showing
- **Issue:** No holidays visible in calendar
- **Solution:**
  1. Ensure holidays are enabled in Settings → External Calendars
  2. Verify your Google Calendar API key is valid
  3. Check that `CALENDAR_REGION` in server `.env` matches the region you enabled
  4. Check browser console for errors
  5. Verify server is running and accessible at `http://localhost:5000/api/en.indian`

### Date/time issues
- **Issue:** Holidays showing on wrong dates
- **Solution:** The application automatically adjusts dates by subtracting 1 day to correct timezone offsets

### Build errors
- **Issue:** TypeScript or ESLint errors
- **Solution:**
  - Run `npm install` again in both client and server directories
  - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
  - Check that all environment variables are set correctly

## Available Scripts

### Client Scripts
- `npm start` - Start development server
- `npm run start:dev` - Start with development environment variables
- `npm run build` - Build for production
- `npm test` - Run tests

### Server Scripts
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server

## Credits

- Thanks to [drewbot](https://github.com/drewbot/sass-flexbox-grid) for the sass flexbox grid stylesheet
- Thanks to [mattn](https://github.com/mattn) for the available set of holiday events list by region
- Thanks to [icons8](https://icons8.com) for their assets

## Screenshots

![google-calendar-clone](./screenshots/google-calendar-clone__ss.png)

---

**Note:** Make sure both the server and client are running simultaneously for the application to work properly. The client depends on the server API for fetching holiday events.
