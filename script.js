
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
		resolve(img);
	}
    img.onerror = () => {
		reject(`Failed to load image: ${url}`);
	}
  });
}

async function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  try {
    const promises = images.map((img) =>{
		return downloadImage(img.url);
	});
    const results = await Promise.all(promises);
    results.forEach(img => output.appendChild(img));
  } catch (err) {
    errorDiv.textContent = err;
  } finally {
    loading.style.display = "none";
  }
}

btn.addEventListener("click", downloadImages);

