export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/auth";

export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;

export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;

export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;

export const UPDATE_PROFILE_ROUTES = `${AUTH_ROUTES}/update-profile`;

export const ADD_PROFILE_IMAGE_ROUTES = `${AUTH_ROUTES}/add-profile-image`;

export const REMOVE_PROFILE_IMAGE_ROUTES = `${AUTH_ROUTES}/remove-profile-image`;

export const LOGOUT_ROUTES = `${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTES = "/api/contacts";
export const SEARCH_CONTACTS_ROUTES =`${CONTACTS_ROUTES}/search`;
export const GET_DM_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-contact-for-dm`;
export const GET_ALL_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-all-contacts`;

export const MESSAGES_ROUTES = "/api/messages"; // here / is added
export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILES_ROUTES = `${MESSAGES_ROUTES}/upload-file`;





