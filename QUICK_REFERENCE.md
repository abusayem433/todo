# TaskMaster - Quick Reference Guide

## 🎯 Common Tasks

### Account Management

#### Register a New Account
1. Open `index.html`
2. Click "Register here"
3. Enter: Full Name, Email, Password
4. Click "Register"

#### Login
1. Open `index.html`
2. Enter: Email and Password
3. Click "Login"

#### Logout
1. Click the logout button at bottom of sidebar
2. You'll be redirected to login page

---

## 📝 Task Operations

### Create a New Task
1. Click "+ Add Task" button (top right)
2. Fill in:
   - **Title** (required)
   - **Description** (optional)
   - **Deadline** (required)
   - **Priority** (required): Low/Medium/High
   - **Category** (required): Work/Personal/Study/Health/Other
   - **Recurring** (optional): None/Daily/Weekly/Monthly
3. Click "Save Task"

### Edit a Task
1. Find the task in any view
2. Click the **pencil icon** (✏️)
3. Modify any fields
4. Click "Save Task"

### Complete a Task
1. Click the **checkbox** on the left of the task
2. Task will be marked as completed (strikethrough)
3. If recurring, a new instance is automatically created

### Archive a Task
1. Click the **archive icon** (📦) on the task
2. Confirm the action
3. View archived tasks in "Archive" section

### Delete a Task
1. Click the **trash icon** (🗑️) on the task
2. Confirm deletion (this cannot be undone)

### Restore an Archived Task
1. Go to "Archive" view in sidebar
2. Find the task
3. Click the **undo icon** (↶)

### Reorder Tasks
1. Go to "All Tasks" view
2. Click and hold on any task
3. Drag to desired position
4. Release to drop
5. Order is automatically saved

---

## 🔍 Search & Filter

### Search for Tasks
- Type keywords in the search bar (top)
- Search works on titles and descriptions
- Results appear instantly

### Filter by Category
1. Go to "All Tasks" view
2. Select category from dropdown
3. Options: All/Work/Personal/Study/Health/Other

### Filter by Priority
1. Go to "All Tasks" view
2. Select priority from dropdown
3. Options: All/High/Medium/Low

### Filter by Status
1. Go to "All Tasks" view
2. Select status from dropdown
3. Options: Active/Completed/All

### Combine Filters
- Use search + filters together
- All filters work simultaneously
- Results update in real-time

---

## 📅 Calendar

### View Calendar
1. Click "Calendar" in sidebar
2. See current month with tasks marked

### Navigate Months
- Click **←** for previous month
- Click **→** for next month

### View Tasks for a Date
1. Click any day in the calendar
2. Tasks for that day appear below
3. Days with tasks show a dot indicator

### Today's Indicator
- Today's date is highlighted with a border
- Selected date is highlighted in purple

---

## 📊 Dashboard

### View Statistics
1. Click "Dashboard" in sidebar
2. See 4 key metrics:
   - Completed Tasks
   - Pending Tasks
   - Overdue Tasks
   - Tasks Due Today

### View Task Distribution
- Scroll down to see the chart
- Doughnut chart shows tasks by category
- Hover over segments for details

---

## 🔄 Recurring Tasks

### Create a Recurring Task
1. When creating/editing a task
2. Select "Recurring" dropdown
3. Choose: Daily/Weekly/Monthly

### How Recurring Works
- Complete the task (check the checkbox)
- A new task is automatically created
- New deadline is calculated:
  - **Daily**: Tomorrow
  - **Weekly**: 7 days later
  - **Monthly**: Same date next month

### Stop Recurring
1. Edit the task
2. Change "Recurring" to "None"
3. Save the task

---

## 🔔 Daily Reminder

### When It Appears
- Shows automatically when you login
- Only once per day
- Shows tasks due today

### What It Shows
- List of all tasks due today
- Organized by priority
- Time of deadline
- Encouraging message if no tasks

### Dismiss Reminder
- Click the **×** button
- Won't show again until tomorrow

---

## 🎨 Customization

### Change Colors
1. Open `css/style.css`
2. Modify CSS variables in `:root`
3. Example:
```css
--primary-color: #your-color;
```

### Add New Categories
1. Edit `dashboard.html`
2. Find `<select id="taskCategory">`
3. Add new `<option>` tags
4. Update database constraint in Supabase

### Modify Priority Colors
1. Open `css/style.css`
2. Find `.badge-priority` classes
3. Change background colors

---

## 🐛 Troubleshooting

### Tasks Not Loading
1. Check browser console (F12)
2. Verify Supabase credentials in `js/supabase.js`
3. Ensure database tables exist

### Can't Login
1. Verify email/password
2. Check if email confirmation is required
3. Clear browser cache

### Drag-and-Drop Not Working
1. Make sure you're in "All Tasks" view
2. Check if SortableJS is loading
3. Try refreshing the page

### Calendar Not Showing Tasks
1. Ensure tasks have valid deadlines
2. Check if tasks are archived
3. Try navigating to different months

---

## ⌨️ Keyboard Shortcuts

Unfortunately, keyboard shortcuts are not implemented in this version. Here are suggestions for future implementation:

- `Ctrl/Cmd + N`: New task
- `Ctrl/Cmd + F`: Focus search
- `Ctrl/Cmd + S`: Save current form
- `Esc`: Close modal
- `Arrow Keys`: Navigate calendar

---

## 📱 Mobile Usage

### Touch Gestures
- **Tap**: Select/click
- **Long press + drag**: Reorder tasks (on touch devices)
- **Swipe**: Scroll through content

### Responsive Features
- Sidebar auto-hides on mobile
- Touch-friendly buttons
- Optimized layouts for small screens

---

## 💾 Data Management

### Where is Data Stored?
- All tasks: Supabase database (cloud)
- User auth: Supabase Auth
- Last login date: Browser localStorage

### Backup Your Data
1. Go to Supabase dashboard
2. Navigate to Database
3. Export tables as CSV/JSON

### Clear Local Data
```javascript
// In browser console (F12)
localStorage.clear();
```

---

## 🔐 Security Tips

1. **Use Strong Passwords**: At least 8 characters, mix of letters/numbers/symbols
2. **Don't Share Credentials**: Keep your Supabase keys private
3. **Enable Email Confirmation**: For production use
4. **Regular Backups**: Export your data periodically
5. **Log Out**: Always log out on shared computers

---

## 🚀 Deployment

### Deploy to Netlify
1. Create Netlify account
2. Drag and drop your folder
3. Site is live instantly!

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
1. Push code to GitHub
2. Go to Settings > Pages
3. Select branch to deploy

---

## 📞 Getting Help

### Resources
- **README.md**: Full documentation
- **SETUP_GUIDE.md**: Step-by-step setup
- **FEATURES.md**: Complete feature list
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

### Debug Mode
Open browser console (F12) to see:
- Error messages
- Network requests
- JavaScript logs

---

## 🎓 Best Practices

### For Students
1. Create tasks as soon as assignments are given
2. Set realistic deadlines
3. Use priority system effectively
4. Review dashboard daily
5. Archive completed assignments by semester

### Task Organization
- **High Priority**: Due within 2 days or critical
- **Medium Priority**: Due this week
- **Low Priority**: Long-term or optional

### Categories
- **Study**: Coursework, exams, readings
- **Work**: Job-related tasks
- **Personal**: Personal errands, appointments
- **Health**: Exercise, medical appointments
- **Other**: Everything else

---

**Happy Task Managing! 📝✨**

