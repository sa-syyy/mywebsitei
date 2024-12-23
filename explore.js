
document.addEventListener("DOMContentLoaded", () => {
    const exploreGrid = document.getElementById("explore-grid");
    const loading = document.getElementById("loading");

    let ideas = [];
    let page = 1;
    const ideasPerPage = 6;

    // Simulate backend data
    const generateIdeas = (count) => {
        const newIdeas = [];
        for (let i = 0; i < count; i++) {
            newIdeas.push({
                id: ideas.length + i + 1,
                image: `https://via.placeholder.com/250?text=Idea+${ideas.length + i + 1}`,
                title: `Idea Title ${ideas.length + i + 1}`,
            });
        }
        return newIdeas;
    };

    // Fetch ideas from simulated backend
    const fetchIdeas = () => {
        loading.classList.remove("hidden");
        setTimeout(() => {
            const newIdeas = generateIdeas(ideasPerPage);
            ideas = [...ideas, ...newIdeas];
            displayIdeas(newIdeas);
            loading.classList.add("hidden");
        }, 1000); // Simulate network delay
    };

    // Display ideas in the grid
    const displayIdeas = (ideaList) => {
        ideaList.forEach((idea) => {
            const ideaElement = document.createElement("div");
            ideaElement.classList.add("grid-item");
            ideaElement.innerHTML = `
                <img src="${idea.image}" alt="${idea.title}">
                <div class="title">${idea.title}</div>
            `;
            exploreGrid.appendChild(ideaElement);
        });
    };

    // Infinite scroll functionality
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            page++;
            fetchIdeas();
        }
    };

    // Initial load
    fetchIdeas();

    // Event listener
    window.addEventListener("scroll", handleScroll);
});
