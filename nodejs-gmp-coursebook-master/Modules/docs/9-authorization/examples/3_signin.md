---
sidebar_position: 2
---

# SignIn flow
After we implemented user registration flow it would be nice to implement user login. Let's updated our server.js file with the following code:

```typescript
import * as jwt from "jsonwebtoken";

export async function bootstrap(): Promise<Express> {
    ...
    app.post("/login", async (req: Request, res: Response) => {
        try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email, role: user.role },
                    process.env.TOKEN_KEY!,
                    {
                        expiresIn: "2h",
                    }
                );

                return res.status(200).json({
                    token
                });
            }
            res.status(400).send("Invalid Credentials");
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    });
    ...
}
```

In code above we validate user input, get user from db and generate user authorization token. As you can see we use `TOKEN_KEY` to sign out user authorization token - we should add it to `.env` file, it can be any string:

```shell
TOKEN_KEY=someverysecterstring
```

