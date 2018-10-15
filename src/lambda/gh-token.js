const qs = require("querystring");
const https = require("https");
require("dotenv").config();

exports.handler = function(event, context, callback) {
  const { code } = event.queryStringParameters;

  const data = qs.stringify({
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: code
  });

  const options = {
    host: "github.com",
    port: 443,
    path: "/login/oauth/access_token",
    method: "POST",
    headers: { "content-length": data.length }
  };

  let body = "";
  const req = https.request(options, res => {
    res.setEncoding("utf8");
    res.on("data", chunk => (body += chunk));
    res.on("end", () =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(qs.parse(body))
      })
    );
  });

  req.write(data);
  req.end();
  req.on("error", callback);
};
