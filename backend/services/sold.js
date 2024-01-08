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

const bookmarkItem = async(req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    console.log('userId: ', userId);
    console.log('itemId: ', id);

    try {
        const item = await Item.findById(id);
        if (item.bookmarkedBy.includes(userId)) {
            item.bookmarkedBy.pull(userId);
        } else {
            item.bookmarkedBy.push(userId);
        }
        const savingRes = await item.save();

        if (!savingRes) {
            return res.status(400).json({ message: "Could not change bookmark status" });
        }

        return res.status(200).json(savingRes);
    } catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
}
module.exports = { markSold, deleteItem, bookmarkItem };