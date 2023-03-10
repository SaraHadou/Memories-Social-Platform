import mongoose from 'mongoose';

import postMessage from '../models/postMessage.js';


export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message : error.message });
  }
}


export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ Message: error.Message });
  }
}


export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No post with that id');
  const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost);
}


export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No post with that id');
  await postMessage.findByIdAndDelete(_id);
  res.json({ message: 'Posst deleted successfully' });
}


export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No post with that id');
  const post = await postMessage.findById(_id);
  const updatedPost = await postMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
  res.json(updatedPost);
}