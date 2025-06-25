(function() {
    if (localStorage.getItem('vrcafe-todos')) return;
    const todos = [
        {
            id: crypto.randomUUID(),
            title: 'Intake opdracht VRcafe',
            description: "Bouw een todo-app waarmee gebruikers taken kunnen beheren, gesorteerd op categorieën zoals 'Werk', 'Persoonlijk' en 'School'.<br><br>De app moet visueel aansluiten bij de huisstijl van VRCafe Haarlem (kleurgebruik, typografie, logo) en responsief zijn voor zowel desktops als mobiele apparaten.",
            category: 'work',
            isComplete: false,
            isImportant: true
        },

        {
            id: crypto.randomUUID(),
            title: 'Game Development',
            description: "Ga verder met het werken aan je projecten zoals je desktop pet 'Desktop Leafette' je hebt nog veel interacties om toe te voegen.",
            category: 'personal',
            isComplete: false,
            isImportant: false
        },
        {
            id: crypto.randomUUID(),
            title: "Video's Editen",
            description: "Ga verder met het editen van videos voor je tweede kanaal, en begin met een nieuwe video voor je main kanaal @NoomStuff.",
            category: 'personal',
            isComplete: false,
            isImportant: false
        },
        {
            id: crypto.randomUUID(),
            title: 'White Knuckle Grind',
            description: "Ga lekker White Knuckle spelen :), het is een super leuke game. En Anil staat nogsteeds voor op al je highscores.",
            category: 'personal',
            isComplete: false,
            isImportant: false
        },

        {
            id: crypto.randomUUID(),
            title: 'Stage vinden',
            description: "Zoek zo snel mogelijk een stage plek, een goede plek vinden is super belangrijk want het is een groot gedeelte van je opleiding. Nu word het echt knallen want je hebt nog maar een paar weken om een stage te vinden.",
            category: 'school',
            isComplete: false,
            isImportant: true
        },
        {
            id: crypto.randomUUID(),
            title: 'Leren voor wiskunde toets',
            description: "Leer voor je wiskunde toets vrijdag. Zorg dat je alle formules kent en de sommen kunt maken.",
            category: 'school',
            isComplete: true,
            isImportant: false
        },
        {
            id: crypto.randomUUID(),
            title: 'Project afmaken',
            description: "Vrijdag moet het hele project af zijn, zorg dat alle funcionaliteiten er zijn en dat de hele website OOP heeft.<Br><Br>Let op de rubric en zorg dat je geen punten mist. Check ook of de website responsive is.",
            category: 'school',
            isComplete: true,
            isImportant: true
        }
    ];
    localStorage.setItem('vrcafe-todos', JSON.stringify(todos));
})();
