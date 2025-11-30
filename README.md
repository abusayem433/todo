# TaskMaster - Advanced Todo Application

A modern, feature-rich task management application designed to help students and individuals organize daily tasks and assignments effectively. Built with vanilla JavaScript, Supabase, and Express.js.

**Repository**: [https://github.com/abusayem433/todo](https://github.com/abusayem433/todo)

## 📋 Problem Statement

Students and individuals struggle to organize daily tasks and assignments effectively. Without a proper task management system, users face difficulties in:

- Tracking multiple tasks and their deadlines
- Prioritizing tasks based on importance and urgency
- Remembering important tasks and deadlines
- Organizing tasks by categories or projects
- Visualizing upcoming tasks and deadlines
- Managing recurring tasks efficiently

This lack of organization leads to missed deadlines, increased stress, and reduced productivity.

## 🎯 Project Goal

The goal of this project is to build a comprehensive to-do application (TaskMaster) that helps users track tasks and deadlines effectively. The application aims to:

- Provide an intuitive interface for task management
- Enable users to organize tasks with priorities, categories, and deadlines
- Offer multiple visualization options (Dashboard, List, Calendar views)
- Implement a unique daily reminder system to keep users informed
- Support task organization through filtering, searching, and drag-and-drop functionality
- Track task completion progress through analytics and statistics

## 🚀 Features

**Core Features (All 13 Required Features):**

1. **Login / Register** - Multiple authentication methods:
   - Email/Password authentication
   - Phone number authentication with OTP verification
   - Google OAuth sign-in

2. **Logout Functionality** - Secure session termination and redirect to login page

3. **Task CRUD Operations** - Complete task management:
   - Add/Create new tasks with title, description, deadline, priority, and category
   - Update/Edit existing tasks
   - Delete tasks with confirmation
   - Mark tasks as complete/incomplete

4. **Deadlines with Color-Coded Priority** - Visual priority indicators:
   - 🔴 **High Priority** - Red color indicator for urgent tasks
   - 🟠 **Medium Priority** - Orange color indicator for normal priority tasks
   - 🟢 **Low Priority** - Green color indicator for low priority tasks

5. **Archive Completed Tasks** - Option to archive completed tasks, removing them from active view while preserving them in archive

6. **Simple Calendar View** - Calendar interface showing upcoming tasks organized by date

7. **Daily Reminder Popup/Notification** ⭐ **Unique Feature** - Displays a popup notification when users log in, showing tasks due today

8. **Filter Tasks** - Filter tasks by category (Work, Personal, Study, Health, Other) or priority (High, Medium, Low)

9. **Drag-and-Drop Reordering** - Interactive drag-and-drop functionality to reorder tasks according to user preference with persistent storage

10. **Search Tasks** - Search tasks by keyword in title or description

11. **Dashboard Analytics** - Dashboard showing completed vs pending tasks with visual statistics and charts:
    - Tasks by category (doughnut chart)
    - Tasks by priority (bar chart)
    - Completion status (doughnut chart)
    - Monthly progress (line chart)

12. **Recurring Tasks** - Option to set recurring tasks (Daily, Weekly, Monthly) that automatically create new instances

13. **Tech Stack** - HTML, CSS, JavaScript + Node.js/Express + Supabase (PostgreSQL)

**Additional Features:**

- **Task Management**
  - Create, update, and delete tasks
  - Drag and drop task organization
  - Calendar integration
  - Task categorization and filtering
  
- **SMS Integration**
  - OTP verification via Bangladesh SMS Gateway
  - SMS balance checking
  - Phone number validation for Bangladesh format

- **Modern UI/UX**
  - Responsive design
  - Intuitive drag-and-drop interface
  - Calendar view for tasks
  - Clean and modern styling

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js with Express.js framework
- **Database**: Supabase (PostgreSQL database with Row Level Security)
- **Authentication**: Supabase Auth (supports Email/Password, Phone OTP, Google OAuth)
- **SMS Service**: Bangladesh SMS Gateway API (bulksmsbd.net)
- **Deployment**: Vercel (serverless functions) or Node.js Express server
- **Additional Libraries**: 
  - Chart.js (data visualization)
  - SortableJS (drag-and-drop functionality)

**Note:** The application is implemented using Node.js/Express with Supabase (PostgreSQL) as specified in the codebase. Alternative implementations could use PHP/MySQL or Node.js/MongoDB, but the current implementation uses the Node.js/Express/Supabase stack for optimal performance and modern development practices.

## 📋 Prerequisites

- **Node.js** >= 18.x (check with `node --version`)
- **npm** or **yarn** package manager
- **Supabase account** and project ([sign up here](https://supabase.com))
- **BulkSMS BD account** (optional - only needed for phone authentication via SMS)
- Modern web browser with JavaScript enabled

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abusayem433/todo.git
   cd todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Update `js/supabase.js` with your Supabase credentials:
     ```javascript
     const SUPABASE_URL = 'your-supabase-url';
     const SUPABASE_ANON_KEY = 'your-anon-key';
     ```
   - **Important**: For production, consider using environment variables instead of hardcoding credentials

4. **Configure SMS Gateway** (Optional - for phone authentication)
   - Sign up at [BulkSMS BD](http://bulksmsbd.net)
   - Get your API key and Sender ID
   - **For Local Development**: Update `server.js` with your credentials:
     ```javascript
     const SMS_CONFIG = {
         API_KEY: 'your-api-key',
         SENDER_ID: 'your-sender-id',
         API_URL: 'http://bulksmsbd.net/api/smsapi',
         BALANCE_URL: 'http://bulksmsbd.net/api/getBalanceApi'
     };
     ```
   - **For Production (Vercel)**: Update `api/send-sms.js` and `api/sms-balance.js` with your credentials, or use environment variables
   - **Security Note**: Never commit API keys to version control. Use environment variables in production.

5. **Set up Supabase Database Tables**
   
   Create the following tables in your Supabase project using the Supabase SQL Editor:

   **profiles table:**
   ```sql
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users PRIMARY KEY,
     full_name TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **phone_otps table:**
   ```sql
   CREATE TABLE phone_otps (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     phone_number TEXT NOT NULL,
     otp_code TEXT NOT NULL,
     full_name TEXT NOT NULL,
     password_hash TEXT NOT NULL,
     expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
     attempts INTEGER DEFAULT 0,
     verified BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **tasks table:**
   ```sql
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users NOT NULL,
     title TEXT NOT NULL,
     description TEXT,
     deadline TIMESTAMP WITH TIME ZONE NOT NULL,
     priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
     category TEXT NOT NULL CHECK (category IN ('work', 'personal', 'study', 'health', 'other')),
     recurring TEXT DEFAULT 'none' CHECK (recurring IN ('none', 'daily', 'weekly', 'monthly')),
     completed BOOLEAN DEFAULT FALSE,
     archived BOOLEAN DEFAULT FALSE,
     order_index INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

6. **Enable Row Level Security (RLS)**
   
   Enable RLS on all tables and create policies to ensure users can only access their own data:
   
   ```sql
   -- Enable RLS on profiles table
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
   
   -- Enable RLS on tasks table
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Users can view own tasks" ON tasks FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can update own tasks" ON tasks FOR UPDATE USING (auth.uid() = user_id);
   CREATE POLICY "Users can delete own tasks" ON tasks FOR DELETE USING (auth.uid() = user_id);
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the Express server** (required for SMS API functionality)
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` and serve both the API endpoints and static files.

   **For development with auto-reload** (requires nodemon):
   ```bash
   npm run dev
   ```

2. **Open the application**
   - Navigate to `http://localhost:3000` in your browser
   - The application will be served from the root directory
   
   **Alternative**: If you prefer to use a separate static file server:
   ```bash
   npm run client
   ```
   This runs a simple HTTP server on port 8080 (note: SMS API won't work without the Express server)

### Production Mode

For production deployment on Vercel:

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```
   Follow the prompts to link your project or deploy to a new project.

3. **Configure environment variables** in Vercel Dashboard:
   - Navigate to your project settings → Environment Variables
   - Add the following variables (if using environment variables instead of hardcoded values):
     - `SUPABASE_URL` - Your Supabase project URL
     - `SUPABASE_ANON_KEY` - Your Supabase anon key
     - `SMS_API_KEY` - Your SMS Gateway API key
     - `SMS_SENDER_ID` - Your SMS Gateway Sender ID
   - Set `API_BASE_URL` in your frontend if your API is on a different domain

## 📁 Project Structure

```
todo/
├── api/                   # Vercel serverless functions (for production)
│   ├── health.js          # Health check endpoint
│   ├── send-sms.js        # SMS sending function
│   └── sms-balance.js     # SMS balance check
├── css/
│   └── style.css          # Application styles
├── js/
│   ├── app.js             # Main application logic and task management
│   ├── auth.js            # Authentication logic (email, phone, OAuth)
│   ├── calendar.js        # Calendar view functionality
│   ├── dragdrop.js        # Drag and drop task reordering
│   └── supabase.js        # Supabase client configuration
├── dashboard.html          # Main dashboard page (task management interface)
├── index.html             # Login/Registration page
├── server.js              # Express server (for local development)
├── vercel.json            # Vercel deployment configuration
├── package.json           # Dependencies and npm scripts
└── README.md              # This file
```

## 🔌 API Endpoints

### Local Development (Express Server)

- `POST /api/send-sms` - Send SMS via Bangladesh SMS Gateway
  ```json
  {
    "phoneNumber": "+8801712345678",
    "message": "Your OTP is 123456"
  }
  ```

- `GET /api/sms-balance` - Check SMS balance

- `GET /api/health` - Health check endpoint

### Vercel Serverless Functions

When deployed to Vercel, the same endpoints are available as serverless functions:
- `/api/send-sms` - Send SMS via Bangladesh SMS Gateway
- `/api/sms-balance` - Check SMS account balance
- `/api/health` - Health check endpoint

**Note**: For local development, these endpoints are handled by the Express server in `server.js`. For production on Vercel, the functions in the `api/` directory are used.

## 🔐 Authentication Methods

The application supports three authentication methods:

### 1. Email/Password
- Standard email and password registration/login
- Password must be at least 6 characters
- Automatic profile creation upon registration
- Secure password hashing via Supabase Auth

### 2. Phone Number (Bangladesh)
- Bangladesh phone number format validation (+880, 880, or 0 prefix)
- Phone number pattern: 1[3-9]XXXXXXXXX
- OTP verification via SMS using Bangladesh SMS Gateway
- 6-digit OTP valid for 5 minutes
- Maximum 3 verification attempts per OTP
- Automatic account creation after successful verification

### 3. Google OAuth
- One-click Google sign-in
- Automatic profile creation from Google account data
- Seamless authentication flow
- No additional password required

## 🌐 Deployment

### Vercel Deployment

The application is configured for serverless deployment on Vercel. The `vercel.json` file includes CORS headers for API routes.

**Deployment Steps:**

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to link your project or deploy to a new project.

3. **Configure environment variables** in Vercel dashboard (Settings → Environment Variables) if you're using environment variables instead of hardcoded values.

**Note:** The serverless functions in the `api/` directory will automatically be deployed as Vercel serverless functions.

## 🔒 Security Notes

- **SMS API Keys**: Never commit API keys to version control. Use environment variables in production. The current implementation has hardcoded keys in `server.js` for development purposes only.
- **Supabase Keys**: The anon key is safe to expose in client-side code, but ensure Row Level Security (RLS) is properly configured on all tables.
- **Password Storage**: Supabase Auth handles password hashing securely for email/password authentication. Phone authentication uses a custom implementation with password hashing.
- **Row Level Security**: Ensure RLS policies are enabled on all Supabase tables to prevent unauthorized data access.
- **Environment Variables**: For production, move all sensitive credentials to environment variables:
  - Create a `.env` file for local development (and add it to `.gitignore`)
  - Use Vercel environment variables for production deployment

## 🐛 Troubleshooting

### SMS Not Sending
- Ensure the Express server is running (`npm start`)
- Check SMS API credentials in `server.js`
- Verify phone number format (Bangladesh format: +8801XXXXXXXXX)
- Check SMS balance via `/api/sms-balance`

### Authentication Issues
- Verify Supabase credentials in `js/supabase.js`
- Ensure database tables are created with proper RLS policies
- Check browser console for errors
- Verify that RLS policies allow authenticated users to access their data
- For phone authentication, ensure the SMS server is running and credentials are correct

### CORS Errors
- Ensure server is running and accessible
- Check `vercel.json` CORS configuration
- Verify API base URL configuration

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please feel free to submit a [Pull Request](https://github.com/abusayem433/todo/pulls).

## 📞 Support

For issues and questions, please open an [issue on the repository](https://github.com/abusayem433/todo/issues).

---

## 📚 Documentation

- **SRS_Document.md** - Complete Software Requirements Specification following IEEE 830-1998 standard. [Click Here](https://docs.google.com/document/d/11tiby7Nj544cOWbmR0VWMhg0AHcFGa8xJenr8emRvII/edit?usp=sharing)
- **README.md** - This file, providing setup and usage instructions

## 🎨 Key Design Features

- **Color-Coded Priority System**: Visual priority indicators help users quickly identify task urgency
  - High priority tasks display with red indicators
  - Medium priority tasks display with orange indicators
  - Low priority tasks display with green indicators
- **Daily Reminder System**: Unique popup notification feature that shows tasks due today when users first log in each day
- **Responsive Design**: Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices
- **Real-Time Updates**: Task changes are reflected immediately across all views

---

## 📄 Version Information

**Version:** 1.0 (Reviewed & Approved)

## 👥 Development Team

**Developed by:** Full Team

- Md. Abu Sayem - 4386
- Mahi Bushra Roza - 4021
- Mohammad Ali Tonmoy - 4023
- Sandia Mahmud Chowa - 4098

**Reviewed, Approved & Merged by:** Md. Abu Sayem

**Documented by:** Md. Abu Sayem

## 🏫 Organization

**Organization:** CSE Department, World University of Bangladesh

**Date of Completion:** November 2025

---

**Note**: This project uses the Bangladesh SMS Gateway (bulksmsbd.net) for OTP verification. For international deployments or different regions, you may need to:
- Configure a different SMS provider (Twilio, AWS SNS, etc.)
- Update the SMS API endpoints in `server.js` and `api/send-sms.js`
- Modify the phone number validation logic in `js/auth.js` to support other formats

