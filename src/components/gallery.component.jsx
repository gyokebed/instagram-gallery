import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';

import './gallery.styles.scss';

const apiEndpoint = "http://sinembargo.test/wp-json/wp/v2/instagram-gallery";

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
    const { data: newPosts, headers } = await axios.get(`${apiEndpoint}?page=${pageNumber}&per_page=${items}`);

    this.setState({
      posts: [...posts, ...newPosts],
      pageNumber: pageNumber + 1,
      hasmore: pageNumber < headers["x-wp-totalpages"]
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Da click en la imagen para leer la nota</h2>
        <InfiniteScroll
          loadMore={this.fetchData.bind(this)}
          hasMore={this.state.hasmore}
          useWindow={true}
          loader={<div className="loader" key={0}>Cargando ...</div>}
          className='gallery-container'
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
      </React.Fragment>
    )
  }
}

export default Gallery;
