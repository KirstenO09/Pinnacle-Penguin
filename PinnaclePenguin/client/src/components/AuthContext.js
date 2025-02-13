import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);    // **dpop** login status of user
    const [username, setUsername] = useState('')
    const [forumId, setForumId] = useState('')

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, forumId, setForumId }}>
            {children}
        </AuthContext.Provider>
    );
};