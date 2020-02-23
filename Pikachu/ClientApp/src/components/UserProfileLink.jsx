import React from 'react';
import { Navbar, ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";

@observer
class UserProfileLink extends React.Component {
    render(){
        const store = this.props.store;
        return (
            !store.login ?
                <ButtonGroup>
                    <LinkContainer to="/auth/login"><Button variant="secondary" size="sm">Логин</Button></LinkContainer>
                    <LinkContainer to="/auth/register"><Button variant="secondary" size="sm">Регистрация</Button></LinkContainer>
                </ButtonGroup>
            :
                <ButtonGroup>
                    <LinkContainer to="/createPost"><Button variant="secondary" size="sm">Создать новый пост</Button></LinkContainer>
                    <LinkContainer to="/profile"><Button variant="secondary" size="sm">{store.login}</Button></LinkContainer>
                </ButtonGroup>
        );
    }
}

export default withRouter(UserProfileLink);
