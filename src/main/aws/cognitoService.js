import Cognito from "./cognitoClient.js";
import { awsConfig } from '../config/environment.js'
import {
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
    AdminAddUserToGroupCommand,
    AdminGetUserCommand,
    AdminDeleteUserCommand,
    SignUpCommand,
    InitiateAuthCommand
} from "@aws-sdk/client-cognito-identity-provider";

class CognitoService {
    constructor() {}

    async createStudent(username, password, email, organisationId) {
        const clientId = awsConfig.clientId;
        
        const params = {
            ClientId: clientId,
            Username: username,
            Password: password,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'custom:organisationId', Value: organisationId },
            ]
        };
        
        const command = new SignUpCommand(params);
        return await Cognito.send(command);
    }


    async adminAddUserToGroup(userGroup, username) {
        const params = {
            UserPoolId: awsConfig.userPoolId,
            GroupName: userGroup,
            Username: username,
        };

        const command = new AdminAddUserToGroupCommand(params);
        return await Cognito.send(command);
    }

    async initiateAuthCommand(email, password) {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: awsConfig.clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        };
        const command = new InitiateAuthCommand(params);
        const authResponse = await Cognito.send(command);
        
        console.log(authResponse.AuthenticationResult);
        return authResponse.AuthenticationResult;
    }

    confirmSignUp(params) {
        //TODO create params here
        Cognito.confirmSignUp(params).promise();
        return
    }

    adminGetUser(params) {
        //TODO create params here
        Cognito.adminGetUser(params).promise();
        return
    }

    adminDeleteUser(params) {
        //TODO create params here
        Cognito.adminDeleteUser(params).promise();
        return
    }
}
export default CognitoService;