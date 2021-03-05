import React, {Component} from "react";
import AppHeader from "../app-header/app-header.js";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter.js";
import PostList from "../post-list/post-list.js";
import PostAddForm from "../post-add-form/post-add-form.js";

import "./app.css";

export default class  App extends Component {
  constructor (props){
    super(props);
    this.state={
      data: [
        {
          label: "Going to learn React",
          important: true,
          id:1,
          like:false
        },
        {
          label: "That is so good",
          important: false,
          id:2,
          like:false
        },
        {
          label: "I need a break",
          important: false,
          id:3,
          like:false
        },
      ],
      term:'',
      filter:'all'

    };
    this.onToogleImportant=this.onToogleImportant.bind(this);
    this.onToogleLiked=this.onToogleLiked.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    
    this.maxId = 4;
  }

  deleteItem(id){
    this.setState(({data})=>{
      const index = data.findIndex(elem => elem.id === id);
      const before = data.slice(0,index);
      const after = data.slice(index+1);
      const newArr = [...before,...after];
      return{
        data:newArr
      }
     });
  }

  addItem(body){
    const newItem ={
      label:body,
      important:false,
      id: this.maxId++
    }
    this.setState(({data})=>{
      const newArr = [...data, newItem];
      return{
        data:newArr
      };
       
    });
  };
  onToogleImportant(id){
    this.setState(({data})=>{
      const index = data.findIndex(elem=>elem.id===id);
      const old = data[index];
      const newItem = { ...old,important:!old.important};//в newItem будет новый обьект , который унаследует все от старого и изменит свойство like
      const newArray = [...data.slice(0,index),newItem,...data.slice(index+1)]
      return{
        data:newArray
      };
    });
  }
  onToogleLiked(id){
    this.setState(({data})=>{
      const index = data.findIndex(elem=>elem.id===id);
      const old = data[index];
      const newItem = { ...old,like:!old.like};//в newItem будет новый обьект , который унаследует все от старого и изменит свойство like
      const newArray = [...data.slice(0,index),newItem,...data.slice(index+1)]
      return{
        data:newArray
      };
    });
  }

  searchPost(items,term){
    if(term.lenght===0){
      return items
    }

    return items.filter((item)=>{
      return item.label.indexOf(term) > -1
    });
  }

  filterPost(items,filter){
    if(filter==='like'){
      return items.filter(item=>item.like)
    }else{
      return items
    }  
  }

  onUpdateSearch(term){
    this.setState({term})
  }
  onFilterSelect(filter){
    this.setState({filter})
  }
  render(){
    const {data,term,filter} = this.state
      const liked = data.filter(item => item.like).length;
      const allPosts = data.length;

      const visiblePosts = this.filterPost(this.searchPost(data,term), filter);

    return (
      <div className="app">
        <AppHeader 
        liked={liked}
        allPosts={allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel 
          onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter 
          filter={filter}
          onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList 
        posts={visiblePosts}
        onDelete={this.deleteItem}
        onToogleImportant={this.onToogleImportant}
        onToogleLiked={this.onToogleLiked}/>
        <PostAddForm 
        onAdd={this.addItem}/>
      </div>
    );
  }
  
};

