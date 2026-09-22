export const workingGroups = [
  {
    "id": "wg1",
    "name": "WG1 — Terminology, Standards & Interoperability (AI-ready)",
    "purpose": "Establish the common language and technical foundations so all partners can describe mental-health phenomena and datasets in compatible ways, and AI systems (LLMs/RAG/KGs) can be audited, traced and integrated safely.",
    "classificationNote": "In psychiatry, multiple classification systems coexist, and experts often disagree on diagnostic boundaries or construct definitions. To ensure conceptual consistency and interoperability, this Action adopts the ICD-11 framework as its primary reference. ICD-11 offers globally standardized terminology, dimensional specifiers aligned with current clinical practice, and digital compatibility that facilitates integration with AI-ready knowledge representations.",
    "streams": [
      {
        "label": "A-PSY",
        "description": "Curate a clinically grounded Open Glossary (ICD-11 constructs, symptom clusters, outcomes), define Minimal Clinical Dataset elements and consent language understandable to patients and clinicians."
      },
      {
        "label": "B-INF",
        "description": "Specify Knowledge-Graph (KG) schema & ontology mappings (ICD-11/SNOMED/etc.), FAIR metadata profiles, and LLM artefact standards (prompt/trace logging, data sheets, model cards, RAG citation fields)."
      }
    ],
    "participants": "Clinical taxonomists, psychometricians, health-informatics and semantic-web engineers, data stewards.",
    "interfaces": "Other groups consult the glossary and standards. Joint working sessions support reuse; WG1 retains responsibility for these deliverables.",
    "outOfScope": "Running acquisition studies, building benchmarks, or doing pilots.",
    "shortName": "Terminology & standards",
    "summary": "A common language for clinical and technical teams.",
    "audience": "Clinical taxonomists, psychometricians and semantic-web engineers.",
    "output": "Open glossary, clinical dataset definitions and knowledge-graph standards."
  },
  {
    "id": "wg2",
    "name": "WG2 — Acquisition Protocols & Cohort Registry (LLM/KG-friendly)",
    "purpose": "Harmonise how data are captured and documented (clinical, psychometric, speech/conversation, paralinguistics), and catalogue existing cohorts/tools so teams can align methods without sharing raw data.",
    "streams": [
      {
        "label": "A-PSY",
        "description": "Produce a Protocol Compendium for clinical/psychometric/speech elicitation; define annotation guides (turn-level intents, affect, uncertainty, clinician rationales) with inter-rater procedures."
      },
      {
        "label": "B-INF",
        "description": "Deliver a Registry Portal & API (cohorts, measures, tools) and a KG Population Playbook to transform registry metadata into a KG (provenance included). No new data collection."
      }
    ],
    "participants": "Clinicians, speech scientists, annotators, data managers, software engineers.",
    "interfaces": "WG3 may reference registry metadata to design tasks; WG1 standards inform the registry.",
    "outOfScope": "Conducting clinical pilots.",
    "shortName": "Protocols & cohort registry",
    "summary": "Consistent ways to describe data and discover existing resources.",
    "audience": "Clinicians, speech scientists, data managers and software engineers.",
    "output": "Acquisition protocols, a cohort registry and a knowledge-graph playbook."
  },
  {
    "id": "wg3",
    "name": "WG3 — Tasks, Metrics & Benchmark Design (AI/LLM focus)",
    "purpose": "Define what good looks like for mental-health AI by specifying reference tasks, metrics (factuality, faithfulness, calibration, bias/fairness, robustness, multilinguality, speech), and baseline suites for LLM/RAG/KG methods.",
    "clinicalReasoningNote": "Map the clinical reasoning chain from patient presentation to diagnosis, from diagnosis to treatment decision, and from intervention to outcome assessment, across three high-pressure settings: emergency departments, general psychiatry outpatient clinics, and primary care. Identify critical points and failure modes in this chain that may compromise diagnostic accuracy or treatment appropriateness. Define current gold standards for diagnostic and therapeutic decision-making, and specify how AI-based systems could support clinicians in improving consistency, timeliness, and quality of care.",
    "streams": [
      {
        "label": "A-PSY",
        "description": "Specify clinically meaningful tasks (screening, differential triage, longitudinal monitoring), inclusion/exclusion and gold-standard labelling; define fairness constructs and outcome measures."
      },
      {
        "label": "B-INF",
        "description": "Deliver a Metric Pack & Evaluation Toolkit (docs + test sets), Challenge Rulebook (reproducibility, privacy, safety), and public leaderboards with transparent baselines (where permissible)."
      }
    ],
    "participants": "Clinical methodologists, evaluation scientists, ML/NLP/ASR researchers, benchmark curators.",
    "interfaces": "Consults WG1 and WG2 documents and shares evaluation reports with the network.",
    "outOfScope": "Executing hospital pilots/implementations.",
    "shortName": "Tasks & evaluation",
    "summary": "Shared methods to assess the quality and safety of mental-health AI.",
    "audience": "Clinical methodologists, AI researchers and evaluation scientists.",
    "output": "Reference tasks, metrics, evaluation tools and benchmark guidance."
  },
  {
    "id": "wg4",
    "name": "WG4 — Implementation Guidelines & Clinical Workflow Integration (AI systems)",
    "purpose": "Turn standards and benchmarks into actionable guidance for safe, usable AI-assisted DSS in emergency departments, primary care and community mental-health centres without building products.",
    "evaluationNote": "Evaluate whether and how AI-based models considered by the Action effectively enhance clinical performance, by assessing their impact on diagnostic accuracy, decision-making quality, and time efficiency in simulated environments replicating real-world workflows.",
    "streams": [
      {
        "label": "A-PSY",
        "description": "Create UX heuristics for clinicians/patients, cognitive-load and acceptability checklists, safety & escalation pathways (human-in-the-loop)."
      },
      {
        "label": "B-INF",
        "description": "Publish reference architectures (on-prem/edge, hybrid-cloud) for RAG over EHR with KG back-ends, prompt governance & guardrails, monitoring (drift, performance, safety) and auditability."
      }
    ],
    "participants": "Clinicians with service-design interest, HCI/UX researchers, health-IT architects, MLOps engineers.",
    "interfaces": "Uses shared standards and benchmarks to inform guidance; site implementation remains outside this group’s scope.",
    "outOfScope": "Defining standards (WG1) or benchmark metrics (WG3); no site deployments/pilots.",
    "shortName": "Clinical workflow & implementation",
    "summary": "Practical guidance for safe, usable decision-support systems.",
    "audience": "Clinicians, user-experience researchers and health-IT architects.",
    "output": "Workflow guidance, safety checklists and reference architectures."
  },
  {
    "id": "wg5",
    "name": "WG5 — Ethics, Policy, Training & Communication (Responsible AI)",
    "purpose": "Ensure responsible AI across the Action: ethics, legal and social implications; governance models; capacity-building (Training Schools/STSMs) for both communities; clear communication to clinicians, patients and policymakers.",
    "responsibleAINote": "Expand responsible-AI activities to include post-deployment monitoring frameworks that assess ethical, clinical, and social impacts over time (“ethics in use”). Strengthen patient involvement through co-creation of communication and training materials, ensuring that AI explainability tools and consent information are accessible, transparent, and sensitive to stigma and cultural diversity.",
    "streams": [
      {
        "label": "A-PSY",
        "description": "Develop risk scenarios for mental-health AI (consent, stigma, harm mitigation, accessibility), clinician-facing training and patient communication toolkits."
      },
      {
        "label": "B-INF",
        "description": "Define AI governance & model-risk tiers (documentation, logging, approvals), procurement policy briefs, and technical training on LLM/RAG/KG safety & evaluation."
      }
    ],
    "participants": "Bioethicists, clinicians, legal scholars, standards liaisons, safety/assurance engineers, science communicators.",
    "interfaces": "Shares governance documents and training across the network; each group retains responsibility for its own deliverables.",
    "outOfScope": "Writing technical standards (WG1), acquisition protocols (WG2), or metric design (WG3).",
    "shortName": "Ethics, training & communication",
    "summary": "Responsible AI practice shared across the network.",
    "audience": "Bioethicists, clinicians, legal scholars and science communicators.",
    "output": "Governance guidance, training and patient communication materials."
  }
]

export const challenges = [
  {
    "label": "Barrier",
    "title": "Early diagnosis difficulties",
    "body": "Mental health conditions often go undetected until they reach advanced stages, missing crucial windows for early intervention and prevention."
  },
  {
    "label": "Barrier",
    "title": "Symptom variability",
    "body": "Mental health symptoms manifest differently across individuals, cultures, and contexts, making standardised diagnosis challenging."
  },
  {
    "label": "Barrier",
    "title": "Access barriers",
    "body": "Limited resources, geographic disparities, and stigma create significant obstacles to accessing timely mental health support and treatment."
  }
]

export const intendedOutcomes = [
  {
    "title": "Enhanced diagnostic accuracy through AI-powered assessment tools."
  },
  {
    "title": "Reduced waiting times for mental health assessments and interventions."
  },
  {
    "title": "Cross-border knowledge sharing and best practice development."
  },
  {
    "title": "Training opportunities for early-career researchers in digital mental health."
  },
  {
    "title": "Ethical frameworks for responsible AI use in mental health care."
  }
]
