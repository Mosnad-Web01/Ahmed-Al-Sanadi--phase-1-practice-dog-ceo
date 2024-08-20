document.addEventListener("DOMContentLoaded", function () {
	const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
	const breedUrl = "https://dog.ceo/api/breeds/list/all";
	const breedsList = document.getElementById("dog-breeds");

	async function fetchDogImages() {
		try {
			const response = await fetch(imgUrl);
			const data = await response.json();
			if (data.status === "success") {
				renderDogImages(data.message);
			}
		} catch (error) {
			console.error("Error fetching dog images:", error);
		}
	}

	function renderDogImages(images) {
		const dogContainer = document.getElementById("dog-image-container");
		images.forEach((imgUrl) => {
			const img = document.createElement("img");
            img.classList.add('img');
			img.src = imgUrl;
			dogContainer.appendChild(img);
		});
	}

	async function fetchDogBreeds() {
		try {
			const response = await fetch(breedUrl);
			const data = await response.json();
			if (data.status === "success") {
				renderDogBreeds(data.message);
			}
		} catch (error) {
			console.error("Error fetching dog breeds:", error);
		}
	}

	function renderDogBreeds(breeds) {
		for (const breed in breeds) {
			const li = document.createElement("li");
			li.innerText = breed;
			breedsList.appendChild(li);

			if (breeds[breed].length > 0) {
				breeds[breed].forEach((subBreed) => {
					const subLi = document.createElement("li");
					subLi.innerText = `${subBreed} ${breed}`;
					subLi.style.marginLeft = "20px";
					breedsList.appendChild(subLi);
				});
			}
		}
	}

	fetchDogImages();
	fetchDogBreeds();

	breedsList.addEventListener("click", function (event) {
		if (event.target.tagName === "LI") {
			event.target.style.color = "firebrick";
		}
	});

	const dropdown = document.getElementById("breed-dropdown");
	dropdown.addEventListener("change", function (event) {
		const selectedLetter = event.target.value;
		const allBreeds = breedsList.querySelectorAll("li");

		allBreeds.forEach((breed) => {
			if (breed.innerText.startsWith(selectedLetter)) {
				breed.style.display = "list-item";
			} else {
				breed.style.display = "none";
			}
		});
	});
});
