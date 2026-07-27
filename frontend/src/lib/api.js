import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

/**
 * Normalizes any axios/network error into a plain, displayable message.
 */
function toErrorMessage(error) {
  if (error.response) {
    // Backend responded with a non-2xx status
    const detail = error.response.data?.detail || error.response.data?.message;
    return detail || `Backend returned an error (status ${error.response.status}).`;
  }
  if (error.request) {
    // Request was made but no response received — backend likely offline
    return "Can't reach the backend at " + BASE_URL + ". Make sure the FastAPI server is running.";
  }
  return error.message || "Something went wrong while analyzing the content.";
}

async function request(config) {
  try {
    const { data } = await client.request(config);
    return data;
  } catch (error) {
    throw new Error(toErrorMessage(error));
  }
}

export function predictText(text) {
  return request({
    url: "/predict/text",
    method: "POST",
    data: {
      text: text,
    },
  });
}

export function predictUrl(url) {
  return request({
    url: "/predict/url",
    method: "POST",
    data: {
      url: url,
    },
  });
}

export function predictImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  return request({
    url: "/predict/image",
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export { BASE_URL };
