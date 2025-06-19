/* eslint-disable no-unused-vars */

enum UserStatus {
  ACTIVE = "ACTIVE",
  BANDED = "BANDED",
  INACTIVE = "INACTIVE",
}

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}

enum CourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

enum LessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}

export { UserStatus, UserRole, CourseStatus, CourseLevel, LessonType };
