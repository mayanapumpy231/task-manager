document.addEventListener('DOMContentLoaded', () => {
      const taskContainer = document.getElementById('task-container');
      const taskInput = document.getElementById('task-input');
      const addTaskBtn = document.getElementById('add-task-btn');

      const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => addTaskToDOM(task));
      };

      const saveTasksToLocalStorage = () => {
        const tasks = Array.from(taskContainer.children).map(taskElement => {
          return {
            text: taskElement.querySelector('p').innerText,
            completed: taskElement.classList.contains('completed-task')
          };
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
      };

      const addTaskToDOM = (task) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `<input type="checkbox" class="task-checkbox">
                                <p>${task.text}</p>
                                <button class="delete-btn">Delete</button>`;
        taskContainer.appendChild(taskElement);

        // Set checkbox and completed status
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.checked = task.completed;
        taskElement.classList.toggle('completed-task', task.completed);

        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
          taskElement.remove();
          saveTasksToLocalStorage();
        });

        checkbox.addEventListener('change', () => {
          taskElement.classList.toggle('completed-task', checkbox.checked);
          saveTasksToLocalStorage();
        });
      };

      const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
          addTaskToDOM({ text: taskText, completed: false });
          taskInput.value = '';
          saveTasksToLocalStorage();
        }
      };

      addTaskBtn.addEventListener('click', addTask);

      // Load tasks from localStorage when the page is loaded
      loadTasksFromLocalStorage();
    });;