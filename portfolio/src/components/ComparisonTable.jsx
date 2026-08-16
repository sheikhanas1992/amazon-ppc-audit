import { Fragment } from "react";

const CATEGORIES = [
  {
    name: "Research and validation",
    rows: [
      { service: "3 shortlisted products", tiers: [true, true, true] },
      { service: "Brand name", tiers: [false, false, true] },
      { service: "Patent check", tiers: [false, true, true] },
    ],
  },
  {
    name: "Sourcing",
    rows: [
      { service: "Supplier selection", tiers: [true, true, true] },
      { service: "Supplier contract", tiers: [true, true, true] },
      { service: "Freight arrangement", tiers: [true, true, true] },
      { service: "Alibaba account setup", tiers: [false, true, true] },
      { service: "Sample inspection", tiers: [false, true, true] },
      { service: "3PL warehouse arrangement", tiers: [false, false, true] },
    ],
  },
  {
    name: "Branding and launch",
    rows: [
      { service: "GS1 barcode, shipment plan and listing creation", tiers: [false, false, true] },
      { service: "Logo and packaging", tiers: [false, false, true] },
      { service: "Listing images", tiers: [true, true, true] },
      { service: "Listing copywriting", tiers: [true, true, true] },
      { service: "Listing video", tiers: [true, true, true] },
      { service: "Insert card", tiers: [true, true, true] },
      { service: "Trademark and Brand Registry", tiers: [false, true, true] },
      { service: "Advertising video", tiers: [false, false, true] },
      { service: "A+ Content", tiers: [false, false, true] },
    ],
  },
  {
    name: "Account management",
    rows: [
      { service: "1 month PPC ads", tiers: [true, true, false] },
      { service: "3 months PPC ads", tiers: [false, false, true] },
      { service: "Software integrations", tiers: [false, true, true] },
      { service: "Inventory planning", tiers: [false, true, true] },
      { service: "Amazon cases and enrollments", tiers: [true, true, true] },
      { service: "Financial projections (1 year)", tiers: [false, false, true] },
    ],
  },
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mx-auto h-[15px] w-[15px] text-[#F5C542]">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dot() {
  return <span className="mx-auto block h-[7px] w-[7px] rounded-full border border-[#c7c7cc]" aria-hidden />;
}

const COL_HEAD =
  "px-4 py-3.5 text-left font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#c7c7cc] whitespace-nowrap";

/* Shown on mobile and desktop, hidden at tablet width so the table keeps
   to four readable columns there. */
const BYO_COL = "md:hidden lg:table-cell";

export default function ComparisonTable() {
  return (
    <div className="relative rounded-[20px] border border-white/[0.1] bg-[#131315] p-2 md:p-3">
      <div className="pointer-events-none absolute inset-y-2 left-2 z-10 w-8 bg-gradient-to-r from-[#131315] to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-2 right-2 z-10 w-8 bg-gradient-to-l from-[#131315] to-transparent md:hidden" />
      <div className="max-h-[70vh] overflow-auto rounded-[14px]">
        <table className="w-full min-w-[640px] border-collapse text-[0.85rem]">
          <thead>
            <tr className="sticky top-0 z-10 bg-[#131315] shadow-[0_1px_0_rgba(255,255,255,0.08)]">
              <th className={`${COL_HEAD} min-w-[220px]`}>Service</th>
              <th className={`${COL_HEAD} text-center`}>Launch</th>
              <th className={`${COL_HEAD} text-center`}>Scale</th>
              <th className={`${COL_HEAD} text-center`}>Dominate</th>
              <th
                className={`${BYO_COL} px-4 py-3.5 text-center font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] whitespace-nowrap`}
              >
                <a href="/build" className="text-[#F5C542] transition-colors hover:text-[#EDE8E0]">
                  Build your own
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => (
              <Fragment key={cat.name}>
                <tr className="bg-[#F5C542]/[0.05]">
                  <td
                    colSpan={5}
                    className="px-4 py-2.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[#F5C542]"
                  >
                    {cat.name}
                  </td>
                </tr>
                {cat.rows.map((row) => (
                  <tr
                    key={row.service}
                    className="border-b border-white/[0.06] transition-colors last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3 text-[0.88rem] font-medium text-[#d8d8dc]">{row.service}</td>
                    {row.tiers.map((on, i) => (
                      <td key={i} className="px-4 py-3 text-center">
                        {on ? <Check /> : null}
                      </td>
                    ))}
                    <td className={`${BYO_COL} px-4 py-3 text-center`}>
                      <Dot />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
