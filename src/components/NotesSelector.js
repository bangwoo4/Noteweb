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
  const [searchValue, setSearchValue] = React.useState("");
  const handleNoteSelect = (note) => {
    onNoteSelect(note);
  };
  const [showSearchBar, setShowSearchBar] = React.useState(false);

  const handleInputChange = (event) => {
    setNewNoteTitle(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addNote();
    }
  };
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  function addNote() {
    if (newNoteTitle === "") return;
    const newNote = { id: Date.now(), title: newNoteTitle, body: "" };
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

  function handleMoveUp(index) {
    if (index === 0) return;
    const newNotes = [...notes];
    const temp = newNotes[index];
    newNotes[index] = newNotes[index - 1];
    newNotes[index - 1] = temp;
    setNotes(newNotes);
  }

  function handleMoveDown(index) {
    if (index === notes.length - 1) return;
    const newNotes = [...notes];
    const temp = newNotes[index];
    newNotes[index] = newNotes[index + 1];
    newNotes[index + 1] = temp;
    setNotes(newNotes);
  }

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
        <div className="searchBlock">
          <button className="showSearch" onClick={handleShowSearchBar}>
            {showSearchBar ? "Hide Search Bar" : "🔎"}
          </button>
          {showSearchBar && (
            <input
              className="searchInput"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search notes"
            />
          )}
        </div>
      </div>
      <ul className="NotesList">
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            className={selectedNote?.id === note.id ? "selected" : ""}
            onClick={() => handleNoteSelect(note)}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {note.title}
            <div>
              <button
                className="moveUp"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveUp(notes.indexOf(note));
                }}
              >
                ⬆️
              </button>
              <button
                className="moveDown"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveDown(notes.indexOf(note));
                }}
              >
                ⬇️
              </button>
              <button
                className="deleteButton"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note.id);
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesSelector;
