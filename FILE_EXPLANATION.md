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

## 📄 Main Directory Files (Root Files)

This section explains each file in the main directory of the project one by one.

---

### 1. `index.html`
**File Type:** HTML Document  
**Purpose:** Login and Registration page (Entry point for authentication)

**What it does:**
- Serves as the entry point of the application
- Provides the user interface for authentication (Feature #1 - Login/Register)
- Contains multiple authentication forms:
  - **Email/Password login** - Standard email and password authentication form
  - **Email registration** - Create account form with email, password, confirm password, and full name fields
  - **Phone registration** - Register using Bangladesh phone number with OTP verification
  - **Google OAuth** - One-click sign-in button with Google account
- Includes OTP verification form that appears after phone registration
- Switches dynamically between login and registration views using JavaScript
- Redirects authenticated users to dashboard automatically
- Links to external JavaScript files:
  - `js/supabase.js` - Supabase client configuration
  - `js/auth.js` - Authentication logic
- Links to external CSS file: `css/style.css`
- Includes CDN links for Supabase JavaScript client library

**Key Features:**
- Responsive design for mobile and desktop devices
- Client-side form validation
- Real-time error message display
- Loading states for buttons during async operations
- Smooth transitions between login and registration views
- Automatic redirect for already authenticated users

**Technical Details:**
- Uses semantic HTML5 elements
- Implements form validation attributes
- Includes accessibility features (labels, ARIA attributes)
- Mobile-first responsive design approach

---

### 2. `dashboard.html`
**File Type:** HTML Document  
**Purpose:** Main application dashboard page (Core application interface)

**What it does:**
- Main interface displayed after user successfully logs in
- Contains four main views that users can navigate between:
  1. **Dashboard View** - Statistics showing completed vs pending tasks, interactive charts, and overview
  2. **Tasks View** - List of all tasks with filtering by category/priority and search by keyword
  3. **Calendar View** - Simple calendar interface showing upcoming tasks organized by date
  4. **Archive View** - Completed/archived tasks with unarchive functionality
- Includes comprehensive UI components:
  - Sidebar navigation menu with view switching
  - Task creation/editing modal with color-coded priority selection
  - **Daily Reminder Popup** ⭐ (Unique Feature #7) - Shows tasks due today when user first logs in
  - User profile display showing full name
  - Logout functionality button (Feature #2)
- Links to multiple JavaScript files:
  - `js/supabase.js` - Database and authentication client
  - `js/app.js` - Main application logic
  - `js/calendar.js` - Calendar view functionality
  - `js/dragdrop.js` - Drag-and-drop task reordering
- Uses external libraries via CDN:
  - Chart.js library for data visualization (4 charts: category, priority, completion, monthly progress)
  - SortableJS library for drag-and-drop task reordering
- Links to CSS file: `css/style.css`

**Key Features:**
- Real-time task management with instant updates
- Interactive charts and statistics (completed vs pending tasks)
- Drag-and-drop task reordering with persistent storage (Feature #9)
- Task filtering by category or priority (Feature #8)
- Search tasks by keyword in title or description (Feature #10)
- Color-coded priority system (Red-High, Orange-Medium, Green-Low) (Feature #4)
- Calendar integration for date-based task viewing (Feature #6)
- Daily reminder notification system (Unique Feature #7)
- Responsive sidebar that collapses on mobile devices
- Modal dialogs for task creation and editing

**Technical Details:**
- Uses semantic HTML5 structure
- Implements view switching without page reload
- Includes data attributes for JavaScript interaction
- Accessible navigation structure

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

### 3. `server.js`
**File Type:** JavaScript (Node.js/Express Server)  
**Purpose:** Express.js server for local development and SMS API endpoints

**What it does:**
- Runs a local development server on port 3000 (configurable)
- Serves static files (HTML, CSS, JS) from the root directory
- Provides RESTful API endpoints for SMS functionality:
  - `POST /api/send-sms` - Sends SMS via Bangladesh SMS Gateway (used for OTP delivery)
  - `GET /api/sms-balance` - Checks SMS account balance
  - `GET /api/health` - Health check endpoint to verify server status
- Handles CORS (Cross-Origin Resource Sharing) for API requests from frontend
- Formats phone numbers for Bangladesh format (+880 prefix)
- Validates phone number format before sending SMS
- Integrates with BulkSMS BD API for sending OTP messages
- Provides comprehensive error handling and standardized response formatting
- Maps SMS gateway error codes to user-friendly messages
- Logs API requests and responses for debugging

**Key Features:**
- Development server for local testing
- SMS gateway integration for phone authentication
- Phone number validation and formatting
- Error code mapping for SMS API responses
- CORS middleware for cross-origin requests
- Static file serving for frontend assets

**Technical Details:**
- Uses Express.js framework
- Implements middleware for CORS and JSON parsing
- Error handling middleware for graceful error responses
- Environment variable support for configuration
- Modular route handling

**Dependencies:**
- `express` - Web server framework
- `cors` - Cross-origin resource sharing middleware
- `node-fetch` - HTTP client for API calls

---

### 4. `package.json`
**File Type:** JSON Configuration File  
**Purpose:** Node.js project configuration, dependencies, and scripts definition

**What it does:**
- Defines project metadata:
  - Project name: "taskmaster-todo-app"
  - Version: "1.0.0"
  - Description: "Advanced Task Manager App with Supabase backend and Bangladesh SMS Gateway"
  - Main entry point: "index.html"
  - Keywords for npm registry
  - License: MIT
  - Node.js engine requirement: >=18.x
- Lists all production dependencies:
  - `express` (^4.18.2) - Web server framework for Node.js
  - `cors` (^2.8.5) - Cross-origin resource sharing middleware
  - `node-fetch` (^2.7.0) - HTTP client for making API requests
- Lists development dependencies:
  - `nodemon` (^3.0.1) - Auto-restart server during development
- Defines npm scripts for common tasks:
  - `npm start` - Start the Express server (production mode)
  - `npm run dev` - Start server with auto-reload using nodemon (development mode)
  - `npm run client` - Start a simple HTTP server for frontend-only testing

**Key Features:**
- Centralized dependency management
- Script definitions for development workflow
- Project metadata and configuration
- Version pinning for dependencies
- Node.js version specification

**Technical Details:**
- Follows npm package.json specification
- Uses semantic versioning (^) for dependency updates
- Separates production and development dependencies
- Defines scripts for different environments

---

### 5. `package-lock.json`
**File Type:** JSON Lock File  
**Purpose:** Lock file for exact dependency versions and dependency tree

**What it does:**
- Locks exact versions of all dependencies and their sub-dependencies
- Ensures consistent installations across different environments
- Records the complete dependency tree structure
- Prevents version conflicts and breaking changes
- Speeds up npm install by providing exact version information
- Ensures all team members and CI/CD systems use identical dependency versions

**Key Features:**
- Version locking for reproducibility
- Version consistency across environments
- Faster installation times
- Dependency tree documentation
- Security vulnerability tracking

**Technical Details:**
- Automatically generated by npm
- Should be committed to version control
- Updated when dependencies are added, removed, or updated
- Contains integrity hashes for package verification
- Includes resolved URLs for each package

**Important Notes:**
- Never manually edit this file
- Always commit this file to version control
- Regenerated automatically when running `npm install`

---

### 6. `vercel.json`
**File Type:** JSON Configuration File  
**Purpose:** Vercel deployment configuration for production environment

**What it does:**
- Configures HTTP headers for API routes in Vercel deployment
- Sets up CORS (Cross-Origin Resource Sharing) headers for `/api/*` endpoints
- Allows cross-origin requests from any domain (`Access-Control-Allow-Origin: *`)
- Enables HTTP methods: GET, POST, and OPTIONS
- Sets Content-Type header for API responses
- Ensures API endpoints are accessible from frontend applications
- Configures routing for serverless functions in the `api/` directory

**Key Features:**
- Production deployment configuration
- API endpoint CORS setup
- Serverless function routing
- Header configuration for API routes

**Technical Details:**
- Uses Vercel's configuration format
- Applies headers to all routes matching `/api/(.*)` pattern
- Enables preflight OPTIONS requests for CORS
- Works with Vercel serverless functions in `api/` directory

**Configuration Structure:**
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type"
        }
      ]
    }
  ]
}
```

---

### 7. `.gitignore`
**File Type:** Text Configuration File  
**Purpose:** Git version control ignore file to exclude files from version control

**What it does:**
- Tells Git which files and folders to ignore and not track
- Prevents committing sensitive or unnecessary files:
  - `node_modules/` - Installed npm dependencies (can be regenerated)
  - `.env` files - Environment variables containing API keys and secrets
  - Log files (`*.log`) - Application and error logs
  - IDE configuration files (`.vscode/`, `.idea/`, etc.)
  - OS-specific files (like `.DS_Store` on Mac, `Thumbs.db` on Windows)
  - Build outputs and compiled files
  - Temporary files and caches
- Keeps the repository clean and focused on source code
- Protects sensitive information like API keys and credentials
- Reduces repository size by excluding large dependency folders

**Key Features:**
- Keeps repository clean and organized
- Protects sensitive information (API keys, secrets)
- Prevents committing unnecessary files
- Reduces repository size
- Standard patterns for Node.js projects

**Common Patterns Included:**
- `node_modules/` - Dependencies
- `.env` - Environment variables
- `*.log` - Log files
- `.DS_Store` - macOS system files
- `.vscode/`, `.idea/` - IDE settings
- `dist/`, `build/` - Build outputs

---

### 8. `.gitattributes`
**File Type:** Text Configuration File  
**Purpose:** Git file attribute configuration for consistent file handling

**What it does:**
- Configures how Git handles different file types
- Ensures consistent line endings (LF normalization) across all platforms
- Prevents line ending conflicts between different operating systems:
  - Windows uses CRLF (`\r\n`)
  - Unix/Linux/Mac uses LF (`\n`)
- Normalizes line endings to LF for text files
- Prevents merge conflicts caused by line ending differences
- Ensures consistent file handling across team members using different operating systems

**Key Features:**
- Cross-platform compatibility
- Consistent file handling
- Prevents line ending conflicts
- Standardizes text file format

**Common Configuration:**
- `* text=auto` - Auto-detect text files
- `*.js text eol=lf` - JavaScript files use LF
- `*.json text eol=lf` - JSON files use LF
- `*.html text eol=lf` - HTML files use LF
- `*.css text eol=lf` - CSS files use LF

---

### 9. `.vercelignore`
**File Type:** Text Configuration File  
**Purpose:** Vercel deployment ignore file to exclude files from deployment

**What it does:**
- Tells Vercel which files and folders to exclude from deployment package
- Reduces deployment size by excluding unnecessary files:
  - `node_modules/` - Dependencies (installed separately by Vercel)
  - `.git/` - Git repository files (not needed in deployment)
  - `.vercel/` - Vercel configuration cache
  - `*.log` - Log files
  - `.DS_Store` - Mac system files
  - Development-only files
- Speeds up deployment process by reducing upload size
- Prevents exposing sensitive development files
- Similar to `.gitignore` but specific to Vercel deployment

**Key Features:**
- Reduces deployment size
- Speeds up deployment process
- Excludes development-only files
- Prevents exposing unnecessary files

**Common Patterns:**
- `node_modules/` - Dependencies
- `.git/` - Version control files
- `.vercel/` - Vercel cache
- `*.log` - Log files
- `.env.local` - Local environment files

---

### 10. `README.md`
**File Type:** Markdown Documentation File  
**Purpose:** Project documentation, user guide, and setup instructions

**What it does:**
- Provides comprehensive project documentation for users and developers
- Includes detailed sections:
  - **Problem Statement** - Explains the problem the application solves
  - **Project Goal** - Describes the objectives of the project
  - **Features List** - All 13 required features with descriptions
  - **Tech Stack** - Complete technology stack information
  - **Prerequisites** - Required software and accounts
  - **Installation Instructions** - Step-by-step setup guide
  - **Database Setup** - SQL commands for creating tables
  - **Running Instructions** - How to start the application
  - **API Endpoints** - Documentation for API routes
  - **Authentication Methods** - Details about each auth method
  - **Deployment Guide** - Vercel deployment instructions
  - **Security Notes** - Important security considerations
  - **Troubleshooting** - Common issues and solutions
  - **Project Structure** - Directory layout
  - **Key Design Features** - Color-coding and daily reminder system
  - **Version Information** - Team credits and completion date

**Key Features:**
- Complete project overview
- Detailed setup instructions
- Comprehensive usage guide
- API documentation
- Troubleshooting guide
- Team and version information

**Target Audience:**
- New developers joining the project
- Users setting up the application
- Project stakeholders
- Teachers and reviewers

---

### 11. `FILE_EXPLANATION.md`
**File Type:** Markdown Documentation File  
**Purpose:** Detailed file-by-file explanation of the entire project

**What it does:**
- Provides comprehensive explanation of every file in the project
- Explains the purpose and functionality of each file
- Documents how files work together
- Includes:
  - Project overview with problem statement and goals
  - All 13 required features checklist
  - Detailed explanation of each root file
  - Explanation of API directory files
  - Explanation of CSS directory files
  - Explanation of JavaScript directory files
  - How files work together (workflow diagrams)
  - Database schema information
  - Deployment information
  - Complete project summary

**Key Features:**
- File-by-file documentation
- Technical details for each component
- Workflow explanations
- Feature mapping to files
- Complete project understanding

**Target Audience:**
- Developers understanding the codebase
- Teachers reviewing the project
- New team members
- Code reviewers

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

