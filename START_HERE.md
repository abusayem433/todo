# 🚀 START HERE - TaskMaster Quick Start

Welcome to **TaskMaster**! This guide will get you up and running in minutes.

---

## ⚡ 3-Step Quick Start

### Step 1: Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Copy your Project URL and anon key
4. Open `js/supabase.js` and paste them:
```javascript
const SUPABASE_URL = 'your-url-here';
const SUPABASE_ANON_KEY = 'your-key-here';
```

### Step 2: Create Database Tables (2 minutes)

1. In Supabase, go to SQL Editor
2. Copy the SQL code from `js/supabase.js` (it's in the comments)
3. Run the SQL query
4. Done!

### Step 3: Launch the App (1 minute)

**Option A**: Just double-click `index.html`

**Option B**: Use a local server:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`

🎉 **That's it! You're ready to go!**

---

## 📖 What to Read Next

### If you're a **User**:
1. ✅ [README.md](README.md) - Complete feature guide
2. ✅ [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - How to do common tasks

### If you're **Setting Up**:
1. ✅ [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
2. ✅ [DEPLOYMENT.md](DEPLOYMENT.md) - How to deploy online

### If you're a **Developer**:
1. ✅ [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Technical overview
2. ✅ [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Styling & customization
3. ✅ [FEATURES.md](FEATURES.md) - Complete feature list

---

## 🎯 What You Get

✅ **13 Core Features**:
- Login/Register/Logout
- Complete task management (CRUD)
- Color-coded priorities
- Archive system
- Calendar view
- Daily reminders
- Search & filters
- Drag-and-drop reordering
- Dashboard with statistics
- Recurring tasks

✅ **Bonus Features**:
- Beautiful modern UI
- Responsive design
- Smooth animations
- Charts & visualizations
- Empty states
- Toast notifications
- And much more!

---

## 🆘 Need Help?

### Quick Fixes

**"Invalid API key" error?**
→ Check `js/supabase.js` - did you paste your credentials correctly?

**"Table doesn't exist" error?**
→ Run the SQL code from Step 2 again

**Can't login after registering?**
→ Go to Supabase → Authentication → Settings → Disable "Email confirmations"

### More Help
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Look at browser console (F12) for error messages
- Review [README.md](README.md) for full documentation

---

## 📂 Project Structure

```
todo-wub/
├── index.html          → Login/Register page (START HERE!)
├── dashboard.html      → Main app interface
├── css/
│   └── style.css      → All styling
├── js/
│   ├── supabase.js    → Backend config (CONFIGURE THIS!)
│   ├── auth.js        → Login/register logic
│   ├── app.js         → Main app logic
│   ├── calendar.js    → Calendar features
│   └── dragdrop.js    → Drag-and-drop
└── [Documentation files]
```

---

## 🎓 For Students

This app is perfect for:
- 📚 Tracking assignments and homework
- 📅 Managing project deadlines
- 🎯 Organizing study sessions
- ✅ Staying on top of coursework
- 📊 Visualizing your progress

**Pro Tips**:
1. Set realistic deadlines
2. Use **High** priority for urgent tasks
3. Create recurring tasks for regular study sessions
4. Check the dashboard daily
5. Archive completed tasks by semester

---

## 🚀 Next Steps

1. **Register** your first account
2. **Create** your first task
3. **Explore** all the features
4. **Customize** the colors (if you want)
5. **Deploy** online (when ready)

---

## 📱 Works Everywhere

✅ Desktop computers  
✅ Laptops  
✅ Tablets  
✅ Mobile phones  
✅ All modern browsers  

---

## 🌟 Key Features Highlight

### 🔔 Daily Reminder
Every time you log in, you'll see tasks due today!

### 📅 Calendar View
Visual representation of all your upcoming deadlines

### 🎨 Color-Coded Priorities
- 🟢 Low - Can wait
- 🟡 Medium - Important
- 🔴 High - Urgent!

### 🔄 Recurring Tasks
Set it once, let it repeat automatically

### 🔍 Smart Search
Find any task instantly by keyword

### 📊 Dashboard
See your progress at a glance

---

## 💡 First Time Using?

### After opening the app:

1. **Click "Register here"**
   - Enter your name
   - Enter your email
   - Create a password

2. **You'll see the dashboard**
   - Click "+ Add Task" to create your first task

3. **Fill in task details**:
   - Title: "Complete math homework"
   - Deadline: Tomorrow 5 PM
   - Priority: High
   - Category: Study

4. **Click "Save Task"**

5. **Explore the features**:
   - Try the calendar view
   - Use the search bar
   - Check out the dashboard stats
   - Drag tasks to reorder them

---

## 🎨 Customization

Want to change colors?

1. Open `css/style.css`
2. Find the `:root` section at the top
3. Change the color values:
```css
--primary-color: #your-color-here;
```
4. Save and refresh!

---

## 🌐 Deploy Online

Want to share it or access from anywhere?

**Easiest method** (2 minutes):
1. Go to [netlify.com](https://netlify.com)
2. Drag your folder onto the website
3. Done! You get a URL

**See [DEPLOYMENT.md](DEPLOYMENT.md) for more options**

---

## ✨ What Makes This Special

✅ **No installation needed** - Just open and use  
✅ **No frameworks** - Pure HTML, CSS, JavaScript  
✅ **Cloud-powered** - Your data is always safe  
✅ **Beautiful UI** - Modern, professional design  
✅ **Fully featured** - Everything you need  
✅ **Well documented** - 7 comprehensive guides  
✅ **Production ready** - Deploy immediately  

---

## 🎯 Success Checklist

- [ ] Supabase account created
- [ ] Database tables set up
- [ ] Credentials configured in `js/supabase.js`
- [ ] App opens in browser
- [ ] Successfully registered an account
- [ ] Created first task
- [ ] Explored all features
- [ ] (Optional) Deployed online

---

## 📞 Still Stuck?

1. **Double-check** you completed all 3 steps above
2. **Look at** [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
3. **Check** browser console (press F12) for error messages
4. **Review** the SQL code ran successfully in Supabase
5. **Verify** your Supabase credentials are correct

---

## 🎉 You're All Set!

Once you've completed the 3 steps above, you'll have a fully functional task management app. Start organizing your tasks and boost your productivity!

**Questions?** Check the other documentation files.

**Ready to start?** Go to Step 1 above!

---

**Happy Task Managing! 📝✨**

*Built for students, by developers who care about your success!*

