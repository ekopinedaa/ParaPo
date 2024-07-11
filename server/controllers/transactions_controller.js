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
              return res.status(404).json({ success: false, message: 'Extra charge not found UpdateExtraCharge' });
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
              return res.status(404).json({ success: false, message: 'Extra Charge not found GetExtraCharge' });
            }
        
            res.status(200).json({ success: true, data: extraCharge });
          } catch (error) {
            console.error('Error fetching extra charge:', error.message);
            res.status(500).send('Server Error');
          }
    },

    addExtraCharge: async (req, res) => {
        try {
            const { amount } = req.body;

            if (!amount) {
                return res.status(400).json({ success: false, message: 'Amount is required' });
            }

            // Get the highest ECID
            const highestECID = await ExtraCharge.findOne().sort('-ECID');
            const newECID = highestECID ? highestECID.ECID + 1 : 1;

            const newExtraCharge = new ExtraCharge({
                ECID: newECID,
                amount: amount
            });

            const savedExtraCharge = await newExtraCharge.save();

            res.status(201).json({
                success: true,
                message: 'Extra charge added successfully',
                data: savedExtraCharge
            });
        } catch (error) {
            console.error('Error adding extra charge:', error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    }


}

module.exports = TransactionsController;