# TaskMaster - Advanced Todo Application

A modern, feature-rich task management application with multiple authentication methods, SMS OTP verification, and a beautiful user interface. Built with vanilla JavaScript, Supabase, and Express.js.

## 🚀 Features

- **Multiple Authentication Methods**
  - Email/Password authentication
  - Phone number authentication with OTP verification
  - Google OAuth sign-in
  
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

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database & Auth**: Supabase
- **SMS Gateway**: BulkSMS BD API
- **Deployment**: Vercel (serverless functions)

## 📋 Prerequisites

- Node.js >= 18.x
- npm or yarn
- Supabase account and project
- BulkSMS BD account (for SMS functionality)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-wub
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

4. **Configure SMS Gateway** (Optional - for phone authentication)
   - Sign up at [BulkSMS BD](http://bulksmsbd.net)
   - Get your API key and Sender ID
   - Update `server.js` and `api/send-sms.js` with your credentials:
     ```javascript
     const SMS_CONFIG = {
         API_KEY: 'your-api-key',
         SENDER_ID: 'your-sender-id',
         API_URL: 'http://bulksmsbd.net/api/smsapi',
         BALANCE_URL: 'http://bulksmsbd.net/api/getBalanceApi'
     };
     ```

5. **Set up Supabase Database Tables**
   
   Create the following tables in your Supabase project:

   **profiles table:**
   ```sql
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users PRIMARY KEY,
     full_name TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **phone_otps table:**
   ```sql
   CREATE TABLE phone_otps (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     phone_number TEXT NOT NULL,
     otp_code TEXT NOT NULL,
     full_name TEXT,
     password_hash TEXT,
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
     completed BOOLEAN DEFAULT FALSE,
     due_date DATE,
     category TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the Express server** (for SMS API)
   ```bash
   npm start
   ```
   Or with auto-reload:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`

2. **Open the application**
   - Navigate to `http://localhost:3000` in your browser
   - Or use the client script:
     ```bash
     npm run client
     ```

### Production Mode

For production deployment on Vercel:

1. **Deploy to Vercel**
   ```bash
   vercel deploy
   ```

2. **Configure environment variables** (if needed)
   - Set `API_BASE_URL` in your frontend if your API is on a different domain

## 📁 Project Structure

```
todo-wub/
├── api/                    # Vercel serverless functions
│   ├── health.js          # Health check endpoint
│   ├── send-sms.js        # SMS sending function
│   └── sms-balance.js     # SMS balance check
├── css/
│   └── style.css          # Application styles
├── js/
│   ├── app.js             # Main application logic
│   ├── auth.js            # Authentication logic
│   ├── calendar.js        # Calendar functionality
│   ├── dragdrop.js        # Drag and drop features
│   └── supabase.js        # Supabase client configuration
├── dashboard.html          # Main dashboard page
├── index.html             # Login/Registration page
├── server.js              # Express server (development)
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies and scripts
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

The same endpoints are available as serverless functions when deployed to Vercel:
- `/api/send-sms`
- `/api/sms-balance`
- `/api/health`

## 🔐 Authentication Methods

### Email/Password
- Standard email and password registration/login
- Password must be at least 6 characters

### Phone Number
- Bangladesh phone number format validation
- OTP verification via SMS
- 6-digit OTP valid for 5 minutes

### Google OAuth
- One-click Google sign-in
- Automatic profile creation

## 🌐 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard if needed

The `vercel.json` file is already configured with CORS headers for API routes.

## 🔒 Security Notes

- **SMS API Keys**: Never commit API keys to version control. Use environment variables in production.
- **Supabase Keys**: The anon key is safe to expose in client-side code, but ensure Row Level Security (RLS) is properly configured.
- **Password Storage**: Currently using simple encoding for phone passwords. Consider upgrading to bcrypt for production.

## 🐛 Troubleshooting

### SMS Not Sending
- Ensure the Express server is running (`npm start`)
- Check SMS API credentials in `server.js`
- Verify phone number format (Bangladesh format: +8801XXXXXXXXX)
- Check SMS balance via `/api/sms-balance`

### Authentication Issues
- Verify Supabase credentials in `js/supabase.js`
- Ensure database tables are created
- Check browser console for errors

### CORS Errors
- Ensure server is running and accessible
- Check `vercel.json` CORS configuration
- Verify API base URL configuration

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Note**: This project uses the Bangladesh SMS Gateway. For international deployments, you may need to configure a different SMS provider.

