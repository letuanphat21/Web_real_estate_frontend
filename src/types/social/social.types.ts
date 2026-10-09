// Khớp AuthorResponse bên BE
export interface AuthorResponse {
  id: number;
  fullName: string | null;
  avatarUrl: string | null;
}

// Khớp PostResponse bên BE
export interface PostResponse {
  id: number;
  author: AuthorResponse;
  content: string | null;
  imageUrls: string[];
  videoUrl: string | null;
  createdAt: string;
}

// Khớp CommentResponse bên BE
export interface CommentResponse {
  id: number;
  postId: number;
  parentId: number | null;
  author: AuthorResponse;
  content: string;
  replyCount: number;
  createdAt: string;
}

// Khớp CommentCreateRequest bên BE
export interface CreateCommentRequest {
  postId: number;
  parentId?: number | null;
  content: string;
}

// Khớp PostReactionResponse bên BE
export interface PostReactionResponse {
  postId: number;
  likeCount: number;
  liked: boolean;
}

export interface CreatePostRequest {
  content?: string;
  images?: File[];
  video?: File | null;
}

export interface SocialUser {
  id: number;
  fullName: string;
  avatarUrl?: string | null;
}

export interface SocialComment {
  id: number;
  parentId: number | null;
  user: SocialUser;
  content: string;
  replyCount: number;
  createdAt: string;
}

// Dạng bài viết mà UI hiển thị (đã gắn thông tin người đăng)
export interface SocialPost {
  id: number;
  user: SocialUser;
  content: string;
  imageUrls: string[];
  videoUrl: string | null;
  createdAt: string;
}

export const toSocialUser = (author: AuthorResponse): SocialUser => ({
  id: author.id,
  fullName: author.fullName ?? "Người dùng",
  avatarUrl: author.avatarUrl,
});

export const toSocialComment = (c: CommentResponse): SocialComment => ({
  id: c.id,
  parentId: c.parentId,
  user: toSocialUser(c.author),
  content: c.content,
  replyCount: c.replyCount,
  createdAt: c.createdAt,
});

// Giới hạn khớp PostServiceImpl / CommentServiceImpl bên BE
export const POST_MAX_IMAGES = 10;
export const POST_MAX_CONTENT_LENGTH = 1000;
export const COMMENT_MAX_CONTENT_LENGTH = 500;
// Khớp CloudinaryServiceImpl.uploadVideo bên BE
export const POST_MAX_VIDEO_SIZE = 20 * 1024 * 1024;
export const POST_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
