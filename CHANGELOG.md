# Release notes for `gql2ts-for-server`

<a name="current-release"></a>
# Version 0.4.0 (Wed, 18 Jan 2017 22:19:04 GMT)


### Breaking changes

* [153b923](https://github.com/nknapp/graphql-typewriter/commit/153b923) Rename project to graphql-typewriter (#27) - Nils Knappmeier

### New features

* [e2c8ec5](https://github.com/nknapp/graphql-typewriter/commit/e2c8ec5) Generate default resolvers for unions and interfaces. - Mario 

### Tests 

* [5df2569](https://github.com/nknapp/graphql-typewriter/commit/5df2569) Add usability spec for interfaces. - Mario Siegenthaler
* [3488def](https://github.com/nknapp/graphql-typewriter/commit/3488def) Add usability spec for unions. - Mario Siegenthaler
Siegenthaler

### Chore

* [f71ce95](https://github.com/nknapp/graphql-typewriter/commit/f71ce95) Remove unused ghooks-dependency - Nils Knappmeier
* [17ff7d0](https://github.com/nknapp/graphql-typewriter/commit/17ff7d0) Update dependencies. - Mario Siegenthaler
* [b6c5428](https://github.com/nknapp/graphql-typewriter/commit/b6c5428) Rename the type 'Resolver' to 'GraphqlField'. - Mario Siegenthaler

# Version 0.3.0 (Wed, 11 Jan 2017 23:59:55 GMT)

* [66262cf](https://github.com/nknapp/gql2ts-for-server/commit/66262cf) Add context via a generic parameter. - Mario Siegenthaler
* [36768c9](https://github.com/nknapp/gql2ts-for-server/commit/36768c9) Render members differently and more uniformly by using a type. This also allows to use root and context in all resolver functions. - Mario Siegenthaler
* [1638d71](https://github.com/nknapp/gql2ts-for-server/commit/1638d71) Add support for input objects. (#21) - Mario Siegenthaler
* [1e4c0f7](https://github.com/nknapp/gql2ts-for-server/commit/1e4c0f7) Regenerate the example to reflect the actual generated code. (#19) - Mario Siegenthaler
* [617c51f](https://github.com/nknapp/gql2ts-for-server/commit/617c51f) Add support for graphql interfaces. (#17) - Mario Siegenthaler

# Version 0.2.0 (Sun, 08 Jan 2017 06:49:31 GMT)

* [618987d](https://github.com/nknapp/gql2ts-for-server/commit/618987d) Added tslint-config and fix reported problems (#14) - Nils Knappmeier
* [5d64c5f](https://github.com/nknapp/gql2ts-for-server/commit/5d64c5f) Add support for unions. - Mario Siegenthaler
* [b24b1f6](https://github.com/nknapp/gql2ts-for-server/commit/b24b1f6) Add support for enum types in the schema. - Mario Siegenthaler
* [a67fcc9](https://github.com/nknapp/gql2ts-for-server/commit/a67fcc9) Add a 'tslint:disable' tag to all generated files. (#12) - Mario Siegenthaler
* [eead53c](https://github.com/nknapp/gql2ts-for-server/commit/eead53c) Support for non-null types (#10) - Mario Siegenthaler
* [055966e](https://github.com/nknapp/gql2ts-for-server/commit/055966e) Add the missing default scalars Float and ID. (#9) - Mario Siegenthaler
* [b632bf4](https://github.com/nknapp/gql2ts-for-server/commit/b632bf4) Remove varargs to maintain Node 4 compatibility - Nils Knappmeier
* [355ef87](https://github.com/nknapp/gql2ts-for-server/commit/355ef87) Introduce "Renderer" class with better use of template-string and custom tag function - Nils Knappmeier
* [d2fd220](https://github.com/nknapp/gql2ts-for-server/commit/d2fd220) Replace 'tsql' by 'gql2ts-for-server' in the whole project - Nils Knappmeier
* [156a5fe](https://github.com/nknapp/gql2ts-for-server/commit/156a5fe) Fix handling of Boolean scalars - Nils Knappmeier
* [21c7c40](https://github.com/nknapp/gql2ts-for-server/commit/21c7c40) Generate JS-files on prepublish rather than commiting them. - Nils Knappmeier
* [f3094ae](https://github.com/nknapp/gql2ts-for-server/commit/f3094ae) Added command-line reference (--help output) to README - Nils Knappmeier


# Version 0.1.3 (Sun, 13 Nov 2016 23:04:27 GMT)

* [b8995c8](https://github.com/nknapp/gql2ts-for-server/commit/b8995c8) Fix github repo URL in package.json - Nils Knappmeier

# Version 0.1.2 (Sun, 13 Nov 2016 22:47:48 GMT)

* [a135383](https://github.com/nknapp/gql2ts-for-server/commit/a135383) Make "gql2ts-for-server.js" executable - Nils Knappmeier
* [79c5cd6](https://github.com/nknapp/gql2ts-for-server/commit/79c5cd6) Various fixes (some of them by @b091) - Nils Knappmeier

# Version 0.1.1 (Fri, 11 Nov 2016 14:29:46 GMT)

* [ba8819e](https://github.com/nknapp/gql2ts-for-server/commit/ba8819e) Add 'bin'-folder to "files" in package.json - Nils Knappmeier

# Version 0.1.0 (Fri, 11 Nov 2016 14:27:32 GMT)

* [fbada41](https://github.com/nknapp/gql2ts-for-server/commit/fbada41),
  [79a8a9b](https://github.com/nknapp/gql2ts-for-server/commit/79a8a9b) Documentation, examples - Nils Knappmeier
* [67be5b0](https://github.com/nknapp/gql2ts-for-server/commit/67be5b0) Extended qraphql-schema and first test - Nils Knappmeier
* [aa65ef9](https://github.com/nknapp/gql2ts-for-server/commit/aa65ef9) Initial check-in - Nils Knappmeier
