export default function extractImageUrls(htmlString: string) {
  const srcMatches = [...htmlString.matchAll(/<img [^>]*src="([^"]*)"/g)];

  // Extract and return the src values
  return srcMatches.map((match) => match[1] ?? "");
}
