# stackArmor VDR / VER customer guidance

Customer communications and practical readiness guidance for the TSW 4.0 and
FedRAMP VDR / VER transition.

**Website:** https://stackarmor.github.io/vdr-customer-guidance/

## Contents

- `index.html`: customer overview, metadata explanation, five-step pilot,
  AI and manual options, metadata upkeep, rollout sequence, readiness checklist, and FAQs.
- `engineer-guide.html`: classification and association before scanner setup,
  scan commands, ongoing coverage updates, platform routing, and secure handoff.
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
provides the customer message, five pilot steps, mid-November planned GitLab
change requests, and December 7 milestone. The site expands that guidance with
the agency-scope, taxonomy, AI workflow, and metadata requirements discussed
with the requester. The source PDF is not distributed with the website.

Customer clarifications explain that TSW flags assets using the default H/H/H
profile, assignments generally remain stable, and existing tag, name, regex,
or namespace rules may cover newly created assets. Corrected associations
are reflected when TSW recalculates PAIN.

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
