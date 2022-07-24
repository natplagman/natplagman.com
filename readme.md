[![Netlify Status](https://api.netlify.com/api/v1/badges/37ea850f-8c42-42af-84ce-8305756f6ac3/deploy-status)](https://app.netlify.com/sites/natplagman/deploys)

# Requirements

* Typescript
* Hugo

# Installation and Build Instructions

```bash
cd src
hugo server --watch --source 'hugo' --destination '../dist' --config 'config.toml,shared.toml'
```
Open localhost:1313 in a browser.
