var ArticleStore = require('./_article-store');
var React = require('react');
var ReactDOM = require('react-dom');

var Article = React.createClass({

  componentWillMount(){
    this.data = 0;
    ArticleStore.dispatcher.addSubscribe({callback: this.dataloaded});

    console.log(this.render());

    //this.actionCreator();
  },
  actionCreator(){
    ArticleStore.dispatcher.action.create({
      actionType: 'contents',
      page: 1,
      callback: this.dataloaded
    });
  },
  dataloaded(data){
    

  },
  render(){
    console.log(this.data);
    if(this.data !== 0 ){
      return false;
    }else{
      return(
        <p onClick={this.actionCreator}>text text</p>
      );
    }
  }
});



ReactDOM.render(
  <Article/>,
  document.getElementById('LytContainer')
);

module.exports = Article;