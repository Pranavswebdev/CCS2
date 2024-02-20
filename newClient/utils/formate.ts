export default function removeSpecialChars(str: String) {
  return str
    .replace(/(?!\w|\s)./g, "")
    .replace(/\s+/g, " ")
    .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, "$2");
}
