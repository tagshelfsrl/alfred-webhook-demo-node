# Alfred Webhook Sample (Node.js)

Welcome to the official repository for the Alfred Webhook Server sample code! This project is designed to help developers integrate with Alfred, our innovative product that utilizes webhooks to emit real-time events. This sample code base will provide you with a solid foundation for developing a custom webhook server.

## Installation

Clone this repository on your local machine:

```bash
$ git clone git@github.com:tagshelfsrl/alfred-webhook-demo-node.git
```

You will need:

- Node 16.x or higher (Node 18 recommended)
- A remote server or a local tunneling service such as [ngrok](https://ngrok.com/).

Once you are inside the repository folder in your local machine, follow these steps:

### 1. Install dependencies

Install the project dependencies using `npm`:

```bash
$ npm install
```

Alternatively, you can use `yarn`:

```bash
$ yarn install
```

### 2. Run your app locally

```bash
$ npm run start
```

You server is now available at `http://localhost:3000`. There are two paths configured:

- `GET /ping` which serves as a health check endpoint. It should return an `ok` message.
- `POST /webhook` which is the webhook handler endpoint. This is the one that you should provide to Alfred when setting up your webhook URL.

### 3. Setup local tunneling (optional)

If you want to test your server locally, you will need to expose it to the Internet using a local tunneling service like ngrok.

If not already installed, install ngrok via [download](https://ngrok.com/download) page.

Once the installed, open a new terminal tab or window and run the following command:

```bash
$ ngrok http 3000
```

This will create a tunnel to your local server running in the specified port (3000 in this case).

The screen should show the following:

```
Session Status                online
Account                       Redacted (Plan: Free)
Update                        update available (version 3.8.0, Ctrl-U to update)
Version                       3.3.5
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://b4fb3f8b38f8.ngrok.app -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Note the HTTPS URL of the external server that is forwarded to your local machine. In the above example, it is `https://b4fb3f8b38f8.ngrok.app`, therefore the webhook URL that you would register should be `https://b4fb3f8b38f8.ngrok.app/webhook`.

## Setting up the webhook URL

In order to setup the webhook URL you must have access to the Alfred API. Take a look at the [official documentation](https://docs.tagshelf.dev/authentication) to see more information about authentication.

Once you have access, you simply have to call the `POST /api/account/webhook` endpoint of the Alfred API. You can see more details about this endpoint [here](https://docs.tagshelf.dev/enpoints/account#set-a-webhook-for-a-given-account).
