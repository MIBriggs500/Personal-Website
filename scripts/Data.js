// Content for the Projects and Blog overlay views.
// Adding a new project or post only requires adding an entry here —
// no new HTML file is needed.
//
// Project fields:
//   tag      Small label above the title
//   title    Project name
//   summary  One-line blurb shown on cards in "View All Projects"
//   body     HTML shown in the project's detail view
//   links    (optional) Buttons shown in the detail view: [{ label, href }]
//
// Blog post fields:
//   date     Display date, e.g. "Sep 15, 2026"
//   iso      Machine-readable date, e.g. "2026-09-15"
//   title    Post title
//   summary  One-line blurb shown on cards in "View All Posts"
//   body     HTML shown in the post's detail view

const projectsData = {
    robert: {
        tag: "Personal Robot Project",
        title: "Robert",
        summary: "A personal robot I'm actively building. He is my son.",
        body: "<p>A personal robot project that I am actively working on. He is my son.</p>"
    },
    minecraft: {
        tag: "Minecraft Server",
        title: "The Afterlife",
        summary: "A 26.2 survival server with seasonal resource packs and events.",
        body: "<p>A 26.2 Survival Minecraft Server with seasonal resource packs and events.</p>",
        links: [
            { label: "Server info, gallery & how to apply", href: "pages/minecraft.html" }
        ]
    }
};

// Order controls how projects appear in the "View All Projects" list.
const projectOrder = ["robert", "minecraft"];

const blogData = {
    "worldbuilding-in-interactive-storytelling": {
        date: "Sep 15, 2026",
        iso: "2026-09-15",
        title: "Worldbuilding in Interactive Storytelling",
        summary: "How narrative design principles in video games can improve traditional fiction writing.",
        body: "<p>How narrative design principles in video games can improve traditional fiction writing.</p>"
    }
};

// Order controls how posts appear in the "View All Posts" list, newest first.
const blogOrder = ["worldbuilding-in-interactive-storytelling"];
