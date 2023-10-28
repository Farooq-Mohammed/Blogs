export const getDefaultPoster = () =>
  "https://images.pexels.com/photos/768474/pexels-photo-768474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const ellipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + "..." : str;
};

export const getTypes = (value, body) => {
  if (!value.headers)
    value.headers = { ...value.headers, authorization: getAccessToken() };
  if (value.params) return { params: body };
  else if (value.query) {
    if (typeof body === "object") return { query: body._id };
    return { query: body };
  }
  return {};
};
