// Handles opening and closing the Media Release popup
export function setupMediaReleasePopup() {
  const openBtn = document.querySelector('.media-release-readmore-btn');
  const popup = document.getElementById('mediaReleasePopup');
  const closeBtn = document.getElementById('mediaReleasePopupClose');
  if (openBtn && popup && closeBtn) {
    openBtn.addEventListener('click', () => {
      popup.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
    closeBtn.addEventListener('click', () => {
      popup.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
    // Optional: Close popup when clicking outside the modal content
    popup.addEventListener('mousedown', e => {
      if (e.target === popup) {
        popup.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', setupMediaReleasePopup);
