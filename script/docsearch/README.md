# DocSearch Scraper

This is a Docker image that runs the DocSearch scraper. The `.env` file should contain the following variables:

```sh
APPLICATION_ID=...
API_KEY=...
```

See the [Algolia dashboard][1] for the values of these variables.

```console
$ docker run -it --env-file=.env -e "CONFIG=$(cat index.json | jq -r tostring)" algolia/docsearch-scraper
```

[1]: https://dashboard.algolia.com/users/sign_in
