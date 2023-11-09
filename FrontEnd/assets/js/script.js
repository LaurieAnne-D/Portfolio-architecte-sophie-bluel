"use strict";

// ********** CONSTANTS ********** //
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
function addAllFilter() {
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

function removeProjects1() {
    const projectsDip = document.querySelectorAll(".projects")
    console.log(projectsDip)

    for (const projectDip of projectsDip) {
        switch (projectDip.id) {
            case "1":
                projectDip.classList.add("displayOptionY");
                projectDip.classList.remove("displayOptionN");
                break;

            case "2":
                projectDip.classList.add("displayOptionN");
                break

            case "3":
                projectDip.classList.add("displayOptionN");
                break
        }
    }
}

function removeProjects2() {
    const projectsDip = document.querySelectorAll(".projects")
    console.log(projectsDip)

    for (const projectDip of projectsDip) {
        switch (projectDip.id) {
            case "1":
                projectDip.classList.add("displayOptionN");
                break

            case "2":
                projectDip.classList.add("displayOptionY");
                projectDip.classList.remove("displayOptionN");
                break

            case "3":
                projectDip.classList.add("displayOptionN");
                break
        }
    }
}

function removeProjects3() {
    const projectsDip = document.querySelectorAll(".projects")
    console.log(projectsDip)

    for (const projectDip of projectsDip) {
        switch (projectDip.id) {
            case "1":
                projectDip.classList.add("displayOptionN");
                break

            case "2":
                projectDip.classList.add("displayOptionN");
                break

            case "3":
                projectDip.classList.add("displayOptionY");
                projectDip.classList.remove("displayOptionN");
                break
        }
    }
}

function paramAllFilters() {
    const projectsDip = document.querySelectorAll(".projects")
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


    objectsFilter.addEventListener("click", removeProjects1);

    apartmentsFilter.addEventListener("click", removeProjects2);

    hotelsRestauFilter.addEventListener("click", removeProjects3);

    allfilters.addEventListener("click", paramAllFilters);

}



// ********** MAIN ********** //
portfolioContainer.appendChild(filtersContainer);

fetchWorks()
    .then(() => {
        addProjects(projects);
    })

fetchCategories()
    .then(() => {
        addAllFilter();
        addFilters(categories);
        addFiltersClass();
        paramFilters();
    })
