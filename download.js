document.addEventListener('DOMContentLoaded', function () {

  emailjs.init("p1vh803Qs2xKDxqrF");

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      emailjs.send(
        "service_rb9xmpd",
        "template_s6ci14z",
        {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value
        }
      ).then(
        function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          contactForm.reset();
        },
        function(error) {
          console.log('FAILED...', error);
          alert('Failed to send message. Please try again.');
        }
      );
    });
  }

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
      a.download = downloadLink.getAttribute('download') || 'Kusal_Kolambage_CV.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      window.location.href = downloadLink.href;
    }
  });

  const previewLinks = document.querySelectorAll('.cert-preview-link');
  const fullscreenOverlay = document.getElementById('fullscreenOverlay');
  const fullscreenImage = document.getElementById('fullscreenImage');
  const fullscreenClose = document.querySelector('.fullscreen-close');

  function closeFullscreen() {
    if (!fullscreenOverlay) return;
    fullscreenOverlay.classList.remove('open');
    fullscreenOverlay.setAttribute('aria-hidden', 'true');
    if (fullscreenImage) fullscreenImage.src = '';
  }

  previewLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const imageSrc = this.dataset.fullscreenSrc;
      if (!imageSrc || !fullscreenOverlay || !fullscreenImage) return;
      fullscreenImage.src = imageSrc;
      fullscreenImage.alt = this.closest('.project-card')?.querySelector('.card-title')?.textContent || 'Certificate preview';
      fullscreenOverlay.classList.add('open');
      fullscreenOverlay.setAttribute('aria-hidden', 'false');
    });
  });

  if (fullscreenClose) {
    fullscreenClose.addEventListener('click', closeFullscreen);
  }

  if (fullscreenOverlay) {
    fullscreenOverlay.addEventListener('click', function (event) {
      if (event.target === fullscreenOverlay) {
        closeFullscreen();
      }
    });
  }
});
