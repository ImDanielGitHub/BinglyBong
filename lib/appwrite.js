import "react-native-url-polyfill/auto";

import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ubl.binglybong",
  projectId: "6638c4150001e73a352d",
  databaseId: "6638c6a40023e2bbb216",
  userCollectionId: "6638c6a40023e2bbb216",
  videoCollectionId: "6638c7c00005bd42db9b",
  storageId: "6638c9320011564d1f85",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
// export async function createUser(email, password, username) {
//   try {
//     // TODO make sure there are no sessions currenlty active (may be removed later)
//     await endAllSessions();

//     const newAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       username
//     );

//     if (!newAccount) throw Error;

//     const avatarUrl = avatars.getInitials(username);

//     await signIn(email, password);

//     const newUser = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       ID.unique(),
//       {
//         accountId: newAccount.$id,
//         email: email,
//         username: username,
//         avatar: avatarUrl,
//       }
//     );

//     return newUser;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// Get Account
// export async function getAccount() {
//   try {
//     const currentAccount = await account.get();

//     return currentAccount;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

//TODO : Get Current User
export async function createUser(email, password, username) {
  try {
    // Ensure no sessions are currently active
    // await endAllSessions();

    // Create new account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed");

    // Authenticate the newly created user
    const session = await signIn(email, password);

    // Generate avatar URL
    const avatarUrl = avatars.getInitials(username);

    // Create a new user document in the database
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    // TODO make sure there are no sessions currenlty active (may be removed later)
    // await endAllSessions();

    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Function to end all sessions
export async function endAllSessions() {
  try {
    await account.deleteSessions();
    console.log("All sessions ended successfully.");
  } catch (error) {
    console.error("Failed to end all sessions:", error);
    throw new Error(error);
  }
}
