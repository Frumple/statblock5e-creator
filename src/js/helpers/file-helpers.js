export function startFileDownload(content, contentType, fileName) {
  const blob = new Blob([content], {type: contentType});
  const link = document.createElement('a');
  link.download = fileName;
  link.href = URL.createObjectURL(blob);
  link.click();
}