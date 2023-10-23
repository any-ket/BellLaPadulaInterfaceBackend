const express = require('express');
const { StatusCodes } = require('http-status-codes');
const logger = require('logger');

// Function to handle the API request and response
const apiRequestHandler = async (
  shouldItBeAuthorized,
  blFunction,
  requestData,
  responseHandler
) => {
  try {
    requestData.user = requestData?.session;

    // Perform any session authorization logic here
    if (shouldItBeAuthorized && (!requestData.user || !requestData.user.idx))
      return responseHandler(StatusCodes.UNAUTHORIZED);

    // logger.debug(blFunction.name);
    const blResult = await blFunction(requestData);

    // Process the API response and call the responseHandler
    responseHandler(blResult.statusCode, blResult.responseData);
  } catch (error) {
    console.error('API request error:', error);
    responseHandler(StatusCodes.SERVICE_UNAVAILABLE, 'Something Went Wrong!');
  }
};

// Function to create API methods dynamically
const CreateAPI = (router, apiEndpoints) => {
  apiEndpoints.forEach((apiEndpoint) => {
    router[apiEndpoint.method](apiEndpoint.endpoint, async (req, res) => {
      apiRequestHandler(
        apiEndpoint.shouldItBeAuthorized,
        apiEndpoint.blFunction,
        req, // Assuming the request data is sent in the request body
        (statusCode, data) => {
          logger.debug('api called:', apiEndpoint.endpoint, 'req:', req.body, 'res:', data);
          // Send the API response back to the client
          res.status(statusCode).json(data);
        }
      );
    });
  });
};

module.exports = CreateAPI;
