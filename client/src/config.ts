// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'dfu5y5yrzd'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  domain: 'dev-6l-5njji.us.auth0.com',            // Auth0 domain
  clientId: "4xB3kgd23wzq5S3W0iOX3hYtKR8ecAtX",          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
