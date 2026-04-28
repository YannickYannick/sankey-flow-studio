import { SankeyDiagram, SankeyNodeInput, SankeyLinkInput } from "@/components/SankeyDiagram";

const nodes: SankeyNodeInput[] = [
  { name: "iPhone", category: "source" },
  { name: "MacBook", category: "source" },
  { name: "iPad", category: "source" },
  { name: "Wearables", category: "source" },
  { name: "Services", category: "source" },
  { name: "Products", category: "hub" },
  { name: "Revenue", category: "hub" },
  { name: "Gross profit", category: "positive" },
  { name: "Cost of revenue", category: "negative" },
  { name: "Operating profit", category: "positive" },
  { name: "Operating expenses", category: "negative" },
  { name: "Net profit", category: "positive" },
  { name: "Tax", category: "negative" },
  { name: "R&D", category: "negative" },
  { name: "SG&A", category: "negative" },
  { name: "Product costs", category: "negative" },
  { name: "Service costs", category: "negative" },
];

const idx = (n: string) => nodes.findIndex((x) => x.name === n);

const links: SankeyLinkInput[] = [
  { source: idx("iPhone"), target: idx("Products"), value: 205 },
  { source: idx("MacBook"), target: idx("Products"), value: 40 },
  { source: idx("iPad"), target: idx("Products"), value: 29 },
  { source: idx("Wearables"), target: idx("Products"), value: 41 },
  { source: idx("Products"), target: idx("Revenue"), value: 315 },
  { source: idx("Services"), target: idx("Revenue"), value: 78 },

  { source: idx("Revenue"), target: idx("Gross profit"), value: 170 },
  { source: idx("Revenue"), target: idx("Cost of revenue"), value: 223 },

  { source: idx("Gross profit"), target: idx("Operating profit"), value: 119 },
  { source: idx("Gross profit"), target: idx("Operating expenses"), value: 51 },

  { source: idx("Operating profit"), target: idx("Net profit"), value: 99 },
  { source: idx("Operating profit"), target: idx("Tax"), value: 20 },

  { source: idx("Operating expenses"), target: idx("R&D"), value: 26 },
  { source: idx("Operating expenses"), target: idx("SG&A"), value: 25 },

  { source: idx("Cost of revenue"), target: idx("Product costs"), value: 201 },
  { source: idx("Cost of revenue"), target: idx("Service costs"), value: 22 },
];

const totalRevenue = 393;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="flex h-14 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-sm bg-primary glow-primary" />
          <span className="font-mono text-sm font-medium tracking-tight uppercase">
            Flux.Instrument
          </span>
        </div>
        <div className="flex items-center gap-2 rounded border border-border bg-card px-2 py-1">
          <div className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase">
            System Calibrated
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-6 py-12">
        {/* Hero */}
        <header className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1">
            <span className="font-mono text-[10px] text-primary tracking-tight uppercase">
              Ref: AX-9204 // FY24 Statement
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
            Diagramme de Sankey{" "}
            <span className="text-muted-foreground">moderne.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-[55ch]">
            Visualisez vos états financiers avec une fidélité microscopique.
            Chaque flux est calibré au dollar près, du chiffre d'affaires
            jusqu'au résultat net.
          </p>
        </header>

        {/* Diagram panel */}
        <section className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-2xl ring-1 ring-white/5">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <div className="flex flex-wrap gap-10">
              <div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Gross Revenue
                </div>
                <div className="font-mono text-2xl font-medium tabular-nums text-foreground tracking-tight">
                  ${totalRevenue}.0B
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Net Margin
                </div>
                <div className="font-mono text-2xl font-medium tabular-nums text-flow-positive tracking-tight">
                  25.2%
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Cost Ratio
                </div>
                <div className="font-mono text-2xl font-medium tabular-nums text-flow-negative tracking-tight">
                  56.7%
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Zoom in"
                className="size-9 rounded border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                +
              </button>
              <button
                aria-label="Zoom out"
                className="size-9 rounded border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                −
              </button>
            </div>
          </div>

          <SankeyDiagram
            nodes={nodes}
            links={links}
            formatValue={(n) => `$${n}B`}
          />

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6">
            <div className="flex items-center gap-2">
              <div className="size-2 bg-flow-positive" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-tighter">
                Positive Yield
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 bg-flow-negative" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-tighter">
                Capital Burn
              </span>
            </div>
            <div className="ml-auto flex flex-wrap gap-4">
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-tighter">
                Hover // isolate flow
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-tighter">
                Sampling: FY24 actual
              </span>
            </div>
          </div>
        </section>

        {/* Feature triplet */}
        <section className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              tag: "Atomic Precision",
              title: "Micro-Flow Tracking",
              body: "Isolez chaque flux de transactions sans perte de résolution, du segment produit au profit net.",
            },
            {
              tag: "Zero Latency",
              title: "Vector-Based Engine",
              body: "Recalcule l'intégralité du graphe instantanément quand les valeurs changent. Aucun délai de rendu.",
            },
            {
              tag: "Audit Grade",
              title: "Immutable Records",
              body: "Chaque ajustement est consigné comme un événement de calibration distinct pour la conformité.",
            },
          ].map((f) => (
            <article
              key={f.tag}
              className="rounded-sm border-l border-border pl-6"
            >
              <div className="mb-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                {f.tag}
              </div>
              <h3 className="text-lg font-medium text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </article>
          ))}
        </section>
      </main>

      <footer className="mt-20 border-t border-border bg-background px-6 py-10">
        <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="font-mono text-xs font-medium uppercase">
              Flux.Instrument // Core Engine v4.0.2
            </div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase">
              Designed for high-frequency fiscal environments.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
