document.addEventListener('DOMContentLoaded', () => {
    const albums = [
        { author: 'Bad Bunny', name: 'NSLQVAPM', price: '$7.99' },
        { author: 'Eladio Carrion', name: '3MEN2 KBRON', price: '$9.99' },
        { author: 'Travis Scott', name: 'Utopia', price: '$17.99' },
        { author: 'Aron Piper', name: 'En tus sueños', price: '$9.99' },
        { author: 'Feid', name: 'No le temas a la oscuridad', price: '$10.99' },
        { author: 'Mora', name: 'Estrella', price: '$5.99' },
        { author: 'Metro Boomin', name: 'Heroes & Villains', price: '$59.99' },
        { author: 'Tainy', name: 'Data', price: '$19.99' },
    ];

    const wrapper = document.getElementById('wrapper');

    albums.forEach(album => {
        const ruta = album.author.replace(/\s+/g, '') + '_' + album.name.replace(/\s+/g, '');

        const card = document.createElement('div');
        card.className = 'albumCard';
        card.innerHTML = `
            <div class="container">
                <div class="front" style="background-image: url(/music-shop-php/uploads/new/${ruta}.jpg)"></div>
                <div class="back">
                    <div class="inner">
                        <span>${album.author}</span>
                        <span>-</span>
                        <span>${album.name}</span>
                        <span>${album.price}</span>
                        <button id='buy'>
                            <span>Buy</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(card);
    });
});