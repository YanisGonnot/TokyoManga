import { AxiosError, isAxiosError } from "axios";
import { ErrorApiResponse } from "../auth/typage/types/authForm";

export function handleRequestErrors(err: unknown): string {
  if (isAxiosError(err)) {
    // no internet or server down
    if (!err.response) {
      return "Cannot connect to the server please check if is running";
    }

    // messages from db
    const errorRes: AxiosError<ErrorApiResponse> = err;
    const apiMessage = errorRes.response?.data?.message[0];
    if (apiMessage) {
      return apiMessage;
    }

    // status
    const status = err.response.status;
    switch (status) {
      case 400:
        return "400 Bad Request - Invalid request, check API documentation";
      case 401:
        return "401 - Unauthorized"  
      case 404:
        return "404 Not Found - Resource not found or endpoint is incorrect";
      case 405:
        return "405 Method Not Allowed - Only supported methods are allowed";
      case 429:
        return "429 Too Many Requests - You are being rate limited";
      case 500:
        return "500 Internal Server Error - Try again later";
      case 503:
        return "503 Service Unavailable - Server might be down";
      default:
        return `HTTP error: ${status}. Please contact support.`;
    }
  }

  return "An unknown error occurred.";
}

