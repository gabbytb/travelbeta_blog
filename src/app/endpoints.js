
// To centralize all backend API URLs.
const IP = process.env.IP || "https://your-api.com/api/v1";
const PORT = process.env.PORT || 3000;






export const BLOG_ENDPOINTS = {
    CREATE_POST: `${IP}:${PORT}/api/v1/admin/posts/manage/create`,
    GET_POSTS: `${IP}:${PORT}/api/v1/admin/posts/manage`,
    // DELETE_POST: (slug) => `${BASE_URL}/api/v1/blog/manage/posts/${slug}`,
};


export const USER_ENDPOINTS = {
    CREATE_ACCOUNT: `${IP}:${PORT}/api/v2/admin/users/manage/create`,
    // GET_POSTS: `${IP}:${PORT}/api/v2/admin/manage/posts`,
    // DELETE_POST: (slug) => `${IP}:${PORT}/api/v1/blog/manage/posts/${slug}`,
};
