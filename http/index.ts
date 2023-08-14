import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { randomUUID } from "crypto"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    if (name) {
        context.bindings.toDoItems = JSON.stringify([{
            // create a random ID
            Id: randomUUID(),
            title: name,
            completed: false,
            url: ""
        }]);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;