var data = [
  {id: 1, name: "Mahmud", age: 27, favourite: "cricket"},
  {id: 2, name: "Mahmud", age: 27, favourite: "cricket"},
  {id: 3, name: "Mahmud", age: 27, favourite: "cricket"},
  {id: 4, name: "Mahmud", age: 27, favourite: "cricket"},
  {id: 5, name: "Mahmud", age: 27, favourite: "cricket"},
  {id: 6, name: "Mahmud", age: 27, favourite: "cricket"}
];

var Comment = React.createClass({
  render: function(){
    return (
      <p>Name: {this.props.name} Age: {this.props.age}</p>
    );
  }
});

var CommentList = React.createClass({
  render: function(){
    var componentNodes = this.props.data.map(function(comment){
      return (
        <Comment name={comment.name} age={comment.age} key={comment.id}>{comment.favourite} </Comment>
      );
    });

    return (
      <div>{componentNodes}</div>
    );
  }
});


var CommentBox = React.createClass({
  getInitialState: function() {
    return {dataFromParent: []};
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({dataFromParent: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function(){
   return (
     <div>
       <div><h3>Comment box application</h3></div>
       <CommentList data={this.state.dataFromParent}/>
     </div>
   );
  }
});

ReactDOM.render(<CommentBox url="api/comments.json"/>, document.getElementById("content"));
