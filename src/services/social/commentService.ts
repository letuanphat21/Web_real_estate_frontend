import BaseService from "../base/BaseService";
import { toPage } from "../../api/http";
import type { PageResponse } from "../../types/common.types";
import type { CommentResponse, CreateCommentRequest } from "../../types/social/social.types";

// Mọi API bình luận bên BE đều yêu cầu đăng nhập → dùng authHttp (mặc định của BaseService)
class CommentService extends BaseService {
  constructor() {
    super("/comments");
  }

  // GET /comments/post/{postId}?page=&size= — bình luận gốc, cũ nhất trước
  async getCommentsByPost(postId: number, page = 0, size = 10): Promise<PageResponse<CommentResponse>> {
    return toPage(await this.getPage<CommentResponse>({ page, size }, `post/${postId}`));
  }

  // GET /comments/{commentId}/replies?page=&size=
  async getReplies(commentId: number, page = 0, size = 10): Promise<PageResponse<CommentResponse>> {
    return toPage(await this.getPage<CommentResponse>({ page, size }, `${commentId}/replies`));
  }

  // POST /comments — có parentId là trả lời bình luận
  async createComment(request: CreateCommentRequest): Promise<CommentResponse> {
    return this.create<CommentResponse>(request);
  }
}

const commentService = new CommentService();
export default commentService;
