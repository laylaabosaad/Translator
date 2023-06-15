import { useEffect, useState } from "react";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const getNotes = async () => {
    try {
      const res = await axios.get("https://translator-i1gp.onrender.com");
      setNotes(res.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { text };
      await axios.post("https://translator-i1gp.onrender.com", body);
      setText("");
      getNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`https://translator-i1gp.onrender.com/${noteId}`);
      getNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="notes-container">
      <h1>My Notes</h1>

      <form onSubmit={handleSubmit} className="notes-form">
        <div>
          <input
            type="text"
            value={text}
            required
            placeholder="Enter a new note"
            onChange={(e) => setText(e.target.value)}
            className="notes-input"
          />
        </div>
        <div>
          <button type="submit" className="notes-button">
            Add Note
          </button>
        </div>
      </form>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note-container">
            <p className="note-text">{note.text}</p>
            <button
              onClick={() => handleDeleteNote(note._id)}
              className="note-delete"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
