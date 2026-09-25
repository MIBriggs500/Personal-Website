// Content for the Projects and Blog overlay views.
// Adding a new project or post only requires adding an entry here —
// no new HTML file is needed.

const projectsData = {
    robert: {
        tag: "Personal Robot Project",
        title: "Robert",
        body: "<p>A personal robot project that I am currently working on. It is a work in progress.</p>"
    },
    minecraft: {
        tag: "Minecraft Server",
        title: "The Afterlife",
        body: "<p>A Minecraft server that I am currently working on.</p>"
    }
};

// Order controls how projects appear in the "View All Projects" list.
const projectOrder = ["robert", "minecraft"];

const blogData = {
    "worldbuilding-in-interactive-storytelling": {
        date: "Sep 15, 2026",
        title: "Worldbuilding in Interactive Storytelling",
        body: "<p>How narrative design principles in video games can improve traditional fiction writing.</p>"
    }
};

// Order controls how posts appear in the "View All Posts" list, newest first.
const blogOrder = ["worldbuilding-in-interactive-storytelling"];