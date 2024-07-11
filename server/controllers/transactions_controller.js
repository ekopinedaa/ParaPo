const Transactions = require("../model/transactions_model");
const ExtraCharge = require("../model/extracharge_model");

const TransactionsController = {
    updateExtraCharge: async (req, res) => {
        const { ECID, amount } = req.body;
        try {
            const updatedExtraCharge = await ExtraCharge.findOneAndUpdate(
              { ECID },
              { amount },
              { new: true, runValidators: true }
            );
        
            if (!updatedExtraCharge) {
              return res.status(404).json({ success: false, message: 'Extra Charge not found' });
            }
        
            res.status(200).json({ success: true, data: updatedExtraCharge });
          } catch (error) {
            console.error('Error updating extra charge:', error.message);
            res.status(500).send('Server Error');
          }
    },
    getExtraCharge: async (req, res) => {
        const { ECID } = req.params;
        try {
            const extraCharge = await ExtraCharge.findOne({ ECID });
        
            if (!extraCharge) {
              return res.status(404).json({ success: false, message: 'Extra Charge not found' });
            }
        
            res.status(200).json({ success: true, data: extraCharge });
          } catch (error) {
            console.error('Error fetching extra charge:', error.message);
            res.status(500).send('Server Error');
          }
    },
    

}

module.exports = TransactionsController;