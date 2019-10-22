import React, { Component } from "react";
import axios from "axios";

const apiEndpoint = "http://sinembargo.test/wp-json/wp/v2/instagram-gallery";

class Gallery extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  render() {
    return this.state.posts.map(post => (
      <a href={post.ACF.link_instagram} key={post.id}>
        <img
          alt={post.ACF.imagen_instagram.title}
          src={post.ACF.imagen_instagram.url}
        />
      </a>
    ));
  }
}

export default Gallery;
