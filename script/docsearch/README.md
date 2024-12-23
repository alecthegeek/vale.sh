# DocSearch Scraper

This is a Docker image that runs the DocSearch scraper.

```console
$ docker run -it --env-file=.env -e "CONFIG=$(cat index.json | jq -r tostring)" algolia/docsearch-scraper
```
