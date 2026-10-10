document.addEventListener("DOMContentLoaded", () => {
    const programId = localStorage.getItem("selectedProgramId") || "pubsec-calisthenics";
    const currentProgram = fitnessPrograms.find(p => p.id === programId) || fitnessPrograms[0];

    const pauseImages = [
        "public/pause1.png",
        "public/pause2.png",
        "public/pause3.png"
    ];

    document.getElementById("workoutTitle").textContent = currentProgram.title;
    document.getElementById("programBadge").textContent = currentProgram.badge;

    let currentExerciseIndex = 0;
    let currentSet = 1;
    let totalSets = currentProgram.exercises[0].sets || 3;

    let pauseDuration = 60;
    let timerInterval = null;
    let timeLeft = 0;
    let isPaused = false;
    let isHolding = false; // Neuer Status für Halte-Übungen auf Zeit

    const exerciseNameEl = document.getElementById("exerciseName");
    const exerciseRepsEl = document.getElementById("exerciseReps");
    const setTextEl = document.getElementById("setText");
    const totalPercentTextEl = document.getElementById("totalPercentText");
    const totalProgressBar = document.getElementById("totalProgressBar");
    const setProgressBar = document.getElementById("setProgressBar");

    const coreBtnLabel = document.getElementById("coreBtnLabel");
    const coreBtnMainText = document.getElementById("coreBtnMainText");
    const optionalBtn = document.getElementById("optionalBtn");
    const pauseOptions = document.getElementById("pauseOptions");
    const workoutView = document.getElementById("workoutView");
    const finishView = document.getElementById("finishView");
    const imageContainer = document.getElementById("imageContainer");

    function updateUI() {
        const currentEx = currentProgram.exercises[currentExerciseIndex];

        if (!totalSets) {
            totalSets = currentEx.sets || 3;
        }

        exerciseNameEl.textContent = currentEx.name;

        if (exerciseRepsEl) {
            exerciseRepsEl.textContent = currentEx.target || "";
        }

        // Satz-Anzeige je nach Typ
        if (currentEx.type === "hold") {
            setTextEl.textContent = `Halte-Übung (Ziel: ${currentEx.holdSeconds || 20}s)`;
            setProgressBar.style.width = `100%`;
        } else {
            if (totalSets > 1) {
                setTextEl.textContent = `Satz ${currentSet} von ${totalSets}`;
            } else {
                setTextEl.textContent = `Einzel-Set`;
            }
            const setPercent = (currentSet / totalSets) * 100;
            setProgressBar.style.width = `${setPercent}%`;
        }

        // Gesamtforschritts-Berechnung
        const totalAllSetsCount = currentProgram.exercises.reduce((acc, ex) => acc + (ex.sets || 3), 0);
        let completedSetsCount = 0;
        for (let i = 0; i < currentExerciseIndex; i++) {
            completedSetsCount += (currentProgram.exercises[i].sets || 3);
        }
        completedSetsCount += (currentSet - 1);

        let totalPercent = Math.round((completedSetsCount / totalAllSetsCount) * 100);
        totalPercent = Math.min(99, Math.max(0, totalPercent));

        totalProgressBar.style.width = `${totalPercent}%`;
        totalPercentTextEl.textContent = `${totalPercent}%`;

        // Übungsbild laden
        if (!isPaused && !isHolding) {
            if (currentEx.image) {
                imageContainer.innerHTML = `<img src="${currentEx.image}" alt="${currentEx.name}">`;
            } else {
                imageContainer.innerHTML = `<span>[ Bild für ${currentEx.name} ]</span>`;
            }
        }

        // Optionaler 4. Satz Button
        if (currentEx.allowOptional && currentSet === 3 && totalSets === 3 && !isPaused && !isHolding) {
            optionalBtn.classList.remove("hidden");
        } else {
            optionalBtn.classList.add("hidden");
        }

        // Button Text Logik für den Haupt-Button
        if (!isPaused && !isHolding) {
            coreBtnLabel.textContent = "STATUS";
            coreBtnMainText.className = "btn-main-text";

            if (currentEx.type === "hold") {
                coreBtnMainText.textContent = `START (${currentEx.holdSeconds || 20}S)`;
            } else if (currentSet === totalSets) {
                coreBtnMainText.textContent = "ÜBUNG BEENDEN";
            } else {
                coreBtnMainText.textContent = "SATZ BEENDEN";
            }
        }
    }

    window.handleCoreBtnClick = function() {
        const currentEx = currentProgram.exercises[currentExerciseIndex];

        if (isHolding) {
            // Wenn der Halte-Timer läuft, kann man ihn vorzeitig abbrechen oder ignorieren
            return;
        }

        if (!isPaused) {
            if (currentEx.type === "hold") {
                // Starte den Halte-Countdown statt direkt in die Pause zu gehen
                startHoldTimer(currentEx.holdSeconds || 20);
            } else {
                // Normaler Satz -> direkt in die Pause
                startTimer(pauseDuration);
            }
        } else {
            // Pause überspringen
            skipTimer();
        }
    };

    // NEU: Timer fürs Halten (z.B. 20 Sekunden Plank)
    // Startet den kreisförmigen Halte-Timer (z.B. 20s Plank)
        function startHoldTimer(seconds) {
            isHolding = true;
            timeLeft = seconds;
            const totalHoldSeconds = seconds;

            optionalBtn.classList.add("hidden");
            pauseOptions.style.display = "none";

            const coreBtn = document.getElementById("coreBtn");
            coreBtn.classList.add("holding-active");

            coreBtnLabel.textContent = "HALTE DURCH";
            coreBtnMainText.className = "btn-timer-text";
            coreBtnMainText.textContent = `${timeLeft}s`;

            // Initialen Ring-Fortschritt setzen (0 Grad)
            coreBtn.style.setProperty("--progress", "0deg");

            clearInterval(timerInterval);

            // Sanfteres Update-Intervall für die Ring-Animation (alle 100ms)
            const updateIntervalMs = 100;
            let elapsedMs = 0;
            const totalMs = totalHoldSeconds * 1000;

            timerInterval = setInterval(() => {
                elapsedMs += updateIntervalMs;

                // Prozentuales Verstreichen & Berechnung in Grad (0 bis 360)
                const progressPercent = Math.min(1, elapsedMs / totalMs);
                const progressDegrees = progressPercent * 360;

                // Ring-Fortschritt im CSS aktualisieren
                coreBtn.style.setProperty("--progress", `${progressDegrees}deg`);

                // Sekundenanzeige im Text alle 1000ms aktualisieren
                const currentSecondsLeft = Math.ceil((totalMs - elapsedMs) / 1000);
                coreBtnMainText.textContent = `${Math.max(0, currentSecondsLeft)}s`;

                if (elapsedMs >= totalMs) {
                    clearInterval(timerInterval);
                    isHolding = false;

                    // Button-Animation zurücksetzen
                    coreBtn.classList.remove("holding-active");
                    coreBtn.style.removeProperty("--progress");
                    pauseOptions.style.display = "flex";

                    // Automatisch in die Recovery-Pause wechseln
                    startTimer(pauseDuration);
                }
            }, updateIntervalMs);
        }

    window.setPauseTime = function(seconds) {
        pauseDuration = seconds;
        document.getElementById("btn60").classList.toggle("active", seconds === 60);
        document.getElementById("btn90").classList.toggle("active", seconds === 90);
    };

    function startTimer(seconds) {
        isPaused = true;
        timeLeft = seconds;
        optionalBtn.classList.add("hidden");

        const randomIndex = Math.floor(Math.random() * pauseImages.length);
        const selectedPauseImage = pauseImages[randomIndex];

        if (selectedPauseImage) {
            imageContainer.innerHTML = `<img src="${selectedPauseImage}" alt="Recovery Pause">`;
        } else {
            imageContainer.innerHTML = `<span>[ RECOVERY PAUSE ]</span>`;
        }

        coreBtnLabel.textContent = "PAUSE LÄUFT";
        coreBtnMainText.className = "btn-timer-text";
        coreBtnMainText.textContent = `${timeLeft}s`;

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            coreBtnMainText.textContent = `${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endTimer();
            }
        }, 1000);
    }

    function skipTimer() {
        clearInterval(timerInterval);
        endTimer();
    }

    function endTimer() {
            isPaused = false;
            isHolding = false;
            pauseOptions.style.display = "flex";

            const coreBtn = document.getElementById("coreBtn");
            if (coreBtn) {
                coreBtn.classList.remove("holding-active");
                coreBtn.style.removeProperty("--progress");
            }

            if (currentSet < totalSets) {
                currentSet++;
            } else {
                currentExerciseIndex++;
                currentSet = 1;

                if (currentExerciseIndex >= currentProgram.exercises.length) {
                    totalProgressBar.style.width = "100%";
                    totalPercentTextEl.textContent = "100%";

                    workoutView.classList.add("hidden");
                    finishView.classList.remove("hidden");
                    return;
                } else {
                    totalSets = currentProgram.exercises[currentExerciseIndex].sets || 3;
                }
            }
            updateUI();
        }

    window.addOptionalSet = function() {
        totalSets = 4;
        optionalBtn.classList.add("hidden");

        setTextEl.textContent = `Satz ${currentSet} von ${totalSets}`;
        setProgressBar.style.width = `${(currentSet / totalSets) * 100}%`;

        coreBtnLabel.textContent = "STATUS";
        coreBtnMainText.className = "btn-main-text";
        coreBtnMainText.textContent = "SATZ BEENDEN";

        startTimer(pauseDuration);
    };

    updateUI();
});