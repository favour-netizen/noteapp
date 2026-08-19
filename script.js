// Get items from HTML

let noteTitle = document.getElementById("noteTitle");
let noteText = document.getElementById("noteText");
let saveBtn = document.getElementById("saveBtn");
let notesList = document.getElementById("notesList");
let searchInput = document.getElementById("searchInput");
let totalNotes = document.getElementById("totalNotes");
let formTitle = document.getElementById("formTitle");


// Get notes from local storage

let notes = JSON.parse(localStorage.getItem("notes"));


// If there are no notes, create an empty array

if (notes == null) {
    notes = [];
}


// This will help us know if we are editing a note

let editIndex = -1;


// Display notes when page opens

displayNotes();


// Save button

saveBtn.addEventListener("click", function () {

    let title = noteTitle.value;
    let text = noteText.value;


    // Prevent empty notes

    if (title == "" || text == "") {
        alert("Please enter a title and note!");
        return;
    }


    // If editing an old note

    if (editIndex != -1) {

        notes[editIndex].title = title;
        notes[editIndex].text = text;

        editIndex = -1;

        saveBtn.innerText = "Save Note";
        formTitle.innerText = "Add a New Note";

    } else {

        // Create new note

        let newNote = {
            title: title,
            text: text
        };

        notes.push(newNote);
    }


    // Save notes to local storage

    localStorage.setItem("notes", JSON.stringify(notes));


    // Clear inputs

    noteTitle.value = "";
    noteText.value = "";


    // Show notes again

    displayNotes();

});


// Function to display all notes

function displayNotes() {

    notesList.innerHTML = "";


    // Show total number of notes

    totalNotes.innerText = "Total Notes: " + notes.length;


    // If there are no notes

    if (notes.length == 0) {

        notesList.innerHTML =
            "<p class='no-notes'>You don't have any notes yet.</p>";

        return;
    }


    // Loop through notes

    for (let i = 0; i < notes.length; i++) {

        let note = document.createElement("div");

        note.className = "note";


        note.innerHTML = `
            <h3>${notes[i].title}</h3>
            <p>${notes[i].text}</p>

            <button class="edit-btn" onclick="editNote(${i})">
                Edit
            </button>

            <button class="delete-btn" onclick="deleteNote(${i})">
                Delete
            </button>
        `;


        notesList.appendChild(note);
    }

}


// Edit note

function editNote(index) {

    noteTitle.value = notes[index].title;
    noteText.value = notes[index].text;

    editIndex = index;

    saveBtn.innerText = "Update Note";
    formTitle.innerText = "Edit Your Note";


    // Move to the form

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Delete note

function deleteNote(index) {

    let answer = confirm("Are you sure you want to delete this note?");


    if (answer == true) {

        notes.splice(index, 1);

        localStorage.setItem("notes", JSON.stringify(notes));

        displayNotes();
    }

}


// Search notes

searchInput.addEventListener("input", function () {

    let searchWord = searchInput.value.toLowerCase();

    notesList.innerHTML = "";


    for (let i = 0; i < notes.length; i++) {

        let title = notes[i].title.toLowerCase();
        let text = notes[i].text.toLowerCase();


        // Search by title or note content

        if (title.includes(searchWord) || text.includes(searchWord)) {

            let note = document.createElement("div");

            note.className = "note";


            note.innerHTML = `
                <h3>${notes[i].title}</h3>
                <p>${notes[i].text}</p>

                <button class="edit-btn" onclick="editNote(${i})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteNote(${i})">
                    Delete
                </button>
            `;


            notesList.appendChild(note);
        }
    }

});