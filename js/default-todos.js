(function() {
    if (localStorage.getItem('todos')) return;
    const todos = [
        {
            id: crypto.randomUUID(),
            title: 'Internship Intake Assignment',
            description: "Build a todo app that allows users to manage tasks, sorted by categories such as 'Work', 'Personal', and 'School'.<br><br>The app should visually match the branding of the company (color scheme, typography, logo) and be responsive for both desktops and mobile devices.",
            category: 'work',
            isComplete: false,
            isImportant: true
        },

        {
            id: crypto.randomUUID(),
            title: 'Game Development',
            description: "Continue working on your projects, such as your desktop pet 'Desktop Leafette'. You still have many interactions to add.",
            category: 'personal',
            isComplete: false,
            isImportant: false
        },
        {
            id: crypto.randomUUID(),
            title: 'Edit Videos',
            description: "Continue editing videos for your second channel, and start a new video for your main channel @NoomStuff.",
            category: 'personal',
            isComplete: false,
            isImportant: false
        },
        {
            id: crypto.randomUUID(),
            title: 'White Knuckle Grind',
            description: "Play some White Knuckle :) It's a super fun game. And Anil is still ahead of you on all the high scores.",
            category: 'personal',
            isComplete: false,
            isImportant: false
        },

        {
            id: crypto.randomUUID(),
            title: 'Find an Internship',
            description: "Find an internship as soon as possible. Finding a good place is very important because it's a big part of your education. Now it's crunch time because you only have a few weeks left to find one.",
            category: 'school',
            isComplete: false,
            isImportant: true
        },
        {
            id: crypto.randomUUID(),
            title: 'Study for Math Test',
            description: "Study for your math test on Friday. Make sure you know all the formulas and can solve the problems.",
            category: 'school',
            isComplete: true,
            isImportant: false
        },
        {
            id: crypto.randomUUID(),
            title: 'Finish Project',
            description: "The whole project must be finished by Friday. Make sure all functionalities are there and the entire website uses OOP.<br><br>Check the rubric and make sure you don't miss any points. Also check if the website is responsive.",
            category: 'school',
            isComplete: true,
            isImportant: true
        }
    ];
    localStorage.setItem('todos', JSON.stringify(todos));
})();
