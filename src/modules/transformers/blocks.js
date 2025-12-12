import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([{
    'type': 'transformers_pipeline',
    'message0': 'create transformers pipeline for %1',
    'args0': [{
        'type': 'field_dropdown',
        'name': 'TASK',
        'options': [
          [
            'sentiment-analysis',
            'sentiment-analysis'
          ],
          [
            'text-generation',
            'text-generation'
          ],
          [
            'ner',
            'ner'
          ],
          [
            'question-answering',
            'question-answering'
          ],
          [
            'fill-mask',
            'fill-mask'
          ],
          [
            'summarization',
            'summarization'
          ],
          [
            'translation_en_to_fr',
            'translation_en_to_fr'
          ]
        ],
        'colour': '#5E35B1'
      }],
    'output': 'Pipeline',
    'colour': '#5E35B1',
    'tooltip': 'Creates a Hugging Face pipeline for a given task.',
    'helpUrl': 'https://huggingface.co/docs/transformers/main/en/main_classes/pipelines#transformers.pipeline'
  }]);