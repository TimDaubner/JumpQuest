class SoundHub {
    static bgVolume = 0.05;
    static otherVolume = 0.75;
    static soundCurrentTime = 0;
    static BACKGROUND = new Audio('./audio/sound/background/774225__crashbulb__75-bpm-glitch-hop-percussion-loop-piano-break-4-bar-loop.wav');
    static BUTTON = new Audio('./audio/sound/menu/407720__airblock__vcr_click.wav');
    static NOISE = [
        new Audio('./audio/sound/player/377560__yudena__argh_woman_bymondfisch89.ogg'),
        new Audio('./audio/sound/player/377561__yudena__ah_woman_bymondfisch89.ogg'),
    ];
    static DEATH = new Audio('./audio/sound/player/678733__alesiadavina__female-horror-pain-sound-vol-003.wav');
    static COIN = [
        new Audio('./audio/sound/collect/423337__dsg__clad-quarter-6.wav'),
        new Audio('./audio/sound/collect/423344__dsg__silver-quarter-7.wav'),
    ]
    static SPRAY = new Audio('./audio/sound/collect/244657__dsg__pop-5.flac');
    static BOSS = new Audio('./audio/sound/endgame/595840__lagmusics__heavy-metal-looping.mp3');
    static WON = new Audio('./audio/sound/endgame/719854__phoenix_the_maker__game-music-001.wav');
    static LOOSE = new Audio('./audio/sound/background/502896__bolkmar__future-city-ambience.wav');


    static allSounds = [SoundHub.BACKGROUND, SoundHub.BUTTON, SoundHub.NOISE, SoundHub.DEATH, SoundHub.COIN, SoundHub.SPRAY, SoundHub.WON, SoundHub.LOOSE];

    static cachedSound;

    static playOne(sound) {
        if (isSoundOn) {
            sound.volume = 0.1;
            SoundHub.BACKGROUND ? sound.volume = this.bgVolume : sound.volume = this.otherVolume;
            sound.currentTime = this.soundCurrentTime;
            sound.play();
            if (sound != SoundHub.BUTTON) this.cachedSound = sound;
        }
    }

    static playLoop(sound) {
        if (isSoundOn) {
            sound.loop = true;
            SoundHub.BACKGROUND ? sound.volume = this.bgVolume : sound.volume = this.otherVolume;
            sound.currentTime = this.soundCurrentTime;
            sound.play();
            if (sound != SoundHub.BUTTON) this.cachedSound = sound;
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