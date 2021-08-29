import React from 'react';
import {Col, Row} from 'react-bootstrap';

//Initiate the ToDo function that will display our main display components, ie the list, check/uncheck button, and delete button
function Todo({ todo, index, completeTodo, unCompleteTodo, removeTodo }) {
    return (
          <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          >
          {todo.text}
          <div>
          {/*completes list*/}
          <button onClick={() => completeTodo(index)} className="btn btn-icon-check"> 
            <i className="fas fa-check-circle"></i>
          </button>
          {/*uncompletes list*/}
          <button onClick={() => unCompleteTodo(index)} className="btn btn-icon-redo"> 
          <i className="fas fa-redo"></i>
          </button>
          {/*deletes list*/}
          <button onClick={() => removeTodo(index)} className="btn btn-icon-trash"> <i className="fas fa-trash"></i> </button>
        </div>
      </div>
    );
  }
  
  //sets our initial state of our todo list to null
  function TodoForm({ addTodo }) {
    const [value, setValue] = React.useState("");
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };
  
    //returns a form to add a new todo item to our list
    return (
      <form onSubmit={handleSubmit} className="card-header-todo mb-3">
        <Row>
          <Col className="col-md-8">
            <input 
            type="text"
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)
            }/>
           </Col>
           <Col className="col-md-4 btn-add">
            <button type="submit" className="btn-success">Add To-Do</button>
           </Col>
        </Row>
      </form>
    );
  }
  
  //Main function ties it together
  function Main() {
    //default values are passed for display purposes
    const [todos, setTodos] = React.useState([
      {
        text: "Do Some Magic With React 🔮",
        isCompleted: false
      },
      {
        text: "Ban Townies From Sims Game ❌",
        isCompleted: false
      },
      {
        text: "Water The Dead Cactus 🌵",
        isCompleted: false
      }
    ]);
  
    //adds a todo to the list
    const addTodo = text => {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    };
  
    //checks the complete button and strikes through the text
    const completeTodo = index => {
      const newTodos = [...todos];
      newTodos[index].isCompleted = true;
      setTodos(newTodos);
    };

    //checks the uncomplete button and unstrikes through the text
    const unCompleteTodo = index => {
      const newTodos = [...todos];
      newTodos[index].isCompleted = false;
      setTodos(newTodos);
    };
  
    //deletes the whole list item as a whole
    const removeTodo = index => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };
  
    //renders the main ui of to do list
    return (
      <div className="todoList container-fluid">
        <div className="todo-header">
          <div className="todo-list-header">
              <h2>TO-DO </h2>
          </div>  
      </div>   
          <div className="card">
              <div className="card-body todo-body">
                  {/*form to add a new to do item*/}
                  <div className="card-todo-form">
                      <TodoForm addTodo={addTodo}/>
                  </div>
                  <div className="card-list">
                      {/*maps over todo items and instantiates functions for existing items*/}
                      {todos.map((todo, index) => (
                      <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        unCompleteTodo={unCompleteTodo}
                      />
                    ))}   
                  </div>
              </div><div className="card-pixels-todo">
                    <span className="pixels">todos</span>
                    </div>
            </div>
      </div>
    );
  }
  
  //exports for use in other files
  export default Main;
