import { Info } from "lucide-react";
import { Fragment } from "react";
import type { Block } from "@/data/posts";

/** Renders `inline code` spans inside plain text. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="rounded-md border border-line bg-elevated px-1.5 py-0.5 font-mono text-[0.875em] text-fg">
            {part.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-pretty">
                <Inline text={block.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="text-h3 mt-6 text-balance text-fg">
                {block.text}
              </h2>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List
                key={i}
                className={
                  block.ordered
                    ? "flex list-decimal flex-col gap-3 pl-6 marker:font-mono marker:text-sm marker:text-accent-2-ink"
                    : "flex flex-col gap-3"
                }
              >
                {block.items.map((item) => (
                  <li key={item} className={block.ordered ? "pl-2 text-pretty" : "flex gap-3 text-pretty"}>
                    {block.ordered ? null : (
                      <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-accent-2" />
                    )}
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <figure key={i} className="glass-strong overflow-hidden rounded-2xl">
                <figcaption className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-xs text-muted">
                  <span>{block.caption ?? block.lang}</span>
                  <span aria-hidden className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                  </span>
                </figcaption>
                <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-fg [font-variant-ligatures:none]">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "callout":
            return (
              <aside key={i} className="glass flex gap-3 rounded-2xl p-4 text-base">
                <Info size={18} aria-hidden className="mt-1 shrink-0 text-accent-2-ink" />
                <p className="text-pretty text-fg">
                  <Inline text={block.text} />
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
