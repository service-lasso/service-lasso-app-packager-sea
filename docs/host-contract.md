# Node SEA host and wrapper contract

This file records component-specific hosting and packaging boundaries. The shared operator journey is maintained in the Core guides linked from README.

## Source host

`src/index.js` consumes the published `@service-lasso/service-lasso` runtime. The host owns its shell at `/` and mounts a sibling built Service Admin at `/admin/`. It supplies explicit `servicesRoot` and `workspaceRoot`, preparing the local inventory from tracked `services/` definitions before startup. `npm start` runs the raw source host.

Source defaults are host shell `http://127.0.0.1:19040`, Admin `http://127.0.0.1:19040/admin/` and runtime API `http://127.0.0.1:18084`. Availability depends on instance configuration and the shared guide's prerequisites.

## SEA wrapper and external payload

`src/sea-launcher.cjs` resolves an executable root from the executable's directory, with its existing explicit override, then resolves the payload root. It requires the external `src/index.js`, changes to the payload directory and imports that entrypoint. Unlike the pkg/nexe launcher layouts, this source does not delegate through a separate Node-runtime subprocess.

The build contract generates a SEA preparation blob, copies the current Node executable and injects the blob. `npm run package:sea` stages the runnable layout under `dist/sea` and prints its wrapper path. The executable still uses external application/runtime/service assets, including packaged Admin under `.payload/admin` when present. Preserve the complete layout. A SEA executable is not evidence that the entire Service Lasso application is single-file, signed or installer-ready.

## Managed inventory and artifact classes

The tracked baseline contains `echo-service`, `@serviceadmin`, `@node`, `@localcert`, `@nginx` and `@traefik`; optional `@python` and `@java` examples are disabled. Echo and Traefik download/archive identities belong to their manifests. Traefik declares `@localcert` and `@nginx` as dependencies. Core service identifiers retain their `@` prefix; the sample `echo-service` remains unprefixed.

Source artifacts support customization; runtime artifacts include a SEA wrapper and bootstrap service downloads; bundled artifacts include the wrapper and acquired service archives for no-download startup. Exact layout, build and verification authority remain in the existing [release artifact contract](release-artifact.md), scripts and workflows. Staged verification does not establish installer or broad distribution acceptance.

## Documentation migration receipt

For service-lasso/service-lasso#1418 / SPEC-002 AC-4AJ.3 and companion issue #4, README and generic `docs/minimal-poc.md` were audited at develop `9eee489a6cb323a42adda041c95e9ba0b3fd026f`. README now links to the shared Core guide merged in PR #1424; the replaced generic guide is removed. Host, SEA, external payload and release contracts remain local. No fresh runtime acceptance, publication or release is claimed.
