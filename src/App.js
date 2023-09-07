import React, { Component } from 'react'

import Title from './components/Title'; 
import Form from './components/Form';
import Search from './components/Search';
import Sort from './components/Sort';
import Item from './components/Item';

import Items from './mockdata/Items';

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      items : Items,
      ShowAlert : false,
      titleAlert: '',
      idAlert: ''
    }
  }


  renderItem = () => {
    let {items} = this.state
    if (items.length > 0) {
      return <Item item={0} />
    }
    return items.map((item, index) => {
      return (
        <Item 
          index = {index+1} item={item} key={item.id} 
          handleShowAlert={this.handleShowAlert}
        />
      )
    })
  }

  handleShowAlert = (item) => {
    this.setState({
        showAlert: true,
        titleAlert: item.name
    });
  }

  handleDeleteItem = () => {
    let {idAlert, items} = this.state;
    if(items.length > 0) {
      for(let i = 0; i < items.length; i++) {
          if(items[i].id === idAlert) {
              items.splice(i, 1);
              break;
          }
      }
    }
    this.setState({
      showAlert: false
    })
  }

  render() {
    return (
              <div className="container">
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete Item?"
                    text={this.state.titleAlert}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showAlert: false })}
                    onEscapeKey={()     => this.setState({ showAlert: false })}
                    onCancel={()        => this.setState({ showAlert: false })}
                    onConfirm={() => this.handleDeleteItem()}
                />
                <Title />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Search />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <Sort />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button type="button" className="btn btn-info btn-block marginB10">Add Item</button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <Form />
                    </div>
                </div>
                <div className="panel panel-success">
                    <div className="panel-heading">List Item</div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }} className="text-center">#</th>
                                <th>Name</th>
                                <th style={{ width: '15%' }} className="text-center">Level</th>
                                <th style={{ width: '15%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>
                </div>
            </div>
          );
      }
  }


export default App;
