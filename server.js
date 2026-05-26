const app = require('./src/app.js')
const connectToDB = require('./src/config/connectTodb.js');

connectToDB();

const port = process.env.PORT || 4000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});