// Calendar functionality
let currentCalendarDate = new Date();
let selectedDate = null;

// Render calendar
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Get previous month's last days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Build calendar HTML
    let calendarHTML = `
        <div class="calendar-weekdays">
            <div class="calendar-weekday">Sun</div>
            <div class="calendar-weekday">Mon</div>
            <div class="calendar-weekday">Tue</div>
            <div class="calendar-weekday">Wed</div>
            <div class="calendar-weekday">Thu</div>
            <div class="calendar-weekday">Fri</div>
            <div class="calendar-weekday">Sat</div>
        </div>
        <div class="calendar-days">
    `;
    
    // Add previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    // Add current month's days
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dateString = currentDate.toDateString();
        const isToday = isCurrentMonth && today.getDate() === day;
        const isSelected = selectedDate && selectedDate.toDateString() === dateString;
        const hasTasks = hasTasksOnDate(currentDate);
        
        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isSelected) classes += ' selected';
        if (hasTasks) classes += ' has-tasks';
        
        calendarHTML += `
            <div class="${classes}" onclick="selectCalendarDate(new Date(${year}, ${month}, ${day}))">
                ${day}
            </div>
        `;
    }
    
    // Add next month's days to fill the grid
    const totalCells = startingDayOfWeek + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    
    for (let day = 1; day <= remainingCells; day++) {
        calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;
    
    // Initialize selected date to today if not set
    if (!selectedDate) {
        selectedDate = new Date();
    }
    
    renderSelectedDateTasks();
}

// Check if there are tasks on a specific date
function hasTasksOnDate(date) {
    const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dateEnd = new Date(dateStart);
    dateEnd.setDate(dateEnd.getDate() + 1);
    
    return allTasks.some(task => {
        if (task.archived) return false;
        
        // Check if this is the original deadline date
        const taskDate = new Date(task.deadline);
        if (taskDate >= dateStart && taskDate < dateEnd) {
            return true;
        }
        
        // Check if this date matches a recurring occurrence
        if (task.recurring && ['daily', 'weekly', 'monthly'].includes(task.recurring)) {
            return isRecurringTaskOnDate(task, date);
        }
        
        return false;
    });
}

// Check if a recurring task occurs on a specific date
// This function is now defined in app.js and shared across the application
// Keeping this here for backward compatibility, but it should use the one from app.js
// The function in app.js will be used since it's loaded first

// Select a date on the calendar
function selectCalendarDate(date) {
    selectedDate = date;
    renderCalendar();
    renderSelectedDateTasks();
}

// Render tasks for selected date
function renderSelectedDateTasks() {
    const container = document.getElementById('selectedDateTasks');
    
    if (!selectedDate) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Select a date to view tasks</p>';
        return;
    }
    
    const dateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const dateEnd = new Date(dateStart);
    dateEnd.setDate(dateEnd.getDate() + 1);
    
    const tasksForDate = allTasks.filter(task => {
        if (task.archived) return false;
        
        // Check if this is the original deadline date
        const taskDate = new Date(task.deadline);
        if (taskDate >= dateStart && taskDate < dateEnd) {
            return true;
        }
        
        // Check if this date matches a recurring occurrence
        if (task.recurring && ['daily', 'weekly', 'monthly'].includes(task.recurring)) {
            return isRecurringTaskOnDate(task, selectedDate);
        }
        
        return false;
    });
    
    if (tasksForDate.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 20px;">
                <i class="fas fa-calendar-check" style="font-size: 48px; opacity: 0.3; margin-bottom: 12px;"></i>
                <h3 style="font-size: 18px; margin-bottom: 8px;">No tasks</h3>
                <p style="font-size: 14px;">No tasks scheduled for ${selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                })}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <h4 style="margin-bottom: 16px; color: var(--text-primary); font-size: 16px;">
            ${selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}
        </h4>
        <div id="selectedDateTasksList" class="tasks-list" style="gap: 10px;">
            ${tasksForDate.map(task => {
                // Add a recurring indicator if this is a recurring task
                const isOriginalDate = new Date(task.deadline).toDateString() === selectedDate.toDateString();
                const taskHTML = createTaskHTML(task);
                
                if (task.recurring && ['daily', 'weekly', 'monthly'].includes(task.recurring) && !isOriginalDate) {
                    return taskHTML.replace(
                        '<div class="task-meta">',
                        `<div class="task-meta"><span class="task-badge" style="background: #dbeafe; color: #1e40af;">
                            <i class="fas fa-repeat"></i> Recurring: ${capitalizeFirst(task.recurring)}
                        </span>`
                    );
                }
                
                return taskHTML;
            }).join('')}
        </div>
    `;
    
    // Initialize drag and drop for selected date tasks
    setTimeout(() => initializeCalendarDateDragDrop(), 100);
}

// Navigate to previous month
document.addEventListener('DOMContentLoaded', () => {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
    }
});

