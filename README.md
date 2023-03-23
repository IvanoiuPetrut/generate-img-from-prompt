# Node.js Server with OpenAI API

This Node.js server uses the OpenAI API to generate an image based on a given prompt. The server returns a URL to the created image, which can then be displayed in a web application or elsewhere.

## Installation

To use this server, you'll need to have Node.js and npm installed on your machine. You'll also need to set up an OpenAI API key, which you can obtain from the OpenAI website.

1. Clone this repository to your local machine using `git clone https://github.com/your-username/your-repository.git`.
2. Navigate to the repository folder and run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the root of the project directory and add your OpenAI API key as follows:

`OPENAI_API_KEY=your-api-key-here`

## Usage

To start the server, run the following command:

`npm run dev`

Once the server is running, you can send a POST request to the `/generate` endpoint. For example, you can use `curl` to send a request like this:

```curl
curl --location 'http://localhost:3000/api/images/?prompt=A%20big%20bonsai%20on%20a%20flying%20island'
```

![A big bonsai on a flying island](https://oaidalleapiprodscus.blob.core.windows.net/private/org-S4lx9BU3vE5uMKPEywlWcTq1/user-Rt5CM9U2P4V9jAg6vONKWyv6/img-te4IHwj4GExce0KRACCDnLsX.png?st=2023-03-23T16%3A13%3A38Z&se=2023-03-23T18%3A13%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-23T17%3A13%3A10Z&ske=2023-03-24T17%3A13%3A10Z&sks=b&skv=2021-08-06&sig=zLqc9VqmbMima/HE0esvyOC%2Bo3F5bRUcesGWwQuEtn4%3D)

The server will use the OpenAI API to generate an image based on the prompt and return a URL to the created image in the response body.

## Contributing

Contributions to this project are welcome! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request.
