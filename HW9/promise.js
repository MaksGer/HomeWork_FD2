//Функция построенная на промисе и Youtube API, которая позволяет обратиться за получением 
//видео с ютуба для отображения в своем проекте. В первом блоке мы обращаемся за базой по
//интересующим нас ключам. После формируем карточку видео и выводим на страницу. Рабочая 
//ссылка на полную страницу на почте 


function load() {
    gapi.client.init({
        'apiKey': 'AIzaSyBPy_yHQWId__eX0XcB9geCuv5BKf1d_SQ',
        "discoveryDocs": ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(function() {
        return gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": '13',
            "playlistId": "PL3LQJkGQtzc56HquxrkwPdQt9Q1wHm21P"
        });
    }).then(function(response) {
        console.log(response.result);
        
        response.result.items.forEach(item => {
            let card = document.createElement('a');
         card.classList.add('videos__item', 'videos__item-active');
         card.setAttribute('data-url', item.contentDetails.videoId);
         card.innerHTML = `<img src = "${item.snippet.thumbnails.high.url}" alt = "thumb">
             <div class="videos__item-descr">
                 ${item.snippet.title} 
             </div> 
             <div class="videos__item-views">
                 2,7 тыс просмотров 
             </div>
         `;
         videosWrapper.appendChild(card);
         setTimeout (() => {
             card.classList.remove('videos__item-active')
         }, 10);
         if (night === true) {
             card.querySelector('.videos__item-descr').style.color = "#fff";
             card.querySelector('.videos__item-views').style.color = "#fff";
         }
        });
        sliceTitle('.videos__item-descr', 100);
        bindModal(document.querySelectorAll('.videos__item'));


        }).catch( e => {
        console.log(e);
    });
}


//Промис нужен для создания асинхронности кода, чтобы выполнить вторую часть кода только
//после выполнения первой части. Имеет три состояния pending (ожидание), resolved (выполнен) 
//и rejected(ошибка). Главной особенность промиса является то, что перейдя из первого состояния
// он уже не может изменить свой статус.