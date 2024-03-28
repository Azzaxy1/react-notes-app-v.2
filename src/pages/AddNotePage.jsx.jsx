import { CircleArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { addNote } from "../utils/local-data";
import NotesAdd from "../components/NotesAdd";

const AddNotePage = () => {
  const navigate = useNavigate();

  const onAddNote = ({ title, body }) => {
    addNote({
      title,
      body,
    });
    navigate("/");
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen py-20 mx-auto font-sans text-white bg-primary">
      <div className="border-dashed  rounded-md border-3 w-[70%] flex py-3 md:py-10 border-slate-900 flex-col items-center justify-center ">
        <header>
          <Link to="/">
            <CircleArrowLeft className="absolute left-10 md:left-36 top-32 text-secondary size-8 md:size-11" />
          </Link>
          <h1 className="mb-4 text-3xl font-semibold text-slate-800">
            Add New Note
          </h1>
        </header>
        <section className="w-2/3 rounded-e-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-secondary p-7">
          <NotesAdd addNotes={onAddNote} />
        </section>
      </div>
    </main>
  );
};

export default AddNotePage;
