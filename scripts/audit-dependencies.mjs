import { spawnSync } from "node:child_process";

function audit(args) {
  const result = spawnSync("npm", ["audit", "--json", ...args], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.error) throw result.error;

  let report;
  try {
    report = JSON.parse(result.stdout);
  } catch {
    throw new Error(`npm audit returned invalid JSON: ${result.stderr.slice(0, 600)}`);
  }
  if (!report.metadata?.vulnerabilities || !report.vulnerabilities) {
    throw new Error(`npm audit did not return a vulnerability report: ${result.stderr.slice(0, 600)}`);
  }

  const rows = Object.entries(report.vulnerabilities)
    .map(([name, vulnerability]) => ({
      name,
      severity: vulnerability.severity,
      direct: Boolean(vulnerability.isDirect),
      range: vulnerability.range,
      fix:
        vulnerability.fixAvailable === false
          ? "none reported"
          : typeof vulnerability.fixAvailable === "object"
            ? `${vulnerability.fixAvailable.name}@${vulnerability.fixAvailable.version}${vulnerability.fixAvailable.isSemVerMajor ? " (major)" : ""}`
            : "available",
      advisories: vulnerability.via
        .filter((via) => typeof via === "object")
        .map((via) => ({
          url: via.url,
          title: via.title,
          severity: via.severity,
          range: via.range,
        })),
    }))
    .sort(
      (a, b) =>
        ["critical", "high", "moderate", "low"].indexOf(a.severity) -
        ["critical", "high", "moderate", "low"].indexOf(b.severity)
    );

  return { counts: report.metadata.vulnerabilities, rows };
}

const all = audit([]);
const production = audit(["--omit=dev"]);

console.log("DEPENDENCY SECURITY BASELINE — Node.js 22");
console.log("All dependency severities:", JSON.stringify(all.counts));
console.log("Runtime dependency severities:", JSON.stringify(production.counts));
console.log("Counts describe dependency findings, not independently validated exploitability.");
console.log(
  "Runtime high/critical findings:",
  JSON.stringify(production.rows.filter((row) => ["critical", "high"].includes(row.severity)), null, 2)
);
console.log(
  "Development-only high/critical findings:",
  JSON.stringify(
    all.rows.filter(
      (row) =>
        ["critical", "high"].includes(row.severity) &&
        !production.rows.some((runtime) => runtime.name === row.name)
    ),
    null,
    2
  )
);
console.log("This is a discovery report; it does not run npm audit fix or apply major updates.");
