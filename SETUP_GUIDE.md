# TaskMaster - Quick Setup Guide

Follow these steps to get your TaskMaster app up and running in minutes!

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, GitLab, or email

## Step 2: Create a New Project

1. Click "New Project"
2. Choose your organization (or create one)
3. Enter project details:
   - **Project Name**: TaskMaster (or any name you prefer)
   - **Database Password**: Create a strong password (save it somewhere safe!)
   - **Region**: Choose the region closest to you
4. Click "Create new project"
5. Wait for the project to be set up (takes 1-2 minutes)

## Step 3: Get Your API Credentials

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon) in the left sidebar
2. Go to **API** section
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")
4. Copy both values

## Step 4: Configure Your App

1. Open the `js/supabase.js` file in your code editor
2. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co'; // Paste your Project URL here
const SUPABASE_ANON_KEY = 'your-long-anon-key-here'; // Paste your anon public key here
```

3. Save the file

## Step 5: Create Database Tables

1. In your Supabase dashboard, click on the **SQL Editor** icon in the left sidebar
2. Click **+ New query**
3. Copy and paste the following SQL code:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  PRIMARY KEY (id)
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tasks table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  category TEXT NOT NULL CHECK (category IN ('work', 'personal', 'study', 'health', 'other')),
  recurring TEXT DEFAULT 'none' CHECK (recurring IN ('none', 'daily', 'weekly', 'monthly')),
  completed BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS for tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Tasks policies
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tasks
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run** (or press Ctrl+Enter / Cmd+Enter)
5. You should see "Success. No rows returned" message

## Step 6: Configure Email Settings (Optional but Recommended)

For development, you may want to disable email confirmation:

1. In Supabase dashboard, go to **Authentication** > **Settings**
2. Scroll down to **Email Auth**
3. **Disable** the option "Enable email confirmations"
4. Click **Save**

> **Note**: In production, you should keep email confirmations enabled for security.

## Step 7: Launch Your App

### Option A: Direct File Access
Simply open `index.html` in your web browser by double-clicking it.

### Option B: Using a Local Server (Recommended)

**Using Python (if you have Python installed):**
```bash
cd path/to/todo-wub
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser

**Using Node.js:**
```bash
cd path/to/todo-wub
npx http-server -p 8000
```
Then open `http://localhost:8000` in your browser

## Step 8: Test Your App

1. Open the app in your browser
2. Click "Register here" to create a new account
3. Fill in:
   - Full Name
   - Email address
   - Password (at least 6 characters)
   - Confirm Password
4. Click **Register**
5. You should be redirected to the dashboard!

## 🎉 You're All Set!

Your TaskMaster app is now ready to use. Try creating your first task!

## Troubleshooting

### "Invalid API key" error
- Make sure you copied the **anon public** key (not the service_role key)
- Check for extra spaces or quotes in `js/supabase.js`
- Ensure you saved the file after making changes

### "relation does not exist" error
- The database tables weren't created properly
- Go back to Step 5 and run the SQL again
- Make sure the query ran successfully

### Email confirmation blocking registration
- Go to Authentication > Settings in Supabase
- Disable "Enable email confirmations"
- Try registering again

### Can't see any data
- Open browser Developer Tools (F12)
- Check the Console tab for errors
- Verify that RLS policies were created (Step 5)

### Still having issues?
1. Clear your browser cache and cookies
2. Try a different browser
3. Check the browser console (F12) for error messages
4. Verify all steps were completed correctly

## Next Steps

- Read the full [README.md](README.md) for detailed feature documentation
- Customize the colors and styling in `css/style.css`
- Add more categories or priority levels as needed
- Deploy your app to a hosting service (Netlify, Vercel, GitHub Pages)

---

**Need help?** Create an issue in the repository or check the Supabase documentation at [supabase.com/docs](https://supabase.com/docs)

