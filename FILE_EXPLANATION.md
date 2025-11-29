# TaskMaster Project - File-by-File Explanation

This document explains the purpose and functionality of each file in the TaskMaster project. Use this to understand what each file does and explain it to your teacher.

## 📋 Project Overview

### Problem Statement
Students and individuals struggle to organize daily tasks and assignments effectively. Without a proper task management system, users face difficulties in tracking multiple tasks, prioritizing work, remembering deadlines, organizing by categories, visualizing upcoming tasks, and managing recurring tasks efficiently.

### Project Goal
Build a comprehensive to-do application (TaskMaster) that helps users track tasks and deadlines effectively through an intuitive interface, multiple visualization options, a unique daily reminder system, and comprehensive task organization features.

### Core Features (All 13 Required Features)
1. Login / Register (Email, Phone with OTP, Google OAuth)
2. Logout Functionality
3. Task CRUD (Add, Update, Delete, Mark Complete)
4. Deadlines with Color-Coded Priority (High-Red, Medium-Orange, Low-Green)
5. Archive Completed Tasks
6. Simple Calendar View
7. Daily Reminder Popup/Notification (Unique Feature)
8. Filter Tasks by Category or Priority
9. Drag-and-Drop Reordering
10. Search Tasks by Keyword
11. Dashboard Analytics (Completed vs Pending)
12. Recurring Tasks (Daily, Weekly, Monthly)
13. Tech Stack: HTML, CSS, JS + Node.js/Express + Supabase (PostgreSQL)

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
  1. **Dashboard View** - Statistics showing completed vs pending tasks, charts, and overview
  2. **Tasks View** - List of all tasks with filtering by category/priority and search by keyword
  3. **Calendar View** - Simple calendar interface showing upcoming tasks organized by date
  4. **Archive View** - Completed/archived tasks
- Includes:
  - Sidebar navigation
  - Task creation/editing modal with color-coded priority selection
  - **Daily Reminder Popup** ⭐ (Unique Feature) - Shows tasks due today when user first logs in
  - User profile display
  - Logout functionality
- Links to JavaScript files: `supabase.js`, `app.js`, `calendar.js`, and `dragdrop.js`
- Uses Chart.js library for data visualization (4 charts: category, priority, completion, monthly progress)
- Uses SortableJS library for drag-and-drop task reordering

**Key Features:**
- Real-time task management
- Interactive charts and statistics (completed vs pending tasks)
- Drag-and-drop task reordering with persistent storage
- Task filtering by category or priority
- Search tasks by keyword
- Color-coded priority system (Red-High, Orange-Medium, Green-Low)
- Calendar integration
- Daily reminder notification system

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
  - **Task item styles** - Task card styling with color-coded priority indicators
  - **Priority color coding** - Red for High, Orange for Medium, Green for Low priority
  - **Modal styles** - Popup dialogs including daily reminder modal
  - **Calendar styles** - Simple calendar view styling
  - **Responsive design** - Mobile and tablet layouts
  - **Animation styles** - Transitions and effects
  - **Chart styles** - Data visualization styling

**Key Features:**
- Complete UI styling
- Responsive design
- Modern, clean interface
- **Color-coded priority system** - Visual indicators for task priorities:
  - High Priority: Red color (#FF0000 or similar)
  - Medium Priority: Orange color (#FFA500 or similar)
  - Low Priority: Green color (#00FF00 or similar)
- Dark/light theme support
- Daily reminder popup styling

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
- Handles all authentication functionality (Feature #1 - Login/Register):
  - **Email/Password login** - Validates and authenticates users
  - **Email registration** - Creates new user accounts with email, password, and full name
  - **Phone registration** - Handles Bangladesh phone number registration with OTP verification
  - **OTP verification** - Verifies 6-digit SMS OTP codes (valid for 5 minutes)
  - **Google OAuth** - Handles one-click Google sign-in
- Manages form switching (login ↔ registration)
- Handles OTP sending and verification via SMS API
- Creates user profiles in database automatically
- Integrates with SMS API for OTP delivery
- Shows error messages and success notifications
- Redirects authenticated users to dashboard
- **Logout functionality** (Feature #2) - Terminates user session and redirects to login

**Key Features:**
- Multiple authentication methods (Email, Phone OTP, Google OAuth)
- OTP verification system with expiration
- Form validation (email format, password length, phone number format)
- Error handling with user-friendly messages
- Automatic user profile creation
- Secure session management

---

### `js/app.js`
**Purpose:** Main application logic

**What it does:**
- Core functionality for the task management application:
  - **Task CRUD operations** - Create, Read, Update, Delete tasks
  - **Task loading** - Fetches tasks from Supabase database
  - **Task rendering** - Displays tasks in the UI with color-coded priority indicators
  - **Task filtering** - Filters tasks by category (Work, Personal, Study, Health, Other) or priority (High, Medium, Low)
  - **Task search** - Searches tasks by keyword in title and description
  - **Task completion** - Marks tasks as complete/incomplete
  - **Recurring tasks** - Creates new task instances for daily/weekly/monthly recurring tasks
  - **Task archiving** - Archives and unarchives completed tasks
  - **Dashboard statistics** - Calculates and displays completed vs pending task statistics
  - **Chart rendering** - Creates charts using Chart.js:
    - Tasks by category (doughnut chart)
    - Tasks by priority (bar chart)
    - Completion status showing completed vs pending (doughnut chart)
    - Monthly progress (line chart)
  - **Daily reminders** ⭐ **Unique Feature** - Shows daily task reminder popup when user first logs in each day, displaying tasks due today
  - **View switching** - Manages navigation between Dashboard, Tasks, Calendar, and Archive views
  - **User profile** - Loads and displays user information
  - **Logout** - Handles user logout functionality
  - **Priority color coding** - Applies color indicators (Red-High, Orange-Medium, Green-Low) to tasks

**Key Features:**
- Complete task management (CRUD operations)
- Real-time data updates
- Advanced filtering by category or priority
- Search by keyword
- Data visualization (completed vs pending tasks)
- Recurring task support (Daily, Weekly, Monthly)
- Daily reminder notification system (unique feature)
- Color-coded priority system

---

### `js/calendar.js`
**Purpose:** Calendar view functionality (Feature #6 - Simple Calendar View)

**What it does:**
- Renders simple interactive calendar grid
- Displays tasks on their deadline dates
- Handles month navigation (previous/next month)
- Highlights today's date
- Shows tasks for selected date
- Supports recurring tasks display:
  - Daily tasks appear every day
  - Weekly tasks appear on same day of week
  - Monthly tasks appear on same day of month
- Integrates with task data from `app.js`
- Updates when tasks are added/modified
- Shows task count indicators on calendar dates

**Key Features:**
- Simple calendar interface (Feature #6)
- Date-based task display
- Recurring task support (Feature #12)
- Month navigation
- Visual task indicators on dates

---

### `js/dragdrop.js`
**Purpose:** Drag-and-drop functionality (Feature #9)

**What it does:**
- Implements drag-and-drop for task reordering
- Uses SortableJS library
- Handles three drag-and-drop contexts:
  1. **Tasks list** - Reorder active tasks
  2. **Archive list** - Reorder archived tasks
  3. **Calendar date tasks** - Reorder tasks for a specific date
- Updates task order in database when items are moved
- Maintains order_index in database for persistent storage
- Provides visual feedback during dragging
- Prevents dragging empty states

**Key Features:**
- Intuitive task reordering (Feature #9)
- Persistent order storage in database
- Multiple drag-and-drop contexts
- Smooth animations and visual feedback

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

This project is a full-stack task management application designed to solve the problem of organizing daily tasks and assignments:

### Problem Solved
Students and individuals struggle with task organization. TaskMaster provides a comprehensive solution with intuitive task management, visual priority indicators, multiple views, and a unique daily reminder system.

### All 13 Required Features Implemented
1. ✅ Login / Register (Email, Phone OTP, Google OAuth)
2. ✅ Logout Functionality
3. ✅ Task CRUD (Add, Update, Delete, Mark Complete)
4. ✅ Deadlines with Color-Coded Priority (High-Red, Medium-Orange, Low-Green)
5. ✅ Archive Completed Tasks
6. ✅ Simple Calendar View
7. ✅ Daily Reminder Popup/Notification (Unique Feature)
8. ✅ Filter Tasks by Category or Priority
9. ✅ Drag-and-Drop Reordering
10. ✅ Search Tasks by Keyword
11. ✅ Dashboard Analytics (Completed vs Pending)
12. ✅ Recurring Tasks (Daily, Weekly, Monthly)
13. ✅ Tech Stack: HTML, CSS, JS + Node.js/Express + Supabase (PostgreSQL)

### Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend:** Node.js with Express.js framework
- **Database:** Supabase (PostgreSQL with Row Level Security)
- **Authentication:** Supabase Auth (Email/Password, Phone OTP, Google OAuth)
- **SMS Service:** Bangladesh SMS Gateway API
- **Deployment:** Vercel (serverless functions) or Node.js Express server
- **Libraries:** Chart.js (visualization), SortableJS (drag-and-drop)

### Key Design Features
- **Color-Coded Priority System:** Visual indicators (Red-High, Orange-Medium, Green-Low) help users quickly identify task urgency
- **Daily Reminder System:** Unique popup notification feature that shows tasks due today when users first log in each day
- **Comprehensive Task Management:** Full CRUD operations with filtering, searching, and drag-and-drop reordering
- **Multiple Views:** Dashboard, List, Calendar, and Archive views for different task management needs
- **Real-Time Updates:** Task changes reflected immediately across all views

Each file has a specific purpose and works together to create a complete, functional application for managing tasks with multiple authentication methods, task organization, calendar integration, data visualization, and the unique daily reminder feature.

