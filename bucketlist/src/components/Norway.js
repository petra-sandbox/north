import React, { Component } from 'react';

class Norway extends Component {

    state = {
        error: null,
        isLoaded: false,
        items: []
    };

componentDidMount() {
    fetch("https://spreadsheets.google.com/feeds/list/1Sc2_X6hUCPjU851rcHNCmJOh6JrrDnuTwlmBlCT-HhY/1/public/values?alt=json")
      .then(res => res.json())
      .then(
        //data => console.log(data.feed.entry));}
        (data) => {
          this.setState({
            isLoaded: true,
            items: data.feed.entry
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
}

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div><p className="centered">Loading...</p></div>;
        }
        else {
        //if (this.state.item.popular === "yes" ){*/
          return (
            <div id="popular">
            <h2 className="centered">Most popular places in Norway</h2>
            <div className="itemWrapper">
              {items.map(item => (
                <div className="item">
                <button className="addToListBtn"><i className="fas fa-plus-circle"></i>Add to my bucketlist</button>
                <img src={item.gsx$img.$t} alt={item.gsx$name.$t}/>
                <h3>{item.gsx$name.$t}</h3>
                <a href="#" className="greenBtn">Read more</a>
                </div>
              ))}
            </div>
            </div>
            );
          
        }
      }
}
    

export default Norway