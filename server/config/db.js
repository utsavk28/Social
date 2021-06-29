import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify:false
        });
        console.log('MongoDB Connected!!!');
    } catch (error) {
        console.log(error);

        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
