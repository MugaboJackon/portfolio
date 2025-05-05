let stories = JSON.parse(localStorage.getItem("stories")) || [];
const storyForm = document.getElementById("storyForm");
const storiesContainer = document.getElementById("stories");

function renderStories() {
  storiesContainer.innerHTML = '';
  stories.forEach((story, index) => {
    const storyDiv = document.createElement("div");
    storyDiv.className = "post";

    storyDiv.innerHTML = `
      <h3>${story.title}</h3>
      <p>${story.description}</p>
      ${story.image ? `<img src="${story.image}" alt="Story Image">` : ""}
      <div class="actions">
        <button onclick="editStory(${index})">✏️ Edit</button>
        <button onclick="deleteStory(${index})">🗑️ Delete</button>
      </div>
    `;

    storiesContainer.appendChild(storyDiv);
  });
}

storyForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imageInput = document.getElementById("imageUpload");
  const reader = new FileReader();

  if (imageInput.files[0]) {
    reader.onload = function() {
      stories.push({ title, description, image: reader.result });
      saveStories();
      storyForm.reset();
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    stories.push({ title, description, image: null });
    saveStories();
    storyForm.reset();
  }
});

function saveStories() {
  localStorage.setItem("stories", JSON.stringify(stories));
  renderStories();
}

function deleteStory(index) {
  if (confirm("Are you sure you want to delete this story?")) {
    stories.splice(index, 1);
    saveStories();
  }
}

function editStory(index) {
  const story = stories[index];
  const newTitle = prompt("Edit title:", story.title);
  const newDescription = prompt("Edit description:", story.description);

  if (newTitle !== null && newDescription !== null) {
    story.title = newTitle;
    story.description = newDescription;
    saveStories();
  }
}

renderStories();
