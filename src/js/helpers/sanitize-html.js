export default function sanitizeHTML(string) {
  const options = {
    ALLOWED_TAGS: ['strong', 'em', 'b', 'i']
  };
  return DOMPurify.sanitize(string, options);
}