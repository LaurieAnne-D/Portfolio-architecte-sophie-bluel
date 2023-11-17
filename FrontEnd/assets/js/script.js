"use strict";

// ********** CONSTANTS ********** //

const body = document.querySelector("body");
const portfolioSection = document.getElementById("portfolio");
const portfolioHeader = document.querySelector("#portfolio header");
const galleryContainer = document.querySelector(".gallery");

// ********** VARIABLES ********** //
let projects = [];
let categories = [];

// ********** FUNCTIONS ********** //
async function fetchWorks() {
    const url = "http://localhost:5678/api/works"
    const response = await fetch(url);
    projects = await response.json();
}

// Creation de la gallery 
function addProjects(projects) {
    for (const project of projects) {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");


        figureElement.id = project.categoryId;
        figureElement.classList = "projects"
        imageElement.src = project.imageUrl;
        imageElement.alt = project.title;
        figcaptionElement.innerText = project.title;

        galleryContainer.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    };
}


// Parametrage des filtres 

function ObjectsFilter() {
    const projects = document.querySelectorAll(".projects");

    for (const project of projects) {
        if (project.id === "1") {
            project.classList.add("displayOptionY");
            project.classList.remove("displayOptionN");
        }
        else {
            project.classList.add("displayOptionN");
        }
    }
}

function ApptFilter() {
    const projects = document.querySelectorAll(".projects");

    for (const project of projects) {
        if (project.id === "2") {
            project.classList.add("displayOptionY");
            project.classList.remove("displayOptionN");
        }
        else {
            project.classList.add("displayOptionN");
        }
    }
}

function HotelAndResFilter() {
    const projects = document.querySelectorAll(".projects");

    for (const project of projects) {
        if (project.id === "3") {
            project.classList.add("displayOptionY");
            project.classList.remove("displayOptionN");
        }
        else {
            project.classList.add("displayOptionN");
        }
    }
}

function AllFilter() {
    const projects = document.querySelectorAll(".projects");

    for (const project of projects) {
        project.classList.add("displayOptionN");
        project.classList.remove("displayOptionN");
    }
}

// Parametrage des filtres 
function paramFilters() {
    const filtersElements = document.querySelectorAll(".filters li button");

    const allfilter = document.getElementById("all");
    const objectsFilter = document.getElementById("objects");
    const apartmentsFilter = document.getElementById("apartments");
    const hotelsRestauFilter = document.getElementById("hotels_Restau");


    for (const filter of filtersElements) {
        filter.classList.add("filters_btn");
    }

    allfilter.setAttribute("autofocus", "true");

    objectsFilter.addEventListener("click", ObjectsFilter);
    apartmentsFilter.addEventListener("click", ApptFilter);
    hotelsRestauFilter.addEventListener("click", HotelAndResFilter);
    allfilter.addEventListener("click", AllFilter);
}


// Creation de la page d'edition
function displayAdminPage() {
    addBanner();
    removeFilters();
    addEditElement();
    openModal();
    logoutParam();
}

/**
 * Function to add a banner element to the webpage.
 */
function addBanner() {
    const banner = document.createElement("div");
    const bannerElementContainer = document.createElement("a");
    const editContainer = document.createElement("figure");
    const editIcon = document.createElement("i");
    const bannerTxt = document.createElement("figcaption");


    banner.classList.add("banner");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");

    bannerTxt.innerText = "Mode édition";

    body.insertBefore(banner, body.firstChild);

    banner.appendChild(bannerElementContainer);
    bannerElementContainer.appendChild(editContainer);
    editContainer.appendChild(editIcon);
    editContainer.appendChild(bannerTxt);
}

function removeFilters() {
    const filtersElements = document.querySelectorAll(".filters");

    filtersElements.forEach((filter) => {
        filter.remove();
    })
}

/**
 * Adds a project editor to the DOM.
 */
function addEditElement() {
    const editContainer = document.createElement("a");
    const editIconContainer = document.createElement("figure");
    const editIcon = document.createElement("i");
    const editTxt = document.createElement("figcaption");



    editContainer.classList.add("edit-container");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");

    editTxt.innerText = "Modifier";

    portfolioHeader.appendChild(editContainer);
    editContainer.appendChild(editIconContainer);
    editIconContainer.appendChild(editIcon);
    editIconContainer.appendChild(editTxt);
}

/**
 * Opens a modal.
 */
function openModal() {
    const openElement = document.querySelector(".edit-container");

    openElement.addEventListener("click", addModalContent);
}

/**
 * Closes the modal when the close element is clicked.
 */
function closeModal() {
    const closeElement = document.querySelector(".fa-xmark");

    closeElement.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.remove();
    })
}

function previousModal() {
    const arrowElement = document.querySelector(".fa-arrow-left");

    arrowElement.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.remove();
        addModalContent();
    })
}

/**
 * Adds modal content to the DOM.
 */
function addModalContent() {
    const modal = document.createElement("aside");
    const modalContent = document.createElement("section");
    const IconContainer = document.createElement("figure");
    const closeIcon = document.createElement("i");
    const arrowIcon = document.createElement("i");
    const modalContentTitle = document.createElement("h3");

    modal.classList.add("modal");
    modalContent.classList.add("modal-content");
    IconContainer.classList.add("close-icon-ctn");
    closeIcon.classList.add("fa-solid", "fa-xmark");
    arrowIcon.classList.add("fa-solid", "fa-arrow-left");

    modal.id = "modal";
    modalContentTitle.innerText = "Galerie photo";


    portfolioSection.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalContentTitle);
    modalContent.appendChild(IconContainer);
    IconContainer.appendChild(closeIcon);
    IconContainer.appendChild(arrowIcon);

    addFirstModal(projects);
    closeModal();
}

/**
 * Adds the first modal to the page.
 */
function addFirstModal(projects) {
    const modalContent = document.querySelector(".modal-content");
    const arrowIcon = document.querySelector(".fa-arrow-left");

    const galleryContainer = document.createElement("div");
    const button = document.createElement("button");

    arrowIcon.classList.remove("fa-arrow-left");

    button.innerText = "Ajouter une photo";

    galleryContainer.classList.add("modal-gallery-ctn");
    button.classList.add("btn");

    for (const project of projects) {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");
        const trashIcon = document.createElement("i");

        figureElement.id = project.categoryId;
        figureElement.classList = "projects"
        imageElement.src = project.imageUrl;
        imageElement.alt = project.title;
        trashIcon.classList.add("fa-solid", "fa-trash-can");

        modalContent.appendChild(galleryContainer);
        galleryContainer.appendChild(figureElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(imageElement);
        figcaptionElement.appendChild(trashIcon);

        trashIcon.addEventListener("click",deletePhoto(project.id, figureElement));
    };

    button.addEventListener("click", () => {
        arrowIcon.classList.add("fa-arrow-left");
        galleryContainer.remove();
        button.remove();
        AddsecondModal();
    })

    modalContent.appendChild(button);
}

function AddsecondModal() {
    const modalContent = document.querySelector(".modal-content");
    const modalContentTitle = document.querySelector("h3");


    const form = document.createElement("form");
    const addProjectSection = document.createElement("div");
    const iconImage = document.createElement("i");
    const imgLabel = document.createElement("label");
    const imgInput = document.createElement("input");
    const addProjectstxt = document.createElement("p");
    const titleInput = document.createElement("input");
    const titleLabel = document.createElement("label");
    const categorieSelect = document.createElement("select");
    const categorieLabel = document.createElement("label");
    const submitInput = document.createElement("input");
    const line = document.createElement("hr");

    modalContentTitle.innerText = "Ajout photo";
    addProjectstxt.innerText = "jpg, jpeg, png : 4mo max";

    form.classList.add("add-project-form");
    addProjectSection.classList.add("add-project-sct");
    iconImage.classList.add("fa-regular", "fa-image");
    submitInput.classList.add("btn", "validated-btn");

    imgInput.type = "file";
    imgInput.id = "image";
    imgInput.accept = ".jpg, .jpeg, .png";
    imgLabel.textContent = "+ Ajouter photo";
    imgLabel.htmlFor = "image";
    titleInput.type = "text";
    titleInput.id = "title-input";
    titleLabel.textContent = "Titre";
    titleLabel.htmlFor = "title";

    categorieSelect.id = "category-input";
    categorieSelect.name = "category";
    categorieSelect.innerHTML = `<option value=""></option>
    <option value="1">Objets</option>
    <option value="2">Appartements</option>
    <option value="3">Hôtels & restaurants</option>`;
    categorieLabel.textContent = "Categorie";
    categorieLabel.htmlFor = "category-input";
    submitInput.type = "submit";
    submitInput.value = "Valider";


    modalContent.appendChild(addProjectSection);
    modalContent.appendChild(form);
    form.appendChild(addProjectSection);
    addProjectSection.appendChild(iconImage);
    addProjectSection.appendChild(imgLabel);
    addProjectSection.appendChild(imgInput);
    addProjectSection.appendChild(addProjectstxt);
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(categorieLabel);
    form.appendChild(categorieSelect);
    form.appendChild(line);
    form.appendChild(submitInput);

    previousModal();
    imgInput.addEventListener("change", uploadImagePreview);
    submitInput.addEventListener("click", postProject);

}

function uploadImagePreview() {
    const preview = document.querySelector(".add-project-sct")
    const input = document.querySelector("#image");
    const iconImage = document.querySelector(".fa-image");
    const previewLabel = document.querySelector(".add-project-sct label");
    const previewParag = document.querySelector(".add-project-sct p");

    const Files = input.files;

    previewLabel.remove();
    previewParag.remove();
    iconImage.remove();

    for (const file of Files) {
        const imgContainer = document.createElement("figure");
        const figcaption = document.createElement("figcaption");

        figcaption.textContent = `${file.name}`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);

        preview.appendChild(imgContainer);
        imgContainer.appendChild(image);
        imgContainer.appendChild(figcaption);
    }
}

function deletePhoto(id, img) {
    return async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await fetch("http://localhost:5678/api/works/" + id, {
                method: "DELETE",
                headers: {
                    accept: '*/*',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            img.remove();
            createGallery("gallery", null, await fetchWorks());
        }
        catch (error) {
            console.error("un pb est survenu au cours de la suppression de la photo:", error);
        }
    }
};


async function postProject(e) {
    e.preventDefault();
    const titleInput = document.getElementById("title-input");
    const categoryInput = document.getElementById("category-input");
    const fileField = document.getElementById("image");
    
    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("category", categoryInput.value);
    formData.append("image", fileField.files[0]);

    await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    })
        .then(res => {
            if (res.ok) {
                closeModal();
                createModal();
                addProjects(projects);
            }
        })
};


function logoutParam() {
    const banner = document.querySelector(".banner");
    const editElement = document.querySelector(".edit-container");
    const logElement = document.getElementById("loginElement");

    logElement.innerText = "logout";

    logElement.addEventListener("click", (event) => {

        localStorage.removeItem("token") && localStorage.removeItem("userId");

        logElement.innerText = "login";

        banner.remove();
        editElement.remove();

        alert("Vous êtes déconnecté");
    });
}


// ********** MAIN ********** //

fetchWorks()
    .then(() => {
        addProjects(projects);

        if (localStorage.getItem("token")) {
            displayAdminPage();
        }
    })

paramFilters();
