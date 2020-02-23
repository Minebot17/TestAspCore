import ReactDOM from 'react-dom';
import React from 'react';
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import "../css/PostItem.scss";

@observer
class PostItem extends React.Component {

    render(){
        const store = this.props.store;
        return (
            <div className="postItemWrapper">
                <h3>{store.title}</h3>
                <p>{store.text}</p>
                <p>Rating: {store.rating}</p>
            </div>
        );
    }
}

export default withRouter(PostItem);
