var Dispatcher = require('flux').Dispatcher;
var $ = require('jQuery');
var ArticleStore = {};

//dispatcher classを作成
ArticleStore.dispatcher = new Dispatcher();

//sortData定義
ArticleStore.storeData = {
  data: null
};

//storePager
ArticleStore.storePager = {
  data: null
};

//subscriber用配列定義
ArticleStore.dispatcher.subscriber = [];

//action定義
ArticleStore.dispatcher.action = {
  dispatch(payload, data, boolean){
    ArticleStore.dispatcher.dispatch({
      actionType: payload.actionType,
      page: payload.page,
      data: data,
      callback: payload.callback
    });
  },
  getData(){

  },
  create(payload){
    var that = this;
    var xhr = $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=281020922.4bc370c.675847a199e0424890e6e6a65214a232',
        type: 'GET',
        data: {'count': payload.page},
        crossDomain: true,
        cache: false,
        dataType: 'json',
      statusCode: {
      }
    });

    xhr.done((data )=>{
      this.dispatch(payload, data, 'false');
    });
  }
}

//subscriberにコールバックを追加
ArticleStore.dispatcher.addSubscribe = ( callback )=>{
  ArticleStore.dispatcher.subscriber.push( callback.callback );
}

//subscriberに追加したコールバックを実行しコンポーネントに通知
ArticleStore.dispatcher.publish = (data)=>{
  for (var i = 0; i < ArticleStore.dispatcher.subscriber.length; i++) {
    ArticleStore.dispatcher.subscriber[i](data);
  };
}

//storeData
ArticleStore.storeData.dispatchToken = ArticleStore.dispatcher.register(function(payload) {
  ArticleStore.storeData.data = payload.data.data;

});

//storePager
ArticleStore.storePager.dispatchToken = ArticleStore.dispatcher.register(function(payload) {
  ArticleStore.dispatcher.waitFor([ArticleStore.storeData.dispatchToken]);
  ArticleStore.storePager.data = payload.data.data;
  ArticleStore.storePager.page = payload.page;
  ArticleStore.dispatcher.publish();
});

module.exports = ArticleStore;