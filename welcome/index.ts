import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);

  let params: URLSearchParams = new URLSearchParams();
  params.set("scope", "read");
  params.set("response_type", "code");
  params.set("client_id", context.bindings.client_id);
  params.set("redirect_uri", context.bindings.oauth_callback);

  let rep: Response = this.http.get(context.bindings.authorize_url, {
    search: params
  });
  if (rep.status == 200) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Welcome"
    };
  } else {
    context.res = {
      status: 400,
      body: "There was a problem with the oauth2 kickoff flow"
    };
  }
};

export default httpTrigger;
