### Orbit CLI
## A command line tool for generating express api

<div>
    <img src="https://travis-ci.org/Mujib517/orbit-cli.svg?branch=master"/>
    <img src="https://badge.fury.io/js/orbit-cli.svg"/>
</div>

Orbit generates the project skeleton which includes all the necessary code files and build script(Travis CI).

### Installation
npm install orbit-cli -g

### Create Express API project
Open a command prompt and run:

```bash
orbit new project-name 
```
(or)

```bash
orbit-cli new project-name
```

Alternatively you can create project using below command

```bash
orbit n project-name 
```
 (or)

```bash
orbit-cli n project-name
```
### To get help

```bash
orbit help
```
 (or)

```bash
orbit --help
```

### Generate router file
The below command generate person.router.js file.

```bash
orbit route person
```
  (or)

```bash
orbit r person
```

### Generate middleware
The below command generate auth.middleware.js file.

```bash
orbit middleware auth
```
  (or)

```bash
orbit mw auth
```