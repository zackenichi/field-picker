export const regexReplaceTextFunction = (string, keyAndValueToReplace) => {
  let stringCopyText = string;

  Object.entries(keyAndValueToReplace).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`);

    const newText = value;

    stringCopyText = stringCopyText.replace(regex, newText);
  });

  return stringCopyText;
};
