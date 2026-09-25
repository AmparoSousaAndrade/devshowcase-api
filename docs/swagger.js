const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'DevShowcase API', version: '1.0.0' },
    paths: {
      '/api/projects': {
        get: {
          summary: 'Lista projetos com filtro e paginação',
          parameters: [
            { in: 'query', name: 'tecnologia', schema: { type: 'string' } },
            { in: 'query', name: 'page', schema: { type: 'integer' } },
            { in: 'query', name: 'limit', schema: { type: 'integer' } }
          ],
          responses: { 200: { description: 'Lista de projetos' } }
        }
      },
      '/api/projects/{id}/feedbacks': {
        post: {
          summary: 'Cadastra feedback com nota de 1 a 5',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nota: { type: 'integer', example: 5 },
                    comentario: { type: 'string', example: 'Muito bom!' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Feedback criado' } }
        }
      },
      '/api/projects/{id}/upvote': {
        put: {
          summary: 'Incrementa curtidas do projeto',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Upvote realizado' } }
        }
      }
    }
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);