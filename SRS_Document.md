# Software Requirements Specification (SRS)
## TaskMaster - Advanced Task Management Application

**Version:** 1.0  
**Date:** January 2025  
**Document Status:** Final

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Features](#3-system-features)
4. [External Interface Requirements](#4-external-interface-requirements)
5. [System Constraints](#5-system-constraints)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Appendices](#7-appendices)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a comprehensive description of the TaskMaster application, an advanced task management system designed to help users organize, track, and manage their daily tasks efficiently. This document is intended for developers, project managers, stakeholders, and quality assurance teams.

### 1.2 Scope
TaskMaster is a web-based task management application that enables users to:
- Create, edit, delete, and organize tasks
- Set task priorities, categories, and deadlines
- View tasks in multiple views (Dashboard, List, Calendar, Archive)
- Receive daily task reminders
- Track task completion statistics
- Manage recurring tasks
- Authenticate via multiple methods (Email, Phone with OTP, Google OAuth)

The system integrates with Supabase for backend services and a Bangladesh SMS gateway for phone-based authentication.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification
- **OTP**: One-Time Password
- **OAuth**: Open Authorization
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete
- **UI**: User Interface
- **UX**: User Experience
- **CORS**: Cross-Origin Resource Sharing
- **RLS**: Row Level Security

### 1.4 References
- Supabase Documentation: https://supabase.com/docs
- Chart.js Documentation: https://www.chartjs.org/docs/
- IEEE 830-1998: Recommended Practice for Software Requirements Specifications

### 1.5 Overview
This document is organized into sections covering system overview, functional requirements, interface requirements, constraints, and non-functional requirements. Each section provides detailed specifications for the TaskMaster application.

---

## 2. Overall Description

### 2.1 Product Perspective
TaskMaster is a standalone web application that operates as a client-server architecture:
- **Frontend**: HTML, CSS, JavaScript (vanilla JS)
- **Backend**: Supabase (PostgreSQL database, Authentication, Real-time capabilities)
- **SMS Service**: Bangladesh SMS Gateway API (bulksmsbd.net)
- **Deployment**: Vercel (serverless functions) or Node.js Express server

### 2.2 Product Functions
The system provides the following major functions:

1. **User Authentication**
   - Email/password registration and login
   - Phone number registration with OTP verification
   - Google OAuth integration
   - Session management

2. **Task Management**
   - Create tasks with title, description, deadline, priority, category
   - Edit existing tasks
   - Delete tasks
   - Mark tasks as complete/incomplete
   - Archive/unarchive tasks
   - Recurring task support (daily, weekly, monthly)

3. **Task Organization**
   - Categorize tasks (Work, Personal, Study, Health, Other)
   - Set priority levels (High, Medium, Low)
   - Filter and search tasks
   - Drag-and-drop task reordering

4. **Task Visualization**
   - Dashboard with statistics and charts
   - Calendar view for date-based task viewing
   - List view with filtering options
   - Archive view for completed tasks

5. **Analytics and Reporting**
   - Task completion statistics
   - Category distribution charts
   - Priority distribution charts
   - Monthly progress tracking

6. **Notifications and Reminders**
   - Daily task reminder popup
   - Overdue task indicators
   - Today's task notifications

### 2.3 User Classes and Characteristics
The system serves the following user classes:

1. **End Users**
   - Individuals seeking to manage personal or professional tasks
   - Users with basic computer literacy
   - Users requiring mobile and desktop access
   - Users in Bangladesh (for SMS OTP functionality)

2. **Administrators** (Future)
   - System administrators managing user accounts
   - Support staff handling user issues

### 2.4 Operating Environment
- **Client-side**: Modern web browsers (Chrome, Firefox, Safari, Edge) with JavaScript enabled
- **Server-side**: Node.js 18+ or Vercel serverless functions
- **Database**: Supabase (PostgreSQL)
- **Network**: Internet connection required for all operations
- **Mobile**: Responsive design for mobile devices

### 2.5 Design and Implementation Constraints
- Must use Supabase for backend services
- Must support Bangladesh phone number format for SMS OTP
- Must be responsive for mobile devices
- Must work in modern browsers (ES6+ support)
- Must comply with CORS policies for API access

### 2.6 Assumptions and Dependencies
- Users have internet connectivity
- Users have valid email addresses or phone numbers
- Supabase service is available and accessible
- SMS gateway service is operational
- Users have JavaScript enabled in browsers
- Google OAuth credentials are configured

---

## 3. System Features

### 3.1 User Authentication

#### 3.1.1 Email Registration
**Priority:** High  
**Description:** Users can register using email and password.

**Functional Requirements:**
- FR-AUTH-001: System shall allow users to register with email, password, and full name
- FR-AUTH-002: System shall validate email format
- FR-AUTH-003: System shall enforce minimum password length of 6 characters
- FR-AUTH-004: System shall require password confirmation matching
- FR-AUTH-005: System shall create user profile upon successful registration
- FR-AUTH-006: System shall automatically redirect to dashboard after registration

**Inputs:**
- Email address
- Password (minimum 6 characters)
- Confirm password
- Full name

**Outputs:**
- Success message or error message
- Redirect to dashboard on success

**Processing:**
1. Validate email format
2. Validate password length and confirmation match
3. Create user account in Supabase Auth
4. Create user profile in profiles table
5. Redirect to dashboard

#### 3.1.2 Email Login
**Priority:** High  
**Description:** Registered users can log in with email and password.

**Functional Requirements:**
- FR-AUTH-007: System shall authenticate users with email and password
- FR-AUTH-008: System shall display error message for invalid credentials
- FR-AUTH-009: System shall redirect authenticated users to dashboard
- FR-AUTH-010: System shall maintain user session

**Inputs:**
- Email address
- Password

**Outputs:**
- Success message or error message
- Redirect to dashboard on success

#### 3.1.3 Phone Registration with OTP
**Priority:** High  
**Description:** Users can register using Bangladesh phone numbers with OTP verification.

**Functional Requirements:**
- FR-AUTH-011: System shall accept Bangladesh phone number format (+880, 880, or 0 prefix)
- FR-AUTH-012: System shall validate phone number format (1[3-9]XXXXXXXXX)
- FR-AUTH-013: System shall generate 6-digit OTP code
- FR-AUTH-014: System shall store OTP in database with 5-minute expiration
- FR-AUTH-015: System shall send OTP via SMS to user's phone
- FR-AUTH-016: System shall display OTP verification form after SMS sent
- FR-AUTH-017: System shall verify OTP code within expiration time
- FR-AUTH-018: System shall allow OTP resend functionality
- FR-AUTH-019: System shall create user account upon successful OTP verification
- FR-AUTH-020: System shall mark OTP as verified after successful verification

**Inputs:**
- Full name
- Phone number (Bangladesh format)
- Password (minimum 6 characters)
- OTP code (6 digits)

**Outputs:**
- SMS with OTP code
- Success/error messages
- Redirect to dashboard on success

**Processing:**
1. Validate phone number format
2. Generate 6-digit OTP
3. Store OTP in phone_otps table with expiration
4. Send SMS via Bangladesh SMS Gateway
5. Display OTP verification form
6. Verify OTP code
7. Create user account with phone-based email
8. Create user profile
9. Redirect to dashboard

#### 3.1.4 Google OAuth Authentication
**Priority:** Medium  
**Description:** Users can sign in or register using Google account.

**Functional Requirements:**
- FR-AUTH-021: System shall provide Google OAuth sign-in button
- FR-AUTH-022: System shall redirect to Google authentication page
- FR-AUTH-023: System shall handle OAuth callback and create user session
- FR-AUTH-024: System shall create user profile from Google account data
- FR-AUTH-025: System shall redirect to dashboard after successful authentication

**Inputs:**
- Google account credentials (handled by Google)

**Outputs:**
- Redirect to Google OAuth page
- Redirect to dashboard on success

#### 3.1.5 Logout
**Priority:** High  
**Description:** Users can log out of the system.

**Functional Requirements:**
- FR-AUTH-026: System shall provide logout functionality
- FR-AUTH-027: System shall terminate user session
- FR-AUTH-028: System shall redirect to login page after logout

### 3.2 Task Management

#### 3.2.1 Create Task
**Priority:** High  
**Description:** Users can create new tasks with various attributes.

**Functional Requirements:**
- FR-TASK-001: System shall allow users to create tasks with title (required)
- FR-TASK-002: System shall allow optional task description
- FR-TASK-003: System shall require deadline date and time
- FR-TASK-004: System shall allow priority selection (Low, Medium, High)
- FR-TASK-005: System shall allow category selection (Work, Personal, Study, Health, Other)
- FR-TASK-006: System shall allow recurring task selection (None, Daily, Weekly, Monthly)
- FR-TASK-007: System shall set default deadline to tomorrow if not specified
- FR-TASK-008: System shall assign order_index for task sorting
- FR-TASK-009: System shall associate task with logged-in user
- FR-TASK-010: System shall display success notification after task creation

**Inputs:**
- Task title (required)
- Task description (optional)
- Deadline (date and time, required)
- Priority (required)
- Category (required)
- Recurring type (optional, default: none)

**Outputs:**
- Task created in database
- Success notification
- Task appears in task list

**Processing:**
1. Validate required fields
2. Set default deadline if not provided
3. Insert task into tasks table
4. Update task list display
5. Update dashboard statistics

#### 3.2.2 Edit Task
**Priority:** High  
**Description:** Users can modify existing tasks.

**Functional Requirements:**
- FR-TASK-011: System shall allow users to edit task details
- FR-TASK-012: System shall pre-populate form with existing task data
- FR-TASK-013: System shall update task in database
- FR-TASK-014: System shall display success notification after update
- FR-TASK-015: System shall refresh task list after update

**Inputs:**
- Task ID
- Updated task fields

**Outputs:**
- Updated task in database
- Success notification
- Refreshed task display

#### 3.2.3 Delete Task
**Priority:** High  
**Description:** Users can permanently delete tasks.

**Functional Requirements:**
- FR-TASK-016: System shall allow users to delete tasks
- FR-TASK-017: System shall require confirmation before deletion
- FR-TASK-018: System shall permanently remove task from database
- FR-TASK-019: System shall display success notification after deletion
- FR-TASK-020: System shall update statistics after deletion

**Inputs:**
- Task ID
- Confirmation (yes/no)

**Outputs:**
- Task removed from database
- Success notification
- Updated task list

#### 3.2.4 Mark Task Complete/Incomplete
**Priority:** High  
**Description:** Users can toggle task completion status.

**Functional Requirements:**
- FR-TASK-021: System shall allow users to mark tasks as complete
- FR-TASK-022: System shall allow users to mark tasks as incomplete
- FR-TASK-023: System shall update task completion status in database
- FR-TASK-024: System shall prevent duplicate completion processing
- FR-TASK-025: System shall create recurring task instance when recurring task is completed
- FR-TASK-026: System shall prevent duplicate recurring task creation
- FR-TASK-027: System shall update dashboard statistics after status change

**Inputs:**
- Task ID
- Completion status (checkbox toggle)

**Outputs:**
- Updated task status
- New recurring task (if applicable)
- Updated statistics

**Processing:**
1. Toggle completion status
2. If completing a recurring task:
   - Check for existing incomplete recurring task
   - Calculate next occurrence date
   - Create new task instance
3. Update database
4. Refresh display

#### 3.2.5 Archive Task
**Priority:** Medium  
**Description:** Users can archive completed tasks.

**Functional Requirements:**
- FR-TASK-028: System shall allow users to archive tasks
- FR-TASK-029: System shall require confirmation before archiving
- FR-TASK-030: System shall set archived flag to true
- FR-TASK-031: System shall remove archived tasks from active task list
- FR-TASK-032: System shall display archived tasks in archive view
- FR-TASK-033: System shall update statistics after archiving

**Inputs:**
- Task ID
- Confirmation (yes/no)

**Outputs:**
- Task archived in database
- Task removed from active list
- Success notification

#### 3.2.6 Unarchive Task
**Priority:** Medium  
**Description:** Users can restore archived tasks.

**Functional Requirements:**
- FR-TASK-034: System shall allow users to unarchive tasks
- FR-TASK-035: System shall set archived flag to false
- FR-TASK-036: System shall restore task to active task list
- FR-TASK-037: System shall update statistics after unarchiving

**Inputs:**
- Task ID

**Outputs:**
- Task restored to active list
- Success notification

#### 3.2.7 Recurring Tasks
**Priority:** Medium  
**Description:** System automatically creates recurring task instances.

**Functional Requirements:**
- FR-TASK-038: System shall support daily recurring tasks
- FR-TASK-039: System shall support weekly recurring tasks
- FR-TASK-040: System shall support monthly recurring tasks
- FR-TASK-041: System shall create new task instance when recurring task is completed
- FR-TASK-042: System shall calculate next occurrence date based on recurring type
- FR-TASK-043: System shall prevent duplicate recurring task creation
- FR-TASK-044: System shall copy task attributes to new recurring instance
- FR-TASK-045: System shall display recurring badge on recurring tasks

**Processing:**
- Daily: Add 1 day to deadline
- Weekly: Add 7 days to deadline
- Monthly: Add 1 month to deadline

### 3.3 Task Organization and Filtering

#### 3.3.1 Task Search
**Priority:** Medium  
**Description:** Users can search tasks by title or description.

**Functional Requirements:**
- FR-FILTER-001: System shall provide search input field
- FR-FILTER-002: System shall search in task title
- FR-FILTER-003: System shall search in task description
- FR-FILTER-004: System shall perform case-insensitive search
- FR-FILTER-005: System shall filter task list in real-time as user types
- FR-FILTER-006: System shall combine search with other filters

**Inputs:**
- Search query (text)

**Outputs:**
- Filtered task list matching search query

#### 3.3.2 Task Filtering
**Priority:** Medium  
**Description:** Users can filter tasks by various criteria.

**Functional Requirements:**
- FR-FILTER-007: System shall allow filtering by category (All, Work, Personal, Study, Health, Other)
- FR-FILTER-008: System shall allow filtering by priority (All, High, Medium, Low)
- FR-FILTER-009: System shall allow filtering by status (All, Active, Completed)
- FR-FILTER-010: System shall allow filtering by date
- FR-FILTER-011: System shall combine multiple filters
- FR-FILTER-012: System shall apply filters to task list display

**Inputs:**
- Category filter selection
- Priority filter selection
- Status filter selection
- Date filter selection

**Outputs:**
- Filtered task list

### 3.4 Task Views

#### 3.4.1 Dashboard View
**Priority:** High  
**Description:** Users can view task statistics and analytics on dashboard.

**Functional Requirements:**
- FR-VIEW-001: System shall display completed tasks count
- FR-VIEW-002: System shall display pending tasks count
- FR-VIEW-003: System shall display overdue tasks count
- FR-VIEW-004: System shall display tasks due today count
- FR-VIEW-005: System shall display tasks by category chart (doughnut chart)
- FR-VIEW-006: System shall display tasks by priority chart (bar chart)
- FR-VIEW-007: System shall display completion status chart (doughnut chart)
- FR-VIEW-008: System shall display monthly progress chart (line chart)
- FR-VIEW-009: System shall update statistics in real-time
- FR-VIEW-010: System shall calculate overdue tasks correctly (excluding recurring tasks on their occurrence date)

**Outputs:**
- Statistics cards with counts
- Four interactive charts
- Real-time updates

#### 3.4.2 Tasks List View
**Priority:** High  
**Description:** Users can view all tasks in a list format.

**Functional Requirements:**
- FR-VIEW-011: System shall display all active tasks in list format
- FR-VIEW-012: System shall display task title, description, deadline, category, priority
- FR-VIEW-013: System shall highlight overdue tasks
- FR-VIEW-014: System shall display recurring task badge
- FR-VIEW-015: System shall provide edit, archive, delete actions for each task
- FR-VIEW-016: System shall support drag-and-drop reordering
- FR-VIEW-017: System shall save task order to database
- FR-VIEW-018: System shall display empty state when no tasks exist

**Outputs:**
- Task list with all task details
- Interactive task items

#### 3.4.3 Calendar View
**Priority:** Medium  
**Description:** Users can view tasks in calendar format.

**Functional Requirements:**
- FR-VIEW-019: System shall display monthly calendar grid
- FR-VIEW-020: System shall highlight dates with tasks
- FR-VIEW-021: System shall allow navigation between months
- FR-VIEW-022: System shall display tasks for selected date
- FR-VIEW-023: System shall handle recurring tasks in calendar view
- FR-VIEW-024: System shall show task count on calendar dates

**Inputs:**
- Month navigation (previous/next)
- Date selection

**Outputs:**
- Monthly calendar grid
- Tasks for selected date

#### 3.4.4 Archive View
**Priority:** Medium  
**Description:** Users can view archived tasks.

**Functional Requirements:**
- FR-VIEW-025: System shall display all archived tasks
- FR-VIEW-026: System shall allow unarchive action
- FR-VIEW-027: System shall allow delete action for archived tasks
- FR-VIEW-028: System shall display empty state when no archived tasks exist

**Outputs:**
- List of archived tasks
- Unarchive and delete options

### 3.5 Notifications and Reminders

#### 3.5.1 Daily Task Reminder
**Priority:** Medium  
**Description:** System displays daily reminder popup with today's tasks.

**Functional Requirements:**
- FR-REMIND-001: System shall display reminder popup on first login of the day
- FR-REMIND-002: System shall show tasks due today in reminder
- FR-REMIND-003: System shall include recurring tasks that occur today
- FR-REMIND-004: System shall display task priority and time in reminder
- FR-REMIND-005: System shall show "No tasks due today" message if applicable
- FR-REMIND-006: System shall track last login date to prevent duplicate reminders
- FR-REMIND-007: System shall allow user to close reminder modal

**Outputs:**
- Modal popup with today's tasks
- Task details (title, priority, time)

**Processing:**
1. Check last login date from localStorage
2. If different from today, show reminder
3. Filter tasks due today (including recurring)
4. Display in modal
5. Update last login date

### 3.6 User Profile Management

#### 3.6.1 Profile Display
**Priority:** Low  
**Description:** System displays user profile information.

**Functional Requirements:**
- FR-PROFILE-001: System shall display user's full name in sidebar
- FR-PROFILE-002: System shall create profile automatically for new users
- FR-PROFILE-003: System shall handle Google OAuth user profile creation

**Outputs:**
- User name displayed in UI

---

## 4. External Interface Requirements

### 4.1 User Interfaces

#### 4.1.1 Login/Registration Page
- **Layout**: Centered authentication form
- **Components**: 
  - Google OAuth button
  - Email login form
  - Email registration form
  - Phone registration form with OTP verification
  - Form toggle links
- **Responsive**: Mobile-friendly design
- **Styling**: Modern, clean interface with icons

#### 4.1.2 Dashboard Page
- **Layout**: Sidebar navigation + main content area
- **Components**:
  - Sidebar with navigation menu
  - Statistics cards (4 cards)
  - Chart containers (4 charts)
  - Top bar with menu toggle and add task button
- **Responsive**: Collapsible sidebar on mobile
- **Styling**: Card-based layout with color-coded statistics

#### 4.1.3 Tasks List Page
- **Layout**: Sidebar + main content with filters
- **Components**:
  - Search bar
  - Filter controls (category, priority, status, date)
  - Task list with drag-and-drop
  - Task item cards with actions
- **Responsive**: Stacked layout on mobile

#### 4.1.4 Calendar Page
- **Layout**: Sidebar + calendar grid + task list
- **Components**:
  - Month navigation controls
  - Calendar grid (7x6 layout)
  - Selected date task list
- **Responsive**: Stacked layout on mobile

#### 4.1.5 Archive Page
- **Layout**: Sidebar + archived task list
- **Components**:
  - List of archived tasks
  - Unarchive and delete actions
- **Responsive**: Mobile-friendly list

### 4.2 Hardware Interfaces
- **Client**: Standard web browser on desktop, tablet, or mobile device
- **Server**: Node.js server or Vercel serverless functions
- **Network**: Internet connection for API calls

### 4.3 Software Interfaces

#### 4.3.1 Supabase Integration
- **Purpose**: Backend database and authentication
- **Interface**: Supabase JavaScript Client Library
- **Endpoints**:
  - Authentication API
  - Database queries (PostgreSQL)
  - Real-time subscriptions
- **Configuration**: 
  - Supabase URL: `https://opzonawvmxrftaommxsp.supabase.co`
  - Anonymous key configured

#### 4.3.2 SMS Gateway Integration
- **Purpose**: Send OTP codes via SMS
- **Provider**: bulksmsbd.net
- **Interface**: HTTP REST API
- **Endpoints**:
  - `/api/send-sms` (POST)
  - `/api/sms-balance` (GET)
- **Configuration**:
  - API Key: Configured in server
  - Sender ID: 8809617623731
  - API URL: `http://bulksmsbd.net/api/smsapi`

#### 4.3.3 Google OAuth Integration
- **Purpose**: Google account authentication
- **Interface**: Supabase OAuth provider
- **Configuration**: OAuth credentials configured in Supabase

#### 4.3.4 Chart.js Integration
- **Purpose**: Data visualization
- **Interface**: Chart.js library (CDN)
- **Charts**: Doughnut, Bar, Line charts

#### 4.3.5 SortableJS Integration
- **Purpose**: Drag-and-drop functionality
- **Interface**: SortableJS library (CDN)
- **Usage**: Task reordering

### 4.4 Communication Interfaces
- **Protocol**: HTTP/HTTPS
- **Data Format**: JSON
- **CORS**: Enabled for cross-origin requests
- **Authentication**: JWT tokens (Supabase)

---

## 5. System Constraints

### 5.1 Regulatory Constraints
- Must comply with data protection regulations
- Must handle user data securely
- Must comply with SMS gateway terms of service

### 5.2 Hardware Constraints
- Requires modern web browser with JavaScript support
- Requires internet connectivity
- Mobile devices must support responsive design

### 5.3 Software Constraints
- Node.js 18+ required for server
- Modern browser with ES6+ support
- Supabase account and project required
- SMS gateway account and API key required

### 5.4 Interface Constraints
- Must use Supabase for backend (cannot change)
- Must use Bangladesh SMS gateway format
- Must support CORS for API access

### 5.5 Operational Constraints
- SMS service availability depends on third-party provider
- Supabase service availability required
- Internet connectivity required for all operations

---

## 6. Non-Functional Requirements

### 6.1 Performance Requirements
- **Page Load Time**: Dashboard should load within 2 seconds
- **Task Operations**: Create, update, delete operations should complete within 1 second
- **Search/Filter**: Filtering should be instantaneous (client-side)
- **Chart Rendering**: Charts should render within 1 second
- **SMS Delivery**: OTP SMS should be sent within 10 seconds

### 6.2 Security Requirements
- **Authentication**: All user actions require authentication
- **Password Security**: Minimum 6 characters, stored securely (hashed)
- **OTP Security**: OTP codes expire after 5 minutes
- **Session Management**: Secure session handling via Supabase
- **Data Isolation**: Users can only access their own tasks (RLS)
- **HTTPS**: All communications should use HTTPS in production
- **Input Validation**: All user inputs validated client and server-side
- **XSS Protection**: HTML escaping for user-generated content

### 6.3 Reliability Requirements
- **Uptime**: System should be available 99% of the time
- **Error Handling**: Graceful error handling with user-friendly messages
- **Data Persistence**: All task data persisted in database
- **Recovery**: System should recover from temporary network failures

### 6.4 Usability Requirements
- **User Interface**: Intuitive and easy to navigate
- **Mobile Support**: Fully responsive design
- **Accessibility**: Keyboard navigation support
- **Error Messages**: Clear, actionable error messages
- **Loading States**: Visual feedback for async operations
- **Help Text**: Contextual help and tooltips

### 6.5 Scalability Requirements
- **User Capacity**: Support for unlimited users (Supabase limits)
- **Task Capacity**: Support for thousands of tasks per user
- **Concurrent Users**: Support multiple concurrent users
- **Database**: Scalable PostgreSQL database via Supabase

### 6.6 Maintainability Requirements
- **Code Organization**: Modular JavaScript files
- **Documentation**: Code comments and documentation
- **Version Control**: Git-based version control
- **Error Logging**: Console logging for debugging

### 6.7 Portability Requirements
- **Browser Compatibility**: Works on Chrome, Firefox, Safari, Edge
- **Platform Independence**: Works on Windows, macOS, Linux, iOS, Android
- **Deployment**: Supports Vercel and traditional Node.js hosting

### 6.8 Compatibility Requirements
- **Backward Compatibility**: Maintain compatibility with existing data
- **API Compatibility**: Compatible with Supabase API versions
- **Browser Support**: Modern browsers (last 2 versions)

---

## 7. Appendices

### 7.1 Database Schema

#### 7.1.1 Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    deadline TIMESTAMPTZ NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    category TEXT NOT NULL CHECK (category IN ('work', 'personal', 'study', 'health', 'other')),
    recurring TEXT DEFAULT 'none' CHECK (recurring IN ('none', 'daily', 'weekly', 'monthly')),
    completed BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 7.1.2 Profiles Table
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 7.1.3 Phone OTPs Table
```sql
CREATE TABLE phone_otps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    full_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    attempts INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.2 API Endpoints

#### 7.2.1 SMS API Endpoints
- **POST /api/send-sms**
  - Request Body: `{ phoneNumber: string, message: string }`
  - Response: `{ success: boolean, message: string, code?: string }`

- **GET /api/sms-balance**
  - Response: `{ success: boolean, balance: string }`

- **GET /api/health**
  - Response: `{ status: string, message: string, services: object }`

### 7.3 Error Codes

#### 7.3.1 SMS Gateway Error Codes
- 202: Success
- 1001: Invalid phone number
- 1002: Sender ID not correct or disabled
- 1003: Required fields missing
- 1005: Internal SMS gateway error
- 1006: Balance validity not available
- 1007: Insufficient SMS balance
- 1011: User ID not found
- 1031: Account not verified
- 1032: IP not whitelisted

### 7.4 Phone Number Format
- **Bangladesh Format**: 
  - Valid formats: `+8801712345678`, `8801712345678`, `01712345678`
  - Pattern: `^(\+880|880|0)?1[3-9]\d{8}$`
  - Must start with 1[3-9] after country code

### 7.5 Task Priority Levels
- **High**: Red indicator, urgent tasks
- **Medium**: Orange indicator, normal priority
- **Low**: Green indicator, low priority

### 7.6 Task Categories
- Work
- Personal
- Study
- Health
- Other

### 7.7 Recurring Task Types
- **None**: One-time task
- **Daily**: Repeats every day
- **Weekly**: Repeats every week on same day
- **Monthly**: Repeats every month on same date

### 7.8 Glossary
- **OTP**: One-Time Password - A temporary code sent via SMS for verification
- **OAuth**: Open Authorization - Protocol for secure third-party authentication
- **RLS**: Row Level Security - Database-level security restricting data access
- **JWT**: JSON Web Token - Token-based authentication mechanism
- **CORS**: Cross-Origin Resource Sharing - Mechanism for cross-domain requests
- **CRUD**: Create, Read, Update, Delete - Basic database operations

---

## Document Approval

**Prepared by:** Development Team  
**Reviewed by:** [Reviewer Name]  
**Approved by:** [Approver Name]  
**Date:** January 2025

---

**End of Document**

