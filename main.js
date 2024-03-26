const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const likesArray = [];


// - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
const containerPost = document.querySelector('#container');
posts.forEach((singlePost) => {
    const postTemplate = generateSinglePostTemplate(singlePost);
    containerPost.innerHTML += postTemplate;
});

// - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

const handleClickLike = document.querySelectorAll('.js-like-button');
const allCounters = document.querySelectorAll('.js-likes-counter');
handleClickLike.forEach((singleLikeButton, index) => {
    singleLikeButton.addEventListener('click', function(event) {
        event.preventDefault();
        const relatedCounter = allCounters[index];
        const relatedCounterNumber = parseInt(relatedCounter.innerHTML);
        if(!this.classList.contains('like-button--liked')) {
            // Aggiungere classe like-button--liked sull'elemento su cui ho cliccato
            this.classList.add('like-button--liked');
            // Mi prendo il counter relativo e incrementare il numero di 1
            relatedCounter.innerHTML = relatedCounterNumber + 1;

            // Prendo l'id del post su cui ho cliccato
            // e lo aggiungo all'array dei like
            const thisPostId = parseInt(this.dataset.postid);
            likesArray.push(thisPostId);
        } else {
            this.classList.remove('like-button--liked');
            relatedCounter.innerHTML = relatedCounterNumber - 1;
        }
    });
});


// FUNCTIONS
function generateSinglePostTemplate (post) {
    const {id, content, media, author, likes, created} = post;

    // 1. Formattare le date in formato italiano (gg/mm/aaaa)
    const formattedDate = new Date(created).toLocaleDateString('it-IT');    

    const authorImageTemplate = generateAuthorImageTemplate(author);

    const postTemplate = `
        <div class="post">
                <div class="post__header">
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            ${authorImageTemplate}                    
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${author.name}</div>
                            <div class="post-meta__time">${formattedDate}</div>
                        </div>                    
                    </div>
                </div>
                <div class="post__text">${content}</div>
                <div class="post__image">
                    <img src="${media}" alt="${author.name}">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button  js-like-button" href="" data-postid="${id}">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                        </div>
                    </div> 
                </div>            
            </div>
    `
    return postTemplate;
};
// Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// author -> oggetto contenente le info dell'autore
// return: stringa che rappresenta il markup dell'immagine profilo da stampare
function generateAuthorImageTemplate (author) {
    // capire se l'immagine c'è oppure se è null
    // se c'è stampo il template: <img class="profile-pic" src="${author.image}" alt="${author.name}">
    // se è null stampo: <span class="profile-pic-default">AA</span>
    let imageTemplate;
    if(author.image) {
        imageTemplate = `<img class="profile-pic" src="${author.image}" alt="${author.name}">`
    } else {
        const authorNameArray = author.name.split(' ');
        const [name, lastname] = authorNameArray;
        imageTemplate = `
        <div class="profile-pic-default">
            <span>${name[0]}${lastname[0]}</span>
        </div>`;
    }
    return imageTemplate;
};