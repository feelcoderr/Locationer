import io from "socket.io-client";

const SOCKET_URL = "http://your-server-url";

const connect = () => {
  return io(SOCKET_URL);
};

export default {
  connect,
};
