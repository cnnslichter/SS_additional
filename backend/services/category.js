const Item = require('../models/Item');

// const getItems = async (req, res) => {
//     Item.find()
//       .then(items => res.json(items))
//       .catch(err => res.json(err))
//   }
const getItems = async(req, res) => {
    try {
        const items = await Item.find();
        console.log(items);
        return res.json(items)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error');
    }
}

const getTextbooks = async (req, res) => {
    console.log('Why is this not working');
    try {
        console.log('called getTextbooks service');
        const textbooks = await Item.find({ category: "Textbooks" });
        return res.json(textbooks);


    } catch (error) {
        console.error(error);
        return res.status(500).send('Error');
    }
}

// const getTextbooks = (req, res) => {
//     Item.find({ category: "Textbooks" })
//       .then(items => res.json(items))
//       .catch(err => res.json(err))
//   }

const getClothes =  (req, res) => {
    Item.find({ category: "Clothes" })
      .then(items => res.json(items))
      .catch(err => res.json(err))
  }

const getGeneralDecor =  (req, res) => {
    Item.find({ category: "General Decor" })
      .then(items => res.json(items))
      .catch(err => res.json(err))
  }

const getFurniture =  (req, res) => {
    Item.find({ category: "Furniture" })
      .then(items => res.json(items))
      .catch(err => res.json(err))
  }

const getAppliances =  (req, res) => {
    Item.find({ category: "Appliances" })
      .then(items => res.json(items))
      .catch(err => res.json(err))
  }

const getTickets =  (req, res) => {
    Item.find({ category: "Tickets" })
      .then(items => res.json(items))
      .catch(err => res.json(err))
  }

const getOther =  (req, res) => {
    Item.find({ category: "Other" })
      .then(items => res.json(items))
      .catch(err => res.json(err))
  }

module.exports = {
    getItems,
    getTextbooks,
    getClothes,
    getGeneralDecor,
    getFurniture,
    getAppliances,
    getTickets,
    getOther
}