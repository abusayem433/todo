// Drag and drop functionality using SortableJS

// Initialize drag and drop when tasks are loaded
function initializeDragDrop() {
    const tasksList = document.getElementById('tasksList');
    
    if (tasksList && typeof Sortable !== 'undefined') {
        // Destroy existing sortable instance if it exists
        if (tasksList.sortableInstance) {
            tasksList.sortableInstance.destroy();
        }
        
        // Create new sortable instance
        tasksList.sortableInstance = Sortable.create(tasksList, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            handle: '.task-item',
            filter: '.empty-state', // Prevent dragging empty state
            onEnd: async function(evt) {
                // Only update order if items were actually moved
                if (evt.oldIndex !== evt.newIndex) {
                    await updateTaskOrder();
                }
            }
        });
    }
}

// Update task order in database
async function updateTaskOrder() {
    const taskItems = document.querySelectorAll('#tasksList .task-item');
    const updates = [];
    
    taskItems.forEach((item, index) => {
        const taskId = item.dataset.taskId;
        const task = allTasks.find(t => t.id === taskId);
        
        // Update order for all visible tasks
        if (task) {
            updates.push({
                id: taskId,
                order_index: index
            });
        }
    });
    
    try {
        // Update order for all tasks in the list
        for (const update of updates) {
            await supabase
                .from('tasks')
                .update({ order_index: update.order_index })
                .eq('id', update.id);
        }
        
        // Reload tasks to sync with database
        await loadTasks();
        // Reapply filters to maintain the filtered view
        applyFilters();
    } catch (error) {
        console.error('Error updating task order:', error);
        showNotification('Error updating task order', 'error');
    }
}

// Initialize drag and drop for archive list
function initializeArchiveDragDrop() {
    const archiveList = document.getElementById('archiveList');
    
    if (archiveList && typeof Sortable !== 'undefined') {
        // Destroy existing sortable instance if it exists
        if (archiveList.sortableInstance) {
            archiveList.sortableInstance.destroy();
        }
        
        // Create new sortable instance
        archiveList.sortableInstance = Sortable.create(archiveList, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            handle: '.task-item',
            filter: '.empty-state', // Prevent dragging empty state
            onEnd: async function(evt) {
                // Only update order if items were actually moved
                if (evt.oldIndex !== evt.newIndex) {
                    await updateArchiveTaskOrder();
                }
            }
        });
    }
}

// Update archived task order in database
async function updateArchiveTaskOrder() {
    const taskItems = document.querySelectorAll('#archiveList .task-item');
    const updates = [];
    
    // Get all archived tasks to calculate a base offset for order_index
    // This ensures archived tasks have distinct order_index values
    const allArchivedTasks = allTasks.filter(t => t.archived);
    const maxNonArchivedOrderIndex = allTasks
        .filter(t => !t.archived)
        .reduce((max, t) => Math.max(max, t.order_index || 0), -1);
    const baseOrderIndex = maxNonArchivedOrderIndex + 1;
    
    taskItems.forEach((item, index) => {
        const taskId = item.dataset.taskId;
        const task = allTasks.find(t => t.id === taskId);
        
        // Update order for all visible archived tasks
        // Use baseOrderIndex + index to ensure archived tasks come after non-archived tasks
        if (task && task.archived) {
            updates.push({
                id: taskId,
                order_index: baseOrderIndex + index
            });
        }
    });
    
    try {
        // Update order for all archived tasks in the list
        for (const update of updates) {
            await supabase
                .from('tasks')
                .update({ order_index: update.order_index })
                .eq('id', update.id);
        }
        
        // Reload tasks to sync with database
        await loadTasks();
        // Re-render archived tasks to maintain the view
        renderArchivedTasks();
    } catch (error) {
        console.error('Error updating archived task order:', error);
        showNotification('Error updating task order', 'error');
    }
}

// Initialize drag and drop for calendar date tasks
function initializeCalendarDateDragDrop() {
    const tasksList = document.getElementById('selectedDateTasksList');
    
    if (tasksList && typeof Sortable !== 'undefined') {
        // Destroy existing sortable instance if it exists
        if (tasksList.sortableInstance) {
            tasksList.sortableInstance.destroy();
        }
        
        // Create new sortable instance
        tasksList.sortableInstance = Sortable.create(tasksList, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            handle: '.task-item',
            filter: '.empty-state', // Prevent dragging empty state
            onEnd: async function(evt) {
                // Only update order if items were actually moved
                if (evt.oldIndex !== evt.newIndex) {
                    await updateTaskOrder();
                }
            }
        });
    }
}

// Also initialize when switching to tasks view
document.addEventListener('DOMContentLoaded', () => {
    const tasksNavItem = document.querySelector('[data-view="tasks"]');
    if (tasksNavItem) {
        tasksNavItem.addEventListener('click', () => {
            setTimeout(() => initializeDragDrop(), 200);
        });
    }
    
    // Reinitialize drag and drop when date filter changes
    const filterDate = document.getElementById('filterDate');
    if (filterDate) {
        filterDate.addEventListener('change', () => {
            setTimeout(() => initializeDragDrop(), 100);
        });
    }
    
    // Initialize drag and drop when switching to archive view
    const archiveNavItem = document.querySelector('[data-view="archive"]');
    if (archiveNavItem) {
        archiveNavItem.addEventListener('click', () => {
            setTimeout(() => initializeArchiveDragDrop(), 200);
        });
    }
    
    // Initialize drag and drop when switching to calendar view
    const calendarNavItem = document.querySelector('[data-view="calendar"]');
    if (calendarNavItem) {
        calendarNavItem.addEventListener('click', () => {
            setTimeout(() => initializeCalendarDateDragDrop(), 200);
        });
    }
});

