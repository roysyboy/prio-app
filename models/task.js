var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
	{
		name: { type: String, required: true, max: 50 },
		// comp_time: { type: Date, required: true },
		// due_date: { type: Date, required: true, default: Date.now() },
		importance: { type: Number, min: 1, max: 5 },
		urgency: { type: Number, min: 1, max: 5 },
		progress: { type: Number, min: 0, max: 100 }
	}
);

// Virtual for task's url
TaskSchema
.virtual('url')
.get(function() {
	return '/tasks/' + this.__id;
});

module.exports = mongoose.model('Task', TaskSchema);