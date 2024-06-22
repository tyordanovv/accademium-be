import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { awsConfig } from "../config/environment.js";

const Cognito = new CognitoIdentityProviderClient({
    region: awsConfig.region,
    credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
});

export default Cognito;