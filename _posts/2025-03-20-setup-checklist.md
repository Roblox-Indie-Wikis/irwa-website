---
layout: post
body_class: post-template toc-enabled
title: Wiki Checklist
description: A useful setup checklist when starting a MediaWiki site
redirect_from: 
  - /setup-checklist
permalink: /blog/setup-checklist
author: enews, SomeMWDev
---

Do note that this blog is **not finished**.

## Choosing A Home

* Buying a domain (or not?) 
    * A domain is your home on the internet. If you can, it’s usually best for you to buy your own domain for identity. Most wikis use the .wiki or .org TLDs for their sites. Places like [Spaceship](https://www.spaceship.com/) and [CloudFlare](https://www.cloudflare.com/domains) are good places to start looking. If not, most wiki farms and some online services offer free domains. 
* Hosting or Wiki Farm? 
    * Where will your wiki live? Some viable wiki farm options to consider are [Miraheze](https://miraheze.org/) and [WikiOasis](https://wikioasis.org/), or if you would like to self-host, [DigitalOcean](https://www.digitalocean.com/). 
* LAMP/LEMP Stack? 
    * If you are self-hosting, what stack will you use? Apache is generally best for most use cases, though nginx can better handle large amounts of data. 
* CloudFlare caching
    * If you are self-hosting, using [CloudFlare](https://www.cloudflare.com/) to manage DNS, caching and email can be a cost-effective and great way to speed up your site. 
* Works License 
    * Choose a license for your wiki! Most wikis choose a [Creative Commons license](https://creativecommons.org/share-your-work/), for example [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), which protects their interests but allows content to be used for others in some capacity. 

## Setting Up
* Privacy Policy Page
    * Especially if you are self-hosting, this is essential to outline what data is collected and how it is used. An example of a wiki Privacy Policy can be found [here](https://dovedale.wiki/wiki/Dovedale_Wiki:Terms_Of_Service_and_Privacy_Policy).
* Terms of Service Page
    * Especially if you are self-hosting, you can outline general guidelines and disclaimers for website use. An example of a wiki Privacy Policy can be found [here](https://dovedale.wiki/wiki/Dovedale_Wiki:Terms_Of_Service_and_Privacy_Policy).
* General Disclaimer Page 
    * A wiki disclaimer page tells people what your wiki is not. Common uses of this page disclaim liability and inform users content is not uniformly peer reviewed. An example of a general disclaimer page can be found [here](https://hybridcafe.wiki/wiki/Hybrid_Cafe_Wiki:General_disclaimer).
* Cookie Statement & Information Page
    * This page should outline what cookies your site has and what they are for. Some wiki farms provide a cookie page for you. An example of a cookie statement page can be found [here](https://dovedale.wiki/wiki/Dovedale_Wiki:Cookie_Statement).
* Rules Page 
    * Rules are important as your wiki and its discussions are open to anybody. Rules should be simple, yet descriptive. They should also be linked on the front page. An example of a rules page can be found [here](https://urbanshade.org/wiki/Project:RULES). 
* Style Guide Page
    * A style guide sets the standards for the writing, formatting, and design of your wiki. Since anyone or a large group of editors will be editing your wiki, everyone may not be on the same page as to how pages should look. A style guide helps set this down in stone. Suggested sections include Orthography, Punctuation, Wikitext formatting, Numbers, Dates and Currencies. An example of a Style Guide can be found [here](https://dovedale.wiki/wiki/Dovedale_Wiki:Style_Guide#Editorial_Style).
* About Page 
    * The about page tells users a little about the history of the wiki, why it exists, the staff team etc. Most themes also link this page in the footer. An example of an about page can be seen [here](https://starcitizen.tools/Star_Citizen_Wiki:About) and [here](https://dovedale.wiki/wiki/Dovedale_Wiki:About).
* Staff Information Page
    * A staff information page lists all staff names, user rights management procedures, and usually contains additional details about each staff member like their rank, timezone and area of work. The staff information page can also house an explanation of the staff roles. This page should also be linked to your front page, to allow easy contact if your wiki users require it. A good example of a staff page can be seen [here](https://hybridcafe.wiki/wiki/Hybrid_Cafe_Wiki:Staff) and [here](https://dovedale.wiki/wiki/Project:Staff).
* Copyrights Page
    * A copyright page informs users of copyright procedures on the wiki. This page is usually linked in the editors as people edit, so it is important this is filled in. The copyright page should include your wiki license, an explanation to it, as well as information on media file copyright procedures, which are usually different from the pages. An example of a copyright page can be found [here](https://hybridcafe.wiki/wiki/Hybrid_Cafe_Wiki:Copyrights). 
* Image Copyrights 
    * As stated above, image copyrights usually fall under a different class. 
* Skin
    * Your skin dictates how your site will look and feel. While you can further customise it using CSS and JS, the base of your site will rely on what skin you decide on. Popular skins for modern wikis include Timeless, Citizen and XXX. You can view a full list of skins [here](https://www.mediawiki.org/wiki/Category:Stable_skins). 
    * Wiki Examples with different skins: 
        * Citizen: [Outlaster](https://outlaster.peakprecision.wiki/), [Tolkien Gateway](https://tolkiengateway.net/), [Untitled Tag Game](https://utg.miraheze.org/), [Apple](https://theapplewiki.com/wiki/Main_Page), [Star Citizen](https://starcitizen.tools/)
        * Timeless: [Pressure](https://urbanshade.org/), [Fisch](https://fischipedia.org/), [KeukenWiki](https://keukenwiki.nl/Hoofdpagina)
        * Vector legacy (2010): [Hollow Knight](https://hollowknight.wiki/), [Minecraft](https://minecraft.wiki/)
    * If you or your community cannot decide on one skin to use, you can also have multiple skins installed. While you have to set a default skin, users can choose their own skin in the preferences.
        * Having multiple skins installed can make styling using CSS and writing scripts using JS more difficult and increase the time you need to spend on maintenance.
* Main Page + 
* Site Icon
* Site Logo
* Categorise Namespaces + 
* Categorise roles and permissions + 

## Configuration
* Setup Email Servers 
    * If you are self-hosting, email functionality is essential for your wiki. Things like password confirmation, resetting and more need this functionality. There are a few free services like what(?) to cover for this.
        * Alternatively, you can also self-host your own email server, though this has both upsides (more control; no limits) and downsides (increased maintenance; emails might get into spam folders more easily).
* Register Google Search Console
    * By connecting your website with [Google Search Console](https://search.google.com/search-console) and adding a [sitemap](https://www.mediawiki.org/wiki/Manual:Sitemap), this allows google to better index your site, and for you to see detailed statistics. To make a sitemap, check the extensions list below. 
* Register Bing Webmaster
    * You can easily link your Google and [Bing webmaster](https://www.bing.com/webmaster/tools) account in a click. Sitemap data will be shared too. This allows Bing to index your site more efficiently. 
* Handle web crawlers
    * If you are not self-hosting, you can ignore this section as your wiki farm will likely handle this for you.
    * Since the release of ChatGPT, AI crawlers have become increasingly common in the internet. They often ignore the rules you set, such as the `robots.txt` file, and may consume a lot of your server's performance. Refer to the following article for information on how to fight these bots: https://www.mediawiki.org/wiki/Handling_web_crawlers

## Core Extensions 
These extensions are almost always essential to running a successful wiki. Some may come pre installed, but need to be activated in LocalSettings.php. 
* [WikiSEO](https://www.mediawiki.org/wiki/Extension:WikiSEO)
    * Improves the SEO (Search Engine Optimisation) of your wiki.
* [RobloxAPI](https://www.mediawiki.org/wiki/Extension:RobloxAPI)
    * Allows accessing the Roblox API via parser functions.
* [TemplateStyles](https://www.mediawiki.org/wiki/Extension:TemplateStyles)
    * Allows adding custom CSS code to templates and wiki articles.
* [TemplateStylesExtender](https://www.mediawiki.org/wiki/Extension:TemplateStylesExtender)
    * Removes some limitations of the TemplateStyles extensions. Mainly, this extension allows you to use media queries and CSS variables in your template styles.
* [TabberNeue](https://www.mediawiki.org/wiki/Extension:TabberNeue)
    * Allows creating tabs within pages.
    * Please use this extension instead of `Tabber` or `Tabs`, since those extensions are unmaintained and may pose security risks.
* [SyntaxHighlight](https://www.mediawiki.org/wiki/Extension:SyntaxHighlight)
    * Allows adding highlighted code to wiki articles. This extension does not highlight code in the source editor, you can use CodeMirror for that.
* [CodeMirror](https://www.mediawiki.org/wiki/Extension:CodeMirror)
    * Provides syntax highlighting in the source editor.
* [PortableInfobox](https://www.mediawiki.org/wiki/Extension:PortableInfobox)
    * If you are forking from Fandom, this is a must-have. This allows you to use infoboxes directly from Fandom, with minimal or no changes required for them to work on your new wiki.
    * This is not the only way to create infoboxes. You can also use custom [templates](https://dev.miraheze.org/wiki/Template:SimpleInfobox) or [modules](https://starcitizen.tools/Module:InfoboxNeue) from other wikis. The [Capiunto](https://www.mediawiki.org/wiki/Extension:Capiunto) extension may also be a good option if you and your fellow editors are capable of coding in lua.
* [Parser Functions](https://www.mediawiki.org/wiki/Extension:ParserFunctions)
    * An absolute must-have. Adds various parser functions for logic and string manipulation, mostly used in templates.
* [Math](https://www.mediawiki.org/wiki/Extension:Math)
    * Allows rendering mathematical formulae.
* [EmbedVideo (fork)](https://www.mediawiki.org/wiki/Extension:EmbedVideo_(fork))
    * Allows embedding videos and audio from various providers, including YouTube and Spotify.
* [PdfHandler](https://www.mediawiki.org/wiki/Extension:PdfHandler)
    * Allows embedding PDF files in articles.
* [ConfirmEdit](https://www.mediawiki.org/wiki/Extension:ConfirmEdit)
    * Requires solving CAPTCHAs for various actions, such as adding external links to a page or creating an account. This can be helpful against spambots.
    * On MediaWiki versions newer than (and including) 1.42, the `Turnstile` captcha type is recommended. However, there might be privacy issues since it requires loading code from and sending requests to Cloudflare.
* [PageImages](https://www.mediawiki.org/wiki/Extension:PageImages)
    * Selects an image from each article that will then be used by extensions like WikiSEO and Popups.
* [TextExtracts](https://www.mediawiki.org/wiki/Extension:TextExtracts)
    * Extracts a short excerpt from each article for use by WikiSEO and Popups.
* [ShortDescription](https://www.mediawiki.org/wiki/Extension:ShortDescription)
    * Allows setting a short description for each article.
* AutoSitemap
    * TODO is this really required or is core functionality enough?
* [CookieWarning](https://www.mediawiki.org/wiki/Extension:CookieWarning)
    * Adds a cookie banner to your wiki. This is required in various countries, including EU member states.
* [Popups](https://www.mediawiki.org/wiki/Extension:Popups) (also known as Previews)
    * Shows an image (taken from the PageImages extension) and a short excerpt (taken from TextExtracts) when hovering over an article link.
* [MultimediaViewer](https://www.mediawiki.org/wiki/Extension:MultimediaViewer)
    * Allows viewing images in full-size without leaving the article.
* [Related Articles](https://www.mediawiki.org/wiki/Extension:RelatedArticles)
    * Shows associated articles at the bottom of the page.
* [DismissableSiteNotice](https://www.mediawiki.org/wiki/Extension:DismissableSiteNotice)
    * Allows closing site notices.
* [Echo](https://www.mediawiki.org/wiki/Extension:Echo)
    * Adds a notification system to MediaWiki.
* [LoginNotify](https://www.mediawiki.org/wiki/Extension:LoginNotify)
    * Sends an email notification when someone logs into your account. This is an essential security feature that every wiki should use.
* [Replace Text](https://www.mediawiki.org/wiki/Extension:Replace_Text)
    * Allows replacing text in all articles at once.

## Others
* Discord Webhook 
    * A recent changes channel can be useful for big wikis. The [DiscordNotifications](https://www.mediawiki.org/wiki/Extension:DiscordNotifications) extension (enabled by default on Miraheze) and the Discord [WikiBot](https://www.wikibot.de/) provide this functionality. 
* [IndieWikiBuddy](https://getindie.wiki/)
    * If you are forking, or there is another wiki of the same topic on a non independent wiki, this extension can help redirect people to the right place. 