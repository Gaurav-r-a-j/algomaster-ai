// Database service exports
// Note: Content (MDX, quizzes) is stored in CODE, not database
// Database stores: topic metadata, user progress, quiz scores, user accounts, topic videos
export { userService, UserService } from "./user-service"
export { topicService, TopicService } from "./topic-service"
export { progressService, ProgressService } from "./progress-service"
export { quizService, QuizService } from "./quiz-service"
export { topicVideoService, TopicVideoService } from "./topic-video-service"

