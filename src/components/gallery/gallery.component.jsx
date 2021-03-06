import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

import Item from "../item/item.component";

import logo from "../../logo.svg";
import "./gallery.styles.scss";

const apiEndpoint = "https://www.sinembargo.mx/wp-json/wp/v2/instagram-gallery";
const timeStamp = new Date().getTime();

class Gallery extends Component {
  state = {
    posts: [],
    pageNumber: 1,
    items: 8,
    hasmore: true
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { posts, pageNumber, items } = this.state;
    const { data: newPosts, headers } = await axios.get(
      `${apiEndpoint}?page=${pageNumber}&per_page=${items}&${timeStamp}`
    );

    this.setState({
      posts: [...posts, ...newPosts],
      pageNumber: pageNumber + 1,
      hasmore: pageNumber < headers["x-wp-totalpages"]
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <InfiniteScroll
        loadMore={this.fetchData.bind(this)}
        hasMore={this.state.hasmore}
        useWindow={true}
        loader={
          <div className="loader" key={0}>
            <div class="lds-default">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        }
        className="container"
      >
        <div className="header">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
          </div>
          <h3>Da click en la imagen para leer la nota</h3>
        </div>

        <div className="items-container">
          <Item posts={posts} />
        </div>
      </InfiniteScroll>
    );
  }
}

export default Gallery;
