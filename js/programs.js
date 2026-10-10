const fitnessPrograms = [
    {
        id: "pubsec-calisthenics",
        title: "PubSec Calisthenics Drive",
        description: "Intensives Bodyweight-Training für Oberkörper und Core.",
        badge: "MAIN OPERATION",
        exercises: [
            { name: "Klimmzüge", target: "6 - 10 Wiederholungen", type: "reps", sets: 3, allowOptional: true, image: "public/klimmzuege.png" },
            { name: "Dips", target: "8 - 12 Wiederholungen", type: "reps", sets: 3, allowOptional: true, image: "public/dips.png" },
            { name: "Inverted Rows", target: "10 - 12 Wiederholungen", type: "reps", sets: 3, allowOptional: true, image: "public/inverted_rows.png" },
            { name: "Liegestützen", target: "10 - 15 Wiederholungen", type: "reps", sets: 3, allowOptional: true, image: "public/liegestuetze.png" },
            { name: "Beinheben im Hang", target: "10 - 15 Wiederholungen", type: "reps", sets: 3, allowOptional: true, image: "public/Beinheben_im_Hang.png" }
        ]
    },
    {
        id: "pubsec-core-hold",
        title: "PubSec Core & Hold Protocol",
        description: "Fokus auf statische Haltekraft und schnelle Intervalle.",
        badge: "HOLD PROTOCOL",
        exercises: [
            { name: "Beine Halten (Statisch)", target: "20 Sekunden halten", type: "hold", holdSeconds: 20, sets: 1, allowOptional: false, image: "public/leg_hold.png" },
            { name: "Knie zur Brust", target: "12 Wiederholungen", type: "reps", sets: 1, allowOptional: false, image: "public/knee_to_chest.png" },
            { name: "Unterarmstütz (Plank)", target: "20 Sekunden halten", type: "hold", holdSeconds: 20, sets: 1, allowOptional: false, image: "public/plank.png" },
            { name: "Rumpf-Aufrollen (Roll-Ups)", target: "12 Wiederholungen", type: "reps", sets: 1, allowOptional: false, image: "public/roll_ups.png" },
            { name: "Plank zu Liegestütz", target: "12 Wiederholungen", type: "reps", sets: 1, allowOptional: false, image: "public/plank_to_press_up.png" },
            { name: "Scherenbewegungen (Scissors)", target: "12 Wiederholungen", type: "reps", sets: 1, allowOptional: false, image: "public/sissors.png" },
            { name: "Beinheben (Statisch gehalten)", target: "20 Sekunden halten", type: "hold", holdSeconds: 20, sets: 1, allowOptional: false, image: "public/leg_raises.png" },
            { name: "Unterarmstütz (Plank)", target: "20 Sekunden halten", type: "hold", holdSeconds: 20, sets: 1, allowOptional: false, image: "public/plank.png" }
        ]
    }
];