# stackArmor VDR / VER customer guidance

Customer communications and practical readiness guidance for the TSW 4.0 and
FedRAMP VDR / VER transition.

**Website:** https://stackarmor.github.io/vdr-customer-guidance/

## Contents

- `index.html`: customer overview, metadata explanation, five-step pilot,
  AI and manual options, metadata upkeep, rollout sequence, readiness checklist, prominent FAQs, and update subscriptions.
- `engineer-guide.html`: Kubernetes-specific classification and scan steps,
  a prominent companion cloud CLI / vdr-cloud.yaml workflow, ongoing coverage
  updates, platform routing, and secure handoff.
- `assets/site.css` and `assets/site.js`: responsive styling and optional
  browser-local checklist / clipboard interactions.

## Preview and publishing

This is a buildless static website, with no package dependencies or external
font / script services. Preview from the repository directory:

```sh
python3 -m http.server 8765
```

Open http://localhost:8765/. GitHub Pages publishes the root of `main`.
`.nojekyll` keeps the source files unchanged during publication.

## Editorial sources

The supplied **stackArmor VDR guidance overview**, dated October 23, 2026,
provides the initial customer message and December 7 milestone. Current
customer guidance reflects the subsequent stackArmor clarification that TSW
VDR features begin reaching customers during the week of Veterans Day
(November 9–13, 2026), with environment-specific change coordination. The site expands that guidance with
the agency-scope, taxonomy, AI workflow, and metadata requirements discussed
with the requester. The source PDF is not distributed with the website.

Customer clarifications explain that TSW flags assets using the default H/H/H
profile, assignments generally remain stable, and existing tag, name, regex,
or namespace rules may cover newly created assets. Corrected associations
are reflected when TSW recalculates PAIN.

Additional customer guidance recommends read-only Kubernetes contexts / cloud
CLI profiles and architecturally representative staging environments. It
strongly recommends AI assistance for classification. VM and managed database
scoring remains fully supported in TSW, with COTS scanner limitations preventing
a local VDR scoring pilot for those resources. Other container technologies
require immediate coordination; an external scanner must emit the identical
Trivy VDR JSON report format for agreed cloud-storage ingestion.

Non-production TSW accounts retain full PAIN scores and are logically separated
from production; their vulnerabilities are excluded from TSW's FedRAMP
requirement tracking, reporting, and incident automation. The site no longer
offers a stackArmor preview walkthrough.

The initial customer workflow uses two skills: `generate-k8s-vdr-configmap`
for Kubernetes workloads and `generate-cloud-vdr-config` for non-Kubernetes
cloud workloads / resources. The latter inventories through AWS / Azure / GCP CLIs
and emits `vdr-cloud.yaml`. Environments with Kubernetes and cloud resources
need both outputs. Corresponding update skills are for later maintenance;
other published skills are deprecated or intended for stackArmor employees
and are shared for transparency.

Supporting sources:

- [Customer Kubernetes VDR pilot guide](https://github.com/stackArmor/rfc-fedramp-vdr/blob/main/docs/customer-vdr-testing-summary.md)
- [VDR agent skills](https://github.com/stackArmor/vdr-agent-skills)
- [Security-impact profile classification guide](https://github.com/stackArmor/vdr-agent-skills/blob/main/skills/generate-k8s-vdr-configmap/references/archetype-guide.md)
- [Trivy VDR plugin](https://github.com/stackArmor/trivy-plugin-vdr)
- [FedRAMP notice NTC-0014](https://www.fedramp.gov/notices/0014/)
- [FedRAMP VDR reference](https://www.fedramp.gov/2026/reference/rev5/d/vulnerability-detection-and-response/)
- [FedRAMP VER reference](https://www.fedramp.gov/2026/reference/rev5/d/vulnerability-evaluation-and-reporting/)

The site clarifies the overview's simplified N4/N5 statement: missing
classification triggers conservative H/H/H and multi-agency inputs, but the
resulting tier still depends on the vulnerability's impact. It also explains
that read-only metadata collection does not by itself make the data suitable
for any AI service. Specific model authorization claims are intentionally
avoided; customers use approved services and configurations.

## Content maintenance

Keep the visible update date and milestone text current when plans change.
Distinguish stackArmor rollout plans from regulatory dates. Keep customer
artifacts, customer identifiers, scan output, credentials, and internal account
plans out of this public repository. The checklist is stored only in the
visitor's browser; the site has no forms, uploads, analytics, or server API.

## Update subscriptions

Subscribe to every new commit on `main` using GitHub's native Atom feed:

https://github.com/stackArmor/vdr-customer-guidance/commits/main.atom

The feed is maintained by GitHub; no manual feed entries or publishing jobs are
needed. The website's Updates section includes a copyable URL and guidance for
Slack, Atom-compatible Teams apps, and RSS/Atom readers. Both pages declare the
feed with an HTML alternate link for feed discovery. Notifications depend on
the selected integration's refresh schedule and may precede Pages deployment.

Keep commit subjects clear enough to be useful to customer subscribers.

We expect limited repository updates after December 2026. During rollout,
customer questions will drive updates to the page and FAQ so other customers
can benefit from the answers.
