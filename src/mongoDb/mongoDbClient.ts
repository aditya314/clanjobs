import mongoose from 'mongoose';

/**
 Source :
 https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js
 **/
// TODO Replace with this implementation https://www.section.io/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/
// https://sayasuhendra.github.io/graphql-js/4-connectors/
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // console.log('using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('DB promise was not found, creating DB promise');
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    cached.promise = await mongoose.connect(MONGODB_URI, opts);
  }
  try {
    console.log('Connecting to MongoDB... 🙏');
    cached.conn = await cached.promise;
  } catch (e) {
    console.log('Could not connect to DB. 😭');
  }
  if (cached.conn) {
    console.log('DB connection was successful!');
  }
  return cached.conn;
}

export default dbConnect;
