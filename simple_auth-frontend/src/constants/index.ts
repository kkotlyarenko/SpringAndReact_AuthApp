const rootEndpoint = "http://localhost:8080";

export const loginEndpoint = rootEndpoint + "/auth/login";
export const registerEndpoint = rootEndpoint + "/auth/register";

export const userInfoEndpoint = rootEndpoint + "/user/getInfo";
export const updateUserPasswordEndpoint = rootEndpoint + "/user/updatePassword";
export const deleteUserEndpoint = rootEndpoint + "/user/deleteUser";

export const addPointEndpoint = rootEndpoint + "/point/addPoint";
export const getPointsEndpoint = rootEndpoint + "/point/getPoints";
export const deletePointEndpoint = rootEndpoint + "/point/deletePoint";
