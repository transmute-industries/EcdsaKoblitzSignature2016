# EcdsaKoblitzSignature2016

[![Build Status](https://travis-ci.org/transmute-industries/EcdsaKoblitzSignature2016.svg?branch=master)](https://travis-ci.org/transmute-industries/EcdsaKoblitzSignature2016) [![codecov](https://codecov.io/gh/transmute-industries/EcdsaKoblitzSignature2016/branch/master/graph/badge.svg)](https://codecov.io/gh/transmute-industries/EcdsaKoblitzSignature2016) [![Coverage Status](https://coveralls.io/repos/github/transmute-industries/EcdsaKoblitzSignature2016/badge.svg?branch=master)](https://coveralls.io/github/transmute-industries/EcdsaKoblitzSignature2016?branch=master)

A minimal implementation of EcdsaKoblitzSignature2016 in JavaScript.

Mostly to provide clarity around how complex linked data signature suites are, in the hope that future suites will be simpler, and less coupled to crypto currency libraries.


#### Signed with Public Key

As seen on [https://json-ld.org/playground/](https://json-ld.org/playground/)

```
{
  "@context": "https://w3id.org/identity/v1",
  "givenName": "Alice",
  "signature": {
    "type": "EcdsaKoblitzSignature2016",
    "created": "2019-01-09T20:22:03.149Z",
    "creator": "ecdsa-koblitz-pubkey:02234be9bcdf041f7530979b8b88b7dc62dd505a75883c8211f3a8250534f96dc0",
    "signatureValue": "IHFt7uxpLBhUC7BG9aiBVBtOmnYljhpCW5TL6I/v+iaRQmmxB9Bf8jBdr17XtDX4qNWq4i8Og8is/TWNEdgvz1Y="
  }
}
```

### Signed by a DID

As seen [here](https://gist.github.com/Exulansis/903ab4a77b4173c2268f7a0ef90521ac)

```
{
  "@context": "https://w3id.org/identity/v1",
  "givenName": "Alice",
  "signature": {
    "type": "EcdsaKoblitzSignature2016",
    "created": "2019-01-09T20:29:25.773Z",
    "creator": "did:example:123#main-key",
    "signatureValue": "IG93BohNGlH6R0NWJDtOX36tmVigDwwOglKgWYW0SAcoHkwn8YPS6xOSiRKW2DdJqY3BDNjrUIzSKSMcllo2VmQ="
  }
}
```

#### Signed with Bitcoin Address (livenet assumed)

As seen [here](https://github.com/digitalbazaar/jsonld-signatures/blob/a636acd31bd9fdd0488c9e50a3e1a39500a2ce8a/tests/mock/keys.js#L50)

_IMO best not to use addresses for signature suites_ 

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

#### Alternative Implementations

- https://github.com/jolocom/jolocom-lib
- https://github.com/uport-project/did-jwt
- https://github.com/transmute-industries/PROPOSAL-EcdsaKoblitzSignature2019

Jolocom claims to be using `EcdsaKoblitzSignature2016`, but implements the signature algorithm differently then jsonld-signatures. This library does not work with Jolocom for this reason.

UPort claims to be supporting `Secp256k1VerificationKey2018`, `Secp256k1SignatureVerificationKey2018`, `EcdsaPublicKeySecp256k1`, these are not compatible with `EcdsaKoblitzSignature2016` or Jolocom's version, but are closer, because both UPort and Jolocom are simply signing a digest.

`PROPOSAL-EcdsaKoblitzSignature2019` is just a proposal, but its based off of `RsaSignature2017`. This library does not work with `PROPOSAL-EcdsaKoblitzSignature2019`.



## License Notes

Works with: https://github.com/digitalbazaar/jsonld-signatures, 

```
jsonld-signatures is BSD 3-Clause License

Copyright (c) 2010-2018 Digital Bazaar, Inc.
```

The transformations to json documents before signing are copied here to provide a single view of what is happening. They have not been altered.

## W3C Links

#### [Linked Data Cryptographic Suite Registry](https://w3c-ccg.github.io/ld-cryptosuite-registry)

#### [Linked Data Signatures](https://w3c-dvcg.github.io/ld-signatures)

#### [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/)