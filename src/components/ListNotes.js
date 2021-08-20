import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
//moment is a JavaScript date library for parsing, validating, manipulating, and formatting dates. 

//we use a class component because our notes will consits of states and inheritance from a parent component which will pass properties down the functional component via props.
class ListNotes extends Component {
    //will render date to be displayed of note that was last added/edited
    renderFormattedDate(date){
        return moment(date).format('DD MMM YYYY');
    }
    render() {
        //if there are no notes to list, we will display a div with a message
        if (!this.props.notes || this.props.notes.length === 0) {
            return (<div className="no-notes">Oops! It seems that you have no notes. Try adding one? 😊</div>)
        }
        //if there are notes to list, we will display a div with the notes
        const listItems = this.props.notes.map((note) =>
                //nav link to the div of respective note without displaying the id
                <NavLink activeClassName='active' to={`/note/${note.id}`}
                      className="list-group-item"
                      key={note.id.toString()}
                      onClick={this.props.viewNote.bind(this, note.id)}>
                    {/*Show note title*/}
                    <div className="text-truncate primary">{note.title}</div>
                    {/*Show note date*/}
                    <div className="font-weight-light font-italic small">{this.renderFormattedDate(note.date)}</div>
                </NavLink >
        );
        //Displays the notes as a list
        return (<ul className="list-group">{listItems}</ul>);
    }
}

//exports for use in other files
export default ListNotes;