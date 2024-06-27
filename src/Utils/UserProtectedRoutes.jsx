import React from 'react'
import LoginService from '../Services/LoginService';
import UserService from '../Services/UserService';
import { Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserProtectedRoutes = () => {
  if(LoginService.isLoggedin()) {
    var userRoles = [];
    if(UserService.getUserRole() !== undefined || UserService.getUserRole() !== null)  {
        userRoles = UserService.getUserRole()
    }
    for(let i=0; i<userRoles.length; i++) {
      if(userRoles[i] === 'NORMAL') {
        return (
          <Outlet />
        )
      }
    }
  }
  Swal.fire({
    title: "!! Unauthorised !!",
    text: "Please login",
    icon: "error"
  }).then((result) => {
    if (result.isConfirmed) {
       window.location = "/login"
    }
  });
}

export default UserProtectedRoutes