# TaskMaster Project - File-by-File Explanation

This document explains the purpose and functionality of each file in the TaskMaster project. Use this to understand what each file does and explain it to your teacher.

---

## 📁 Project Structure Overview

The project is organized into several directories:
- **`api/`** - Serverless API functions for Vercel deployment
- **`css/`** - Stylesheet files
- **`js/`** - JavaScript application logic
- **Root files** - HTML pages, configuration files, and documentation

---

## 📄 Root Files

### `index.html`
**Purpose:** Login and Registration page

**What it does:**
- Provides the user interface for authentication
- Contains forms for:
  - **Email/Password login** - Standard email and password authentication
  - **Email registration** - Create account with email and password
  - **Phone registration** - Register using Bangladesh phone number with OTP verification
  - **Google OAuth** - One-click sign-in with Google account
- Includes OTP verification form for phone number authentication
- Switches between login and registration views
- Redirects authenticated users to dashboard automatically
- Links to JavaScript files: `supabase.js` and `auth.js`

**Key Features:**
- Responsive design for mobile and desktop
- Form validation
- Error message display
- Loading states for buttons

---

### `dashboard.html`
**Purpose:** Main application dashboard page

**What it does:**
- Main interface after user logs in
- Contains four main views:
  1. **Dashboard View** - Statistics, charts, and overview
  2. **Tasks View** - List of all tasks with filtering and search
  3. **Calendar View** - Calendar showing tasks by date
  4. **Archive View** - Completed/archived tasks
- Includes:
  - Sidebar navigation
  - Task creation/editing modal
  - Daily reminder popup
  - User profile display
  - Logout functionality
- Links to JavaScript files: `supabase.js`, `app.js`, `calendar.js`, and `dragdrop.js`
- Uses Chart.js library for data visualization
- Uses SortableJS library for drag-and-drop functionality

**Key Features:**
- Real-time task management
- Interactive charts and statistics
- Drag-and-drop task reordering
- Task filtering and search
- Calendar integration

---

### `server.js`
**Purpose:** Express.js server for local development and SMS API

**What it does:**
- Runs a local development server on port 3000
- Serves static files (HTML, CSS, JS)
- Provides API endpoints for SMS functionality:
  - `POST /api/send-sms` - Sends SMS via Bangladesh SMS Gateway
  - `GET /api/sms-balance` - Checks SMS account balance
  - `GET /api/health` - Health check endpoint
- Handles CORS (Cross-Origin Resource Sharing) for API requests
- Formats phone numbers for Bangladesh format (+880)
- Integrates with BulkSMS BD API for sending OTP messages
- Provides error handling and response formatting

**Key Features:**
- Development server for testing
- SMS gateway integration
- Phone number validation and formatting
- Error code mapping for SMS API responses

---

### `package.json`
**Purpose:** Node.js project configuration and dependencies

**What it does:**
- Defines project metadata (name, version, description)
- Lists all required dependencies:
  - `express` - Web server framework
  - `cors` - Cross-origin resource sharing middleware
  - `node-fetch` - HTTP client for API calls
- Lists development dependencies:
  - `nodemon` - Auto-restart server during development
- Defines npm scripts:
  - `npm start` - Start the Express server
  - `npm run dev` - Start server with auto-reload
  - `npm run client` - Start a simple HTTP server for frontend

**Key Features:**
- Dependency management
- Script definitions for common tasks
- Project metadata

---

### `vercel.json`
**Purpose:** Vercel deployment configuration

**What it does:**
- Configures CORS headers for API routes
- Sets up headers for `/api/*` endpoints
- Allows cross-origin requests from any domain
- Enables GET, POST, and OPTIONS methods
- Sets Content-Type header

**Key Features:**
- Production deployment configuration
- API endpoint CORS setup

---

### `.gitignore`
**Purpose:** Git version control ignore file

**What it does:**
- Tells Git which files and folders to ignore
- Prevents committing:
  - `node_modules/` - Installed dependencies
  - `.env` files - Environment variables with secrets
  - Log files
  - IDE configuration files
  - OS-specific files (like `.DS_Store` on Mac)
  - Build outputs

**Key Features:**
- Keeps repository clean
- Protects sensitive information
- Prevents committing unnecessary files

---

### `.gitattributes`
**Purpose:** Git file attribute configuration

**What it does:**
- Configures how Git handles text files
- Ensures consistent line endings (LF normalization)
- Prevents line ending conflicts between different operating systems

**Key Features:**
- Cross-platform compatibility
- Consistent file handling

---

### `.vercelignore`
**Purpose:** Vercel deployment ignore file

**What it does:**
- Tells Vercel which files to exclude from deployment
- Excludes:
  - `node_modules/` - Dependencies (installed separately)
  - `.git/` - Git repository files
  - `.vercel/` - Vercel configuration cache
  - `*.log` - Log files
  - `.DS_Store` - Mac system files

**Key Features:**
- Reduces deployment size
- Speeds up deployment process

---

### `README.md`
**Purpose:** Project documentation and user guide

**What it does:**
- Provides comprehensive project documentation
- Includes:
  - Feature list
  - Installation instructions
  - Setup guide for Supabase and SMS gateway
  - Database schema (SQL commands)
  - Running instructions
  - API endpoint documentation
  - Deployment guide
  - Troubleshooting tips

**Key Features:**
- Complete project overview
- Setup instructions
- Usage guide

---

### `SRS_Document.md`
**Purpose:** Software Requirements Specification document

**What it does:**
- Formal documentation of project requirements
- Contains:
  - Project introduction and scope
  - System features and functionality
  - Technical specifications
  - Database schema
  - API specifications
  - User interface requirements
  - Non-functional requirements

**Key Features:**
- Complete project specification
- Requirements documentation
- Technical design details

---

## 📁 API Directory (`api/`)

### `api/health.js`
**Purpose:** Health check serverless function for Vercel

**What it does:**
- Provides a health check endpoint (`GET /api/health`)
- Returns server status and service availability
- Handles CORS preflight requests (OPTIONS)
- Used to verify the API server is running
- Returns JSON response with status information

**Key Features:**
- Server health monitoring
- CORS support
- Simple status endpoint

---

### `api/send-sms.js`
**Purpose:** SMS sending serverless function for Vercel

**What it does:**
- Handles SMS sending requests (`POST /api/send-sms`)
- Accepts phone number and message in request body
- Formats phone numbers for Bangladesh format
- Integrates with BulkSMS BD API
- Handles API responses and error codes
- Provides detailed error messages
- Supports CORS for cross-origin requests

**Key Features:**
- SMS sending functionality
- Phone number formatting
- Error handling
- Production-ready serverless function

---

### `api/sms-balance.js`
**Purpose:** SMS balance check serverless function for Vercel

**What it does:**
- Checks SMS account balance (`GET /api/sms-balance`)
- Queries BulkSMS BD API for account balance
- Returns balance information
- Handles errors gracefully
- Supports CORS

**Key Features:**
- Balance checking
- API integration
- Error handling

---

## 📁 CSS Directory (`css/`)

### `css/style.css`
**Purpose:** Application stylesheet

**What it does:**
- Defines all visual styling for the application
- Contains:
  - **Global styles** - Reset, variables, base styles
  - **Auth page styles** - Login/registration page styling
  - **Dashboard styles** - Main application interface
  - **Task item styles** - Task card styling
  - **Modal styles** - Popup dialogs
  - **Calendar styles** - Calendar view styling
  - **Responsive design** - Mobile and tablet layouts
  - **Animation styles** - Transitions and effects
  - **Chart styles** - Data visualization styling

**Key Features:**
- Complete UI styling
- Responsive design
- Modern, clean interface
- Color-coded priority system
- Dark/light theme support

---

## 📁 JavaScript Directory (`js/`)

### `js/supabase.js`
**Purpose:** Supabase client configuration

**What it does:**
- Initializes the Supabase client
- Sets up connection to Supabase backend
- Configures:
  - Supabase project URL
  - Anonymous API key
- Makes Supabase client available globally as `supabase`
- Required by all other JavaScript files that interact with the database

**Key Features:**
- Database connection setup
- Authentication client initialization
- Global client access

---

### `js/auth.js`
**Purpose:** Authentication logic

**What it does:**
- Handles all authentication functionality:
  - **Email/Password login** - Validates and authenticates users
  - **Email registration** - Creates new user accounts
  - **Phone registration** - Handles phone number registration with OTP
  - **OTP verification** - Verifies SMS OTP codes
  - **Google OAuth** - Handles Google sign-in
- Manages form switching (login ↔ registration)
- Handles OTP sending and verification
- Creates user profiles in database
- Integrates with SMS API for OTP delivery
- Shows error messages and success notifications
- Redirects authenticated users to dashboard

**Key Features:**
- Multiple authentication methods
- OTP verification system
- Form validation
- Error handling
- User profile creation

---

### `js/app.js`
**Purpose:** Main application logic

**What it does:**
- Core functionality for the task management application:
  - **Task CRUD operations** - Create, Read, Update, Delete tasks
  - **Task loading** - Fetches tasks from Supabase database
  - **Task rendering** - Displays tasks in the UI
  - **Task filtering** - Filters tasks by category, priority, status, date
  - **Task search** - Searches tasks by title and description
  - **Task completion** - Marks tasks as complete/incomplete
  - **Recurring tasks** - Creates new tasks for daily/weekly/monthly recurring tasks
  - **Task archiving** - Archives and unarchives tasks
  - **Dashboard statistics** - Calculates and displays task statistics
  - **Chart rendering** - Creates charts using Chart.js:
    - Tasks by category (doughnut chart)
    - Tasks by priority (bar chart)
    - Completion status (doughnut chart)
    - Monthly progress (line chart)
  - **Daily reminders** - Shows daily task reminder popup
  - **View switching** - Manages navigation between Dashboard, Tasks, Calendar, and Archive views
  - **User profile** - Loads and displays user information
  - **Logout** - Handles user logout

**Key Features:**
- Complete task management
- Real-time data updates
- Advanced filtering and search
- Data visualization
- Recurring task support
- Daily reminders

---

### `js/calendar.js`
**Purpose:** Calendar view functionality

**What it does:**
- Renders interactive calendar grid
- Displays tasks on their due dates
- Handles month navigation (previous/next month)
- Highlights today's date
- Shows tasks for selected date
- Supports recurring tasks display:
  - Daily tasks appear every day
  - Weekly tasks appear on same day of week
  - Monthly tasks appear on same day of month
- Integrates with task data from `app.js`
- Updates when tasks are added/modified

**Key Features:**
- Interactive calendar
- Date-based task display
- Recurring task support
- Month navigation

---

### `js/dragdrop.js`
**Purpose:** Drag-and-drop functionality

**What it does:**
- Implements drag-and-drop for task reordering
- Uses SortableJS library
- Handles three drag-and-drop contexts:
  1. **Tasks list** - Reorder active tasks
  2. **Archive list** - Reorder archived tasks
  3. **Calendar date tasks** - Reorder tasks for a specific date
- Updates task order in database when items are moved
- Maintains order_index in database
- Provides visual feedback during dragging
- Prevents dragging empty states

**Key Features:**
- Intuitive task reordering
- Persistent order storage
- Multiple drag-and-drop contexts
- Smooth animations

---

## 🔄 How Files Work Together

### Authentication Flow:
1. User opens `index.html`
2. `index.html` loads `js/supabase.js` and `js/auth.js`
3. User fills registration/login form
4. `auth.js` handles authentication via Supabase
5. For phone registration, `auth.js` calls `server.js` or `api/send-sms.js` to send OTP
6. After authentication, user is redirected to `dashboard.html`

### Task Management Flow:
1. User opens `dashboard.html`
2. `dashboard.html` loads all JavaScript files
3. `app.js` checks authentication and loads user profile
4. `app.js` fetches tasks from Supabase database
5. Tasks are displayed in the UI
6. User interactions (create, edit, delete) update database via Supabase
7. `calendar.js` renders calendar view with tasks
8. `dragdrop.js` enables task reordering
9. Charts are rendered using Chart.js library

### Styling:
- `css/style.css` provides all visual styling
- Applied to both `index.html` and `dashboard.html`
- Ensures consistent design across the application

---

## 📊 Database Tables (Supabase)

The application uses three main database tables:

1. **`profiles`** - Stores user profile information
2. **`phone_otps`** - Stores OTP codes for phone verification
3. **`tasks`** - Stores all task data

These tables are created in Supabase and accessed via the Supabase client in JavaScript files.

---

## 🚀 Deployment

- **Development:** Uses `server.js` for local development
- **Production:** Uses `api/*.js` files as Vercel serverless functions
- **Configuration:** `vercel.json` configures deployment settings

---

## 📝 Summary

This project is a full-stack task management application:
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Supabase (database and authentication)
- **SMS Service:** Bangladesh SMS Gateway API
- **Deployment:** Vercel (serverless functions)

Each file has a specific purpose and works together to create a complete, functional application for managing tasks with multiple authentication methods, task organization, calendar integration, and data visualization.

