# Fix the vulnerability:

Versions of `js-yaml` prior to 3.13.0 are vulnerable to Denial of Service. By parsing a carefully-crafted YAML file, the node process stalls and may exhaust system resources leading to a Denial of Service.


## Recommendation

Upgrade to version 3.13.0.
