// URLを定数として定義

const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const holdingsIndex = (userId) =>
 `${DEFAULT_API_LOCALHOST}/users/${userId}/holdings`