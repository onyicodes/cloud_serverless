import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

//import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';
import { getTodosForUser } from '../../helpers/businessLogic/getTodos';
import { createLogger } from '../../utils/logger';

const logger = createLogger('Lambda-http')

// TODO: Get all TODO items for a current user - done
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const userId = getUserId(event);
    const todos = await getTodosForUser(userId);

    logger.info(`Fetched todos successfully for user ${userId}`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items: todos
      })
    }
  }
)

handler
.use(httpErrorHandler())
.use(
  cors({
    credentials: true,
  })
)
