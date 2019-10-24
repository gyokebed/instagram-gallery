import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';

const apiEndpoint = "http://sinembargo.test/wp-json/wp/v2/instagram-gallery";

class Gallery extends Component {
  state = {
    posts: [],
    page: 1,
    hasmore: true
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { posts, page } = this.state;
    const { data: newPosts, headers } = await axios.get(`${apiEndpoint}?page=${page}&per_page=8`);

    this.setState({
      posts: [...posts, ...newPosts],
      page: page + 1,
      hasmore: page < headers["x-wp-totalpages"]
    });
  }

  render() {
    return (
      <InfiniteScroll
        loadMore={this.fetchData.bind(this)}
        hasMore={this.state.hasmore}
        useWindow={true}
        loader={<div className="loader" key={0}>Cargando ...</div>}
      >
        {this.state.posts.map(post => (
          <a href={post.ACF.link_instagram} key={post.id}>
            <img
              alt={post.ACF.imagen_instagram.title}
              src={post.ACF.imagen_instagram.url}
            />
          </a>))
        }
      </InfiniteScroll>
    )
  }
}

export default Gallery;
