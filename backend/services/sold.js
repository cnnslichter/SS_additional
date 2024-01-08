const Item = require('../models/Item');

const markSold = async (req, res) => {
    try {
        console.log('mark sold called');
        const result = await Item.findByIdAndUpdate(req.params.id, { sold: true });

        if (!result) {
            res.status(404).send('No item to be marked sold found');
        }

        res.status(200).send('Item marked sold');
    } catch (error) {
        console.error(error);
    }
}

const deleteItem = async (req, res) => {
   try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (!result) {
        res.status(404).send('No item to be deleted found');
    }
    res.status(200).send('Item deleted');
   } catch (error) {
    console.error(error);
   }
}

module.exports = { markSold, deleteItem };