import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props){
        super(props);
        this.taskcompleted = this.taskcompleted.bind(this);
        this.taskdeleted = this.taskdeleted.bind(this);
    }
    taskcompleted(event){
        this.props.onCompleted(this.props.todoId);
    }
    taskdeleted(event){
        this.props.onDeleted(this.props.todoId);
    }
   

    render(){
        var isDone = "form-check todoitem" + (this.props.completed ? "done" : "undone");
        return(
            
            <li className = {isDone} ref={li => this._listItem = li} >
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" onChange={this.taskcompleted} /> {this.props.todoItem}
                </label>
                <button type="button" className="btn btn-danger btn-sm" onClick={this.taskdeleted}>x</button>
            </li>
            
        );
    }
}

class TodoList extends Component {
    render() {
      return (
        <ul className="todolist">
          {this.props.todoList.map(item => (
            <TodoItem key={item.todoId} todoId={item.todoId} todoItem={item.todoItem} completed={item.taskDone} onCompleted={this.props.onCompleted} onDeleted={this.props.onDeleted} />
          ))}
        </ul>
      );
    }
  }

class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoList: [],
            todoItem: ""
        };
        this.handleChange= this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.itemcompleted = this.itemcompleted.bind(this);
        this.deleted = this.deleted.bind(this);
    }

    handleChange(event) {
        this.setState({
            todoItem: event.target.value
        });
    }

    addItem(event) {
        event.preventDefault();
        var item = {
            todoId: Date.now(),
            todoItem: this.state.todoItem,
            taskDone: false
        };
        this.setState((prevState) => ({
            todoList: prevState.todoList.concat(item),
            todoItem: ""
        }));
    }

    itemcompleted(itemId) {
        var updateItem = this.state.todoList.map(item => {
            if(itemId === item.todoId) item.taskDone = !item.taskDone;
            return item;
        });

        this.setState({
            todoList: [].concat(updateItem)
        });
    }

    deleted(itemId) {
        var updateItem = this.state.todoList.filter(item => {
            return item.todoId !== itemId
        });

        this.setState({
            todoList: [].concat(updateItem)  
        });
    }

    
    render(){
        return(
            <div className="container">
                <div className = "row">
                    <div className = "col-md-5">
                        <TodoList todoList = {this.state.todoList} onCompleted = {this.itemcompleted} onDeleted = {this.deleted}/>
                    </div>
                </div>
                <form className = "row">
                    <div className = "col-md-5">
                        <input type="text" className="form-control" onChange = {this.handleChange} value={this.state.todoItem} />
                    </div>
                    <div className = "col-md-3">
                        <button className = "btn btn-primary" onClick={this.addItem} disabled = {!this.state.todoItem}><span className="fa fa-pencil-square fa-lg"></span>{" Add #" + 
                    (this.state.todoList.length + 1)}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Todo;