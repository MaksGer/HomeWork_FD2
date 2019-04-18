(function() {  //Всю эту констркуцию оборачиваем в самовызывающуюся функцию,
    // пробовал через сообытие DOMContentLoaded но не работало. Потом еще попробую варианты

// Создаем экземпляр плеера согласно документации
let AudioPlayer = ya.music.Audio;
AudioPlayer.config.flash.path = "../../dist";

// Выборки элементов из дом. Володя, назвал не target, потому что далее по коду
// легко ломается голова в таком случае. А dom из документации и всегда понятно что это)
let dom = {
    player: document.querySelector(".player"),

    play: document.querySelector(".controls_play"),

    progress: {
        bar: document.querySelector(".progress"),
        loaded: document.querySelector(".progress_loaded"),
        current: document.querySelector(".progress_current")
    },

    volume: {
        bar: document.querySelector(".volume"),
        value: document.querySelector(".volume_bar")
    },
//Overlay нужен согласно API на случай если браузер не поддерживает html5, должен быть построен Flash player,
    // не проверял, но пока решил оставить тут и далее по коду
    overlay: document.querySelector(".overlay")
};
// Первый аргумент отвечает за то что использовать html5 или flash
// при значении null определяется автоматически в пользу html5
let audioPlayer = new AudioPlayer(null, dom.overlay);

audioPlayer.initPromise().then(function() {
    // Скрываем оверлей, кнопки управления становятся доступными.
    dom.overlay.classList.add("overlay_hidden");
}, function(err) {
    // Показываем ошибку инициализации в оверлее.
    dom.overlay.innerHTML = err.message;
    dom.overlay.classList.add("overlay_error");
});

audioPlayer.on(ya.music.Audio.EVENT_STATE, function(state) {
    if (state === ya.music.Audio.STATE_PLAYING) {
        dom.player.classList.add("player_playing");
    } else {
        dom.player.classList.remove("player_playing");
    }
});

// Теперь настроим обновление прогресс-бара. В нем предусмотрены
// 2 шкалы - шкала загрузки и шкала текущей позиции воспроизведения.
audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, function(timings) {
    dom.progress.loaded.style.width = (timings.loaded / timings.duration * 100).toFixed(2) + "%";
    dom.progress.current.style.width = (timings.position / timings.duration * 100).toFixed(2) + "%";
});
// Аналогично будет работать шкала громкости
let updateVolume = function(volume) {
    dom.volume.value.style.height = (volume * 100).toFixed(2) + "%";
};
audioPlayer.on(ya.music.Audio.EVENT_VOLUME, updateVolume);

// Отображаем начальную громкость
audioPlayer.initPromise().then(function() {
    updateVolume(audioPlayer.getVolume());
});



// Пока так в дальнейшем здесь допишу функцию
let trackUrls = [
    "song1.mp3",
    "song2.mp3",
    "song3.mp3"
];


// Теперь нужно настроить взаимодействие с пользователем. Начнем с запуска воспроизведения.
let trackIndex = 0;
let startPlay = function() {
    let track = trackUrls[trackIndex];
    if (audioPlayer.isPreloaded(track)) {
        audioPlayer.playPreloaded(track);
    } else {
        audioPlayer.play(track);
    }
};

dom.play.addEventListener("click", function() {
    let state = audioPlayer.getState();

    switch (state) {
        case ya.music.Audio.STATE_PLAYING:
            audioPlayer.pause();
            break;

        case ya.music.Audio.STATE_PAUSED:
            audioPlayer.resume();
            break;

        default:
            startPlay();
            break;
    }
});

// Добавим немножко удобства для пользователей: сделаем автозагрузку
// следующего трека после того, как текущий загрузился.
// Для этого потребуется немного изменить функцию `startPlay` и отслеживать момент загрузки трека.

audioPlayer.on(ya.music.Audio.EVENT_ENDED, function() {
    trackIndex++;

    if (trackIndex < trackUrls.length) {
        startPlay();
    }
});

audioPlayer.on(ya.music.Audio.EVENT_LOADED, function() {
    if (trackIndex + 1 < trackUrls.length) {
        audioPlayer.preload(trackUrls[trackIndex + 1]);
    }
});

// Осталось только настроить навигацию по треку и регулирование громкости:
let offsetLeft = function(node) {
    let offset = node.offsetLeft;
    if (node.offsetParent) {
        offset += offsetLeft(node.offsetParent);
    }
    return offset;
};

let offsetTop = function(node) {
    let offset = node.offsetTop;
    if (node.offsetParent) {
        offset += offsetTop(node.offsetParent);
    }
    return offset;
};

    dom.progress.bar.addEventListener("click", function(evt) {
        let fullWidth = dom.progress.bar.offsetWidth;
        let offset = offsetLeft(dom.progress.bar);

        let relativePosition = Math.max(0, Math.min(1, ((evt.pageX || evt.screenX) - offset) / fullWidth));
        let duration = audioPlayer.getDuration();

        audioPlayer.setPosition(duration * relativePosition);
    });

    dom.volume.bar.addEventListener("click", function(evt) {
        let fullHeight = dom.volume.bar.offsetHeight;
        let offset = offsetTop(dom.volume.bar);

        // тут мы делаем "1 -" т.к. громость принято отмерять снизу, а не сверху
        let volume = 1 - Math.max(0, Math.min(1, ((evt.pageY || evt.screenY) - offset) / fullHeight));
        audioPlayer.setVolume(volume);
    });
})();