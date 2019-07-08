import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const code = req.query.code;

  if (code) {
    let params: URLSearchParams = new URLSearchParams();
    params.set("code", code);
    params.set("grant_type", "authorization_code");
    params.set("client_id", context.bindings.client_id);
    params.set("client_secret", context.bindings.client_secret);
    params.set("redirect_uri", context.bindings.app_callback);

    rep: Response = this.http.get(context.bindings.token_url, {
      search: params
    });

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "success"
    };
  } else {
    context.res = {
      status: 400,
      body: "Callback was not given a authorization code"
    };
  }
};

export default httpTrigger;
