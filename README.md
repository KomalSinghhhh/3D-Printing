# 3D Printing Materials Backend

This is a Node.js backend for managing information about various 3D printing materials. The backend includes functionality for CRUD operations and image uploads, utilizing MongoDB and Cloudinary for storage.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing material data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Multer**: Middleware for handling `multipart/form-data`, used for image uploads.
- **Cloudinary**: Cloud-based image and video management service.
- **dotenv**: Module to load environment variables from a `.env` file.

## Running the server locally

1. Download the source code or clone the repository
2. `cd` into the directory containing the source code from terminal.
3. Install dependencies using `npm install`
4. Build the code using `tsc -b`
5. Run the server using `node dist/index.js`
6. Test the endpoints using tools like postman.

## Image Handling
When a user uploads an image, it is handled in the following way:

 - **Upload and Store Temporarily** : The image is first stored on   the server using Multer.
 - **Upload to Cloudinary** : The temporarily stored image is then uploaded to Cloudinary, a cloud-based image management service.
 - **Delete from Server** : After the image is successfully uploaded to Cloudinary, the temporary image file is deleted from the server.
 - **Storing Image URL** : The URL of the uploaded image on Cloudinary is stored in the MongoDB database alongside the material data.

In case of image deletion:

 - **Fetch Image URL** : The image URL is fetched from the MongoDB database.
 - **Delete from Cloudinary** : The image is deleted from Cloudinary using the fetched URL.

## API Endpoints

### GET/materials
- Fetch all materials from the database, excluding image data.
- Url : "/api/v1/materials"
- Method : GET
- Request :
  <img width="1161" alt="Get materials Request" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/7e69c4fd-ff80-4c6d-8246-8e452a6ee021">
- Response :
  <img width="1015" alt="Get Materials Req-Res" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/0129fddd-4554-4e0c-a247-89af6e8acd8e">


### GET/materials/:id

- Retrieve a specific material by its ID, including its associated image data.
- Url : "/api/v1/materials/:id"
- Method : GET
- Request :
  <img width="1010" alt="GET materails id Request" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/c308a76f-367f-49db-8bde-70d00a7a6ddb">
- Response :
  <img width="1014" alt="GET materials id Response" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/7e2657c0-1b42-45dd-a0a0-966eb005242d">

### POST/materials

- Add a new material to the database, including an image upload
- Url : "/api/v1/materials"
- Method : POST
- Body (form data) :
  - productid (string, unique)
  - name (string)
  - technology (string)
  - colors (string, comma-separated)
  - pricePerGram (number)
  - applicationTypes (string, comma-separated)
  - image (file)
- Request :
  <img width="1012" alt="Post materails request" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/f449c3bb-e781-4c6e-a4e7-0597bcbdd74c">
- Response :
  <img width="1015" alt="Post material Response" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/7af47931-f5d3-452c-acff-bc0a69c5b79a">

### PUT/materials/:id

- Update an existing material's details, optionally updating its associated image.
- Url : "/api/v1/materials/:id"
- Method : PUT
- Body (form data) :
  - name (string)
  - technology (string)
  - colors (string, comma-separated)
  - pricePerGram (number)
  - applicationTypes (string, comma-separated)
  - image (file, optional)
  
- Before Update :
  <img width="1010" alt="Before Update request" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/68f8128f-d8e7-4d87-be2a-3b26c2f794c4">
  
- PUT Request without image upload :
  <img width="1012" alt="Update request without image" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/a2cb547a-0588-49d2-b142-454a10a36248">
- Response :
  <img width="1012" alt="Update response without image" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/d1e4fa8a-aa48-4847-ad1f-ab016fdf3e9c">

- PUT Request with image upload : 
  <img width="1014" alt="Update with image request" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/46f883f4-a0f3-49e0-824e-3adf974f95b7">

- Response :
  <img width="1015" alt="Update with image response" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/f24c52cf-e3bf-4341-885c-9834a9a1e833">

### DELETE/materials/:id

- Remove a material from the database by its ID.
- Url : "/api/v1/materials/:id"
- Method : DELETE
- Request :
  <img width="1010" alt="Delete Request" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/187e036d-2554-44e2-bbd9-ea5f3d38ac7a">

- Response :
  <img width="1010" alt="Delete Response" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/42cadd1e-02cb-4580-ab4a-0e9ae467d23d">

- Getting Deleted material : 
  <img width="1012" alt="Getting Deleted material" src="https://github.com/KomalSinghhhh/3D-Printing/assets/111066880/ead7ac8c-84d0-4467-83a7-fa1af48f69df">
  
---

## Finally thanks for trying out this application and please feel free to give feedback on the issues you faced or any other feedback you have ❤️
