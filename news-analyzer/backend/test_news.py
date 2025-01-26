import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000/api"

def test_create_news_article():
    # Test data with multiple paragraphs and alternative views
    test_article = {
        "title": "The Impact of AI on Modern Healthcare",
        "content": "Artificial Intelligence is revolutionizing healthcare delivery and patient care.",
        "url": "https://example.com/ai-healthcare",
        "source": "Healthcare Technology Review",
        "trust_score": 85,
        "paragraphs": [
            {
                "content": "AI-powered diagnostic tools are showing remarkable accuracy in detecting diseases early, potentially saving millions of lives.",
                "source": "Medical AI Journal",
                "order": 1,
                "alternative_views": [
                    {
                        "content": "While AI shows promise in diagnostics, concerns about data privacy and algorithmic bias need to be addressed.",
                        "source": "Healthcare Ethics Quarterly"
                    },
                    {
                        "content": "Traditional diagnostic methods combined with human expertise still outperform AI in complex cases.",
                        "source": "Clinical Practice Review"
                    }
                ]
            },
            {
                "content": "Hospitals implementing AI-based systems report significant improvements in patient care coordination and resource allocation.",
                "source": "Hospital Management Today",
                "order": 2,
                "alternative_views": [
                    {
                        "content": "The high cost of AI implementation creates barriers for smaller healthcare facilities.",
                        "source": "Healthcare Economics Report"
                    }
                ]
            }
        ]
    }

    try:
        # Create new article
        response = requests.post(f"{BASE_URL}/news/", json=test_article)
        response.raise_for_status()
        created_article = response.json()
        print("✅ Successfully created test article")
        print(f"Article ID: {created_article['id']}")

        # Fetch the created article
        response = requests.get(f"{BASE_URL}/news/{created_article['id']}")
        response.raise_for_status()
        fetched_article = response.json()
        print("✅ Successfully retrieved article")

        # Verify article structure
        assert fetched_article['title'] == test_article['title']
        assert fetched_article['trust_score'] == test_article['trust_score']
        assert len(fetched_article['paragraphs']) == len(test_article['paragraphs'])
        print("✅ Article structure verification passed")

        # List all articles
        response = requests.get(f"{BASE_URL}/news/")
        response.raise_for_status()
        articles = response.json()
        print(f"✅ Successfully retrieved all articles (count: {len(articles)})")

    except requests.exceptions.RequestException as e:
        print(f"❌ Error during API request: {str(e)}")
    except AssertionError as e:
        print(f"❌ Verification failed: {str(e)}")
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")

if __name__ == "__main__":
    print("Starting News Analyzer API Test...\n")
    test_create_news_article()