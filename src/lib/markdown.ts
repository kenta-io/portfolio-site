import { unified } from "unified";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";

export type TocEntry = {
  id: string;
  text: string;
  depth: number;
};

export async function renderMarkdown(
  body: string,
): Promise<{ html: string; toc: TocEntry[] }> {
  const toc: TocEntry[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => (tree) => {
      visit(
        tree,
        "element",
        (node: {
          tagName?: string;
          properties?: { id?: string };
          children?: unknown[];
        }) => {
          if (node.tagName === "h2" || node.tagName === "h3") {
            const id = node.properties?.id;
            const text = (node.children ?? [])
              .filter(
                (child): child is { type: string; value?: string } =>
                  typeof child === "object" && child !== null,
              )
              .map((child) => ("value" in child ? (child.value ?? "") : ""))
              .join("");
            if (id)
              toc.push({ id, text, depth: node.tagName === "h2" ? 2 : 3 });
          }
        },
      );
    })
    .use(rehypePrettyCode, { theme: "github-dark" })
    .use(rehypeStringify)
    .process(body);

  return { html: String(file), toc };
}
