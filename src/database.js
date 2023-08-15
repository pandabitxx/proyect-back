import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://pandabitxx:pandabitxxMongoDb@cluster0.euczinz.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
})

    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

    

