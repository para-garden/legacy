---
label: "Stratum Technologies — Model Training Cost Analysis, Q2 2032"
description: "Frontier-7 cost $340 million to train. It scores 2.1 points higher than Frontier-6 on the benchmark. Frontier-6 cost $180 million. The next one will cost $600 million. The benchmark is a number."
tags: [document, futility, hubris, satisfaction, distance, margins]
collections: [default]
related:
  - stratum-annual-sustainability-report-2032
  - stratum-colo-east-environmental-compliance-q3-2032
  - lede-stratum-trillion-dollar-buildout-2032
  - stratum-series-b-pitch-memo-2029
---

<div class="page">

<div class="letterhead">
<div class="letterhead-name">STRATUM TECHNOLOGIES</div>
<div class="letterhead-dept">AI Research Division — Internal</div>
<div class="letterhead-addr">CONFIDENTIAL — Executive Distribution Only</div>
</div>

**MEMORANDUM**

| | |
|---|---|
| **To:** | Executive Leadership Team |
| **From:** | K. Ostrowski, VP of Research |
| **Date:** | July 22, 2032 |
| **Re:** | Frontier-7 Training Cost Analysis and Frontier-8 Projections |

---

### Executive Summary

Frontier-7, our seventh-generation foundation model, completed training on July 14, 2032. This memo summarizes costs, performance, and projections for the next training run.

---

### Training Cost — Frontier-7

| | |
|---|---:|
| GPU cluster | 24,576 × H100 (Colo-East campus) |
| Training duration | 94 days |
| Total GPU-hours | [55.4 million](https://epochai.org/data/notable-ai-models) |
| Compute cost (internal rate) | $224,000,000 |
| Electricity (94 days @ [847 GWh annualized](https://stratum-annual-sustainability-report-2032)) | $18,200,000 |
| Water (cooling, 94-day allocation) | $1,100,000 |
| Data licensing and curation | $42,000,000 |
| Research staff (allocated, 14-month project) | $38,000,000 |
| Infrastructure depreciation (proportional) | $16,800,000 |
| **Total Frontier-7 Training Cost** | **$340,100,000** |

---

### Performance — Frontier Model Series

| Model | Release | Parameters | Training Cost | MMLU | HumanEval | ARC-AGI | Overall Composite |
|---|---|---:|---:|---:|---:|---:|---:|
| Frontier-3 | Q1 2030 | 220B | $28M | 78.4 | 64.2 | 12.1 | 51.6 |
| Frontier-4 | Q3 2030 | 540B | $67M | 83.1 | 72.8 | 18.4 | 58.1 |
| Frontier-5 | Q2 2031 | 980B | $112M | 87.2 | 81.4 | 24.7 | 64.4 |
| Frontier-6 | Q4 2031 | 1.8T | $180M | 90.1 | 86.3 | 31.2 | 69.2 |
| **Frontier-7** | **Q3 2032** | **3.2T** | **$340M** | **91.4** | **88.1** | **34.8** | **71.4** |

---

### Cost-Performance Analysis

| Metric | Frontier-5 → 6 | Frontier-6 → 7 |
|---|---:|---:|
| Training cost increase | +60.7% | +88.9% |
| Parameter increase | +83.7% | +77.8% |
| MMLU improvement | +2.9 pts | +1.3 pts |
| HumanEval improvement | +4.9 pts | +1.8 pts |
| ARC-AGI improvement | +6.5 pts | +3.6 pts |
| Overall Composite improvement | +4.8 pts | **+2.2 pts** |
| **Cost per composite point gained** | **$14.2M / pt** | **$72.8M / pt** |

The cost per composite point improved from $14.2 million to $72.8 million — a **5.1× increase in marginal cost per unit of capability gain**. This trend is consistent with [the scaling laws literature](https://arxiv.org/abs/2001.08361), which predicts diminishing returns to scale in the absence of architectural innovation.

---

### Frontier-8 Projections

Based on current scaling trajectories and the assumption of no architectural breakthrough:

| Scenario | Parameters | Est. Training Cost | Projected Composite | Δ Composite | Cost/Point |
|---|---:|---:|---:|---:|---:|
| Conservative (1.5× scale) | 4.8T | $480M | 72.8 | +1.4 | $343M/pt |
| Baseline (2× scale) | 6.4T | $620M | 73.6 | +2.2 | $127M/pt |
| Aggressive (3× scale) | 9.6T | $940M | 74.8 | +3.4 | $100M/pt |

**At baseline projections, Frontier-8 will cost $620 million to train for a 2.2-point improvement on the composite benchmark.** The aggressive scenario — $940 million — yields 3.4 points. Neither scenario reaches 80 on the composite.

**Infrastructure requirements for Frontier-8 baseline:**
- GPU cluster: 49,152 × H100 equivalent (or 24,576 × next-gen accelerator)
- Training duration: 120–150 days
- Electricity: estimated 380 GWh for training run alone
- Water: estimated 620 million gallons (cooling, training period)
- Total carbon footprint (training only, location-based): estimated [42,000 metric tons CO₂e](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks)

---

### Strategic Considerations

1. **The benchmark ceiling.** MMLU performance above 90 approaches human expert performance on the specific tasks measured. Further gains require either (a) new benchmarks that measure different capabilities, or (b) genuine capability improvements that don't map cleanly to existing metrics. The composite score may be approaching the limit of what the benchmark measures, not the limit of what a model can do — but the distinction is irrelevant to investors evaluating our progress via public benchmarks.

2. **The investor narrative.** Our Series C valuation ($14.2 billion, March 2032) was predicated on continued benchmark leadership. [Frontier-7's composite score of 71.4 places us third among frontier labs](https://epochai.org/data/notable-ai-models) — behind both major competitors. We have not held the top position since Frontier-5. The gap is narrowing across the field, not widening.

3. **The cost trajectory.** If the scaling curve holds, reaching an overall composite of 80 would require approximately **$2.4 billion in compute** at current hardware prices. This exceeds Stratum's total capitalization history.

4. **The alternative.** There are research groups — smaller, less capitalized — exploring architectural approaches that do not follow the parameter-scaling paradigm. Their results are preliminary and unproven at scale. They also require a fraction of the compute budget. If one of these approaches produces a discontinuous improvement, the value of our scaling investment depreciates overnight.

---

### Recommendation

Proceed with Frontier-8 at baseline parameters. The market expects it. Our investors expect it. The benchmark expects it. The question of whether parameter scaling is the right approach is distinct from the question of whether we can afford to stop.

---

*K. Ostrowski*
*VP of Research, Stratum Technologies*

</div>

<small>

*[In 2020, OpenAI published "Scaling Laws for Neural Language Models,"](https://arxiv.org/abs/2001.08361) establishing that model performance improves predictably with increased parameters, data, and compute — but with diminishing returns. [The cost of training GPT-4 was estimated at over $100 million.](https://www.wired.com/story/openai-ceo-sam-altman-the-age-of-giant-ai-models-is-already-over/) [Epoch AI estimates that frontier model training costs have increased approximately 4× per year since 2020.](https://epochai.org/blog/training-compute-of-frontier-ai-models) [By 2024, multiple reports suggested that frontier training runs were approaching or exceeding $1 billion.](https://www.wsj.com/tech/ai/ai-training-costs-rising-openai-google-anthropic-7ca7edf0)*

*[The energy consumption of AI training has grown by an estimated 26× between 2020 and 2024.](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks) [A single GPT-4-scale training run consumes approximately 50 GWh of electricity](https://epochai.org/blog/training-compute-of-frontier-ai-models) — enough to power [approximately 4,600 average U.S. households for a year.](https://www.eia.gov/tools/faqs/faq.php?id=97&t=3) [Water consumption for AI data center cooling is projected to reach 4.2–6.6 billion liters annually by 2027 for Google alone.](https://www.ucriverside.edu/stories/2024/04/research/ai-chatbots-consume-a-lot-of-water) [Microsoft's water consumption increased 34% between 2021 and 2022, attributed directly to AI workloads.](https://fortune.com/2023/09/09/ai-chatgpt-usage-fuels-spike-in-microsoft-water-consumption/)*

*The memo's final line — "The question of whether parameter scaling is the right approach is distinct from the question of whether we can afford to stop" — is the futility argument in one sentence. [Researchers have described the current paradigm as "scaling maximalism"](https://arxiv.org/abs/2404.04125) — the belief that the primary bottleneck to artificial general intelligence is compute, not architecture. [The Chinchilla paper (Hoffmann et al., 2022)](https://arxiv.org/abs/2203.15556) demonstrated that many frontier models were significantly undertrained relative to their size, suggesting that parameter count alone was not the constraint. The field adjusted training practices but did not fundamentally reconsider the paradigm. Stratum's VP of Research knows this. The memo says so. The recommendation is to proceed anyway.*

*Frontier-7 cost $340 million to train. It improved by 2.2 composite points over its predecessor. The next model will cost $620 million for a projected 2.2 points more. [Stratum's Mesa facility uses 1.48 billion gallons of water per year.](https://stratum-annual-sustainability-report-2032) [1,847 Mesa households had their water disconnected in the same period.](https://mesa-city-council-water-allocation-hearing-2032) The model's benchmark score went from 69.2 to 71.4. The water went to cooling the GPUs.*

</small>
