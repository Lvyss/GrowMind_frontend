import api from "./auth";

// Profile
export const getProfile = () => api.get("/profile").then(res => res.data);

// Modules
export const getModules = () => api.get("/modules").then(res => res.data);
export const getModuleDetail = (slug) => api.get(`/modules/${slug}`).then(res => res.data);

// Lessons
export const completeLesson = (id) => api.post(`/lessons/${id}/complete`).then(res => res.data);
export const getLesson = (id) => api.get(`/lessons/${id}`).then(res => res.data);

// Quiz
export const startQuiz = (id) => api.get(`/quiz/${id}/start`).then(res => res.data);
export const submitQuiz = (id, answers) => api.post(`/quiz/${id}/submit`, { answers }).then(res => res.data);

// Tree & Progress
export const getTree = () => api.get("/tree").then(res => res.data);
export const getProgress = () => api.get("/progress").then(res => res.data);

// Achievements
export const getAchievements = () => api.get("/achievements").then(res => res.data);
export const claimAchievement = (id) => api.post(`/achievements/${id}/claim`).then(res => res.data);
