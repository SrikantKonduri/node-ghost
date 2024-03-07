

const express = require('express')
const axios = require('axios')
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config()

const app = express()
const URL = process.env.GHOST_API_URL
const KEY = process.env.GHOST_API_KEY
const NODE_PORT = process.env.NODE_PORT


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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
               "published_data": element.published_data,
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

app.get('/populate', async (req, res) => {

   supabase.from('blogs').select(`
      blog_id`)
      .then(resp => {
         console.log('resp', resp)
      })
      .catch(err => res.status(404).json({ "data": "Not found" }))
   console.log('populating')

   // let { data: blogs, error } = await supabase
   //    .from('blogs')
   //    .select('*')
   
   //    console.log(blogs,error)

})

app.listen(NODE_PORT, () => {
   console.log(`Server listing at ${NODE_PORT}`)
})