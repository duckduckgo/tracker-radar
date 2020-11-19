### Is this a block list?

No, the Tracker Radar is a data set of third-party domains found while crawling. Using the data provided, you can decide which domains to block and build your own list

### How do you decide what domains to include?

The included domains were identified by crawling the top sites on the Internet, and looking for 3rd party resource requests that are on several different sites which set cookies or access browser APIs known to be used in fingerprinting.

### Why is my domain included in your list?

The data set includes domains that were found in a third-party context while crawling that either set cookies or use browser APIs.

### You're missing a domain. How do I submit a new one?

Domains are automatically generated and included in our list based on prevalence on top sites and their use of cookies or browser APIs.

### How can I build a block list?
Depending on your application, you will want to decide on what your criteria for a blockable domain is. Some example of how you might filter the data:

- use domain prevalence to limit a block list to only the most impactful domains
- use the domain fingerprinting score to find only the worst fingerprinting offenders 
- use domain cookie value to find only domains that set third-party cookies
- filter out CDNs or types of domains that are likely to cause breakage using the domain category list

### What does the fingerprinting score mean?
Domains and resources are given a fingerprint score that ranges from 0-3 that represents the likelihood that they’re using browser APIs for fingerprinting. 

0 - No APIs were used

1 - Normal use of APIs, not likely used for fingerprinting

2 - High use of APIs, possibly for fingerprinting

3 - Very high API use, almost certainly used for fingerprinting

### How is the data created and maintained?

These domains were identified by crawling the top sites on the Internet, and looking for 3rd party resource requests which set cookies or access browser APIs known to be used in fingerprinting. We periodically crawl and update the data, usually at least monthly.

### Are you differentiating between trackers and ads?

No. Domains are automatically included based on their use of browser APIs or by setting cookies.

### How are you determining likelihood of fingerprinting? 

Our crawler keeps track of APIs resource use on each site where they are found. We then use this data to calculate a total fingerprint score, which is the sum of all weighted APIs accessed by each resource (see answer below on weightings).

### Are you weighting the use of various APIs in determining possible fingerprinting?

Yes, we are weighting the APIs. The weights are defined in [api_fingerprint_weights.json](/build-data/generated/api_fingerprint_weights.json).  Weights are currently based on the ratio of how often a given API is called by "suspicious scripts" vs "non-suspicious scripts" (e.g. "WebGLRenderingContext.getSupportedExtensions" has a very high weight, while "window.localStorage" has a very low one).

### Are you looking at whether something is just present in a script, or whether it actually gets called?

We are only looking at the actual calls being made.
