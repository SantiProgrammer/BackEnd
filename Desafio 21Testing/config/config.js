import  dotenv  from 'dotenv';
dotenv.config();


export const config = {

    env: {
        port:  process.env.PORT
    }
}