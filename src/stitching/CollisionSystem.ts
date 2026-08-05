import type { ContentRect } from "@/types";

const SELECTOR = "[data-stitch-content]";

export function collectContentRects(
  root: HTMLElement | Document = document,
): ContentRect[] {
  const nodes = root.querySelectorAll(SELECTOR);
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const rects: ContentRect[] = [];

  nodes.forEach((node, i) => {
    const el = node as HTMLElement;
    const r = el.getBoundingClientRect();
    rects.push({
      id: el.dataset.stitchId ?? `content-${i}`,
      left: r.left + scrollX,
      top: r.top + scrollY,
      right: r.right + scrollX,
      bottom: r.bottom + scrollY,
    });
  });

  return rects;
}
