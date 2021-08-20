import React from 'react';
import moment from 'moment';
import NewNotes from './NewNotes';
import EditNotes from './EditNotes';
import NotesList from './ListNotes';
import { Route, Link } from 'react-router-dom';

//class component will switch between displaying all existing or new note rendering states
class NotesApp extends React.Component {
        //We use a constructor to set the initial state of the class object
        constructor(props) {
        super(props);
        //will store the notes on our localStorage for stroring user notes (testing purposes)
        const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
        //sets the initial state of all notes on storage base
        this.state = {
            notes: notes,
            selectedNote: null,
            editMode: false
        };
        //we bind the components to our event handlers to be executed
        this.getNotesNextId = this.getNotesNextId.bind(this);
        this.addNote = this.addNote.bind(this);
        this.viewNote = this.viewNote.bind(this);
        this.openEditNote = this.openEditNote.bind(this);
        this.saveEditedNote = this.saveEditedNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    //Initiates the note id's that are/will be stored via the localStorage 
    getNotesNextId() {
        return this.state.notes.length > 0 ? this.state.notes[this.state.notes.length - 1].id + 1 : 0;
    }

    //we persist the fetched data as string because we get the stored value parsed as a boolean, ie. does it have notes (yes/no)
    persistNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
        this.setState({notes: notes});
    }

    //we give each note an id, date and new persisted state when we add a new note and push it to the notes local array.
    addNote(note) {
        //set notes values
        note.id = this.getNotesNextId();
        note.date = moment();
        const notes = this.state.notes;
        //adds new note values
        notes.push(note);
        this.persistNotes(notes);
        this.setState({selectedNote: null, editMode: false});
    }

    //we view each note via mapping over it's id array, and when it is not found we handle it via an arror handler
    viewNote(id) {
        const notePosition = this.state.notes.findIndex((n) => n.id === id);
        //display the note on the screen
        if (notePosition >= 0) {
            this.setState({
                selectedNote: this.state.notes[notePosition], 
                editMode: false
            });
        } 
        //error handler
        else {
            console.warn('The note with the id ' + id + ' was not found. Please try again.');
        }
    }

    //we edit each note via mapping over it's id array, and when it is not found we handle it via an arror handler
    openEditNote(id) {
        const notePosition = this.state.notes.findIndex((n) => n.id === id);
        //displays the note to edit on screen
        if (notePosition >= 0) {
            this.setState({
                selectedNote: this.state.notes[notePosition], 
                editMode: true
            });
        } 
        //error handler
        else {
            console.warn('The note with the id ' + id + ' was not found. Please try again.');
        }
    }

    //we save each note via mapping over it's id array, and when it is not found we handle it via an arror handler
    saveEditedNote(note) {
        const notes = this.state.notes;
        const notePosition = notes.findIndex((n)=> n.id === note.id);
        //displays the note to add on screen
        if (notePosition >= 0) {
            note.date = moment();
            notes[notePosition] = note;
            this.persistNotes(notes);
        } 
        //error handler
        else {
            console.warn('The note with the id ' + note.id + ' was not found. Please try again.');
        }
        //updates notes to list
        this.setState({
            selectedNote: note, 
            editMode: false
        });
    }

    //we delete each note via mapping over it's id array, and when it is not found we handle it via an arror handler
    deleteNote(id) {
        const notes = this.state.notes;
        const notePosition = notes.findIndex((n)=> n.id === id);
        //deletes the note from the screen screen
        if (notePosition >= 0) {
            if (window.confirm('Are you sure you want to delete this note?')) {
                notes.splice(notePosition, 1);
                this.persistNotes(notes);
                this.setState({selectedNote: null, editMode: false});
            }
        } 
        //error handler
        else {
            console.warn('The note with the id ' + id + ' was not found. Please try again.');
        }
    }

    //initiates the values of each new note
    getEmptyNote() {
        return {
            title: "",
            description: "",
            image: ""
        };
    }

    //renders the notes list menu on the screen
    renderMenu () {
        return (
            <div className="card">
                {this.renderHeader()}
                <div className="card-body">
                    <NotesList notes={this.state.notes} viewNote={this.viewNote}/>   
                </div>
            </div>
        )
    }

    //renders the notes header on the screen
    renderHeader() {
        return (
            <div className="card-header">
                {/*renders close view*/ }
                <Route exact path="/note" render={routeProps => 
                    <Link to="/">
                        <button type="button" className="btn btn-danger">Cancel Note</button>
                    </Link> }/>
                {/*renders note view*/ }
                {["/", "/note/:id"].map(path =>
                <Route key={path} exact path={path} render={routeProps => 
                    <Link to="/note">
                        <button type="button" className="btn btn-success">New Note</button>
                    </Link>}/>
                )}
            </div>
        )
    }

    //display the notes when clicked on for editing, note and empty note views
    setMainAreaRoutes() {
        const editMode = this.state.editMode;
        return (<div>
            {/*edits either the new note or exisitn note*/ }
            {editMode ? (
                <Route exact path="/note/:id"
                       render={routeProps => <NewNotes persistNote={this.saveEditedNote} deleteNote={this.deleteNote} note={this.state.selectedNote}/>}
                    />
                ) : (
                <Route exact path="/note/:id" render={routeProps =>     
                    <EditNotes editNote={this.openEditNote} deleteNote={this.deleteNote} note={this.state.selectedNote}/>}
                />
            )}
            {/*displays if no notes can be found*/ }
            <Route exact path="/note"
                   render={routeProps =>  <NewNotes persistNote={this.addNote} note={this.getEmptyNote()}/>}
                />
        </div>)
    }

    render() {
        return (
            <div className="notesApp container-fluid">
                 <div className="card-notes-header">
                    <h2> NOTES </h2>
                </div>
                <div className="row">
                    {/*renders note list menu*/ }
                    <div className="col-12">
                        {this.renderMenu()}  
                    </div>
                    {/*renders note area menu*/ }
                    <div className="col-12">
                        {this.setMainAreaRoutes()}
                    </div>
                    </div>
            </div>
        );
    }
}

//exports for use in other files
export default NotesApp;