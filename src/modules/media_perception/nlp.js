import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "media_nlp_tokenize",
    "message0": "tokenize text %1",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Tokenizes a text into words."
  },
  {
    "type": "media_nlp_sentences",
    "message0": "get sentences from text %1",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Splits a text into sentences."
  },
  {
    "type": "media_nlp_pos_tag",
    "message0": "part-of-speech tag tokens %1",
    "args0": [
      { "type": "input_value", "name": "TOKENS", "check": "Array" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Performs part-of-speech tagging on a list of tokens."
  },
  {
    "type": "media_nlp_lemmatize",
    "message0": "lemmatize token %1",
    "args0": [
      { "type": "input_value", "name": "TOKEN", "check": "String" }
    ],
    "output": "String",
    "colour": 65,
    "tooltip": "Lemmatizes a word token."
  },
  {
    "type": "media_nlp_nltk_download",
    "message0": "download nltk resource %1",
    "args0": [
      { "type": "input_value", "name": "RESOURCE", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
    "tooltip": "Downloads an NLTK resource."
  },
  {
    "type": "media_nlp_nltk_word_tokenize",
    "message0": "tokenize text into words with nltk %1",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Tokenizes a text into words using NLTK."
  },
  {
    "type": "media_nlp_nltk_sent_tokenize",
    "message0": "tokenize text into sentences with nltk %1",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Tokenizes a text into sentences using NLTK."
  },
  {
    "type": "media_nlp_nltk_stopwords",
    "message0": "get nltk stopwords for language %1",
    "args0": [
      { "type": "input_value", "name": "LANG", "check": "String" }
    ],
    "output": "Array",
    "colour": 65,
    "tooltip": "Gets a list of stopwords for a given language from NLTK."
  },
  {
    "type": "media_nlp_spacy_load",
    "message0": "load spacy model %1",
    "args0": [
      { "type": "input_value", "name": "MODEL", "check": "String" }
    ],
    "output": "SpacyModel",
    "colour": 65,
    "tooltip": "Loads a spaCy model."
  },
  {
    "type": "media_nlp_spacy_doc",
    "message0": "process text with spacy model %1 %2",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" },
      { "type": "input_value", "name": "MODEL", "check": "SpacyModel" }
    ],
    "output": "SpacyDoc",
    "colour": 65,
    "tooltip": "Processes a text with a spaCy model to create a Doc object."
  },
  {
    "type": "media_nlp_spacy_token_lemma",
    "message0": "get lemma of spacy token %1",
    "args0": [
      { "type": "input_value", "name": "TOKEN", "check": "SpacyToken" }
    ],
    "output": "String",
    "colour": 65,
    "tooltip": "Gets the lemma of a spaCy token."
  },
  {
    "type": "media_nlp_spacy_token_pos",
    "message0": "get part-of-speech of spacy token %1",
    "args0": [
      { "type": "input_value", "name": "TOKEN", "check": "SpacyToken" }
    ],
    "output": "String",
    "colour": 65,
    "tooltip": "Gets the part-of-speech of a spaCy token."
  },
  {
    "type": "media_nlp_transformers_pipeline",
    "message0": "create transformers pipeline for task %1",
    "args0": [
      { "type": "input_value", "name": "TASK", "check": "String" }
    ],
    "output": "Pipeline",
    "colour": 65,
    "tooltip": "Creates a Hugging Face Transformers pipeline for a given task."
  },
  {
    "type": "media_nlp_transformers_run_pipeline",
    "message0": "run transformers pipeline %1 with input %2",
    "args0": [
      { "type": "input_value", "name": "PIPELINE", "check": "Pipeline" },
      { "type": "input_value", "name": "INPUT" }
    ],
    "output": null,
    "colour": 65,
    "tooltip": "Runs a Transformers pipeline with a given input."
  }
]);
