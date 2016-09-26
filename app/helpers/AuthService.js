/**
 * Created by tristan on 25-9-16.
 */
import { isTokenExpired } from './jwtHelper'

export function loggedIn(){
    // Checks if there is a saved token and it's still valid
    if (typeof window === 'undefined') {
        return false;
    }
    const token = getToken();
    return !!token && !isTokenExpired(token)
}
function setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
}
export function getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {}
}
export function setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
}
export function getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
}
export function logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
}

