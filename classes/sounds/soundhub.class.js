class SoundHub {
    static bgVolume = 0.05;
    static otherVolume = 0.75;
    static soundCurrentTime = 0;
    static BACKGROUND = new Audio('classes/sounds/sound/background/piano.wav');
    static BUTTON = new Audio('classes/sounds/sound/menu/click.wav');
    static NOISE = [
        new Audio('classes/sounds/sound/player/argh.ogg'),
        new Audio('classes/sounds/sound/player/ah.ogg'),
    ];
    static DEATH = new Audio('classes/sounds/sound/player/death.wav');
    static COIN = [
        new Audio('classes/sounds/sound/collect/clad.wav'),
        new Audio('classes/sounds/sound/collect/silver.wav'),
    ]
    static SPRAY = new Audio('classes/sounds/sound/collect/pop.flac');
    static BOSS = new Audio('classes/sounds/sound/endgame/metal.mp3');
    static WON = new Audio('classes/sounds/sound/endgame/pheonix.wav');
    static LOOSE = new Audio('classes/sounds/sound/background/ambiencecity.wav');

    static FIREBALL = [
        new Audio('classes/sounds/sound/player/fireball_spawn.wav')
    ];


    static allSounds = [SoundHub.BACKGROUND, SoundHub.BUTTON, SoundHub.NOISE, SoundHub.DEATH, SoundHub.COIN, SoundHub.SPRAY, SoundHub.WON, SoundHub.LOOSE, SoundHub.FIREBALL];

    static cachedSound;

    static playOne(sound) {
        if (isSoundOn) {
            sound.volume = 0.1;
            SoundHub.BACKGROUND ? sound.volume = this.bgVolume : sound.volume = this.otherVolume;
            sound.currentTime = this.soundCurrentTime;
            sound.play();
        }
    }

    static playLoop(sound) {
        if (isSoundOn) {
            sound.loop = true;
            SoundHub.BACKGROUND ? sound.volume = this.bgVolume : sound.volume = this.otherVolume;
            sound.currentTime = this.soundCurrentTime;
            sound.play();
            this.cachedSound = sound;
        }
    }

    static pauseAll() {
        if (isSoundOn) {
            this.stopAllSounds();
        }
        else {
            isSoundOn = true;
            SoundHub.playLoop(this.cachedSound);
        }
    }

    static stopAllSounds() {
        isSoundOn = false;
        SoundHub.allSounds.forEach(sound => {
            if (sound.length > 0) {
                for (let i = 0; i < sound.length; i++) {
                    sound[i].pause();
                }
            }
            else {
                sound.pause();
            }
        });
        this.pauseOne(SoundHub.BACKGROUND);
        this.pauseOne(SoundHub.BOSS);
    }

    static pauseOne(sound) {
        sound.pause();
    }

    static objSetVolume(sounds) {
        let volumeValue = document.getElementById('volume').value;
        sounds.forEach(sound => {
            sound.volume = volumeValue;
        });
    }
}