import BaseService from "../base/BaseService";
import { toPage } from "../../api/http";
import type { PageResponse } from "../../types/common.types";
import type {
  CreatePostRequest,
  PostReactionResponse,
  PostResponse,
} from "../../types/social/social.types";

const withImages = (post: PostResponse): PostResponse => ({
  ...post,
  imageUrls: post.imageUrls ?? [],
  videoUrl: post.videoUrl ?? null,
});

// Mọi API bài viết bên BE đều yêu cầu đăng nhập → dùng authHttp (mặc định của BaseService)
class PostService extends BaseService {
  constructor() {
    super("/posts");
  }

  // GET /posts?page=&size= (mới nhất trước)
  async getPosts(page = 0, size = 10): Promise<PageResponse<PostResponse>> {
    const res = toPage(await this.getPage<PostResponse>({ page, size }));
    return { ...res, content: res.content.map(withImages) };
  }

  // GET /posts/{id}
  async getPost(id: number): Promise<PostResponse> {
    return withImages(await this.getById<PostResponse>(id));
  }

  // POST /posts (multipart: content, images[], video) — cần ít nhất nội dung, 1 ảnh hoặc video
  async createPost({ content, images = [], video }: CreatePostRequest): Promise<PostResponse> {
    const form = new FormData();
    const text = content?.trim();
    if (text) form.append("content", text);
    images.forEach((file) => form.append("images", file));
    if (video) form.append("video", video);
    return withImages(await this.http.post<PostResponse>(this.url(), form));
  }

  // GET /posts/{id}/reactions — tổng lượt thích + tôi đã thích chưa
  async getReaction(postId: number): Promise<PostReactionResponse> {
    return this.http.get<PostReactionResponse>(this.url(postId, "reactions"));
  }

  // POST /posts/{id}/reactions — bật/tắt thích
  async toggleLike(postId: number): Promise<PostReactionResponse> {
    return this.http.post<PostReactionResponse>(this.url(postId, "reactions"));
  }
}

const postService = new PostService();
export default postService;
