const loadPhone = async () => {
	const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
	const res = await fetch(url);
	const data = await res.json();
	displayPhone(data.data);
};

const displayPhone = (phones) => {
	const phonesContainer = document.getElementById("phones-container");

	phones.forEach((phone) => {
		console.log(phone);
		const phoneCard = document.createElement("div");
		phoneCard.classList.add("col");
		phoneCard.innerHTML = `
        <div class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional
                content. This content is a little bit longer.</p>
        </div>
        </div>
        `;
		phonesContainer.appendChild(phoneCard);
	});
};

loadPhone();