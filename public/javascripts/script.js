const url = document.querySelector('#shorten-url');
const copyBtn = document.querySelector('#copy');

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(url.textContent);
    alert('Copied to clipboard');
  } catch (err) {
    console.log(err);
  }
});
