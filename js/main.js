document.addEventListener("DOMContentLoaded", () => {
    const programListEl = document.getElementById("programList");

    fitnessPrograms.forEach(program => {
        const card = document.createElement("div");
        card.className = "program-card";
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="program-title">${program.title}</span>
                <span class="badge" style="margin: 0;">${program.badge}</span>
            </div>
            <div class="program-desc">${program.description}</div>
            <div class="program-meta">${program.exercises.length} Übungen • 3-4 Sätze</div>
        `;

        card.addEventListener("click", () => {
            // Speichert das gewählte Programm im Browser und öffnet workout.html
            localStorage.setItem("selectedProgramId", program.id);
            window.location.href = "workout.html";
        });

        programListEl.appendChild(card);
    });
});