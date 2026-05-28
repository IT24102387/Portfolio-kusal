document.addEventListener('DOMContentLoaded', function () {
  const downloadLink = document.getElementById('download-cv-link');
  if (!downloadLink) return;

  downloadLink.addEventListener('click', async function (event) {
    event.preventDefault();
    try {
      const response = await fetch(downloadLink.href, { cache: 'no-store' });
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadLink.getAttribute('download') || 'PS.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      window.location.href = downloadLink.href;
    }
  });
});
