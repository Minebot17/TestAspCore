import ReactDOM from 'react-dom';
import React from 'react';
import { Button } from 'react-bootstrap';
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import "../css/ProfilePanel.scss";

@observer
class ProfilePanel extends React.Component {

    exitClick(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", '/api/auth/logout', true);
        xhr.withCredentials = true;
        xhr.send();
        this.props.store.logout();
        this.props.history.push("/");
    }

    render(){
        const store = this.props.store;
        return (
            <div className="userPanel">
                <p>Login: {store.login}</p>
                <p>Email: {store.email}</p>
                <p>Password: {store.password}</p>
                <p>Rating: {store.rating}</p>
                <Button variant="secondary" onClick={(e)=>this.exitClick(e)}>Выйти</Button>
            </div>
        );
    }
}

export default withRouter(ProfilePanel);
