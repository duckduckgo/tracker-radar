# Overview
These domains were identified by crawling the top sites on the internet, and looking for 3rd party resource requests that are on several different sites which set cookies or access browser APIs known to be used in fingerprinting.

- Domain and entitiy data is automatically generated using the [Tracker Radar Detector](https://github.com/duckduckgo/tracker-radar-detector)

- [**Domains**](#Domains): Automatically generated domain data files.
- [**Entities**](#entities): Automatically generated data on entities or companies that control the domain. 
- [**Build data**](#build-data): Static files used to build the domain data files. This includes data on privacy policies, surrogate definitions, categories, and more.
- [**Breakage data**](#breakage-data): Static files defining broken sites or requests that can cause breakage. 

## Development

- The domain and entity data is automatically generated using [Tracker Radar Detector](https://github.com/duckduckgo/tracker-radar-detector). 
- New development and bug fixes, other then broken sites, are handled internally.

## Domains
The domain data is stored as individual region-specific JSON files. We crawl the most popular domains for each given region. The resulting domain data is stored in region-specific subdirectories within the [domains](/domains) directory:

|**Region Code**|**Region**|
|---|---|
|**[US](/domains/US)**|United States|

Domains are grouped by their domain name and IDNA encoded.

Each domain is defined using the following fields:

|||
|---|---|
|**domain**|The domain of the third party request|
|**resources**|Resources to match for a given domain|
|**surrogates**|Replacement code for specific domain scripts to prevent website breakage|
|**owner**|Entity (usually a company) that control this domain|
|**source**|The organizations of processes which identified the domain|
|**prevalence**|Percentage of top sites that request this domain|
|**fingerprinting**|Likelihood this domain is fingerprinting users|
|**cookies**|Percentage of the top sites that have cookies set by this domain|
|**performance**|Performance impact of loading this domain|
|**categories**|An array of categories describing the purpose of this domain|
|**types**|Request types this domain has used|
|**cnames**|An array of subdomains that include DNS CNAMES redirecting to this domain|

#### Resources
An array of regexes to match against the full URL of significant third-party requests made to this domain. Significant is any resource detected to be using a browser API used for fingerprinting or setting/getting cookies.

|||
|--|--|
|**rule**|A regex to match against the request URL|
|**cookies**|Percentage of the top sites that have cookies set by this third-party domain|
|**fingerprinting**|Likelihood this third-party domain is using browser APIs to uniquely identify users|
|**apis**|A list of browser APIs accessed by this resource which are commonly used in fingerprinting|
|**prevalence**|Percentage of the top sites where this resource was seen|
|**cnames**|A list of DNS CNAMEs that redirected to this resource|

#### Breaking
An optional array of resources that can cause breakage if blocked.

|||
|--|--|
|**rule**|A regex to match against the request URL|
|**domains**|An optional list of domains that this breaking rule applies to| 
|**types**|An optional list of request types that this breaking rule applies to|

#### Surrogates
An optional array of resources and replacement function names to prevent site breakage.

|||
|--|--|
|**rule**|A regex to match against the request URL|
|**replaceWith**|Name of replacement function to serve in place to avoid site breakage (NOTE: These are not currently included in the Tracker Radar data)|

#### Source 
An array of the organizations or processes which identified the domain. Currently the only value in all domains is DDG, but more may be added in the future.

#### Owner
Entity (a company or organization) that controls each domain. Each entity may have the following fields defined:

|||
|--|--|
|**name**|The name of the entity
|**url**|The primary website of the entity (if available)|
|**privacyPolicy**|The privacy policy URL for the entity (if available)|
|**displayName**|A shortened entity name without company suffixes|

#### Domain
The domain that should be matched against third-party requests.

#### Prevalence [0-1]
The percentage of the top sites that request this third-party domain.

#### cookies [0-1]
The percentage of the top sites that have cookies set by this third-party domain.

#### Fingerprinting [0-3]
The likelihood this third-party domain is using browser APIs to uniquely identify users.

|||
|--|--|
|**0**|No use of browser API's|
|**1**|Some use of browser API’s, but not obviously for tracking purposes|
|**2**|Use of many browser API’s, possibly for tracking purposes|
|**3**|Excessive use of browser API’s, almost certainly for tracking purposes|

#### Performance

Performance impact of a domain.

|||
|--|--|
|**cache**|How frequently do resources need to be re-downloaded? This is derived from the cache-control, expires and pragma headers.|
|**time**|How long do requests take to load? The time from when request is made until it is fully downloaded.|
|**size**|How big is it? This is the encoded size (actual transferred size) including headers.|
|**cpu**|How much overhead does executing the code incur? This is derived from CPU time spent on script parsing, compiling and evaluation on the main thread.|

Each of these fields is assigned a value from 1-3, where 1 is little to no performance impact, and 3 is high impact. The delta between values representing an order of magnitude difference.

#### Categories
Categories assigned to each domain, attempting to describe its observed purpose or intent. See [categories](CATEGORIES.md) for the full list.

---

## Entities
A list of companies and their properties. One file per company. 

Each entity is defined using the following fields:

|||
|--|--|
|**Owner**|The name of another entity that ownes this entity if any|
|**Properties**|A list of domains owned by this entity|
|**Name**|Name of the entity|
|**Prevalence**|The percent of sites this entity is found on|

---

## Build data

### /static

Data files used to renerate the Tracker Radar

|File|Use|
|---|---|
|[api_fingerprint_scores](/build-data/static/api_fingerprint_scores.json)|An object mapping browser APIs to their likelyhood to be used for fingerprinting. Scale is 0-6000|
|[categorized_trackers](/build-data/static/categorized_trackers.csv)|CSV file with domains and which categories they belong to|
|[surrogates](/build-data/static/surrogates.json)|Mapping domain resources to their surrogates.|
|[breaking](/build-data/breaking)|Broken site data used for identifying whole sites or requests that cause breakage.|

---

## Breakage data

### /static/breaking

We use three [breakage files](/build-data/static/breaking): two temporary breakage files meant for quick fixes and one long-term breakage file for requests. 

### Temporary breakage data
Temporary breakage data is meant for quick fixes to address major site breakage. Temporary breakage entries will have a corresponding issue to find a long-term solution. 

|Name|Use|
|---|---|
|[breaking_sites_temp](/build-data/static/breaking/breaking_sites_temp.json)|Used to indicate that an entire site is breaking|
|[breaking_requests_temp](/build-data/static/breaking/breaking_requests_temp.json)|Used to identify specific requests or resources that can cause breakage|

### Long-term breakage data

|Name|Use|
|---|---|
|[breaking_requests_longterm](/build-data/static/breaking/breaking_requests_longterm.json)|Used to identify specific requests or resources that can cause breakage|

## Breakage data formats

### Request

|Name|Use|
|---|---|
|**rule**| A regex rule that will match on the request. These should be as specific as possible to fix the issue. |
|**domains**| An optional list of domains that this breaking rule should apply to.| 
|**requestTypes**| An optional list of request types that this breaking rule should apply to.|
|**reason**|<ul><li>**category**: List of [breakage categories](#breakage-categories)</li><li>**links**: List of links back to pull request where this breaking entry was added or changed</li></ul>|

### Site

The site breaking entries are key/value mapping a site domain to a breakage category. 

|Name|Use|
|---|---|
|Key|Domain of the site identified to be broken|
|Value|[breakage category](#breakage-categories)|

### Breakage categories
Cateories defining the site or request breakage type.

|Category|Description|
|---|---|
|Video|Videos don't load or have issues playing|
|Images|Images don't load|
|Comments|Missing comment sections|
|Content|Site is missing useful content|
|Links|Links or site navigation is broken|
|Login|Broken site login|
|Paywall|Site asks to disable tracker blocking|
|Other|Anything that doesn't fit in an existing category|
