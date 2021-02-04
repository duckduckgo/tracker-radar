module.exports = {
    "domain": {
        "type": "object",
        "properties": {
            "domain": {"type": "string"},
            "owner": {"type": "object"},
            "prevalence": {"type": "number"},
            "fingerprinting": {"type": "integer", "minimum": 0, "maximum": 3},
            "cookies": {"type": "number"},
            "categories": {"type": "array"},
            "default": {"type": "string"},
            "rules": {"type": "array"}
        }
    },
    "entity": {
        "type": "object",
        "properties": {
            "properties": {"type": "array"},
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
    }
}
