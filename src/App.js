import "./App.css";
import React from "react";
import Login from "./components/Login";
import NotesSelector from "./components/NotesSelector";
import DisplayNotes from "./components/DisplayNotes";
import Headers from "./components/Header";
import Footer from "./components/Footer";

function App() {
  //login
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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
      <div className="header">
        <Headers />
      </div>
      {!isLoggedIn && <Login onLogin={() => setIsLoggedIn(true)} />}
      {isLoggedIn && (
        <div className="content">
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
      )}

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
