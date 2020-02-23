import ReactDOM from 'react-dom';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { observer } from "mobx-react";
import { withRouter, Redirect } from "react-router-dom";
import "../css/PostList.scss";
import PostItem from "./PostItem.jsx";
import PostItemStore from "../stores/PostItemStore.jsx";

@observer
class PostList extends React.Component {
    static defaultProps = { itemsOnPage: 3 }

    constructor(props){
        super(props);
        this.props = props;
        this.props.store.setType("last");
    }

    changePage(e){
        this.props.store.setPage(e.target.text - 1);
    }

    render(){
        const loc = this.props.location.pathname.split("/");
        if (loc[loc.length - 1] == "")
            return <Redirect to="/last"/>

        const store = this.props.store;
        const posts = this.props.store.posts;
        const max = this.props.itemsOnPage;

        let items = [];
        for (let number = 1; number <= Math.ceil(posts.length/max); number++) {
            items.push(
                <Pagination.Item key={number} active={number === (store.page + 1)} bg="dark" variant="dark" onClick={(e)=>this.changePage(e)}>
                {number}
                </Pagination.Item>,
            );
        }

        return (
            <div className="postsWrapper">
                {
                    posts.length != 0 ? posts.slice(store.page*max, (posts.length < store.page*max + max ? posts.length : store.page*max + max)).map(function(value, index){
                        return <PostItem key={value.idpost} store={ new PostItemStore().setAll(value.idpost, value.title, value.rating, value.text, value.date) }/>
                    }) : null
                }
                <Pagination bg="dark" variant="dark" className="postsPagination">{items}</Pagination>
            </div>
        );
    }
}

export default withRouter(PostList);
