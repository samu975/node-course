# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true npm run deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Guidelines 🪄🌟
How to make your article friendly and understandable as possible.

### Text quality
- Write as you would explain it to yourself some time ago when you were unfamiliar with that technology. Don't copy paste cumbersome text from an encyclopedia.
- Make it simple. Use short sentences.
- Try to interest a student before introducing a new technology/approach. Reminisce what approach was used before and what flaws it had.
- Keep it brief and concise. Don't waste your and student's time.
- Don't add a code, an image, or anything else without an explanation of why it is here (if it is some abstract image, like article preview, then it is fine to not describe it). Make it in such a way as you talk to your reader.  If you want to add some code, you can write `Let's see an example of adding a new method to the class`. If you add an image you can say `The image above shows a diagram of ...`. If you add a bash script you can add `For installing, run the following command`.

### Spelling / Grammar
- If your code editor does not check spelling, then install some plugin that will do it. E.g use `Code Spell Checker` for Visual Studio Code.
- Use [Grammarly](https://app.grammarly.com/) for checking grammar.

### Style
After running the app, go to [guidelines](http://localhost:3000/docs/tutorial-basics/guidelines) to see how to use the most popular components.
