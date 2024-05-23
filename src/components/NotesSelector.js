import React, { useEffect } from "react";

function NotesSelector({ onNoteSelect, selectedNote, onNoteUpdate }) {
  const [notes, setNotes] = React.useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes
      ? JSON.parse(storedNotes)
      : [
          { id: 1, title: "Note 1", body: "Body 1" },
          { id: 2, title: "Note 2", body: "Body 2" },
          { id: 3, title: "Note 3", body: "Body 3" },
        ];
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [newNoteTitle, setNewNoteTitle] = React.useState("");

  const handleNoteSelect = (note) => {
    onNoteSelect(note);
  };

  const handleInputChange = (event) => {
    setNewNoteTitle(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addNote();
    }
  };

  function addNote() {
    if (newNoteTitle === "") return;
    const newNote = { id: notes.length + 1, title: newNoteTitle, body: "" };
    setNotes((notes) => [...notes, newNote]);
    setNewNoteTitle("");
  }

  React.useEffect(() => {
    if (selectedNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === selectedNote.id ? selectedNote : note
        )
      );
    }
  }, [selectedNote]);

  return (
    <div className="Selector">
      <h1>📒Notes Selector</h1>
      <div className="addFuntion">
        <input
          className="addInput"
          type="text"
          value={newNoteTitle}
          onChange={handleInputChange}
          onKeyPress={handleEnter}
          placeholder="New note title"
        />
        <button className="addButton" onClick={addNote}>
          Add
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className={selectedNote?.id === note.id ? "selected" : ""}
            onClick={() => handleNoteSelect(note)}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesSelector;
