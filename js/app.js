// Main application logic
let currentUser = null;
let allTasks = [];
let filteredTasks = [];
let lastLoginDate = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuthentication();
    await loadUserProfile();
    await loadTasks();
    initializeEventListeners();
    initializeViews();
    updateDashboardStats();
    checkDailyReminder();
});

// Check if user is authenticated
async function checkAuthentication() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    currentUser = user;
}

// Load user profile
async function loadUserProfile() {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', currentUser.id)
            .single();

        if (error) throw error;

        if (data) {
            document.getElementById('userName').textContent = data.full_name || 'User';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Load all tasks
async function loadTasks() {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('order_index', { ascending: true });

        if (error) throw error;

        allTasks = data || [];
        filteredTasks = allTasks.filter(task => !task.archived);
        renderTasks();
        updateDashboardStats();
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Render tasks in the tasks view
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const activeTasks = filteredTasks.filter(task => !task.archived);

    if (activeTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No tasks found</h3>
                <p>Create your first task to get started!</p>
            </div>
        `;
        return;
    }

    tasksList.innerHTML = activeTasks.map(task => createTaskHTML(task)).join('');
    attachTaskEventListeners();
}

// Create task HTML
function createTaskHTML(task) {
    const deadline = new Date(task.deadline);
    const isOverdue = deadline < new Date() && !task.completed;
    const deadlineText = formatDate(deadline);
    
    return `
        <div class="task-item priority-${task.priority} ${task.completed ? 'completed' : ''}" 
             data-task-id="${task.id}" draggable="true">
            <div class="task-header">
                <input type="checkbox" class="task-checkbox" 
                       ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskComplete('${task.id}')">
                <div class="task-content">
                    <div class="task-title">${escapeHtml(task.title)}</div>
                    ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                    <div class="task-meta">
                        <span class="task-badge badge-deadline ${isOverdue ? 'overdue' : ''}">
                            <i class="fas fa-calendar"></i>
                            ${deadlineText}
                        </span>
                        <span class="task-badge badge-category">
                            <i class="fas fa-folder"></i>
                            ${capitalizeFirst(task.category)}
                        </span>
                        <span class="task-badge badge-priority ${task.priority}">
                            <i class="fas fa-flag"></i>
                            ${capitalizeFirst(task.priority)}
                        </span>
                        ${task.recurring !== 'none' ? `
                            <span class="task-badge badge-recurring">
                                <i class="fas fa-repeat"></i>
                                ${capitalizeFirst(task.recurring)}
                            </span>
                        ` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-icon edit" onclick="editTask('${task.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon archive" onclick="archiveTask('${task.id}')">
                        <i class="fas fa-archive"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteTask('${task.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Initialize event listeners
function initializeEventListeners() {
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Add task button
    document.getElementById('addTaskBtn').addEventListener('click', () => openTaskModal());

    // Task form submission
    document.getElementById('taskForm').addEventListener('submit', saveTask);

    // Cancel task
    document.getElementById('cancelTask').addEventListener('click', closeTaskModal);

    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // Filters
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterPriority').addEventListener('change', applyFilters);
    document.getElementById('filterStatus').addEventListener('change', applyFilters);

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            switchView(view);
        });
    });
}

// Initialize views
function initializeViews() {
    // Default view is dashboard
    switchView('dashboard');
}

// Switch between views
function switchView(viewName) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(`${viewName}View`).classList.add('active');

    // Load specific view data
    if (viewName === 'tasks') {
        renderTasks();
    } else if (viewName === 'calendar') {
        renderCalendar();
    } else if (viewName === 'archive') {
        renderArchivedTasks();
    } else if (viewName === 'dashboard') {
        updateDashboardStats();
        renderDashboardChart();
    }
}

// Open task modal
function openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('taskForm');
    
    form.reset();
    document.getElementById('taskId').value = '';

    if (taskId) {
        // Edit mode
        const task = allTasks.find(t => t.id === taskId);
        if (task) {
            modalTitle.textContent = 'Edit Task';
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description || '';
            document.getElementById('taskDeadline').value = formatDateForInput(task.deadline);
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskCategory').value = task.category;
            document.getElementById('taskRecurring').value = task.recurring;
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Task';
        // Set default deadline to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('taskDeadline').value = formatDateForInput(tomorrow.toISOString());
    }

    modal.classList.add('active');
}

// Close task modal
function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
}

// Save task
async function saveTask(e) {
    e.preventDefault();

    const taskId = document.getElementById('taskId').value;
    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        deadline: document.getElementById('taskDeadline').value,
        priority: document.getElementById('taskPriority').value,
        category: document.getElementById('taskCategory').value,
        recurring: document.getElementById('taskRecurring').value,
        user_id: currentUser.id
    };

    try {
        if (taskId) {
            // Update existing task
            const { error } = await supabase
                .from('tasks')
                .update(taskData)
                .eq('id', taskId);

            if (error) throw error;
        } else {
            // Create new task
            const { error } = await supabase
                .from('tasks')
                .insert([{ ...taskData, order_index: allTasks.length }]);

            if (error) throw error;
        }

        closeTaskModal();
        await loadTasks();
        showNotification(taskId ? 'Task updated successfully!' : 'Task created successfully!', 'success');
    } catch (error) {
        console.error('Error saving task:', error);
        showNotification('Error saving task: ' + error.message, 'error');
    }
}

// Edit task
function editTask(taskId) {
    openTaskModal(taskId);
}

// Toggle task complete
async function toggleTaskComplete(taskId) {
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;

    try {
        const newCompletedStatus = !task.completed;
        
        // Update task
        const { error } = await supabase
            .from('tasks')
            .update({ completed: newCompletedStatus })
            .eq('id', taskId);

        if (error) throw error;

        // Handle recurring tasks
        if (newCompletedStatus && task.recurring !== 'none') {
            await createRecurringTask(task);
        }

        await loadTasks();
        showNotification(newCompletedStatus ? 'Task completed!' : 'Task marked as incomplete', 'success');
    } catch (error) {
        console.error('Error toggling task:', error);
        showNotification('Error updating task', 'error');
    }
}

// Create recurring task
async function createRecurringTask(originalTask) {
    const deadline = new Date(originalTask.deadline);
    
    switch (originalTask.recurring) {
        case 'daily':
            deadline.setDate(deadline.getDate() + 1);
            break;
        case 'weekly':
            deadline.setDate(deadline.getDate() + 7);
            break;
        case 'monthly':
            deadline.setMonth(deadline.getMonth() + 1);
            break;
    }

    const newTask = {
        user_id: currentUser.id,
        title: originalTask.title,
        description: originalTask.description,
        deadline: deadline.toISOString(),
        priority: originalTask.priority,
        category: originalTask.category,
        recurring: originalTask.recurring,
        completed: false,
        archived: false,
        order_index: allTasks.length
    };

    try {
        const { error } = await supabase
            .from('tasks')
            .insert([newTask]);

        if (error) throw error;
    } catch (error) {
        console.error('Error creating recurring task:', error);
    }
}

// Archive task
async function archiveTask(taskId) {
    if (!confirm('Are you sure you want to archive this task?')) return;

    try {
        const { error } = await supabase
            .from('tasks')
            .update({ archived: true })
            .eq('id', taskId);

        if (error) throw error;

        await loadTasks();
        showNotification('Task archived successfully!', 'success');
    } catch (error) {
        console.error('Error archiving task:', error);
        showNotification('Error archiving task', 'error');
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) return;

    try {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) throw error;

        await loadTasks();
        showNotification('Task deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Error deleting task', 'error');
    }
}

// Render archived tasks
function renderArchivedTasks() {
    const archiveList = document.getElementById('archiveList');
    const archivedTasks = allTasks.filter(task => task.archived);

    if (archivedTasks.length === 0) {
        archiveList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-archive"></i>
                <h3>No archived tasks</h3>
                <p>Completed tasks you archive will appear here.</p>
            </div>
        `;
        return;
    }

    archiveList.innerHTML = archivedTasks.map(task => createArchivedTaskHTML(task)).join('');
}

// Create archived task HTML
function createArchivedTaskHTML(task) {
    const deadline = new Date(task.deadline);
    const deadlineText = formatDate(deadline);
    
    return `
        <div class="task-item priority-${task.priority} completed">
            <div class="task-header">
                <div class="task-content" style="flex: 1;">
                    <div class="task-title">${escapeHtml(task.title)}</div>
                    ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                    <div class="task-meta">
                        <span class="task-badge badge-deadline">
                            <i class="fas fa-calendar"></i>
                            ${deadlineText}
                        </span>
                        <span class="task-badge badge-category">
                            <i class="fas fa-folder"></i>
                            ${capitalizeFirst(task.category)}
                        </span>
                        <span class="task-badge badge-priority ${task.priority}">
                            <i class="fas fa-flag"></i>
                            ${capitalizeFirst(task.priority)}
                        </span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-icon" onclick="unarchiveTask('${task.id}')" title="Unarchive">
                        <i class="fas fa-undo"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteTask('${task.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Unarchive task
async function unarchiveTask(taskId) {
    try {
        const { error } = await supabase
            .from('tasks')
            .update({ archived: false })
            .eq('id', taskId);

        if (error) throw error;

        await loadTasks();
        renderArchivedTasks();
        showNotification('Task restored successfully!', 'success');
    } catch (error) {
        console.error('Error unarchiving task:', error);
        showNotification('Error restoring task', 'error');
    }
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        filteredTasks = allTasks.filter(task => !task.archived);
    } else {
        filteredTasks = allTasks.filter(task => 
            !task.archived &&
            (task.title.toLowerCase().includes(searchTerm) ||
             (task.description && task.description.toLowerCase().includes(searchTerm)))
        );
    }
    
    applyFilters();
}

// Apply filters
function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const priority = document.getElementById('filterPriority').value;
    const status = document.getElementById('filterStatus').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    filteredTasks = allTasks.filter(task => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
            task.title.toLowerCase().includes(searchTerm) ||
            (task.description && task.description.toLowerCase().includes(searchTerm));

        // Category filter
        const matchesCategory = category === 'all' || task.category === category;

        // Priority filter
        const matchesPriority = priority === 'all' || task.priority === priority;

        // Status filter
        let matchesStatus = true;
        if (status === 'active') {
            matchesStatus = !task.completed && !task.archived;
        } else if (status === 'completed') {
            matchesStatus = task.completed && !task.archived;
        } else {
            matchesStatus = !task.archived;
        }

        return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });

    renderTasks();
}

// Attach task event listeners
function attachTaskEventListeners() {
    // Already handled via onclick attributes in HTML for simplicity
}

// Update dashboard stats
function updateDashboardStats() {
    const activeTasks = allTasks.filter(task => !task.archived);
    const completedTasks = activeTasks.filter(task => task.completed);
    const pendingTasks = activeTasks.filter(task => !task.completed);
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const overdueTasks = pendingTasks.filter(task => new Date(task.deadline) < now);
    const todayTasks = pendingTasks.filter(task => {
        const taskDate = new Date(task.deadline);
        const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
        return taskDay.getTime() === today.getTime();
    });

    document.getElementById('completedCount').textContent = completedTasks.length;
    document.getElementById('pendingCount').textContent = pendingTasks.length;
    document.getElementById('overdueCount').textContent = overdueTasks.length;
    document.getElementById('todayCount').textContent = todayTasks.length;
}

// Render dashboard chart
function renderDashboardChart() {
    const ctx = document.getElementById('taskChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (window.taskChartInstance) {
        window.taskChartInstance.destroy();
    }

    const activeTasks = allTasks.filter(task => !task.archived);
    
    // Count tasks by category
    const categories = {};
    activeTasks.forEach(task => {
        categories[task.category] = (categories[task.category] || 0) + 1;
    });

    window.taskChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories).map(cat => capitalizeFirst(cat)),
            datasets: [{
                label: 'Tasks by Category',
                data: Object.values(categories),
                backgroundColor: [
                    '#6366f1',
                    '#8b5cf6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Check daily reminder
function checkDailyReminder() {
    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();

    if (lastLogin !== today) {
        localStorage.setItem('lastLogin', today);
        showDailyReminder();
    }
}

// Show daily reminder
function showDailyReminder() {
    const modal = document.getElementById('dailyReminderModal');
    const content = document.getElementById('reminderContent');
    
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    
    const upcomingTasks = allTasks.filter(task => {
        const taskDate = new Date(task.deadline);
        return !task.completed && !task.archived && taskDate >= todayStart && taskDate < todayEnd;
    });

    if (upcomingTasks.length === 0) {
        content.innerHTML = `
            <div class="reminder-empty">
                <i class="fas fa-check-circle"></i>
                <h3>No tasks due today!</h3>
                <p>Enjoy your day! 🎉</p>
            </div>
        `;
    } else {
        content.innerHTML = `
            <p style="margin-bottom: 20px; text-align: center; color: var(--text-secondary);">
                You have <strong>${upcomingTasks.length}</strong> task${upcomingTasks.length > 1 ? 's' : ''} due today:
            </p>
            ${upcomingTasks.map(task => `
                <div class="reminder-task ${task.priority}">
                    <h4>${escapeHtml(task.title)}</h4>
                    <p>
                        <i class="fas fa-flag"></i> ${capitalizeFirst(task.priority)} Priority &nbsp;|&nbsp;
                        <i class="fas fa-clock"></i> ${formatTime(task.deadline)}
                    </p>
                </div>
            `).join('')}
        `;
    }

    modal.classList.add('active');
}

// Logout
async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error logging out:', error);
        showNotification('Error logging out', 'error');
    }
}

// Utility functions
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
}

function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('en-US', options);
}

function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

