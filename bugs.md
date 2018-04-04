
```bash
jsdoc-tag-parser(jsdoc-tag-parser@1.0.0/master)[+!?]$ rm -rf node_modules/
jsdoc-tag-parser(jsdoc-tag-parser@1.0.0/master)[+!?]$ pnpm i
 WARN  `prepublish` scripts are deprecated. Use `prepare` for build steps and `prepublishOnly` for upload-only.
 ERROR  minTimeout is greater than maxTimeout
at timeouts                        …/lib/node_modules/retry/lib/retry.js:28  throw new Error('minTimeout is greater than maxTimeout');
at operation                       …m/lib/node_modules/retry/lib/retry.js:4  var timeouts = exports.timeouts(options);
at promiseRetry                    …/node_modules/promise-retry/index.js:23  operation = retry.operation(options);
at remoteFetch                     …_modules/make-fetch-happen/index.js:329  return retry(
at cachingFetch                    …_modules/make-fetch-happen/index.js:176  return remoteFetch(uri, opts)
at defaultedFetch                  …e_modules/make-fetch-happen/index.js:41  return fetch(uri || _uri, finalOpts)
at                                 …fetch-from-npm-registry/lib/index.js:53
at at /usr/lib/node_modules/pnpm…  pnpm/npm-resolver/lib/pickPackage.js:105
at next
at at /usr/lib/node_modules/pnpm…  pnpm/npm-resolver/lib/pickPackage.js:7
jsdoc-tag-parser(jsdoc-tag-parser@1.0.0/master)[+!?]$ pnpm install
 ERROR  minTimeout is greater than maxTimeout
at timeouts                        …/lib/node_modules/retry/lib/retry.js:28  throw new Error('minTimeout is greater than maxTimeout');
at operation                       …m/lib/node_modules/retry/lib/retry.js:4  var timeouts = exports.timeouts(options);
at promiseRetry                    …/node_modules/promise-retry/index.js:23  operation = retry.operation(options);
at remoteFetch                     …_modules/make-fetch-happen/index.js:329  return retry(
at cachingFetch                    …_modules/make-fetch-happen/index.js:176  return remoteFetch(uri, opts)
at defaultedFetch                  …e_modules/make-fetch-happen/index.js:41  return fetch(uri || _uri, finalOpts)
at                                 …fetch-from-npm-registry/lib/index.js:53
at at /usr/lib/node_modules/pnpm…  pnpm/npm-resolver/lib/pickPackage.js:105
at next
at at /usr/lib/node_modules/pnpm…  pnpm/npm-resolver/lib/pickPackage.js:7
```


```bash
jsdoc-tag-parser(jsdoc-tag-parser@1.0.0/master)[+!?]$ pnpm i
 ERROR  Unexpected store used for installation

expected: D:\.pnpm-store\2
actual: /mnt/d/.pnpm-store/2

If you want to use the new store, run the same command with the --force parameter.
jsdoc-tag-parser(jsdoc-tag-parser@1.0.0/master)[+!?]$ pnpm i --force
 WARN  using --force I sure hope you know what you are doing
Recreating /mnt/d/Users/Julian/code/public/jsdoc-tag-parser/node_modules
 WARN  tsd-jsdoc@2.0.0-beta.3 requires a peer of jsdoc@^3.4.0 but none was installed.
Packages: +743
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Resolving: total 743, reused 743, downloaded 0, done
Running install for registry.npmjs.org/fsevents/1.1.3, done
dependencies:
+ commander 2.15.1
+ doctrine 2.1.0
+ escope 3.6.0
+ espree 3.5.4
+ estraverse 4.2.0

devDependencies:
+ auto-changelog 1.4.6
+ chai 4.1.2
+ changelog 1.4.2
+ doctoc 1.3.1
+ documentation 6.1.0
+ eslint 4.19.1
+ mkdirp 0.5.1
+ mocha 5.0.5
+ npm-run-all 4.1.2
+ pegjs 0.10.0
+ rimraf 2.6.2
+ run-s 0.0.0
+ tsd-jsdoc 2.0.0-beta.3
```