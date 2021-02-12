module.exports = {
    "domain": {
        "type": "object",
        "properties": {
            "domain": {"type": "string"},
            "owner": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "displayName": {"type": "string"},
                    "privacyPolicy": {"type": "string"},
                    "url": {"type": "string"}
                }
            },
            "cnames": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "original": {"type": "string"},
                        "resolved": {"type": "string"},
                    },
                    "required": ["original", "resolved"]
                }
            },
            "subdomains": {
                "type": "array",
                "items": {"type": "string"}
            },
            "prevalence": {"type": "number"},
            "fingerprinting": {"type": "integer", "minimum": 0, "maximum": 3},
            "cookies": {"type": "number"},
            "categories": {
                "type": "array",
                "items": {"type": "string"}
            },
            "resources": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "rule": {"type": "string"},
                        "cookies": {"type": "number"},
                        "fingerprinting": {"type": "integer", "minimum": 0, "maximum": 3},
                        "exampleSites": {"type": "array", "items": {"type":"string"}},
                        "responseHashes": {"type": "array", "items": {"type": "string"}},
                        "firstPartyCookies": {
                            "type": "object",
                            "patternProperties": {
                                "^[a-zA-Z0-9_-]+$": {
                                    "type": "object",
                                    "properties": {
                                        "ttl": {"type": ["integer", "null"]},
                                        "length": {"type": "integer", "minimum": 0},
                                        "prevalence": {"type": "number"},
                                        "uniqueness": {"type": "number"},
                                    },
                                    "required": ["ttl", "length", "prevalence", "uniqueness"]
                                }
                            }
                        },
                        "firstPartyCookiesSent": {
                            "type": "object",
                            "patternProperties": {
                                "^[a-zA-Z0-9_-]+$": {
                                    "type": "number"
                                }
                            }
                        }
                    },
                    "required": ["rule", "cookies", "fingerprinting", "exampleSites", "responseHashes"]
                }
            }
        }
    },
    "entity": {
        "type": "object",
        "properties": {
            "properties": {"type": "array", "items": {"type": "string"}},
            "displayName": {"type": "string"},
            "name": {"type": "string"},
            "prevalence": {
                "type": "object",
                "properties": {
                    "tracking": {"type": "number"}
                }
            }
        },
        "required": ["name", "displayName", "properties"]
    },
}
