// To centralize all backend API URLs.
const IP = process.env.IP || "https://your-api.com/api/v1";







export const BLOG_ENDPOINTS = {
    CREATE_POST: `${IP}/api/v1/admin/posts/manage/create`,
    GET_POSTS: `${IP}/api/v1/admin/posts/manage`,
    // DELETE_POST: (slug) => `${BASE_URL}/api/v1/blog/manage/posts/${slug}`,
};


export const USER_ENDPOINTS = {
    CREATE_ACCOUNT: `${IP}/api/v2/admin/users/manage/create`,
    // GET_POSTS: `${BASE_URL}/api/v2/admin/manage/posts`,
    // DELETE_POST: (slug) => `${BASE_URL}/api/v1/blog/manage/posts/${slug}`,
};
