document.addEventListener("DOMContentLoaded", function () {
  // Reference to HTML elements
  const searchForm = document.querySelector("#keyword-search");
  const keywordInput = document.querySelector("#keyword");
  const poemContainer = document.querySelector("#poem-container");

  // Check if elements exist to prevent errors
  if (!searchForm || !keywordInput || !poemContainer) {
    console.error("Required HTML elements not found");
    return;
  }

  // Event listener for form submission
  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const keyword = keywordInput.value.trim();

    if (keyword) {
      poemContainer.innerHTML = `<p>Generating poem...</p>`;

      try {
        const poemText = await getPoem(keyword);
        const formattedPoem = formatPoem(poemText);
        poemContainer.innerHTML = formattedPoem;
        console.log("Poem displayed:", formattedPoem);
      } catch (error) {
        poemContainer.innerHTML = `<p class="error">Sorry, couldn't generate a poem: ${error.message}</p>`;
        console.error("Error generating poem:", error);
      }
    } else {
      poemContainer.innerHTML = `<p class="error">Please enter a keyword.</p>`;
    }
  });

  // Function to get poem from API
  async function getPoem(keyword) {
    const apiKey = "207446fe5b843td6o246060ad31759ff";
    const context =
      "give polite and professional responses by giving cited examples of a famous literature from the public domain that is not bound by copyright laws";
    const prompt =
      "using the keyword or keywords given, give a cited example of a famous poem written in English that is from the public domain and is related to the keyword inserted";

    const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt + " " + keyword
    )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    try {
      console.log("Requesting poem with keyword:", keyword);
      const response = await axios.get(apiUrl);
      console.log("API response:", response.data);

      if (response.data && response.data.answer) {
        return response.data.answer;
      } else if (typeof response.data === "string") {
        return response.data;
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("API request failed:", error);
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  // Function to format poem
  function formatPoem(poemText) {
    // Split poem into lines
    const lines = poemText.split("\n");

    // Start variables to store title, author, and poem body
    let title = "";
    let author = "";
    let poemBody = [];

    // Process poem text
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // First non-empty line is title
      if (!title && line) {
        title = line;
        continue;
      }

      // Check for author line
      if (!author && (line.startsWith("By ") || line.includes(" - "))) {
        author = line;
        continue;
      }

      // Add remaining lines to poem
      if (title) {
        poemBody.push(line);
      }
    }

    // Create HTML structure
    let html = `<div id="poem-content">`;
    if (title) html += `<h2 class="poem-title">${title}</h2>`;
    if (author) html += `<p class="poem-author">${author}</p>`;

    // Poem with correct line breaks
    html += `<div class="poem-body">`;
    for (const line of poemBody) {
      html += line ? `<p>${line}</p>` : `<br>`;
    }

    html += `</div></div>`;

    return html;
  }
});
