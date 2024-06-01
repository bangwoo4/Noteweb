import React from "react";

function DisplayNotes({
  selectedNote,
  noteBody,
  onNoteBodyChange,
  onNoteSave,
  onNoteUpdate,
}) {
  const handleNoteSave = () => {
    onNoteSave(selectedNote, noteBody);
  };

  const handleNoteBodyChange = (event) => {
    onNoteBodyChange(event);
    onNoteUpdate({ ...selectedNote, body: event.target.value });
  };
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleNoteSave();
    }
  };

  return (
    <div className="Display">
      <div className="curve"></div>
      {selectedNote ? (
        <>
          <h2 className="noteTitle"> 🖊️{selectedNote.title}</h2>
          <textarea
            className="noteBody"
            value={noteBody}
            onChange={handleNoteBodyChange}
            placeholder="Add content here..."
            onKeyPress={handleEnter}
          />
          <button className="saveButton" onClick={handleNoteSave}>
            Save
          </button>
        </>
      ) : (
        <p className="NoNoteSelected">🙅 No note selected</p>
      )}
    </div>
  );
}

export default DisplayNotes;
