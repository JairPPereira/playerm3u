document.addEventListener('DOMContentLoaded', function () {
    const playlistElement = document.getElementById('playlist');
    const videoPlayer = document.getElementById('video');

    // Substitua 'SUA_URL_M3U' pelo endereço da sua lista M3U
    const m3uUrl = 'https://tinyurl.com/jppfilmes';

    fetch(m3uUrl)
        .then(response => response.text())
        .then(data => parseM3U(data));

    function parseM3U(m3uData) {
        const lines = m3uData.split('\n');
        const playlistItems = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#EXTINF')) {
                const title = line.split(',')[1].trim();
                const url = lines[i + 1].trim();
                
                // Adicione a linha abaixo para obter a URL da imagem associada
                const imageUrl = lines[i + 2].trim(); 

                playlistItems.push({ title, url, imageUrl });
            }
        }

        displayPlaylist(playlistItems);
    }

    function displayPlaylist(playlistItems) {
        const ul = document.createElement('ul');

        playlistItems.forEach(item => {
            const li = document.createElement('li');

            // Adicione a linha abaixo para incluir uma imagem
            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.title;
            li.appendChild(img);

            // Adicione o título como texto
            const titleText = document.createElement('span');
            titleText.textContent = item.title;
            li.appendChild(titleText);

            li.addEventListener('click', function () {
                videoPlayer.src = item.url;
                videoPlayer.play();
            });

            ul.appendChild(li);
        });

        playlistElement.appendChild(ul);
    }
});
