import axios from "axios";
import loginService from "../Services/LoginService";
/**
 *  ! This axios is created in order to add Interceptors and define baseURL.
 */
const BASE_URL = "http://localhost:8085";
const allowedURLs = [
  "/auth/generate-token",
  "/auth/validate-token",
  "/user/create-user",
  "/brand/get",
  "/product/{prodId}",
  "/product/sizes/{sizeId}",
  "/product/getAll",
  "/product/by-occasion",
  "/product/by-type",
  "/product/by-idealFor",
];
const API = axios.create({
  baseURL: BASE_URL,
});

const isAllowedURL = (url) => {
  return allowedURLs.some((allowedURL) => {
    // Split URLs into segments by "/"
    const urlSegments = url.split("/");
    const allowedURLSegments = allowedURL.split("/");

    // Check if both have the same number of segments
    if (urlSegments.length !== allowedURLSegments.length) {
      return false;
    }

    // Check each segment; if segment starts with "{" assume it's a dynamic segment
    return allowedURLSegments.every((segment, index) => {
      return segment.startsWith("{") || segment === urlSegments[index];
    });
  });
};

API.interceptors.request.use((request) => {
  const relativeURL = request.url.replace(BASE_URL, "");
  if (loginService.getToken() !== null && !isAllowedURL(relativeURL)) {
    request.headers.Authorization = `Bearer ${loginService.getToken()}`;
  }
  return request;
});

export default API;
