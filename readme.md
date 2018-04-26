### Orbit CLI
## A command line tool for generating express api

<div>
    <img src="https://travis-ci.org/Mujib517/orbit-cli.svg?branch=master"/>
    <img src="https://badge.fury.io/js/orbit-cli.svg"/>
</div>

Orbit generates the project skeleton which includes all the necessary code files, build script(Travis CI) and deployment script (docker).

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
### Create Express MVC project
Open a command prompt and run:

```bash
orbit mvc project-name 
```
(or)

```bash
orbit-cli mvc project-name
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

### Generate mongoose model
The below command generate person.model.js file and installs mongoose dependency.

```bash
orbit model person
```
  (or)

```bash
orbit m person
```

### Generate controller
The below command generate person.ctrl.js file.

```bash
orbit ctrl person
```
  (or)

```bash
orbit c person
```

Orbit CLI can generate multiple types of controllers:
##### Controller function

```bash
orbit ctrl person --function 
```
(or)

```bash
orbit c person -f
```

##### Controller class

```bash
orbit ctrl person --class 
```
(or)

```bash
orbit c person -c
```

##### Controller function (revealing module pattern)

```bash
orbit ctrl person --module 
```
(or)

```bash
orbit c person -m
```