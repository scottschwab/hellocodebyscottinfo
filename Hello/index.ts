import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { router, express } from "express";

const app = express();
const port = 80;

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  console.log("hey anybody");
  const name = req.query.name || (req.body && req.body.name);

  if (name) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Hello " + (req.query.name || req.body.name)
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }
};

// google-site-verification=ZkUSn1hjfEiYE25RnclfdLtV5nAVlHSYM9lxqX51AAw

export default httpTrigger;
