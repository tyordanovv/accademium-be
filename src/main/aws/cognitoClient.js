import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { awsConfig } from "../config/environment.js";

console.log('Region:', awsConfig.region);
console.log('Access Key ID:', awsConfig.accessKeyId);

const Cognito = new CognitoIdentityProviderClient({
    region: awsConfig.region,
    credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
});

export default Cognito;