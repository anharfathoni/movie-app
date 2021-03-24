import placeholder from "assets/poster-placeholder.png";

export const sliceText = (text, length) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

export const handleImageUrl = (url) => {
  if (url && url !== "N/A") {
    return url;
  }
  return placeholder;
};
