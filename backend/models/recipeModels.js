import mongoose from 'mongoose';


const recipeSchema= new mongoose.Schema({
title: String,
image:{
  src:String,
  alt: String
},
description:String,
difficulty: String,
category:String,
area:String,
nbrPerson:Number,
author: String,
healthy: Boolean,
ingredients: [{
  ingName: String,
  quantity: Number,
  unit: String
  }],
  
  steps: String,
  time: Number
},
{timestamps: true})

// Conversion de mon schema model
const Recipe= mongoose.model('Recipe', recipeSchema)

export default Recipe;