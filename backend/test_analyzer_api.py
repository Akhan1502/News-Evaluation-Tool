import json
import logging
import asyncio
import time
from trustservista_api import TrustServistaAPI

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def main():
    api = TrustServistaAPI(api_key="b8b89428199f58531ced553f0e316eb5")
    
    # Get website statistics
    domain_stats = await api.get_website_statistics("bbc.com")
    print("Domain Statistics:")
    print(json.dumps(domain_stats, indent=2))
    
    # Get combined metrics for an individual article
    article_metrics = await api.get_combined_metrics(
        "http://www.foxnews.com/opinion/2017/03/01/president-trumps-best-speech.html",
        is_url=True
    )
    print("\nArticle Metrics:")
    print(json.dumps(article_metrics, indent=2))

if __name__ == "__main__":
    asyncio.run(main())