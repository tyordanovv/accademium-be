import Cognito from "./cognitoClient.js";
import { awsConfig } from '../config/environment.js'
import {
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
    AdminAddUserToGroupCommand,
    AdminGetUserCommand,
    AdminDeleteUserCommand
} from "@aws-sdk/client-cognito-identity-provider";

class CognitoService {
    constructor() {}

    async adminCreateUser(username, password, email, organisationId) {
        console.log("username: ", username)
        console.log("password: ", password)
        console.log("email: ", email)
        console.log("organisationId: ", organisationId)
        const params = {
            UserPoolId: awsConfig.userPoolId,
            Username: username,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'custom:organisationId', Value: organisationId },
            ],
            TemporaryPassword: password,
        };
        
        const command = new AdminCreateUserCommand(params);
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

    adminInitiateAuth(params) {
        //TODO create params here
        Cognito.adminInitiateAuth(params).promise();
        return
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