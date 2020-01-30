require("dotenv").config();

const backend = process.env.REACT_APP_BACKEND;
const twitch_Client_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;

export { backend, twitch_Client_ID };

