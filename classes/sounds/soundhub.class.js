class SoundHub {
    static BACKGROUND = new Audio('./audio/sound/background/774225__crashbulb__75-bpm-glitch-hop-percussion-loop-piano-break-4-bar-loop.wav');
    static BUTTON = new Audio('./audio/sound/menu/407720__airblock__vcr_click.wav');
    static NOISE = [
        new Audio('./audio/sound/player/377560__yudena__argh_woman_bymondfisch89.ogg'),
        new Audio('./audio/sound/player/377561__yudena__ah_woman_bymondfisch89.ogg'),
    ];
    static DEATH = new Audio('./audio/sound/player/678733__alesiadavina__female-horror-pain-sound-vol-003.wav');

    static allSounds = [SoundHub.BACKGROUND, SoundHub.BUTTON, SoundHub.NOISE, SoundHub.DEATH];


    // Spielt eine einzelne Audiodatei ab
    static playOne(sound) {  // instrumentId nur wichtig für die Visualisierung
        sound.volume = 1;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
        sound.play();  // Spielt das übergebene Sound-Objekt ab
    }

    static playLoop(sound) {
        sound.loop = true;
        sound.volume = 0.05;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
        sound.play();  // Spielt das übergebene Sound-Objekt ab
    }


    // Pausiert das Abspielen aller Audiodateien
    static pauseAll() {
        SoundHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
    }


    // Pausiert das Abspielen einer einzelnen Audiodatei
    static pauseOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }


    // ##########################################################################################################################
    // ################################################  Sound Slider - BONUS !  ################################################
    // Setzt die Lautstärke für alle Audiodateien
    static objSetVolume(sounds) {  // sounds ist das array: allSounds welches hier als Parameter ankommt
        let volumeValue = document.getElementById('volume').value;  // Holt den aktuellen Lautstärkewert aus dem Inputfeld
        sounds.forEach(sound => {
            sound.volume = volumeValue;  // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
        });
    }
}