"use strict";

// ********** CONSTANTS ********** //
const body = document.querySelector("body");
const portfolioSection = document.getElementById("portfolio");
const portfolioContainer = document.querySelector(".direction");
const galleryContainer = document.querySelector(".gallery");
const filtersContainer = document.createElement("ul");


const projectId = document.getElementById("1");

// ********** VARIABLES ********** //
let projects = [];
let categories = [];

// ********** FUNCTIONS ********** //
async function fetchWorks() {
    const url = "http://localhost:5678/api/works"
    const response = await fetch(url);
    projects = await response.json();
}

async function fetchCategories() {
    const urlCt = "http://localhost:5678/api/categories"
    const resp = await fetch(urlCt);
    categories = await resp.json();
}

// Creation de la gallery 
function addProjects(projects) {
    for (const project of projects) {
        const figureElement = document.createElement("figure");
        figureElement.id = project.categoryId;
        figureElement.classList = "projects"

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        imageElement.alt = project.title;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;

        galleryContainer.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    };
}


// Creation des filtres 
function addFilterAll() {
    const filterAllContnair = document.createElement("li")
    const filterAllElement = document.createElement("button");
    filterAllElement.innerText = "Tous";
    filterAllElement.classList.add("filters");
    filterAllElement.id = "all";
    filterAllElement.setAttribute("autofocus", "true");

    filterAllContnair.appendChild(filterAllElement);
    filtersContainer.appendChild(filterAllContnair);
}

function addFilters(categories) {

    for (const category of categories) {
        const liElement = document.createElement("li");

        const filterElement = document.createElement("button");
        filterElement.innerText = category.name;
        filterElement.classList = "filters";
        filterElement.id = category.id;

        filtersContainer.appendChild(liElement);
        filtersContainer.appendChild(filterElement);
    }
}

function addFiltersClass() {
    const filters = document.querySelectorAll(".filters");

    for (const filter of filters) {
        switch (filter.id) {
            case "1":
                filter.classList.add("objects");
                break
            case "2":
                filter.classList.add("apartments");
                break
            case "3":
                filter.classList.add("hotels_Restau");
                break

            case "all":
                filter.classList.add("allfilters");
                break
        }
    }
}

function ObjectsFilter() {
    const projectsDip = document.querySelectorAll(".projects");

    for (const projectDip of projectsDip) {
        if (projectDip.id === "1") {
            projectDip.classList.add("displayOptionY");
            projectDip.classList.remove("displayOptionN");
        }
        else {
            projectDip.classList.add("displayOptionN");
        }
    }
}

function ApptFilter() {
    const projectsDip = document.querySelectorAll(".projects");

    for (const projectDip of projectsDip) {
        if (projectDip.id === "2") {
            projectDip.classList.add("displayOptionY");
            projectDip.classList.remove("displayOptionN");
        }
        else {
            projectDip.classList.add("displayOptionN");
        }
    }
}

function HotelAndResFilter() {
    const projectsDip = document.querySelectorAll(".projects");

    for (const projectDip of projectsDip) {
        if (projectDip.id === "3") {
            projectDip.classList.add("displayOptionY");
            projectDip.classList.remove("displayOptionN");
        }
        else {
            projectDip.classList.add("displayOptionN");
        }
    }
}

function paramAllFilter() {
    const projectsDip = document.querySelectorAll(".projects");
    for (const projectDip of projectsDip) {
        projectDip.classList.add("displayOptionN");
        projectDip.classList.remove("displayOptionN");
    }
}

// Parametrage des filtres 
function paramFilters() {
    const objectsFilter = document.querySelector(".objects");
    const apartmentsFilter = document.querySelector(".apartments");
    const hotelsRestauFilter = document.querySelector(".hotels_Restau");
    const allfilters = document.querySelector(".allfilters");


    objectsFilter.addEventListener("click", ObjectsFilter);

    apartmentsFilter.addEventListener("click", ApptFilter);

    hotelsRestauFilter.addEventListener("click", HotelAndResFilter);

    allfilters.addEventListener("click", paramAllFilter);

}


// Creation de la page d'edition
function displaymodalContent() {
    logElementParam();
    addProjectEdit();
    addBanner();
    addmodalContent();
        
}

function addBanner() {
    const banner = document.createElement("div");
    banner.classList.add("banner");

    const bannerElementContainer = document.createElement("a");

    const editContainer = document.createElement("figure");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");

    const bannerTxt = document.createElement("figcaption");
    bannerTxt.innerText = "Mode édition";

    body.insertBefore(banner, body.firstChild);
    banner.appendChild(bannerElementContainer);
    bannerElementContainer.appendChild(editContainer);

    editContainer.appendChild(editIcon);
    editContainer.appendChild(bannerTxt);
}

function addProjectEdit() {
    const editContainer = document.createElement("a");
    editContainer.classList.add("edit-container");
    
    const editIconContainer = document.createElement("figure");

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");

    const editTxt = document.createElement("figcaption");
    editTxt.innerText = "Modifier";

    portfolioSection.insertBefore(editContainer, portfolioContainer);
    editContainer.appendChild(editIconContainer);
    editIconContainer.appendChild(editIcon);
    editIconContainer.appendChild(editTxt);
}
    
function logElementParam() {
    const authElt = document.querySelector('[href="login.html"]');
    authElt.innerText = "logout";
    authElt.setAttribute("href", "#");
    authElt.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("token") && localStorage.removeItem("userId");
        authElt.innerText = "login";
        authElt.setAttribute("href", "login.html");
        bodyBanner.remove();
        editBanner.remove();
        publishChanges.remove();
        editImg.remove();
        editArticle.remove();
        editGallery.remove();
        alert("Vous êtes déconnecté");
    });

}

// Creation de la modalContent
function addmodalContent() {
    const bodyHeader = document.querySelector("header");
    const modal = document.createElement("aside");
    modal.classList.add("modal");
    modal.id = "modal";

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    
    const modalContentTitle = document.createElement("h2");
    modalContentTitle.innerText = "Galerie photo";

    body.insertBefore(modal, bodyHeader);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalContentTitle);

}


// ********** MAIN ********** //
portfolioContainer.appendChild(filtersContainer);

fetchWorks()
    .then(() => {
        addProjects(projects);

        if (localStorage.getItem("token")) {
            displaymodalContent();
        }
    })

fetchCategories()
    .then(() => {
        addFilterAll();
        addFilters(categories);
        addFiltersClass();
        paramFilters();
    })
