import React from 'react';
import { Redirect } from 'react-router';
//React Router is a collection of navigational components. 

//this will hide our note id div from showing on the note screen
const divStyle = {
    display: 'none'
};

//we use a class component because our notes will consits of states and inheritance from a parent component which will pass properties down the functional component via props.
class NewNotes extends React.Component {
    
        //We use a constructor to set the initial state of the class object
        constructor(props) {
        super(props);
        //we set the initial state of the note nav to false, ie. there will be no notes to show thus no notes to "redirect" to when clicked
        this.state = {
            redirect: false
        };
        //we bind the components to our event handlers to be executed
        this.saveNote = this.saveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }
    
    //saveNote Event Handler which will save a new note
    saveNote(event) {
        //the preventDefault() option is added to stop the page from reloading upon submitting a note
        event.preventDefault();
        //if the Title of the note is empty, we validate it via alert
        if (this.title.value === "") {
            alert("Title is needed");
        } else {
             //we assign each note with an id, title, desc and image upon submit
            const note = {
                id: Number(this.id.value),
                title: this.title.value,
                description: this.description.value
            }
             //we set the new state of the note nav to true so that it can "redirect" to the note when clicked
            this.props.persistNote(note);
            this.setState({
                redirect: true
            });
        }
    }

    //deleteNote Event Handler which will delete(cancel the addition) a new note
    deleteNote(event) {
        //testing purposes only
        console.log('deleteNote');
        //the preventDefault() option is added to stop the page from reloading upon submitting a note
        event.preventDefault();
        //we remove the note by deleting the respective id (note key)
        this.props.deleteNote(this.props.note.id);
    }

    //Switch between and then render(show) note titles, ie. either add a note or edit an exisitng note title.
    renderFormTitleAction() {
        return (this.props.note.id !== undefined) ? "Edit Note" : "New Note";
    }

    //Render(show) save/delete note buttons for a new or existing note.
    renderFormButtons() {
        //if the note.id exists, then we can either delete or edit that note
        if (this.props.note.id !== undefined) {
            return (<div>
                { /* Show the save button to edit note */}
                <button type="submit" className="btn btn-success float-right">Add Note</button>
                { /* Show the delete button to delete note */}
                <button onClick={this.deleteNote} className="btn btn-danger">Delete Note</button>
            </div>);
        }
        return (
            /* Show the add button to save a new note */
            <button type="submit" className="btn btn-success float-right">Add Note</button>
        );
    }

    render() {
        
        //existing note redirection
        if (this.state.redirect) {
            //if the note doesn't exist, we return to main "/"
            if (!this.props.note) {
                return <Redirect push to="/"/>;
            }
            //route to an existing note upon redirect, ie. note id: 1 will redirect to http://localhost:3000/note/1
            return <Redirect push to={`/note/${this.props.note.id}`}/>;
        }
     
        return (
            <div className="card">
                <div className="card-header">
                    {/* This will render the correct titles depending on if there are existing notes or not*/}
                    {this.renderFormTitleAction()}
                </div>
                <div className="card-body">
                    {/* Form that allows us to add a new note*/}
                    <form ref="NewNotes" onSubmit={this.saveNote}>
                        <div className="form-group">
                            {/* Renders a new note id (divStyle will hide this from view)*/}
                            <p className="note_id">
                                <input className="form-control" style={divStyle} disabled ref={id => this.id = id} defaultValue={this.props.note.id}/>
                            </p>
                            {/* Renders a new note title */}
                            <p className="note_title">
                                <label className="noteTitle">Title</label>
                                <input className="form-control" ref={title => this.title = title} defaultValue={this.props.note.title} placeholder="Save Princess Peach"/>
                            </p>
                            {/* Renders a new note description*/}
                            <p className="note_desc">
                                <label className="noteDescTitle">Description</label>
                                <textarea className="form-control" rows="10" ref={description => this.description = description} defaultValue={this.props.note.description} placeholder="When Mario reaches the end of the course, remember to save Princess Peach or Luigi will! "/>
                            </p>
                        </div>
                        {/* This will render the correct buttons depending on if there are existing notes or not*/}
                        {this.renderFormButtons()}
                    </form>
                </div>
            </div>
        )
    }
}

//exports for use in other files
export default NewNotes;