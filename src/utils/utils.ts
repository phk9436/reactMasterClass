export function makeImgPath(path: string, format: string = "original") {
  return `https://image.tmdb.org/t/p/${format}/${path}`;
}
