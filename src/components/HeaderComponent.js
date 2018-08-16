import React, {Component} from 'react';
import {Navbar, Jumbotron, NavbarBrand} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Navbar dark expand="md">
                <div className = "container">
                <Jumbotron>
                        <div className="container">
                            <div className="row row-header">
                                <div className="col-12">
                                    <h1>TODO LIST</h1>
                                    <p>Create notes and list, and check off your completed tasks.  </p>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                </div>
            </Navbar>
        );
    }
    
}

export default Header;