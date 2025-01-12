const express = require('express');
const bodyParser = require('body-parser'); // To handle form submissions
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Store tasks
const files = [];

// Homepage route
app.get('/', (req, res) => {
    res.render('example', { files });
});

// Add task route
app.post('/add-task', (req, res) => {
    const { title, description } = req.body;
    if (title && description) {
        const id = files.length + 1; // Generate a unique ID for the task
        files.push({ id, title, description }); // Add the new task with ID
    }
    res.redirect('/');
});

// Task detail route
app.get('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10); // Get the task ID from the URL
    const task = files.find(task => task.id === taskId); // Find the task by ID
    if (task) {
        res.render('taskDetail', { task }); // Render the task detail view
    } else {
        res.status(404).send('Task not found'); // Send a 404 error if not found
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
