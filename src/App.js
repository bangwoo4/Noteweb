import "./App.css";
import React from "react";
import NotesSelector from "./components/NotesSelector";
import DisplayNotes from "./components/DisplayNotes";

function App() {
  const [selectedNote, setSelectedNote] = React.useState(null);
  const [noteBody, setNoteBody] = React.useState("");

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setNoteBody(note.body);
  };

  const handleNoteBodyChange = (event) => {
    setNoteBody(event.target.value);
  };

  const handleNoteSave = (note, body) => {
    const updatedNote = { ...note, body };
    setSelectedNote(updatedNote);
  };

  const handleNoteUpdate = (updatedNote) => {
    setSelectedNote(updatedNote);
  };

  return (
    <div className="App">
      <NotesSelector
        onNoteSelect={handleNoteSelect}
        selectedNote={selectedNote}
        onNoteUpdate={handleNoteUpdate}
      />
      <DisplayNotes
        selectedNote={selectedNote}
        noteBody={noteBody}
        onNoteBodyChange={handleNoteBodyChange}
        onNoteSave={handleNoteSave}
        onNoteUpdate={handleNoteUpdate}
      />
    </div>
  );
}

export default App;
