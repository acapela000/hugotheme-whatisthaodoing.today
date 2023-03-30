## Running server locally
```bash
hugo server -D --watch
```

## Adding new theme
```bash
git submodule add <git-submodule> themes/<hugo-theme-name>
```

## Updating theme
```bash
git submodule update --remote
git add .\themes\hution\    
git commit -m "UPDATE theme"
git push origin master
```

## Building static page
```bash
hugo --minify
```

## Changing code's style
```bash
 hugo gen chromastyles --style=???? > .\static\code-style.css
 ```
[Hugo's list of styles](https://xyproto.github.io/splash/docs/all.html)