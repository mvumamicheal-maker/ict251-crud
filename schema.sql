CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_name VARCHAR(120) NOT NULL,
    project_title VARCHAR(150) NOT NULL,
    description TEXT,
    tech_stack VARCHAR(100),
    live_url VARCHAR(255),
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO portfolio (owner_name, project_title, description, tech_stack, live_url, year) VALUES
('Micheal Mvuma', 'Student Portfolio Website', 'A responsive portfolio showcasing student projects and media.', 'HTML, CSS, JavaScript', 'https://github.com/mumamicheal-malec/myweb', 2026),
('Micheal Mvuma', 'Campus Event Manager', 'Web app to track university events and notices.', 'Node.js, Express, SQLite', 'https://github.com/mumamicheal-malec/campus-events', 2026),
('John Doe', 'E-Commerce Store', 'Online marketplace for electronics and apparel.', 'React, Node.js', 'https://github.com/example/store', 2025),
('Jane Smith', 'Recipe Finder', 'Search API for healthy personal recipes.', 'Python, Flask', 'https://github.com/example/recipes', 2025),
('Alice Johnson', 'Weather Dashboard', 'Real-time global weather tracking app.', 'JavaScript, REST API', 'https://github.com/example/weather', 2026),
('Bob Brown', 'Task Manager', 'Productivity tool for daily student goals.', 'Vue.js, Firebase', 'https://github.com/example/tasks', 2025),
('Charlie Green', 'Quiz App', 'Interactive computer science quiz game.', 'HTML, CSS, JS', 'https://github.com/example/quiz', 2026),
('Diana Prince', 'Blog Platform', 'Markdown-based blogging engine.', 'Node.js, Express', 'https://github.com/example/blog', 2025),
('Ethan Hunt', 'Fitness Tracker', 'Log workouts and weekly running goals.', 'React Native', 'https://github.com/example/fitness', 2026),
('Fiona Gallagher', 'Budget Planner', 'Track personal monthly expenses and savings.', 'JavaScript, Chart.js', 'https://github.com/example/budget', 2026);
