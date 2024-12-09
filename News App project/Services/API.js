export const url = "https://newsapi.org/v2";
export const apiKey = "apiKey=70d8f3fedbcf4e2798492696a2b484fa";

// Sources by category
const sourcesByCategory = {
  General: [
    "abc-news", "abc-news-au", "al-jazeera-english", "associated-press", "axios",
    "bbc-news", "cbc-news", "cnn", "the-washington-post",

  ],
  Technology: [
    "ars-technica", "crypto-coins-news", "hacker-news", "recode", "techcrunch",
    "techradar", "the-next-web", "wired"
  ],
  Business: [
    "australian-financial-review", "bloomberg", "business-insider", 
    "business-insider-uk", "financial-post", "fortune","the-wall-street-journal"
  ],
  Sports: [
    "bbc-sport", "bleacher-report", "espn", "espn-cric-info", "football-italia",
    "four-four-two", "fox-sports", "nfl-news", "nhl-news", "talksport", "the-sport-bible"
  ],
  Entertainment: [
    "entertainment-weekly", "ign", "mashable", "mtv-news", 
    "mtv-news-uk", "polygon", "the-lad-bible"
  ],
  Science: [
    "national-geographic", "new-scientist", "next-big-future"
  ]
};

// Get news by category
export const getNewsByCategoryAPI = (category, language = "en") => {
  const sources = sourcesByCategory[category];
  if (!sources) throw new Error(`Invalid category: ${category}`);

  return `${url}/top-headlines?sources=${sources.join(',')}&language=${language}&${apiKey}`;
};
