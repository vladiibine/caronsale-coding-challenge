export const API_DATA_SCHEMA = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "numBids": {
                            "type": "integer"
                        },
                        "currentHighestBidValue": {
                            "type": "integer"
                        },
                        "minimumRequiredAsk": {
                            "type": "integer"
                        }
                    },
                    "required": [
                        "numBids",
                        "currentHighestBidValue",
                        "minimumRequiredAsk"
                    ]
                }
            ]
        },
        "page": {
            "type": "integer"
        },
        "total": {
            "type": "integer"
        }
    },
    "required": [
        "items",
        "page",
        "total"
    ]
};