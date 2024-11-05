import projets from "../data/projets.json";

console.log(projets);

const generateModaleContent = (projet) => {
    const holder = document.querySelector('.modale-holder');
    const contenuHolder = document.querySelector('.modale-contenu');
    const closeBtn = document.querySelector('[data-modal-close]');
    const header = holder.querySelector('header');
    const title = document.createElement('h2');
    const img = document.createElement('img');
    const infosHolder = document.createElement('div');
    const typeStackHolder = document.createElement('div');
    const typeProjHolder = document.createElement('ul');
    const stackHolder = document.createElement('ul');
    const typeP = document.createElement('li');
    const date = document.createElement('span');
    const descriptionHolder = document.createElement('p');
    const liensHolder = document.createElement('ul');

    if (header.querySelector('h2')) {
        header.querySelector('h2').remove();
    }

    typeStackHolder.classList.add('flex', 'justify-between');
    liensHolder.classList.add('flex', 'gap-10');
    typeProjHolder.classList.add('list-vertical');
    stackHolder.classList.add('list-vertical');
    closeBtn.classList.add('material-symbols-outlined');

    title.textContent = projet.title;
    contenuHolder.textContent = '';
    closeBtn.textContent = 'close';
    img.src = projet.img;
    img.alt = projet.imgAlt;
    typeP.textContent = projet.type;
    descriptionHolder.textContent = projet.description;
    date.textContent = projet.date;

    const projetLiens = projet.liens;
    for (let lien in projetLiens) {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        const iElement = document.createElement('i');
        aElement.textContent = "Voir sur " + lien.toUpperCase();
        aElement.href = projetLiens[lien];
        iElement.innerHTML = "arrow_forward";
        iElement.classList.add('material-symbols-outlined', + lien);
        liElement.classList.add('button--material-outlined');
        aElement.appendChild(iElement);
        liElement.appendChild(aElement);
        liensHolder.appendChild(liElement);
    }

    const stackItems = projet.stack;
    stackItems.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = item;
        stackHolder.appendChild(liElement);
    });

    const typeItems = projet.type;
    typeItems.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = item;
        typeProjHolder.appendChild(liElement);
    });

    holder.classList.remove('hidden');
    closeBtn.addEventListener('click', () => {
        holder.classList.add('hidden');
    });

    header.prepend(title);
    contenuHolder.appendChild(img);
    typeStackHolder.appendChild(typeProjHolder);
    typeStackHolder.appendChild(stackHolder);
    infosHolder.appendChild(date);
    infosHolder.appendChild(descriptionHolder);
    infosHolder.appendChild(typeStackHolder);
    infosHolder.appendChild(liensHolder);
    contenuHolder.appendChild(infosHolder);
};

const generateProjectsLists = () => {
    const holder = document.querySelector('.projets-holder');

    projets.forEach(projet => {
        const cardHolder = document.createElement('div');
        if (projet.gridArea) {
            cardHolder.classList.add('tuile-' + projet.gridArea);
        }

        const header = document.createElement('header');
        const title = document.createElement('h2');
        const img = document.createElement('img');
        const cardBtn = document.createElement('button');

        title.textContent = projet.title;
        img.src = projet.img;
        img.alt = projet.imgAlt;
        cardBtn.textContent = 'En savoir plus';
        cardBtn.setAttribute('aria-label', `${cardBtn.textContent} - ${projet.title}`);
        cardBtn.addEventListener('click', () => {
            generateModaleContent(projet);
        });

        header.appendChild(title);
        cardHolder.appendChild(header);
        cardHolder.appendChild(img);
        cardHolder.appendChild(cardBtn);

        holder.appendChild(cardHolder);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateProjectsLists()
});
