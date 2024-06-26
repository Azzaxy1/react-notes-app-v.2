import React from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { archiveNote, deleteNote, getAllNotes } from "../utils/local-data";
import NotesList from "../components/NotesList";
import NotesSearch from "../components/NotesSearch";

const WrapperHomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get("title");

  const changeSearchParams = (title) => {
    setSearchParams({ title });
  };

  return <HomePage defaultKeyword={title} keywordChange={changeSearchParams} />;
};

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || "",
      archivedNotes: [],
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    const notes = this.state.notes.filter((note) => note.id !== id);

    this.setState({ notes });

    toast.success("Data successfully deleted");
  }

  onSearchHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  onArchiveHandler(id) {
    archiveNote(id);

    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      }),
    }));

    toast.success("Data successfully updated");
  }

  render() {
    const filterSearch = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );

    return (
      <main className="min-h-screen py-28">
        <section className=" px-8 md:p-5 m-auto border-dashed rounded-md border-3 w-[60%]">
          <h1 className="pb-3 text-3xl text-center">Active Notes</h1>
          <NotesSearch
            keyword={this.state.keyword}
            keywordChange={this.onSearchHandler}
          />
          <NotesList
            notes={filterSearch}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
            isArchived={false}
          />
        </section>
      </main>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default WrapperHomePage;
