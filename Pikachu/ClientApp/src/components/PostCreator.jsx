import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
//import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import "../css/PostCreator.scss";
import ResizableTextarea from "./ResizableTextarea.jsx";

//@observer
class PostCreator extends React.Component {

    constructor(props){
        super(props);
        this.state = { clicked: false };
    }

    sumbitClick(){
        this.setState({ clicked: true });
    }

    handleSubmit(e){
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open("POST", '/api/post/add', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE){
                if (xhr.status === 200)
                    this.props.history.push("/last");
                else {
                    this.setState({ clicked: false });
                    alert("Ошибка какая-то!");
                }
            }
        }.bind(this);
        xhr.send(JSON.stringify({ "title": this.title, "text": this.text }));
    }

    render(){
        const store = this.props.store;
        return (
            <div className="creatorPanel">
                <Form onSubmit={(e)=>this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label className="white-label">Заголовок</Form.Label>
                        <Form.Control type="text" placeholder="Введите заголовок" onChange={(title)=>{ this.title = title.target.value }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="white-label">Текст поста</Form.Label>
                        <ResizableTextarea className="creatorPanel" onChange={(text)=>{ this.text = text.target.value }}/>
                    </Form.Group>
                    { this.state.clicked ?
                        <Button variant="secondary" type="submit" onClick={(e)=>this.sumbitClick(e)}>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                             Загрузка...
                        </Button>
                    :
                        <Button variant="secondary" type="submit" onClick={(e)=>this.sumbitClick(e)}>
                            Подтвердить
                        </Button>
                    }
                </Form>
            </div>
        );
    }
}

export default withRouter(PostCreator);
