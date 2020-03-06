### How do you decide what domains to include?

The included domains were identified by crawling the top sites on the Internet, and looking for 3rd party resource requests that are on several different sites which set cookies or access browser APIs known to be used in fingerprinting.

### You're missing a domain. How do I submit a new one?

Domains are automatically generated and included in our list based on prevalence on top sites and their use of cookies or browser APIs.

### How is the data created and maintained?

These domains were identified by crawling the top sites on the Internet, and looking for 3rd party resource requests which set cookies or access browser APIs known to be used in fingerprinting. We periodically crawl and update the data, usually at least monthly.

### Are you differentiating between trackers and ads?

No. Domains are automatically included based on their use of browser APIs or by setting cookies.

### How are you determining likelihood of fingerprinting? 

Our crawler keeps track of APIs resource use on each site where they are found. We then use this data to calculate a total fingerprint score, which is the sum of all weighted APIs accessed by each resource (see answer below on weightings).

### Are you weighting the use of various APIs in determining possible fingerprinting?

Yes, we are weighting the APIs. The weights are defined in [api_fingerprint_weights.json](/build-data/static/api_fingerprint_weights.json) and range from 1-6000.  Weights are currently based on the ratio of how often a given API is called by "suspicious scripts" vs "non-suspicious scripts" (e.g. "WebGLRenderingContext.getSupportedExtensions" has a very high weight, while "window.localStorage" has a very low one).

### Are you looking at whether something is just present in a script, or whether it actually gets called?

We are only looking at the actual calls being made.
