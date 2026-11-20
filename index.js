const express = require('express');

const {PrismaClient} = require('@prisma/client');

const Prisma = new PrismaClient();

// create a instance of http server
const app=express();

app.use(express.json());

// URL - http://localhost:3000/

app.get("/",(req,res) =>{
    res.send("The API is working")
})

// API 1 - get => http//:localhost:3000/restaurants --> return all Restaurants

app.get("/restaurants",async(req,res)=>{
    // data from frontend

    // db logic
    const db_data = await Prisma.restaurant.findMany()

    // send data to frontend
    res.send(db_data)
})
// API 2 - get => http//:localhost:3000/restaurants --> return all Restaurants

app.post("/restaurants",async (req,res)=>{
    // 1.get data from frontend
     const data = req.body

     console.log(data)
    // 2. db logic
    const new_data= await Prisma.restaurant.create({
        data:{
            id:data.id,
            restaurant_id: data. restaurant_id,
            image_url: data.image_url,
            title: data.title,
            rating: data.rating,
            tag:data.tag
        }
    })

 
    // 3. send data to frontend
    res.send(new_data)

})

// API 3 - get => http//:localhost:3000/ --> return all Restaurants
app.put("/restaurants",async(req,res)=>{
// 1.data from frontend
const data = req.body;

console.log(data)

// 2. db logic
const updated_data=await Prisma.restaurant.update({
    where:{
        restaurant_id : data.restaurant_id
    },
    data:{ 
        id:data.id,
        restaurant_id: data. restaurant_id,
        image_url: data.image_url,
        title: data.title,
        rating: data.rating,
        tag:data.tag

    }
})

// 3.send data to frontend
res.send(updated_data)
})

// API 4 - get => http//:localhost:3000/ --> return all Restaurants
app.delete("/restaurants",async(req,res)=>{
    // 1.data from frontend
const data=req.body

    // 2. db logic
 await Prisma.restaurant.delete({
    where :{
        restaurant_id : data.restaurant_id
    }
})
    // 3. send data to frontend

     res.send("restaurant deleted")
})


app.listen(3000)

