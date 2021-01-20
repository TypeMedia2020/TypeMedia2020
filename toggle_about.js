const about_text = document.getElementById("about");
const about_button = document.getElementById("about-button");

about_button.addEventListener("click", () => {
	about_text.classList.toggle("active");
})