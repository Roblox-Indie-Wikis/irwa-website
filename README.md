This is the repository for the Independent Roblox Wiki Alliance site, which you can view at https://indierobloxwikis.org. Join our [Discord server](https://discord.com/invite/qZwvwnPZsd)!

The site is built using [Jekyll](https://jekyllrb.com/).

## Contributing
To contribute, you can open a Pull Request with your changes. If you haven't already, start by [forking](https://help.github.com/en/articles/fork-a-repo) this repository. [Create a new branch](https://help.github.com/en/desktop/contributing-to-projects/creating-a-branch-for-your-work) in your fork, and submit your changes for review.

### Development Guidelines
To ensure the site remains maintainable and synchronized, please follow these rules:
- Do **not** edit the `.css` files located in `/assets/css` directly. This project uses LESS for styling. Please make all style changes in the `.less` files; these will be automatically compiled and converted via a GitHub Actions process upon deployment.
- Do **not** manually edit the `/docs/robloxapi` page. This page is automatically synced with the [RobloxAPI extension](https://github.com/Roblox-Indie-Wikis/mediawiki-extensions-RobloxAPI) repository. Any manual changes made here will be overwritten during the next sync.

### Locally host the site
If you'd like to preview your changes before publishing a PR, follow these steps:
1. Install Jekyll and its prerequisites ([see here](https://jekyllrb.com/docs/installation/))
2. Run `bundle install` to install dependencies
3. Run `bundle exec jekyll serve` to run the site locally

## Adding your wiki
If you have been accepted into the alliance, your request should automatically be processed by a coordinator. If you don't see it within 3 days on the website, feel free to create a PR to add with these steps:
1. Insert logo into `/assets/wiki-logos`
2. Add wiki details to `_data/members.yml` (the carousel on the front page and the members list are both generated from this file). This is the format:
```
- name: 
  link: 
  logo: "/assets/wiki-logos/LogoHere.svg" (svg if recommended if logo is basic; if monochrome, place the black version here)
  logo-white: "/assets/wiki-logos/LogoHere.svg" (can remove if logo is not monochrome)
  description: "Lorem ipsum"
  game_link: 
  discord: 
  joined: "January 2030"
  team:
    - name: A
    - name: B
```