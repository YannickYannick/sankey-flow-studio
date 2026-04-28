import { useMemo, useState } from "react";
import { sankey, sankeyLinkHorizontal, SankeyGraph } from "d3-sankey";

export interface SankeyNodeInput {
  name: string;
  category?: "source" | "hub" | "positive" | "negative";
}
export interface SankeyLinkInput {
  source: number;
  target: number;
  value: number;
}

interface Props {
  nodes: SankeyNodeInput[];
  links: SankeyLinkInput[];
  width?: number;
  height?: number;
  formatValue?: (n: number) => string;
}

type SNode = SankeyNodeInput & {
  index: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  value: number;
};
type SLink = {
  source: SNode;
  target: SNode;
  value: number;
  width: number;
  y0: number;
  y1: number;
  index: number;
};

const categoryColor = (cat?: string) => {
  switch (cat) {
    case "positive":
      return "hsl(var(--flow-positive))";
    case "negative":
      return "hsl(var(--flow-negative))";
    case "hub":
      return "hsl(var(--foreground))";
    default:
      return "hsl(var(--flow-neutral))";
  }
};

export const SankeyDiagram = ({
  nodes,
  links,
  width = 1100,
  height = 520,
  formatValue = (n) => `$${n.toLocaleString("en-US")}`,
}: Props) => {
  const [hoverLink, setHoverLink] = useState<number | null>(null);
  const [hoverNode, setHoverNode] = useState<number | null>(null);

  const graph = useMemo(() => {
    const indexed = nodes.map((n, i) => ({ ...n, _i: i }));
    const generator = sankey<SankeyNodeInput & { _i: number }, SankeyLinkInput>()
      .nodeId((d) => d._i)
      .nodeWidth(14)
      .nodePadding(22)
      .extent([
        [8, 24],
        [width - 8, height - 24],
      ]);

    const cloned: SankeyGraph<SankeyNodeInput, SankeyLinkInput> = {
      nodes: nodes.map((n) => ({ ...n })),
      links: links.map((l) => ({ ...l })),
    };
    return generator(cloned) as unknown as { nodes: SNode[]; links: SLink[] };
  }, [nodes, links, width, height]);

  const linkPath = sankeyLinkHorizontal<SNode, SLink>();

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto font-mono"
        style={{ minWidth: 720 }}
        role="img"
        aria-label="Diagramme de Sankey des flux financiers"
      >
        <defs>
          {graph.links.map((l, i) => {
            const c1 = categoryColor(l.source.category);
            const c2 = categoryColor(l.target.category);
            return (
              <linearGradient
                id={`grad-${i}`}
                key={i}
                gradientUnits="userSpaceOnUse"
                x1={l.source.x1}
                x2={l.target.x0}
              >
                <stop offset="0%" stopColor={c1} stopOpacity="0.55" />
                <stop offset="100%" stopColor={c2} stopOpacity="0.55" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Links */}
        <g fill="none">
          {graph.links.map((l, i) => {
            const isActive =
              hoverLink === i ||
              hoverNode === l.source.index ||
              hoverNode === l.target.index;
            const dim = (hoverLink !== null || hoverNode !== null) && !isActive;
            return (
              <path
                key={i}
                d={linkPath(l) || ""}
                stroke={`url(#grad-${i})`}
                strokeWidth={Math.max(1, l.width)}
                opacity={dim ? 0.12 : isActive ? 0.95 : 0.6}
                style={{ transition: "opacity 200ms" }}
                onMouseEnter={() => setHoverLink(i)}
                onMouseLeave={() => setHoverLink(null)}
              >
                <title>{`${l.source.name} → ${l.target.name}: ${formatValue(l.value)}`}</title>
              </path>
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {graph.nodes.map((n, i) => {
            const color = categoryColor(n.category);
            const isLeft = n.x0 < width / 2;
            const labelX = isLeft ? n.x1 + 10 : n.x0 - 10;
            const anchor = isLeft ? "start" : "end";
            const dim = hoverNode !== null && hoverNode !== i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoverNode(i)}
                onMouseLeave={() => setHoverNode(null)}
                style={{ cursor: "pointer", opacity: dim ? 0.35 : 1, transition: "opacity 200ms" }}
              >
                <rect
                  x={n.x0}
                  y={n.y0}
                  width={n.x1 - n.x0}
                  height={Math.max(2, n.y1 - n.y0)}
                  fill={color}
                  rx={1.5}
                />
                <text
                  x={labelX}
                  y={(n.y0 + n.y1) / 2 - 6}
                  textAnchor={anchor}
                  fontSize="11"
                  fill="hsl(var(--foreground))"
                  className="font-mono"
                  style={{ fontWeight: 500 }}
                >
                  {n.name}
                </text>
                <text
                  x={labelX}
                  y={(n.y0 + n.y1) / 2 + 8}
                  textAnchor={anchor}
                  fontSize="10"
                  fill="hsl(var(--muted-foreground))"
                  className="font-mono tabular-nums"
                >
                  {formatValue(n.value)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
