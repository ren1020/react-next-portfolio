/**
 * YouTubeのリンクから動画IDを抽出する関数
 * @param url - YouTube URL（複数の形式に対応）
 * @returns 動画ID、または null
 */
export function extractYoutubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * 動画IDから埋め込みURLを生成する関数
 * @param youtubeId - YouTube 動画ID
 * @returns 埋め込み用URL
 */
export function getEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}`;
}

/**
 * HTML内のYouTubeリンクをiframe埋め込みに変換する関数
 * @param html - 元のHTML文字列
 * @returns 変換後のHTML文字列
 */
export function convertYoutubeLinksToEmbeds(html: string): string {
  // 1. iframe内のsrc属性を修正（既存のiframeをサニタイズ）
  let result = html.replace(
    /src="https?:\/\/(?:www\.)?(?:youtube\.com(?:\/embed)?|youtu\.be)\/[^"]*(?:watch\?v=)?([a-zA-Z0-9_-]{11})[^"]*"/gi,
    (match, videoId) => {
      return `src="${getEmbedUrl(videoId)}"`;
    }
  );

  // 2. テキストとして存在するYouTubeリンクを iframe に変換
  result = result.replace(
    /(?<!src=")https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s<>"]+/gi,
    (url) => {
      const videoId = extractYoutubeId(url);
      if (!videoId) return url;

      const embedUrl = getEmbedUrl(videoId);
      return `<iframe width="560" height="315" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
  );

  return result;
}
