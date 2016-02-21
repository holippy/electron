var ArticleStore = require('./_article-store');
var React = require('react');
var ReactDOM = require('react-dom');

var Pager = React.createClass({

  getInitialState(){
    return {
      page: 0,
      data: []
    }
  },

  componentWillMount(){
    ArticleStore.dispatcher.addSubscribe({callback: this.dataloaded});
    this.actionCreator();
  },
  actionCreator(){
    ArticleStore.dispatcher.action.create({
      actionType: 'pager',
      page: this.state.page + 4,
      callback: this.dataloaded
    });
  },
  dataloaded(data){

    if(ArticleStore.storePager.data){
      this.replaceState({
        data: ArticleStore.storePager.data,
        page: ArticleStore.storePager.page,
       });
    }
  },
  render(){

    if(this.state.data.length === 0){
      return false;
    }else{
      return (
        <p onClick={this.actionCreator} >Load More</p>
      );
    }
  }
});


var topRender = ReactDOM.render(
  <Pager/>,
  document.getElementById('LytPager')
);

module.exports = Pager;