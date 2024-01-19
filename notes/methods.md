
Here's a list of some of the most commonly used Mongoose methods and functions:

Model Creation and Interaction:

mongoose.model(): Create a Mongoose model.
Model.create(): Create and insert new documents.
Model.find(): Query for documents.
Model.findById(): Find a document by its _id.
Model.findOne(): Find one document matching a query.
Model.findByIdAndUpdate(): Find a document by _id and update it.
Model.findOneAndUpdate(): Find one document and update it.
Model.deleteOne(): Delete one document matching a query.
Model.deleteMany(): Delete multiple documents matching a query.
Model.countDocuments(): Count documents matching a query.
Model.updateOne(): Update one document matching a query.
Model.updateMany(): Update multiple documents matching a query.
Schema and Validation:

mongoose.Schema(): Define a Mongoose schema.
schema.path(): Access schema paths.
schema.virtual(): Define virtual properties.
schema.methods: Define instance methods.
schema.statics: Define static methods.
schema.pre(): Define middleware functions before a specific action.
schema.post(): Define middleware functions after a specific action.
Populating and Referencing:

Model.populate(): Populate fields in a document with references to other documents.
schema.Types.ObjectId: Data type for storing MongoDB ObjectIds.
schema.Types.Mixed: Data type for storing mixed data.
Validation and Middleware:

schema.validate(): Validate documents against the schema.
schema.pre(): Define middleware functions.
schema.post(): Define post-save middleware functions.
Indexes:

schema.index(): Define compound indexes.
Query Building:

query.find(): Define query conditions.
query.select(): Specify fields to return in the query result.
query.sort(): Sort query results.
query.limit(): Limit the number of documents returned.
query.skip(): Skip a specified number of documents.
query.populate(): Populate reference fields in the query result.