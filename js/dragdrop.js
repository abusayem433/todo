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
            onEnd: async function(evt) {
                await updateTaskOrder();
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
        updates.push({
            id: taskId,
            order_index: index
        });
    });
    
    try {
        // Update order for all tasks
        for (const update of updates) {
            await supabase
                .from('tasks')
                .update({ order_index: update.order_index })
                .eq('id', update.id);
        }
        
        // Reload tasks to sync with database
        await loadTasks();
    } catch (error) {
        console.error('Error updating task order:', error);
        showNotification('Error updating task order', 'error');
    }
}

// Enhanced renderTasks to initialize drag and drop
const originalRenderTasks = window.renderTasks;
if (originalRenderTasks) {
    window.renderTasks = function() {
        originalRenderTasks.call(this);
        // Initialize drag and drop after rendering
        setTimeout(() => initializeDragDrop(), 100);
    };
}

// Also initialize when switching to tasks view
document.addEventListener('DOMContentLoaded', () => {
    const tasksNavItem = document.querySelector('[data-view="tasks"]');
    if (tasksNavItem) {
        tasksNavItem.addEventListener('click', () => {
            setTimeout(() => initializeDragDrop(), 200);
        });
    }
});

