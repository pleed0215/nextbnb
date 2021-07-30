export const cookieStringToObject = (cookieString: string | undefined) => {
  type CookieType = {
    [key: string]: string;
  };
  const cookies: CookieType = {};
  if (cookieString) {
    const itemString = cookieString.split(/\s*;\s*/);

    itemString.forEach((pairs) => {
      const pair = pairs.split(/\s*=s*/);
      cookies[pair[0]] = pair.splice(1).join("=");
    });
  }
  return cookies;
};
