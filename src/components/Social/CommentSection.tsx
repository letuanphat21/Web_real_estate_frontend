import { MOCK_SOCIAL_POSTS } from "../../data/mockSocial";

type Props = {
  comments: (typeof MOCK_SOCIAL_POSTS)[number]["comments"];
};

export default function CommentSection({ comments }: Props) {
  if (comments.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-gray-500">
        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2">
          <img src={c.user.avatarUrl} alt={c.user.fullName} className="h-8 w-8 rounded-full" />
          <div>
            <div className="rounded-2xl bg-gray-100 px-3 py-2">
              <p className="text-sm font-semibold">{c.user.fullName}</p>
              <p className="text-sm text-gray-800">{c.content}</p>
            </div>
            <p className="mt-0.5 px-3 text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
