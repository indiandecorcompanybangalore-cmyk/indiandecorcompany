/** Parse the controlled Markdown subset (headings, lists, tables, paragraphs) used by editorial article content. */
export function parseArticleContent(content = '') {
  const lines = String(content).trim().split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let list = [];
  let tableLines = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ').trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: 'list', items: list });
      list = [];
    }
  };
  const flushTable = () => {
    if (tableLines.length >= 2) {
      const parseRow = (line) => {
        const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
        return trimmed.split('|').map(cell => cell.trim());
      };
      const headers = parseRow(tableLines[0]);
      const rows = [];
      for (let i = 2; i < tableLines.length; i++) {
        const rowCells = parseRow(tableLines[i]);
        if (rowCells.some(c => c.length > 0)) {
          rows.push(rowCells);
        }
      }
      blocks.push({ type: 'table', headers, rows });
      tableLines = [];
    } else if (tableLines.length > 0) {
      paragraph.push(...tableLines);
      tableLines = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    // Detect markdown table lines
    if (line.startsWith('|') && line.endsWith('|')) {
      flushParagraph();
      flushList();
      tableLines.push(line);
      continue;
    } else if (tableLines.length > 0) {
      flushTable();
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      continue;
    }
    const item = line.match(/^\s*[-*]\s+(.+)$/);
    if (item) {
      flushParagraph();
      list.push(item[1]);
      continue;
    }
    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  flushTable();
  return blocks;
}
