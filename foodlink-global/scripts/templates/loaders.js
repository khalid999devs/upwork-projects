export function createSpinnerLoader() {
  const template = `<div class="flex min-h-[150px] w-[94vw] items-center justify-center">
    <div class="animate-spin rounded-full h-10 w-10 border-4 border-solid border-[var(--golden)] border-t-transparent"></div>
  </div>`;
  const fragment = document.createDocumentFragment();
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  fragment.appendChild(tempDiv.firstElementChild);
  return fragment;
}