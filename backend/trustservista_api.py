import requests
import json
from typing import Optional, Dict, Any
import logging
import asyncio
import aiohttp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TrustServistaAPI:
    """A class to interact with the TrustServista API"""
    
    def __init__(self, api_key: str):
        self.base_url = "https://app.trustservista.com/api/rest/v2"
        self.headers = {
            "X-TRUS-API-Key": api_key,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

class TrustServistaAPI:
    def __init__(self, api_key: str):
        self.base_url = "https://app.trustservista.com/api/rest/v2"
        self.headers = {
            "X-TRUS-API-Key": api_key,  # Make sure this matches required header name
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        self.valid_key = None  # Track key validity

    async def _make_async_request(self, session: aiohttp.ClientSession, endpoint: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        url = f"{self.base_url}/{endpoint}"
        try:
            async with session.post(url, headers=self.headers, json=data) as response:
                response_text = await response.text()
                
                if response.status == 200:
                    return json.loads(response_text)
                
                # Add detailed error logging
                logger.error(f"""
API Error {response.status} - {endpoint}
Request: {data}
Response: {response_text}
                """)
                
                # Track key validity
                if response.status == 401:
                    self.valid_key = False
                
                return None
                
        except Exception as e:
            logger.error(f"Request failed: {str(e)}")
            return None

    async def verify_key(self):
        """Check if API key is valid"""
        if self.valid_key is None:
            test_data = {"content": "test", "language": "eng"}
            async with aiohttp.ClientSession() as session:
                result = await self._make_async_request(session, 'sentiment', test_data)
                self.valid_key = result is not None
        return self.valid_key

    async def _make_async_request(self, session: aiohttp.ClientSession, endpoint: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Make an async request to the API endpoint"""
        url = f"{self.base_url}/{endpoint}"
        try:
            async with session.post(url, headers=self.headers, json=data) as response:
                if response.status == 200:
                    return await response.json()
                logger.error(f"API request to {endpoint} failed with status {response.status}")
                return None
        except Exception as e:
            logger.error(f"Request to {endpoint} failed: {str(e)}")
            return None

    async def analyze_article(self, content: str, is_url: bool = False, language: str = "eng") -> Dict[str, Any]:
        """Analyze sentiment and clickbait concurrently for a single article"""
        data = {
            "content": content if not is_url else "EMPTY",
            "contentUri": content if is_url else "",
            "language": language
        }

        async with aiohttp.ClientSession() as session:
            # Create tasks for both analyses
            sentiment_task = asyncio.create_task(
                self._make_async_request(session, 'sentiment', data)
            )
            clickbait_task = asyncio.create_task(
                self._make_async_request(session, 'clickbait', data)
            )

            # Wait for both tasks to complete
            sentiment_result, clickbait_result = await asyncio.gather(
                sentiment_task, 
                clickbait_task
            )

            results = {}
            if sentiment_result:
                results['sentiment'] = sentiment_result
            if clickbait_result:
                results['clickbait'] = clickbait_result

            return results

    def get_info(self) -> Optional[Dict[str, Any]]:
        """Get API information and quota"""
        try:
            response = requests.get(f"{self.base_url}/info", headers=self.headers)
            if response.status_code == 200:
                return response.json()
            logger.error(f"Failed to get API info: {response.status_code}")
            return None
        except Exception as e:
            logger.error(f"Failed to get API info: {str(e)}")
            return None

    def analyze_sentiment(self, content: str, is_url: bool = False, language: str = "eng") -> Optional[Dict[str, Any]]:
        """Analyze sentiment of content"""
        data = {
            "content": content if not is_url else "EMPTY",
            "contentUri": content if is_url else "",
            "language": language
        }
        return self._make_async_request(None, 'sentiment', data)

    def analyze_trust_level(self, content: str, is_url: bool = False, language: str = "eng") -> Optional[Dict[str, Any]]:
        """Analyze trust level of content"""
        data = {
            "content": content if not is_url else "EMPTY",
            "contentUri": content if is_url else "",
            "language": language
        }
        return self._make_async_request(None, 'trustlevel', data)

    def analyze_clickbait(self, content: str, is_url: bool = False, language: str = "eng") -> Optional[Dict[str, Any]]:
        """Analyze clickbait probability"""
        data = {
            "content": content if not is_url else "EMPTY",
            "contentUri": content if is_url else "",
            "language": language
        }
        return self._make_async_request(None, 'clickbait', data)

    def get_summary(self, content: str, is_url: bool = False, language: str = "eng", size: int = 10) -> Optional[Dict[str, Any]]:
        """Get content summary"""
        data = {
            "content": content if not is_url else "EMPTY",
            "contentUri": content if is_url else "",
            "language": language,
            "size": size
        }
        return self._make_async_request(None, 'summary', data)

    def analyze_content(self, content: str, is_url: bool = False, language: str = "eng") -> Dict[str, Any]:
        """Perform comprehensive analysis"""
        results = {}
        
        # Get sentiment
        sentiment = self.analyze_sentiment(content, is_url, language)
        if sentiment:
            results['sentiment'] = sentiment
            
        # Get trust level
        trust_level = self.analyze_trust_level(content, is_url, language)
        if trust_level:
            results['trust_level'] = trust_level
            
        # Get clickbait score
        clickbait = self.analyze_clickbait(content, is_url, language)
        if clickbait:
            results['clickbait'] = clickbait
            
        # Get summary
        summary = self.get_summary(content, is_url, language)
        if summary:
            results['summary'] = summary
            
        return results

    def get_metadata(self, content: str, is_url: bool = False) -> Optional[Dict[str, Any]]:
        """Extract metadata from the content"""
        data = {
            "contentUri" if is_url else "content": content
        }
        return self._make_async_request(None, 'metadata', data) 
    async def get_website_statistics(self, web_domain: str, start_date: str = "EMPTY", end_date: str = "EMPTY") -> Optional[Dict[str, Any]]:
        """Get combined statistics for a website domain including TrustLevel, Clickbait averages, and Sentiment distribution"""
        data = {
            "webDomain": web_domain,
            "startDate": start_date,
            "endDate": end_date
        }
        
        async with aiohttp.ClientSession() as session:
            return await self._make_async_request(session, 'statistics', data)

    async def get_combined_metrics(self, content: str, is_url: bool = False, language: str = "eng") -> Dict[str, Any]:
        """Get combined analysis for an individual article (sentiment, trustlevel, clickbait)"""
        data = {
            "content": content if not is_url else "EMPTY",
            "contentUri": content if is_url else "",
            "language": language
        }

        async with aiohttp.ClientSession() as session:
            tasks = [
                self._make_async_request(session, 'sentiment', data),
                self._make_async_request(session, 'trustlevel', data),
                self._make_async_request(session, 'clickbait', data)
            ]
            
            results = await asyncio.gather(*tasks)
            
            return {
                "sentiment": results[0],
                "trust_level": results[1],
                "clickbait": results[2]
            }