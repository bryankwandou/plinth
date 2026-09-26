# QuantCoin pitch: sources

Compiled 2026-09-25. Every row below was fetched during compilation. VERIFIED means the number was read on the page (or in the PDF) at the URL given. SECONDARY means it was seen only in a source reporting on the original; both are named. Quotes are verbatim from the fetched text. PDF quotes were taken from extracted text, so line-break spacing may differ from the printed page.

## 1. Expert timelines for a cryptographically relevant quantum computer (CRQC)

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| T1 | 28-49% within 10 yrs; 51-70% within 15 yrs | Averaged expert probability of a CRQC (26 experts surveyed) | Global Risk Institute / evolutionQ (Mosca, Piani) | Quantum Threat Timeline Report 2025 | 2026-03-09 | https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/ | "quite possible (28-49%)" ... "likely (51-70%)" | VERIFIED |
| T2 | 34% (2024) to 49% (2025) optimistic 10-yr estimate | Year-on-year change in the report's upper 10-year figure | PostQuantum.com, reporting on GRI 2025 report | Quantum Threat Timeline Report 2025: Record Predictions, But Can the Survey Keep Up? | 2026 | https://postquantum.com/security-pqc/quantum-threat-timeline-report-2025/ | "jumped from 34% in 2024 to 49% in 2025" (search-result text; page not fetched) | SECONDARY (PostQuantum.com on GRI) |
| T3 | 19-34% by 2034; 60-82% by 2044 | Probability of widespread breaking of public-key encryption | Citi Institute (Citigroup) | Quantum Threat: The Trillion-Dollar Security Race Is On | 2026-01 | https://www.citigroup.com/rcs/citigpa/storage/public/Citi_Institute_Quantum_Threat.pdf | "19-34% Probability of widespread breaking of quantum computer-led public-key encryption by 2034, increasing to 60-82% by 2044" | VERIFIED |
| T4 | 3-5% within 5 years | Anza's own estimate of a machine able to break ECDLP-256 (the problem behind Ed25519) | Anza (Max Resnick, Sam Kim) | Securing Solana Against a Powerful Quantum Adversary | 2026-04-27 | https://www.anza.xyz/blog/securing-solana-against-a-powerful-quantum-adversary | "3–5% chance of a quantum computer capable of breaking ECDLP-256 within five years" | VERIFIED |
| T5 | "within a decade" | NIST's framing of when some experts expect a code-breaking device | NIST | NIST Releases First 3 Finalized Post-Quantum Encryption Standards | 2024-08-13 | https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards | "some experts predict that a device with the capability to break current encryption methods could appear within a decade" | VERIFIED |

## 2. Resources needed to break ECC-256 / RSA-2048

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| R1 | <500,000 physical qubits; <1,200 logical qubits, 90M Toffoli; "a few minutes" | Cost to solve ECDLP-256 (secp256k1 / Ed25519-class curves) | Google Research (Babbush, Neven) | Safeguarding cryptocurrency by disclosing quantum vulnerabilities responsibly | 2026-03-31 | https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/ | "can be executed on a superconducting qubit CRQC with fewer than 500,000 physical qubits in a few minutes" | VERIFIED |
| R2 | ~20x | Reduction in physical qubits vs previous best ECDLP-256 estimate | Google Research | same as R1 | 2026-03-31 | same as R1 | "an approximately 20-fold reduction in the number of physical qubits required to solve ECDLP-256" | VERIFIED |
| R3 | <1,000,000 noisy qubits, <1 week | Cost to factor RSA-2048 | Craig Gidney (arXiv 2505.15917) | How to factor 2048 bit RSA integers with less than a million noisy qubits | 2025-05-21 | https://arxiv.org/abs/2505.15917 | "a 2048 bit RSA integer could be factored in less than a week by a quantum computer with less than a million noisy qubits" | VERIFIED |
| R4 | 6,000 modules x 1,152 physical qubits; one key per 10 minutes; 50M Toffoli | Earlier ECC-256 key-recovery estimate (photonic architecture) | Daniel Litinski (arXiv 2306.08585) | How to compute a 256-bit elliptic curve private key with only 50 million Toffoli gates | 2023-06-14 | https://arxiv.org/abs/2306.08585 | "one key can be generated every 10 minutes using 6000 modules with 1152 physical qubits each" | VERIFIED |
| R5 | ~10x | Falcon signature size vs Ed25519 (cost of post-quantum on Solana) | Anza | see T4 | 2026-04-27 | see T4 | "FALCON signatures, the smallest of the three NIST schemes, are roughly 10 times larger than Ed25519 signatures" | VERIFIED |

Not included: Webber et al. (AVS Quantum Science 2022), publisher returned HTTP 403.

## 3. Crypto held under exposed public keys

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| E1 | "effectively all" SOL supply; >65% of ETH | Share of supply whose public keys are exposed on-chain | Citi Institute | see T3 | 2026-01 | see T3 | "For ETH, over 65% of current supply is vulnerable" ... "For SOL, it is effectively all the supply at risk" (footnote 21 between them in the PDF) | VERIFIED |
| E2 | ~25% of BTC (4.5-6.7M coins, $500-600B) | Bitcoin with exposed public keys | Citi Institute | see T3 | 2026-01 | see T3 | "25% The percentage of bitcoins (about 4.5-6.7 million coins worth $500-600 billion today) that are potentially 'quantum-exposed'" | VERIFIED |
| E3 | >4 million BTC (~25%) | Bitcoin in P2PK and reused P2PKH addresses | Deloitte Netherlands | Quantum computers and the Bitcoin blockchain | undated page (analysis c. 2020; "$40 billion" at time of writing) | https://www.deloitte.com/nl/en/services/consulting-risk/perspectives/quantum-computers-and-the-bitcoin-blockchain.html | "over 4 million BTC (about 25% of all Bitcoins) which are potentially vulnerable to a quantum attack" | VERIFIED |
| E4 | ~6.9M BTC (~1/3 supply); 4.99M from address reuse; 1.72M P2PK | Bitcoin in quantum-vulnerable addresses | Project Eleven, Bitcoin Risq List | Bitcoin Risq List | live tool | https://www.projecteleven.com/bitcoin-risq-list | Live page showed only "Crunching latest numbers..." when fetched; blog returned 403. Figures seen only in search-result text | SECONDARY (search summary of Project Eleven; not verified on page) |
| E5 | qualitative | BlackRock iShares Bitcoin Trust names quantum computing as a risk factor | BlackRock / SEC EDGAR | iShares Bitcoin Trust post-effective amendment (bit20250418_posam) | 2025 (filed May 2025) | https://www.sec.gov/Archives/edgar/data/1980994/000143774925015853/bit20250418_posam.htm | "Quantum computing technology is an emerging phenomenon which, because it is still developing, makes it difficult to predict" | VERIFIED |

## 4. Government deadlines

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| G1 | EdDSA disallowed after 2035; ECDSA/RSA at 112-bit deprecated after 2030 | NIST transition schedule for quantum-vulnerable signatures (EdDSA = Solana's Ed25519 family) | NIST | NIST IR 8547 (initial public draft): Transition to Post-Quantum Cryptography Standards | 2024-11-12 | https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf | "Disallowed after 2035" ... "EdDSA [FIPS186]" (Table 2, quantum-vulnerable digital signatures) | VERIFIED (draft, not final) |
| G2 | 2035 | US federal target to mitigate quantum risk (NSM-10) | NIST | same as G1 | 2024-11-12 | same as G1 | "with the goal of mitigating as much of the quantum risk as is feasible by 2035" | VERIFIED |
| G3 | 13 Aug 2024 | Release of FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA) | NIST | see T5 | 2024-08-13 | see T5 | "The three new standards are built for the future." | VERIFIED |
| G4 | 2028 / 2031 / 2035 | UK migration milestones: discovery and plan / priority migration / complete | UK NCSC | Timelines for migration to post-quantum cryptography | 2025-03-20 | https://www.ncsc.gov.uk/guidance/pqc-migration-timelines | "Complete migration to PQC of all your systems, services and products." (by 2035) | VERIFIED |
| G5 | end-2026 / end-2030 / end-2035 | EU: start transition / high-risk use cases migrated / all migrated | EU Commission and Member States (roadmap) | Coordinated Implementation Roadmap for the Transition to Post-Quantum Cryptography | 2025-06-23 | https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography | Official page confirmed the 23 June 2025 publication date; the year milestones sit in the PDF, which was not fetched | SECONDARY for dates (search summary of Industrial Cyber / PostQuantum.com; publication date VERIFIED) |

Not included: NSA CNSA 2.0 dates. nsa.gov and media.defense.gov returned HTTP 403.

## 5. Surveys of organisations

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| S1 | 62% worried; 5% have strategy; 95% lack roadmap; n = 2,600+ | Professionals in security, IT audit, and risk | ISACA | Despite Rising Concerns, 95% of Organizations Lack a Quantum Computing Roadmap, ISACA Finds (Quantum Pulse Poll) | 2025-04-28 | https://www.isaca.org/about-us/newsroom/press-releases/2025/organizations-lack-a-quantum-computing-roadmap-isaca-finds | 62% "worry quantum computing will break internet encryption, only 5% prioritize it" (fetch-tool paraphrase of the release; check wording before quoting on a slide) | VERIFIED (numbers); quote wording unconfirmed |
| S2 | all interviewees aware | Financial-sector executives' awareness | GRI / evolutionQ | Quantum Threat Timeline 2025: Executive Perspectives on Barriers to Action | 2025-03-21 | https://globalriskinstitute.org/publication/2025-quantum-threat-timeline-report/ | "All those interviewed were aware of the quantum threat" | VERIFIED |

Not found in fetched form: Capgemini, DigiCert, Keyfactor, Entrust/Ponemon.

## 6. Market size and investment

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| M1 | $0.42B (2025) to $2.84B (2030), CAGR 46.2% | Post-quantum cryptography market forecast | MarketsandMarkets | Post-quantum Cryptography (PQC) Market worth $2.84 billion by 2030 | 2025-10-01 | https://www.marketsandmarkets.com/PressReleases/post-quantum-cryptography.asp | "grow from USD 0.42 billion in 2025 to USD 2.84 billion by 2030, at a Compound Annual Growth Rate (CAGR) of 46.2%" | VERIFIED |
| M2 | $12.6B | Quantum start-up investment in 2025 (over 6x 2024) | McKinsey Quantum Technology Monitor 2026, via Consulting.us | Quantum computing reaches commercial turning point, McKinsey report finds | 2026-06-10 | https://www.consulting.us/news/13514/quantum-computing-reaches-commercial-turning-point-mckinsey-report-finds | "investment in quantum technology startups reached $12.6 billion in 2025 – more than six times the total recorded in 2024" | SECONDARY (Consulting.us on McKinsey; McKinsey page timed out) |
| M3 | $2.0-3.3 trillion | Indirect US GDP-at-risk from a single-day quantum attack on one top-five bank's Fedwire access | Citi Institute (citing a 2023 study) | see T3 | 2026-01 | see T3 | "$2.0-$3.3tn Estimated indirect impact (GDP-at-risk) from a single-day quantum attack on one top-five U.S. bank's access to Fedwire" | VERIFIED (Citi citing a third-party study) |

## 7. Solana-specific

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| L1 | 224-bit truncated Keccak256; 112-bit quantum collision / 224-bit preimage security | Existing Solana Winternitz vault design (lamports only, single use) | Dean Little / Blueshift (GitHub) | solana-winternitz-vault | repo (published 2025-01) | https://github.com/deanmlittle/solana-winternitz-vault | "Uses a 224-bit truncated Keccak256 hash to conform to Solana's compute/instruction limits" | VERIFIED |
| L2 | 2025-01-04 | Press coverage date of the Winternitz vault launch | DL News | Quantum computing threat spurs Solana developer to build future-proof feature | 2025-01-04 | https://www.dlnews.com/articles/web3/quantum-computing-threat-spurs-solana-dev-to-build-feature/ | "We are about five years away from commercial quantum computers being able to break the elliptic curve keys" (Pierre-Luc Dallaire-Demers, quoted) | VERIFIED |
| L3 | 3-phase plan; Falcon chosen | Solana Foundation's official quantum roadmap (Anza and Firedancer) | Solana Foundation | Solana's Quantum Readiness | 2026-04 | https://solana.com/news/quantum-readiness | "If quantum becomes a credible threat, adopt a post-quantum scheme for new wallets" | VERIFIED |
| L4 | "over two years" | Age of Blueshift's Winternitz vault; cited by Google Quantum AI | Solana Foundation | same as L3 | 2026-04 | same as L3 | Winternitz vault has "been in place for over two years" | VERIFIED |
| L5 | SIMD-0296, SIMD-0385, SIMD-0461 | Protocol changes needed for native PQ signatures (tx size, precompile) | Anza | see T4 | 2026-04-27 | see T4 | Named in Anza's checklist; SIMD-0296 raises max tx size from 1,232 to 4,096 bytes (search summary) | VERIFIED (SIMD numbers); SECONDARY (byte sizes) |
| L6 | $1.3B | Value held in Solana-based DAO treasuries (DeepDAO) | Decrypt, citing DeepDAO | DAO Treasuries Top $8.2 Billion on Ethereum, $1.3B on Solana: DeepDAO | 2022-03-18 | https://decrypt.co/95470/dao-treasuries-ethereum-solana-deepdao | "with $1.3 billion held by DAOs built on Solana alone" | SECONDARY (Decrypt on DeepDAO; figure is from 2022) |

No credible figure was found for the total value of Solana tokens in vesting contracts.

## 8. "Harvest now, decrypt later" from official bodies

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| H1 | n/a | NIST statement of the threat | NIST | see G1 | 2024-11-12 | see G1 | "adversaries collect encrypted data now with the goal of decrypting it once quantum technology matures" | VERIFIED |
| H2 | n/a | CISA referencing G7 financial-sector roadmap | CISA | Quantum (cisa.gov/quantum) | undated page | https://www.cisa.gov/quantum | "provides suggested timelines to reduce 'harvest now, decrypt later' risks" | VERIFIED |

## 9. Treasury and DAO sizes

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| D1 | $25.1B | Total assets in all DAO treasuries (DeepDAO) | Cointelegraph, citing DeepDAO | DAO treasuries top $25 billion for the first time: DeepDAO | 2023-03-31 | https://cointelegraph.com/news/dao-treasuries-top-25-billion-for-the-first-time-deepdao | "total assets for all decentralized autonomous organizations reached a record $25.1 billion" | SECONDARY (Cointelegraph on DeepDAO; 2023 figure) |

## 10. Data that cuts against the pitch

| id | number | what it measures | publisher | title | date | URL | quote | status |
|---|---|---|---|---|---|---|---|---|
| A1 | "highly unlikely" in the 2020s | a16z view on CRQC timing | a16z crypto (Justin Thaler) | Quantum computing and blockchains: misconceptions, realities, and planning migrations | 2025-12-05 | https://a16zcrypto.com/posts/article/quantum-computing-misconceptions-realities-blockchains-planning-migrations/ | "We are nowhere near a cryptographically relevant quantum computer by any reasonable reading of public milestones and resource estimates." | VERIFIED |
| A2 | n/a | Harvest-now-decrypt-later does not apply to signatures | a16z crypto | same as A1 | 2025-12-05 | same as A1 | "There's no confidentiality to retroactively attack." | VERIFIED |
| A3 | "years away" | Solana Foundation says no immediate action needed; has its own Falcon plan | Solana Foundation | see L3 | 2026-04 | see L3 | "Quantum is still years away" | VERIFIED |
| A4 | 3-5% in 5 years | Low near-term probability (same as T4) | Anza | see T4 | 2026-04-27 | see T4 | see T4 | VERIFIED |
| A5 | 5% | Share of organisations treating quantum as a near-term priority | ISACA | see S1 | 2025-04-28 | see S1 | see S1 | VERIFIED |

## What the data supports and what it does not

Supports:
- The cost of breaking the curve behind Ed25519 has fallen quickly on paper: 6,000 modules of 1,152 physical qubits (about 6.9 million) in Litinski's 2023 photonic estimate, fewer than 500,000 in Google's 2026 estimate, and a few minutes of runtime once a public key is known (R1, R2, R4).
- On Solana an account's address is its Ed25519 public key, so every funded account is exposed. Citi says it plainly: "effectively all" SOL supply is at risk, against about 25% of BTC (E1, E2).
- Standards bodies have set dates. NIST's draft disallows EdDSA after 2035, and the UK and EU both finish migration by 2035 (G1, G4, G5). Anything that has to stay safe past 2035 needs a plan now.
- Expert surveys put a CRQC within 15 years at better than even odds (T1, T3). A treasury or vesting balance that sits for years is the case where that window matters.
- The one existing Solana vault is lamport-only and single-use (L1). A Token-2022 vault that combines Ed25519 with WOTS is a different design from it.

Does not support:
- Urgency this year. Anza puts the five-year chance at 3-5%, a16z calls a 2020s machine highly unlikely, and the Solana Foundation says quantum is "still years away" (A1, A3, A4).
- "Harvest now, decrypt later" as a reason for signature protection. That threat is about encrypted data. For signatures the risk starts only once a CRQC exists, though a public key exposed today can be attacked on that day (A2). Pitch it as "exposed keys are already published", not "harvest now".
- A unique position on Solana. Anza and Firedancer have picked Falcon, have a three-phase migration plan, and are sketching zero-knowledge proofs that tie new post-quantum keys to existing addresses (L3, T4). If that ships, an opt-in vault loses much of its purpose. The honest case for QuantCoin is protection today for balances that cannot wait for a network upgrade, with a stated exit once native PQ signatures arrive.
- A market figure for this product. PQC market forecasts (M1) cover enterprise software, not on-chain vaults. The treasury figures are dated (2022, 2023) and secondhand (L6, D1).
- Demand. QuantCoin is on devnet, unaudited, with no users. Surveys show concern (62%) but little action (5%) (S1). This is a gap between worry and action, not proof that anyone will pay.
