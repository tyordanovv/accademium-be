import Cognito from "./cognitoClient.js";
import { awsConfig } from '../config/environment.js'
import {
    AdminAddUserToGroupCommand,
    ConfirmSignUpCommand,
    SignUpCommand,
    InitiateAuthCommand,
    AdminCreateUserCommand,
    AdminRespondToAuthChallengeCommand, 
    AdminGetUserCommand, 
    AdminDeleteUserCommand
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

    async adminCreateUser(username, tempPassword, email, organisationId) {
        console.log("email", email)
        const params = {
            UserPoolId: awsConfig.userPoolId,
            Username: username,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'custom:organisationId', Value: organisationId },
            ],
            TemporaryPassword: tempPassword,
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
        console.log("authResponse: ", authResponse)
        return authResponse;
    }

    async confirmSignUp(username, code) {
        const params = {
            ClientId: awsConfig.clientId, 
            Username: username,
            ConfirmationCode: code,
        };

        const command = new ConfirmSignUpCommand(params);

        return await Cognito.send(command);
    }

    async adminGetUser(email) {
        const params = {
            UserPoolId: awsConfig.userPoolId,
            Username: email,
        };

        const command = new AdminGetUserCommand(params);
        return await Cognito.send(command);
    }

    async adminDeleteUser(email) {
        const params = {
            UserPoolId: awsConfig.userPoolId,
            Username: email,
        };

        const command = new AdminDeleteUserCommand(params);
        return await Cognito.send(command);
    }

    async respondToNewPasswordChallenge(email, session, newPassword) {
        const params = {
            ChallengeName: 'NEW_PASSWORD_REQUIRED',
            ClientId: awsConfig.clientId,
            UserPoolId: awsConfig.userPoolId,
            Session: session,
            ChallengeResponses: {
                USERNAME: email,
                NEW_PASSWORD: newPassword,
            },
        };
        const command = new AdminRespondToAuthChallengeCommand(params);
        return await Cognito.send(command);
    }

    async changePassword(cognitoAccessToken, currentPassword, newPassword) {
        const params = {
            AccessToken: cognitoAccessToken, // TODO how to handle this token?
            PreviousPassword: currentPassword,
            ProposedPassword: newPassword,
        };
        const command = new ChangePasswordCommand(params);
        return await Cognito.send(command);
    }
}
export default CognitoService;