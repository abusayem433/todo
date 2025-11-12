# TaskMaster - Advanced Task Manager App

A modern, feature-rich to-do application built with HTML, CSS, JavaScript, and Supabase for backend functionality.

## 🌟 Features

### Core Functionality
1. **User Authentication**
   - User registration with email and password
   - Secure login system
   - Logout functionality
   - Profile management

2. **Task Management (CRUD)**
   - Create new tasks with detailed information
   - Edit existing tasks
   - Delete tasks with confirmation
   - Mark tasks as complete/incomplete
   - Archive completed tasks
   - Restore archived tasks

3. **Task Properties**
   - Title and description
   - Deadline with date and time
   - Color-coded priority (Low, Medium, High)
   - Categories (Work, Personal, Study, Health, Other)
   - Recurring tasks (None, Daily, Weekly, Monthly)

4. **Advanced Features**
   - **Dashboard**: Visual statistics showing completed vs pending tasks, overdue tasks, and tasks due today
   - **Daily Reminder**: Automatic popup notification showing tasks due today when you log in
   - **Search**: Real-time search across task titles and descriptions
   - **Filters**: Filter tasks by category, priority, and status
   - **Calendar View**: Interactive calendar showing tasks by date
   - **Drag and Drop**: Reorder tasks with intuitive drag-and-drop interface
   - **Archive System**: Keep completed tasks organized without cluttering your active list
   - **Charts**: Visual representation of tasks by category using Chart.js

## 🚀 Getting Started

### Prerequisites
- A [Supabase](https://supabase.com) account (free tier available)
- A web browser
- A code editor (optional, for customization)

### Installation

1. **Clone or Download this repository**
   ```bash
   git clone <repository-url>
   cd todo-wub
   ```

2. **Set up Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to your project settings and copy:
      - Project URL
      - Anon/Public Key
   
   c. Open `js/supabase.js` and replace the placeholder values:
      ```javascript
      const SUPABASE_URL = 'your-project-url';
      const SUPABASE_ANON_KEY = 'your-anon-key';
      ```

3. **Create Database Tables**

   Go to the SQL Editor in your Supabase dashboard and run the following SQL:

   ```sql
   -- Profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE,
     full_name TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     PRIMARY KEY (id)
   );

   -- Enable RLS
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

   -- Enable RLS
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

4. **Configure Email Authentication (Optional)**

   By default, Supabase requires email confirmation. To disable this for development:
   - Go to Authentication > Settings in your Supabase dashboard
   - Disable "Enable email confirmations"

5. **Launch the Application**

   Simply open `index.html` in your web browser, or use a local server:
   
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

   Then navigate to `http://localhost:8000`

## 📖 User Guide

### Getting Started
1. **Register**: Create a new account with your email and password
2. **Login**: Use your credentials to access your dashboard
3. **Create Tasks**: Click the "+ Add Task" button to create your first task

### Dashboard
- View statistics about your tasks
- See completed vs pending tasks
- Check overdue tasks
- View tasks due today
- See task distribution by category

### Managing Tasks
- **Add Task**: Click "+ Add Task" button in the top bar
- **Edit Task**: Click the edit icon (pencil) on any task
- **Complete Task**: Check the checkbox on the left of the task
- **Archive Task**: Click the archive icon to move completed tasks to archive
- **Delete Task**: Click the trash icon (confirmation required)
- **Reorder Tasks**: Drag and drop tasks to reorder them

### Recurring Tasks
When you mark a recurring task as complete, a new instance is automatically created with the next deadline based on the recurrence pattern:
- **Daily**: Next day
- **Weekly**: 7 days later
- **Monthly**: Same date next month

### Calendar View
- Navigate between months using arrow buttons
- Days with tasks are marked with a dot
- Click any day to see tasks scheduled for that date
- Today's date is highlighted

### Search and Filter
- **Search**: Type in the search bar to find tasks by title or description
- **Filter by Category**: Show only tasks from specific categories
- **Filter by Priority**: Display tasks with specific priority levels
- **Filter by Status**: View active, completed, or all tasks

### Archive
- Access archived tasks from the sidebar
- Restore tasks from archive by clicking the undo button
- Permanently delete archived tasks if needed

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL database, Authentication, Row Level Security)
- **Libraries**:
  - [Supabase JS Client](https://github.com/supabase/supabase-js) - Backend integration
  - [Chart.js](https://www.chartjs.org/) - Data visualization
  - [SortableJS](https://sortablejs.github.io/Sortable/) - Drag and drop functionality
  - [Font Awesome](https://fontawesome.com/) - Icons

## 📁 Project Structure

```
todo-wub/
├── index.html              # Login/Register page
├── dashboard.html          # Main application dashboard
├── css/
│   └── style.css          # All styles
├── js/
│   ├── supabase.js        # Supabase configuration
│   ├── auth.js            # Authentication logic
│   ├── app.js             # Main application logic
│   ├── calendar.js        # Calendar functionality
│   └── dragdrop.js        # Drag and drop implementation
└── README.md              # This file
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... more variables */
}
```

### Adding New Categories
1. Update the `taskCategory` select options in `dashboard.html`
2. Update the CHECK constraint in the database:
   ```sql
   ALTER TABLE tasks DROP CONSTRAINT tasks_category_check;
   ALTER TABLE tasks ADD CONSTRAINT tasks_category_check 
     CHECK (category IN ('work', 'personal', 'study', 'health', 'other', 'your-new-category'));
   ```

### Modifying Recurrence Options
1. Update the `taskRecurring` select options in `dashboard.html`
2. Update the logic in `createRecurringTask()` function in `js/app.js`

## 🔒 Security Features

- Row Level Security (RLS) ensures users can only access their own data
- Password-based authentication with Supabase Auth
- Secure session management
- XSS protection through HTML escaping

## 🐛 Troubleshooting

### "Invalid API key" error
- Double-check that you've correctly copied your Supabase URL and Anon Key
- Make sure there are no extra spaces or quotes

### Tasks not loading
- Check browser console for errors
- Verify that the database tables were created successfully
- Ensure RLS policies are in place

### Email confirmation required
- Go to Supabase Dashboard > Authentication > Settings
- Disable "Enable email confirmations" for testing

### Drag and drop not working
- Ensure you're viewing the "All Tasks" section
- Check that SortableJS library is loading correctly

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📝 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

Potential features for future versions:
- Task sharing and collaboration
- Task attachments
- Task tags/labels
- Dark mode
- Mobile app version
- Email/push notifications
- Task templates
- Subtasks
- Time tracking
- Export/import tasks

## 📧 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Happy Task Managing! 🚀**

