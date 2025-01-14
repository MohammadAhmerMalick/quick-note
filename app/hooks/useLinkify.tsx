const useLinkify = (text: string = '') => {
  const isUrl = (word: string) => {
    const urlPattern =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
    return word.match(urlPattern)
  }

  const addMarkup = (word: string) =>
    isUrl(word)
      ? `<a class="dark:text-primary text-primaryDark" href="${word}" target="_blank" rel="noopener noreferrer">${word}</a>`
      : word

  return text.split(' ').map(addMarkup).join(' ')
}

export default useLinkify
