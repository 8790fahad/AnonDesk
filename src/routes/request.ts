
import {
  createRequest,
  takeRequestInProgress,
  completeRequest,
  cancelRequest,
  getFilteredRequests,
  cancelAllInProgress
} from '../controllers/request';

module.exports= (app: any) => {
  // Create a new request
  app.post(
    '/api/v1/request/create',
    createRequest
  );

  // Mark request as IN_PROGRESS
  app.patch(
    '/api/v1/request/in-progress',
    takeRequestInProgress
  );

  // Complete a request
  app.patch(
    '/api/v1/request/complete',
    completeRequest
  );

  // Cancel a request
  app.patch(
    '/api/v1/request/cancel',
    cancelRequest
  );

  // Get all or filtered requests
  app.get(
    '/api/v1/request/list',
    getFilteredRequests
  );

  // Cancel all "IN_PROGRESS" requests
  app.patch(
    '/api/v1/request/cancel-all-in-progress',
    cancelAllInProgress
  );
};
