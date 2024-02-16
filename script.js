// Function to add a new note
function addNote() {
    var noteInput = document.getElementById("note-input");
    var noteText = noteInput.value.trim();
    var noteColor = document.getElementById("color-picker").value;
    
    if (noteText !== "") {
        // Create a new note element
        var noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.style.backgroundColor = noteColor; // Set the background color of the note
        noteElement.innerHTML = noteText + '<span class="delete-btn">X</span>';
        
        // Append the new note to the notes container
        document.getElementById("notes").appendChild(noteElement);
        
        // Clear the input field
        noteInput.value = "";
        
        // Save note to local storage
        saveNotes();
        
        // Attach delete event listener to the delete button
        var deleteBtn = noteElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            deleteNote(noteElement);
        });
    }
}

// Function to delete a note
function deleteNote(noteElement) {
    noteElement.remove();
    // Save notes after deletion
    saveNotes();
}

// Function to save notes to local storage
function saveNotes() {
    var notes = document.querySelectorAll('.note');
    var notesArray = [];
    notes.forEach(function(note) {
        var noteText = note.innerText.replace('X', '').trim(); // Remove the 'X' from the note text
        var noteColor = note.style.backgroundColor;
        notesArray.push({text: noteText, color: noteColor});
    });
    localStorage.setItem('notes', JSON.stringify(notesArray));
}

// Function to load notes from local storage
function loadNotes() {
    var notesArray = JSON.parse(localStorage.getItem('notes'));
    if (notesArray) {
        notesArray.forEach(function(note) {
            // Create a new note element
            var noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.style.backgroundColor = note.color; // Set the background color of the note
            noteElement.innerHTML = note.text + '<span class="delete-btn">X</span>';
            
            // Append the new note to the notes container
            document.getElementById("notes").appendChild(noteElement);
            
            // Attach delete event listener to the delete button
            var deleteBtn = noteElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteNote(noteElement);
            });
        });
    }
}

// Attach addNote function to the Add Note button
document.getElementById("add-btn").addEventListener("click", addNote);

// Load notes from local storage when the page loads
window.addEventListener('load', loadNotes);
