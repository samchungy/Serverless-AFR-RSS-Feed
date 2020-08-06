'use strict';
const {Feed} = require('feed');
const {default: axios} = require('axios');

module.exports.handler = async event => {
  const feed = new Feed({
    title: "Sam Chung's Awesome AFR Feed",
    description: "Feed for Deloitte articles on afr.com",
    link: 'https://' + event.headers.Host + event.resource,
    id: "afr",
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    copyright: "All rights reserved 2020, Sam Chung",
  });
  
  const agent = axios.create({
    baseURL: "https://www.googleapis.com/customsearch/v1/"
  })

  //Google free tier restricts each to 100 a day. Slack calls RSS once every 10 minutes = 144/day
  //Since we are only getting data from 1 site, just switch between APIs.
  const url = new Date().getHours() < 12 ? "/siterestrict" : "/"
  const res = await agent.get(url, {params: {
    key: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_CUSTOM_SEARCH_CX,
    q: "intitle:deloitte",
    sort: "date"
  }}).catch(error => {
    console.error(error);
    throw error;
  });

  //Format Google data for RSS Feed
  if (res.data && res.data.items && res.data.items.length){
    const results = res.data.items;
    results.forEach((result) => {
      if(result.pagemap.metatags.length && result.pagemap.metatags[0]['article:published_time']){
        const description = result.pagemap.metatags[0]['og:description'];
        const date = new Date(result.pagemap.metatags[0]['article:published_time'])
        feed.addItem({
          title: result.title,
          link: result.link,
          date,
          description: description ? description : result.snippet,
        });
      } 
    });
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
    body: feed.rss2()
  };
};
