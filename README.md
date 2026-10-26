# stackArmor VDR / VER customer guidance

Customer communications and practical readiness guidance for the TSW 4.0 and
FedRAMP VDR / VER transition.

**Website:** https://stackarmor.github.io/vdr-customer-guidance/

## Contents

- `index.html`: customer overview, eight-factor evaluation overview and links to the detailed method,
  browser-saved readiness checklist, completion and handoff checks, metadata explanation, required setup and optional local/SDLC scanning,
  AI and manual options, metadata upkeep, rollout sequence, prominent FAQs, and update subscriptions.
- `engineer-guide.html`: engineering guide for cloud CLI / vdr-cloud.yaml and
  Kubernetes classification, profile association, ongoing coverage updates,
  and optional container scanning, with Kubernetes-specific scan commands.
- `evaluation-method.html`: vendor evaluation history, decision transparency, protocol
  and attack-path examples, RADAR TRACE research, exploitability/detectability,
  chaining, remediation-component examples, integration criteria, and peer feedback.
- `agency-transition.html`: agency discussion questions, continued DoD/DoW workflow
  support, possible parallel processes, and a planned CSV view of VDR results.
- `assets/site.css`, `assets/theme.js`, and `assets/site.js`: responsive light / dark
  styling, saved appearance preferences, and clipboard interactions.

## Preview and publishing

This is a buildless static website, with no package dependencies or external
font / script services. Preview from the repository directory:

```sh
python3 -m http.server 8765
```

Open http://localhost:8765/. GitHub Pages publishes the root of `main`.
`.nojekyll` keeps the source files unchanged during publication.

## Appearance

All four pages include a Dark mode toggle in the main navigation. The first
visit follows the system appearance; an explicit choice is saved locally and
reused across pages and tabs. System changes remain effective until a choice
is made. The small theme script runs before the stylesheet to avoid a flash of
the wrong appearance. If local storage is unavailable, the current page still
supports switching themes. Print uses the light palette.

Shared styles and scripts use content-hash query parameters so a newly deployed
page cannot reuse an older cached theme stylesheet. After editing CSS or
JavaScript, refresh the URLs before committing:

```sh
python3 scripts/version-assets.py
```

## Readiness checklist

The seven-step checklist lives at `index.html#get-started`, immediately after
the hero. It saves only completion flags and the Kubernetes applicability choice
in the browser under `stackarmor-vdr-readiness-v1`. No form submission, analytics,
or network request transmits that progress. Clearing site storage removes it;
blocked storage leaves the checklist usable for the current visit with a notice.
It records customer-confirmed progress and does not inspect infrastructure or
verify TSW onboarding. Existing keyboard controls and light/dark colors apply.

The overview and engineering guide distinguish Kubernetes production readiness,
completed cloud metadata preparation, and the final stackArmor-owned onboarding
step. Deployment and testing remain subject to approved in-boundary CRs.
AI guidance describes fully open-source plain-English instructions, inspectable
scripts, customer-controlled CLI credentials, and metadata-only scope with an
approved agent.

### Pending answers and editorial TODOs

- Deviation requests: their treatment during the transition still needs guidance.
- Coverage-gap causes: confirm whether newly added resources and a
  non-representative environment are the exhaustive intended list. The cloud
  skill also reports authentication, CLI, quota, and transport failures as gaps
  (`generate-cloud-vdr-config/SKILL.md`, installed v0.12.1, line 167).

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
a local VDR scoring preview for those resources. Other container technologies
require immediate coordination; an external scanner must emit the identical
Trivy VDR JSON report format for agreed cloud-storage ingestion.

Non-production TSW accounts retain full PAIN scores and are logically separated
from production; their vulnerabilities are excluded from TSW's FedRAMP
requirement tracking, reporting, and incident automation. The site no longer
offers a stackArmor preview walkthrough.

The initial customer workflow uses two skills: `generate-k8s-vdr-configmap`
for Kubernetes workloads and `generate-cloud-vdr-config` for other cloud
workloads / resources, including VMs, managed databases, AWS ECS, and GCP Cloud Run. The latter inventories through AWS / Azure / GCP CLIs
and emits `vdr-cloud.yaml`. This cloud YAML includes cloud-native containers as
well as non-container workloads; the engineering guide spans workload types.
Environments with Kubernetes and cloud resources
need both outputs. Corresponding update skills are for later maintenance;
other published skills are deprecated or intended for stackArmor employees
and are shared for transparency.

Classification and profile association are required customer work now.
Kubernetes production readiness requires the in-cluster plugin, generated
ConfigMap, latest plugin run, and metadata association with no default profiles.
Local exploration and SDLC scanning are optional additions. Cloud metadata
preparation is complete once the YAML is uploaded and stackArmor confirms
TSW’s cloud identity has read access; TSW onboarding remains a stackArmor step. The earlier Kubernetes testing guide supplied the
initial evaluation framing; current customer instructions take precedence.

Docker Swarm scanning is available in the plugin, but the agent skills do not
yet cover Docker Swarm. Customers should contact stackArmor support through
their engagement manager or shared Slack channel for the path forward.

Supporting sources:

- [Earlier Kubernetes scanner testing guide](https://github.com/stackArmor/rfc-fedramp-vdr/blob/main/docs/customer-vdr-testing-summary.md)
- [VDR agent skills](https://github.com/stackArmor/vdr-agent-skills)
- [Security-impact profile classification guide](https://github.com/stackArmor/vdr-agent-skills/blob/main/skills/generate-k8s-vdr-configmap/references/archetype-guide.md)
- [Trivy VDR plugin](https://github.com/stackArmor/trivy-plugin-vdr)
- [RADAR TRACE public analysis](https://github.com/stackArmor/radar-trace-public)
- [RADAR TRACE reachability gates](https://github.com/stackArmor/radar-trace-public/blob/main/docs/reachability-gates.md)
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

The overview's `#evaluation-method` section maps TSW's method to the eight
VER-EVA-EFA factors. It explains how detectability informs exploitation
likelihood and how asset classification incorporates privilege. The detailed
method page defines a **remediation component** as the configuration
component that must change for a fix to survive restart, redeployment, or scaling;
the overview retains `#prevalence` as a short explanation and link.
Container examples retain each image reference, including init containers;
auto-scaling VM examples identify the ASG and its launch configuration/template.
Counts describe response scope without requiring an independent PAIN multiplier.
Customer-supplied method clarifications and the reviewed eight-factor analysis
inform this mapping. FedRAMP VER-EVA-EFA was checked against
the linked official reference on October 23, 2026. The mapping describes the
evaluation method; individual evaluation timing and operating results remain
separate. Keep potential chaining assumptions distinct from demonstrated paths.

The FAQ links to `evaluation-method.html` for the user-supplied Tenable/Wiz
assessment history, expected customer-cost implications, explainability needs,
and future-integration criteria. Present the assessment as historical and
specific to stackArmor's service, rather than a current claim about all products.
Peer feedback is attributed to stackArmor's discussions with 3PAOs and CSP-AB
participants; it is not an independent market ranking. The user supplied the
NIST submission statement. Describe it as a proposal, not an endorsement.
RADAR TRACE's public README and reachability-gates documentation support the
attack-path discussion; distinguish research being incorporated from current
TSW behavior. Document differing EPSS thresholds for IRV and NIRV without
publishing their numeric values. Keep blocked-path examples conditional on
verified protocol, route, and source restrictions. Strictly curated public-IP
allowlists tied to trusted entities, with all other sources blocked at the edge,
can support IRV-to-NIRV reclassification. Tie third-party documentation questions
to concrete protocol, direction, source-restriction, and discovery decisions;
absence of clear public documentation is not a claim that vendors ignore them.
Describe the lower IRV EPSS threshold relative to NIRV as the explicit mechanism
by which detectability influences the likelihood determination, without numeric
threshold values.

The agency-transition guide records the October 24 customer clarification:
legacy vulnerability workflows remain functional for DoD/DoW customers; mixed
systems supporting both DoD/DoW and FedRAMP may need parallel processes for an uncertain duration.
Customers should consult their sponsors about acceptance and expectations.
A CSV POA&M export of VDR results is planned using the previous FedRAMP
template, with no availability date specified. This does not offer
a separate traditional POA&M process for FedCiv agencies; continued legacy
workflow support is specific to DoD/DoW workloads. Explain its potentially different identifiers and VDR-based PAIN,
likelihood, reachability, and due dates. Agency readiness discussions do not
replace the published FedRAMP adoption milestone. Invite agency feedback through
the established customer channels.

Keep the visible update date and milestone text current when plans change.
Distinguish stackArmor rollout plans from regulatory dates. Keep customer
artifacts, customer identifiers, scan output, credentials, and internal account
plans out of this public repository. The site has no forms, uploads, analytics, or server API.

## Update subscriptions

Subscribe to every new commit on `main` using GitHub's native Atom feed:

https://github.com/stackArmor/vdr-customer-guidance/commits/main.atom

The feed is maintained by GitHub; no manual feed entries or publishing jobs are
needed. The website's Updates section includes a copyable URL and guidance for
Slack, Atom-compatible Teams apps, and RSS/Atom readers. All four pages declare the
feed with an HTML alternate link for feed discovery. Notifications depend on
the selected integration's refresh schedule and may precede Pages deployment.

Keep commit subjects clear enough to be useful to customer subscribers.

We expect limited repository updates after December 2026. During rollout,
customer questions will drive updates to the page and FAQ so other customers
can benefit from the answers.
