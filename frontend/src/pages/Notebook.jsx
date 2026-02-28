
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Notebook({ setPage }) {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");


  // logout
  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };


  // get notes
  const fetchNotes = async () => {

    const res = await axios.get(
      `${API}/getallnote`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setNotes(res.data.data || []);
  };


  useEffect(() => {
    fetchNotes();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return;


    if (editId) {

      await axios.put(
        `${API}/updatenote`,
        {
          _id: editId,
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setEditId(null);

    } else {

      await axios.post(
        `${API}/addnote`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

    }

    setTitle("");
    setContent("");

    fetchNotes();
  };



  const deleteNote = async (id) => {

    await axios.delete(
      `${API}/deletenote/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchNotes();
  };



  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };



  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6">

      <div className="bg-white w-full max-w-4xl shadow-2xl rounded-3xl relative overflow-hidden">


        {/* spiral */}
        <div className="absolute left-0 top-0 h-full w-6 bg-gray-300 flex flex-col justify-evenly items-center py-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-white rounded-full border border-gray-400"
            />
          ))}
        </div>


        <div className="ml-10 p-8">


          {/* logout */}
          <div className="flex justify-end mb-4">
            <button
              onClick={logout}
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded-full"
            >
              Logout
            </button>
          </div>


          <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
            📒 My Cute Notebook
          </h1>



          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-10">

            <input
              type="text"
              placeholder="Write your title..."
              className="w-full p-3 rounded-xl border-2 border-pink-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />


            <textarea
              placeholder="Write something..."
              className="w-full p-3 rounded-xl border-2 border-pink-200 h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />


            <button className="bg-pink-500 text-white px-6 py-2 rounded-full">
              {editId ? "Update Note" : "Add Note"}
            </button>

          </form>



          {/* notes */}
          <div className="grid md:grid-cols-2 gap-6">

            {notes.map((note) => (

              <div
                key={note._id}
                className="bg-yellow-100 p-5 rounded-2xl shadow-lg"
              >

                <h2 className="text-xl font-bold">
                  {note.title}
                </h2>

                <p className="mb-4">
                  {note.content}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() => editNote(note)}
                    className="bg-blue-400 text-white px-4 py-1 rounded-full"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-400 text-white px-4 py-1 rounded-full"
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