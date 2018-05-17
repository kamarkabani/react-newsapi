import React, { Component } from 'react';
import Article from '../components/Article';
import { Dropdown } from 'semantic-ui-react'

var teststring = "av";
const friendOptions = [
  {
    text: 'Goteborgs-Posten',
    value: 'goteborgs-posten',
    image: { avatar: true, src: 'http://s3.reutersmedia.net/resources_v2/images/favicon/favicon-96x96.png' },
  },
  {
    text: 'Aftenposten',
    value: 'aftenposten',
    image: { avatar: true, src: 'http://www.dailymail.co.uk/apple-touch-icon.png' },
  },
  {
    text: 'Svenska Dagbladet',
    value: 'svenska-dagbladet',
    image: { avatar: true, src: 'https://assets.svd.se/assets/assets/images/framework/svd-logo_extended.svg' },
  },
  
];

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      token: 'c4f3316cadde48cab6cfa6116f868d31',
      sortBy: 'latest',
      source: 'buzzfeed',
      articles: [],
      author: "me",
    }

    this.getArticles = this.getArticles.bind(this);
  }

  handleChange = (e, { value }) => {
    this.setState({ articles: [] });
    this.setState({ source: value }, this.getArticles);
  };

  componentDidMount() {
    this.getArticles()
  }

  getArticles(){
    fetch(`https://newsapi.org/v2/top-headlines?sources=${this.state.source}&apiKey=c4f3316cadde48cab6cfa6116f868d31`)
    .then( (response) => response.json())
    .then( (json) => this.setState({articles: json.articles}));
  }

  render() {
    return (

      <div className="container">
        <div className="top">
          Visa mig artiklar av
          {' '}
          <Dropdown
            inline
            defaultValue={this.state.source}
            onChange={this.handleChange}
            options={friendOptions}
            defaultValue={friendOptions[0].value}
          />
        </div>
        <div className="articles">
          {
            this.state.articles.length ? this.state.articles.map((item, index)=>{
              return <Article
                key={index}
                title={item.title}
                author={item.author}
                idr={item.id}
                text={item.description}
                url={item.url}
                image={item.urlToImage ? item.urlToImage : 'http://placehold.it/250'}
              />
            }) : <Article />
          }
        </div>
      </div>

    );
  }

}
