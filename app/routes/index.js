const todoRoutes = require("./todo.routes");
const messageRoutes = require("./message.routes");
const roomRoutes = require("./room.routes");
const userRoutes = require("./user.routes");

const groupRoutes = require("./group.routes");
const groupMemberRoutes = require("./groupMembers.routes");
const auth = require("./auth.routes")
    //@desc     Create rooms
    //@route    POST /api/v1/rooms
    //@access   Public
const createRoutes = app => {
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/todos", todoRoutes);
    app.use("/api/v1/rooms", roomRoutes);
    app.use("/api/v1/messages", messageRoutes);
    app.use("/api/v1/groups", groupRoutes);
    app.use("/api/v1/groupMember", groupMemberRoutes);
    app.use("/api/v1/auth", auth);
}

module.exports = createRoutes;