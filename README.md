# Serverless RSS Feed

A simple 30 minute serverless RSS Feed designed to be invokved by Slack's RSS Feed.

## Description

This bot is designed to scrape Google Web Search results for afr.com articles with the keyword "Deloitte" in the title and return them in a RSS Feed which will be consumed by Slack's Feed app.

## Getting Started

### Dependencies

* serverless
* axios
* feed

### Installing

* Create a [Google Custom Search](https://programmablesearchengine.google.com/), grab it's cx value.
* Create a [Google API Key](https://console.developers.google.com/apis/credentials) for Custom Search.
* Create an `.env` file and fill them with `GOOGLE_API_KEY` and `GOOGLE_CUSTOM_SEARCH_CX` environment variables.
* Run `npm install --prod` to install dependencies.
* Run `sls deploy` to deploy to AWS
* On Slack run `/feed subscribe {your-app-url}`

## Authors

Sam Chung - samchungy@gmail.com