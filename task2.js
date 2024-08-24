const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const TODO_FILE = 'todos.json';

const loadTodos = () => {
    try {
        if (!fs.existsSync(TODO_FILE)) {
            fs.writeFileSync(TODO_FILE, JSON.stringify([]));
        }
        const data = fs.readFileSync(TODO_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error :', err);
        return [];
    }
};

const saveTodos = (todos) => {
    try {
        fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
    } catch (err) {
        console.error('Error s:', err);
    }
};

program
    .name('todo')
    .description('CLI to do file-based tasks')
    .version('0.8.0');

program.command('add')
    .description('Add a new todo')
    .argument('<todo>', 'todo to add')
    .action((todo) => {
        const todos = loadTodos();
        todos.push({ task: todo, done: false });
        saveTodos(todos);
        console.log('Todo added');
    });

program.command('list')
    .description('List all todos')
    .action(() => {
        const todos = loadTodos();
        if (todos.length === 0) {
            console.log('No todos found.');
        } else {
            console.log('Todos:');
            todos.forEach((todo, index) => {
                const status = todo.done ? '[x]' : '[ ]';
                console.log(`${index + 1}. ${status} ${todo.task}`);
            });
        }
    });

program.command('delete')
    .description('Delete a todo')
    .argument('<index>', 'index of todo to delete')
    .action((index) => {
        const todos = loadTodos();
        if (index < 1 || index > todos.length) {
            console.log('Invalid index.');
            return;
        }
        const deletedTodo = todos.splice(index - 1, 1);
        saveTodos(todos);
        console.log(`Deleted todo: "${deletedTodo[0].task}"`);
    });

program.command('done')
    .description('Mark a todo as done')
    .argument('<index>', 'index of todo to mark as done')
    .action((index) => {
        const todos = loadTodos();
        if (index < 1 || index > todos.length) {
            console.log('Invalid index.');
            return;
        }
        todos[index - 1].done = true;
        saveTodos(todos);
        console.log(`Marked todo as done: "${todos[index - 1].task}"`);
    });

program.parse();
