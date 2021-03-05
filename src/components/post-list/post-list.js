import React from 'react';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostListItem from '../post-list-item/post-list-item.js'

import './post-list.css';

const PostList = ({posts,onDelete,onToogleImportant,onToogleLiked})=>{

    const elements  = posts.map((item)=>{
        const {id,...itemProps}=item;
        return (
            
            <div key={id} className='list-group-item'>
                 <PostListItem {...itemProps}
                 onDelete={()=> onDelete(id)}
                 onToogleImportant={()=>onToogleImportant(id)}
                 onToogleLiked={()=>onToogleLiked(id)}/>
                {/* <PostListItem label={item.label} important={item.important}/> */}
                
            </div>
        )
    });

    return(
<ul className='app-list list-group'>
        {elements}
</ul>
    )
};

export default PostList;