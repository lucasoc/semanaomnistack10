const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {

  async update(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    const { id } = request.params;
    const _id = id;
    console.log(request)

    let dev = await Dev.findOne({ _id });
    
    if(dev){
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.updateOne({_id},{
        techs: techsArray,
        location,
      });
      return response.json("Dev Updated");
    } else {
      return response.json('Dev not found');
    }
  },

  async destroy(request, response) {
    const { id } = request.params;
    const _id = id

    let dev = await Dev.findOne({_id})

    if(dev) {
      await Dev.deleteOne({_id});
      return response.json('Dev deleted')
    } else {
      return response.json('Dev not found')
    }
    
  },

  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
  const { github_username, techs, latitude, longitude } = request.body

  let dev = await Dev.findOne({ github_username });

  if(!dev){
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
    const { name = login, avatar_url, bio } = apiResponse.data;
  
    const techsArray = parseStringAsArray(techs);
  
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
  
    dev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });
    
    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray,
    )
    sendMessage(sendSocketMessageTo, 'new-dev', dev);
  }

  return response.json(dev);

  }
}
