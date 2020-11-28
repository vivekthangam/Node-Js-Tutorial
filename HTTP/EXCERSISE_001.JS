const http = require("http");

const todo = [
    { id: 1, text: "todoOne" },
    { id: 2, text: "todoTwo" },
    { id: 3, text: "todoThree" },
];
const server = http.createServer((req, res) => {
    processMethod(req, res);
});

const processMethod = (req, res) => {


    let body = [];
    req
        .on("data", (chunck) => {
            body.push(chunck);
        })
        .on("end", () => {
            let status = 400;
            let { method, url } = req;

            let response = {
                success: false,
                data: null,
                error: null
            };

            body = Buffer.concat(body).toString();
            console.log(body);


            if (method === "GET" && url === '/todos') {
                status = 200;
                response.success = true;
                response.data = todo;
            } else if (method === "POST" && url === "/todos") {
                let { id, text } = JSON.parse(body);
                console.log(id, text)
                if (!id || !text) {
                    status = 400;
                    response.error = "Bad Request"
                } else {

                    todo.push({ id, text });
                    status = 201;
                    response.success = true;
                    response.data = todo;
                }
            }
            res.writeHead(status, {
                "content-type": "apllication/json",
                "x-powerd-by": "node js",
            });
            res.end(
                JSON.stringify(response)
            );
        });
    // console.log(req.headers.authorization);

};
const sendResponse = (req, res) => {
    const { headers, url, method } = req;
    res.setHeader("content-type", "apllication/json");
    res.setHeader("x-powerd-by", "node js");
    console.log(headers, url, method);
    res.end(
        JSON.stringify({
            success: true,
            data: todo,
        })
    );
};

const send400Response = (req, res) => {
    req.statusCode = 400;
    res.writeHead(400, {
        "content-type": "apllication/json",
        "x-powerd-by": "node js",
    });
    //same as above
    // res.setHeader("content-type","apllication/json");
    // res.setHeader("x-powerd-by","node js")

    res.end(
        JSON.stringify({
            success: false,
            error: "Bad Request",
            data: null,
        })
    );
};

const authorization = (req, res) => {
    req.statusCode = 200;
    res.writeHead(200, {
        "content-type": "apllication/json",
        "x-powerd-by": "node js",
    });
    console.log(req.headers.authorization);
    res.end(
        JSON.stringify({
            success: true,

            data: todo,
        })
    );
};

const getDatafromRequest = (req, res) => {
    req.statusCode = 200;
    res.writeHead(200, {
        "content-type": "apllication/json",
        "x-powerd-by": "node js",
    });
    let body = [];
    req
        .on("data", (chunck) => {
            body.push(chunck);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();
            console.log(body);
        });
    console.log(req.headers.authorization);
    res.end(
        JSON.stringify({
            success: true,

            data: todo,
        })
    );
};
const send404Response = (req, res) => {
    req.statusCode = 404;
    res.writeHead(404, {
        "content-type": "apllication/json",
        "x-powerd-by": "node js",
    });
    //same as above
    // res.setHeader("content-type","apllication/json");
    // res.setHeader("x-powerd-by","node js")

    res.end(
        JSON.stringify({
            success: false,
            error: "not found",
            data: null,
        })
    );
};
const port = 5000;
server.listen(port, () => console.log(`server running on ${port}`));