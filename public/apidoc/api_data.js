define({ "api": [
  {
    "type": "get",
    "url": "/api/cars",
    "title": "Get a list of hints.",
    "name": "GetCars",
    "group": "Car",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  ...\n}, ...]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user is unauthorized to use the api.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Car"
  },
  {
    "type": "post",
    "url": "/api/car",
    "title": "Post a new car location.",
    "name": "PostCar",
    "group": "Car",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "wsgx",
            "description": "<p>WSG84 Lat (52.199735).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "wsgy",
            "description": "<p>WSG84 Lng (6.2130697).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The succcess message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Locatie is met succes toegevoegd.\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user is unauthorized to use the api.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>The location couldn't be saved.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 ServerError\n{\n   \"error\": \"Locatie opslaan niet gelukt\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Car"
  },
  {
    "type": "delete",
    "url": "/api/hints",
    "title": "Delete a hint",
    "name": "DeleteHint",
    "group": "Hint",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the hint.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Hint has been deleted.\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user is unauthorized to use the api.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The hint is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"message\": \"Hint not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Hint"
  },
  {
    "type": "get",
    "url": "/api/hints",
    "title": "Get a list of hints.",
    "name": "GetHints",
    "group": "Hint",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Applies a filter to certain fields in the database.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  ...\n}, ...]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user is unauthorized to use the api.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Hint"
  },
  {
    "type": "post",
    "url": "/api/hints",
    "title": "Post a new hint",
    "name": "PostHint",
    "group": "Hint",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rdx",
            "description": "<p>Rijksdriehoek X (46828).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rdy",
            "description": "<p>Rijksdriehoek Y (21148).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "wsgx",
            "description": "<p>WSG84 Lat (52.199735).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "wsgy",
            "description": "<p>WSG84 Lng (6.2130697).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>The location as string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subarea",
            "description": "<p>The subarea as string, with uppercase first char (Alpha).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The succcess message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Hint is met succes toegevoegd\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user is unauthorized to use the api.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Hint"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/engine.io/lib/server.js",
    "group": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "groupTitle": "_home_tristan_WebstormProjects_jotihunt_react_node_modules_engine_io_lib_server_js",
    "name": "Public"
  }
] });
