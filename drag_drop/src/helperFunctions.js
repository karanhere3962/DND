export const randomStringGenerator = (length = 32) => {
  return [...Array(length)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");
};
