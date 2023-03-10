const loadPhone = async (phone, dataLimit) => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
	const res = await fetch(url);
	const data = await res.json();
	displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
	const phonesContainer = document.getElementById("phones-container");
	phonesContainer.innerHTML = "";

	const showBtn = document.getElementById("show-all-btn");
	if (dataLimit && phones.length > 10) {
		// Display 20 Phones Only
		phones = phones.slice(0, 12);
		showBtn.classList.remove("d-none");
	} else {
		showBtn.classList.add("d-none");
	}

	//Display no Phone
	const noPhone = document.getElementById("text-warning");
	if (phones.length == 0) {
		noPhone.classList.remove("d-none");
	} else {
		noPhone.classList.add("d-none");
	}

	// Display Phone
	phones.forEach((phone) => {
		const phoneCard = document.createElement("div");
		phoneCard.classList.add("col");
		phoneCard.innerHTML = `
        <div class="card h-100 p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional
                content. This content is a little bit longer.</p>
				  <button href="#" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showPhoneDetails">Show Details</button>
            </div>
        </div>
        `;
		phonesContainer.appendChild(phoneCard);
	});
	toggleSpinner(false);
};

const searchPhone = () => {
	searchProcess(10);
};

document.getElementById("input-phone").addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		searchProcess(10);
	}
});

const toggleSpinner = (isLoading) => {
	const loaderSection = document.getElementById("loader");
	if (isLoading) {
		loaderSection.classList.remove("d-none");
	} else {
		loaderSection.classList.add("d-none");
	}
};

const showAllPhone = () => {
	searchProcess();
};

const searchProcess = (dataLimit) => {
	toggleSpinner(true);
	const search = document.getElementById("input-phone").value;
	loadPhone(search, dataLimit);
};

const loadPhoneDetails = async (id) => {
	const url = `https://openapi.programming-hero.com/api/phone/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);

	const title = document.getElementById("showPhoneDetailsLabel");
	title.innerText = `${data.data.slug}`;
	const bodyContainer = document.getElementById("modal-body");
	const body = document.createElement("div");
	body.innerHTML = `
	<img src="${data.data.image}" class="img-fluid text-center" alt="...">
	<h5 class="mt-3">About Phone:</h5>
	<p>Brand: ${data.data.brand}</p>
	<p>Release Date: ${
		data.data.releaseDate ? data.data.releaseDate : "No release date found"
	}</p>
	<h5>Main Features:</h5>
	<p>Storage: ${
		data.data.mainFeatures.storage
			? data.data.mainFeatures.storage
			: "No info found"
	}</p>
	<p>Memory: ${
		data.data.mainFeatures.memory
			? data.data.mainFeatures.memory
			: "No info found"
	}</p>
	<p>Display Size: ${
		data.data.mainFeatures.displaySize
			? data.data.mainFeatures.displaySize
			: "No info found"
	}</p>
	`;
	bodyContainer.appendChild(body);
};
