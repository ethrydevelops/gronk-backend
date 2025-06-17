let io;

const setSocketInstance = (socketInstance) => {
    io = socketInstance;
};

const getSocketInstance = () => {
    if (!io) {
        throw new Error('Socket.IO instance not initialized');
    }
    return io;
};

module.exports = { setSocketInstance, getSocketInstance };