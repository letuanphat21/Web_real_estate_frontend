import DOMPurify from "dompurify";

const ALLOWED_TAGS = ["h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "b", "i", "br", "a"];

/** Làm sạch HTML từ backend trước khi render (chặn script, event handler, style nội tuyến) */
export const sanitizeHtml = (dirty: string): string =>
  DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  });
