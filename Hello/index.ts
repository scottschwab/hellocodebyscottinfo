import { AzureFunction, Context, HttpRequest } from "@azure/functions";

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

// oauth2 guide: https://docs.microsoft.com/en-us/azure/api-management/api-management-howto-protect-backend-with-aad
// client id: fed197f3-9839-4bf4-b3d9-7b073a26b160

export default httpTrigger;
