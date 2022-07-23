import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      my_List: this.props.myList.myList,
      newElement: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState({newElement: event.target.value});
  }

  handleSubmit(event) {
    const newElement = this.state.newElement;
    const my_List = [...this.state.my_List, newElement];
    this.setState({ my_List });
    this.setState({newElement: ''});
    this.props.addElement({id: Date.now(), value: this.state.newElement});
  }

  handleDelete(id) {
    console.log(id);
    this.props.deleteElement(id);
  }

  render() {
    return (
      <div className="App">
        <h1>My list</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h3>Ajouter un element à la liste</h3>
            <p>
              <input type="text" name="name" onChange={this.handleChange} value={this.state.newElement}/>
            </p>
            <p>
              <Button variant="secondary" onClick={this.handleSubmit} >Ajouter</Button>
            </p>
          </form>
        </div>
        <div className="list">
          {this.props.myList.myList.map((element) => (
            <Card className='card' style={{width: '15rem'}} key={element.id}>
              <Card.Body className='element'>
                <Card.Text className='text'>
                  {element.value}
                </Card.Text>
              </Card.Body>
              <Button variant="primary" onClick={this.handleDelete.bind(this, element.id)}>delete</Button>
            </Card>
          ))}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myList: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addElement: (element) => {
      dispatch({
        type: "ADD_ELEMENT",
        payload: element
      })
    },
    deleteElement: (id) => {
      dispatch({
        type: "DELETE_ELEMENT",
        payload: id
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
