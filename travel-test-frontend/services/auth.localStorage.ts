import React from "react";
import { useEffect, useState } from "react";

export default function authLocalstorage() {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const userStr = localStorage.getItem("user");
        let data = null;
        if (userStr)
        data = JSON.parse(userStr);
        console.log(data.user);
        return data;
    }
    
}