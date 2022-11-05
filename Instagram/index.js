//https://protected-badlands-39940.herokuapp.com/posts

import {navbar} from './components/navbar.js';
import {append} from '../scripts/append.js'

let navbar_div = document.getElementById("navbar")

navbar_div.innerHTML = navbar ()

//append will need two thing 
//1. data  2.posts_div

let posts_div = document.getElementById("posts")
const getData = async () => {
    // let res = await fetch('http://localhost:3000/posts')

    let res = await fetch('https://protected-badlands-39940.herokuapp.com/posts')

    let data = await res.json(); 
    append(data,posts_div)
}

getData();