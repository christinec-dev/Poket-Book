import React from 'react';
import { Redirect } from 'react-router';
import moment from 'moment';
import newline from 'react-newline-to-break';
//moment is a JavaScript date library for parsing, validating, manipulating, and formatting dates. 

//class component will switch between editing and deleting note rendering states
class EditNotes extends React.Component {
    //We use a constructor to set the initial state of the class object
        constructor(props) {
        super(props);
        //we set the initial state of the note nav to false, ie. there will be no notes to show thus no notes to "redirect" to when clicked
        this.state = { 
            redirect : false
        };
        //we bind the components to our event handlers to be executed
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);
    }

    //deleteNote Event Handler which will delete an existing note
    deleteNote(event){
        //the preventDefault() option is added to stop the page from reloading upon submitting a note
        event.preventDefault();
        //we remove the note by deleting the respective id (note key)
        this.props.deleteNote(this.props.note.id);
    }

    //editNote Event Handler which will update an existing note
    editNote(event){
        //the preventDefault() option is added to stop the page from reloading upon submitting a note
        event.preventDefault();
        //we edit the note by updating the respective id (note key)
        this.props.editNote(this.props.note.id);
    }

    //will render to be displayed when a new date whenever a note is edited
    renderFormattedDate(){
        return 'Last edited:' + moment(this.props.note.date).format("DD MMM YYYY [at] HH:mm");
    }

    render() {
        //if the note doesn't exist, we return to main "/"
        if (this.state.redirect || !this.props.note) {
            return <Redirect push to="/"/>;
        }

        //else we return a card with the note details
        return (
            <div className="card">
                {/*Will render the note title*/}
                <div className="card-header">
                    <h4>{this.props.note.title}</h4>
                </div>
                <div className="card-body">
                    {/*Will render the note added/last updated date*/}
                    <p className="text-center font-weight-light small text-muted">{this.renderFormattedDate()}</p>
                    {/*Will render the note description*/}
                    <p className="card-text-main">Title: {newline(this.props.note.title)}</p>
                    <p className="card-text">{newline(this.props.note.description)}</p>
                    {/*Will render the delete button*/}
                    <button onClick={this.deleteNote} className="btn btn-danger">Delete</button>
                    {/*Will render the edit button*/}
                    <button onClick={this.editNote} className="btn btn-success float-right">Edit</button>
                </div>
            </div>
        )
    }
}

//exports it for use in other files
export default EditNotes;