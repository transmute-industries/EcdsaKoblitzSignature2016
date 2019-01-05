# EcdsaKoblitzSignature2016

[![Build Status](https://travis-ci.org/transmute-industries/EcdsaKoblitzSignature2016.svg?branch=master)](https://travis-ci.org/transmute-industries/EcdsaKoblitzSignature2016) [![codecov](https://codecov.io/gh/transmute-industries/EcdsaKoblitzSignature2016/branch/master/graph/badge.svg)](https://codecov.io/gh/transmute-industries/EcdsaKoblitzSignature2016)

A minimal implementation of EcdsaKoblitzSignature2016 in javascript.

Mostly to provide clarity around how complex linked data signature suites are, in the hope that future suites will be simpler.

#### Example

```
{
  "@context": "https://w3id.org/identity/v1",
  "givenName": "Alice",
  "signature": {
    "type": "EcdsaKoblitzSignature2016",
    "created": "2019-01-05T02:41:07Z",
    "creator": "ecdsa-koblitz-pubkey:1LGpGhGK8whX23ZNdxrgtjKrek9rP4xWER",
    "signatureValue": "Hxf15psaaHq4S43I2KVq6NZflXbC6lHXMNJmcKo8MYszLxjoPCnlPqcwmIqBgWUUesO7wpq9nSNKH1kT4F720w0="
  }
}
```


## License Notes

Works with: https://github.com/digitalbazaar/jsonld-signatures, 

```
jsonld-signatures is BSD 3-Clause License

Copyright (c) 2010-2018 Digital Bazaar, Inc.
```

The transformations to json documents before signing are copied here to provide a single view of what is happening. They have not been altered.