import { getCollection } from 'astro:content';

/**
 * 获取已发布文章列表
 * - 生产环境 (import.meta.env.PROD): 返回非草稿文章 (draft !== true)
 * - 开发环境: 返回所有文章 (便于预览草稿)
 */
export async function getPublishedPosts() {
  const posts = await getCollection('posts');

  if (import.meta.env.PROD) {
    return posts.filter((post) => {
      const draft = post.data.draft;
      // Handle both boolean true and string "true"
      return draft !== true && draft !== 'true';
    });
  }

  return posts;
}
