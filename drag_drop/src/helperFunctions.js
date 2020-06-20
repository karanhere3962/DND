export const randomStringGenerator = (length = 16) => {
  return [...Array(length)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");
};
