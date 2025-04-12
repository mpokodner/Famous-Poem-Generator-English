let apiKey = "207446fe5b843td6o246060ad31759ff";
let context =
  "give cited examples of a famous literature from the public domain that is not bound by copyright laws";
let prompt =
  "using the keyword or keywords inserted into the search bar, give a famous poem written in English that is from the public domain and is related to the words inserted into the search form";
("tell a joke with a question that has a comical answer that answers the question");
let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

document
  .getElementById("search-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevents the form from submitting
    const keyword = document.getElementById("keyword").value; // Get the keyword input value
    const poem = generatePoem(keyword); // Call a function to generate the poem
    document.getElementById("poem").innerText = poem; // Display the poem
  });

function generatePoem(keyword) {
  // This is a placeholder function. Replace with your AI poem generation logic.
  return `Here's a poem about ${keyword}:\n\nRoses are red,\nViolets are blue,\nThis poem is generated,\nJust for you!`;
}
