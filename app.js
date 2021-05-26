const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fetch = require("node-fetch");

require('dotenv').config();

const app = express();

const filePath = "articles.json";

app.use(cors());
app.use(express.json());

app.post('/api/add', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let date = new Date();
  
  let month;
  if ((date.getMonth() + 1) < 10) {
    month = `0${date.getMonth() + 1}`
  } else {
    month = `${date.getMonth() + 1}`
  }

  let monthDay;
  if(date.getDate()<10){
    monthDay = `0${date.getDate()}`
  }else{
    monthDay = `${date.getDate()}`
  }

  const stringDate = `${date.getFullYear()}-${month}-${monthDay}`
  let currentDate = date.getTime();

  const articleTitle = req.body.articleTitle;
  const articleDescription = req.body.articleDescription;

  let newArticle = { title: articleTitle, article: articleDescription, stringDate: stringDate, date: currentDate };

  let fileContent = fs.readFileSync(filePath, "utf8");
  let articlesDATA = JSON.parse(fileContent);

  if (articlesDATA.length == 0) {
    newArticle.id = 1;
  } else {
    const id = Math.max.apply(Math, articlesDATA.map(i => i.id));
    newArticle.id = id + 1;
  }

  articlesDATA.push(newArticle);

  let data = JSON.stringify(articlesDATA);

  fs.writeFile("articles.json", data, (err) => {
    if (err) throw err;
    console.log("Article was added successfully");
  })

  res.send("add");
});



app.put("/api/articles", (req, res) => {

  if (!req.body) return res.sendStatus(400);

  const articleId = req.body.id;
  const articleTitle = req.body.title;
  const articleDescription = req.body.text;

  let data = fs.readFileSync(filePath, "utf8");
  const articles = JSON.parse(data);
  let article;
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].id == articleId) {
      article = articles[i];
      break;
    }
  }
  article

  if (article) {
    article.title = articleTitle;
    article.article = articleDescription;
    data = JSON.stringify(articles);
    fs.writeFileSync("articles.json", data);
    res.send(article);
  }
  else {
    res.status(404).send(user);
  }
});


app.get("/api/articles", function (req, res) {
  const content = fs.readFileSync(filePath, "utf8");
  const articles = JSON.parse(content);
  res.send(articles);
});


app.delete("/api/articles/:id", function (req, res) {

  const id = req.params.id;
  let data = fs.readFileSync(filePath, "utf8");
  let articles = JSON.parse(data);
  let index = -1;

  for (var i = 0; i < articles.length; i++) {
    if (articles[i].id == id) {
      index = i;
      break;
    }
  }
  if (index > -1) {

    const article = articles.splice(index, 1);
    data = JSON.stringify(articles);
    fs.writeFileSync("articles.json", data);

    res.send(article);
  }
  else {
    res.status(404).send();
  }
});

app.get("/api/articles/:id", (req, res) => {

  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const articles = JSON.parse(content);

  let article = null;

  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == id) {
      article = articles[i];
      break;
    }
  }

  if (article) {
    res.send(article);
  } else {
    res.status(404).send();
  }
});

app.get("/api/search/:date", (req, res) => {

  const date = req.params.date;
  const content = fs.readFileSync(filePath, "utf8");
  const articles = JSON.parse(content);

  let sortedArticles = [];
  let nothing = [];

  for (let i = 0; i < articles.length; i++) {
    if (articles[i].stringDate == date) {
      let item = articles[i]
      sortedArticles.push(item);
    }
  }

  if (sortedArticles.length > 0) {
    res.send(sortedArticles);
  } else {
    res.send(nothing);
  }
});

function dataToCategories(data, categories) {
  let obj = {};
  for (let i = 0; i <= categories.length; i++) {
    obj[categories[i]] = data[i]
  }
  return obj;
}

app.get("/api/news", (req, res) => {
  //let categories = ['sports','technology','science'];
  let categories = ['sports'];
  const api_key = process.env.API_KEY_NEWS;
  let requests = categories.map(category => fetch(`https://newsapi.org/v2/top-headlines?country=ru&category=${category}&apiKey=${api_key}`));

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => dataToCategories(data, categories))
    .then(result => res.send(result))

});

app.listen("3001", console.log(`Server started on port 3001`));