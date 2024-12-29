/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
    const response = `AAAAAAAAAAAAAAAAAAA ${data}`;
    postMessage(response);
});
  