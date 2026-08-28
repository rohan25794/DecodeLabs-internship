# Project 3: AI Recommendation Logic — Tech Stack Recommender
**DecodeLabs Industrial Training Kit — Batch 2026**

## Goal
Build a simple recommendation system that maps a user's raw skills and
career interests to the tech job roles that best match them, using
**Content-Based Filtering**.

## How It Works (IPO Framework)

| Stage | What happens |
|---|---|
| **Input** | User enters 3+ skills/interests; job roles are loaded as "items" from `raw_skills.csv` |
| **Process** | Both the user profile and every job role are converted into **TF-IDF vectors** in a shared vocabulary space, then compared with **Cosine Similarity** |
| **Output** | Results are sorted by similarity score and truncated to the **Top-3** matches |

### Why TF-IDF instead of raw keyword overlap?
Simple binary overlap treats every skill equally — "Python" and "SQL"
would count the same as generic filler terms. TF-IDF down-weights
skills that appear across *many* roles (generic) and up-weights ones
that are distinctive to fewer roles (specific), so the match is more
meaningful.

### Why Cosine Similarity instead of Euclidean Distance?
Euclidean distance is sensitive to how many total skills a role lists —
a role with a long skill list would look "far away" even with a perfect
overlap. Cosine similarity measures the *angle* between vectors instead,
so it's invariant to list length and focuses purely on how well the
*pattern* of skills aligns.

## The 4-Step Ranking Pipeline
1. **Ingestion** — capture user skills (minimum 3)
2. **Scoring** — compute cosine similarity between the user vector and every role vector
3. **Sorting** — order roles by descending similarity score
4. **Filtering** — cut the list down to the Top-3, to prevent choice overload

## How to Run
```bash
pip install -r requirements.txt
python tech_stack_recommender.py
```
You'll be prompted to enter skills, e.g.:
```
Your skills: Python, Cloud Computing, Automation
```

## Example Output
```
--- Top Recommended Career Paths ---
1. Cloud Architect  —  47.5% match
2. Systems Administrator  —  47.0% match
3. DevOps Engineer  —  39.0% match
```

## Files
- `tech_stack_recommender.py` — main recommendation engine (Python/CLI)
- `raw_skills.csv` — dataset of 12 job roles and their associated skills
- `requirements.txt` — dependencies
- `index.html` — standalone frontend (same TF-IDF + cosine similarity logic, reimplemented in vanilla JS so it runs entirely client-side with no server or build step). Open it directly in a browser.

## Cold Start Handling
If a user's skills share no overlap with anything in the dataset, all
similarity scores come back as 0 (the "Cold Start" problem). The script
detects this and prompts the user to try broader/more common terms
instead of silently returning meaningless results.

## Key Skills Demonstrated
Logic building, pattern matching, TF-IDF feature extraction, cosine
similarity, and recommendation system fundamentals (content-based
filtering).

---
*Part of the Artificial Intelligence Industrial Training Kit — DecodeLabs*
