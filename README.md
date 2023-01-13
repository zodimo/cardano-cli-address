# cardano-cli-address

This package is a command builder part of a series to wrap the cardano-cli

# Development

run the dump command to check for differences.

```bash
node run build
node dist/dump-cli-help-to-docs.js
```

# TODO

- extract common command parameters to own packages
- extract command builder infrastructure to own package
- add git integration and test coverage badges

- Implementations

  - [x] address

    - [x] key-gen
    - [x] key-hash
    - [x] build
    - [x] build-script
    - [x] info
