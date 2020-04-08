const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create comment schema
const commentsSchema = new Schema({
    
        discussion_id: {
                type: String,
        },
        posted: {
                type: Date, 
                default: new Date()
        },
        text: {
                type: String, 
                required: [true, 'The todo text field is required']
        }
        
});
module.exports = mongoose.model('comments', commentsSchema);
