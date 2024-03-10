### Node Ghost
---

* Please find working demo [here](https://youtu.be/XZg_NTeuRuo)
### API Overview

* For API documentation please visit [Ghost Blog API ](https://documenter.getpostman.com/view/27033319/2sA2xfZZ1v)
* JSON structure representing the blog.

```json
   {
      "data": [
      {
         "id": "65e940a8a8f0a31b0f79d115",
         "title": "What is Data Foundation?",
         "content": " The Data Foundation will host a library of dig
         ital data, and will encompass the technology-platform, infr
         astructure and manpower to collect, create, curate, annotate, 
         secure and deploy it. It will be a major resource for the technology community",
         "published_date": "2024-03-07T04:21:55.000+00:00",
         "summary": "This is some summary of the blog"
         },
      ]
   }
```


---
### Instructions to run the application

---
#### Prerequisites

* Make sure ghost engine is installed in your machine.
* Please visit [here](https://ghost.org/docs/install/) for installing ghost engine into your machine.
* Run ghost engine locally using `ghost start` and verifying running status by command `ghost ls`
##### Ingesting sample posts

* Go to `localhost:2368/ghost` create account and add sample blogs.
* Get the Ghost Content API key and insert into `api/.env` and set `GHOST_API_KEY` variable and also add appropriate `GHOST_API_URL`.
* By default node API runs at `7070` if it is not idle it can be changed in `api/.env` file by `NODE_PORT` variable.

---
#### Running API

* Open terminal and navigate to `api` directory 
* Run `npm install` to make sure all necessary modules in `package.json` are present.
* Run `node index.js` ideally it shows **Server listing at 7070**

#### Running Client

* Open terminal and navigate to `client` directory
* Run `npm install` to make sure all necessary modules in `package.json` are present.
* Run `npm run dev` and the client runs at port `5173`.
* Blogs can be accessed using the UI elements.

---
