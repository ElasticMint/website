## Initial Setup

### 1  Install Hugo

For more information read the official [setup guide](https://gohugo.io/overview/installing/) of Hugo.

Verify your hugo install:
```
hugo version
```

### 2a Run this site

In this section `[site]` is the location of this repository on your machine.

For example, if you cloned this repository to the root of your `D:` drive then
your repository root would be `D:\partners.github.io`.

`[site]` would refer to `D:\partners.github.io\partners`

To run this site on your machine:

```
cd [site]
```

```
 hugo server -D
```

Navigate to your new site at [http://localhost:1313/](http://localhost:1313/).

That's it. You're done.

### 2b  Create new site

```
hugo new site [site]
```
#### Add a theme

```
cd [site]
git init;\
git submodule add https://github.com/devcows/hugo-universal-theme.git themes\hugo-universal-theme

# Edit your config.toml configuration file
# and add the Universal theme.
echo 'theme = "Universal"' >> config.toml
```

```
 hugo server -D
```

Navigate to your new site at [http://localhost:1313/](http://localhost:1313/).

That's it. You're done.
