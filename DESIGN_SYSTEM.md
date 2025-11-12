# TaskMaster - Design System

A comprehensive guide to the visual design, colors, typography, and styling of TaskMaster.

---

## 🎨 Color Palette

### Primary Colors

```css
--primary-color: #6366f1      /* Indigo - Main brand color */
--primary-dark: #4f46e5       /* Darker indigo - Hover states */
--secondary-color: #8b5cf6    /* Purple - Accents */
```

**Usage**:
- Buttons, links, highlights
- Navigation active states
- Selected calendar dates
- Chart colors

### Semantic Colors

```css
--success-color: #10b981      /* Green - Success messages */
--warning-color: #f59e0b      /* Orange - Warnings */
--danger-color: #ef4444       /* Red - Errors, delete actions */
```

**Usage**:
- Success: Completed tasks, success notifications
- Warning: Medium priority, alerts
- Danger: High priority, delete buttons

### Priority Colors

```css
--priority-low: #10b981       /* Green */
--priority-medium: #f59e0b    /* Orange */
--priority-high: #ef4444      /* Red */
```

**Visual Impact**:
- Color-coded left border on task cards
- Priority badges
- Instant visual recognition

### Background Colors

```css
--dark-bg: #1f2937           /* Dark gray - Sidebar */
--light-bg: #f9fafb          /* Light gray - Page background */
--card-bg: #ffffff           /* White - Cards, modals */
```

### Text Colors

```css
--text-primary: #111827      /* Almost black - Main text */
--text-secondary: #6b7280    /* Gray - Secondary text */
--border-color: #e5e7eb      /* Light gray - Borders */
```

---

## 📝 Typography

### Font Family
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

**Fallback chain**: System fonts for maximum compatibility and performance

### Font Sizes

| Element | Size | Usage |
|---------|------|-------|
| Page Title | 32px | Main headings (Dashboard, All Tasks, etc.) |
| Section Title | 24px | Modal titles, calendar month |
| Card Title | 18px | Task titles |
| Body Text | 14-16px | Task descriptions, form labels |
| Small Text | 13px | Task meta information, badges |

### Font Weights

- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Labels, secondary headings
- **Semi-Bold (600)**: Buttons, task titles, navigation
- **Bold (700)**: Statistics numbers

---

## 🎯 Spacing System

### Padding Values
- **Small**: 8px - Badges, icons
- **Medium**: 12-16px - Buttons, inputs
- **Large**: 20-24px - Cards, containers
- **Extra Large**: 32-40px - Page sections, modals

### Margin Values
- **Tiny**: 4px - Icon spacing
- **Small**: 8px - Between elements
- **Medium**: 12-16px - Between cards
- **Large**: 20-30px - Section spacing
- **Extra Large**: 40px - Page sections

---

## 🔲 Components

### Buttons

#### Primary Button
```css
background: #6366f1
color: white
padding: 12-14px
border-radius: 8px
hover: darker blue + lift effect
```

#### Secondary Button
```css
background: #e5e7eb
color: #111827
padding: 12px
border-radius: 8px
hover: darker gray
```

#### Icon Button
```css
width: 36px
height: 36px
background: #f9fafb
border-radius: 8px
hover: specific color based on action
```

### Cards

```css
background: white
padding: 20-24px
border-radius: 12px
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
hover: stronger shadow + lift
```

**Task Cards**: Additional left border (4px) in priority color

### Forms

#### Input Fields
```css
padding: 12px 16px
border: 2px solid #e5e7eb
border-radius: 8px
focus: indigo border + shadow
```

#### Select Dropdowns
```css
Same as input fields
Background: white
Cursor: pointer
```

#### Textareas
```css
Same as input fields
Min height: 80px
Resize: vertical
```

### Modals

```css
background: rgba(0, 0, 0, 0.5)
backdrop-filter: blur(4px)
modal-content:
  - padding: 32px
  - border-radius: 16px
  - max-width: 600px
  - animation: slide in from top
```

---

## 🎭 Animations & Transitions

### Standard Transition
```css
transition: all 0.3s ease;
```

**Applied to**:
- Button hovers
- Card hovers
- Border color changes
- Background color changes

### Specific Animations

#### Fade In (Modal background)
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide In (Modal content)
```css
@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

#### Notification Animations
```css
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

### Hover Effects

- **Buttons**: Darker color + translateY(-2px) + shadow
- **Cards**: Stronger shadow + translateY(-4px)
- **Icon buttons**: Background color change
- **Close button**: Rotate(90deg)

---

## 📐 Layout

### Sidebar
```css
width: 260px
position: fixed
height: 100vh
background: dark gray
```

### Main Content Area
```css
margin-left: 260px (sidebar width)
min-height: 100vh
background: light gray
```

### Top Bar
```css
padding: 20px 40px
position: sticky
top: 0
background: white
shadow: subtle
```

---

## 🎯 Badges

### Category Badge
```css
background: #e0e7ff (light purple)
color: #4338ca (dark purple)
padding: 4px 12px
border-radius: 20px
```

### Priority Badge
- **Low**: Green background, white text
- **Medium**: Orange background, white text
- **High**: Red background, white text

### Deadline Badge
```css
background: #dbeafe (light blue)
color: #1e40af (dark blue)
overdue: red background + dark red text
```

### Recurring Badge
```css
background: #fef3c7 (light yellow)
color: #92400e (brown)
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  - Sidebar hidden by default
  - Main content full width
  - Stats grid: 1 column
  - Filters stack vertically
  - Reduced padding
}
```

### Mobile Optimizations
- Touch-friendly button sizes (min 44px)
- Larger tap targets
- Simplified layouts
- Hidden sidebar (can be toggled)

---

## 🎨 Visual Hierarchy

### Primary Level
- Page titles (32px, bold)
- Key statistics numbers (32px, bold)
- Primary call-to-action buttons

### Secondary Level
- Section headings (24px, semi-bold)
- Task titles (18px, semi-bold)
- Navigation items

### Tertiary Level
- Body text (14-16px, regular)
- Form labels (14px, medium)
- Metadata (13px, regular)

---

## 🔍 States

### Task States

#### Active Task
```css
opacity: 1
title: normal text
```

#### Completed Task
```css
opacity: 0.6
title: line-through
checkbox: checked
```

#### Archived Task
```css
In separate view
Restored or permanently deleted
```

### Interactive States

#### Default
Normal appearance

#### Hover
- Cursor change
- Color shift
- Shadow increase
- Slight movement

#### Active/Pressed
- Slight scale or position change
- Darker color

#### Focus
- Border color change (indigo)
- Shadow ring (rgba(99, 102, 241, 0.1))

#### Disabled
- Reduced opacity
- Cursor: not-allowed
- No hover effects

---

## 🎯 Icons

### Icon Library
**Font Awesome 6.4.0** (Free)

### Common Icons
- `fa-tasks`: App logo
- `fa-plus`: Add new
- `fa-edit`: Edit
- `fa-trash`: Delete
- `fa-archive`: Archive
- `fa-calendar`: Date/Calendar
- `fa-flag`: Priority
- `fa-folder`: Category
- `fa-search`: Search
- `fa-check-circle`: Complete/Success
- `fa-bell`: Notification/Reminder

### Icon Sizes
- Small: 12-14px (in badges)
- Medium: 18-20px (in navigation)
- Large: 24-28px (in header, user icon)
- Extra Large: 48-64px (in empty states, modals)

---

## 🎨 Customization Guide

### Changing Primary Color

1. Open `css/style.css`
2. Find `:root` variables
3. Change:
```css
--primary-color: #YOUR_COLOR;
--primary-dark: #DARKER_SHADE;
```

### Changing Priority Colors

```css
--priority-low: #YOUR_LOW_COLOR;
--priority-medium: #YOUR_MEDIUM_COLOR;
--priority-high: #YOUR_HIGH_COLOR;
```

### Changing Border Radius

For a more boxy design:
```css
/* Find and replace */
border-radius: 8px → border-radius: 4px
border-radius: 12px → border-radius: 6px
border-radius: 16px → border-radius: 8px
```

For a more rounded design:
```css
/* Find and replace */
border-radius: 8px → border-radius: 12px
border-radius: 12px → border-radius: 20px
border-radius: 16px → border-radius: 24px
```

### Changing Sidebar Width

```css
:root {
  --sidebar-width: 280px; /* Change from 260px */
}
```

### Dark Mode (Future Enhancement)

Add these variables and toggle class:
```css
.dark-mode {
  --card-bg: #1f2937;
  --text-primary: #f9fafb;
  --light-bg: #111827;
  /* etc. */
}
```

---

## 📊 Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Minimum contrast ratio: 4.5:1

### Focus Indicators
- Visible focus rings on all interactive elements
- Keyboard navigation supported

### Semantic HTML
- Proper heading hierarchy
- ARIA labels where needed
- Semantic elements (nav, main, aside, section)

---

## 🎓 Design Philosophy

### Principles
1. **Clean & Minimal**: No clutter, focus on content
2. **Modern**: Contemporary design trends
3. **Accessible**: Usable by everyone
4. **Responsive**: Works on all devices
5. **Performant**: Fast load times
6. **Intuitive**: Easy to understand and use

### Visual Language
- **Cards** represent discrete items (tasks, stats)
- **Color** conveys meaning (priority, status)
- **Space** creates hierarchy and breathing room
- **Motion** provides feedback and delight
- **Typography** establishes hierarchy and readability

---

**This design system ensures consistency across the entire application! 🎨**

