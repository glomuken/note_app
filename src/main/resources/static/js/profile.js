function loadUserNotes() {
    var username = new URLSearchParams(window.location.search).get('username');
    fetch('/api/notes/' + username)
        .then(response => response.json())
        .then(notes => {
            var notesContainer = document.getElementById('notes-container');
            notes.forEach(note => {
                var noteDiv = document.createElement('div');
                noteDiv.className = 'note';
                noteDiv.innerHTML = `
                    <div class="note-content">${note.note}</div>
                    <button class="edit-button" data-note-id="${note.id}">Edit</button>
                `;
                notesContainer.appendChild(noteDiv);

                noteDiv.addEventListener('click', function() {
                    var content = this.querySelector('.note-content');
                    var editButton = this.querySelector('.edit-button');
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                    editButton.style.display = editButton.style.display === 'none' ? 'inline-block' : 'none';
                });
            });

           document.querySelectorAll('.edit-button').forEach(button => {
               button.addEventListener('click', function(event) {
                   event.stopPropagation();
                   var noteId = this.dataset.noteId;
                   var noteContent = this.parentNode.querySelector('.note-content').textContent;
                   showEditForm(noteId, noteContent);
               });
           });
        })
        .catch(error => console.error('Error fetching notes:', error));
}

window.onload = loadUserNotes;

function showEditForm(noteId, existingNoteContent) {
    var editForm = document.getElementById('edit-form');
    var editNoteTextarea = document.getElementById('edit-note');
    var noteIdInput = document.getElementById('note-id');

    editNoteTextarea.value = existingNoteContent;
    noteIdInput.value = noteId;

    editForm.style.display = 'block';
}

function submitEditForm(event) {
    event.preventDefault();
    var noteId = document.getElementById('note-id').value;
    var updatedNote = document.getElementById('edit-note').value;
    fetch('/api/notes/' + noteId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: updatedNote })
    })
    .then(response => {
        if (response.ok) {
            var email = new URLSearchParams(window.location.search).get('username');
            window.location.href = '/profile/' + email;
        } else {
            console.error('Error updating note:', response.statusText);
        }
    })
    .catch(error => console.error('Error updating note:', error));
}

function cancelEdit() {
    var editForm = document.getElementById('edit-form');
    editForm.style.display = 'none';
}

function showCreateNoteForm() {
    var createNoteForm = document.getElementById('create-note-form');
    createNoteForm.style.display = 'block';
}

function cancelCreateNote() {
    var createNoteForm = document.getElementById('create-note-form');
    createNoteForm.style.display = 'none';
}

function submitCreateNoteForm(event) {
    event.preventDefault();
    var username = new URLSearchParams(window.location.search).get('username');
    var newNote = document.getElementById('create-note').value;
    fetch('/api/notes/' + username, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: newNote })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/profile/' + username;
        } else {
            console.error('Error creating note:', response.statusText);
        }
    })
    .catch(error => console.error('Error creating note:', error));
}

