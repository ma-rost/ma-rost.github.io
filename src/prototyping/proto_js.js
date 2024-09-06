const json = `../assets/Projects.json`;

getData();


async function getData() {
	console.log("running...");
	const url = "../assets/Projects.json";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
		console.log("complete");
		MakeHTML(json)

	}
	catch (error) {
		console.error(error.message);
	}
}


function GetProjectTitle(project) {
	var projectTitle = `<h2 class="pr-title border-bottom border-secondary">${project.name}</h2>`;

	return projectTitle;
}

function GetProjectTags(project) {
	var projectTags = "";

	const tagContent = [
		`<i class="fa-${project.tags.pf_type} fa-${project.tags.pf_icon} me-2"></i> ${project.tags.platform}`,
		`<i class="fa-solid fa-users me-2"></i> ${project.tags.team_size}`,
		`<i class="fa-solid fa-clock me-2"></i> ${project.tags.dev_time}`,
		`<i class="fa-solid fa-calendar-days me-2"></i> ${project.tags.dev_year}`,
	];

	var text = "";
	for (tag of tagContent) {
		text = `<li class="me-2 mt-2">
                <div class="d-flex align-items-center rounded-pill bg-primary-50 px-3 py-1">${tag}</div>
            	</li>`;
		projectTags += text;
	}

	return projectTags;
}

function GetProjectNotes(project) {
	var projectNotes = "";
	for (notes of project.notes) {
		if (notes[0] == ">") {
			projectNotes += `<ul><li class="proj-note-row">${notes.slice(2, notes.length,)}</li></ul>`;
		}
		else {
			projectNotes += `<li class="proj-note-row">${notes}</li>`;
		}
	}
	return projectNotes;
}

function GetProjectCarousel(project) {
	var projectCarousel = "";

	// if first, make active

	var counter = 0;
	for (imgs of project.images) {
		projectCarousel += `<div class="carousel-item${counter == 0 ? ' active' : ''}">
        <img src="${imgs.link}" class="d-block" alt="${imgs.alt}" />
    	</div>`;

		counter++;
	}
	return projectCarousel;
}

function GetGameLink(project) {
	console.log((project.prj_link != "null") + " " + (project.has_webpage == true));

	return (project.prj_link == "null" || project.has_webpage == false) ? `` : `
    <div class="pr-playbtn">
        <a class="btn bg-secondary-30 w-100" href="${project.prj_link}" role="button">Play Now</a>
    </div>`;
}

function MakeHTML(projects) {
	var dataContainer = document.querySelector(".portfolio-gallery");

	for (project of projects) {
		var projectID = "portfolio-" + project.id;
		var projectCarouselID = projectID + "-Carousel";

		var projectHtml = `
<div id="${projectID}" class="portfolio-block container rounded bg-secondary-10 p-3 mt-2">
    <div class="grid pr-grid">
        <div class="gr-12 gr-lg-8 order-lg-1">
            <h2 class="pr-title border-bottom border-secondary">${project.title}</h2>
            <div class="pr-tags">
                <ul class="d-flex flex-row flex-wrap li-none">
                    ${GetProjectTags(project)}
                </ul>
            </div>
        </div>
        <div class="gr-12 gr-lg-4 gr-2r order-lg-0">
            <div id="${projectCarouselID}"
                class="carousel slide pointer-event bg-secondary-subtle-50 aspect-carousel">
                <div class="carousel-inner">
                    ${GetProjectCarousel(project)}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${projectCarouselID}"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${projectCarouselID}"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <p class="pr-desc">${project.desc}</p>
        </div>
        <div class="gr-12 gr-lg-8 order-lg-2 d-flex flex-column grid-obj">
            <ul class="pr-notes flex-grow-1">
            ${GetProjectNotes(project)}
            </ul>
            ${GetGameLink(project)}
        </div>
    </div>
</div>
`
		dataContainer.insertAdjacentHTML("beforeend", projectHtml);
		console.log("finished " + project.title);

	}
}