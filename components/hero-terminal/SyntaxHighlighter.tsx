export const highlightCode = (code: string, language: string) => {
  if (!code) return "";

  let html = code
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (language === "bash") {
    html = html
      .replace(/(&gt;.*)/g, '<span class="text-pink-500/80">$1</span>') // > commands
      .replace(/(\$.*)/g, '<span class="text-cyan-400">$1</span>') // $ commands
      .replace(/(ESTABLISHED|ONLINE)/g, '<span class="text-green-400 font-bold">$1</span>'); // Success states
  } else {
    html = html
      // Keywords
      .replace(/\b(const|let|var|class|function|return|import|from|export|default)\b/g, '<span class="text-purple-400">$1</span>')
      // Strings
      .replace(/("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, '<span class="text-green-400">$1</span>')
      // Object Keys
      .replace(/([a-zA-Z0-9_]+)(?=:)/g, '<span class="text-cyan-400">$1</span>')
      // Booleans / Numbers
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
      // Brackets and Punctuation
      .replace(/([{}[\],;])/g, '<span class="text-white/40">$1</span>');
  }

  return html;
};