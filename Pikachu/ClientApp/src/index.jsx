import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/base.scss';
import history from "./history.jsx";
import { ButtonGroup, Button, Nav, Navbar, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AnimatedSwitch } from 'react-router-transition';
import { getCookie } from "./cookies.jsx";

import AuthPanelStore from './stores/AuthPanelStore.jsx';
import UserInfoStore from "./stores/UserInfoStore.jsx";
import PostListStore from "./stores/PostListStore.jsx";

import AuthPanel from './components/AuthPanel.jsx';
import UserProfileLink from "./components/UserProfileLink.jsx";
import PostList from "./components/PostList.jsx";
import ProfilePanel from "./components/ProfilePanel.jsx";
import PostCreator from "./components/PostCreator.jsx";
import registerServiceWorker from "./registerServiceWorker";

const userInfoStore = new UserInfoStore();
const postListStore = new PostListStore();

const ws = new WebSocket("ws://localhost:3000/");
ws.onerror = function(e) {
    console.log(e);
};
ws.onopen = function() {
    console.log('WebSocket connection established');
};
ws.onmessage = function(e) {
    console.log("Received message. ID: " + e.data.id);
}

window.onunload = function(){
    ws.close();
}

if (getCookie("id")){
    userInfoStore.setSessionId(getCookie("id"));
    userInfoStore.updateUserInfo();
}

function setTimeLine(key,a){
    history.push("/" + key);
    postListStore.setType(key);
}

ReactDOM.render(
    <Router history={history}>
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">
                <img alt="" src="./res/icon.png" width="40" height="40" className="d-inline-block align-top"/>
            </Navbar.Brand>
            <Navbar.Text>Pikachu</Navbar.Text>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                <Nav onSelect={(key,e)=>{setTimeLine(key,e.target)}} defaultActiveKey="last">
                    <Nav.Link eventKey="hot" active={this}>ГОРЯЧЕЕ</Nav.Link>
                    <Nav.Link eventKey="best" active={this}>ЛУЧШЕЕ</Nav.Link>
                    <Nav.Link eventKey="last" active={this}>СВЕЖЕЕ</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <UserProfileLink store={userInfoStore}/>
            </Navbar.Collapse>
        </Navbar>
        <Switch>
            <Route path="/auth/">
                <AuthPanel store={new AuthPanelStore(userInfoStore)}/>
            </Route>
        </Switch>
        <div className="grid">
            <div className="grid-left">
                <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} className="switch-wrapper">
                    <Route path="/createPost">
                        <PostCreator/>
                    </Route>
                    <Route path="/profile">
                        <ProfilePanel store={userInfoStore} />
                    </Route>
                    <Route path="/">
                        <PostList store={postListStore} />
                    </Route>
                </AnimatedSwitch>
            </div>
            <div className="grid-right"><p>gawgawg</p></div>
        </div>
    </Router>
    , document.getElementById("react")
);

registerServiceWorker();