# Overview

This package consists of a couple of utilities to get IP addresses of containers and host from inside a docker container.

## Getting Started

Install this package using [yarn]:

```
yarn add docker-ip-get
```

or [npm]:

```
npm install docker-ip-get
```

Here is an example usage:

First, import the library in CommonJS format:

```js
const dockerIpTools = require("docker-ip-get");
```

or in ES6 or TypeScript format:

```ts
import * as dockerIpTools from "docker-ip-get";
```

Then, use the utilities as follows:

```js
// Get IP address of the docker host
dockerIpTools
  .getHostIp()
  .then((hostIp) => console.log(hostIp))
  .catch((err) => console.error(err));

// Get IP address of the docker container this script is running in
dockerIpTools
  .getContainerIp()
  .then((containerIp) => console.log(containerIp))
  .catch((err) => console.error(err));

// Get IP address of the docker gateway
dockerIpTools
  .getGatewayIp()
  .then((hostIp) => console.log(hostIp))
  .catch((err) => console.error(err));

// Check if the system is a docker container
dockerIpTools.isInDocker();
```

## Contributing

If you encounter any issues, please feel free to post an issue [here](https://github.com/ukalwa/docker-ip-get/issues).

Any Pull Requests are welcome!!

## Acknowledgements

This project was inspired by [docker-ip](https://www.npmjs.com/package/docker-ip) and [this stackoverflow post](https://stackoverflow.com/a/45002996).

## License

`docker-ip-get` is [MIT Licensed](https://github.com/ukalwa/docker-ip-get/blob/master/LICENSE).
