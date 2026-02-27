import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/getallnote`);
    setNotes(res.data.data || []);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editId) {
      await axios.put(`${API}/update_note`, {
        _id: editId,
        title,
        content,
      });
      setEditId(null);
    } else {
      await axios.post(`${API}/addnote`, { title, content });
    }

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/delete_note/${id}`);
    fetchNotes();
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6">

      {/* Notebook Header */}
      <div className="bg-white w-full max-w-4xl shadow-2xl rounded-3xl relative overflow-hidden">

        {/* Spiral Effect */}
        <div className="absolute left-0 top-0 h-full w-6 bg-gray-300 flex flex-col justify-evenly items-center py-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-white rounded-full border border-gray-400"></div>
          ))}
        </div>

        <div className="ml-10 p-8">

          <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
            📒 My Cute Notebook
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-10">
            <input
              type="text"
              placeholder="Write your title..."
              className="w-full p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write something beautiful..."
              className="w-full p-3 rounded-xl border-2 border-pink-200 h-32 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-lg transition transform hover:scale-105">
              {editId ? "Update Note ✏️" : "Add Note 💕"}
            </button>
          </form>

          {/* Notes Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-yellow-100 p-5 rounded-2xl shadow-lg relative transform hover:rotate-1 hover:scale-105 transition"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {note.title}
                </h2>

                <p className="text-gray-700 mb-4 whitespace-pre-line">
                  {note.content}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => editNote(note)}
                    className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}