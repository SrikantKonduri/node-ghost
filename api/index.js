const express = require('express')
const axios = require('axios')
const cors = require('cors');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config()

const app = express()
app.use(cors());
const URL = process.env.GHOST_API_URL
const KEY = process.env.GHOST_API_KEY
const NODE_PORT = process.env.NODE_PORT


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const searchByID = (req, res, id) => {
   const url = `http://${URL}/ghost/api/content/posts/${id}/?key=${KEY}`
   axios.get(url)
      .then(resp => {
         console.log('resp', resp.data)
         let res_obj = {}
         res_obj["id"] = resp.data.posts[0].id
         res_obj["title"] = resp.data.posts[0].title
         res_obj["content"] = resp.data.posts[0].html
         res_obj["published_date"] = resp.data.posts[0].published_at
         res_obj["summary"] = resp.data.posts[0].excerpt
         res.status(200).json({ 'data': [res_obj] })
      })
      .catch(err => {
         console.log(`Error: ${err}`)
         res.status(404).json({
            "data": "Not found"
         })
      })
}

const searchByTitle = (req, res, title) => {
   const url = `http://${URL}/ghost/api/content/posts/?key=${KEY}`

   axios.get(url)
      .then(response => {
         console.log('Response:', response.data);
         const res_data = response.data.posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()));
         console.log('filtered', res_data)
         let data = []
         if (res_data.length != 0) {
            res_data.forEach(post => {
               let temp = {}
               temp["id"] = post.id
               temp["title"] = post.title
               temp["content"] = post.html
               temp["published_date"] = post.published_at
               temp["summary"] = post.excerpt
               data.push(temp)
            })
         }
         res.status(200).json({
            "data": data
         })
      })
      .catch(err => {
         console.log(`Error: ${err}`)
         res.status(404).json({
            "data": "Not found"
         })
      })

}

/*************************************** 
GET for /blogs -> Sends response in the following format
{
   data:[
      {
         id:
         title:
         content:
         published_data:
         summary
      }
   ]
}

***************************************/

app.get('/blogs', async (req, res) => {
   const url = `http://${URL}/ghost/api/content/posts/?key=${KEY}`

   axios.get(url)
      .then(response => {
         console.log('Response:', response.data);
         let data = []
         response.data.posts.forEach(element => {
            let temp = {
               "id": element.id,
               "title": element.title,
               "content": element.html,
               "published_date": element.published_at,
               "summary": element.excerpt
            }
            data.push(temp)
         });
         res.status(200).json({
            "data": data
         })
      })
      .catch(err => {
         console.log(`Error: ${err}`)
         res.status(404).json({
            "data": "Not found"
         })
      })

})

/* app.get('/populate', async (req, res) => {

   supabase.from('blogs').select(`
      *`)
      .then(resp => {
         console.log('resp', resp)
      })
      .catch(err => res.status(404).json({ "data": "Not found" }))
   console.log('populating')

   // let { data: blogs, error } = await supabase
   //    .from('blogs')
   //    .select('*')
   
   //    console.log(blogs,error)

}) */


app.get('/blogs/search', async (req, res) => {
   let id = req.query.id
   let title = req.query.title

   console.log(title, id)
   console.log(title == undefined, id == undefined)
   if (title == undefined || id == undefined) {
      if (id != undefined) {
         searchByID(req, res, id)
      }
      else {
         searchByTitle(req, res, title)
      }
   }
   // console.log(`Blog ID URL: ${url}`)
});

app.get('/blogs/search/recent', async (req, res) => {
   const url = `http://${URL}/ghost/api/content/posts/?key=${KEY}`
   const currentDate = new Date();
   const lastWeekDate = new Date(currentDate);
   lastWeekDate.setDate(currentDate.getDate() - 7);
   console.log(`last week`, lastWeekDate)
   console.log(`current date`, currentDate)
   axios.get(url)
      .then(response => {
         // console.log('Response:', response.data);
         const res_data = response.data.posts.filter(post => {
            const publishedDate = new Date(post.published_at);
            const isPublishedLastWeek = publishedDate >= lastWeekDate && publishedDate <= currentDate;
            return isPublishedLastWeek;
         });

         let data = []
         if (res_data.length != 0) {
            res_data.forEach(post => {
               let temp = {}
               temp["id"] = post.id
               temp["title"] = post.title
               temp["content"] = post.html
               temp["published_date"] = post.published_at
               temp["summary"] = post.excerpt
               data.push(temp)
            })
         }
         res.status(200).json({
            "data": data
         })
      })
      .catch(err => {
         console.log(`Error: ${err}`)
         res.status(404).json({
            "data": "Not found"
         })
      })
});

app.listen(NODE_PORT, () => {
   console.log(`Server listing at ${NODE_PORT}`)
})