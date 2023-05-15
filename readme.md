## Node.js DigitalOcean Spaces

This repository provides integration of the DigitalOcean Spaces API into a Node.js application. It allows you to upload, delete, and retrieve files from your DigitalOcean Spaces bucket.

### Prerequisites

Before using this code, make sure you have the following:

- Node.js installed on your machine
- DigitalOcean Spaces API credentials (access key, secret key)
- DigitalOcean Spaces endpoint URL
- DigitalOcean Spaces bucket name
- Set up environment variables using a `.env` file or other methods (see `.env` file example)

### Installation

1.  Clone the repository:

    bashCopy code

    `git clone https://github.com/your-username/nodejs-digital-ocean-spaces.git`

2.  Install the dependencies:

    bashCopy code

    `cd nodejs-digital-ocean-spaces npm install`

3.  Set up your environment variables:

    - Create a `.env` file in the root directory of the project.
    - Add the following variables and provide the corresponding values:

      makefileCopy code

      ```
      DO_ACCESS_KEY=your-access-key
      DO_SECRET_KEY=your-secret-key
      DO_ENDPOINT=your-endpoint
      DO_REGION=your-region
      DO_BUCKET=your-bucket-name
      ```

4.  Start the application:

    sqlCopy code

    `npm start`
    `yarn start`

### Code Explanation

The main components of the code are as follows:

- `index.js`: This file sets up the Express server, middleware, and routes. It listens for requests on the specified port.
- `utils/s3Client.js`: This file configures the S3 client using the AWS SDK for JavaScript. It uses the provided environment variables to establish the connection to DigitalOcean Spaces.
- `services/objectStorageServices.js`: This file contains the implementation of the S3 API. It includes functions to upload, delete, and retrieve files from DigitalOcean Spaces.
- `routes/routes.js`: This file defines the Express router and the API endpoints for file upload, deletion, and retrieval. It uses the services from `objectStorageServices.js` to perform the corresponding actions on DigitalOcean Spaces.

### Usage

Once the application is up and running, you can use the following API endpoints:

- `POST /upload`: Uploads a file to DigitalOcean Spaces. Send a `multipart/form-data` request with the file in the `file` field. The response will contain the link to the uploaded file.
- `DELETE /object-storage`: Deletes a file from DigitalOcean Spaces. Send a JSON body with the file link in the `link` field.
- `PUT /object-storage`: Retrieves a file from DigitalOcean Spaces. Send a JSON body with the file link in the `link` field. The response will contain the file data.

Make sure to adjust the URLs and paths as per your requirements.

Feel free to explore and customize the code to fit your specific needs.
