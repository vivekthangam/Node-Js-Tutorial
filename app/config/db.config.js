const mongose = require("mongoose");

const connectDb = async () => {
  const con = await mongose.connect(process.env.MONGO_URL,{
      useNewUrlParser:true,
      useCreateIndex:true,
      useFindAndModify:false,
      useUnifiedTopology:true
  });
  console.log(`mongodb connected:${con.connection.host}`)
};


module.exports = connectDb;
