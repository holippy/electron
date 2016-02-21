var ArticleStore = require('./_article-store');
var React = require('react');
var ReactDOM = require('react-dom');

var Article = React.createClass({

  getInitialState(){
    return {
      page: 20,
      data: []
    }
  },
  componentWillMount(){
    ArticleStore.dispatcher.addSubscribe({callback: this.dataloaded});
  },

  dataloaded(data){
    if(ArticleStore.storeData.data){
      this.replaceState({ data: ArticleStore.storeData.data });
    }
  },
  render(){

    if(this.state.data.length === 0){
      return false;
    }else{

      let lists = this.state.data.map((res)=>{
                  return <li key={res.id}><img src={res.images.thumbnail.url} /></li>;
                  
      });
      return (
        <ul>
          {lists}
        </ul>
      );
    }
  }
});


var topRender = ReactDOM.render(
  <Article/>,
  document.getElementById('LytContainer')
);

module.exports = Article;