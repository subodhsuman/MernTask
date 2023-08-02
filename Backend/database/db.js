import mongoose from 'mongoose';
const ConnetDB = async () => {
    try {
        await mongoose.connect(process.env.url, { useNewUrlParser: true });
        console.log("Databse connected");
    } catch (error) {
        console.log(error);
    }

}


export default ConnetDB;
