---
layout: page
body_class: page-template
title: Roblox API Documentation
description: Documentation for the RobloxAPI extension, which provides easy access to the Roblox API via parser functions.
---
# Roblox API Documentation

The RobloxAPI extension provides easy access to the Roblox API via parser functions. The Roblox API is generally very poorly documented, and using the ExternalData extension or Lua modules can be a steep learning curve which may not be viable. This extension aims to make it easy for you to grab data from Roblox and put it on your wiki, using simple parser functions.
{% raw %}
<ul>
<li><a href="#usage">Usage</a>
<ul>
<li><a href="#basic-usage">Basic Usage</a></li>
<li><a href="#data-sources">Data Sources</a>
<ul>
<li><a href="#gamedata">gameData</a></li>
<li><a href="#activeplayers">activePlayers</a></li>
<li><a href="#visits">visits</a></li>
<li><a href="#userid">userId</a></li>
<li><a href="#useravatarthumbnail">userAvatarThumbnail</a></li>
<li><a href="#useravatarthumbnailurl">userAvatarThumbnailUrl</a></li>
<li><a href="#assetthumbnail">assetThumbnail</a></li>
<li><a href="#assetthumbnailurl">assetThumbnailUrl</a></li>
<li><a href="#gameicon">gameIcon</a></li>
<li><a href="#gameiconurl">gameIconUrl</a></li>
<li><a href="#grouproles">groupRoles</a></li>
<li><a href="#grouprank">groupRank</a></li>
<li><a href="#groupdata">groupData</a></li>
<li><a href="#groupmembers">groupMembers</a></li>
<li><a href="#badgeinfo">badgeInfo</a></li>
<li><a href="#userinfo">userInfo</a></li>
<li><a href="#assetdetails">assetDetails</a></li>
<li><a href="#grouproleslist">groupRolesList</a></li>
<li><a href="#gamenamedescription">gameNameDescription</a></li>
<li><a href="#universeinfo">universeInfo</a></li>
<li><a href="#usergames">userGames</a></li>
<li><a href="#userplacevisits">userPlaceVisits</a></li>
<li><a href="#gameevents">gameEvents</a></li>
<li><a href="#grouprolemembers">groupRoleMembers</a></li>
</ul></li>
<li><a href="#handling-json-data">Handling JSON data</a>
<ul>
<li><a href="#json-keys">JSON keys</a></li>
<li><a href="#pretty-printing-json-data">Pretty-printing JSON
data</a></li>
</ul></li>
<li><a href="#faqs">FAQs</a>
<ul>
<li><a href="#how-do-i-obtain-the-universe-id-of-a-game">How do I obtain
the Universe ID of a game?</a></li>
<li><a href="#embedding-images-from-the-roblox-cdn">Embedding images
from the Roblox CDN</a></li>
<li><a href="#migrating-from-the-old-parser-functions">Migrating from
the old parser functions</a></li>
</ul></li>
<li><a href="#configuration">Configuration</a>
<ul>
<li><a
href="#wgrobloxapienableddatasources"><code>$wgRobloxAPIEnabledDatasources</code></a></li>
<li><a
href="#wgrobloxapicachingexpiries"><code>$wgRobloxAPICachingExpiries</code></a></li>
<li><a
href="#wgrobloxapicachesplittingoptionalarguments"><code>$wgRobloxAPICacheSplittingOptionalArguments</code></a></li>
<li><a
href="#wgrobloxapiallowedarguments"><code>$wgRobloxAPIAllowedArguments</code></a></li>
<li><a
href="#wgrobloxapirequestuseragent"><code>$wgRobloxAPIRequestUserAgent</code></a></li>
<li><a
href="#wgrobloxapidisablecache"><code>$wgRobloxAPIDisableCache</code></a></li>
<li><a
href="#wgrobloxapiparserfunctionsexpensive"><code>$wgRobloxAPIParserFunctionsExpensive</code></a></li>
<li><a
href="#wgrobloxapiregisterlegacyparserfunctions"><code>$wgRobloxAPIRegisterLegacyParserFunctions</code></a></li>
<li><a
href="#wgrobloxapidatasourceusagelimits"><code>$wgRobloxAPIDataSourceUsageLimits</code></a></li>
<li><a
href="#wgrobloxapishowplainerrors"><code>$wgRobloxAPIShowPlainErrors</code></a></li>
</ul></li>
</ul></li>
</ul>
<h2 id="basic-usage">Basic Usage</h2>
<p>To use any data source, you can use the
<code>{{#robloxAPI: ... }}</code> parser function. The first argument is
the name of the data source, and the rest of the arguments are the
arguments for the data source.</p>
<p>For example, to get the ID of a user named <code>builderman</code>,
you can use:</p>
<pre><code>{{#robloxAPI: userId | builderman }}</code></pre>
<p>This example uses the data source <code>userId</code> and provides
one required argument, <code>builderman</code>.</p>
<p>Each data source has a set number of required arguments.
Additionally, there are some optional arguments that are specified in
the <code>key=value</code> format.</p>
<h2 id="data-sources">Data Sources</h2>
<h3 id="gamedata">gameData</h3>
<p>Provides information about a game/place in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example">Example</h4>
<p>Get all JSON data of a game:</p>
<pre><code>{{#robloxAPI: gameData | 6483209208 | 132813250731469 }}</code></pre>
<p>Get the name of the creator of a game:</p>
<pre><code>{{#robloxAPI: gameData | 6483209208 | 132813250731469 | json_key=creator-&gt;name }}</code></pre>
<h4 id="required-arguments">Required arguments</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 63%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UniverseId</code></td>
<td>The <a href="#universe-id">universe ID</a> of the game.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>PlaceId</code></td>
<td>The place ID of the game.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="activeplayers">activePlayers</h3>
<p>Provides the number of active players in a place. Requires <a
href="#gameData">gameData</a> to be enabled.</p>
<h4 id="example-1">Example</h4>
<p>Get the number of active players in a place:</p>
<pre><code>{{#robloxAPI: activePlayers | 6483209208 | 132813250731469 }}</code></pre>
<p>Get the formatted number of active players in a place:</p>
<pre><code>{{formatnum: {{#robloxAPI: activePlayers | 6483209208 | 132813250731469 }} }}</code></pre>
<h4 id="required-arguments-1">Required Arguments</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 63%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UniverseId</code></td>
<td>The <a href="#universe-id">universe ID</a> of the game.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>PlaceId</code></td>
<td>The place ID of the game.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="visits">visits</h3>
<p>Provides the number of visits to a place. Requires <a
href="#gameData">gameData</a> to be enabled.</p>
<h4 id="example-2">Example</h4>
<p>Get the number of visits to a place:</p>
<pre><code>{{#robloxAPI: visits | 6483209208 | 132813250731469 }}</code></pre>
<p>Get the formatted number of visits to a place:</p>
<pre><code>{{formatnum: {{#robloxAPI: visits | 6483209208 | 132813250731469 }} }}</code></pre>
<h4 id="required-arguments-2">Required Arguments</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 63%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UniverseId</code></td>
<td>The <a href="#universe-id">universe ID</a> of the game.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>PlaceId</code></td>
<td>The place ID of the game.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="userid">userId</h3>
<p>Provides the user ID for a given username.</p>
<h4 id="example-3">Example</h4>
<p>Get the user ID of a user:</p>
<pre><code>{{#robloxAPI: userId | builderman }}</code></pre>
<h4 id="required-arguments-3">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>Username</code></td>
<td>The username of the user.</td>
<td>String</td>
</tr>
</tbody>
</table>
<h3 id="useravatarthumbnail">userAvatarThumbnail</h3>
<p>Provides data about a user’s avatar thumbnail in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-4">Example</h4>
<p>Get the data about the user avatar thumbnail of builderman (ID
156):</p>
<pre><code>{{#robloxAPI: userAvatarThumbnail | 156 | 150x150 }}</code></pre>
<h4 id="required-arguments-4">Required Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 8%" />
<col style="width: 14%" />
<col style="width: 77%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UserId</code></td>
<td>The user ID of the user.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>ThumbnailSize</code></td>
<td>The size of the thumbnail.</td>
<td>String (<code>30x30</code>, <code>48x48</code>, <code>60x60</code>,
<code>75x75</code>, <code>100x100</code>, <code>110x110</code>,
<code>140x140</code>, <code>150x150</code>, <code>150x200</code>,
<code>180x180</code>, <code>250x250</code>, <code>352x352</code>,
<code>420x420</code>, <code>720x720</code>)</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 13%" />
<col style="width: 38%" />
<col style="width: 21%" />
<col style="width: 8%" />
<col style="width: 18%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>is_circular</code></td>
<td>Whether the thumbnail should be circular.</td>
<td>Boolean</td>
<td><code>false</code></td>
<td><code>is_circular=true</code></td>
</tr>
<tr class="even">
<td><code>format</code></td>
<td>The format of the thumbnail.</td>
<td>String (<code>Png</code>, <code>Webp</code>)</td>
<td><code>Png</code></td>
<td><code>format=Webp</code></td>
</tr>
</tbody>
</table>
<h3 id="useravatarthumbnailurl">userAvatarThumbnailUrl</h3>
<p>Provides the URL of a user’s avatar thumbnail. Allows <a
href="#Embedding-images-from-the-Roblox-CDN">embedding</a> the avatar
image. Requires <a href="#userAvatarThumbnail">userAvatarThumbnail</a>
to be enabled.</p>
<h4 id="example-5">Example</h4>
<p>Get the URL of the user avatar thumbnail of builderman (ID 156):</p>
<pre><code>{{#robloxAPI: userAvatarThumbnailUrl | 156 | 150x150 }}</code></pre>
<h4 id="required-arguments-5">Required Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 8%" />
<col style="width: 14%" />
<col style="width: 77%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UserId</code></td>
<td>The user ID of the user.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>ThumbnailSize</code></td>
<td>The size of the thumbnail.</td>
<td>String (<code>30x30</code>, <code>48x48</code>, <code>60x60</code>,
<code>75x75</code>, <code>100x100</code>, <code>110x110</code>,
<code>140x140</code>, <code>150x150</code>, <code>150x200</code>,
<code>180x180</code>, <code>250x250</code>, <code>352x352</code>,
<code>420x420</code>, <code>720x720</code>)</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-1">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 13%" />
<col style="width: 38%" />
<col style="width: 21%" />
<col style="width: 8%" />
<col style="width: 18%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>is_circular</code></td>
<td>Whether the thumbnail should be circular.</td>
<td>Boolean</td>
<td><code>false</code></td>
<td><code>is_circular=true</code></td>
</tr>
<tr class="even">
<td><code>format</code></td>
<td>The format of the thumbnail.</td>
<td>String (<code>Png</code>, <code>Webp</code>)</td>
<td><code>Png</code></td>
<td><code>format=Webp</code></td>
</tr>
</tbody>
</table>
<h3 id="assetthumbnail">assetThumbnail</h3>
<blockquote>
<p>[!WARNING] Roblox enforces a stricter rate limit on the API used for
this than on the other APIs. It is in general recommended to use it at
most once per page.</p>
</blockquote>
<p>Provides the data about an asset thumbnail in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-6">Example</h4>
<p>Get the data about the asset thumbnail of the asset with ID
102611803:</p>
<pre><code>{{#robloxAPI: assetThumbnail | 1962446128 | 140x140 }}</code></pre>
<h4 id="required-arguments-6">Required Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 5%" />
<col style="width: 9%" />
<col style="width: 85%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>AssetId</code></td>
<td>The asset ID of the asset.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>ThumbnailSize</code></td>
<td>The size of the thumbnail.</td>
<td>String (<code>30x30</code>, <code>42x42</code>, <code>50x50</code>,
<code>60x62</code>, <code>75x75</code>, <code>110x110</code>,
<code>140x140</code>, <code>150x150</code>, <code>160x100</code>,
<code>160x600</code>, <code>250x250</code>, <code>256x144</code>,
<code>300x250</code>, <code>304x166</code>, <code>384x216</code>,
<code>396x216</code>, <code>420x420</code>, <code>480x270</code>,
<code>512x512</code>, <code>576x324</code>, <code>700x700</code>,
<code>728x90</code>, <code>768x432</code>, <code>1200x80</code>)</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-2">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 13%" />
<col style="width: 38%" />
<col style="width: 21%" />
<col style="width: 8%" />
<col style="width: 18%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>is_circular</code></td>
<td>Whether the thumbnail should be circular.</td>
<td>Boolean</td>
<td><code>false</code></td>
<td><code>is_circular=true</code></td>
</tr>
<tr class="even">
<td><code>format</code></td>
<td>The format of the thumbnail.</td>
<td>String (<code>Png</code>, <code>Webp</code>)</td>
<td><code>Png</code></td>
<td><code>format=Webp</code></td>
</tr>
</tbody>
</table>
<h3 id="assetthumbnailurl">assetThumbnailUrl</h3>
<blockquote>
<p>[!WARNING] Roblox enforces a stricter rate limit on the API used for
this than on the other APIs. It is in general recommended to use it at
most once per page.</p>
</blockquote>
<p>Provides the URL of an asset thumbnail. Allows <a
href="#Embedding-images-from-the-Roblox-CDN">embedding</a> the asset
image. Requires <a href="#assetThumbnail">assetThumbnail</a> to be
enabled.</p>
<h4 id="example-7">Example</h4>
<p>Get the URL of the asset thumbnail of the asset with ID
102611803:</p>
<pre><code>{{#robloxAPI: assetThumbnailUrl | 1962446128 | 140x140 }}</code></pre>
<h4 id="required-arguments-7">Required Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 5%" />
<col style="width: 9%" />
<col style="width: 85%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>AssetId</code></td>
<td>The asset ID of the asset.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>ThumbnailSize</code></td>
<td>The size of the thumbnail.</td>
<td>String (<code>30x30</code>, <code>42x42</code>, <code>50x50</code>,
<code>60x62</code>, <code>75x75</code>, <code>110x110</code>,
<code>140x140</code>, <code>150x150</code>, <code>160x100</code>,
<code>160x600</code>, <code>250x250</code>, <code>256x144</code>,
<code>300x250</code>, <code>304x166</code>, <code>384x216</code>,
<code>396x216</code>, <code>420x420</code>, <code>480x270</code>,
<code>512x512</code>, <code>576x324</code>, <code>700x700</code>,
<code>728x90</code>, <code>768x432</code>, <code>1200x80</code>)</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-3">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 13%" />
<col style="width: 38%" />
<col style="width: 21%" />
<col style="width: 8%" />
<col style="width: 18%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>is_circular</code></td>
<td>Whether the thumbnail should be circular.</td>
<td>Boolean</td>
<td><code>false</code></td>
<td><code>is_circular=true</code></td>
</tr>
<tr class="even">
<td><code>format</code></td>
<td>The format of the thumbnail.</td>
<td>String (<code>Png</code>, <code>Webp</code>)</td>
<td><code>Png</code></td>
<td><code>format=Webp</code></td>
</tr>
</tbody>
</table>
<h3 id="gameicon">gameIcon</h3>
<p>Provides the data about a game icon in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-8">Example</h4>
<p>Get the data about the game icon of the game with ID
132813250731469:</p>
<pre><code>{{#robloxAPI: gameIcon | 132813250731469 | 150x150 }}</code></pre>
<h4 id="required-arguments-8">Required Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 14%" />
<col style="width: 23%" />
<col style="width: 62%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>PlaceId</code></td>
<td>The place ID of the game.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>ThumbnailSize</code></td>
<td>The size of the icon.</td>
<td>String (<code>50x50</code>, <code>128x128</code>,
<code>150x150</code>, <code>256x256</code>, <code>420x420</code>,
<code>512x512</code>)</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-4">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 9%" />
<col style="width: 20%" />
<col style="width: 45%" />
<col style="width: 8%" />
<col style="width: 15%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>is_circular</code></td>
<td>Whether the icon should be circular.</td>
<td>Boolean</td>
<td><code>false</code></td>
<td><code>is_circular=true</code></td>
</tr>
<tr class="even">
<td><code>format</code></td>
<td>The format of the icon.</td>
<td>String (<code>Png</code>, <code>Webp</code>)</td>
<td><code>Png</code></td>
<td><code>format=Webp</code></td>
</tr>
<tr class="odd">
<td><code>return_policy</code></td>
<td>The return policy of the icon.</td>
<td>String (<code>PlaceHolder</code>, <code>ForcePlaceHolder</code>,
<code>AutoGenerated</code>, <code>ForceAutoGenerated</code>)</td>
<td><code>PlaceHolder</code></td>
<td><code>return_policy=PlaceHolder</code></td>
</tr>
</tbody>
</table>
<h3 id="gameiconurl">gameIconUrl</h3>
<p>Provides the URL of a game icon. Allows <a
href="#Embedding-images-from-the-Roblox-CDN">embedding</a> the game icon
image. Requires <a href="#gameIcon">gameIcon</a> to be enabled.</p>
<h4 id="example-9">Example</h4>
<p>Get the URL of the game icon of the game with ID 132813250731469:</p>
<pre><code>{{#robloxAPI: gameIconUrl | 132813250731469 | 150x150 }}</code></pre>
<h4 id="required-arguments-9">Required Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 14%" />
<col style="width: 23%" />
<col style="width: 62%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>PlaceId</code></td>
<td>The place ID of the game.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>ThumbnailSize</code></td>
<td>The size of the icon.</td>
<td>String (<code>50x50</code>, <code>128x128</code>,
<code>150x150</code>, <code>256x256</code>, <code>420x420</code>,
<code>512x512</code>)</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-5">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 9%" />
<col style="width: 20%" />
<col style="width: 45%" />
<col style="width: 8%" />
<col style="width: 15%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>is_circular</code></td>
<td>Whether the icon should be circular.</td>
<td>Boolean</td>
<td><code>false</code></td>
<td><code>is_circular=true</code></td>
</tr>
<tr class="even">
<td><code>format</code></td>
<td>The format of the icon.</td>
<td>String (<code>Png</code>, <code>Webp</code>)</td>
<td><code>Png</code></td>
<td><code>format=Webp</code></td>
</tr>
<tr class="odd">
<td><code>return_policy</code></td>
<td>The return policy of the icon.</td>
<td>String (<code>PlaceHolder</code>, <code>ForcePlaceHolder</code>,
<code>AutoGenerated</code>, <code>ForceAutoGenerated</code>)</td>
<td><code>PlaceHolder</code></td>
<td><code>return_policy=PlaceHolder</code></td>
</tr>
</tbody>
</table>
<h3 id="grouproles">groupRoles</h3>
<p>Provides all group roles a user has in all groups they have joined in
the <a href="#handling-json-data">JSON format</a>.</p>
<p><a
href="https://groups.roblox.com//docs/index.html?urls.primaryName=Groups%20Api%20v1#operations-Membership-get_v1_users__userId__groups_roles">Official
API documentation</a></p>
<h4 id="example-10">Example</h4>
<p>Get all JSON data of the group roles of a user:</p>
<pre><code>{{#robloxAPI: groupRoles | 4182456156 }}</code></pre>
<h4 id="required-arguments-10">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UserId</code></td>
<td>The user ID of the user.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="grouprank">groupRank</h3>
<p>Provides the name of a user’s rank in a group. Requires <a
href="#groupRoles">groupRoles</a> to be enabled.</p>
<h4 id="example-11">Example</h4>
<p>Get the name of the rank of the user with ID <code>4182456156</code>
in the group with ID <code>3620943</code>:</p>
<pre><code>{{#robloxAPI: groupRank | 3620943 | 4182456156 }}</code></pre>
<h4 id="required-arguments-11">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>GroupId</code></td>
<td>The group ID of the group.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>UserId</code></td>
<td>The user ID of the user.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="groupdata">groupData</h3>
<p>Provides data about a group in the <a href="#handling-json-data">JSON
format</a>.</p>
<p><a
href="https://groups.roblox.com//docs/index.html?urls.primaryName=Groups%20Api%20v1#operations-Groups-get_v1_groups__groupId_">Official
API documentation</a></p>
<h4 id="example-12">Example</h4>
<p>Get all JSON data of a group:</p>
<pre><code>{{#robloxAPI: groupData | 3620943 }}</code></pre>
<h4 id="required-arguments-12">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>GroupId</code></td>
<td>The group ID of the group.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="groupmembers">groupMembers</h3>
<p>Provides the number of members in a group. Requires <a
href="#groupData">groupData</a> to be enabled.</p>
<h4 id="example-13">Example</h4>
<p>Get the number of members in a group:</p>
<pre><code>{{#robloxAPI: groupMembers | 3620943 }}</code></pre>
<p>Get the formatted number of members in a group:</p>
<pre><code>{{formatnum: {{#robloxAPI: groupMembers | 3620943 }} }}</code></pre>
<h4 id="required-arguments-13">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>GroupId</code></td>
<td>The group ID of the group.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="badgeinfo">badgeInfo</h3>
<p>Provides information about a badge in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-14">Example</h4>
<p>Get all JSON data of a badge:</p>
<pre><code>{{#robloxAPI: badgeInfo | 4488119458388820}}</code></pre>
<h4 id="required-arguments-14">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>BadgeId</code></td>
<td>The badge ID of the badge.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="userinfo">userInfo</h3>
<p>Provides information about a user in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-15">Example</h4>
<p>Get all JSON data of a user:</p>
<pre><code>{{#robloxAPI: userInfo | 156 }}</code></pre>
<h4 id="required-arguments-15">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UserId</code></td>
<td>The user ID of the user.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="assetdetails">assetDetails</h3>
<p>Provides information about an asset in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-16">Example</h4>
<p>Get all JSON data of an asset:</p>
<pre><code>{{#robloxAPI: assetDetails | 102611803 }}</code></pre>
<h4 id="required-arguments-16">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>AssetId</code></td>
<td>The asset ID of the asset.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="grouproleslist">groupRolesList</h3>
<p>Provides a list of roles in a group in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-17">Example</h4>
<p>Get the roles of a group:</p>
<pre><code>{{#robloxAPI: groupRolesList | 5353743 }}</code></pre>
<h4 id="required-arguments-17">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>GroupId</code></td>
<td>The group ID of the group.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="gamenamedescription">gameNameDescription</h3>
<p>Provides the name and description of a game in all supported
languages in the <a href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-18">Example</h4>
<p>Get the name and description of a game:</p>
<pre><code>{{#robloxAPI: gameNameDescription | 6483209208 }}</code></pre>
<p>Get the description of a game in English:</p>
<pre><code>{{#robloxAPI: gameNameDescription | 6483209208 | json_key=data-&gt;0-&gt;description }}</code></pre>
<h4 id="required-arguments-18">Required Arguments</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 63%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UniverseId</code></td>
<td>The <a href="#universe-id">universe ID</a> of the game.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="universeinfo">universeInfo</h3>
<p>Provides info about a universe in the <a
href="#handling-json-data">JSON format</a>.</p>
<h4 id="example-19">Example</h4>
<p>Get info about a universe:</p>
<pre><code>{{#robloxAPI: universeInfo | 4864117649 }}</code></pre>
<p>Get the privacy type of a universe:</p>
<pre><code>{{#robloxAPI: universeInfo | 4864117649 | json_key=privacyType }}</code></pre>
<h4 id="required-arguments-19">Required Arguments</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 63%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UniverseId</code></td>
<td>The <a href="#universe-id">universe ID</a> of the game.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="usergames">userGames</h3>
<p>Provides a list of games a user has created in the <a
href="#handling-json-data">JSON format</a>.</p>
<p>Note that it is not possible to get more than 50 games.</p>
<h4 id="example-20">Example</h4>
<p>Get the list of games a user has created:</p>
<pre><code>{{#robloxAPI: userGames | 1995870730 }}</code></pre>
<h4 id="required-arguments-20">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UserId</code></td>
<td>The user ID of the user.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-6">Optional Arguments</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 15%" />
<col style="width: 44%" />
<col style="width: 30%" />
<col style="width: 10%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>limit</code></td>
<td>The maximum number of games to return.</td>
<td>Numeric ID (10, 25 or 50)</td>
<td><code>50</code></td>
</tr>
<tr class="even">
<td><code>sort_order</code></td>
<td>The order to sort the games.</td>
<td>String (<code>Asc</code>, <code>Desc</code>)</td>
<td><code>Asc</code></td>
</tr>
</tbody>
</table>
<h3 id="userplacevisits">userPlaceVisits</h3>
<p>Provides the number of visits of all places a user has created.</p>
<p>Note that due to performance reasons, only the views of the first 50
places of the user are returned.</p>
<h4 id="example-21">Example</h4>
<p>Get the number of visits of all places a user has created:</p>
<pre><code>{{#robloxAPI: userPlaceVisits | 1995870730 }}</code></pre>
<h4 id="required-arguments-21">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UserId</code></td>
<td>The user ID of the user.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-7">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 7%" />
<col style="width: 72%" />
<col style="width: 14%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>limit</code></td>
<td>The maximum number of games to consider in the calculation.</td>
<td>Numeric ID (10, 25 or 50)</td>
<td><code>50</code></td>
</tr>
<tr class="even">
<td><code>sort_order</code></td>
<td>The order to sort the games. This is used by the api and may change
the results if the user has more games than the limit allows.</td>
<td>String (<code>Asc</code>, <code>Desc</code>)</td>
<td><code>Asc</code></td>
</tr>
</tbody>
</table>
<h3 id="gameevents">gameEvents</h3>
<p>Provides a list of events happening in a universe.</p>
<h4 id="example-22">Example</h4>
<p>Get the events in a universe:</p>
<pre><code>{{#robloxAPI: gameEvents | 6597877862 }}</code></pre>
<p>Get the title of the first event in a universe:</p>
<pre><code>{{#robloxAPI: gameEvents | 6597877862 | json_key=0-&gt;title }}</code></pre>
<h4 id="required-arguments-22">Required Arguments</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 63%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>UniverseId</code></td>
<td>The <a href="#universe-id">universe ID</a> of the game.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h3 id="grouprolemembers">groupRoleMembers</h3>
<p>Provides a list of users who have a certain role in a group.</p>
<h4 id="example-23">Example</h4>
<p>List of product developers in the SRC group:</p>
<pre><code>{{#robloxAPI: groupRoleMembers | 3620943 | 31072726 | limit=100 }}</code></pre>
<h4 id="required-arguments-23">Required Arguments</h4>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>GroupId</code></td>
<td>The group ID of the group.</td>
<td>Numeric ID</td>
</tr>
<tr class="even">
<td><code>RoleId</code></td>
<td>The role ID of the role.</td>
<td>Numeric ID</td>
</tr>
</tbody>
</table>
<h4 id="optional-arguments-8">Optional Arguments</h4>
<table class="table-wrap">
<colgroup>
<col style="width: 15%" />
<col style="width: 43%" />
<col style="width: 32%" />
<col style="width: 9%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Type</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>limit</code></td>
<td>The maximum number of users to return.</td>
<td>Numeric ID (10, 25, 50, 100)</td>
<td><code>50</code></td>
</tr>
<tr class="even">
<td><code>sort_order</code></td>
<td>The order to sort the users.</td>
<td>String (<code>Asc</code>, <code>Desc</code>)</td>
<td><code>Asc</code></td>
</tr>
</tbody>
</table>
<h2 id="handling-json-data">Handling JSON data</h2>
<h3 id="json-keys">JSON keys</h3>
<p>Some data sources return plain JSON data from the Roblox API. To
parse this data, you can either use Lua (with the Scribunto extension)
or use the <code>json_key</code> optional argument:</p>
<pre><code>{{#robloxAPI: userInfo | 156 | json_key=created }}</code></pre>
<p>This example gets the user info of the user with the ID
<code>156</code> and returns the <code>created</code> key from the JSON
data.</p>
<p>Nested keys can be accessed by separating them with ‘-&gt;’,
e.g.:</p>
<pre><code>{{#robloxAPI: gameData | 6483209208 | 132813250731469 | json_key=creator-&gt;name }}</code></pre>
<p>To access an item in an array, you can use the index of the item,
e.g.:</p>
<pre><code>{{#robloxAPI: gameData | 6483209208 | 132813250731469 | json_key=allowedGearGenres-&gt;0 }}</code></pre>
<h3 id="pretty-printing-json-data">Pretty-printing JSON data</h3>
<p>To pretty-print JSON data, you can use the <code>pretty</code>
optional argument:</p>
<pre><code>{{#robloxAPI: userInfo | 156 | pretty=true }}</code></pre>
<h2 id="faqs">FAQs</h2>
<p><a id="universe-id"></a></p>
<h3 id="how-do-i-obtain-the-universe-id-of-a-game">How do I obtain the
Universe ID of a game?</h3>
<p>To get the universe ID of a place, input the place ID to this
API:</p>
<pre><code>https://apis.roblox.com/universes/v1/places/&lt;GAMEID&gt;/universe</code></pre>
<h3 id="embedding-images-from-the-roblox-cdn">Embedding images from the
Roblox CDN</h3>
<p>The result of the <code>{{#rblxUserAvatarThumbnailUrl}}</code> parser
function can be used to embed avatar images in your wiki.</p>
<h4 id="wikis-on-miraheze">Wikis on Miraheze</h4>
<p>Go to <code>Special:ManageWiki/settings</code> on your wiki, search
for “External Images” and make sure this option is enabled: <img
src="https://github.com/user-attachments/assets/78e86d78-c3d1-487f-8974-1b4e5dbeaab7"
alt="image" /></p>
<h4 id="rd-party-wikis">3rd party wikis</h4>
<p>To do this, the <code>$wgEnableImageWhitelist</code> configuration
variable must be set to <code>true</code>.</p>
<p>Then, add the following line to the
<code>MediaWiki:External image whitelist</code> page on your wiki:</p>
<blockquote>
<p>[!WARNING] This allows users to embed any image from the Roblox CDN
on your wiki.</p>
</blockquote>
<pre class="regex"><code>^https://([a-zA-Z0-9]{2})\.rbxcdn\.com/</code></pre>
<h3 id="migrating-from-the-old-parser-functions">Migrating from the old
parser functions</h3>
<p>If you are using the old parser functions, it is highly recommended
to migrate to the new <code>{{#robloxAPI}}</code> parser function by
replacing the old parser function with the new one. Please refer to the
documentation above for examples on how to use each data source with the
new parser function. For example, replace:</p>
<pre><code>{{#rblxUserId: builderman}}</code></pre>
<p>with:</p>
<pre><code>{{#robloxAPI: userId | builderman}}</code></pre>
<h2 id="configuration">Configuration</h2>
<h3
id="wgrobloxapienableddatasources"><code>$wgRobloxAPIEnabledDatasources</code></h3>
<p>An array of data sources that should be enabled and available. By
default, all data sources are enabled:</p>
<div class="sourceCode" id="cb41"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb41-1"><a href="#cb41-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIEnabledDatasources</span> <span class="op">=</span> [</span>
<span id="cb41-2"><a href="#cb41-2" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;gameData&#39;</span><span class="ot">,</span>    </span>
<span id="cb41-3"><a href="#cb41-3" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;activePlayers&#39;</span><span class="ot">,</span></span>
<span id="cb41-4"><a href="#cb41-4" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;visits&#39;</span><span class="ot">,</span></span>
<span id="cb41-5"><a href="#cb41-5" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;userId&#39;</span><span class="ot">,</span></span>
<span id="cb41-6"><a href="#cb41-6" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;userAvatarThumbnail&#39;</span><span class="ot">,</span></span>
<span id="cb41-7"><a href="#cb41-7" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;userAvatarThumbnailUrl&#39;</span><span class="ot">,</span></span>
<span id="cb41-8"><a href="#cb41-8" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;assetThumbnail&#39;</span><span class="ot">,</span></span>
<span id="cb41-9"><a href="#cb41-9" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;assetThumbnailUrl&#39;</span><span class="ot">,</span></span>
<span id="cb41-10"><a href="#cb41-10" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;gameIcon&#39;</span><span class="ot">,</span></span>
<span id="cb41-11"><a href="#cb41-11" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;gameIconUrl&#39;</span><span class="ot">,</span></span>
<span id="cb41-12"><a href="#cb41-12" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;groupRoles&#39;</span><span class="ot">,</span></span>
<span id="cb41-13"><a href="#cb41-13" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;groupData&#39;</span><span class="ot">,</span></span>
<span id="cb41-14"><a href="#cb41-14" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;groupRank&#39;</span><span class="ot">,</span></span>
<span id="cb41-15"><a href="#cb41-15" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;groupMembers&#39;</span><span class="ot">,</span></span>
<span id="cb41-16"><a href="#cb41-16" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;badgeInfo&#39;</span><span class="ot">,</span></span>
<span id="cb41-17"><a href="#cb41-17" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;userInfo&#39;</span><span class="ot">,</span></span>
<span id="cb41-18"><a href="#cb41-18" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;assetDetails&#39;</span><span class="ot">,</span></span>
<span id="cb41-19"><a href="#cb41-19" aria-hidden="true" tabindex="-1"></a>]<span class="ot">;</span></span></code></pre></div>
<h3
id="wgrobloxapicachingexpiries"><code>$wgRobloxAPICachingExpiries</code></h3>
<p>An array of cache expiry times (in seconds) for each data source.
Default caching expiries:</p>
<table class="table-wrap">
<thead>
<tr class="header">
<th>Data source</th>
<th>Expiry</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>*</code> (default)</td>
<td>600 (10 minutes)</td>
</tr>
<tr class="even">
<td><code>assetThumbnail</code></td>
<td>7200 (2 hours)</td>
</tr>
<tr class="odd">
<td><code>badgeInfo</code></td>
<td>1800 (30 minutes)</td>
</tr>
<tr class="even">
<td><code>groupData</code></td>
<td>3600 (1 hour)</td>
</tr>
<tr class="odd">
<td><code>userAvatarThumbnail</code></td>
<td>3600 (1 hour)</td>
</tr>
<tr class="even">
<td><code>userId</code></td>
<td>86400 (24 hours)</td>
</tr>
<tr class="odd">
<td><code>userInfo</code></td>
<td>86400 (24 hours)</td>
</tr>
</tbody>
</table>
<blockquote>
<p>[!WARNING] Lower cache expiry times can lead to more requests to the
Roblox API, which can lead to rate limiting and decreased wiki
performance.</p>
</blockquote>
<p>If you want to set different cache expiry times for specific data
sources, you can do so like this:</p>
<div class="sourceCode" id="cb42"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb42-1"><a href="#cb42-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPICachingExpiries</span> <span class="op">=</span> [</span>
<span id="cb42-2"><a href="#cb42-2" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;*&#39;</span> =&gt; <span class="dv">6000</span><span class="ot">,</span></span>
<span id="cb42-3"><a href="#cb42-3" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;gameData&#39;</span> =&gt; <span class="dv">120</span><span class="ot">,</span></span>
<span id="cb42-4"><a href="#cb42-4" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;groupRoles&#39;</span> =&gt; <span class="dv">180</span><span class="ot">,</span></span>
<span id="cb42-5"><a href="#cb42-5" aria-hidden="true" tabindex="-1"></a>]<span class="ot">;</span></span></code></pre></div>
<h3
id="wgrobloxapicachesplittingoptionalarguments"><code>$wgRobloxAPICacheSplittingOptionalArguments</code></h3>
<p>An array of optional arguments that should affect caching.</p>
<p>Some optional arguments, such as <code>pretty</code>, do not affect
the API result. Some do, such as <code>format</code>, but are not
included in the default value since it does not matter a lot which image
format is served.</p>
<p>Default:</p>
<div class="sourceCode" id="cb43"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb43-1"><a href="#cb43-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPICacheSplittingOptionalArguments</span> <span class="op">=</span> [</span>
<span id="cb43-2"><a href="#cb43-2" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;is_circular&#39;</span><span class="ot">,</span></span>
<span id="cb43-3"><a href="#cb43-3" aria-hidden="true" tabindex="-1"></a>]<span class="ot">;</span></span></code></pre></div>
<h3
id="wgrobloxapiallowedarguments"><code>$wgRobloxAPIAllowedArguments</code></h3>
<p>An array of allowed arguments per argument type. If empty, all
arguments for the type are allowed. Any argument types that do not have
an entry in this array will allow any value. This is useful for
restricting arguments. By default, all arguments are allowed:</p>
<div class="sourceCode" id="cb44"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb44-1"><a href="#cb44-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIAllowedArguments</span> <span class="op">=</span> []<span class="ot">;</span></span></code></pre></div>
<p>If you want to restrict the allowed arguments for a specific type,
you can do so like this:</p>
<div class="sourceCode" id="cb45"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb45-1"><a href="#cb45-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIAllowedArguments</span> <span class="op">=</span> [</span>
<span id="cb45-2"><a href="#cb45-2" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;GameID&#39;</span> =&gt; [<span class="dv">123456</span><span class="ot">,</span> <span class="dv">789012</span>]<span class="ot">,</span></span>
<span id="cb45-3"><a href="#cb45-3" aria-hidden="true" tabindex="-1"></a>]<span class="ot">;</span></span></code></pre></div>
<p>In this example, only the Game IDs 123456 and 789012 are allowed.</p>
<h3
id="wgrobloxapirequestuseragent"><code>$wgRobloxAPIRequestUserAgent</code></h3>
<p>The user agent that should be used when making requests to the Roblox
API. By default, it uses the default one provided by MediaWiki. If you
want to change it, you can set this variable to a custom user agent:</p>
<div class="sourceCode" id="cb46"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb46-1"><a href="#cb46-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIRequestUserAgent</span> <span class="op">=</span> <span class="st">&#39;RobloxAPI MediaWiki Extension&#39;</span><span class="ot">;</span></span></code></pre></div>
<h3
id="wgrobloxapidisablecache"><code>$wgRobloxAPIDisableCache</code></h3>
<p>Whether to disable the cache for the extension. By default, caching
is enabled:</p>
<div class="sourceCode" id="cb47"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb47-1"><a href="#cb47-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIDisableCache</span> <span class="op">=</span> <span class="kw">false</span><span class="ot">;</span></span></code></pre></div>
<p>If you want to disable caching, you can set this variable to
<code>true</code>:</p>
<div class="sourceCode" id="cb48"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb48-1"><a href="#cb48-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIDisableCache</span> <span class="op">=</span> <span class="kw">true</span><span class="ot">;</span></span></code></pre></div>
<h3
id="wgrobloxapiparserfunctionsexpensive"><code>$wgRobloxAPIParserFunctionsExpensive</code></h3>
<p>Whether to mark the extension’s parser functions as expensive. By
default, they are marked as expensive:</p>
<div class="sourceCode" id="cb49"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb49-1"><a href="#cb49-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIParserFunctionsExpensive</span> <span class="op">=</span> <span class="kw">true</span><span class="ot">;</span></span></code></pre></div>
<p>If you don’t want to mark the extension’s parser functions as
expensive, you can set this variable to <code>false</code>:</p>
<div class="sourceCode" id="cb50"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb50-1"><a href="#cb50-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIParserFunctionsExpensive</span> <span class="op">=</span> <span class="kw">false</span><span class="ot">;</span></span></code></pre></div>
<h3
id="wgrobloxapiregisterlegacyparserfunctions"><code>$wgRobloxAPIRegisterLegacyParserFunctions</code></h3>
<p>Whether to register the legacy parser functions for the extension
that were deprecated in version 1.2.0. By default, they are registered
for backwards compatibility:</p>
<div class="sourceCode" id="cb51"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb51-1"><a href="#cb51-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIRegisterLegacyParserFunctions</span> <span class="op">=</span> <span class="kw">true</span><span class="ot">;</span></span></code></pre></div>
<p>If you do not need the legacy parser functions, you can set this
variable to <code>false</code>:</p>
<div class="sourceCode" id="cb52"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb52-1"><a href="#cb52-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIRegisterLegacyParserFunctions</span> <span class="op">=</span> <span class="kw">false</span><span class="ot">;</span></span></code></pre></div>
<h3
id="wgrobloxapidatasourceusagelimits"><code>$wgRobloxAPIDataSourceUsageLimits</code></h3>
<p>The maximum number of times a data source can be used on a single
page. By default, there are no limits:</p>
<div class="sourceCode" id="cb53"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb53-1"><a href="#cb53-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIDataSourceUsageLimits</span> <span class="op">=</span> []<span class="ot">;</span></span></code></pre></div>
<p>If you want to limit the usage of a data source, you can do so like
this:</p>
<div class="sourceCode" id="cb54"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb54-1"><a href="#cb54-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIDataSourceUsageLimits</span> <span class="op">=</span> [</span>
<span id="cb54-2"><a href="#cb54-2" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;gameData&#39;</span> =&gt; <span class="dv">1</span><span class="ot">,</span></span>
<span id="cb54-3"><a href="#cb54-3" aria-hidden="true" tabindex="-1"></a>    <span class="st">&#39;userId&#39;</span> =&gt; <span class="dv">2</span><span class="ot">,</span></span>
<span id="cb54-4"><a href="#cb54-4" aria-hidden="true" tabindex="-1"></a>]<span class="ot">;</span></span></code></pre></div>
<p>In this example, the <code>gameData</code> data source can only be
used once per page, and the <code>userId</code> data source can be used
twice per page. If a data source is used more than the allowed limit, an
error message will be displayed.</p>
<p>The usage counter is evaluated after transclusion expansion and
before cache lookup. Therefore, calls satisfied from cache still count
towards the per-page limit.</p>
<p>Setting a limit for a data source will also affect data sources that
depend on it. Dependent data sources themselves currently cannot be
limited.</p>
<h3
id="wgrobloxapishowplainerrors"><code>$wgRobloxAPIShowPlainErrors</code></h3>
<p>Whether to show errors in plain text format instead of rendering a
codex error box.</p>
<p>By default, this is set to <code>false</code>, which means that
errors are rendered in a codex error box:</p>
<div class="sourceCode" id="cb55"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb55-1"><a href="#cb55-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIShowPlainErrors</span> <span class="op">=</span> <span class="kw">false</span><span class="ot">;</span></span></code></pre></div>
<p>If you want to show errors in plain text format instead, you can set
this variable to <code>true</code>:</p>
<div class="sourceCode" id="cb56"><pre
class="sourceCode php"><code class="sourceCode php"><span id="cb56-1"><a href="#cb56-1" aria-hidden="true" tabindex="-1"></a><span class="va">$wgRobloxAPIShowPlainErrors</span> <span class="op">=</span> <span class="kw">true</span><span class="ot">;</span></span></code></pre></div>
{% endraw %}
