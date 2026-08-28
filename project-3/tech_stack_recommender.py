"""
Project 3: AI Recommendation Logic — Tech Stack Recommender
DecodeLabs Industrial Training Kit — Batch 2026

Goal: Map a user's raw skills and career goals to a ranked list of
matching tech job roles, using Content-Based Filtering.

Pipeline (IPO Framework):
    INPUT   -> User's skills (min. 3) + raw_skills.csv (job roles as "items")
    PROCESS -> TF-IDF vector mapping, Cosine Similarity scoring
    OUTPUT  -> Top-N ranked job role recommendations

4-Step Ranking Pipeline: Ingestion -> Scoring -> Sorting -> Filtering
"""

import csv
import sys

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def load_roles(path="raw_skills.csv"):
    """Ingestion: load job roles and their skill sets ('items')."""
    roles, skill_docs = [], []
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            roles.append(row["role"])
            skill_docs.append(row["skills"])
    return roles, skill_docs


def get_user_skills():
    """Ingestion: capture the user state (minimum of 3 skills required)."""
    print("=== Tech Stack Recommender ===")
    print("Enter at least 3 skills or interests, separated by commas.")
    print('Example: Python, Cloud Computing, Automation\n')

    raw = input("Your skills: ").strip()
    skills = [s.strip() for s in raw.split(",") if s.strip()]

    while len(skills) < 3:
        print(f"Only {len(skills)} skill(s) entered — please enter at least 3.")
        raw = input("Your skills: ").strip()
        skills = [s.strip() for s in raw.split(",") if s.strip()]

    return skills


def recommend(user_skills, roles, skill_docs, top_n=3):
    """Process: TF-IDF vector mapping + Cosine Similarity scoring, then
    Sorting and Filtering down to the Top-N list."""

    # Shared vocabulary space: fit TF-IDF on job-role documents,
    # then transform the user profile into the SAME vector space.
    vectorizer = TfidfVectorizer()
    role_vectors = vectorizer.fit_transform(skill_docs)

    user_profile = " ".join(user_skills)
    user_vector = vectorizer.transform([user_profile])

    # Scoring: cosine similarity between user vector and every role vector
    scores = cosine_similarity(user_vector, role_vectors).flatten()

    # Sorting: descending by score
    ranked = sorted(zip(roles, scores), key=lambda x: x[1], reverse=True)

    # Filtering: truncate to Top-N to avoid choice overload
    return ranked[:top_n]


def display_results(results):
    """Output: display recommended items."""
    print("\n--- Top Recommended Career Paths ---")
    for i, (role, score) in enumerate(results, start=1):
        match_pct = round(score * 100, 1)
        print(f"{i}. {role}  —  {match_pct}% match")

    if all(score == 0 for _, score in results):
        print(
            "\nNote: No skill overlap found with our dataset (Cold Start). "
            "Try broader terms like 'Python' or 'Cloud Computing'."
        )


def main():
    roles, skill_docs = load_roles()
    user_skills = get_user_skills()
    results = recommend(user_skills, roles, skill_docs, top_n=3)
    display_results(results)


if __name__ == "__main__":
    main()
