//https://protected-badlands-39940.herokuapp.com/posts

import {navbar} from './components/navbar.js';
import {append} from '../scripts/append.js'

let navbar_div = document.getElementById("navbar")

navbar_div.innerHTML = navbar ()

//append will need two thing 
//1. data  2.posts_div

let posts_div = document.getElementById("posts")
const getData = async (clicked_button,limit) => {
    // let res = await fetch('http://localhost:3000/posts')

    let res = await fetch(`https://protected-badlands-39940.herokuapp.com/posts`)

    let data = await res.json(); 
    //append(data,posts_div)
     createButtons(data.length,2)
}

 

 const getPaginatedData = async (clicked_button,limit) => {
    // let res = await fetch('http://localhost:3000/posts')

    let res = await fetch(`https://protected-badlands-39940.herokuapp.com/posts?_page=${clicked_button}&_limit=${limit}`)

    let data = await res.json(); 
    append(data,posts_div)
     //createButtons(data.length,2)
}
getData();
getPaginatedData(1, 2)



let buttons_div = document.getElementById("buttons")
const createButtons= (total_image, image_per_page)=>{
    const buttons = Math.ceil(total_image/image_per_page)

    for(let i=1; i<=buttons; i++){
        let btn = document.createElement("button");
        btn.id = i;
        btn.innerText=i;
        btn.onclick= () =>{
            //console.log(i)
            getPaginatedData(i, 2)
        }
        buttons_div.append(btn)
    }
    
};
//createButtons(data.length,2)

