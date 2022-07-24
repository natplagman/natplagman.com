document.addEventListener('click', onClick); 

async function onClick(event: MouseEvent) {
  if (clickedCopyButton(event.target)) {
    await onCopyButtonClicked(event.target);
  }
}

function clickedCopyButton(target: EventTarget | null): target is Element {
  return target instanceof Element && target.classList.contains('copy-button');
}

async function onCopyButtonClicked(target: Element) {
  const selection = selectSiblingContents(target);
  const selectedText = selection!.toString();
  try {
    await copyToClipboard(selectedText, target);
  }
  catch (err) {
    target.innerHTML = "Copy manually";
  }
}

async function copyToClipboard(text: string, target: Element) {
  await navigator.clipboard.writeText(text);
  target.innerHTML = "Copied!";
  setTimeout(() => {
    target.innerHTML = "Copy";
  }, 3000);
}

function selectSiblingContents(target: Element): Selection | null {
  if (!target.parentNode) {
    return null;
  }
  const selection = window.getSelection();
  if (!selection) {
    return null;
  }
  const range = document.createRange();
  range.selectNodeContents(target.parentNode);
  range.setStartAfter(target);
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
}
