import React from 'react'
import LoginService from '../Services/LoginService';
import UserService from '../Services/UserService';
import { Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminProtectedRoutes = () => {
  if(LoginService.isLoggedin()) {
    var userRoles = [];
    if(UserService.getUserRole() !== undefined || UserService.getUserRole() !== null)  {
        userRoles = UserService.getUserRole()
    }
    for(let i=0; i<userRoles.length; i++) {
      if(userRoles[i] === 'ADMIN') {
        return (
          <Outlet />
        )
      }
    }
  }
  Swal.fire({
    title: "!! Unauthorised !!",
    text: "Please login via admin account",
    icon: "error"
  }).then((result) => {
    if (result.isConfirmed) {
       window.location = "/login"
    }
  });
}

export default AdminProtectedRoutes