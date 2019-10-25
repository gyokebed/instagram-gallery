import React from 'react';

const Item = ({ posts }) => {
  return (
    posts.map(post => (
      <a href={post.ACF.link_instagram} key={post.id}>
        <img
          alt={post.ACF.imagen_instagram.title}
          src={post.ACF.imagen_instagram.url}
        />
      </a>)
    )
  )
}
 
export default Item;