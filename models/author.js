const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, max: 100 },
	family_name: { type: String, required: true, max: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function() {
	return `${this.family_name}, ${this.first_name}`;
});

AuthorSchema.virtual('year_of_birth').get(function() {
	return this.date_of_birth ? this.date_of_birth.getFullYear() : '';
});

AuthorSchema.virtual('year_of_death').get(function() {
	return this.date_of_death ? this.date_of_death.getFullYear() : '';
});

AuthorSchema.virtual('lifespan').get(function() {
	return `${this.year_of_birth} - ${this.year_of_death}`;
});

AuthorSchema.virtual('url').get(function() {
	return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
