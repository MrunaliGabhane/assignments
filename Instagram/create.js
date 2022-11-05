import {navbar} from '../components/navbar.js';

let navbar_div = document.getElementById("navbar")

navbar_div.innerHTML = navbar ()

//1fcee6d5bb2290c06e96305785728322

//add event handler to create post button

let create_btn = document.getElementById('create_btn')
create_btn.onclick =  ()=>{
    //submiting a post server
    createPost()
};

//event handler for delete post button
let delete_btn=document.getElementById("delete_btn")
delete_btn.onclick = () => {
    deletePost()
}


//event handler for update post button
let update_btn=document.getElementById("update_btn")
update_btn.onclick = () => {
    updatePost()
}

//add event handler on select file input
let inp_image = document.getElementById("image")
inp_image.onchange = () =>{
    handleImage()
}

let image_url;
//function to get theurl for local images
const handleImage = async () => {
    //1. accept the file (image)
    let img = document.getElementById("image")

    //2.access the image data
    let actual_img = img.files[0]
    //console.log("actual_img:",actual_img)

    //construct function
    //3. imgbb is asking to send data in formdata object
    let form = new FormData()

    form.append('image',actual_img)


    //lets make the post request

    let res = await fetch(`https://api.imgbb.com/1/upload?key=1fcee6d5bb2290c06e96305785728322` , {
        method: "POST",
        body: form,
    });

    let data = await res.json();
    create_btn.disabled=false;
    //console.log('data:',data)

    image_url=data.data.display_url;
}


const createPost =async () => {
    //1. grab all the data
    let id = document.getElementById("id").value;
    let caption = document.getElementById("caption").value;

    //2. pack all data to be send in object
     let send_this_data = {
        id,
        caption,
        image_url,
     };


     //above data is accesible to whom? -> local;
     //is it supposed to be accessible to everyone => yes
     //where above data should go? -> serer (local server)

     //json-server package

     let res = await fetch(`https://protected-badlands-39940.herokuapp.com/posts`,{
        method:'POST',
        body:JSON.stringify(send_this_data),
        headers:{
            'Content-Type': 'application/json'
        },
     });
     let data = await res.json();
     
     reload();
     console.log("data:",data)
}



const deletePost = async () => {
    let delete_id = document.getElementById("delete_id").value;
     let res = await fetch (`https://protected-badlands-39940.herokuapp.com/posts/${delete_id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
     });
     let data = await res.json();
     reload();
     console.log("data:",data)
}



const updatePost = async () =>{

    try {
        
        let update_id=document.getElementById('update_id').value;
    let new_caption=document.getElementById('update_caption').value;

    let send_this_data = {
        caption:new_caption
    }

    let re = await fetch(`https://protected-badlands-39940.herokuapp.com/posts/${update_id}`,{
        method: "PATCH",
        body: JSON.stringify(send_this_data),

        headers:{
            'Content-Type':'application/json',
        },
    })

    let data=await res.json()
    console.log("data:",data)
    reload();


    } catch (error) {
        console.log("error:",error)
    }
    
}

function reload(){
    window.location.reload();
}



//CRUD
//create, read, update, delete
//addpost, getdata, 
//post, get , put and patch, delete