import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Authorization header with the access token
api.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("_token")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Error sending request:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (
      error?.response?.data?.message === "Authorization Token Missing!"
    ) {
      localStorage.removeItem("_token");
      window.location.href = '/signin';
    } else {
      return Promise.reject(error);
    }
  }
);

export const requestApi = async (config) => {
  const response = await api.request(config);
  return response.data;
};

export const getApi = async (url, config) => {
  const response = await api.get(url, config);
  return response.data;
};

export const getApiWithParams = async (url, paramsArr = [], config) => {
  const params = new URLSearchParams();
  paramsArr.forEach((param) => {
    if (param.value) {
      params.append(param.key, param.value);
    }
  });

  const response = await api.get(url, {
    params,
    ...config,
  });
  return response;
};

export const postApi = async (url, data, config) => {
  const response = await api.post(url, data, config);
  return response.data;
};

export const putApi = async (url, data, config) => {
  const response = await api.put(url, data, config);
  return response.data;
};

export const patchApi = async (url, data, config) => {
  const response = await api.patch(url, data, config);
  return response.data;
};

export const delApi = async (url, config) => {
  const response = await api.delete(url, config);
  return response.data;
};
